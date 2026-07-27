const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const closeLightbox = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function hideLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

closeLightbox.addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) hideLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideLightbox();
});

document.getElementById('quoteForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  const text = [
    'Hallo AVS3DP, ik wil graag een offerte aanvragen.',
    '',
    `Naam: ${name}`,
    `Telefoon: ${phone || 'Niet ingevuld'}`,
    `Aanvraag: ${message}`
  ].join('\n');

  const url = `https://wa.me/5977197175?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
