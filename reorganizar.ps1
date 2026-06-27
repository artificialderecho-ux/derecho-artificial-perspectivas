# reorganizar.ps1
# Script para consolidar duplicados y mover archivos sueltos de /posts/

$ErrorActionPreference = "Stop"

# 1. DEFINIR MAPEOS: archivo en /posts/ -> carpeta destino (dentro de /content/)
$mapeos = @{
    # Duplicados (se quedan los -seo, se eliminan los -doctrinal)
    "IAFiable-seo.mdx" = @{ destino = "etica-ia"; esDuplicado = $false }
    "IAFiable-doctrinal.mdx" = @{ destino = "etica-ia"; esDuplicado = $true }
    "20-613_5_seo.mdx" = @{ destino = "propiedad-intelectual-ia"; esDuplicado = $false }
    "20-613_5_doctrinal.mdx" = @{ destino = "propiedad-intelectual-ia"; esDuplicado = $true }
    "TSB1714-seo.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "TSB1714-doctrinal.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $true }
    "tendencias-legal-tech-seo.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $false }
    "tendencias-legal-tech-doctrinal.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $true }
    "eu-ai-act-resumen-v3.mdx" = @{ destino = "normativa"; esDuplicado = $false }
    "eu-ai-act-doctrinal-v3.mdx" = @{ destino = "normativa"; esDuplicado = $true }
    "sentencia-t-323-colombia-resumen-final.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "sentencia-t-323-colombia-doctrinal-final.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $true }
    # Archivos sueltos (sin duplicar)
    "the-claude-native-law-firm.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $false }
    "carta-europea-inteligencia-artificial.mdx" = @{ destino = "etica-ia"; esDuplicado = $false }
    "guia-ia-act-abogados.mdx" = @{ destino = "guias-ia"; esDuplicado = $false }
    "thaler-perlmutter-certiorari-copyright-ia.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "analisis-negligencia-chatgpt.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $false }
    "charte-ia-france-resumen-final.mdx" = @{ destino = "etica-ia"; esDuplicado = $false }
    "convenio_europea_ia_democracia.mdx" = @{ destino = "etica-ia"; esDuplicado = $false }
    "INFORME_MATA_AVIANCA_IA_LEGAL.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "stsj-ia-procedencia-despido.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "usa_vs_heppner.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "xai-openai-trade-secrets-analisis.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "zapata-vargas.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "multa_deepfake.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "parodia-ia-ue.mdx" = @{ destino = "propiedad-intelectual-ia"; esDuplicado = $false }
    "ia-agentica-rgpd.mdx" = @{ destino = "normativa"; esDuplicado = $false }
    "seguridad-de-la-ia-2026.mdx" = @{ destino = "normativa"; esDuplicado = $false }
    "encrucijada-derecho-autor-ia-generativa.mdx" = @{ destino = "propiedad-intelectual-ia"; esDuplicado = $false }
    "encrucijada-ia-sistema-justicia-contemporanea.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $false }
    "la-ia-en-la-abogacia-analisis.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $false }
    "getty-images-v-stability-ai.mdx" = @{ destino = "propiedad-intelectual-ia"; esDuplicado = $false }
    "caso-kneschke-vs-laion.mdx" = @{ destino = "propiedad-intelectual-ia"; esDuplicado = $false }
    "caso-eeoc-v-itutorgroup.mdx" = @{ destino = "global-ia"; esDuplicado = $false }
    "guia-aepd-uso-de-imagenes-de-terceros-en-sistemas-ia.mdx" = @{ destino = "guias-ia"; esDuplicado = $false }
    "analisis_ta_orleans_alucinaciones_ia.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "analisis_ukut_ai_hallucinations_supervision_2026.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "articulo_ia_judicial_comparado.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $false }
    "auto-38-2024-tsj-navarra-buena-fe-procesal-ia-generativa.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "betrayal-ai-act-liability-gap.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $false }
    "big-brother-watch-analisis-cedh.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "blindaje-de-propiedad-intelectual-en-la-era-de-la-ia-generativa.mdx" = @{ destino = "propiedad-intelectual-ia"; esDuplicado = $false }
    "analisis-reglamento-ia-farmaceutico.mdx" = @{ destino = "normativa"; esDuplicado = $false }
    "analisis-sentencia-tsj-canarias.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "amparo-directo-6-2025-scjn-jurisprudencia.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "ewhc_1383_2025.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "Kettering_USA_25_February_2026.mdx" = @{ destino = "jurisprudencia"; esDuplicado = $false }
    "ue-commission-vs-x-dsa-analisis-juridico.mdx" = @{ destino = "firma-scarpa"; esDuplicado = $false }
    "Inteligencia_Artificial_y_Defensa_SEO.mdx" = @{ destino = "etica-ia"; esDuplicado = $false }
}

# 2. PROCESAR CADA ARCHIVO
$redirects = @()
foreach ($archivo in $mapeos.Keys) {
    $info = $mapeos[$archivo]
    $origen = Join-Path "content\posts" $archivo
    $destinoCarpeta = $info.destino
    $nombreBase = [System.IO.Path]::GetFileNameWithoutExtension($archivo)
    
    # Si es duplicado (-doctrinal), lo eliminamos y generamos redirección al -seo
    if ($info.esDuplicado) {
        if (Test-Path $origen) {
            Write-Host "Eliminando duplicado: $archivo"
            git rm $origen
            # Redirigir al -seo correspondiente
            $seoNombre = $archivo -replace "-doctrinal", "-seo"
            $destinoUrl = "/posts/$seoNombre" -replace "\.mdx$", ""
            $redirects += @{
                source = "/posts/$nombreBase"
                destination = $destinoUrl
                permanent = $true
            }
        }
        continue
    }
    
    # Si no es duplicado y existe el archivo, moverlo a la carpeta destino
    if (Test-Path $origen) {
        $destinoDir = Join-Path "content" $destinoCarpeta
        $destinoArchivo = Join-Path $destinoDir "$nombreBase\index.mdx"
        
        # Crear carpeta destino si no existe
        if (-not (Test-Path $destinoDir)) {
            New-Item -ItemType Directory -Path $destinoDir -Force | Out-Null
        }
        
        # Crear subcarpeta para el post
        $postDir = Join-Path $destinoDir $nombreBase
        if (-not (Test-Path $postDir)) {
            New-Item -ItemType Directory -Path $postDir -Force | Out-Null
        }
        
        # Mover el archivo
        Write-Host "Moviendo: $archivo -> $destinoArchivo"
        Move-Item -Path $origen -Destination $destinoArchivo -Force
        
        # Añadir redirección desde la URL antigua a la nueva
        $redirects += @{
            source = "/posts/$nombreBase"
            destination = "/$destinoCarpeta/$nombreBase"
            permanent = $true
        }
    } else {
        Write-Host "ADVERTENCIA: $archivo no encontrado en content/posts/"
    }
}

# 3. GENERAR EL BLOQUE DE REDIRECCIONES PARA VERCEL.JSON
Write-Host "`n=== REDIRECCIONES GENERADAS (copia este bloque y pégalo en vercel.json) ==="
$redirects | ForEach-Object {
    Write-Host "    {"
    Write-Host "      `"source`": `"$($_.source)`","
    Write-Host "      `"destination`": `"$($_.destination)`","
    Write-Host "      `"permanent`": $($_.permanent)"
    Write-Host "    },"
}

Write-Host "`n=== FIN DEL SCRIPT ==="
Write-Host "Recuerda: después de ejecutar, revisa los cambios con 'git status' y luego haz commit y push."