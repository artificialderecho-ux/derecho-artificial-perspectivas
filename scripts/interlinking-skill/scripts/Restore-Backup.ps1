#Requires -Version 5.1

<#
.SYNOPSIS
    Restores files from an interlinking backup

.DESCRIPTION
    Restores all files from a backup created by Create-Interlinking.ps1
    This is a safety mechanism in case you want to undo the interlinking changes.

.PARAMETER BackupPath
    Full path to the backup directory (e.g., C:\Proyectos\derecho-artificial\backups\backup-2026-03-10-120000)

.PARAMETER ProjectPath
    Path to the project root where files should be restored

.PARAMETER Confirm
    Ask for confirmation before restoring (default: $true)

.EXAMPLE
    # Restore from backup
    .\Restore-Backup.ps1 `
        -BackupPath "C:\Proyectos\derecho-artificial\backups\backup-2026-03-10-120000" `
        -ProjectPath "C:\Proyectos\derecho-artificial"

.EXAMPLE
    # Restore without confirmation
    .\Restore-Backup.ps1 `
        -BackupPath "C:\Proyectos\derecho-artificial\backups\backup-2026-03-10-120000" `
        -ProjectPath "C:\Proyectos\derecho-artificial" `
        -Confirm $false

#>

param(
    [Parameter(Mandatory = $true)]
    [string]$BackupPath,

    [Parameter(Mandatory = $true)]
    [string]$ProjectPath,

    [Parameter(Mandatory = $false)]
    [bool]$Confirm = $true
)

$ErrorActionPreference = "Stop"

Write-Host "🔄 RESTORING FROM BACKUP" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Verify paths
if (-not (Test-Path $BackupPath)) {
    Write-Error "Backup path not found: $BackupPath"
    exit 1
}

if (-not (Test-Path $ProjectPath)) {
    Write-Error "Project path not found: $ProjectPath"
    exit 1
}

# Get backup files
$backupFiles = Get-ChildItem -Path $BackupPath -Recurse -File

Write-Host "Backup location:  $BackupPath" -ForegroundColor Yellow
Write-Host "Restore to:       $ProjectPath" -ForegroundColor Yellow
Write-Host "Files to restore: $($backupFiles.Count)" -ForegroundColor Yellow
Write-Host ""

if ($Confirm) {
    Write-Host "⚠️  This will OVERWRITE files in the project directory." -ForegroundColor Red
    $response = Read-Host "Are you sure? Type 'yes' to continue"
    
    if ($response -ne 'yes') {
        Write-Host "Restore cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "Restoring files..." -ForegroundColor Yellow

$restored = 0
$failed = 0

foreach ($file in $backupFiles) {
    # Compute relative path
    $relativePath = $file.FullName.Replace($BackupPath, "").TrimStart("\").TrimStart("/")
    $targetPath = Join-Path $ProjectPath $relativePath
    $targetDir = Split-Path $targetPath
    
    try {
        # Create target directory if needed
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }
        
        # Copy file
        Copy-Item -Path $file.FullName -Destination $targetPath -Force
        Write-Host "  ✅ $relativePath" -ForegroundColor Green
        $restored += 1
    }
    catch {
        Write-Host "  ❌ $relativePath : $_" -ForegroundColor Red
        $failed += 1
    }
}

Write-Host ""
Write-Host "Restore complete:" -ForegroundColor Green
Write-Host "  Restored: $restored files"
Write-Host "  Failed:   $failed files"
Write-Host ""

if ($failed -eq 0) {
    Write-Host "✅ ALL FILES RESTORED SUCCESSFULLY" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Some files failed to restore. Check manually." -ForegroundColor Yellow
}

Write-Host ""
