#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('📦 Inlining scripts into single HTML file...');

let html = fs.readFileSync('web/index.html', 'utf8');

// Inline JS files
const scriptRegex = /<script src="(.+?)"><\/script>/g;
html = html.replace(scriptRegex, (match, src) => {
  const filePath = path.join('web', src);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Warning: ${filePath} not found, skipping...`);
    return match;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return `<script>\n${content}\n</script>`;
});

// Ensure dist/ exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

fs.writeFileSync('dist/index.html', html);

const size = fs.statSync('dist/index.html').size;
console.log(`✓ Created dist/index.html (${size.toLocaleString()} bytes)`);
