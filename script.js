(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = $('.menu-toggle');
  const nav = $('#primary-nav');
  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const opening = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', opening);
      document.body.classList.toggle('menu-open', opening);
    });
    $$('.nav-link', nav).forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  const progressBar = $('.scroll-progress span');
  let scrollQueued = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    scrollQueued = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      window.requestAnimationFrame(updateScroll);
      scrollQueued = true;
    }
  }, { passive: true });
  updateScroll();

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const navLinks = $$('.nav-link');
  const trackedSections = ['top', 'work', 'about', 'services', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id || 'top';
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === '#' + id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    trackedSections.forEach(section => sectionObserver.observe(section));
  }

  const mascot = $('#mascot');
  const stage = $('.hero-stage');
  if (mascot && stage && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    stage.addEventListener('pointermove', event => {
      const rect = stage.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      mascot.style.animationPlayState = 'paused';
      mascot.style.transform = 'translate(calc(-50% + ' + (px * 12) + 'px), calc(-51% + ' + (py * 9) + 'px)) rotate(' + (px * 4) + 'deg)';
    });
    stage.addEventListener('pointerleave', () => {
      mascot.style.animationPlayState = 'running';
      mascot.style.transform = '';
    });
  }

  $$('.project-card').forEach(card => {
    const title = card.querySelector('h3');
    card.setAttribute('aria-label', (title ? title.textContent : 'Portfolio project') + ' — concept study. Replace this concept with a real project when ready.');
  });
})();