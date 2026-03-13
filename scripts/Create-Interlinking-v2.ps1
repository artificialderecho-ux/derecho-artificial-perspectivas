param(
    [string]$ProjectPath = "C:\Proyectos\derecho-artificial",
    [bool]$DryRun = $true,
    [bool]$CreateBackup = $true
)

$ContentPath = Join-Path $ProjectPath "content\posts"
$BackupPath = Join-Path $ProjectPath ("backups\interlinking-v2-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
$ReportPath = Join-Path $ProjectPath "interlinking-v2-report.json"

$relatedMap = @{
    "eu-ai-act-doctrinal-v3" = @("eu-ai-act-resumen-v3", "ai-act-guia-completa", "guia-ia-act-abogados")
    "eu-ai-act-resumen-v3" = @("eu-ai-act-doctrinal-v3", "ai-act-guia-completa", "guia-ia-act-abogados")
    "ai-act-guia-completa" = @("eu-ai-act-resumen-v3", "guia-ia-act-abogados", "ia-agentica-rgpd")
    "sentencia-t-323-colombia-doctrinal-final" = @("sentencia-t-323-colombia-resumen-final", "encrucijada-ia-sistema-justicia-contemporanea", "guia-ia-jueces-protocolos")
    "sentencia-t-323-colombia-resumen-final" = @("sentencia-t-323-colombia-doctrinal-final", "guia-ia-jueces-protocolos")
    "responsabilidad-penal-ia-deepfakes-pornografia-infantil-2026-doctrinal" = @("responsabilidad-penal-ia-deepfakes-pornografia-infantil-2026-seo", "multa_deepfake", "jurisprudencia-ia-voice-cloning-lgberlin")
    "responsabilidad-penal-ia-deepfakes-pornografia-infantil-2026-seo" = @("responsabilidad-penal-ia-deepfakes-pornografia-infantil-2026-doctrinal", "multa_deepfake")
    "tendencias-legal-tech-doctrinal" = @("tendencias-legal-tech-seo", "the-claude-native-law-firm", "la-ia-en-la-abogacia-analisis")
    "tendencias-legal-tech-seo" = @("tendencias-legal-tech-doctrinal", "the-claude-native-law-firm")
    "charte-ia-france-doctrinal-final" = @("charte-ia-france-resumen-final", "carta-europea-inteligencia-artificial", "convenio_europea_ia_democracia")
    "charte-ia-france-resumen-final" = @("charte-ia-france-doctrinal-final", "carta-europea-inteligencia-artificial")
    "IAFiable-doctrinal" = @("IAFiable-seo", "seguridad-de-la-ia-2026", "carta-europea-inteligencia-artificial")
    "IAFiable-seo" = @("IAFiable-doctrinal", "seguridad-de-la-ia-2026")
    "guia-aepd-uso-de-imagenes-de-terceros-en-sistemas-ia" = @("guia-aepd-uso-de-imagenes-de-terceros-en-sistemas-ia_seo", "rgpd-gobernanza-datos-ia", "ia-generativa-copyright-estudio-ue")
    "guia-aepd-uso-de-imagenes-de-terceros-en-sistemas-ia_seo" = @("guia-aepd-uso-de-imagenes-de-terceros-en-sistemas-ia", "rgpd-gobernanza-datos-ia")
    "getty-images-v-stability-ai" = @("caso-kneschke-vs-laion", "encrucijada-derecho-autor-ia-generativa", "ia-generativa-copyright-estudio-ue")
    "caso-kneschke-vs-laion" = @("getty-images-v-stability-ai", "ia-generativa-copyright-estudio-ue")
    "analisis-caso-dabus" = @("thaler-perlmutter-certiorari-copyright-ia", "encrucijada-derecho-autor-ia-generativa")
    "thaler-perlmutter-certiorari-copyright-ia" = @("analisis-caso-dabus", "ia-generativa-copyright-estudio-ue", "encrucijada-derecho-autor-ia-generativa")
    "ia-agentica-rgpd" = @("rgpd-gobernanza-datos-ia", "ec-agentic-ai", "seguridad-de-la-ia-2026")
    "rgpd-gobernanza-datos-ia" = @("ia-agentica-rgpd", "ia-generativa-copyright-estudio-ue")
    "stsj-ia-procedencia-despido" = @("sentencia-2025-audiencia-nacional-libertad-sindical-algoritmos", "caso-eeoc-v-itutorgroup")
    "sentencia-2025-audiencia-nacional-libertad-sindical-algoritmos" = @("stsj-ia-procedencia-despido", "caso-eeoc-v-itutorgroup")
    "justicia-inteligente-en-china" = @("smart-courts-china-scarpa", "encrucijada-ia-sistema-justicia-contemporanea", "guia-ia-jueces-protocolos")
    "smart-courts-china-scarpa" = @("justicia-inteligente-en-china", "encrucijada-ia-sistema-justicia-contemporanea")
    "analisis-negligencia-chatgpt" = @("alucinaciones-rag-herramientas-legales", "analisis_ta_orleans_alucinaciones_ia", "INFORME_MATA_AVIANCA_IA_LEGAL")
    "alucinaciones-rag-herramientas-legales" = @("analisis-negligencia-chatgpt", "analisis_ta_orleans_alucinaciones_ia", "analisis_ukut_ai_hallucinations_supervision_2026")
    "INFORME_MATA_AVIANCA_IA_LEGAL" = @("analisis-negligencia-chatgpt", "analisis_ta_orleans_alucinaciones_ia")
}

function Get-TitleFromFile($filePath) {
    $lines = Get-Content -LiteralPath $filePath -TotalCount 10
    foreach ($line in $lines) {
        if ($line -match '^title:\s*["'']?(.+?)["'']?\s*$') { return $matches[1] }
    }
    return $null
}

function Get-CategoryFromFile($filePath) {
    $lines = Get-Content -LiteralPath $filePath -TotalCount 15
    foreach ($line in $lines) {
        if ($line -match '^category:\s*["'']?(.+?)["'']?\s*$') { return $matches[1] }
    }
    return "firma-scarpa"
}

Write-Host "INTERLINKING v2 - Mode: $(if ($DryRun) { 'DRY RUN' } else { 'LIVE' })"

$allFiles = Get-ChildItem -Path $ContentPath -Filter "*.mdx" | Where-Object {
    $_.Name -notmatch "fallback" -and $_.Name -notmatch "^ec-" -and $_.Name -notmatch "^aesia-[12]"
}

Write-Host "Archivos: $($allFiles.Count)"

if (-not $DryRun -and $CreateBackup) {
    New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
    foreach ($f in $allFiles) { Copy-Item -LiteralPath $f.FullName -Destination $BackupPath }
    Write-Host "Backup: $BackupPath"
}

$totalLinks = 0
$totalModified = 0

foreach ($file in $allFiles) {
    $slug = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $related = $relatedMap[$slug]
    if ($null -eq $related) { continue }

    $content = Get-Content -LiteralPath $file.FullName -Raw
    $originalSize = $content.Length

    if ($content -match "## Articulos relacionados|## Related|## Ver tambien") { continue }

    $links = @()
    foreach ($rSlug in $related) {
        $rFile = $allFiles | Where-Object { [System.IO.Path]::GetFileNameWithoutExtension($_.Name) -eq $rSlug } | Select-Object -First 1
        if ($null -eq $rFile) { continue }
        $title = Get-TitleFromFile $rFile.FullName
        if ($null -eq $title) { continue }
        $cat = Get-CategoryFromFile $rFile.FullName
        $links += "- [$title](/$cat/$rSlug)"
        if ($links.Count -ge 3) { break }
    }

    if ($links.Count -eq 0) { continue }

    $block = "`n`n## Articulos relacionados`n`n" + ($links -join "`n")
    $newContent = $content.TrimEnd() + $block

    if ($newContent.Length -lt $originalSize) {
        Write-Host "ABORTADO truncado: $slug"
        continue
    }

    $totalLinks += $links.Count
    $totalModified++

    if ($DryRun) {
        Write-Host "[DRY] $slug -> $($links.Count) enlaces:"
        $links | ForEach-Object { Write-Host "  $_" }
    } else {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.UTF8Encoding]::new($false))
        Write-Host "OK: $slug -> $($links.Count) enlaces"
    }
}

Write-Host "`nRESUMEN: $totalModified archivos, $totalLinks enlaces"