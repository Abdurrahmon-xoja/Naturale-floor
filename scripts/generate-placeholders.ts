/**
 * Generates placeholder product images and a panorama image.
 * Run once: npx tsx scripts/generate-placeholders.ts
 */
import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

// Wood-tone color palette for each product
const WOOD_TONES: Record<string, [number, number, number]> = {
  'oak-natural-brushed': [185, 140, 90],
  'american-walnut': [90, 55, 30],
  'ash-white': [225, 210, 190],
  'oak-smoked': [110, 95, 80],
  'beech-steamed': [210, 175, 145],
  'alpine-oak-laminate': [195, 175, 145],
  'spc-stone-grey': [160, 155, 150],
  'cherry-european': [185, 110, 85],
};

function drawWoodPlank(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  baseColor: [number, number, number],
  seed: number
): void {
  const [r, g, b] = baseColor;
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(x, y, w, h);

  // Grain lines
  const grainCount = 6 + (seed % 4);
  for (let i = 0; i < grainCount; i++) {
    const xOff = ((seed * 37 + i * 53) % w);
    const alpha = 0.04 + (i % 3) * 0.02;
    ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
    ctx.lineWidth = 0.5 + (i % 2);
    ctx.beginPath();
    ctx.moveTo(x + xOff, y);
    ctx.lineTo(x + xOff + (seed % 10) - 5, y + h);
    ctx.stroke();
  }

  // Plank border
  ctx.strokeStyle = `rgba(0,0,0,0.08)`;
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}

function generateProductImage(slug: string, imageIndex: number): Buffer {
  const W = 800;
  const H = 600;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  const baseColor = WOOD_TONES[slug] ?? [180, 140, 100];
  const [r, g, b] = baseColor;

  // Background
  ctx.fillStyle = `rgb(${Math.max(0, r - 20)},${Math.max(0, g - 20)},${Math.max(0, b - 20)})`;
  ctx.fillRect(0, 0, W, H);

  // Draw planks
  const plankH = 60;
  const plankW = W / 2 + (imageIndex * 50);
  let y = 0;
  let row = 0;
  while (y < H) {
    let x = row % 2 === 0 ? 0 : -(plankW / 2);
    let col = 0;
    while (x < W) {
      drawWoodPlank(ctx, x, y, plankW - 2, plankH - 2, baseColor, row * 10 + col + imageIndex);
      x += plankW;
      col++;
    }
    y += plankH;
    row++;
  }

  // Product name watermark
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(slug, W / 2, H / 2);

  return canvas.toBuffer('image/jpeg', { quality: 0.85 });
}

function generatePanorama(): Buffer {
  const W = 2048;
  const H = 1024;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
  sky.addColorStop(0, '#D6C4A8');
  sky.addColorStop(1, '#F5EFE6');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H * 0.5);

  // Floor
  const floor = ctx.createLinearGradient(0, H * 0.5, 0, H);
  floor.addColorStop(0, '#8B6340');
  floor.addColorStop(1, '#6F4E37');
  ctx.fillStyle = floor;
  ctx.fillRect(0, H * 0.5, W, H * 0.5);

  // Simple room elements - walls
  ctx.fillStyle = '#EDE0D0';
  ctx.fillRect(0, H * 0.1, W * 0.02, H * 0.4);
  ctx.fillRect(W * 0.98, H * 0.1, W * 0.02, H * 0.4);

  // Floor planks
  const plankH = 20;
  for (let y = H * 0.5; y < H; y += plankH) {
    for (let x = 0; x < W; x += 200) {
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, 200, plankH);
    }
  }

  // "Natural Floor UZ" label
  ctx.fillStyle = 'rgba(111,78,55,0.4)';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Natural Floor UZ — Showroom', W / 2, H / 2 - 20);
  ctx.font = '24px sans-serif';
  ctx.fillStyle = 'rgba(111,78,55,0.3)';
  ctx.fillText('360° тур — placeholder', W / 2, H / 2 + 20);

  return canvas.toBuffer('image/jpeg', { quality: 0.9 });
}

async function main() {
  const productsDir = path.join(process.cwd(), 'public/images/products');
  const toursDir = path.join(process.cwd(), 'public/tours');

  fs.mkdirSync(productsDir, { recursive: true });
  fs.mkdirSync(toursDir, { recursive: true });

  const slugs = Object.keys(WOOD_TONES);

  for (const slug of slugs) {
    for (let i = 1; i <= 2; i++) {
      const filePath = path.join(productsDir, `${slug}-${i}.jpg`);
      if (!fs.existsSync(filePath)) {
        const buf = generateProductImage(slug, i);
        fs.writeFileSync(filePath, buf);
        console.log(`  ✓ ${slug}-${i}.jpg`);
      }
    }
  }

  // Placeholder single image
  const placeholderPath = path.join(process.cwd(), 'public/images/placeholder-wood.jpg');
  if (!fs.existsSync(placeholderPath)) {
    const buf = generateProductImage('oak-natural-brushed', 0);
    fs.writeFileSync(placeholderPath, buf);
    console.log('  ✓ placeholder-wood.jpg');
  }

  // Panorama
  const panoPath = path.join(toursDir, 'showroom.jpg');
  if (!fs.existsSync(panoPath)) {
    const buf = generatePanorama();
    fs.writeFileSync(panoPath, buf);
    console.log('  ✓ showroom.jpg (panorama)');
  }

  console.log('\nPlaceholder assets generated.');
}

main().catch(console.error);
