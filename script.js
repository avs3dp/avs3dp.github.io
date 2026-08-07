(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  document.querySelectorAll('[data-gallery]').forEach(item => {
    item.addEventListener('click', () => {
      const image = item.querySelector('img');
      if (!image || !lightboxImage || !(lightbox instanceof HTMLDialogElement)) return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.showModal();
    });
  });
  document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox?.close());
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

  const form = document.querySelector('[data-quote-form]');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      'Hello AVS3DP, I would like to request a quote.',
      '',
      `Name: ${data.get('name') || '-'}`,
      `Phone: ${data.get('phone') || '-'}`,
      `Email: ${data.get('email') || '-'}`,
      `Service: ${data.get('service') || '-'}`,
      `Project: ${data.get('message') || '-'}`,
    ].join('\n');
    window.open(`https://wa.me/5977197175?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
})();
