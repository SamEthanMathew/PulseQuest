#!/usr/bin/env node
const fs = require('fs');
const { minify } = require('html-minifier-terser');

(async () => {
  if (!fs.existsSync('dist/index.html')) {
    console.error('❌ dist/index.html not found. Run npm run inline first.');
    process.exit(1);
  }
  
  const html = fs.readFileSync('dist/index.html', 'utf8');
  
  const minified = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    sortAttributes: true,
    sortClassName: true
  });
  
  fs.writeFileSync('dist/index.html', minified);
  
  const originalSize = html.length;
  const minifiedSize = minified.length;
  const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
  
  console.log(`✓ Minified: ${minifiedSize.toLocaleString()} bytes (${savings}% smaller)`);
  console.log(`  Original: ${originalSize.toLocaleString()} bytes`);
})();
