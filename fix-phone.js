const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const oldBlock = `<div class="ft-contact-icon"><i class="fas fa-phone"></i></div>
        <div class="ft-contact-text"><span>Toll Free</span><a href="tel:18001177272">1800-11-7272</a></div>
      </div>
      <div class="ft-contact-item">
        <div class="ft-contact-icon"><i class="fas fa-mobile-screen"></i></div>
        <div class="ft-contact-text"><span>Phone</span><a href="tel:+919811026060">+91-9811026060</a><br/><a href="tel:+919811776073">+91-9811776073</a><br/><a href="tel:+911126280184">+91-11-26280184</a><br/><a href="tel:+911141624404">+91-11-41624404</a></div>`;

const newBlock = `<div class="ft-contact-icon"><i class="fas fa-phone"></i></div>
        <div class="ft-contact-text"><span>Phone</span><div class="ft-phone-grid"><a href="tel:18001177272">1800-11-7272 <small>(Toll Free)</small></a><a href="tel:+919811026060">+91-9811026060</a><a href="tel:+919811776073">+91-9811776073</a><a href="tel:+911126280184">+91-11-26280184</a></div></div>`;

let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes(oldBlock)) {
    html = html.replace(oldBlock, newBlock);
    fs.writeFileSync(fp, html, 'utf8');
    count++;
    console.log('DONE ' + file);
  }
});
console.log('\nUpdated ' + count + ' files');
