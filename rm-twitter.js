const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const twitterLine = /\s*<a href="https:\/\/twitter\.com"[^>]*>.*?<\/a>\n?/g;
let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('twitter.com')) {
    html = html.replace(twitterLine, '\n');
    fs.writeFileSync(fp, html, 'utf8');
    count++;
  }
});
console.log('Updated ' + count + ' files');
