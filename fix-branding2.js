const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const credit = `\n  <div class="ft-credit">\n    Designed &amp; Developed by <a href="https://clicksemrus.com" target="_blank" rel="noopener">Click Semrus</a>\n  </div>`;

let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('Click Semrus')) return;

  // Find </div> before </footer>
  const footerEnd = html.indexOf('</footer>');
  if (footerEnd === -1) return;

  // Insert credit div just before </footer>
  html = html.substring(0, footerEnd) + credit + '\n' + html.substring(footerEnd);
  fs.writeFileSync(fp, html, 'utf8');
  count++;
});
console.log('Updated ' + count + ' files');
