#!/usr/bin/env python3
"""
Script para aplicar automáticamente todos los meta tags SEO al repo
Uso: python3 aplicar-seo-automatico.py
"""

import csv
import os
import re
import subprocess
from pathlib import Path

print("🚀 AUTOMATIZADOR DE META TAGS SEO")
print("=" * 70)

# Configuración
CSV_FILE = "seo-mdx-mejorado.csv"
REPO_DIR = "derecho-artificial-perspectivas"
GITHUB_URL = "https://github.com/artificialderecho-ux/derecho-artificial-perspectivas.git"

# Paso 1: Clonar repo (si no existe)
print("\n📥 Paso 1: Clonando repositorio...")
if not os.path.exists(REPO_DIR):
    try:
        subprocess.run(
            ["git", "clone", GITHUB_URL, REPO_DIR],
            check=True,
            capture_output=True
        )
        print(f"✅ Repositorio clonado en: {REPO_DIR}")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error clonando: {e}")
        exit(1)
else:
    print(f"✅ Directorio {REPO_DIR} ya existe, usando ese")

# Cambiar a directorio del repo
os.chdir(REPO_DIR)

# Paso 2: Leer CSV
print("\n📖 Paso 2: Leyendo archivo CSV...")
if not os.path.exists(f"../{CSV_FILE}"):
    print(f"❌ Archivo {CSV_FILE} no encontrado")
    print(f"   Debe estar en el mismo directorio que este script")
    exit(1)

cambios = {}
with open(f"../{CSV_FILE}", 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        archivo = row['Archivo']  # ej: content/posts/etica-ia.mdx
        cambios[archivo] = {
            'seoTitle': row['seoTitle'],
            'seoDescription': row['seoDescription'],
            'kw1': row['kw1'],
            'kw2': row['kw2'],
            'kw3': row['kw3']
        }

print(f"✅ Leídos {len(cambios)} cambios del CSV")

# Paso 3: Procesar archivos
print("\n🔧 Paso 3: Actualizando archivos .mdx...")

def actualizar_frontmatter(contenido, cambios_archivo):
    """Actualiza el frontmatter YAML de un archivo .mdx"""
    
    # Buscar el bloque frontmatter (entre --- y ---)
    match = re.match(r'^(---\n)([\s\S]*?)(\n---\n)', contenido)
    
    if not match:
        print(f"  ⚠️  No se encontró frontmatter válido")
        return contenido
    
    frontmatter_start = match.group(1)
    frontmatter_content = match.group(2)
    frontmatter_end = match.group(3)
    resto = contenido[match.end():]
    
    # Parsear YAML simple (línea por línea)
    lineas = frontmatter_content.split('\n')
    nuevo_frontmatter = []
    
    # Agregar líneas existentes (excepto si vamos a reemplazarlas)
    for linea in lineas:
        # No agregar líneas que vamos a reemplazar
        if not any(linea.startswith(campo) for campo in ['seoTitle:', 'seoDescription:', 'keywords:', 'seoKeyword:']):
            if linea.strip():  # Solo si no está vacía
                nuevo_frontmatter.append(linea)
    
    # Agregar nuevos campos
    nuevo_frontmatter.append(f'seoTitle: "{cambios_archivo["seoTitle"]}"')
    nuevo_frontmatter.append(f'seoDescription: "{cambios_archivo["seoDescription"]}"')
    nuevo_frontmatter.append(f'keywords: ["{cambios_archivo["kw1"]}", "{cambios_archivo["kw2"]}", "{cambios_archivo["kw3"]}"]')
    nuevo_frontmatter.append(f'seoKeyword: "{cambios_archivo["kw1"]}"')
    
    # Reconstruir frontmatter
    nuevo_contenido = frontmatter_start + '\n'.join(nuevo_frontmatter) + frontmatter_end + resto
    
    return nuevo_contenido

archivos_procesados = 0
archivos_error = 0
archivos_noexisten = 0

for archivo_path, cambios_archivo in cambios.items():
    if not os.path.exists(archivo_path):
        archivos_noexisten += 1
        continue
    
    try:
        # Leer archivo
        with open(archivo_path, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Actualizar frontmatter
        contenido_actualizado = actualizar_frontmatter(contenido, cambios_archivo)
        
        # Escribir archivo
        with open(archivo_path, 'w', encoding='utf-8') as f:
            f.write(contenido_actualizado)
        
        archivos_procesados += 1
        
        # Mostrar progreso cada 50 archivos
        if archivos_procesados % 50 == 0:
            print(f"  ✅ {archivos_procesados} archivos procesados...")
        
    except Exception as e:
        archivos_error += 1
        print(f"  ❌ Error en {archivo_path}: {e}")

print(f"\n✅ {archivos_procesados} archivos actualizados exitosamente")
if archivos_noexisten > 0:
    print(f"⚠️  {archivos_noexisten} archivos no encontrados (ignorados)")
if archivos_error > 0:
    print(f"❌ {archivos_error} errores durante el procesamiento")

# Paso 4: Git commit y push
print("\n📤 Paso 4: Haciendo commit y push a GitHub...")

try:
    # Configurar git (si es necesario)
    subprocess.run(["git", "config", "user.email", "bot@derechoartificial.com"], 
                  capture_output=True, timeout=10)
    subprocess.run(["git", "config", "user.name", "SEO Bot"], 
                  capture_output=True, timeout=10)
    
    # Add todos los cambios
    print("  ➕ Agregando cambios...")
    subprocess.run(["git", "add", "content/"], check=True, capture_output=True, timeout=30)
    
    # Commit
    print("  💾 Haciendo commit...")
    commit_msg = f"SEO: Optimize {archivos_procesados} meta tags (seoTitle, seoDescription, keywords)"
    subprocess.run(
        ["git", "commit", "-m", commit_msg],
        check=True,
        capture_output=True,
        timeout=30
    )
    
    # Push
    print("  🚀 Haciendo push a main...")
    resultado_push = subprocess.run(
        ["git", "push", "origin", "main"],
        capture_output=True,
        text=True,
        timeout=30
    )
    
    if resultado_push.returncode == 0:
        print("✅ Push completado exitosamente")
    else:
        print(f"⚠️  Push requiere autenticación")
        print(f"   Necesitas hacer: git push origin main")
        print(f"   (Git pedirá tu usuario/contraseña o token de GitHub)")
        
except subprocess.TimeoutExpired:
    print("⚠️  Timeout en operación git")
except subprocess.CalledProcessError as e:
    print(f"⚠️  Error en git: {e.stderr if e.stderr else e}")
except Exception as e:
    print(f"⚠️  Error inesperado: {e}")

print("\n" + "=" * 70)
print("✅ ¡COMPLETADO!")
print("=" * 70)
print(f"\n📊 Resumen:")
print(f"   ✅ {archivos_procesados} archivos .mdx actualizados")
print(f"   📝 Commit creado con mensaje: '{commit_msg}'")
print(f"   🚀 Push a GitHub: {resultado_push.returncode == 0}")

print(f"\n⏱️  Próximos pasos:")
print(f"   1. Espera 24-48 horas a que Google indexe los cambios")
print(f"   2. Abre Google Search Console")
print(f"   3. Revisa si CTR sube de 0% a 2-3%")
print(f"   4. Verifica posiciones de tus artículos")

print(f"\n💡 Tip: Si el push falló por autenticación:")
print(f"   - Usa un Personal Access Token de GitHub (más seguro que contraseña)")
print(f"   - O configura SSH keys")

