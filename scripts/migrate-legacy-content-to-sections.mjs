import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content');
const LEGACY_POSTS_DIR = path.join(CONTENT_DIR, 'posts');

const SECTION_MAP = {
  'jurisprudencia': 'jurisprudencia',
  'jurisprudencia ia': 'jurisprudencia',
  'normativa': 'normativa',
  'legislación digital': 'normativa',
  'legislacion digital': 'normativa',
  'legislación internacional': 'normativa',
  'legislacion internacional': 'normativa',
  'legislación': 'normativa',
  'legislacion': 'normativa',
  'legislación ia': 'normativa',
  'legislacion ia': 'normativa',
  'regulación ue': 'normativa',
  'regulacion ue': 'normativa',
  'firma-scarpa': 'firma-scarpa',
  'firma scarpa': 'firma-scarpa',
  'etica-ia': 'etica-ia',
  'ética-ia': 'etica-ia',
  'global ia': 'global-ia',
  'ia-global': 'global-ia',
  'global-ia': 'global-ia',
  'recursos': 'guias',
  'propiedad-intelectual-ia': 'propiedad-intelectual-ia',
  'glosario': 'glosario',
};

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function walkMdxFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkMdxFiles(fullPath, acc);
    } else if (/\.mdx?$/.test(entry)) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const dryRun = process.argv.includes('--dry');

const rootLegacyFiles = fs
  .readdirSync(CONTENT_DIR)
  .map((name) => path.join(CONTENT_DIR, name))
  .filter((fullPath) => fs.statSync(fullPath).isFile() && /\.mdx?$/.test(fullPath));

const postLegacyFiles = walkMdxFiles(LEGACY_POSTS_DIR);
const files = [...postLegacyFiles, ...rootLegacyFiles];

let moved = 0;
let skipped = 0;

for (const fullPath of files) {
  const raw = fs.readFileSync(fullPath, 'utf8');
  const frontmatter = matter(raw).data || {};

  const sectionKey = normalize(frontmatter.section || frontmatter.category);
  const section = SECTION_MAP[sectionKey];

  if (!section) {
    console.warn(`[skip] Sin sección reconocida: ${path.relative(ROOT, fullPath)}`);
    skipped++;
    continue;
  }

  const currentName = path.basename(fullPath).replace(/\.mdx?$/, '');
  const slug = String(frontmatter.slug || currentName).trim();

  const targetDir = path.join(CONTENT_DIR, section, slug);
  const targetPath = path.join(targetDir, 'index.mdx');

  if (fs.existsSync(targetPath)) {
    console.warn(`[skip] Ya existe destino: ${path.relative(ROOT, targetPath)} (origen ${path.relative(ROOT, fullPath)})`);
    skipped++;
    continue;
  }

  if (!dryRun) {
    ensureDir(targetDir);
    fs.renameSync(fullPath, targetPath);
  }

  console.log(`[move] ${path.relative(ROOT, fullPath)} -> ${path.relative(ROOT, targetPath)}`);
  moved++;
}

if (!dryRun && fs.existsSync(LEGACY_POSTS_DIR) && fs.readdirSync(LEGACY_POSTS_DIR).length === 0) {
  fs.rmdirSync(LEGACY_POSTS_DIR);
}

console.log(`\nResumen: ${moved} movidos, ${skipped} omitidos.${dryRun ? ' (dry-run)' : ''}`);
