const fs = require('fs');
const path = require('path');

const smPage = fs.readFileSync('C:/Users/HP/dkd/smile-makeover.html', 'utf8');
const smFooterStart = smPage.indexOf('<!-- FOOTER -->');
const smFooterEnd = smPage.indexOf('</html>') + '</html>'.length;
const footerHtml = smPage.substring(smFooterStart, smFooterEnd);

const smBodyStart = smPage.indexOf('<!-- PAGE LOADER -->');
const smHeroStart = smPage.indexOf('<!-- PAGE HERO -->');
const navSection = smPage.substring(smBodyStart, smHeroStart);

function makeCard(t, idx) {
  const imgHtml = t.img
    ? `<img loading="lazy" src="${t.img}" alt="${t.name}" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid var(--gold);flex-shrink:0">`
    : `<div class="rv-av" style="background:var(--olive);width:56px;height:56px;font-size:1.1rem">${t.name.split(' ').map(w=>w[0]).filter(Boolean).slice(0,2).join('').toUpperCase()}</div>`;
  const stars = '<i class="fas fa-star"></i>'.repeat(5);
  const treatment = t.treatment ? `<div class="rv-treatment">${t.treatment}</div>` : '';
  return `
        <div class="rv-card">
          <div class="rv-stars">${stars}</div>
          <p class="rv-quote">"${t.quote.replace(/"/g,'&quot;')}"</p>
          <div class="rv-author">
            ${imgHtml}
            <div>
              <div class="rv-name">${t.name}</div>
              <div class="rv-country"><img src="https://flagcdn.com/24x18/${t.flag}.png" alt="${t.cs}"> ${t.cs}</div>
              ${treatment}
              <div class="rv-verified"><i class="fas fa-circle-check"></i> Verified Patient</div>
            </div>
          </div>
        </div>`;
}

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
    .rv-card{background:var(--white);border:1px solid var(--border);border-left:4px solid #B8963E;border-radius:var(--r-lg);padding:28px 24px;transition:all .3s;box-shadow:var(--shadow-xs)}
    .rv-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-l)}
    .rv-stars{display:flex;gap:3px;margin-bottom:12px;color:#B8963E;font-size:.82rem}
    .rv-quote{font-size:.85rem;color:var(--gray);line-height:1.8;margin-bottom:18px;font-style:italic}
    .rv-author{display:flex;align-items:center;gap:14px}
    .rv-av{border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;flex-shrink:0}
    .rv-name{font-size:.88rem;font-weight:700;color:var(--ink)}
    .rv-country{font-size:.72rem;color:var(--gray);display:flex;align-items:center;gap:5px;margin-top:2px}
    .rv-country img{width:20px;height:15px;border-radius:2px}
    .rv-verified{display:inline-flex;align-items:center;gap:4px;font-size:.65rem;color:var(--olive);font-weight:600;margin-top:4px}
    .rv-treatment{display:inline-block;font-size:.65rem;color:#B8963E;font-weight:600;background:rgba(184,150,62,.08);padding:2px 10px;border-radius:20px;margin-top:6px}
    @media(max-width:760px){.rv-grid{grid-template-columns:1fr;max-width:500px}}
  </style>`;

function gen(c) {
  const cards = c.testimonials.map((t,i) => makeCard(t,i)).join('\n');
  const html = `${commonHead}
  <title>${c.title} | Dr. Kathuria's Dentistry</title>
  <meta name="description" content="${c.desc}"/>
${commonAssets}
${pageStyles}
</head>
<body class="has-topbar">
${navSection}
<!-- PAGE HERO -->
<section class="page-hero">
  <img loading="lazy" class="page-hero-img" src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80" alt="${c.title}"/>
  <div class="page-hero-overlay" style="background:linear-gradient(135deg,rgba(91,123,58,.88) 0%,rgba(63,90,36,.72) 50%,rgba(26,26,26,.82) 100%)"></div>
  <div class="page-hero-content">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <span class="sep"><i class="fas fa-chevron-right" style="font-size:.5rem"></i></span>
      <a href="testimonials.html">Testimonials</a>
      <span class="sep"><i class="fas fa-chevron-right" style="font-size:.5rem"></i></span>
      <span style="color:var(--gold-light)">${c.heading}</span>
    </div>
    <h1>${c.heading.replace(/Testimonials/,'<em>Testimonials</em>')}</h1>
    <p style="color:rgba(255,255,255,.7);font-size:1rem;margin-top:12px">${c.testimonials.length} verified patient reviews</p>
  </div>
</section>

<section class="section" style="padding:60px 5%">
  <div class="container">
    <div style="text-align:center;margin-bottom:44px">
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.2rem);color:var(--ink)"><img src="https://flagcdn.com/48x36/${c.flag}.png" alt="${c.cn}" style="width:36px;height:27px;border-radius:4px;vertical-align:middle;margin-right:10px">${c.heading}</h2>
      <p style="color:var(--gray);font-size:.9rem;margin-top:8px">${c.sub}</p>
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
  fs.writeFileSync(path.join('C:/Users/HP/dkd', c.file), html, 'utf8');
  console.log('DONE ' + c.file + ' (' + c.testimonials.length + ' reviews)');
}

