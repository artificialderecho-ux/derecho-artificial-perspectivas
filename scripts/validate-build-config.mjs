import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const packageJsonPath = join(root, 'package.json');
const vercelJsonPath = join(root, 'vercel.json');

const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const vercel = JSON.parse(readFileSync(vercelJsonPath, 'utf8'));

const failures = [];

const buildScript = pkg?.scripts?.build ?? '';
if (!buildScript.includes('next build --webpack')) {
  failures.push(
    'El script "build" debe usar "next build --webpack" para evitar regresiones de memoria con Turbopack en producción.',
  );
}

const expectedBuildCommand = 'NODE_OPTIONS=--max-old-space-size=4096 npm run build';
if (vercel?.buildCommand !== expectedBuildCommand) {
  failures.push(
    `vercel.json debe definir buildCommand exactamente como "${expectedBuildCommand}" para mantener el límite de memoria.`,
  );
}

if (failures.length > 0) {
  console.error('\n❌ Configuración de build inválida:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('✅ Guard de build: configuración estable verificada.');
