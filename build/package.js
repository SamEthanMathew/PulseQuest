#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execSync } = require('child_process');

const LIMIT = 15360; // 15KB

console.log('📦 Packaging Axon submission...\n');

// Create tar archive using system tar
console.log('Creating tar archive...');
try {
  execSync('tar -cf vibequest.tar -C dist .', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ ERROR: Failed to create tar archive');
  console.error('   Make sure tar is installed and dist/index.html exists');
  process.exit(1);
}

// Read tar file
const tarData = fs.readFileSync('vibequest.tar');
console.log(`Tar size: ${tarData.length.toLocaleString()} bytes\n`);

// Compress with brotli
console.log('Compressing with brotli (quality 11)...');
const compressed = zlib.brotliCompressSync(tarData, {
  params: {
    [zlib.constants.BROTLI_PARAM_QUALITY]: 11
  }
});

fs.writeFileSync('vibequest.tar.br', compressed);

// Check size
const size = compressed.length;

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Archive: vibequest.tar.br');
console.log(`Size:    ${size.toLocaleString()} bytes`);
console.log(`Limit:   ${LIMIT.toLocaleString()} bytes`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (size >= LIMIT) {
  const over = size - LIMIT;
  console.log(`\n❌ ERROR: Archive is ${over} bytes over limit!`);
  fs.unlinkSync('vibequest.tar');
  process.exit(1);
}

const remaining = LIMIT - size;
const percent = ((size / LIMIT) * 100).toFixed(1);
console.log(`✓ SUCCESS: ${remaining} bytes remaining (${percent}% of limit)\n`);

// Clean up
fs.unlinkSync('vibequest.tar');
