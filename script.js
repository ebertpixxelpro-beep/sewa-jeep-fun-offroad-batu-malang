/* =====================================================
   script.js – Sewa Jeep Fun Offroad Batu Malang
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── AOS (Animate On Scroll) ────────────────────── */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  /* ── Navbar: add 'scrolled' class on scroll ───────── */
  const navbar = document.getElementById('mainNavbar');
  function handleNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbar, { passive: true });
  handleNavbar();

  /* ── Active nav-link highlight on scroll ──────────── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'active-link',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach(sec => observer.observe(sec));

  /* ── FAB: Back to Top ─────────────────────────────── */
  const fabTop = document.getElementById('fab-top');
  function handleFabTop() {
    if (window.scrollY > 400) {
      fabTop.classList.add('visible');
    } else {
      fabTop.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', handleFabTop, { passive: true });
  fabTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Particle Generator (Hero) ────────────────────── */
  const container = document.getElementById('particles');
  if (container) {
    const COUNT = 18;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 10 + 4;
      const left = Math.random() * 100;
      const duration = Math.random() * 14 + 10;
      const delay = Math.random() * 12;
      p.style.cssText = `
        width:${size}px;
        height:${size}px;
        left:${left}%;
        bottom:-20px;
        animation-duration:${duration}s;
        animation-delay:${delay}s;
      `;
      container.appendChild(p);
    }
  }

  /* ── Smooth Scroll for Anchor Links ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile navbar if open
        const navCollapse = document.getElementById('navMenu');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  /* ── Galeri: Lightbox-style expand ───────────────── */
  document.querySelectorAll('.galeri-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.92);
        z-index:9999;display:flex;align-items:center;justify-content:center;
        cursor:zoom-out;animation:fadeInLightbox 0.3s ease;
      `;
      const bigImg = document.createElement('img');
      bigImg.src = img.src.replace('w=400','w=1200').replace('w=700','w=1200');
      bigImg.alt = img.alt;
      bigImg.style.cssText = `
        max-width:90vw;max-height:88vh;
        border-radius:16px;object-fit:contain;
        box-shadow:0 24px 80px rgba(0,0,0,0.8);
      `;
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        position:absolute;top:20px;right:28px;
        background:none;border:none;color:#fff;
        font-size:2.5rem;cursor:pointer;line-height:1;
      `;
      overlay.appendChild(bigImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      const close = () => {
        overlay.remove();
        document.body.style.overflow = '';
      };
      overlay.addEventListener('click', close);
      closeBtn.addEventListener('click', close);
    });
  });

  /* ── Number Counter Animation ─────────────────────── */
  function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const startVal = 0;
    const isPlus = el.textContent.includes('+');
    const isStar = el.textContent.includes('⭐');
    const suffix = isPlus ? '+' : isStar ? '⭐' : '';
    const displayTarget = isStar ? 4.9 : target;
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isStar
        ? (eased * displayTarget).toFixed(1)
        : Math.floor(eased * displayTarget);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.stat-num');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        animateCounter(el, num);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statsObserver.observe(el));

  /* ── Add lightbox CSS keyframes ───────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInLightbox {
      from { opacity: 0; } to { opacity: 1; }
    }
    .active-link {
      color: #ff8534 !important;
    }
    .active-link::after {
      width: 60% !important;
    }
  `;
  document.head.appendChild(style);

});
