const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/HP/dkd';

const files = [
  'clear-aligners.html','cosmetic-contouring.html','cosmetic-fillings.html',
  'crooked-tooth-correction.html','crowns-bridge.html','dental-radiology.html',
  'gap-closure.html','gum-treatment.html','microscopic-dentistry.html',
  'multiple-tooth-implants.html','no-prep-veneers.html','orthodontics.html',
  'single-tooth-implants.html','smile-makeover.html','teeth-whitening.html'
];

let count = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');

  // Find the OLD testimonials section (the one AFTER FAQ)
  // It starts with <!-- TESTIMONIALS --> and ends before <!-- CTA BANNER -->
  const startMarker = '<!-- TESTIMONIALS -->';
  const endMarker = '<!-- CTA BANNER -->';

  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.log('SKIP ' + file + ' - markers not found');
    return;
  }

  // Make sure this is the OLD section (after FAQ, not before)
  const faqIdx = html.indexOf('Frequently Asked');
  if (faqIdx === -1 || startIdx < faqIdx) {
    console.log('SKIP ' + file + ' - testimonials before FAQ (not the duplicate)');
    return;
  }

  // Remove everything from <!-- TESTIMONIALS --> to just before <!-- CTA BANNER -->
  html = html.substring(0, startIdx) + html.substring(endIdx);
  fs.writeFileSync(fp, html, 'utf8');
  count++;
  console.log('DONE ' + file);
});

console.log('\nRemoved old testimonials from ' + count + ' files');
