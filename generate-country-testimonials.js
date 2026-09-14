const fs = require('fs');
const path = require('path');

// Read template parts from testimonials.html
const tpl = fs.readFileSync('C:/Users/HP/dkd/testimonials.html', 'utf8');

// Extract header (everything up to and including <body class="has-topbar">)
const bodyEnd = tpl.indexOf('<body class="has-topbar">') + '<body class="has-topbar">'.length;

// Get from page-loader to end of mobile-nav
const loaderStart = tpl.indexOf('<!-- PAGE LOADER -->');
const heroStart = tpl.indexOf('<!-- PAGE HERO', loaderStart);
// Get header section (loader + topbar + nav + mobilenav)
const mobileNavEnd = tpl.indexOf('</div>\n<!-- PAGE HERO') !== -1
  ? tpl.indexOf('</div>\n<!-- PAGE HERO')
  : tpl.indexOf('</div>\n\n<!-- PAGE');

// Footer onwards
const footerStart = tpl.indexOf('<!-- FOOTER -->');
const fileEnd = tpl.indexOf('</html>') + '</html>'.length;

// Simpler approach: use smile-makeover.html as base for header/footer since it's cleaner
const smPage = fs.readFileSync('C:/Users/HP/dkd/smile-makeover.html', 'utf8');
const smFooterStart = smPage.indexOf('<!-- FOOTER -->');
const smFooterEnd = smPage.indexOf('</html>') + '</html>'.length;
const footerHtml = smPage.substring(smFooterStart, smFooterEnd);

// Get head section from testimonials
const headEnd = tpl.indexOf('</style>') + '</style>'.length;

// Colors for avatar backgrounds
const colors = [
  'linear-gradient(135deg,#4A90D9,#357ABD)',
  'linear-gradient(135deg,#E74C3C,#C0392B)',
  'linear-gradient(135deg,#27AE60,#219A52)',
  'linear-gradient(135deg,#F39C12,#E67E22)',
  'linear-gradient(135deg,#9B59B6,#8E44AD)',
  'linear-gradient(135deg,#1ABC9C,#16A085)',
  'linear-gradient(135deg,#2C3E50,#34495E)',
  'linear-gradient(135deg,#E91E63,#C2185B)',
  'linear-gradient(135deg,#FF5722,#D84315)',
  'linear-gradient(135deg,#3F51B5,#303F9F)',
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).filter(Boolean).slice(0,2).join('').toUpperCase();
}

function makeCard(t, idx) {
  const color = colors[idx % colors.length];
  const initials = getInitials(t.name);
  const stars = '<i class="fas fa-star"></i>'.repeat(5);
  const treatment = t.treatment ? `<div class="rv-treatment">${t.treatment}</div>` : '';
  return `
        <div class="rv-card">
          <div class="rv-stars">${stars}</div>
          <p class="rv-quote">"${t.quote}"</p>
          <div class="rv-author">
            <div class="rv-av" style="background:${color}">${initials}</div>
            <div>
              <div class="rv-name">${t.name}</div>
              <div class="rv-country"><img src="https://flagcdn.com/24x18/${t.flag}.png" alt="${t.countryShort}"> ${t.countryShort}</div>
              ${treatment}
              <div class="rv-verified"><i class="fas fa-circle-check"></i> Verified Patient</div>
            </div>
          </div>
        </div>`;
}

