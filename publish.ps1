# publish.ps1 - Publicacion automatica de posts en derechoartificial.com
# Uso: .\publish.ps1 -section ia-global -slug mi-post
# Con PDF: .\publish.ps1 -section jurisprudencia -slug mi-post -pdf "Archivo.pdf"

param(
    [Parameter(Mandatory=$true)]
    [string]$section,

    [Parameter(Mandatory=$true)]
    [string]$slug,

    [string]$pdf = "",

    [string]$proyecto = "C:\Proyectos\derecho-artificial",
    [string]$downloads = "C:\Users\34628\Downloads"
)

$ErrorActionPreference = "Stop"

$mdxOrigen  = Join-Path $downloads "$slug.mdx"
$mdxDestDir = Join-Path $proyecto "content\$section\$slug"
$mdxDestino = Join-Path $mdxDestDir "index.mdx"
$fuentes    = Join-Path $proyecto "public\fuentes"

Write-Host ""
Write-Host "derechoartificial.com - Publicador de posts" -ForegroundColor Cyan
Write-Host "Seccion : $section"
Write-Host "Slug    : $slug"
if ($pdf) { Write-Host "PDF     : $pdf" }
Write-Host ""

# 1. Verificar MDX en Downloads
if (-not (Test-Path $mdxOrigen)) {
    Write-Host "ERROR: No se encontro el MDX en: $mdxOrigen" -ForegroundColor Red
    Write-Host "Asegurate de que el archivo se llama exactamente: $slug.mdx" -ForegroundColor Yellow
    exit 1
}

# 2. Crear carpeta destino
if (-not (Test-Path $mdxDestDir)) {
    New-Item -ItemType Directory -Path $mdxDestDir -Force | Out-Null
    Write-Host "OK: Carpeta creada content\$section\$slug" -ForegroundColor Green
}

# 3. Copiar MDX con encoding UTF-8 sin BOM y LF
$content = Get-Content $mdxOrigen -Raw
$content = $content -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($mdxDestino, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "OK: MDX copiado con encoding UTF-8 LF" -ForegroundColor Green

# 4. Copiar PDF si se especifico
if ($pdf) {
    $pdfOrigen = Join-Path $downloads $pdf
    if (-not (Test-Path $pdfOrigen)) {
        Write-Host "ERROR: No se encontro el PDF en: $pdfOrigen" -ForegroundColor Red
        exit 1
    }
    if (-not (Test-Path $fuentes)) {
        New-Item -ItemType Directory -Path $fuentes -Force | Out-Null
    }
    $pdfDestino = Join-Path $fuentes $pdf
    Copy-Item $pdfOrigen $pdfDestino -Force
    Write-Host "OK: PDF copiado a public/fuentes/$pdf" -ForegroundColor Green
}

# 5. Verificar encoding
$firstLine = (Get-Content $mdxDestino -TotalCount 1)
if ($firstLine -ne "---") {
    Write-Host "AVISO: El MDX no empieza con --- puede haber un problema de formato" -ForegroundColor Yellow
} else {
    Write-Host "OK: Encoding verificado" -ForegroundColor Green
}

# 6. Git add, commit y push
Set-Location $proyecto

$commitMsg = "feat($section): publicar $slug"
git add "content/$section/$slug/index.mdx"
if ($pdf) { git add "public/fuentes/$pdf" }

$status = git status --porcelain
if (-not $status) {
    Write-Host "AVISO: No hay cambios que commitear (ya estaba publicado?)" -ForegroundColor Yellow
} else {
    git commit -m $commitMsg
    git push
    Write-Host "OK: Commit y push completados" -ForegroundColor Green
}

# 7. URL final
$route = @{
    "jurisprudencia"           = "jurisprudencia"
    "normativa"                = "normativa"
    "firma-scarpa"             = "firma-scarpa"
    "etica-ia"                 = "etica-ia"
    "propiedad-intelectual-ia" = "propiedad-intelectual-ia"
    "ia-global"                = "global-ia"
    "guias"                    = "recursos/guias"
    "glosario"                 = "glosario-ia-legal"
}
$urlPath = if ($route[$section]) { $route[$section] } else { $section }

Write-Host ""
Write-Host "Publicacion completada. Vercel desplegara en ~2 minutos." -ForegroundColor Cyan
Write-Host "URL: https://www.derechoartificial.com/$urlPath/$slug" -ForegroundColor White
Write-Host ""
