/**
 * main.js — Homepage interactions
 * Hero carousel, Featured, Bestsellers, New Arrivals
 */

document.addEventListener('DOMContentLoaded', () => {
  initSharedNav();
  initCarousel();
  initFeaturedBooks();
  initBestsellersBooks();
  initNewArrivalsBooks();
});

// ── CAROUSEL ──────────────────────────────────────────────────
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!track) return;

  let current = 0;
  const total = document.querySelectorAll('.carousel-slide').length;
  let autoTimer;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle('dot--active', i === current);
      d.setAttribute('aria-selected', (i === current).toString());
    });

    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Touch/swipe support
  let touchStartX = 0;
  const carousel = document.getElementById('hero-carousel');
  carousel?.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  resetAuto();
}

// ── FEATURED BOOKS ────────────────────────────────────────────
function initFeaturedBooks() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;

  const featured = BOOKS.filter(b => b.isFeatured).slice(0, 5);
  grid.innerHTML = featured.map((b, i) => createBookCard(b, i * 60)).join('');
}

// ── BESTSELLERS ───────────────────────────────────────────────
function initBestsellersBooks() {
  const grid = document.getElementById('bestsellers-grid');
  if (!grid) return;

  const bestsellers = BOOKS.filter(b => b.isBestseller).slice(0, 5);
  grid.innerHTML = bestsellers.map((b, i) => createBookCard(b, i * 60)).join('');
}

// ── NEW ARRIVALS ──────────────────────────────────────────────
function initNewArrivalsBooks() {
  const grid = document.getElementById('new-arrivals-grid');
  if (!grid) return;

  const newBooks = BOOKS.filter(b => b.isNew);

  // Also add some bestsellers to fill the grid
  const combined = [
    ...newBooks,
    ...BOOKS.filter(b => !b.isNew && b.isBestseller).slice(0, 5 - newBooks.length),
  ].slice(0, 5);

  grid.innerHTML = combined.map((b, i) => createBookCard(b, i * 60)).join('');
}
