const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

let count = 0;

// Old phone block pattern
const oldPhone = `<span>Phone</span>
          <a href="tel:1800117272">1800-11-7272 (Toll Free)</a><br/>
          <a href="tel:+919811026060">+91-9811026060</a>`;

const newPhone = `<span>Toll Free</span>
          <a href="tel:18001177272">1800-11-7272</a>
        </div>
      </div>
      <div class="ft-contact-item">
        <div class="ft-contact-icon"><i class="fas fa-mobile-screen"></i></div>
        <div class="ft-contact-text">
          <span>Phone</span>
          <a href="tel:+919811026060">+91-9811026060</a><br/>
          <a href="tel:+919811776073">+91-9811776073</a><br/>
          <a href="tel:+911126280184">+91-11-26280184</a><br/>
          <a href="tel:+911141624404">+91-11-41624404</a>`;

// Old Quick Links
const oldLinks = `<h4>Quick Links</h4>
      <a href="index.html"><i class="fas fa-chevron-right"></i> Home</a>
      <a href="staff.html"><i class="fas fa-chevron-right"></i> Our Doctors</a>
      <a href="cases.html"><i class="fas fa-chevron-right"></i> Smile Gallery</a>
      <a href="awards.html"><i class="fas fa-chevron-right"></i> Awards &amp; Accreditation</a>
      <a href="charges.html"><i class="fas fa-chevron-right"></i> Treatment Charges</a>
      <a href="smile-analysis.html"><i class="fas fa-chevron-right"></i> Smile Analysis</a>
      <a href="contact.html"><i class="fas fa-chevron-right"></i> Contact Us</a>

      <a href="dental-tourism.html"><i class="fas fa-chevron-right"></i> Dental Tourism</a>`;

const newLinks = `<h4>Useful Links</h4>
      <a href="index.html"><i class="fas fa-chevron-right"></i> Home</a>
      <a href="articles.html"><i class="fas fa-chevron-right"></i> Articles</a>
      <a href="teledentistry.html"><i class="fas fa-chevron-right"></i> Teledentistry</a>
      <a href="career.html"><i class="fas fa-chevron-right"></i> Career</a>
      <a href="dental-tourism.html"><i class="fas fa-chevron-right"></i> Dental Tourism</a>
      <a href="family-privilege-card.html"><i class="fas fa-chevron-right"></i> Family Privilege Card</a>
      <a href="contact.html"><i class="fas fa-chevron-right"></i> Contact Us</a>`;

// Copyright
const oldCopy = '&copy; 2026 Dr. Kathuria\'s Dentistry. All rights reserved.';
const newCopy = '&copy; 2026 U and K Oral Wellness LLP &mdash; Dr. Kathuria\'s Dentistry. All rights reserved.';

// Social - add Pinterest
const oldSocial = `<a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
      </div>`;
const newSocial = `<a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
        <a href="https://pinterest.com" target="_blank" rel="noopener" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
      </div>`;

files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;

  if (html.includes(oldPhone)) {
    html = html.replace(oldPhone, newPhone);
    changed = true;
  }
  if (html.includes(oldLinks)) {
    html = html.replace(oldLinks, newLinks);
    changed = true;
  }
  if (html.includes(oldCopy)) {
    html = html.replace(oldCopy, newCopy);
    changed = true;
  }
  if (html.includes(oldSocial) && !html.includes('pinterest')) {
    html = html.replace(oldSocial, newSocial);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, html, 'utf8');
    count++;
    console.log('DONE ' + file);
  }
});

console.log('\nUpdated ' + count + ' files');