// Helper
const t = (name,flag,cs,treatment,quote,img) => ({name,flag,cs,treatment,quote,img});

const pages = [
  {
    file:'usa-testimonials.html', title:'USA Patient Testimonials', heading:'USA Testimonials',
    desc:'Real testimonials from American patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from American patients who trusted us with their smiles.', flag:'us', cn:'USA',
    testimonials:[
      t('Micheal Jone Matson','us','USA','Implants & Veneers','Exceptional experience with implants and veneers. Results were truly life-changing with outstanding precision.','https://www.delhidental.com/wp-content/uploads/2025/12/19a41e25-60ef-460f-9d6c-a185f0eaf47f.jpg'),
      t('Marlene Powell','us','USA','Smile Makeover','Gave me a new smile which I thought was impossible. Mostly pain free process.','https://www.delhidental.com/wp-content/uploads/2019/09/Marlene-Powell-USA.jpeg'),
      t('Kyle Steller','us','USA','Mouth Reconstruction','Best dental care received. Kind staff and excellent dentist for extensive mouth reconstruction work.','https://www.delhidental.com/wp-content/uploads/2019/09/Kyle-USA.jpg'),
      t('Usama Youssef','us','USA','General Dentistry','Clean clinic, skillful doctors, nice team. Clinic level matches international standards.','https://www.delhidental.com/wp-content/uploads/2018/12/USAMA-YOUSSEF-USA.jpg'),
      t('Mary Rasmussen','us','USA','General Dentistry','Good website, friendly competent staff. Treatment was painless and rapid.','https://www.delhidental.com/wp-content/uploads/2018/10/Mary-Rasmussen-USA.jpg'),
      t('Cheryl Dunn','us','USA','RCT & Implants','Professional excellence and state-of-art equipment. Got 5 RCTs and 9 implants.','https://www.delhidental.com/wp-content/uploads/2018/09/Cheryl-Dunn-USA.jpeg'),
      t('Gary Bugai','us','USA','Implants & Crowns','Doctors were professional in procedure and communication.','https://www.delhidental.com/wp-content/uploads/2018/02/Gary-Bugai-USA.jpg'),
      t('Mark Litt','us','USA','','Secure, pleasant, spotless environment. Confident in highest caliber treatment.','https://www.delhidental.com/wp-content/uploads/2018/02/Mark-Litt-USA.jpg'),
      t('Anju Kumari Ray','us','USA','','Warm, understanding dentists with great professionalism and excellent work quality.','https://www.delhidental.com/wp-content/uploads/2017/09/ANJU-KUMARI-RAY.jpg'),
      t('Daryl Wagoner','us','USA','Dental Implants','Dental implant procedure with excellent quality and expertise. Highly recommend.','https://www.delhidental.com/wp-content/uploads/2017/09/Daryl-Wagoner-US.jpg'),
      t('Teri Mattson','us','USA','','Very professional and responsive. Great job by one of the best dental setups.','https://www.delhidental.com/wp-content/uploads/2017/09/TERI-MATTSON.jpg'),
      t('Seema Farhat','us','USA','','Wonderful dental work by Dr. Puneet and Dr. Sween Kathuria.','https://www.delhidental.com/wp-content/uploads/2017/09/SEEMA-FARHAT.jpg'),
      t('David Burns','us','USA','','In-depth communication about appointments and procedures. Excellent rating.','https://www.delhidental.com/wp-content/uploads/2017/09/DAVID-BURNS.jpg'),
      t('Gary Thompson','us','USA','Dental Implants','Speed and quality match or exceed US dentists. Better than many American clinics.','https://www.delhidental.com/wp-content/uploads/2017/09/GARY-THOMPSON.jpg'),
      t('Michael Carlson','us','USA','Veneers','Shortest timespan for veneers. Outstanding work with thorough professional services.','https://www.delhidental.com/wp-content/uploads/2017/09/MICHAEL-CARLSON.jpg'),
      t('Syd Allen','us','USA','Teeth Restoration','Excellent treatment restoring teeth. Can now eat food of choice.','https://www.delhidental.com/wp-content/uploads/2017/09/SYD-ALLEN.jpg'),
    ]
  },
  {
    file:'uk-testimonials.html', title:'UK Patient Testimonials', heading:'UK Testimonials',
    desc:'Real testimonials from British patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from British patients who trusted us with their smiles.', flag:'gb', cn:'United Kingdom',
    testimonials:[
      t('Donald Mclean','gb','UK','Implants & Crowns','Spent some time at Dr. Kathuria\'s Dentistry for several implants and crowns. Dr Puneet Kathuria was professional in his work. All treatment was painless under excellent hygiene conditions.','https://www.delhidental.com/wp-content/uploads/2019/08/Donald-Mclean-UK.jpg'),
      t('Thomas Macauley','gb','England','Whitening & Gap Closure','I had zoom whitening and a composite bonding for a gap closure. I\'d highly recommend this dental practice as they are very professional and efficient.','https://www.delhidental.com/wp-content/uploads/2019/07/Thomas-Macauley-England.jpeg'),
      t('Pavandeep Singh','gb','UK','Smile Makeover','Care and attention to the detailing. Total client focus and to aim and execute a great smile. Best dentist in Delhi. 5 star rating.','https://www.delhidental.com/wp-content/uploads/2018/10/Pavandeep-Singh-UK-1.jpg'),
      t('Bradleigh Gough','gb','UK','Crowns & Whitening','I was really happy with the professionalism of the dentist and attention to the detail. Thanks Dr. Sween Kathuria for a nice work including Crowns & whitening.','https://www.delhidental.com/wp-content/uploads/2017/11/BRADLEIGH-GOUGH-UK.jpg'),
      t('Pam Kelly','gb','UK','','Dr. Kathuria\'s Clinic is very welcoming & doctors very flexible to patient\'s requirements. This is the best dental treatment I have received.','https://www.delhidental.com/wp-content/uploads/2017/11/PAM-KELLY-UK-Copy.jpg'),
      t('Tony Clark','gb','UK','Smile Makeover & Inlays','Got smile makeover and old fillings replaced with porcelain inlays from Dr Sween Kathuria. Indeed, its one of the best setups I\'ve ever attended.','https://www.delhidental.com/wp-content/uploads/2017/09/TONY-CLARK.jpg'),
      t('Michael O\'Gready','gb','UK','Dental Implant','Efficiency & air of competence. Thanks, Dr. Puneet Kathuria for a pain-free implant treatment.','https://www.delhidental.com/wp-content/uploads/2017/09/MICHAEL-O-GREADY.jpg'),
      t('Gordon Shannon','gb','UK','Implant & Crown','Clinical expertise is what impressed me the most. Got dental implant & crown done. I give him a 5 star rating.','https://www.delhidental.com/wp-content/uploads/2017/09/GORDON-SHANNON.jpg'),
      t('Farah Fernandes da Silva','gb','UK','Crowns','Got crowns done. I liked the care of whole team. Staff are very helpful and polite.','https://www.delhidental.com/wp-content/uploads/2017/09/FARAH-FERNANDES-DA-SILVA.jpg'),
      t('Sarah Patterson','gb','UK','Teeth Whitening','Thank you Dr. Kathuria\'s for giving me whiter, brighter and beautiful smile.','https://www.delhidental.com/wp-content/uploads/2017/09/SARAH-PATTERSON.jpg'),
      t('Mark Bray','gb','UK','','Dr. Kathuria — Incredible amazing dentistry. Can\'t thank you enough for the excellent work.','https://www.delhidental.com/wp-content/uploads/2017/09/MARK-BRAY.jpg'),
      t('Joanna Kerrigan','gb','UK','Cleaning & Fillings','The best dental work I have ever had, my teeth have never been so clean and the fillings you can\'t see at all.','https://www.delhidental.com/wp-content/uploads/2017/09/JOANNA-KERRIGAN.jpg'),
      t('Wais Wardak','gb','UK','','Thanks to Dr. Kathuria for a wonderful dental work done for me.','https://www.delhidental.com/wp-content/uploads/2017/09/WAIS-WARDAK.jpg'),
      t('Muhit Zaman','gb','UK','Smile Makeover & Crowns','Got smile makeover done including Crowns. Looks very professional. Keep going.','https://www.delhidental.com/wp-content/uploads/2017/09/MUHIT-ZAMAN.jpg'),
      t('Paul Jackson','gb','UK','Metal-free Crowns & Bridges','Replacement of old crowns and bridges with metal-free crowns. Impressed by his ability to listen to my requirements.','https://www.delhidental.com/wp-content/uploads/2017/09/PAUL-JACKSON.jpg'),
      t('Sarah Lindley','gb','UK','Crowns & Whitening','Doctors and staff helpful and efficient. Got crowns and teeth whitening done very fast and comfortably.','https://www.delhidental.com/wp-content/uploads/2017/09/SARAH-LINDLEY.jpg'),
    ]
  },
  {
    file:'canada-testimonials.html', title:'Canada Patient Testimonials', heading:'Canada Testimonials',
    desc:'Real testimonials from Canadian patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from Canadian patients who trusted us with their smiles.', flag:'ca', cn:'Canada',
    testimonials:[
      t('Bill Yakimec','ca','Canada','Veneers, Crowns & Fillings','Travelling from St. Paul, Alberta, my experience with Dr. Sween Kathuria was exceptional. Results exceeded my expectations.','https://www.delhidental.com/wp-content/uploads/2025/12/6ca3a5aa-3787-4977-847a-ae3d153acc65.jpg'),
      t('Kristien Smekens','ca','Canada','Implant, RCT & Zirconia Crowns','Coming from Canada, my dental journey with Dr. Sween Kathuria was outstanding. Results were flawless.','https://www.delhidental.com/wp-content/uploads/2025/12/19a41e25-60ef-460f-9d6c-a185f0eaf47f-1.jpg'),
      t('Fern Burlow','ca','Canada','Zoom Whitening','Got Zoom whitening at Dr. Kathuria\'s Dental in Delhi. I am satisfied with the good work done.','https://www.delhidental.com/wp-content/uploads/2017/09/FERN-BURLOW.jpg'),
      t('Sabine Montagnon','ca','Canada','Smile Enhancement','Everything went smooth and quickly. Doctors work well around my short schedule. Thank you Dr. Sween Kathuria for my new smile.','https://www.delhidental.com/wp-content/uploads/2017/09/SABINE-MONTAGNON.jpg'),
      t('Mark Tiller','ca','Canada','','Great work done by Dr. Puneet & Sween Kathuria. Professionalism & caring attitude impressed me.','https://www.delhidental.com/wp-content/uploads/2017/09/MARK-TILLER.jpg'),
      t('Brenda Cranney','ca','Canada','','Painless & professional work by Dr. Kathuria. Competence & comprehensive dental planning impressed me.','https://www.delhidental.com/wp-content/uploads/2017/09/BRENDA-CRANNEY.jpg'),
      t('Giles E','ca','Canada','Gap Fillings & Crowns','Got gap fillings with crowns done. Impressed by friendliness of staff & treatment options offered.','https://www.delhidental.com/wp-content/uploads/2017/09/GILES.-E.jpg'),
      t('Susan Simpson','ca','Canada','','You guys are wonderful. I can\'t thank Puneet & Sween Kathuria enough for their wonderful care.','https://www.delhidental.com/wp-content/uploads/2017/09/SUSAN-SIMPSON.jpg'),
      t('Fahim Mohammed','ca','Canada','','Very professional work done by Dr. Kathuria.','https://www.delhidental.com/wp-content/uploads/2017/09/FAHIM-MOHAMMED.jpg'),
      t('Katia Chapman','ca','Canada','Implants & Crowns','Got dental implants & crowns done. Professionalism & courtesy impressed me the most.','https://www.delhidental.com/wp-content/uploads/2017/09/KATIA-CHAPMAN.jpg'),
      t('Akram, Shafiqa, Najiba','ca','Canada','Metal-free Crowns & Bridges','Everything was very good after getting the metal free crowns and bridges from Dr. Kathuria.','https://www.delhidental.com/wp-content/uploads/2017/09/AKRAMSHAFIQA-NAJIBA.jpg'),
      t('Tenny','ca','Canada','E-max Crowns','Got E-max crowns done. Comfort was the most important thing. Professional, friendly & excellent.','https://www.delhidental.com/wp-content/uploads/2017/09/TENNY.jpg'),
      t('Mamta Chhetry Thapa','ca','Canada','Smile Makeover','A great experience. Thank you Dr. Sween & Dr. Puneet for giving me the smile I always wanted.','https://www.delhidental.com/wp-content/uploads/2017/09/MAMTA-CHHETRY-THAPA.jpg'),
      t('Mary Savage','ca','Canada','Root Canal','I found the clinic from internet and got root canal done. Very impressed by total service.','https://www.delhidental.com/wp-content/uploads/2017/09/MARY-SAVAGE.jpg'),
      t('Gerry Syvokas','ca','Canada','Full Mouth Reconstruction','Full mouth reconstruction with metal free crowns. Professionalism was most impressive. My wife says my new smile is wonderful.','https://www.delhidental.com/wp-content/uploads/2017/09/GERRY-SYVOKAS.jpg'),
    ]
  },
  {
    file:'australia-testimonials.html', title:'Australia Patient Testimonials', heading:'Australia Testimonials',
    desc:'Real testimonials from Australian patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from Australian patients who trusted us with their smiles.', flag:'au', cn:'Australia',
    testimonials:[
      t('Ify and Tu Duley','au','Australia','','Thank you Dr Kathurias for the amazing work. Very happy with the results.','https://www.delhidental.com/wp-content/uploads/2018/12/IFY-AND-TU-DULEY-AUSTRALIA.jpg'),
      t('Bob Dunnett','au','Australia','Implants, Whitening, Crowns & Fillings','Got dental implants, teeth whitening, crowns and fillings done. Everything was good and pain free.','https://www.delhidental.com/wp-content/uploads/2018/08/BOB-DUNNETT-Australia.jpg'),
      t('Michelle Patrick','au','Australia','Crowns','The professionalism & perfectionism of Dr. Kathuria is unparalleled. Feel like a movie star.','https://www.delhidental.com/wp-content/uploads/2018/07/MICHELLE-PATRICK-AUSTRALIA.jpg'),
      t('David Swann','au','Australia','','Doctors and team with a passion for excellence. Best dental experience I have had.','https://www.delhidental.com/wp-content/uploads/2017/09/DAVID-SWANN.jpg'),
      t('Jennifer Buckley','au','Australia','Crowns & Zoom Whitening','Got two crowns and zoom whitening done. Teeth look much better. Very happy.','https://www.delhidental.com/wp-content/uploads/2017/09/JENNIFER-BUCKLEY.jpg'),
      t('Raymond Steiner','au','Australia','','Efficiency & cleanliness impresses me the most with Dr. Kathuria.','https://www.delhidental.com/wp-content/uploads/2017/09/RAYMOND-STEINER.jpg'),
      t('Greg Davis','au','Australia','','Best dental service and work I\'ve ever had. Overall 5 star rating.','https://www.delhidental.com/wp-content/uploads/2017/09/GREG-DAVIS.jpg'),
      t('Tony & Joanna','au','Australia','','Dr Kathuria came highly recommended. Excellent and well-paced dental work.','https://www.delhidental.com/wp-content/uploads/2017/09/TONY-JOANNA.jpg'),
      t('Stansilav','au','Australia','','Got my dental job done at Dr. Kathuria dental clinic. Went off well.','https://www.delhidental.com/wp-content/uploads/2017/09/STANSILAV.jpg'),
      t('Ashena','au','Australia','Smile Makeover','Thank you Dr. Sween Kathuria for the lovely smile makeover.','https://www.delhidental.com/wp-content/uploads/2017/09/ASHENA.jpg'),
      t('Michael Ryan','au','Australia','Crowns, RCT & Inlays','Professionalism, competency, hygiene superior to dental clinics in Australia & Ireland.','https://www.delhidental.com/wp-content/uploads/2017/09/MICHAEL-RYAN.jpg'),
      t('Fernando Suarez','au','Australia','','Very delighted with Dr. Puneet Kathuria\'s knowledge and friendly attitude.','https://www.delhidental.com/wp-content/uploads/2017/09/FERNANDO-SUAREZ.jpg'),
      t('Deirdre Ryan','au','Australia','','Treatment was very nice and comfortable. We were in good hands.','https://www.delhidental.com/wp-content/uploads/2017/09/DEIRDRE-RYAN.jpg'),
      t('Parminder Singh','au','Australia','','Thank you Dr. Kathuria for beautiful work giving me confident smile.','https://www.delhidental.com/wp-content/uploads/2017/09/PARMINDER-SINGH.jpg'),
      t('Lorraine Young','au','Australia','Dental Implant','What impressed me most was his mannerism. Excellent competence. 5 star.','https://www.delhidental.com/wp-content/uploads/2017/09/LORRAINE-YOUNG.jpg'),
      t('Dean Sweeny','au','Australia','','Good atmosphere & pain-free work impressed me most.','https://www.delhidental.com/wp-content/uploads/2017/09/DEAN-SWEENY.jpg'),
    ]
  },
  {
    file:'new-zealand-testimonials.html', title:'New Zealand Patient Testimonials', heading:'New Zealand Testimonials',
    desc:'Real testimonials from New Zealand patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from Kiwi patients who trusted us with their smiles.', flag:'nz', cn:'New Zealand',
    testimonials:[
      t('Rod Butchers','nz','New Zealand','Dental Implants','A genuine desire to get it right. Both in the procedure & outcome. Very happy with my dental implants job.','https://www.delhidental.com/wp-content/uploads/2017/09/ROD-BUTCHERS.jpg'),
      t('Jenny Norris','nz','New Zealand','','Excellent treatment done by Dr. Kathurias. Very well informed about the treatment. Very pleased to have good looking teeth.','https://www.delhidental.com/wp-content/uploads/2017/09/JENNY-NORRIS.jpg'),
      t('Shona','nz','New Zealand','Smile Restoration','Very much impressed with amazing qualifications of both doctors! Many thanks for my new smile and strong teeth.','https://www.delhidental.com/wp-content/uploads/2017/09/SHONA.jpg'),
      t('Mathew Gordon','nz','New Zealand','Smile Makeover','Got my new smile, liked it so much. Impressive technical structure, excellent doctors attitude.','https://www.delhidental.com/wp-content/uploads/2017/09/MATHEW-GORDON.jpg'),
      t('Mark Cumming','nz','New Zealand','Root Canal & Crown','Excellent treatment with professional dedication & thoroughness. Would not hesitate to recommend.','https://www.delhidental.com/wp-content/uploads/2017/09/MARK-CUMMING.jpg'),
      t('Robyn Coleman','nz','New Zealand','','Felt at ease all the time. Doctors competence & attitude is excellent. Liked my results most.','https://www.delhidental.com/wp-content/uploads/2017/09/ROBYN-COLEMAN.jpg'),
      t('Chuck Marriot','nz','New Zealand','Metal-free Crowns','What impressed me was the quality of service & the skill of Dr. Kathuria.','https://www.delhidental.com/wp-content/uploads/2017/09/CHUCK-MARRIOT.jpg'),
      t('Terry Dower','nz','New Zealand','','The ability of the doctors in delivery of work was nothing short of expectation.','https://www.delhidental.com/wp-content/uploads/2017/09/TERRY-DOWER.jpg'),
    ]
  },
  {
    file:'europe-testimonials.html', title:'Europe Patient Testimonials', heading:'Europe Testimonials',
    desc:'Real testimonials from European patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from European patients who trusted us with their smiles.', flag:'eu', cn:'Europe',
    testimonials:[
      t('Pierre Jenni','ch','Switzerland','Emergency Dental','Thank you Dr Kathuria and his team to safely finish my pending emergency dental work under testing times of Covid.','https://www.delhidental.com/wp-content/uploads/2020/05/Pierre-Jenni-Switzerland.jpg'),
      t('Berkeli Altggev','tm','Turkmenistan','Implants & Crowns','Got implants and crowns. 5 star Clinic. Everything excellent.','https://www.delhidental.com/wp-content/uploads/2018/10/Berkeli-Altggev-Turkministan.jpg'),
      t('Ros Plazma','il','Israel','','Wow! I never thought I\'d want to go back to the dentist after meeting the nicest clinic staff.','https://www.delhidental.com/wp-content/uploads/2018/08/Ros-Plazma-Israel.jpg'),
      t('Anton Chernjavsky','il','Israel','','Great, just great. High standards clinic and service provided is exceptional, total professionals.','https://www.delhidental.com/wp-content/uploads/2018/05/Anton-Chernjavsky-Israel.jpg'),
      t('Michael Hansen','be','Belgium','','I am thankful to Dr. Kathurias for the best dental treatment that I have received.','https://www.delhidental.com/wp-content/uploads/2017/09/MICHAEL-HANSEN.jpg'),
      t('Han Vendivianne','be','Belgium','','Professionalism is top. We are really happy with the treatment.','https://www.delhidental.com/wp-content/uploads/2017/09/HAN-VENDIVIANNE.jpg'),
      t('Sebastian','de','Germany','Smile Makeover & Veneers','Got my smile makeover done by Dr. Kathuria. A perfect dentist visit, very professional, veneers look great.','https://www.delhidental.com/wp-content/uploads/2017/09/SEBASTIAN.jpg'),
      t('Iris Mulder','nl','Netherlands','','Everything was very good. I am very happy with the services & the quick work. Overall 5 star rating.','https://www.delhidental.com/wp-content/uploads/2017/09/IRIS-MULDER-NETHERLANDS.jpg'),
      t('Fine Ranch','de','Germany','Teeth Whitening','Thanks to Dr. Kathuria for a whiter, brighter smile.','https://www.delhidental.com/wp-content/uploads/2017/09/FINE-RANCH.jpg'),
      t('Zoltan L','it','Italy','Crown Replacement','Got my crown replaced with extreme care and flexibility. Would rate the clinic excellent in everything.','https://www.delhidental.com/wp-content/uploads/2017/09/ZOLTAN-L.jpg'),
      t('Sophie Behan & Carol','fr','France','','Loved the results of our dental work. We were treated courteously & queries answered.','https://www.delhidental.com/wp-content/uploads/2017/09/SOPHIE-BEHAN-CAROL.jpg'),
    ]
  },
  {
    file:'asia-testimonials.html', title:'Asia Patient Testimonials', heading:'Asia Testimonials',
    desc:'Real testimonials from Asian patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from Asian patients who trusted us with their smiles.', flag:'in', cn:'Asia',
    testimonials:[
      t('Dr. Monira','af','Afghanistan','Implants & Bridges','Got dental implant & bridges done at Dr. Kathuria\'s Dentistry. Everything went off perfectly. 5 star rating clinic.','https://www.delhidental.com/wp-content/uploads/2018/07/Dr-Monira.jpg'),
      t('Andrey Zhuzhlin','ru','Russia','','Just continue with same pace and attitude, everything excellent.','https://www.delhidental.com/wp-content/uploads/2018/06/Andrey-Zhuzhlin-Russia.jpg'),
      t('Maki Park','jp','Japan','Restorative Dentistry','Had a good and satisfactory experience at Dr Kathurias. And of course I can chew well at the end.','https://www.delhidental.com/wp-content/uploads/2017/09/maki-park.jpg'),
      t('Satya Thapa','np','Nepal','','Thanks for the amazing work. Professionalism is top most priority. Really happy with final results.','https://www.delhidental.com/wp-content/uploads/2017/09/satya-nepal.jpg'),
      t('Anita Nayeck','mu','Mauritius','','Loved the atmosphere and warm welcome from everybody. I feel blessed and very grateful.','https://www.delhidental.com/wp-content/uploads/2017/09/ANITA-NAYECK-MAURITIUS.jpg'),
      t('Noor','iq','Iraq','','Being a dental student myself it was easy to find one of the best dental setups in country.','https://www.delhidental.com/wp-content/uploads/2017/09/NOOR-IRAQ.jpg'),
      t('Grace Lim','my','Malaysia','','Final result impressed me. Professionalism is top-notch. Treatment duration shorter than anticipated.','https://www.delhidental.com/wp-content/uploads/2017/09/GRACE-LIM-MALAYSIA.jpg'),
    ]
  },
  {
    file:'india-testimonials.html', title:'India Patient Testimonials', heading:'India Testimonials',
    desc:'Real testimonials from Indian patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from Indian patients who trusted us with their smiles.', flag:'in', cn:'India',
    testimonials:[
      t('Balajee Singh','in','India','','National Shooting Champion receiving dental work at Dr. Kathuria\'s Dentistry.','https://www.delhidental.com/wp-content/uploads/2019/07/Balajee-Singh.jpg'),
      t('Saguna Datt','in','India','Smile Restoration','I thank Dr. Kathuria for his expertise in restoring my smile, my confidence.','https://www.delhidental.com/wp-content/uploads/2017/09/SAGUNA-DATT.jpg'),
      t('Divyaleena','in','India','Tooth Restoration','Treatment completed in 6 days. Now I can smile like I always wished for.','https://www.delhidental.com/wp-content/uploads/2017/09/DIVYALEENA.jpg'),
      t('Neil Jean Bhatnagar','in','India','Smile Makeover','Thank you Dr. Sween Kathuria for the excellent smile makeover for me.','https://www.delhidental.com/wp-content/uploads/2017/09/NEIL-JEAN-BHATNAGAR.jpg'),
      t('Ashie Seehra','in','India','Smile Makeover','I got a smile makeover done by Dr Kathuria. Attention to each and every detail was given.','https://www.delhidental.com/wp-content/uploads/2017/09/ASHIE-SEEHRA.jpg'),
      t('Juhi Varshney','in','India','Smile Makeover','Thank you Dr. Kathuria for an excellent smile makeover. You are indeed the best cosmetic dentist.','https://www.delhidental.com/wp-content/uploads/2017/09/JUHI-VARSHNEY.jpg'),
      t('Swati','in','India','Smile Restoration','Thank you Dr. Sween Kathuria. Fantastic treatment. I have my smile back.','https://www.delhidental.com/wp-content/uploads/2017/09/Swati-India.jpg'),
      t('Kasturi','in','India','Cosmetic Dentistry','After bad dental experience in Mumbai, I flew to Delhi for Dr. Kathuria\'s expertise. Got my smile back.','https://www.delhidental.com/wp-content/uploads/2017/09/KASTIRIA.jpg'),
      t('Neeraj Sharma','in','India','','One of the best dentist in the country. Treated me with great efficiency.','https://www.delhidental.com/wp-content/uploads/2017/09/Neeraj-Sharma-IND.jpg'),
      t('Rajat Bedi','in','India','','Thanks Dr. Sween Kathuria for a good job done.','https://www.delhidental.com/wp-content/uploads/2017/09/Rajat-Bedi-IND.jpg'),
      t('Daman Preet Kaur','in','India','','The placard in my hand says it all.','https://www.delhidental.com/wp-content/uploads/2017/09/Daman-Preet-Kaur-Ind.jpg'),
      t('Amrita','in','India','Smile Makeover','Perfect smile as I expected. Best dentists in Delhi.','https://www.delhidental.com/wp-content/uploads/2017/09/Amrita-Ind.jpg'),
      t('Henk Thoma','in','India','','Excellent service. Very hygienic at par with anywhere in the world.','https://www.delhidental.com/wp-content/uploads/2017/09/HENK-THOMA.jpg'),
      t('Ranjabati','in','India','','Clean environment with pain-free experience. Great ambiance, value for money.','https://www.delhidental.com/wp-content/uploads/2017/09/RANJABATI.jpg'),
    ]
  },
  {
    file:'africa-testimonials.html', title:'Africa Patient Testimonials', heading:'Africa Testimonials',
    desc:'Real testimonials from African patients at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Real stories from African patients who trusted us with their smiles.', flag:'za', cn:'Africa',
    testimonials:[
      t('Felicity Dindiwe','zm','Zambia','','What impressed me was how my case was handled. I was informed at every stage before any action.','https://www.delhidental.com/wp-content/uploads/2018/07/Felicity-Dindiwe.jpeg'),
      t('Ghuffran Chaboo','za','South Africa','Crowns & Dentures','Highly impressed by time management and levels of efficiency and professionalism. Thank you for my crowns and dentures!','https://www.delhidental.com/wp-content/uploads/2017/09/guff-south-afr.jpg'),
      t('Marilene Nganga','ke','Kenya','Metal-free Crowns','The impossible became possible at Dr Kathuria\'s clinic. Beautiful metal free crowns!','https://www.delhidental.com/wp-content/uploads/2017/09/MARILENE-NGANGA-KENYA.jpg'),
      t('Prisca Wambua','ke','Kenya','Implant, Crown & Veneers','Got dental implant, crown & veneers done. Impressed by professionalism & being attended all the time.','https://www.delhidental.com/wp-content/uploads/2017/09/PRISCA-WAMBUA.jpg'),
      t('L. Houssam','ma','Morocco','','Best dental treatments ever had, professional service, very impressing doctor\'s attitude.','https://www.delhidental.com/wp-content/uploads/2017/09/Houssam-Morocco.jpg'),
      t('Liz Cooke','za','Africa','Smile Makeover','Doctors were friendly and explained everything in detail. Efficient and painless dental work.','https://www.delhidental.com/wp-content/uploads/2017/09/africa.jpg'),
      t('Juliet Walker','ng','Nigeria','Tooth Extraction','Got treatment done courteously, every query answered. Extraction was so impressive.','https://www.delhidental.com/wp-content/uploads/2017/09/juliet-walker.jpg'),
      t('Dauda Mohd','ke','Kenya','','Dr. Kathuria, you are doing a very nice job here.','https://www.delhidental.com/wp-content/uploads/2017/09/dauda-mohd.jpg'),
      t('Eloho Emezana','za','South Africa','Gap Closures & RCT','Overall professional attitude & efficiency impressed me the most.','https://www.delhidental.com/wp-content/uploads/2017/09/eloho1.jpg'),
      t('Dominic','ke','Kenya','Cosmetic Dentistry','One of the best dental clinic I have ever attended. Very happy with professionalism and team work.','https://www.delhidental.com/wp-content/uploads/2017/09/dominic.jpg'),
      t('Cherry Holly','za','South Africa','','Painless treatment was what I liked the most in such extensive work.','https://www.delhidental.com/wp-content/uploads/2017/09/cherre.jpg'),
      t('Jacqueline Njovo','ke','Kenya','Implant & Bone Grafting','Professionalism by doctors and staff impressed me most. Hygiene, interior, music were excellent.','https://www.delhidental.com/wp-content/uploads/2017/09/new-client-1.jpg'),
    ]
  },
  {
    file:'embassy-testimonials.html', title:'Embassy & High Commission Testimonials', heading:'Embassy Testimonials',
    desc:'Testimonials from embassy and high commission staff at Dr. Kathuria\'s Dentistry Delhi.',
    sub:'Trusted by diplomats and embassy staff from around the world.', flag:'in', cn:'Embassy',
    testimonials:[
      t('Donald Barr','ca','High Commission of Canada','Root Canal & Crown','Got RCT and Crown done by Dr Kathuria. Everything was good and professional.','https://www.delhidental.com/wp-content/uploads/2018/07/Donald-Barr.jpg'),
      t('Ken Sophearith','kh','Royal Embassy of Cambodia','','Painless, high standard, great hospitality especially a warm welcome from the staff and best results.','https://www.delhidental.com/wp-content/uploads/2018/06/Ken-Sophearith.jpeg'),
      t('Ms. Marina Achi-Fazakh','ca','High Commission of Canada','','Excellent job and attitude of the doctors. The best clinic I saw in New Delhi. Everything was perfect 5 star ratings.','https://www.delhidental.com/wp-content/uploads/2018/06/Marina-Achi-Fazakh-High-Commission-of-Canada.jpeg'),
      t('Vera Fritsch','at','Embassy of Austria','','Great treatment — Great team.','https://www.delhidental.com/wp-content/uploads/2018/06/Vera-Fritsch-Embassy-of-Austria.jpeg'),
    ]
  },
];

pages.forEach(p => gen(p));
console.log('\nGenerated ' + pages.length + ' pages with images');
