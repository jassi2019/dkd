const fs = require('fs');
let html = fs.readFileSync('C:/Users/HP/dkd/services.html', 'utf8');

const map = [
  ['Single Tooth Implant', 'single-tooth-implants.html'],
  ['Multiple Teeth Implants', 'multiple-tooth-implants.html'],
  ['All-on-4 Implants', 'all-on-4-dental-implants.html'],
  ['Full Mouth Rehabilitation', 'full-mouth-rehabilitation.html'],
  ['Nobel Biocare Implants', 'dental-implants.html'],
  ['Nobel Guide Surgery', 'nobel-guide-surgery.html'],
  ['Smile Makeover', 'smile-makeover.html'],
  ['Porcelain Veneers', 'no-prep-veneers.html'],
  ['Gap Closure', 'gap-closure.html'],
  ['Teeth Whitening / Zoom', 'teeth-whitening.html'],
  ['Cosmetic Contouring', 'cosmetic-contouring.html'],
  ['Metal Free Crowns', 'crowns-bridge.html'],
  ['Laser Gum Treatment', 'laser-gums-depigmentation.html'],
  ['Gummy Smile Correction', 'laser-gummy-smile-correction.html'],
  ['Scaling &amp; Polishing', 'full-mouth-scaling.html'],
  ['Deep Cleaning', 'deep-cleaning.html'],
  ['Gum Surgery', 'gums-surgery.html'],
  ['Bad Breath Treatment', 'bad-breath-treatment.html'],
  ['Clear Aligners', 'clear-aligners.html'],
  ['Ceramic Braces', 'braces.html'],
  ['Metal Braces', 'braces.html'],
  ['Lingual Braces', 'lingual-braces.html'],
  ['Fluoride Treatment', 'fluoride-fillings.html'],
  ['Kids Root Canal', 'kids-root-canal.html'],
  ['Fluoride Applications', 'fluoride-applications.html'],
  ['Dental Sealants', 'fluoride-applications.html'],
  ['Tooth Extraction', 'surgical-extractions.html'],
  ['Sinus Lift', 'sinus-lift-surgery.html'],
  ['Root Canal', 'root-canal-treatment.html'],
  ['Microscopic Dentistry', 'microscopic-dentistry.html'],
];

// Process each card: find h4, then replace the NEXT /contact href within ~400 chars
for (const [title, url] of map) {
  let idx = html.indexOf('<h4>' + title + '</h4>');
  if (idx === -1) { console.log('NOT FOUND:', title); continue; }
  // Find href="/contact" after this position (within next 500 chars)
  let segment = html.slice(idx, idx + 500);
  let updated = segment.replace('href="/contact"', 'href="' + url + '"');
  html = html.slice(0, idx) + updated + html.slice(idx + 500);
}

// Fix CTA button
html = html.replace('href="/contact" class="btn btn-gold', 'href="contact.html" class="btn btn-gold');

fs.writeFileSync('C:/Users/HP/dkd/services.html', html);
console.log('Done - links fixed');
