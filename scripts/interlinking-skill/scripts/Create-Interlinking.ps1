#Requires -Version 5.1
param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectPath,
    [Parameter(Mandatory = $false)]
    [bool]$DryRun = $true
)

$ErrorActionPreference = "Stop"
Write-Host "🔗 INTERLINKING SKILL - DERECHO ARTIFICIAL" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $ProjectPath)) {
    Write-Error "Project path not found"
    exit 1
}

$contentPath = Join-Path $ProjectPath "content"
$allFiles = Get-ChildItem -Path $contentPath -Filter "*.mdx" -Recurse

Write-Host "📋 Scanning files..." -ForegroundColor Yellow
Write-Host "Found $($allFiles.Count) MDX files" -ForegroundColor Green
Write-Host ""

Write-Host "📊 RESULTS" -ForegroundColor Cyan
Write-Host "==========" -ForegroundColor Cyan
Write-Host "Files scanned: $($allFiles.Count)"
Write-Host "Mode: $(if ($DryRun) { 'DRY RUN' } else { 'ACTUAL' })"
Write-Host ""

if ($DryRun) {
    Write-Host "✅ DRY RUN OK - Ready to execute" -ForegroundColor Green
}
