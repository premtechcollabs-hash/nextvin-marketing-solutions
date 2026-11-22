const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function getAllHtmlFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Processing ${htmlFiles.length} HTML files...`);

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const isSubdir = relPath.includes('/');
  const prefix = isSubdir ? '../' : '';

  // Replace root-relative links with appropriate relative links
  // 1. href="/" or href="/index.html"
  content = content.replace(/href="\/(index\.html)?"/g, `href="${prefix}index.html"`);
  
  // 2. href="/about.html"
  content = content.replace(/href="\/about\.html"/g, `href="${prefix}about.html"`);

  // 3. href="/services.html"
  content = content.replace(/href="\/services\.html"/g, `href="${prefix}services.html"`);

  // 4. href="/industries.html"
  content = content.replace(/href="\/industries\.html"/g, `href="${prefix}industries.html"`);

  // 5. href="/packages.html"
  content = content.replace(/href="\/packages\.html"/g, `href="${prefix}packages.html"`);

  // 6. href="/process.html"
  content = content.replace(/href="\/process\.html"/g, `href="${prefix}process.html"`);

  // 7. href="/portfolio.html"
  content = content.replace(/href="\/portfolio\.html"/g, `href="${prefix}portfolio.html"`);

  // 8. href="/insights.html"
  content = content.replace(/href="\/insights\.html"/g, `href="${prefix}insights.html"`);

  // 9. href="/contact.html"
  content = content.replace(/href="\/contact\.html"/g, `href="${prefix}contact.html"`);

  // 10. href="/privacy-policy.html"
  content = content.replace(/href="\/privacy-policy\.html"/g, `href="${prefix}privacy-policy.html"`);

  // 11. href="/terms-conditions.html"
  content = content.replace(/href="\/terms-conditions\.html"/g, `href="${prefix}terms-conditions.html"`);

  // 12. href="/404.html"
  content = content.replace(/href="\/404\.html"/g, `href="${prefix}404.html"`);

  // 13. Subfolder paths: href="/services/..." -> href="${prefix}services/..."
  content = content.replace(/href="\/services\/([^"]+)"/g, `href="${prefix}services/$1"`);

  // 14. Subfolder paths: href="/industries/..." -> href="${prefix}industries/..."
  content = content.replace(/href="\/industries\/([^"]+)"/g, `href="${prefix}industries/$1"`);

  // 15. Subfolder paths: href="/insights/..." -> href="${prefix}insights/..."
  content = content.replace(/href="\/insights\/([^"]+)"/g, `href="${prefix}insights/$1"`);

  // Also ensure script src for config.js is relative
  content = content.replace(/src="\/config\.js"/g, `src="${prefix}config.js"`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated links in: ${relPath} (isSubdir: ${isSubdir})`);
});

console.log("All links fixed to relative paths!");
