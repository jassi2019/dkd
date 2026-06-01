/* ═══════════════════════════════════════
   DR. KATHURIA'S DENTISTRY — SHARED JS
═══════════════════════════════════════ */

/* ── PAGE LOADER ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 500);
});

/* ── CURSOR GLOW ── */
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

/* ── STICKY NAV (enhanced shadow on scroll) ── */
const siteNav = document.querySelector('.site-nav');
if (siteNav) {
  window.addEventListener('scroll', () => {
    siteNav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── HAMBURGER / MOBILE NAV ── */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.className = mobileNav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.querySelector('i').className = 'fas fa-bars';
  }));
}

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── ANIMATED COUNTERS ── */
function animCount(el) {
  if (el.dataset.done) return;
  el.dataset.done = true;
  const dec    = el.dataset.decimal;
  const target = dec ? parseFloat(dec) : parseInt(el.dataset.target || 0);
  const suffix = el.dataset.suffix || '';
  const dur    = 2200;
  const start  = performance.now();
  const tick   = (now) => {
    const p    = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    const val  = dec ? (target * ease).toFixed(1) : Math.floor(target * ease);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = (dec || target) + suffix;
  };
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) animCount(e.target); });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

/* ── BANNER SLIDER ── */
(function() {
  const slides = document.querySelectorAll('.hs-slide');
  const dots   = document.querySelectorAll('.hs-dot');
  const prev   = document.getElementById('hsPrev');
  const next   = document.getElementById('hsNext');
  if (!slides.length) return;
  let cur = 0, timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    dots[cur]?.classList.remove('on');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur]?.classList.add('on');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(cur + 1), 6000);
  }

  if (prev) prev.onclick = () => goTo(cur - 1);
  if (next) next.onclick = () => goTo(cur + 1);
  dots.forEach((d, i) => d.onclick = () => goTo(i));
  resetTimer();
})();

/* ── TESTIMONIAL SLIDER ── */
(function() {
  const track = document.getElementById('testiTrack');
  const pips  = document.querySelectorAll('.testi-pip');
  const prev  = document.getElementById('testiPrev');
  const next  = document.getElementById('testiNext');
  if (!track) return;
  const cards = track.children;
  let cur = 0;

  function goTo(n) {
    cur = (n + cards.length) % cards.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    pips.forEach((p, i) => p.classList.toggle('on', i === cur));
  }

  if (prev) prev.onclick = () => goTo(cur - 1);
  if (next) next.onclick = () => goTo(cur + 1);
  pips.forEach((p, i) => p.onclick = () => goTo(i));
  setInterval(() => goTo(cur + 1), 7000);
})();

/* ── BEFORE/AFTER DRAG SLIDER ── */
document.querySelectorAll('.ba-wrap').forEach(wrap => {
  const divider = wrap.querySelector('.ba-divider');
  const panel   = wrap.querySelector('.ba-before-panel');
  if (!divider || !panel) return;
  let dragging = false;

  function setPos(clientX) {
    const rect = wrap.getBoundingClientRect();
    let pct    = (clientX - rect.left) / rect.width;
    pct = Math.max(0.05, Math.min(0.95, pct));
    panel.style.width   = (pct * 100) + '%';
    divider.style.left  = (pct * 100) + '%';
  }

  divider.addEventListener('mousedown',  e => { dragging = true; e.preventDefault(); });
  divider.addEventListener('touchstart', () => { dragging = true; }, { passive: true });
  document.addEventListener('mouseup',   () => dragging = false);
  document.addEventListener('touchend',  () => dragging = false);
  document.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
  document.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
});

