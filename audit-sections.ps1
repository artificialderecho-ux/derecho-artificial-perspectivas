# ============================================================================
# AUDIT SCRIPT: Verifica inconsistencias entre frontmatter y secciones
# ============================================================================
# Este script busca posts cuyo frontmatter no coincide con la sección esperada

cd C:\Proyectos\derecho-artificial

# Secciones válidas (de mdx-utils.ts)
$validSections = @(
    'jurisprudencia',
    'normativa',
    'firma-scarpa',
    'etica-ia',
    'propiedad-intelectual-ia',
    'global-ia',
    'guias',
    'glosario'
)

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "AUDITORÍA DE SECCIONES - Verificando consistencia" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

$issues = @()
$checked = 0
$fixed = 0

# Función para extraer frontmatter
function Get-Frontmatter {
    param([string]$FilePath)
    
    $content = Get-Content $FilePath -Raw
    
    # Buscar sección entre --- y ---
    if ($content -match '---\s*([\s\S]*?)\s*---') {
        $frontmatter = $matches[1]
        
        # Extraer section y category
        $section = if ($frontmatter -match 'section:\s*["\']?([^"'`\n]+)') { $matches[1].Trim() } else { $null }
        $category = if ($frontmatter -match 'category:\s*["\']?([^"'`\n]+)') { $matches[1].Trim() } else { $null }
        
        return @{
            section = $section
            category = $category
        }
    }
    
    return $null
}

# Auditar cada sección
foreach ($section in $validSections) {
    $sectionPath = "content\$section"
    
    if (-not (Test-Path $sectionPath)) {
        Write-Host "⚠️  Sección NO EXISTE: $section" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "🔍 Auditando: $section" -ForegroundColor Cyan
    
    # Obtener todas las carpetas con index.mdx
    $posts = Get-ChildItem $sectionPath -Directory | Where-Object {
        Test-Path (Join-Path $_.FullName "index.mdx")
    }
    
    if ($posts.Count -eq 0) {
        Write-Host "   ℹ️  0 posts" -ForegroundColor Gray
        continue
    }
    
    Write-Host "   📄 Posts encontrados: $($posts.Count)"
    
    foreach ($post in $posts) {
        $checked++
        $mdxFile = Join-Path $post.FullName "index.mdx"
        $frontmatter = Get-Frontmatter $mdxFile
        
        if ($null -eq $frontmatter) {
            Write-Host "   ❌ $($post.Name) - NO HAY FRONTMATTER VÁLIDO" -ForegroundColor Red
            $issues += @{
                post = $post.Name
                section = $section
                issue = "No frontmatter"
                file = $mdxFile
            }
            continue
        }
        
        $fm_section = $frontmatter.section
        $fm_category = $frontmatter.category
        
        # Verificar inconsistencias
        if ($fm_section -and $fm_section -ne $section) {
            Write-Host "   ⚠️  $($post.Name)" -ForegroundColor Yellow
            Write-Host "      Expected section: $section" -ForegroundColor Yellow
            Write-Host "      Got section: $fm_section" -ForegroundColor Yellow
            
            $issues += @{
                post = $post.Name
                section = $section
                issue = "Section mismatch"
                file = $mdxFile
                expected = $section
                actual = $fm_section
            }
        }
        
        # Verificar que category coincida con section (para [slug]/page.tsx)
        if ($fm_category -and $fm_category -ne $section) {
            Write-Host "   ⚠️  $($post.Name)" -ForegroundColor Yellow
            Write-Host "      Expected category: $section" -ForegroundColor Yellow
            Write-Host "      Got category: $fm_category" -ForegroundColor Yellow
            
            $issues += @{
                post = $post.Name
                section = $section
                issue = "Category mismatch"
                file = $mdxFile
                expected = $section
                actual = $fm_category
            }
        }
    }
    
    Write-Host ""
}

# Resumen
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "RESUMEN" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✓ Posts auditados: $checked" -ForegroundColor Green
Write-Host "⚠️  Problemas encontrados: $($issues.Count)" -ForegroundColor Yellow
Write-Host ""

if ($issues.Count -gt 0) {
    Write-Host "DETALLES DE PROBLEMAS:" -ForegroundColor Yellow
    Write-Host ""
    
    foreach ($issue in $issues) {
        Write-Host "Post: $($issue.post)" -ForegroundColor Red
        Write-Host "  Sección: $($issue.section)" -ForegroundColor Gray
        Write-Host "  Problema: $($issue.issue)" -ForegroundColor Yellow
        
        if ($issue.expected) {
            Write-Host "  Esperado: $($issue.expected)" -ForegroundColor Gray
            Write-Host "  Actual: $($issue.actual)" -ForegroundColor Red
        }
        
        Write-Host "  Archivo: $($issue.file)" -ForegroundColor Gray
        Write-Host ""
    }
    
    Write-Host "PRÓXIMOS PASOS:" -ForegroundColor Cyan
    Write-Host "1. Abre cada archivo listado arriba en VS Code" -ForegroundColor Cyan
    Write-Host "2. En el frontmatter, asegúrate que:" -ForegroundColor Cyan
    Write-Host "   - section: '<nombre-sección>' (debe coincidir con la carpeta)" -ForegroundColor Cyan
    Write-Host "   - category: '<nombre-sección>' (DEBE SER IGUAL A section para [slug]/page.tsx)" -ForegroundColor Cyan
    Write-Host "3. Guarda y haz commit" -ForegroundColor Cyan
    Write-Host "4. Vuelve a ejecutar este script para verificar" -ForegroundColor Cyan
} else {
    Write-Host "✅ NO HAY PROBLEMAS - Todas las secciones son consistentes" -ForegroundColor Green
}

Write-Host ""
