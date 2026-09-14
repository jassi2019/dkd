const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const old1 = '<i class="fas fa-chevron-down mob-acc-arrow"></i>';
  const new1 = '<span class="mob-acc-arrow"></span>';
  if (html.includes(old1)) {
    html = html.split(old1).join(new1);
    fs.writeFileSync(fp, html, 'utf8');
    count++;
  }
});
console.log('Updated ' + count + ' files');
