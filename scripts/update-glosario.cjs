// update-glosario.js
const fs = require('fs');
const path = require('path');
const BASE = process.cwd();
const GLOSARIO_HTML = path.join(BASE, 'public', 'Recursos', 'glosario.html');
const MDX_DIRS = [
  path.join(BASE, 'content', 'posts'),
  path.join(BASE, 'content', 'jurisprudencia'),
  path.join(BASE, 'content', 'ia-global'),
  path.join(BASE, 'content', 'global-ia'),
  path.join(BASE, 'content', 'normativa'),
  path.join(BASE, 'content', 'firma-scarpa'),
  path.join(BASE, 'content', 'etica-ia'),
  path.join(BASE, 'content', 'propiedad-intelectual-ia'),
];
function extractTermsFromMdx(content) {
  const terms = [];
  const lines = content.split('\n');
  let inGlosario = false;
  let currentTerm = null;
  let currentDef = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{1,3}\s*(glosario|glossary|t.rminos clave)/i.test(line)) { inGlosario = true; continue; }
    if (inGlosario && /^#{1,3}\s+[^Gg]/.test(line)) {
      if (currentTerm && currentDef.length > 0) { terms.push({ term: currentTerm, def: currentDef.join(' ').trim() }); currentTerm = null; currentDef = []; }
      inGlosario = false; continue;
    }
    if (!inGlosario) continue;
    const boldTerm = line.match(/^\s*\*\*([^*]+)\*\*[:\s]*(.*)/);
    if (boldTerm) {
      if (currentTerm && currentDef.length > 0) terms.push({ term: currentTerm, def: currentDef.join(' ').trim() });
      currentTerm = boldTerm[1].trim().replace(/:$/, ''); currentDef = boldTerm[2] ? [boldTerm[2].trim()] : []; continue;
    }
    const listBold = line.match(/^\s*[-*]\s+\*\*([^*]+)\*\*[:\s]*(.*)/);
    if (listBold) {
      if (currentTerm && currentDef.length > 0) terms.push({ term: currentTerm, def: currentDef.join(' ').trim() });
      currentTerm = listBold[1].trim().replace(/:$/, ''); currentDef = listBold[2] ? [listBold[2].trim()] : []; continue;
    }
    if (currentTerm && line.trim() && !line.startsWith('#')) {
      const clean = line.trim().replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/^[-*]\s+/, '');
      if (clean) currentDef.push(clean);
    }
  }
  if (currentTerm && currentDef.length > 0) terms.push({ term: currentTerm, def: currentDef.join(' ').trim() });
  return terms.filter(t => t.term.length > 2 && t.def.length > 10);
}
function getExistingTerms(html) {
  const terms = new Set();
  for (const m of html.matchAll(/<dt>([^<]+)<\/dt>/g)) terms.add(normalizeKey(m[1]));
  return terms;
}
function normalizeKey(str) {
  return str.toLowerCase()
    .replace(/[\u00e1\u00e0\u00e4]/g, 'a').replace(/[\u00e9\u00e8\u00eb]/g, 'e')
    .replace(/[\u00ed\u00ec\u00ef]/g, 'i').replace(/[\u00f3\u00f2\u00f6]/g, 'o')
    .replace(/[\u00fa\u00f9\u00fc]/g, 'u').replace(/[\u00f1\u00d1]/g, 'n')
    .replace(/[^a-z0-9\s]/g, '').trim();
}
function escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function insertTermInHtml(html, term, def) {
  const letter = term.trim().charAt(0).toUpperCase();
  const dtHtml = '\n        <dt>' + escapeHtml(term) + '</dt>\n        <dd>' + escapeHtml(def) + '</dd>';
  const sectionRegex = new RegExp('(<section id="' + letter + '">.*?<dl>)(.*?)(</dl>\\s*</section>)', 's');
  if (sectionRegex.test(html)) return html.replace(sectionRegex, '$1$2' + dtHtml + '\n    $3');
  const newSection = '\n<section id="' + letter + '">\n    <h2>' + letter + '</h2>\n    <dl>' + dtHtml + '\n    </dl>\n</section>\n';
  return html.replace('</body>', newSection + '</body>');
}
function walkDir(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    fs.statSync(full).isDirectory() ? files.push(...walkDir(full)) : (f.endsWith('.mdx') || f.endsWith('.md')) && files.push(full);
  }
  return files;
}
console.log('Leyendo glosario.html...');
let html = fs.readFileSync(GLOSARIO_HTML, 'utf8');
const existing = getExistingTerms(html);
console.log('Terminos existentes: ' + existing.size);
const allFiles = MDX_DIRS.flatMap(walkDir);
console.log('Archivos MDX a escanear: ' + allFiles.length);
let added = 0, skipped = 0;
const report = [];
for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (!/glosario|glossary|t.rminos clave/i.test(content)) continue;
  const terms = extractTermsFromMdx(content);
  if (!terms.length) continue;
  console.log('\n' + file.replace(BASE + '\\', '').replace(BASE + '/', '') + ' -> ' + terms.length + ' terminos');
  for (const { term, def } of terms) {
    const key = normalizeKey(term);
    if (existing.has(key)) { skipped++; continue; }
    html = insertTermInHtml(html, term, def);
    existing.add(key); added++;
    report.push('+ ' + term);
    console.log('  AÑADIDO: ' + term);
  }
}
fs.writeFileSync(GLOSARIO_HTML, html, 'utf8');
console.log('\n========================================');
console.log('RESUMEN: ' + added + ' terminos añadidos, ' + skipped + ' ya existian');
if (report.length) { console.log('\nTerminos nuevos:'); report.forEach(r => console.log(' ' + r)); }
console.log('\nAhora ejecuta:');
console.log('git add public/Recursos/glosario.html && git commit -m "feat(glosario): terminos extraidos de posts" && git push');
