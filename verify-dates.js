#!/usr/bin/env node

/**
 * Script de verificación de fechas
 * Ejecutar con: node verify-dates.js
 * 
 * Este script analiza todos los archivos JSON y muestra:
 * - Fechas duplicadas
 * - Entradas con la misma fecha
 * - Estadísticas de distribución de fechas
 */

const fs = require('fs');
const path = require('path');

function analyzeDates(jsonPath, label) {
  console.log(`\n━━━ ${label} ━━━`);
  
  if (!fs.existsSync(jsonPath)) {
    console.log(`❌ Archivo no encontrado: ${jsonPath}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  
  if (!Array.isArray(data)) {
    console.log('❌ El archivo no contiene un array');
    return;
  }

  console.log(`📊 Total de entradas: ${data.length}`);

  // Agrupar por fecha
  const dateGroups = {};
  data.forEach(item => {
    const date = item.date || 'sin-fecha';
    if (!dateGroups[date]) {
      dateGroups[date] = [];
    }
    dateGroups[date].push(item.title || item.id);
  });

  // Mostrar estadísticas
  const dates = Object.keys(dateGroups).filter(d => d !== 'sin-fecha').sort();
  console.log(`📅 Fechas únicas: ${dates.length}`);
  
  if (dates.length === 0) {
    console.log('⚠️  NO HAY FECHAS EN EL ARCHIVO');
    return;
  }

  console.log(`📆 Rango: ${dates[0]} → ${dates[dates.length - 1]}`);

  // Detectar problemas
  const problems = [];

  // Problema 1: Todas las entradas tienen la misma fecha
  if (dates.length === 1) {
    problems.push(`🚨 PROBLEMA: Todas las entradas tienen la fecha ${dates[0]}`);
  }

  // Problema 2: Más del 50% de entradas comparten fecha
  const maxEntriesInDate = Math.max(...Object.values(dateGroups).map(arr => arr.length));
  if (maxEntriesInDate > data.length * 0.5) {
    const mostCommonDate = Object.keys(dateGroups).find(
      date => dateGroups[date].length === maxEntriesInDate
    );
    problems.push(
      `⚠️  ADVERTENCIA: ${maxEntriesInDate} de ${data.length} entradas tienen la fecha ${mostCommonDate}`
    );
  }

  // Problema 3: Fechas muy recientes (últimos 7 días)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentDates = dates.filter(d => new Date(d) > sevenDaysAgo);
  
  if (recentDates.length > data.length * 0.5) {
    problems.push(
      `🔴 PROBLEMA: ${recentDates.length} entradas tienen fechas de los últimos 7 días (probablemente autogeneradas)`
    );
  }

  // Mostrar problemas
  if (problems.length > 0) {
    console.log('\n❗ PROBLEMAS DETECTADOS:');
    problems.forEach(p => console.log(`  ${p}`));
  } else {
    console.log('\n✅ No se detectaron problemas obvios');
  }

  // Mostrar distribución de fechas
  console.log('\n📋 Distribución:');
  Object.entries(dateGroups)
    .sort((a, b) => b[0].localeCompare(a[0])) // Ordenar por fecha descendente
    .slice(0, 10) // Mostrar solo las 10 más recientes
    .forEach(([date, items]) => {
      console.log(`  ${date}: ${items.length} entrada(s)`);
      if (items.length <= 3) {
        items.forEach(title => console.log(`    - ${title.substring(0, 60)}...`));
      }
    });
}

// Analizar los archivos
const dataDir = path.join(process.cwd(), 'src', 'data');

console.log('🔍 ANÁLISIS DE FECHAS EN ARCHIVOS JSON\n');
console.log(`Directorio: ${dataDir}`);

analyzeDates(path.join(dataDir, 'latest-news.json'), 'LATEST NEWS');
analyzeDates(path.join(dataDir, 'library-docs.json'), 'LIBRARY DOCS');
analyzeDates(path.join(dataDir, 'legal-news.json'), 'LEGAL NEWS');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('💡 RECOMENDACIONES:');
console.log('  1. Si ves fechas duplicadas masivamente → Los JSON se actualizan automáticamente');
console.log('  2. Si todas las fechas son recientes (últimos días) → Hay un script actualizando');
console.log('  3. Si las fechas están bien distribuidas → El sistema funciona correctamente');
console.log('\n');
