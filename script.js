'use strict';
document.documentElement.classList.add('js');
const menuButton = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
if (menuButton && menu) {
  const mobile = window.matchMedia('(max-width: 767px)');
  const setOpen = (open) => {
    menu.hidden = mobile.matches && !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Fechar ×' : 'Menu ☰';
  };
  setOpen(false);
  menuButton.addEventListener('click', () => setOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setOpen(false); menuButton.focus();
    }
  });
  mobile.addEventListener('change', () => setOpen(false));
}

// Animação de entrada ao rolar a página
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll(
    '.plant-card, main div.mb-10, main section > .wrap > article, #metodo article, #nomes .box, #nomes > p, main figure.box, main article.box, main aside.box, main div.mt-8'
  );
  const seen = new Set();
  const groups = new Map();
  targets.forEach(el => {
    if (seen.has(el)) return;
    seen.add(el);
    el.setAttribute('data-reveal', '');
    const siblings = groups.get(el.parentElement) || [];
    el.style.setProperty('--d', Math.min(siblings.length, 5) * 90 + 'ms');
    siblings.push(el);
    groups.set(el.parentElement, siblings);
  });
  if (reduce || !('IntersectionObserver' in window)) {
    seen.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  seen.forEach(el => io.observe(el));
})();
