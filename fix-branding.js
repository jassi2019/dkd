const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldBottom = `<a href="#">Sitemap</a>
    </span>
  </div>
</footer>`;

const newBottom = `<a href="#">Sitemap</a>
    </span>
  </div>
  <div class="ft-credit">
    Designed &amp; Developed by <a href="https://clicksemrus.com" target="_blank" rel="noopener">Click Semrus</a>
  </div>
</footer>`;

let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes(oldBottom) && !html.includes('Click Semrus')) {
    html = html.replace(oldBottom, newBottom);
    fs.writeFileSync(fp, html, 'utf8');
    count++;
  }
});
console.log('Updated ' + count + ' files');