// Get common page parts
const commonHead = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <link rel="icon" type="image/png" href="https://www.delhidental.com/wp-content/uploads/2017/09/Dr.Kathurias-Dentistry-Logo-e1641815051747.jpg"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>`;

const commonAssets = `  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" as="style" onload="this.rel='stylesheet'"/>
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"/></noscript>
  <link rel="stylesheet" href="css/style.css"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preconnect" href="https://cdnjs.cloudflare.com"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" media="print" onload="this.media='all'"/>
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/></noscript>`;

const pageStyles = `  <style>
    .rv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:1100px;margin:0 auto}
    .rv-card{background:var(--white);border:1px solid var(--border);border-left:4px solid #B8963E;border-radius:var(--r-lg);padding:32px 28px;transition:all .3s;position:relative;overflow:hidden;box-shadow:var(--shadow-xs)}
    .rv-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-l)}
    .rv-stars{display:flex;gap:3px;margin-bottom:14px;color:#B8963E;font-size:.85rem}
    .rv-quote{font-size:.88rem;color:var(--gray);line-height:1.82;margin-bottom:20px;font-style:italic}
    .rv-author{display:flex;align-items:center;gap:14px}
    .rv-av{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.1rem;flex-shrink:0}
    .rv-name{font-size:.9rem;font-weight:700;color:var(--ink)}
    .rv-country{font-size:.72rem;color:var(--gray);display:flex;align-items:center;gap:5px;margin-top:2px}
    .rv-country img{width:20px;height:15px;border-radius:2px}
    .rv-verified{display:inline-flex;align-items:center;gap:4px;font-size:.65rem;color:var(--olive);font-weight:600;margin-top:4px}
    .rv-treatment{display:inline-block;font-size:.65rem;color:#B8963E;font-weight:600;background:rgba(184,150,62,.08);padding:2px 10px;border-radius:20px;margin-top:6px}
    @media(max-width:760px){.rv-grid{grid-template-columns:1fr;max-width:500px}}
  </style>`;

// Extract topbar+nav+mobilenav from smile-makeover (it has the updated version)
const smBodyStart = smPage.indexOf('<!-- PAGE LOADER -->');
const smHeroStart = smPage.indexOf('<!-- PAGE HERO -->');
const navSection = smPage.substring(smBodyStart, smHeroStart);

function generatePage(config) {
  const cards = config.testimonials.map((t, i) => makeCard(t, i)).join('\n');

  const html = `${commonHead}
  <title>${config.title} | Dr. Kathuria's Dentistry</title>
  <meta name="description" content="${config.description}"/>
${commonAssets}
${pageStyles}
</head>
<body class="has-topbar">

${navSection}
<!-- PAGE HERO -->
<section class="page-hero">
  <img loading="lazy" class="page-hero-img" src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80" alt="${config.title}"/>
  <div class="page-hero-overlay" style="background:linear-gradient(135deg,rgba(91,123,58,.88) 0%,rgba(63,90,36,.72) 50%,rgba(26,26,26,.82) 100%)"></div>
  <div class="page-hero-content">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <span class="sep"><i class="fas fa-chevron-right" style="font-size:.5rem"></i></span>
      <a href="testimonials.html">Testimonials</a>
      <span class="sep"><i class="fas fa-chevron-right" style="font-size:.5rem"></i></span>
      <span style="color:var(--gold-light)">${config.heading}</span>
    </div>
    <h1>${config.heading.replace(/Testimonials/, '<em>Testimonials</em>')}</h1>
    <p style="color:rgba(255,255,255,.7);font-size:1rem;margin-top:12px">${config.testimonials.length} verified patient reviews</p>
  </div>
</section>

<section class="section" style="padding:60px 5%">
  <div class="container">
    <div style="text-align:center;margin-bottom:44px">
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.2rem);color:var(--ink)"><img src="https://flagcdn.com/48x36/${config.flag}.png" alt="${config.countryName}" style="width:36px;height:27px;border-radius:4px;vertical-align:middle;margin-right:10px">${config.heading}</h2>
      <p style="color:var(--gray);font-size:.9rem;margin-top:8px">${config.subtitle}</p>
    </div>
    <div class="rv-grid">
${cards}
    </div>
    <div style="text-align:center;margin-top:40px">
      <a href="testimonials.html" class="btn btn-outline btn-pill" style="font-size:.85rem"><i class="fas fa-arrow-left"></i> All Testimonials</a>
      <a href="contact.html" class="btn btn-gold btn-pill" style="font-size:.85rem;margin-left:12px"><i class="fas fa-calendar-check"></i> Book Consultation</a>
    </div>
  </div>
</section>

${footerHtml}`;

  const fp = path.join('C:/Users/HP/dkd', config.filename);
  fs.writeFileSync(fp, html, 'utf8');
  console.log('DONE ' + config.filename + ' (' + config.testimonials.length + ' reviews)');
}

// ═══════════════ ALL COUNTRY DATA ═══════════════

const pages = [
  {
    filename: 'usa-testimonials.html',
    title: 'USA Patient Testimonials',
    heading: 'USA Testimonials',
    description: 'Read real testimonials from American patients who chose Dr. Kathuria\'s Dentistry for dental implants, smile makeovers, and veneers in Delhi, India.',
    subtitle: 'Real stories from American patients who trusted us with their smiles.',
    flag: 'us', countryName: 'USA',
    testimonials: [
      {name:'Mr. Prem Issar',flag:'us',countryShort:'USA',treatment:'Dental Implants',quote:'I travelled from the USA specifically for dental implants. The entire experience was exceptional — from the initial video consultation to the final placement. My new teeth feel completely natural, and I saved over 70% compared to US pricing.'},
      {name:'Marlene Powell',flag:'us',countryShort:'USA',treatment:'Smile Makeover',quote:'My dental implants were done painlessly and the healing was quick. The staff was so caring and the clinic ambiance is like a 5-star hotel. Dr. Puneet is truly an expert!'},
      {name:'Kyle Steller',flag:'us',countryShort:'USA',treatment:'Porcelain Veneers',quote:'Got 6 porcelain veneers and teeth whitening. The results are incredible — my colleagues can\'t believe the transformation. Dr. Sween is a true artist.'},
      {name:'Michael Jone Matson',flag:'us',countryShort:'USA',treatment:'Full Mouth Rehabilitation',quote:'Flew from the US for full mouth rehabilitation. The treatment plan was thorough, the technology is cutting-edge, and the results exceeded my expectations.'},
      {name:'Cheryl Dunn',flag:'us',countryShort:'USA',treatment:'RCT & Implants',quote:'Got 5 RCT and 9 implants done at Dr. Kathuria\'s. What impressed me the most was the painless procedure and the caring attitude of the entire team.'},
      {name:'Lisa Robbins',flag:'us',countryShort:'USA',treatment:'Zoom Whitening',quote:'The Zoom whitening results were amazing — 6 shades whiter in one sitting. Dr. Sween was professional and made the whole experience comfortable.'},
      {name:'David Brooks',flag:'us',countryShort:'USA',treatment:'Crowns & Bridges',quote:'Got metal-free crowns and bridges. The precision and finish is world-class. I would rate Dr. Kathuria\'s clinic a solid 5 stars.'},
      {name:'Jennifer Walsh',flag:'us',countryShort:'USA',treatment:'Clear Aligners',quote:'Started my clear aligner treatment during a business trip. Digital scan done in minutes. Six months later, perfectly aligned teeth. Excellent experience.'},
    ]
  },
  {
    filename: 'uk-testimonials.html',
    title: 'UK Patient Testimonials',
    heading: 'UK Testimonials',
    description: 'Read real testimonials from British patients who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi, India.',
    subtitle: 'Real stories from British patients who trusted us with their smiles.',
    flag: 'gb', countryName: 'United Kingdom',
    testimonials: [
      {name:'Donald Mclean',flag:'gb',countryShort:'UK',treatment:'Implants & Crowns',quote:'Spent some time at Dr. Kathuria\'s Dentistry for several implants and crowns. Dr Puneet Kathuria was professional in his work and along with state of the art onsite equipment for implants. All my treatment from start to finish was painless and carried out under excellent hygiene conditions.'},
      {name:'Thomas Macauley',flag:'gb',countryShort:'England',treatment:'Zoom Whitening & Gap Closure',quote:'I had zoom whitening and a composite bonding for a gap closure at Dr. Kathuria\'s Dentistry. I\'d highly recommend this dental practice as they are very professional and efficient.'},
      {name:'Pavandeep Singh',flag:'gb',countryShort:'UK',treatment:'Smile Makeover',quote:'Care and attention to the detailing. Total client focus and to aim and execute a great smile. Best dentist in Delhi. 5 star rating.'},
      {name:'Bradleigh Gough',flag:'gb',countryShort:'UK',treatment:'Crowns & Whitening',quote:'I was really happy with the professionalism of the dentist and attention to the detail. Thanks Dr. Sween Kathuria for a nice work including Crowns & whitening.'},
      {name:'Pam Kelly',flag:'gb',countryShort:'UK',treatment:'General Dental',quote:'Dr. Kathuria\'s Clinic in East of Kailash, New Delhi is very welcoming & Dr. Kathurias are very flexible to patient\'s requirements. This is the best dental treatment I have received.'},
      {name:'Tony Clark',flag:'gb',countryShort:'UK',treatment:'Smile Makeover & Inlays',quote:'Got smile makeover and old fillings replaced with porcelain inlays from Dr Sween Kathuria. Indeed, its one of the best setups I\'ve ever attended.'},
      {name:'Michael O\'Gready',flag:'gb',countryShort:'UK',treatment:'Dental Implant',quote:'Efficiency & air of competence. Thanks, Dr. Puneet Kathuria for a pain-free implant treatment.'},
      {name:'Gordon Shannon',flag:'gb',countryShort:'UK',treatment:'Implant & Crown',quote:'Clinical expertise is what impressed me the most for Dr. Kathuria. Got dental implant & crown done by Dr. Puneet Kathuria & I give him a 5 star rating.'},
      {name:'Farah Fernandes da Silva',flag:'gb',countryShort:'UK',treatment:'Crowns',quote:'Got crowns done by Dr. Kathuria\'s. I liked the most was the care of whole team. Staff are very helpful and polite. I am very much happy for the best dental treatment.'},
      {name:'Sarah Patterson',flag:'gb',countryShort:'UK',treatment:'Teeth Whitening',quote:'Thank you Dr. Kathuria\'s for giving me whiter, brighter and beautiful smile.'},
      {name:'Mark Bray',flag:'gb',countryShort:'UK',treatment:'',quote:'Dr. Kathuria — Incredible amazing dentistry. Can\'t thank you enough for the excellent work. I am so pleased with the work.'},
      {name:'Joanna Kerrigan',flag:'gb',countryShort:'UK',treatment:'Cleaning & Fillings',quote:'The best dental work I have ever had, my teeth have never been so clean and the fillings you can\'t see at all. Perfect and truly great experience.'},
      {name:'Paul Jackson',flag:'gb',countryShort:'UK',treatment:'Metal-free Crowns & Bridges',quote:'Got replacement of existing old crowns and bridges by the metal free crowns by Dr. Kathuria. What impressed me the most was his ability to listen to my requirements and provide a workable option.'},
      {name:'Sarah Lindley',flag:'gb',countryShort:'UK',treatment:'Crowns & Whitening',quote:'The doctors and staff were helpful and efficient. Got crowns and teeth whitening done very fast and comfortably. Clinic interiors, music and cleanliness are excellent.'},
    ]
  },
  {
    filename: 'canada-testimonials.html',
    title: 'Canada Patient Testimonials',
    heading: 'Canada Testimonials',
    description: 'Read real testimonials from Canadian patients who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi, India.',
    subtitle: 'Real stories from Canadian patients who trusted us with their smiles.',
    flag: 'ca', countryName: 'Canada',
    testimonials: [
      {name:'Bill Yakimec',flag:'ca',countryShort:'Canada',treatment:'Veneers, Crowns & Fillings',quote:'Travelling from St. Paul, Alberta, my experience with Dr. Sween Kathuria was exceptional. I underwent veneers, crowns, and fillings, and the results exceeded my expectations.'},
      {name:'Kristien Smekens',flag:'ca',countryShort:'Canada',treatment:'Implant, RCT & Zirconia Crowns',quote:'Coming from Canada, my dental journey with Dr. Sween Kathuria was outstanding. I underwent an implant, root canal, and zirconia crowns, and the results were flawless.'},
      {name:'Fern Burlow',flag:'ca',countryShort:'Canada',treatment:'Zoom Whitening',quote:'Got Zoom whitening at Dr. Kathuria\'s Dental in Delhi. I am satisfied with the good work done.'},
      {name:'Sabine Montagnon',flag:'ca',countryShort:'Canada',treatment:'Smile Enhancement',quote:'Everything went smooth and quickly doctors work well around my short schedule. Thank you Dr. Sween Kathuria for my new smile.'},
      {name:'Mark Tiller',flag:'ca',countryShort:'Canada',treatment:'',quote:'Great work done by Dr. Puneet & Sween Kathuria. Professionalism & caring attitude impressed me the most. Carry on the great work.'},
      {name:'Brenda Cranney',flag:'ca',countryShort:'Canada',treatment:'',quote:'Painless & professional work by Dr. Kathuria. Competence & Comprehensive dental planning impressed me the most.'},
      {name:'Giles E',flag:'ca',countryShort:'Canada',treatment:'Gap Fillings with Crowns',quote:'Got gap fillings with crowns done at Dr. Kathuria\'s dental Clinic. I was impressed by the friendliness of staff & the treatment options offered.'},
      {name:'Susan Simpson',flag:'ca',countryShort:'Canada',treatment:'',quote:'You guys are wonderful. I can\'t thank Puneet & Sween Kathuria enough for their wonderful care.'},
      {name:'Katia Chapman',flag:'ca',countryShort:'Canada',treatment:'Implants & Crowns',quote:'Got Dental implants & Crowns done at Dr. Kathuria\'s. What impressed me the most was the professionalism & courtesy with the way the work was done.'},
      {name:'Tenny',flag:'ca',countryShort:'Canada',treatment:'E-max Crowns',quote:'Got E-max crowns done at Dr. Kathuria\'s. Comfort was the most important thing which impressed me. Professional, friendly & a good communicator. Overall excellent.'},
      {name:'Mamta Chhetry Thapa',flag:'ca',countryShort:'Canada',treatment:'Smile Design',quote:'A great experience here. I would like to thank both Dr. Sween & Dr. Puneet Kathuria for giving me the smile I always wanted.'},
      {name:'Mary Savage',flag:'ca',countryShort:'Canada',treatment:'Root Canal',quote:'I found the clinic from internet and got root canal done. I liked Dr. Sween most. I am very impressed by your total service.'},
      {name:'Gerry Syvokas',flag:'ca',countryShort:'Canada',treatment:'Full Mouth Reconstruction',quote:'For my full mouth reconstruction with metal free Crowns, the professionalism from the receptionist to the Prosthodontist Dr. Puneet Kathuria was most impressive. My wife says my new smile is wonderful.'},
    ]
  },
  {
    filename: 'australia-testimonials.html',
    title: 'Australia Patient Testimonials',
    heading: 'Australia Testimonials',
    description: 'Read real testimonials from Australian patients who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi, India.',
    subtitle: 'Real stories from Australian patients who trusted us with their smiles.',
    flag: 'au', countryName: 'Australia',
    testimonials: [
      {name:'Ify and Tu Duley',flag:'au',countryShort:'Australia',treatment:'',quote:'Thank you Dr Kathurias for the amazing work. Very happy with the results.'},
      {name:'Bob Dunnett',flag:'au',countryShort:'Australia',treatment:'Implants, Whitening, Crowns & Fillings',quote:'Got dental implants, teeth whitening, crowns and fillings done. Everything good.'},
      {name:'Michelle Patrick',flag:'au',countryShort:'Australia',treatment:'Crowns',quote:'The Professionalism & Perfectionism of Dr. Kathuria is un-parallel. Feel like a movie star.'},
      {name:'David Swann',flag:'au',countryShort:'Australia',treatment:'',quote:'Doctors and team with a passion for excellence. Best dental experience I had.'},
      {name:'Jennifer Buckley',flag:'au',countryShort:'Australia',treatment:'Crowns & Zoom Whitening',quote:'Got two crowns and zoom whitening done. Teeth look better. Very happy.'},
      {name:'Greg Davis',flag:'au',countryShort:'Australia',treatment:'',quote:'Best dental service and work I\'ve ever had. Overall 5 star rating.'},
      {name:'Tony & Joanna',flag:'au',countryShort:'Australia',treatment:'Multiple Procedures',quote:'Dr Kathuria came highly recommended. Excellent and well paced dental work.'},
      {name:'Ashena',flag:'au',countryShort:'Australia',treatment:'Smile Makeover',quote:'Thank you Dr. Sween Kathuria for the lovely smile makeover. I am giggling.'},
      {name:'Michael Ryan',flag:'au',countryShort:'Australia',treatment:'Crowns, RCT & Inlays',quote:'Professionalism, competency, hygiene superior to dental clinics in Australia & Ireland.'},
      {name:'Lorraine Young',flag:'au',countryShort:'Australia',treatment:'Dental Implant',quote:'What impressed me most was his mannerism. Excellent competence. 5 star.'},
    ]
  },
  {
    filename: 'new-zealand-testimonials.html',
    title: 'New Zealand Patient Testimonials',
    heading: 'New Zealand Testimonials',
    description: 'Read real testimonials from New Zealand patients who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi, India.',
    subtitle: 'Real stories from Kiwi patients who trusted us with their smiles.',
    flag: 'nz', countryName: 'New Zealand',
    testimonials: [
      {name:'Rod Butchers',flag:'nz',countryShort:'New Zealand',treatment:'Dental Implants',quote:'A genuine desire to get it right. Both in the procedure & outcome. Very happy with my dental implants job.'},
      {name:'Jenny Norris',flag:'nz',countryShort:'New Zealand',treatment:'',quote:'Excellent treatment done by Dr. Kathurias, I was very well informed about the treatment.'},
      {name:'Shona',flag:'nz',countryShort:'New Zealand',treatment:'',quote:'Very much impressed with the amazing qualifications of both the doctors! The respect and care given was wonderful.'},
      {name:'Mathew Gordon',flag:'nz',countryShort:'New Zealand',treatment:'Smile Design',quote:'Got my new smile, liked it so much. Impressive technical structure, excellent doctors attitude and competence.'},
      {name:'Mark Cumming',flag:'nz',countryShort:'New Zealand',treatment:'Root Canal & Crown',quote:'Excellent treatment with professional dedication & thoroughness. Would not hesitate to recommend to friends.'},
      {name:'Robyn Coleman',flag:'nz',countryShort:'New Zealand',treatment:'',quote:'Felt at ease all the time. Doctors competence & attitude is excellent. What I liked most was my results.'},
      {name:'Chuck Marriot',flag:'nz',countryShort:'New Zealand',treatment:'Metal-free Crowns',quote:'What impressed me was the quality of service & the skill of Dr. Kathuria to handle a case like mine.'},
      {name:'Terry Dower',flag:'nz',countryShort:'New Zealand',treatment:'',quote:'The ability of the doctors in his delivery of work was nothing short of expectation.'},
    ]
  },
  {
    filename: 'europe-testimonials.html',
    title: 'Europe Patient Testimonials',
    heading: 'Europe Testimonials',
    description: 'Read real testimonials from European patients who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi, India.',
    subtitle: 'Real stories from European patients who trusted us with their smiles.',
    flag: 'eu', countryName: 'Europe',
    testimonials: [
      {name:'Pierre Jenni',flag:'ch',countryShort:'Switzerland',treatment:'Emergency Dental',quote:'Thank you Dr Kathuria and his team to safely finish my pending emergency dental work under these testing times of Covid.'},
      {name:'Berkeli Altggev',flag:'tm',countryShort:'Turkmenistan',treatment:'Implants & Crowns',quote:'Got implants and crowns. 5 star Clinic. Everything excellent.'},
      {name:'Ros Plazma',flag:'il',countryShort:'Israel',treatment:'',quote:'Wow! I never thought I\'d want to go back to the dentist. After meeting the nicest clinic staff.'},
      {name:'Anton Chernjavsky',flag:'il',countryShort:'Israel',treatment:'',quote:'Great, just great. High standards clinic and service provided is exceptional, total professionals, value for money!'},
      {name:'Michael Hansen',flag:'be',countryShort:'Belgium',treatment:'',quote:'I am thankful to Dr. Kathurias for the best dental treatment that I have received. I liked most is the good service and on time treatment.'},
      {name:'Han Vendivianne',flag:'be',countryShort:'Belgium',treatment:'',quote:'Professionalism is top. We are really happy with the treatment. We will recommend to all our family and friends about Dr. Kathuria.'},
      {name:'Sebastian',flag:'de',countryShort:'Germany',treatment:'Smile Makeover with Veneers',quote:'Got my smile makeover done by Dr. Kathuria, one of the top dentist in Delhi. A perfect dentist visit, very professional, veneers are very good looking.'},
      {name:'Iris Mulder',flag:'nl',countryShort:'Netherlands',treatment:'',quote:'Everything was very good. I am very happy with the services & the quick work. Overall 5 star rating.'},
      {name:'Fine Ranch',flag:'de',countryShort:'Germany',treatment:'Teeth Whitening',quote:'Thanks to Dr. Kathuria for a whiter, brighter smile.'},
      {name:'Zoltan L',flag:'it',countryShort:'Italy',treatment:'Crown Replacement',quote:'Got my crown replaced with extreme care and flexibility in treatment, would rate the clinic excellent in everything from interiors, sterilization, comfort, cleanliness.'},
      {name:'Sophie Behan & Carol',flag:'fr',countryShort:'France',treatment:'',quote:'Loved the results of our dental work. We were treated courteously & queries answered.'},
    ]
  },
  {
    filename: 'asia-testimonials.html',
    title: 'Asia Patient Testimonials',
    heading: 'Asia Testimonials',
    description: 'Read real testimonials from Asian patients who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi, India.',
    subtitle: 'Real stories from Asian patients who trusted us with their smiles.',
    flag: 'in', countryName: 'Asia',
    testimonials: [
      {name:'Dr. Monira',flag:'af',countryShort:'Afghanistan',treatment:'Implants & Bridges',quote:'Got dental implant & bridges done at Dr. Kathuria\'s Dentistry. Everything went well.'},
      {name:'Andrey Zhuzhlin',flag:'ru',countryShort:'Russia',treatment:'',quote:'Just continue with same pace and attitude, everything excellent.'},
      {name:'Maki Park',flag:'jp',countryShort:'Japan',treatment:'',quote:'Had a good and satisfactory experience at Dr Kathurias. And of course I can smile.'},
      {name:'Satya Thapa',flag:'np',countryShort:'Nepal',treatment:'',quote:'Thanks for the amazing work. Professionalism is top most priority. Really happy.'},
      {name:'Anita Nayeck',flag:'mu',countryShort:'Mauritius',treatment:'',quote:'Loved the atmosphere and warm welcome from everybody. Wanted to come to India for dental work.'},
      {name:'Noor',flag:'iq',countryShort:'Iraq',treatment:'',quote:'Made my choice of getting my dental work done at Dr. Kathuria\'s dental clinic.'},
      {name:'Grace Lim',flag:'my',countryShort:'Malaysia',treatment:'',quote:'The final result impressed me the most. Professionalism of the doctors is top notch.'},
    ]
  },
  {
    filename: 'india-testimonials.html',
    title: 'India Patient Testimonials',
    heading: 'India Testimonials',
    description: 'Read real testimonials from Indian patients who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi.',
    subtitle: 'Real stories from Indian patients who trusted us with their smiles.',
    flag: 'in', countryName: 'India',
    testimonials: [
      {name:'Balajee Singh',flag:'in',countryShort:'India',treatment:'',quote:'National Shooting Champion receiving dental work at Dr. Kathuria\'s Dentistry.'},
      {name:'Saguna Datt',flag:'in',countryShort:'India',treatment:'Smile Restoration',quote:'I thank Dr. Kathuria for his expertise in restoring my smile, my confidence.'},
      {name:'Divyaleena',flag:'in',countryShort:'India',treatment:'Tooth Restoration',quote:'I had just 10 days to fix my tooth. My treatment was done in 6 days and now I can smile.'},
      {name:'Neil Jean Bhatnagar',flag:'in',countryShort:'India',treatment:'Smile Makeover',quote:'Thank you Dr. Sween Kathuria for the excellent smile makeover for me.'},
      {name:'Ashie Seehra',flag:'in',countryShort:'India',treatment:'Smile Makeover',quote:'I got a smile makeover done by Dr Kathuria. Attention to each and every detail was given.'},
      {name:'Juhi Varshney',flag:'in',countryShort:'India',treatment:'Smile Makeover',quote:'Thank you Dr. Kathuria for an excellent smile makeover. You are one of the best cosmetic dentist.'},
      {name:'Swati',flag:'in',countryShort:'India',treatment:'',quote:'Thank you Dr. Sween Kathuria was a fantastic treatment. I have my smile back.'},
      {name:'Kasturi',flag:'in',countryShort:'India',treatment:'Cosmetic Dentistry',quote:'After a very bad dental experience in Mumbai, I specially flew down to Delhi for Dr. Kathuria\'s expertise.'},
      {name:'Neeraj Sharma',flag:'in',countryShort:'India',treatment:'',quote:'One of the best dentist in the country, Dr. Puneet Kathuria treated me with great efficiency.'},
      {name:'Amrita',flag:'in',countryShort:'India',treatment:'Smile Makeover',quote:'I loved the environment and the services. I have received a perfect smile. Best dentists in Delhi.'},
      {name:'Ranjabati',flag:'in',countryShort:'India',treatment:'',quote:'A clean environment with pain-free experience. The clinic has very friendly staff, great ambiance.'},
    ]
  },
  {
    filename: 'africa-testimonials.html',
    title: 'Africa Patient Testimonials',
    heading: 'Africa Testimonials',
    description: 'Read real testimonials from African patients who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi, India.',
    subtitle: 'Real stories from African patients who trusted us with their smiles.',
    flag: 'za', countryName: 'Africa',
    testimonials: [
      {name:'Felicity Dindiwe',flag:'zm',countryShort:'Zambia',treatment:'',quote:'What impressed me the most was how my case was handled, I was informed on what was going to be done at every stage, before any action was taken.'},
      {name:'Ghuffran Chaboo',flag:'za',countryShort:'South Africa',treatment:'Crowns & Dentures',quote:'Highly impressed by the time management of my case and levels of efficiency and professionalism of Dr. Kathuria. Thank you for my crowns and dentures!'},
      {name:'Marilene Nganga',flag:'ke',countryShort:'Kenya',treatment:'Metal-free Crowns',quote:'I was convinced the procedures would be painless, for sure they were! The impossible became possible at Dr Kathuria\'s clinic. Beautiful metal free crowns!'},
      {name:'Prisca Wambua',flag:'ke',countryShort:'Kenya',treatment:'Implant, Crown & Veneers',quote:'Got dental implant, crown & veneers done. I am impressed by the professionalism & being attended all the time.'},
      {name:'L. Houssam',flag:'ma',countryShort:'Morocco',treatment:'',quote:'Best dental treatments ever had, professional service, very impressing doctor\'s attitude.'},
      {name:'Liz Cooke',flag:'za',countryShort:'Africa',treatment:'Smile Makeover',quote:'Was referred to Dr. Kathuria\'s Dental Clinic for smile makeover. Doctors were friendly and explained everything in detail. Efficient and painless.'},
      {name:'Juliet Walker',flag:'ng',countryShort:'Nigeria',treatment:'Tooth Extraction',quote:'Got treatment done very courteously, every query was answered. Extraction of tooth was so impressive.'},
      {name:'Eloho Emezana',flag:'za',countryShort:'South Africa',treatment:'Gap Closures & RCT',quote:'Gap closures with Crowns & RCT. Overall professional attitude & efficiency impressed me the most.'},
      {name:'Dominic',flag:'ke',countryShort:'Kenya',treatment:'Cosmetic Dentistry',quote:'This is one of the best dental clinic I have ever attended. I was very happy with their professionalism and team work.'},
      {name:'Jacqueline Njovo',flag:'ke',countryShort:'Kenya',treatment:'Implant & Bone Grafting',quote:'Professionalism by the doctors and staff impressed me most, along with their help in hotel accommodation and ideas on places to visit.'},
    ]
  },
  {
    filename: 'embassy-testimonials.html',
    title: 'Embassy & High Commission Testimonials',
    heading: 'Embassy Testimonials',
    description: 'Read testimonials from embassy and high commission staff who chose Dr. Kathuria\'s Dentistry for dental treatments in Delhi.',
    subtitle: 'Trusted by diplomats and embassy staff from around the world.',
    flag: 'in', countryName: 'Embassy',
    testimonials: [
      {name:'Donald Barr',flag:'ca',countryShort:'High Commission of Canada',treatment:'Root Canal & Crown',quote:'Got RCT and Crown done by Dr Kathuria. Everything was good and professional.'},
      {name:'Ken Sophearith',flag:'kh',countryShort:'Royal Embassy of Cambodia',treatment:'',quote:'Painless, high standard, great hospitality especially a warm welcome from the staff and best results.'},
      {name:'Ms. Marina Achi-Fazakh',flag:'ca',countryShort:'High Commission of Canada',treatment:'',quote:'Excellent job and attitude of the doctors. The best clinic I saw in New Delhi. Everything was perfect 5 star ratings.'},
      {name:'Vera Fritsch',flag:'at',countryShort:'Embassy of Austria',treatment:'',quote:'Great treatment — Great team.'},
    ]
  },
];

// Generate all pages
pages.forEach(p => generatePage(p));
console.log('\nGenerated ' + pages.length + ' country testimonial pages');
