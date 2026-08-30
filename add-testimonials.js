const fs = require('fs');

const testimonialSection = `
<!-- ══════════════════ PATIENT TESTIMONIALS ══════════════════ -->
<section class="section reveal" style="background:var(--cream);padding:60px 0">
  <div class="container" style="padding:0 5%">
    <div style="text-align:center;margin-bottom:40px">
      <span class="sec-chip"><i class="fas fa-quote-left"></i> Patient Reviews</span>
      <h2 class="sec-h">What Our Patients <em>Say</em></h2>
      <div class="sec-divider" style="margin:16px auto 0"></div>
      <p style="color:var(--gray);max-width:600px;margin:12px auto 0;font-size:.9rem">Real stories from patients across the globe who trusted us with their smiles.</p>
    </div>

    <!-- Written Testimonials -->
    <div class="testi-scroll" style="overflow:hidden;width:100%;display:flex">
      <div class="testi-track" style="display:flex;flex-shrink:0;gap:20px;padding:8px 0 16px;animation:testiScroll 40s linear infinite;will-change:transform">

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"I travelled from the USA specifically for dental implants. The entire experience was exceptional — from the initial video consultation to the final placement."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#4A90D9,#357ABD)">P</div><div><div class="rv-name">Mr. Prem Issar</div><div class="rv-country"><img src="https://flagcdn.com/24x18/us.png" alt="US"> USA</div><div class="rv-treatment">Dental Implants</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"I'm a dentist myself from London, so I know quality work. The precision, aesthetics, and attention to detail were on par with the best clinics in Harley Street."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#E74C3C,#C0392B)">C</div><div><div class="rv-name">Dr. Christine Burnett</div><div class="rv-country"><img src="https://flagcdn.com/24x18/gb.png" alt="UK"> United Kingdom</div><div class="rv-treatment">Porcelain Veneers</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"The best dental experience I've ever had. Dr. Puneet placed 4 implants and the precision was remarkable. I chose Delhi over local options and saved 70%."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#27AE60,#219A52)">B</div><div><div class="rv-name">Bill Yakimec</div><div class="rv-country"><img src="https://flagcdn.com/24x18/ca.png" alt="CA"> Canada</div><div class="rv-treatment">Dental Implants</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"Flying from Melbourne seemed daunting, but the team made it seamless. Airport pickup, hotel arrangement — all world-class. My Zoom whitening results are brilliant."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#F39C12,#E67E22)">S</div><div><div class="rv-name">Sarah Johnson</div><div class="rv-country"><img src="https://flagcdn.com/24x18/au.png" alt="AU"> Australia</div><div class="rv-treatment">Zoom Whitening</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"Dr. Sween transformed my smile with porcelain veneers and it looks absolutely stunning. As someone who appears on television, my smile matters immensely."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#9B59B6,#8E44AD)">N</div><div><div class="rv-name">Chef Nita Mehta</div><div class="rv-country"><img src="https://flagcdn.com/24x18/in.png" alt="IN"> India</div><div class="rv-treatment">Smile Makeover</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"Referred by a friend in Dubai. The All-on-4 implant procedure was outstanding. Dr. Puneet explained every step and results exceeded expectations."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#1ABC9C,#16A085)">M</div><div><div class="rv-name">Mohammad Al-Rashid</div><div class="rv-country"><img src="https://flagcdn.com/24x18/ae.png" alt="AE"> UAE</div><div class="rv-treatment">All-on-4 Implants</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"After years of dental issues, I flew from Toronto for full mouth rehabilitation. In just 6 days, Dr. Puneet completely rebuilt my smile."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#E74C3C,#C0392B)">R</div><div><div class="rv-name">Raymond Van Geloven</div><div class="rv-country"><img src="https://flagcdn.com/24x18/ca.png" alt="CA"> Canada</div><div class="rv-treatment">Full Mouth Rehab</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"From Switzerland, I did extensive research before choosing Dr. Kathuria's. The Zoom whitening and veneers gave me the perfect smile. Professional and premium!"</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#E74C3C,#fff)">P</div><div><div class="rv-name">Pierre Jenni</div><div class="rv-country"><img src="https://flagcdn.com/24x18/ch.png" alt="CH"> Switzerland</div><div class="rv-treatment">Whitening & Veneers</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"I got clear aligners during a business trip to Delhi. Digital scan done in minutes, treatment plan with 3D simulations. Six months later, perfectly aligned teeth."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#E74C3C,#C0392B)">L</div><div><div class="rv-name">Lisa Chen</div><div class="rv-country"><img src="https://flagcdn.com/24x18/sg.png" alt="SG"> Singapore</div><div class="rv-treatment">Clear Aligners</div></div></div>
        </div>

        <div class="rv-card" style="min-width:320px;max-width:320px;flex-shrink:0">
          <div class="rv-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
          <p class="rv-quote">"After a cycling accident, I needed crowns and an implant. The CEREC same-day crowns were remarkable — German engineering standards, but in Delhi."</p>
          <div class="rv-author"><div class="rv-av" style="background:linear-gradient(135deg,#2C3E50,#34495E)">H</div><div><div class="rv-name">Hans Mueller</div><div class="rv-country"><img src="https://flagcdn.com/24x18/de.png" alt="DE"> Germany</div><div class="rv-treatment">CEREC Crowns & Implant</div></div></div>
        </div>

      </div>
    </div>
    <style>
      .testi-scroll:hover .testi-track{animation-play-state:paused}
      @keyframes testiScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    </style>
    <script>
      (function(){
        var t=document.querySelector('.testi-track');
        if(!t) return;
        t.parentNode.appendChild(t.cloneNode(true));
      })();
    </script>

    <div style="text-align:center;margin-top:32px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <a href="testimonials.html" class="btn btn-gold btn-pill" style="font-size:.82rem"><i class="fas fa-comments"></i> All Written Reviews</a>
      <a href="video-testimonials.html" class="btn btn-outline btn-pill" style="font-size:.82rem"><i class="fas fa-video"></i> Video Testimonials</a>
    </div>
  </div>
</section>
`;

