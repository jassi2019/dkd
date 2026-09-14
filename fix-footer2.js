const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/HP/dkd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const newFooter = `<!-- FOOTER -->
<footer class="site-footer">
  <div class="ft-grid">
    <div class="ft-brand">
      <div class="ft-logo">
        <img loading="lazy" class="ft-logo-mark-img" src="https://www.delhidental.com/wp-content/uploads/2017/09/Dr.Kathurias-Dentistry-Logo-e1641815051747.jpg" alt="Dr. Kathuria's Dentistry">
        <div class="ft-logo-text"><strong>Dr. Kathuria's Dentistry</strong><span>Premium Dental Care</span></div>
      </div>
      <p>NABH accredited, ISO certified multi-speciality dental clinic in East of Kailash, New Delhi. Trusted by over 15,000 patients from 44+ countries for world-class dental treatments.</p>
      <div class="ft-socials">
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
        <a href="https://pinterest.com" target="_blank" rel="noopener" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
      </div>
    </div>
    <div class="ft-col">
      <h4>Useful Links</h4>
      <a href="index.html"><i class="fas fa-chevron-right"></i> Home</a>
      <a href="articles.html"><i class="fas fa-chevron-right"></i> Articles</a>
      <a href="teledentistry.html"><i class="fas fa-chevron-right"></i> Teledentistry</a>
      <a href="career.html"><i class="fas fa-chevron-right"></i> Career</a>
      <a href="dental-tourism.html"><i class="fas fa-chevron-right"></i> Dental Tourism</a>
      <a href="family-privilege-card.html"><i class="fas fa-chevron-right"></i> Family Privilege Card</a>
      <a href="contact.html"><i class="fas fa-chevron-right"></i> Contact Us</a>
    </div>
    <div class="ft-col">
      <h4>Treatments</h4>
      <a href="dental-implants.html"><i class="fas fa-chevron-right"></i> Dental Implants</a>
      <a href="smile-makeover.html"><i class="fas fa-chevron-right"></i> Smile Makeover</a>
      <a href="teeth-whitening.html"><i class="fas fa-chevron-right"></i> Teeth Whitening</a>
      <a href="clear-aligners.html"><i class="fas fa-chevron-right"></i> Clear Aligners</a>
      <a href="root-canal-treatment.html"><i class="fas fa-chevron-right"></i> Root Canal Treatment</a>
      <a href="gum-treatment.html"><i class="fas fa-chevron-right"></i> Gum Treatment</a>
    </div>
    <div class="ft-col">
      <h4>Contact Info</h4>
      <div class="ft-contact-item">
        <div class="ft-contact-icon"><i class="fas fa-location-dot"></i></div>
        <div class="ft-contact-text"><span>Address</span><p>E-143, East of Kailash, New Delhi, India</p></div>
      </div>
      <div class="ft-contact-item">
        <div class="ft-contact-icon"><i class="fas fa-phone"></i></div>
        <div class="ft-contact-text"><span>Toll Free</span><a href="tel:18001177272">1800-11-7272</a></div>
      </div>
      <div class="ft-contact-item">
        <div class="ft-contact-icon"><i class="fas fa-mobile-screen"></i></div>
        <div class="ft-contact-text"><span>Phone</span><a href="tel:+919811026060">+91-9811026060</a><br/><a href="tel:+919811776073">+91-9811776073</a><br/><a href="tel:+911126280184">+91-11-26280184</a><br/><a href="tel:+911141624404">+91-11-41624404</a></div>
      </div>
      <div class="ft-contact-item">
        <div class="ft-contact-icon"><i class="fas fa-envelope"></i></div>
        <div class="ft-contact-text"><span>Email</span><a href="mailto:dentistdelhi@gmail.com">dentistdelhi@gmail.com</a></div>
      </div>
      <div class="ft-contact-item">
        <div class="ft-contact-icon"><i class="fas fa-clock"></i></div>
        <div class="ft-contact-text"><span>Hours</span><p>Mon &ndash; Sat: 9:30 AM &ndash; 7:00 PM</p></div>
      </div>
    </div>
  </div>
  <div class="ft-bottom">
    <span>&copy; 2026 U and K Oral Wellness LLP &mdash; Dr. Kathuria's Dentistry. All rights reserved.</span>
    <span><a href="#">Privacy Policy</a> &bull; <a href="#">Terms of Service</a> &bull; <a href="#">Sitemap</a></span>
  </div>
</footer>`;

let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');

  // Find footer start and end
  const footerStart = html.indexOf('<footer');
  const footerEnd = html.indexOf('</footer>');
  if (footerStart === -1 || footerEnd === -1) {
    console.log('SKIP ' + file + ' - no footer');
    return;
  }

  // Also find the comment before footer
  let commentStart = footerStart;
  const before = html.substring(Math.max(0, footerStart - 50), footerStart);
  const commentMatch = before.lastIndexOf('<!--');
  if (commentMatch !== -1) {
    commentStart = Math.max(0, footerStart - 50) + commentMatch;
  }

  const fullEnd = footerEnd + '</footer>'.length;

  html = html.substring(0, commentStart) + newFooter + html.substring(fullEnd);
  fs.writeFileSync(fp, html, 'utf8');
  count++;
  console.log('DONE ' + file);
});

console.log('\nUpdated ' + count + ' files');
