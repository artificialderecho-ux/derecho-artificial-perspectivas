# ============================================
# SCRIPT: Optimizar next.config.js para derecho-artificial
# ============================================
# Uso: .\optimizar-build.ps1
# Este script:
# 1. Respalda el next.config.js actual
# 2. Reemplaza con versión optimizada
# 3. Limpia cache (.next)
# 4. Valida cambios con npm run build
# 5. Si todo funciona, hace commit automático

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Optimizando next.config.js" -ForegroundColor Cyan
Write-Host "Proyecto: derecho-artificial" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en la carpeta correcta
if (-not (Test-Path "next.config.js")) {
    Write-Host "ERROR: No estamos en la raiz de derecho-artificial" -ForegroundColor Red
    Write-Host "Asegurate de estar en: C:\Proyectos\derecho-artificial" -ForegroundColor Yellow
    exit 1
}

# PASO 1: Respaldar configuración actual
Write-Host "[1/5] Respaldando next.config.js actual..." -ForegroundColor Green
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupFile = "next.config.js.backup.$timestamp"
Copy-Item "next.config.js" $backupFile
Write-Host "     OK Backup guardado como: $backupFile" -ForegroundColor Green
Write-Host ""

# PASO 2: Crear nueva configuración optimizada
Write-Host "[2/5] Aplicando configuración optimizada..." -ForegroundColor Green

$optimizedConfig = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    isrMemoryCacheSize: 0,
    swcMinify: true,
  },

  onDemandEntries: {
    maxInactiveAge: 15 * 60 * 1000,
    pagesBufferLength: 2,
  },

  compress: true,

  productionBrowserSourceMaps: false,

  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
      nodeEnv: false,
    };

    return config;
  },

  swcMinify: true,
};

export default nextConfig;
'@

Set-Content -Path "next.config.js" -Value $optimizedConfig -Encoding UTF8
Write-Host "     OK Configuracion aplicada" -ForegroundColor Green
Write-Host ""

# PASO 3: Limpiar cache
Write-Host "[3/5] Limpiando cache de builds anteriores..." -ForegroundColor Green
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "     OK .next eliminado" -ForegroundColor Green
} else {
    Write-Host "     INFO No hay cache anterior (normal en primer intento)" -ForegroundColor Yellow
}
Write-Host ""

# PASO 4: Validar con build local
Write-Host "[4/5] Validando cambios (npm run build)..." -ForegroundColor Green
Write-Host "     Este paso puede tardar 3-10 minutos..." -ForegroundColor Yellow
Write-Host "     Monitorea el output abajo:" -ForegroundColor Yellow
Write-Host ""

npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "     OK BUILD EXITOSO - Sin errores de memoria" -ForegroundColor Green
    $buildSuccess = $true
} else {
    Write-Host ""
    Write-Host "     ERROR Build fallo. Saliendo sin hacer commit." -ForegroundColor Red
    Write-Host ""
    Write-Host "Si el error es 'out of memory', necesitaras:" -ForegroundColor Yellow
    Write-Host "  1. Aplicar optimizaciones del PASO 5 (ver guia)" -ForegroundColor Yellow
    Write-Host "  2. O cambiar a Enhanced Builds en Vercel" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# PASO 5: Hacer commit automático
Write-Host "[5/5] Preparando para deploy..." -ForegroundColor Green

git add next.config.js
git commit -m "perf: optimize next.config.js for memory usage - disable ISR cache and reduce on-demand buffer"

if ($LASTEXITCODE -eq 0) {
    Write-Host "     OK Cambios comprometidos en Git" -ForegroundColor Green
} else {
    Write-Host "     INFO Git commit fallo (probablemente no hay cambios nuevos)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "OK OPTIMIZACION COMPLETADA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Siguientes pasos:" -ForegroundColor Green
Write-Host "  1. Haz push a GitHub:" -ForegroundColor Green
Write-Host "     git push" -ForegroundColor Cyan
Write-Host ""
Write-Host "  2. Vercel hara rebuild automaticamente" -ForegroundColor Green
Write-Host "     Monitorea en: https://vercel.com/projects" -ForegroundColor Cyan
Write-Host ""
Write-Host "  3. Una vez deployado, verifica que carga:" -ForegroundColor Green
Write-Host "     https://www.derechoartificial.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Si el build en Vercel aun falla, ejecuta esta guia:" -ForegroundColor Yellow
Write-Host "  Ver: OPTIMIZAR-NEXT-CONFIG.md (Paso 5 - Modo Agresivo)" -ForegroundColor Yellow
Write-Host ""
