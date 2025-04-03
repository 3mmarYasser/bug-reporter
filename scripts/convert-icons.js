import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [16, 48, 128];
const svgPath = path.join(__dirname, '../public/icon.svg');
const outputDir = path.join(__dirname, '../dist/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertToPNG(size) {
  try {
    await sharp(svgPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png({
        quality: 100,
        compressionLevel: 9
      })
      .toFile(path.join(outputDir, `icon${size}.png`));
    console.log(`✓ Created ${size}x${size} icon`);
  } catch (err) {
    console.error(`✗ Error creating ${size}x${size} icon:`, err);
    process.exit(1);
  }
}

async function processIcons() {
  try {
    for (const size of sizes) {
      await convertToPNG(size);
    }
    console.log('✓ All icons created successfully');
  } catch (err) {
    console.error('✗ Failed to process icons:', err);
    process.exit(1);
  }
}
processIcons(); 