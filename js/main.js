/* PTP Construction & Interior Works: site behaviour */
(function () {
  'use strict';

  var WHATSAPP = '923224727346';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var nav = document.getElementById('nav');
  var ftEl = document.getElementById('ft');
  var intro = document.getElementById('ptp-intro');
  var words = intro ? Array.prototype.slice.call(intro.querySelectorAll('.word')) : [];
  var roll = document.getElementById('roll');
  var house = document.getElementById('house');
  var stepTitle = document.getElementById('stepTitle');
  var steps = [0, 1, 2, 3].map(function (i) { return document.getElementById('ptp-step-' + i); });
  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-rv]'));
  var procHead = document.getElementById('rv-procHead');
  var STEP_TITLES = ['Survey', 'Draw & quote', 'Build', 'Hand over'];

  var lastY = window.scrollY || 0;
  var lastP = -1;
  var lastStep = -1;
  var menuOpen = false;
  var ticking = false;

  /* ---------- scroll-driven state ---------- */
  function measure() {
    var y = window.scrollY || 0;
    var vh = window.innerHeight || 800;

    // nav hides on scroll down, returns on scroll up
    if (nav) {
      nav.classList.toggle('nav-hide', y > lastY && y > 240 && !menuOpen);
      nav.classList.toggle('nav-sh', y > 40);
    }
    lastY = y;

    // "You've scrolled X ft"
    if (ftEl) ftEl.textContent = (y / 1152).toFixed(1);

    // intro paragraph fills in word by word
    if (intro && words.length) {
      var r = intro.getBoundingClientRect();
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      p = Math.round(Math.max(0, Math.min(1, p)) * 40) / 40;
      if (p !== lastP) {
        lastP = p;
        var n = words.length;
        for (var i = 0; i < n; i++) {
          var v = p * (n + 6) - i;
          var lvl = v >= 6 ? 4 : v >= 4 ? 3 : v >= 2 ? 2 : v >= 0.5 ? 1 : 0;
          words[i].className = 'word w' + lvl;
        }
      }
    }

    // process: active step, rolling counter, house drawing
    var step = 0;
    steps.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < vh * 0.55) step = i; });
    if (step !== lastStep) {
      lastStep = step;
      if (roll) roll.className = 'roll st-' + step;
      if (stepTitle) stepTitle.textContent = STEP_TITLES[step];
      steps.forEach(function (s, i) { if (s) s.classList.toggle('step-off', i !== step); });
    }
    if (house) {
      var seen = procHead && procHead.classList.contains('in');
      house.setAttribute('class', 'house s-' + step + (seen ? ' in' : ''));
    }

    // one-time reveals
    for (var k = reveals.length - 1; k >= 0; k--) {
      var el = reveals[k];
      if (el.getBoundingClientRect().top < vh * 0.88) {
        el.classList.add('in');
        reveals.splice(k, 1);
      }
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { ticking = false; measure(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  measure();
  setTimeout(measure, 400);

  /* ---------- trades marquee speeds up with scroll ---------- */
  var trades = document.getElementById('ptp-trades');
  if (trades && trades.getAnimations && !reduceMotion) {
    var prevY = window.scrollY || 0, vel = 0, rate = 1;
    (function loop() {
      var y = window.scrollY || 0;
      vel += ((y - prevY) - vel) * 0.1;
      prevY = y;
      var target = 1 + Math.min(Math.abs(vel) * 0.12, 4);
      if (Math.abs(target - rate) > 0.03) {
        rate = target;
        trades.getAnimations().forEach(function (a) {
          if (a.updatePlaybackRate) a.updatePlaybackRate(rate); else a.playbackRate = rate;
        });
      }
      window.requestAnimationFrame(loop);
    })();
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  function setMenu(open) {
    menuOpen = open;
    if (menu) menu.hidden = !open;
    if (menuBtn) {
      menuBtn.textContent = open ? 'Close' : 'Menu';
      menuBtn.setAttribute('aria-expanded', String(open));
    }
    if (open && nav) nav.classList.remove('nav-hide');
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(!menuOpen); });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('[data-close-menu]')) setMenu(false); });

  /* ---------- gallery lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');
  var lastFocus = null;
  function openLb(fig) {
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    if (!img || !lb) return;
    lastFocus = fig;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || 'Project photo';
    lbCap.textContent = cap ? cap.textContent.replace(/\s+/g, ' ').trim() : '';
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }
  function closeLb() {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-lb]'), function (fig) {
    fig.addEventListener('click', function () { openLb(fig); });
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(fig); }
    });
  });
  if (lb) lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* ---------- copy buttons ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      try { if (navigator.clipboard) navigator.clipboard.writeText(text).catch(function () {}); } catch (e) {}
      btn.textContent = 'Copied';
      clearTimeout(btn._t);
      btn._t = setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
    });
  });

  /* ---------- Lahore clock ---------- */
  var clock = document.getElementById('clock');
  function tick() {
    if (!clock) return;
    try {
      clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date());
    } catch (e) {}
  }
  tick();
  setInterval(tick, 20000);

  /* ---------- quote form opens WhatsApp ---------- */
  var form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = String(data.get('name') || '').trim();
      var phone = String(data.get('phone') || '').trim();
      var type = String(data.get('type') || '').trim();
      if (!name || !phone) {
        (name ? form.elements.phone : form.elements.name).focus();
        return;
      }
      var msg = 'Hello PTP, I would like to request a site visit.\n\nName: ' + name + '\nPhone: ' + phone + '\nType of work: ' + type;
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();
