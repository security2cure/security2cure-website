const THEME_STORAGE_KEY = 'security2cure-theme';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCountdown();
  initMobileNav();
  initFrameworkInfographic();
  initScheduleFilters();
  initScheduleSpeakers();
  initSponsorModals();
});

function getStoredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  const toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  const isLight = theme === 'light';
  toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
}

function initThemeToggle() {
  const toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  applyTheme(document.documentElement.getAttribute('data-theme') || getStoredTheme());

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(event.matches ? 'light' : 'dark');
    }
  });
}

function initCountdown() {
  const countdown = document.getElementById('countdown');
  if (!countdown) return;

  const targetDate = countdown.dataset.date;
  if (!targetDate) return;

  const target = new Date(targetDate + 'T09:00:00').getTime();
  const units = {
    days: countdown.querySelector('[data-unit="days"]'),
    hours: countdown.querySelector('[data-unit="hours"]'),
    minutes: countdown.querySelector('[data-unit="minutes"]'),
    seconds: countdown.querySelector('[data-unit="seconds"]')
  };

  function update() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      countdown.classList.add('countdown--ended');
      Object.values(units).forEach(el => { if (el) el.textContent = '00'; });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (units.days) units.days.textContent = String(days).padStart(2, '0');
    if (units.hours) units.hours.textContent = String(hours).padStart(2, '0');
    if (units.minutes) units.minutes.textContent = String(minutes).padStart(2, '0');
    if (units.seconds) units.seconds.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initFrameworkInfographic() {
  const section = document.querySelector('.pdpr-framework');
  if (!section) return;

  const quadrants = section.querySelectorAll('.pdpr-quadrant');
  const grid = section.querySelector('.pdpr-framework__grid');
  const modals = section.querySelectorAll('.pdpr-modal');
  let activeModal = null;
  let lastFocusedElement = null;

  modals.forEach((modal) => {
    document.body.appendChild(modal);
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('pdpr-framework--visible');
        observer.disconnect();
      }
    },
    { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
  );
  observer.observe(section);

  if (section.getBoundingClientRect().top < window.innerHeight * 0.95) {
    section.classList.add('pdpr-framework--visible');
    observer.disconnect();
  }

  function setActive(activeQuadrant) {
    quadrants.forEach((q) => {
      const isActive = q === activeQuadrant;
      q.classList.toggle('is-active', isActive);
      q.classList.toggle('is-dimmed', activeQuadrant !== null && !isActive);
    });
  }

  quadrants.forEach((quadrant) => {
    quadrant.addEventListener('mouseenter', () => {
      if (!activeModal) setActive(quadrant);
    });
  });

  if (grid) {
    grid.addEventListener('mouseleave', () => {
      if (!activeModal) setActive(null);
    });
  }

  function openModal(id) {
    const modal = document.getElementById(`pdpr-modal-${id}`);
    if (!modal) return;

    if (activeModal && activeModal !== modal) {
      closeModal(false);
    }
    if (activeModal === modal) return;

    lastFocusedElement = document.activeElement;
    activeModal = modal;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.classList.add('pdpr-modal-open');
    setActive(section.querySelector(`[data-quadrant="${id}"]`));

    const closeBtn = modal.querySelector('.pdpr-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(restoreFocus = true) {
    if (!activeModal) return;

    const modal = activeModal;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    setActive(null);
    activeModal = null;
    document.body.classList.remove('pdpr-modal-open');

    if (restoreFocus && lastFocusedElement) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
  }

  section.addEventListener('click', (e) => {
    const button = e.target.closest('[data-pdpr-modal]');
    if (!button) return;

    e.preventDefault();
    e.stopPropagation();
    openModal(button.getAttribute('data-pdpr-modal'));
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-pdpr-modal-close]')) {
        e.preventDefault();
        closeModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal();
    }
  });
}

function initScheduleFilters() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-schedule-filter]');
    if (!button) return;

    const filtersContainer = button.closest('.schedule__filters');
    if (!filtersContainer) return;

    const track = filtersContainer.closest('.schedule__track');
    if (!track) return;

    const filter = button.getAttribute('data-schedule-filter');

    filtersContainer.querySelectorAll('[data-schedule-filter]').forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    track.querySelectorAll('.schedule__item').forEach((item) => {
      const tag = item.getAttribute('data-tag');
      const show = filter === 'all' || tag === filter;
      item.classList.toggle('schedule__item--is-hidden', !show);
    });
  });
}

function initScheduleSpeakers() {
  const schedule = document.querySelector('.schedule');
  if (!schedule) return;

  const modals = document.querySelectorAll('.speaker-modal');
  if (!modals.length) return;

  let activeModal = null;
  let lastFocusedElement = null;

  modals.forEach((modal) => {
    document.body.appendChild(modal);
  });

  function openModal(id) {
    const modal = document.getElementById(`speaker-modal-${id}`);
    if (!modal) return;

    if (activeModal && activeModal !== modal) {
      closeModal(false);
    }
    if (activeModal === modal) return;

    lastFocusedElement = document.activeElement;
    activeModal = modal;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.classList.add('speaker-modal-open');

    const closeBtn = modal.querySelector('.speaker-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(restoreFocus = true) {
    if (!activeModal) return;

    const modal = activeModal;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    activeModal = null;
    document.body.classList.remove('speaker-modal-open');

    if (restoreFocus && lastFocusedElement) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
  }

  schedule.addEventListener('click', (e) => {
    const button = e.target.closest('[data-speaker-modal]');
    if (!button) return;

    e.preventDefault();
    openModal(button.getAttribute('data-speaker-modal'));
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-speaker-modal-close]')) {
        e.preventDefault();
        closeModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal();
    }
  });
}

function initSponsorModals() {
  const sponsors = document.querySelector('.sponsors');
  if (!sponsors) return;

  const modals = document.querySelectorAll('.sponsor-modal');
  if (!modals.length) return;

  let activeModal = null;
  let lastFocusedElement = null;

  modals.forEach((modal) => {
    document.body.appendChild(modal);
  });

  function openModal(id) {
    const modal = document.getElementById(`sponsor-modal-${id}`);
    if (!modal) return;

    if (activeModal && activeModal !== modal) {
      closeModal(false);
    }
    if (activeModal === modal) return;

    lastFocusedElement = document.activeElement;
    activeModal = modal;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.classList.add('sponsor-modal-open');

    const closeBtn = modal.querySelector('.sponsor-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(restoreFocus = true) {
    if (!activeModal) return;

    const modal = activeModal;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    activeModal = null;
    document.body.classList.remove('sponsor-modal-open');

    if (restoreFocus && lastFocusedElement) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
  }

  sponsors.addEventListener('click', (e) => {
    const button = e.target.closest('[data-sponsor-modal]');
    if (!button) return;

    e.preventDefault();
    openModal(button.getAttribute('data-sponsor-modal'));
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-sponsor-modal-close]')) {
        e.preventDefault();
        closeModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal();
    }
  });
}
