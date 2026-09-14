const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = [
  ['href="https://facebook.com"', 'href="https://www.facebook.com/DrKathuriasDentistry/"'],
  ['href="https://instagram.com"', 'href="https://www.instagram.com/drkathuriasdentistry/"'],
  ['href="https://youtube.com"', 'href="https://www.youtube.com/user/dentalclinicindelhi"'],
  ['href="https://linkedin.com"', 'href="https://www.linkedin.com/company/dr-kathuria/"'],
  ['href="https://pinterest.com"', 'href="https://in.pinterest.com/kathuriasdental/"'],
];

let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;
  replacements.forEach(([old, nw]) => {
    if (html.includes(old)) {
      html = html.split(old).join(nw);
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(fp, html, 'utf8');
    count++;
  }
});
console.log('Updated ' + count + ' files');