/* ── COST CALCULATOR ── */
(function() {
  const panel = document.getElementById('calcPanel');
  if (!panel) return;
  const items    = panel.querySelectorAll('input[type=checkbox]');
  const totalEl  = document.getElementById('calcTotal');
  const savingsEl= document.getElementById('calcSavings');

  function update() {
    let total = 0, saved = 0;
    items.forEach(cb => {
      if (cb.checked) {
        total += parseInt(cb.dataset.price   || 0);
        saved += parseInt(cb.dataset.savings || 0);
      }
    });
    if (totalEl)   totalEl.textContent   = total > 0 ? '₹' + total.toLocaleString('en-IN') : '₹ 0';
    if (savingsEl) savingsEl.textContent = saved > 0 ? `You save ₹${saved.toLocaleString('en-IN')} vs international pricing` : '';
  }

  items.forEach(cb => cb.addEventListener('change', update));
  update();
})();

/* ── FLOATING APPOINTMENT PANEL ── */
(function() {
  const floatBtn = document.getElementById('floatBookBtn');
  const panel    = document.getElementById('floatPanel');
  const closeBtn = document.getElementById('fpClose');
  if (!floatBtn || !panel) return;
  floatBtn.onclick = () => panel.classList.toggle('open');
  if (closeBtn) closeBtn.onclick = () => panel.classList.remove('open');
})();

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item    = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── LIGHTBOX ── */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbClose  = document.getElementById('lbClose');

function openLB(src) {
  if (!lightbox || !lbImg) return;
  lbImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  if (lightbox) lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (lbClose) lbClose.onclick = closeLB;
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });

document.querySelectorAll('[data-lightbox]').forEach(el => {
  el.style.cursor = 'zoom-in';
  el.addEventListener('click', () => openLB(el.dataset.lightbox));
});

/* ── FORM SUBMIT (Netlify Forms via AJAX) ── */
document.querySelectorAll('.smart-form').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) params.append(key, value);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      if (response.ok) {
        showToast('✅ Request received! We will call / WhatsApp you within 2 hours.');
        form.reset();
        const panel = document.getElementById('floatPanel');
        if (panel) panel.classList.remove('open');
      } else {
        showToast('❌ Could not send. Please WhatsApp us at +91 98109 36360.', 'error');
      }
    } catch (err) {
      showToast('❌ Network error. Please WhatsApp us at +91 98109 36360.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
});

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.borderLeftColor = type === 'error' ? '#EF4444' : 'var(--teal)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4500);
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── FILTER TABS (Cases / Services) ── */
document.querySelectorAll('.filter-bar').forEach(bar => {
  bar.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const gridSel = bar.dataset.target;
      const grid = gridSel ? document.querySelector(gridSel) : bar.nextElementSibling;
      if (!grid) return;
      grid.querySelectorAll('[data-category]').forEach(item => {
        const show = filter === 'all' || item.dataset.category.includes(filter);
        item.style.display = show ? '' : 'none';
      });
    });
  });
});

