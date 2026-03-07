// diagnostico.cjs - Detecta inconsistencias entre arquitectura legacy y nueva
// Uso: node scripts/diagnostico.cjs

const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

const SECTION_ROUTES = {
  'jurisprudencia':           'jurisprudencia',
  'normativa':                'normativa',
  'firma-scarpa':             'firma-scarpa',
  'etica-ia':                 'etica-ia',
  'propiedad-intelectual-ia': 'propiedad-intelectual-ia',
  'ia-global':                'ia-global',
  'guias':                    'recursos/guias',
  'glosario':                 'glosario-ia-legal',
  'global-ia':                'global-ia',
};

const NEW_SECTIONS = Object.keys(SECTION_ROUTES);
const errors = [];
const warnings = [];
const ok = [];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w[\w-]*):\s*["']?([^"'\n#]+)["']?/);
    if (m) fm[m[1].trim()] = m[2].trim();
  }
  return fm;
}

// 1. Escanear content/<section>/<slug>/index.mdx
for (const section of NEW_SECTIONS) {
  const dir = path.join(BASE, 'content', section);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const mdxPath = path.join(dir, slug, 'index.mdx');
    if (!fs.existsSync(mdxPath)) {
      warnings.push('SIN index.mdx: content/' + section + '/' + slug + '/');
      continue;
    }
    const content = fs.readFileSync(mdxPath, 'utf8');
    const fm = parseFrontmatter(content);

    if (!content.startsWith('---')) {
      errors.push('SIN FRONTMATTER: content/' + section + '/' + slug + '/index.mdx');
      continue;
    }
    if (!fm.section) {
      errors.push('SIN CAMPO section: content/' + section + '/' + slug + '/index.mdx (category: ' + (fm.category || 'ninguno') + ')');
    } else if (fm.section !== section) {
      errors.push('section INCORRECTA: content/' + section + '/' + slug + '/index.mdx tiene section:"' + fm.section + '" pero esta en carpeta "' + section + '"');
    }
    if (!fm.author || fm.author !== 'Ricardo Scarpa') {
      warnings.push('author incorrecto: content/' + section + '/' + slug + '/index.mdx (author: "' + (fm.author || 'vacio') + '")');
    }
    if (!fm.date || !/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) {
      warnings.push('date malformada: content/' + section + '/' + slug + '/index.mdx (date: "' + (fm.date || 'vacio') + '")');
    }
    const routePath = SECTION_ROUTES[section];
    const appDir = path.join(BASE, 'src', 'app', ...routePath.split('/'), '[slug]', 'page.tsx');
    if (!fs.existsSync(appDir)) {
      errors.push('SIN ROUTER DINAMICO: no existe src/app/' + routePath + '/[slug]/page.tsx para section "' + section + '"');
    }
    if (fm.slug && fm.slug !== slug) {
      warnings.push('slug inconsistente: carpeta "' + slug + '" pero frontmatter slug:"' + fm.slug + '"');
    }
    ok.push('OK: content/' + section + '/' + slug + '/');
  }
}

// 2. Detectar page.tsx estaticos huerfanos
for (const section of NEW_SECTIONS) {
  const routePath = SECTION_ROUTES[section];
  const appSectionDir = path.join(BASE, 'src', 'app', ...routePath.split('/'));
  if (!fs.existsSync(appSectionDir)) continue;
  for (const entry of fs.readdirSync(appSectionDir)) {
    const full = path.join(appSectionDir, entry);
    if (!fs.statSync(full).isDirectory()) continue;
    if (entry === '[slug]') continue;
    if (fs.existsSync(path.join(full, 'page.tsx'))) {
      warnings.push('PAGE.TSX ESTATICO HUERFANO: src/app/' + routePath + '/' + entry + '/page.tsx');
    }
  }
}

// 3. Verificar que los [slug]/page.tsx filtran por section
for (const section of NEW_SECTIONS) {
  const routePath = SECTION_ROUTES[section];
  const slugPage = path.join(BASE, 'src', 'app', ...routePath.split('/'), '[slug]', 'page.tsx');
  if (!fs.existsSync(slugPage)) continue;
  const content = fs.readFileSync(slugPage, 'utf8');
  if (!content.includes('section') && !content.includes('getPostBySlug') && !content.includes('listSectionResourceSlugs')) {
    errors.push('FILTRO SIN section: src/app/' + routePath + '/[slug]/page.tsx no filtra por frontmatter.section');
  }
}

// 4. Posts legacy con section nueva
const postsDir = path.join(BASE, 'content', 'posts');
let legacyCount = 0;
if (fs.existsSync(postsDir)) {
  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith('.mdx')) continue;
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const fm = parseFrontmatter(content);
    if (fm.section && NEW_SECTIONS.includes(fm.section)) {
      warnings.push('POST LEGACY CON section NUEVA: content/posts/' + file + ' (section:"' + fm.section + '")');
    }
    legacyCount++;
  }
}

// REPORTE
console.log('\n========================================');
console.log('  DIAGNOSTICO derechoartificial.com');
console.log('========================================\n');
console.log('ERRORES CRITICOS (' + errors.length + '):');
if (errors.length === 0) { console.log('  Ninguno\n'); }
else { errors.forEach(e => console.log('  ERROR: ' + e)); console.log(''); }

console.log('AVISOS (' + warnings.length + '):');
if (warnings.length === 0) { console.log('  Ninguno\n'); }
else { warnings.forEach(w => console.log('  AVISO: ' + w)); console.log(''); }

console.log('POSTS EN NUEVA ARQUITECTURA: ' + ok.length);
console.log('POSTS EN ARQUITECTURA LEGACY (content/posts/): ' + legacyCount);
console.log('\n========================================');
if (errors.length > 0) {
  console.log('HAY ERRORES CRITICOS - algunos posts pueden dar 404');
  process.exit(1);
} else {
  console.log('Sin errores criticos. El sitio deberia funcionar correctamente.');
}
