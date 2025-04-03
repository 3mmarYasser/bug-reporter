import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const viteIcon = path.join(__dirname, '../public/icon.svg');
const destIcon = path.join(distDir, 'icon.svg');

fs.copyFileSync(viteIcon, destIcon);

console.log('Icon copied successfully!'); 