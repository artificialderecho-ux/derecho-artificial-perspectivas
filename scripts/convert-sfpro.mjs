import fs from 'fs';
import path from 'path';
import { createFont, woff2 } from 'fonteditor-core';

const fontsDir = path.resolve('public/fonts/SFPro');
const sources = [
  { file: 'SFPRODISPLAYREGULAR.OTF', out: 'SFPRODISPLAYREGULAR.woff2' },
  { file: 'SFPRODISPLAYMEDIUM.OTF', out: 'SFPRODISPLAYMEDIUM.woff2' },
  { file: 'SFPRODISPLAYBOLD.OTF', out: 'SFPRODISPLAYBOLD.woff2' },
];

async function convert() {
  await woff2.init();
  for (const { file, out } of sources) {
    const srcPath = path.join(fontsDir, file);
    const outPath = path.join(fontsDir, out);
    if (!fs.existsSync(srcPath)) {
      console.error(`Source not found: ${srcPath}`);
      continue;
    }
    const buffer = fs.readFileSync(srcPath);
    const font = createFont(buffer, { type: 'otf' });
    const w2 = font.write({ type: 'woff2' });
    fs.writeFileSync(outPath, Buffer.from(w2));
    console.log(`Converted: ${file} -> ${out}`);
  }
}

convert().catch(err => {
  console.error(err);
  process.exit(1);
});
