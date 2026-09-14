const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
const replacements = [
  ['<a href="crowns-bridge.html" style="padding-left:18px">Crowns &amp; Bridges</a>', '<a href="crowns-bridge.html">Crowns &amp; Bridges</a>'],
  ['<a href="microscopic-dentistry.html" style="padding-left:18px">Microscopic Dentistry</a>', '<a href="microscopic-dentistry.html">Microscopic Dentistry</a>'],
  ['<a href="oral-cancer-detection.html" style="padding-left:18px">Oral Cancer Detection</a>', '<a href="oral-cancer-detection.html">Oral Cancer Detection</a>'],
];
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;
  replacements.forEach(([old, nw]) => {
    if (html.includes(old)) { html = html.split(old).join(nw); changed = true; }
  });
  if (changed) { fs.writeFileSync(fp, html, 'utf8'); count++; }
});
console.log('Updated ' + count + ' files');
