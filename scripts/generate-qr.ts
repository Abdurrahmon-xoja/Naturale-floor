/**
 * Generates QR PNG files and a printable A4 PDF sheet for all products.
 * Usage: npm run qr
 * Env: BASE_URL (default: http://localhost:3000)
 */
import * as QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { products } from '../data/products';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const QR_DIR = path.join(process.cwd(), 'public/qr');

async function generateQRPng(slug: string): Promise<string> {
  const url = `${BASE_URL}/product/${slug}`;
  const outPath = path.join(QR_DIR, `${slug}.png`);
  await QRCode.toFile(outPath, url, {
    width: 1024,
    errorCorrectionLevel: 'H',
    margin: 2,
    color: { dark: '#1F1B16', light: '#F5EFE6' },
  });
  return outPath;
}

async function generateSheet(): Promise<void> {
  const sheetPath = path.join(QR_DIR, 'sheet.pdf');
  const doc = new PDFDocument({ size: 'A4', margin: 30 });
  const stream = fs.createWriteStream(sheetPath);
  doc.pipe(stream);

  const PAGE_W = 595.28;
  const PAGE_H = 841.89;
  const COLS = 2;
  const ROWS = 3;
  const MARGIN = 30;
  const CELL_W = (PAGE_W - MARGIN * 2) / COLS;
  const CELL_H = (PAGE_H - MARGIN * 2 - 40) / ROWS; // 40 for title
  const QR_SIZE = Math.min(CELL_W, CELL_H) * 0.65;
  const LABEL_H = 40;

  // Title
  doc
    .font('Helvetica-Bold')
    .fontSize(14)
    .fillColor('#6F4E37')
    .text('Natural Floor UZ — QR Коды для образцов', MARGIN, MARGIN, { width: PAGE_W - MARGIN * 2, align: 'center' });

  doc.fontSize(9).fillColor('#888').text(`Сгенерировано: ${new Date().toLocaleString('ru-RU')} | BASE_URL: ${BASE_URL}`, MARGIN, MARGIN + 18, {
    width: PAGE_W - MARGIN * 2,
    align: 'center',
  });

  const startY = MARGIN + 40;
  let page = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const pageIndex = Math.floor(i / (COLS * ROWS));

    if (pageIndex > page) {
      doc.addPage();
      page = pageIndex;
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .fillColor('#6F4E37')
        .text('Natural Floor UZ — QR Коды (продолжение)', MARGIN, MARGIN, {
          width: PAGE_W - MARGIN * 2,
          align: 'center',
        });
    }

    const posOnPage = i % (COLS * ROWS);
    const col = posOnPage % COLS;
    const row = Math.floor(posOnPage / COLS);

    const cellX = MARGIN + col * CELL_W;
    const cellY = startY + row * CELL_H;
    const qrX = cellX + (CELL_W - QR_SIZE) / 2;
    const qrY = cellY + 10;

    // Cell border
    doc
      .rect(cellX + 4, cellY + 4, CELL_W - 8, CELL_H - 8)
      .strokeColor('#C9A66B')
      .lineWidth(0.5)
      .stroke();

    // QR image
    const qrPath = path.join(QR_DIR, `${product.slug}.png`);
    if (fs.existsSync(qrPath)) {
      doc.image(qrPath, qrX, qrY, { width: QR_SIZE, height: QR_SIZE });
    }

    // Product name below QR
    doc
      .font('Helvetica-Bold')
      .fontSize(9)
      .fillColor('#1F1B16')
      .text(product.name.ru, cellX + 6, qrY + QR_SIZE + 6, {
        width: CELL_W - 12,
        align: 'center',
        lineBreak: false,
      });

    // Category + price
    doc
      .font('Helvetica')
      .fontSize(7)
      .fillColor('#6F4E37')
      .text(
        `${product.category.toUpperCase()} | ${product.pricePerM2.toLocaleString('ru-RU')} сум/м²`,
        cellX + 6,
        qrY + QR_SIZE + 18,
        { width: CELL_W - 12, align: 'center', lineBreak: false }
      );
  }

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(QR_DIR, { recursive: true });

  console.log(`\nGenerating QR codes — BASE_URL: ${BASE_URL}\n`);
  console.log('Slug'.padEnd(30) + 'File');
  console.log('-'.repeat(60));

  for (const product of products) {
    const filePath = await generateQRPng(product.slug);
    console.log(product.slug.padEnd(30) + path.relative(process.cwd(), filePath));
  }

  console.log('\nGenerating printable PDF sheet...');
  await generateSheet();
  console.log(`  ✓ public/qr/sheet.pdf\n`);
  console.log(`Done! ${products.length} QR codes + 1 PDF sheet.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
