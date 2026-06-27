# check-redirects.ps1 - Versión definitiva
# Verifica redirecciones 301/308 sin depender de excepciones

$baseUrl = "https://www.derechoartificial.com"

$redirects = @(
    @{Old="/posts/IAFiable-doctrinal"; New="/etica-ia/IAFiable-seo"},
    @{Old="/posts/IAFiable-seo"; New="/etica-ia/IAFiable-seo"},
    @{Old="/posts/the-claude-native-law-firm"; New="/firma-scarpa/the-claude-native-law-firm"},
    @{Old="/posts/tendencias-legal-tech-doctrinal"; New="/firma-scarpa/tendencias-legal-tech-seo"},
    @{Old="/posts/tendencias-legal-tech-seo"; New="/firma-scarpa/tendencias-legal-tech-seo"},
    @{Old="/posts/eu-ai-act-doctrinal-v3"; New="/normativa/eu-ai-act-resumen-v3"},
    @{Old="/posts/eu-ai-act-resumen-v3"; New="/normativa/eu-ai-act-resumen-v3"},
    @{Old="/posts/sentencia-t-323-colombia-doctrinal-final"; New="/jurisprudencia/sentencia-t-323-colombia-resumen-final"},
    @{Old="/posts/sentencia-t-323-colombia-resumen-final"; New="/jurisprudencia/sentencia-t-323-colombia-resumen-final"},
    @{Old="/posts/20-613_5_doctrinal"; New="/propiedad-intelectual-ia/20-613_5_seo"},
    @{Old="/posts/20-613_5_seo"; New="/propiedad-intelectual-ia/20-613_5_seo"},
    @{Old="/posts/carta-europea-inteligencia-artificial"; New="/etica-ia/carta-europea-inteligencia-artificial"},
    @{Old="/posts/guia-ia-act-abogados"; New="/guias-ia/guia-ia-act-abogados"},
    @{Old="/posts/analisis-negligencia-chatgpt"; New="/firma-scarpa/analisis-negligencia-chatgpt"},
    @{Old="/posts/betrayal-ai-act-liability-gap"; New="/firma-scarpa/betrayal-ai-act-liability-gap"}
)

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "  VERIFICANDO REDIRECCIONES (301/308)" -ForegroundColor Cyan
Write-Host "  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host "==================================================`n" -ForegroundColor Cyan

$ok = 0
$fail = 0
$warn = 0

foreach ($r in $redirects) {
    $source = $baseUrl + $r.Old
    $expectedDest = $baseUrl + $r.New

    try {
        # Realizar petición sin seguir redirecciones
        $response = Invoke-WebRequest -Uri $source -MaximumRedirection 0 -ErrorAction Stop

        # Si llegamos aquí, la respuesta no fue una excepción
        $status = $response.StatusCode
        if ($status -eq 301 -or $status -eq 302 -or $status -eq 307 -or $status -eq 308) {
            # Es una redirección; obtener Location
            $location = $response.Headers.Location
            if ($location) {
                $locationStr = $location.ToString()
                # Normalizar (eliminar trailing slash)
                $expectedNorm = $expectedDest.TrimEnd('/')
                $locationNorm = $locationStr.TrimEnd('/')
                if ($locationNorm -eq $expectedNorm) {
                    Write-Host "[OK] $($r.Old)" -ForegroundColor Green
                    Write-Host "     -> $status redirige a $($r.New)`n" -ForegroundColor Green
                    $ok++
                } else {
                    Write-Host "[WARN] $($r.Old)" -ForegroundColor Yellow
                    Write-Host "     -> $status redirige a $($locationStr)" -ForegroundColor Yellow
                    Write-Host "     -> Esperado: $($expectedDest)`n" -ForegroundColor Yellow
                    $warn++
                }
            } else {
                Write-Host "[WARN] $($r.Old)" -ForegroundColor Yellow
                Write-Host "     -> $status sin Location header`n" -ForegroundColor Yellow
                $warn++
            }
        } else {
            # No es redirección (ej. 200 OK)
            Write-Host "[FAIL] $($r.Old)" -ForegroundColor Red
            Write-Host "     -> No redirige (Status: $status)`n" -ForegroundColor Red
            $fail++
        }
    } catch {
        # Si la petición falló por otro motivo (ej. 404, timeout)
        Write-Host "[FAIL] $($r.Old)" -ForegroundColor Red
        Write-Host "     -> Error: $_`n" -ForegroundColor Red
        $fail++
    }
}

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  RESUMEN:" -ForegroundColor Cyan
Write-Host "  OK: $ok" -ForegroundColor Green
Write-Host "  WARN: $warn" -ForegroundColor Yellow
Write-Host "  FAIL: $fail" -ForegroundColor Red
Write-Host "==================================================" -ForegroundColor Cyan