const files = [
  'dental-implants.html',
  'family-privilege-card.html',
  'all-on-4-dental-implants.html',
  'bad-breath-treatment.html',
  'braces.html',
  'cosmetic-contouring.html',
  'cosmetic-dentistry.html',
  'cosmetic-fillings.html',
  'crooked-tooth-correction.html',
  'deep-cleaning.html',
  'dental-implants.html',
  'dental-radiology.html',
  'digital-panoramic-xray.html',
  'digital-rvg-xrays.html',
  'family-privilege-card.html',
  'fluoride-applications.html',
  'fluoride-fillings.html',
  'full-mouth-rehabilitation.html',
  'gum-treatment.html',
  'inlays-onlays.html',
  'jetting-out-teeth-correction.html',
  'kids-dentistry.html',
  'kids-root-canal.html',
  'laser-dentistry.html',
  'laser-gums-depigmentation.html',
  'lingual-braces.html',
  'maxillofacial-surgery.html',
  'metal-free-crowns.html',
  'microscopic-dentistry.html',
  'mobile-teeth-solution.html',
  'mottling-of-teeth-correction.html',
  'multiple-tooth-implants.html',
  'no-prep-veneers.html',
  'nobel-biocare-dental-implants.html',
  'nobel-guide-surgery.html',
  'oral-cancer-detection.html',
  'orthodontics.html',
  'scaling-polishing.html',
  'sinus-lift-surgery.html',
  'socket-preservation.html',
  'surgical-extractions.html',
  'tooth-crystal.html',
  'zoom-whitening.html'
];

let count = 0;
files.forEach(file => {
  const path = `C:/Users/HP/dkd/${file}`;
  let html = fs.readFileSync(path, 'utf8');

  // Check if testimonial section already exists
  if (html.includes('PATIENT TESTIMONIALS')) {
    console.log(`SKIP ${file} - already has testimonials`);
    return;
  }

  // Insert BEFORE the FAQ comment
  const faqMarker = '<!-- FAQ -->';
  const idx = html.indexOf(faqMarker);

  if (idx === -1) {
    console.log(`SKIP ${file} - no FAQ marker found`);
    return;
  }

  html = html.slice(0, idx) + testimonialSection + '\n' + html.slice(idx);
  fs.writeFileSync(path, html, 'utf8');
  count++;
  console.log(`DONE ${file}`);
});

console.log(`\nUpdated ${count} files`);
