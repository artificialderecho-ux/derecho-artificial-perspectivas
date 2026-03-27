const fs = require('fs');
const path = require('path');

const CONTENT_DIR = 'C:\\Proyectos\\derecho-artificial\\content';

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Remove the metadata block I added
    const newContent = content.replace(/\n*export const metadata = \{[\s\S]*?\};;?\n*/g, '\n\n');
    
    if (content !== newContent) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        console.log(`Cleaned: ${filepath}`);
    }
}

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (file === 'index.mdx') {
            processFile(fullPath);
        }
    });
}

walk(CONTENT_DIR);
