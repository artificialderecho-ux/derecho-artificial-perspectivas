# generar-redirecciones-final.ps1
# Genera redirecciones 301 basándose en las carpetas de content/ (excluyendo posts)

$redirects = @()

# 1. Obtener todas las categorías (carpetas de primer nivel en content, excepto posts)
$categorias = Get-ChildItem -Path "content" -Directory | Where-Object { $_.Name -ne "posts" }

# 2. Para cada categoría, buscar subcarpetas (artículos)
foreach ($cat in $categorias) {
    $subdirs = Get-ChildItem -Path $cat.FullName -Directory
    foreach ($sub in $subdirs) {
        $nombreBase = $sub.Name
        # Redirección de /posts/nombre a /categoria/nombre
        $redirects += @{
            source = "/posts/$nombreBase"
            destination = "/$($cat.Name)/$nombreBase"
            permanent = $true
        }
    }
}

# 3. Añadir redirecciones para los -doctrinal (basado en los pares conocidos)
$duplicados = @(
    @{ source = "20-613_5_doctrinal"; target = "propiedad-intelectual-ia/20-613_5_seo" },
    @{ source = "IAFiable-doctrinal"; target = "etica-ia/IAFiable-seo" },
    @{ source = "eu-ai-act-doctrinal-v3"; target = "normativa/eu-ai-act-resumen-v3" },
    @{ source = "sentencia-t-323-colombia-doctrinal-final"; target = "jurisprudencia/sentencia-t-323-colombia-resumen-final" },
    @{ source = "tendencias-legal-tech-doctrinal"; target = "firma-scarpa/tendencias-legal-tech-seo" }
)

foreach ($dup in $duplicados) {
    $redirects += @{
        source = "/posts/$($dup.source)"
        destination = "/$($dup.target)"
        permanent = $true
    }
}

# 4. Mostrar el bloque de redirecciones (con formato JSON válido)
Write-Host "`n=== REDIRECCIONES GENERADAS (copia este bloque y pégalo en vercel.json) ==="
$redirects | ForEach-Object {
    "    {"
    "      `"source`": `"$($_.source)`","
    "      `"destination`": `"$($_.destination)`","
    "      `"permanent`": $($_.permanent)"
    "    },"
}

Write-Host "`n=== FIN ==="
Write-Host "Total de redirecciones generadas: $($redirects.Count)"