/* ── FAB SCROLL TO TOP ── */
const fabUp = document.getElementById('fabUp');
if (fabUp) {
  window.addEventListener('scroll', () => {
    fabUp.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  fabUp.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── ACTIVE NAV LINK ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href') || '';
  if (href.split('#')[0] === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

/* ── SMILE CONFIDENCE SCORE QUIZ ── */
(function() {
  const questions = document.querySelectorAll('.scs-q');
  const progressFill = document.getElementById('scsProgressFill');
  const stepLabel = document.getElementById('scsStepLabel');
  const questionsWrap = document.getElementById('scsQuestions');
  const resultPanel = document.getElementById('scsResult');
  const ringFill = document.getElementById('scsRingFill');
  const scoreNum = document.getElementById('scsScoreNum');
  const resultBadge = document.getElementById('scsResultBadge');
  const resultTitle = document.getElementById('scsResultTitle');
  const resultDesc = document.getElementById('scsResultDesc');
  const treatmentsEl = document.getElementById('scsTreatments');
  const retakeBtn = document.getElementById('scsRetake');
  if (!questions.length) return;

  const scores = {};
  const totalQ = questions.length;
  const circumference = 2 * Math.PI * 52;

  const results = [
    {
      min: 85,
      badge: 'Excellent Smile', badgeClass: 'badge-excellent',
      title: 'Your Smile is in Great Shape!',
      desc: 'You have a healthy, confident smile. A routine check-up and professional cleaning every 6 months will keep it that way. Optional cosmetic enhancements can make it even brighter.',
      treatments: ['Professional Cleaning', 'Zoom Whitening', 'Routine Check-up']
    },
    {
      min: 65,
      badge: 'Good Smile', badgeClass: 'badge-good',
      title: 'Your Smile Needs a Little Polish',
      desc: 'You\'re in good shape but there\'s room for improvement. A consultation with our specialists will reveal quick wins — whitening, minor corrections, or a clean-up can make a big visible difference.',
      treatments: ['Zoom Whitening', 'Clear Aligners', 'Dental Cleaning', 'Composite Bonding']
    },
    {
      min: 45,
      badge: 'Needs Attention', badgeClass: 'badge-fair',
      title: 'Your Smile Deserves an Upgrade',
      desc: 'Several areas of your smile need professional attention. The good news: our experts can transform your smile in as little as 3–5 days with treatments tailored to your needs.',
      treatments: ['Smile Makeover', 'Porcelain Veneers', 'Teeth Whitening', 'Clear Aligners', 'Gum Treatment']
    },
    {
      min: 0,
      badge: 'Urgent Care Needed', badgeClass: 'badge-needs',
      title: 'Your Smile Needs Immediate Care',
      desc: 'Your answers suggest you need urgent dental attention. Please don\'t delay — early treatment saves teeth, reduces costs, and restores your confidence. Book a free consultation today.',
      treatments: ['Full Mouth Rehabilitation', 'Dental Implants', 'Root Canal', 'Smile Makeover', 'Laser Gum Treatment']
    }
  ];

  function showQuestion(n) {
    questions.forEach(q => q.classList.remove('active'));
    const current = document.querySelector('.scs-q[data-q="' + n + '"]');
    if (current) current.classList.add('active');
    const pct = (n / totalQ) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
    if (stepLabel) stepLabel.textContent = 'Question ' + n + ' of ' + totalQ;
  }

  function showResult() {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = totalQ * 4;
    const pct = Math.round((total / maxScore) * 100);
    const res = results.find(r => pct >= r.min);

    if (questionsWrap) questionsWrap.style.display = 'none';
    if (progressFill) progressFill.style.width = '100%';
    if (stepLabel) stepLabel.textContent = 'Your Results';

    if (resultPanel) resultPanel.classList.add('show');
    if (scoreNum) scoreNum.textContent = pct;

    const dash = (pct / 100) * circumference;
    if (ringFill) {
      const color = pct >= 85 ? '#34d399' : pct >= 65 ? 'var(--teal)' : pct >= 45 ? '#fbbf24' : '#f87171';
      ringFill.style.stroke = color;
      setTimeout(() => { ringFill.style.strokeDasharray = dash + ' ' + circumference; }, 100);
    }

    if (resultBadge) { resultBadge.textContent = res.badge; resultBadge.className = 'scs-result-badge ' + res.badgeClass; }
    if (resultTitle) resultTitle.textContent = res.title;
    if (resultDesc) resultDesc.textContent = res.desc;
    if (treatmentsEl) {
      treatmentsEl.innerHTML = res.treatments.map(t => '<span class="scs-treat-tag">' + t + '</span>').join('');
    }
  }

  document.querySelectorAll('.scs-opt').forEach(btn => {
    btn.addEventListener('click', function() {
      const qNum = parseInt(this.dataset.q);
      const score = parseInt(this.dataset.score);
      scores[qNum] = score;

      const nextQ = qNum + 1;
      if (nextQ <= totalQ) {
        showQuestion(nextQ);
      } else {
        showResult();
      }
    });
  });

  if (retakeBtn) {
    retakeBtn.addEventListener('click', function() {
      Object.keys(scores).forEach(k => delete scores[k]);
      if (resultPanel) resultPanel.classList.remove('show');
      if (questionsWrap) questionsWrap.style.display = '';
      if (ringFill) ringFill.style.strokeDasharray = '0 ' + circumference;
      showQuestion(1);
    });
  }

  showQuestion(1);
})();
