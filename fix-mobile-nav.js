const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/dkd';

// Read index.html mobile nav
const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const navStart = indexHtml.indexOf('<div class="mobile-nav" id="mobileNav">');
const navEnd = indexHtml.indexOf('</div>', indexHtml.indexOf('<a href="tel:1800117272" class="mobile-cta">')) + '</div>'.length;
const newNav = indexHtml.substring(navStart, navEnd);

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'treatments.html');

let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');

  const oldStart = html.indexOf('<div class="mobile-nav" id="mobileNav">');
  if (oldStart === -1) return;

  // Find the closing </div> of mobile-nav
  // The mobile-nav ends after the last link before the next section
  let oldEnd = -1;
  const mobileCtaIdx = html.indexOf('class="mobile-cta"', oldStart);
  if (mobileCtaIdx === -1) {
    console.log('SKIP ' + file + ' - no mobile-cta found');
    return;
  }
  // Find </div> after mobile-cta </a>
  const afterCta = html.indexOf('</a>', mobileCtaIdx);
  oldEnd = html.indexOf('</div>', afterCta) + '</div>'.length;

  if (oldEnd <= oldStart) {
    console.log('SKIP ' + file + ' - could not find nav end');
    return;
  }

  html = html.substring(0, oldStart) + newNav + html.substring(oldEnd);
  fs.writeFileSync(fp, html, 'utf8');
  count++;
  console.log('DONE ' + file);
});

console.log('\nUpdated ' + count + ' files');
