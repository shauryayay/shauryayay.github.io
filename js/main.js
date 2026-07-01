(() => {
  'use strict';

  // --- Page Router ---
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-link]');
  let currentPage = 'home';
  let transitioning = false;

  const navigateTo = (target) => {
    if (target === currentPage || transitioning) return;
    transitioning = true;

    const current = document.querySelector(`.page[data-page="${currentPage}"]`);
    const next = document.querySelector(`.page[data-page="${target}"]`);
    if (!current || !next) { transitioning = false; return; }

    current.classList.add('page--exit');

    setTimeout(() => {
      current.classList.remove('page--active', 'page--exit');
      current.style.display = 'none';

      next.style.display = 'block';
      next.offsetHeight; // force reflow
      next.classList.add('page--active');

      currentPage = target;
      updateNavLinks();
      observeReveals();
      window.scrollTo(0, 0);
      transitioning = false;
    }, 350);
  };

  const updateNavLinks = () => {
    document.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentPage}`) {
        link.classList.add('nav__link--active');
      } else {
        link.classList.remove('nav__link--active');
      }
    });
  };

  // Handle nav clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').replace('#', '');
      window.location.hash = target;
    });
  });

  // Handle hash changes (back/forward)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash);
    closeMobileMenu();
  });

  // Initial page from hash
  const initHash = window.location.hash.replace('#', '') || 'home';
  if (initHash !== 'home') {
    const homePage = document.querySelector('.page[data-page="home"]');
    const targetPage = document.querySelector(`.page[data-page="${initHash}"]`);
    if (targetPage) {
      homePage.classList.remove('page--active');
      homePage.style.display = 'none';
      targetPage.style.display = 'block';
      targetPage.classList.add('page--active');
      currentPage = initHash;
      updateNavLinks();
    }
  }

  // --- Mobile Menu ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  const closeMobileMenu = () => {
    navToggle.classList.remove('nav__toggle--active');
    mobileMenu.classList.remove('mobile-menu--open');
  };

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('nav__toggle--active');
    mobileMenu.classList.toggle('mobile-menu--open');
  });

  // --- Scroll Reveal ---
  let revealObserver;

  const observeReveals = () => {
    if (revealObserver) revealObserver.disconnect();

    const activePageEl = document.querySelector('.page--active');
    if (!activePageEl) return;

    const elements = activePageEl.querySelectorAll('.reveal:not(.reveal--visible)');

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    elements.forEach(el => revealObserver.observe(el));
  };

  observeReveals();

  // --- Project Modal ---
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalDetails = document.getElementById('modalDetails');
  const modalTags = document.getElementById('modalTags');
  const modalLink = document.getElementById('modalLink');

  const openModal = (card) => {
    modalTitle.textContent = card.querySelector('.project-card__title').textContent;
    modalDesc.textContent = card.querySelector('.project-card__desc').textContent.trim();

    modalDetails.innerHTML = '';
    card.querySelectorAll('.project-card__expanded li').forEach(li => {
      const newLi = document.createElement('li');
      newLi.textContent = li.textContent;
      modalDetails.appendChild(newLi);
    });

    modalTags.innerHTML = '';
    card.querySelectorAll('.project-card__tags .tag').forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag.textContent;
      modalTags.appendChild(span);
    });

    modalLink.href = card.querySelector('.project-card__github').href;
    modal.classList.add('modal-overlay--open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('modal-overlay--open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-card[data-expandable]').forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
