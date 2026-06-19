/**
 * data.js — Shared book data for Pages & Co.
 * All pages import this file first.
 */

const BOOKS = [
  {
    id: 1,
    title: "The Lighthouse Keeper",
    author: "Mara Ellison",
    genre: "Fiction",
    price: 18.00,
    originalPrice: 24.00,
    rating: 4.6,
    badge: "bestseller",
    coverColor: "#2d5a45",
    coverColor2: "#1e3d2a",
    pages: 312,
    year: 2023,
    format: "Paperback",
    publisher: "Harbor & Vale",
    language: "English",
    isbn: "978-1-23456-001-2",
    description: "A widowed keeper and a runaway girl share a winter on a remote island, learning what it means to keep a light burning for someone else.",
    isNew: false,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Ashes in the Archive",
    author: "J.P. Crowe",
    genre: "Mystery",
    price: 15.50,
    originalPrice: null,
    rating: 4.4,
    badge: null,
    coverColor: "#3d5a8a",
    coverColor2: "#2a3d6a",
    pages: 284,
    year: 2023,
    format: "Paperback",
    publisher: "Ink & Iron Press",
    language: "English",
    isbn: "978-1-23456-002-9",
    description: "A reclusive archivist uncovers a decades-old conspiracy buried in the city's oldest library, where every document tells a lie.",
    isNew: false,
    isBestseller: false,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Salt & Other Small Gods",
    author: "Imani Okafor",
    genre: "Fiction",
    price: 13.00,
    originalPrice: null,
    rating: 4.8,
    badge: "new",
    coverColor: "#6b3d6b",
    coverColor2: "#4a2a4a",
    pages: 256,
    year: 2024,
    format: "Paperback",
    publisher: "Saltwater Books",
    language: "English",
    isbn: "978-1-23456-003-6",
    description: "Woven through with myth and memory, this debut novel follows three generations of women on a West African island as the sea rises around them.",
    isNew: true,
    isBestseller: false,
    isFeatured: true,
  },
  {
    id: 4,
    title: "A House of Borrowed Light",
    author: "Sofia Marchetti",
    genre: "Fiction",
    price: 17.25,
    originalPrice: 22.00,
    rating: 4.5,
    badge: null,
    coverColor: "#5a4a7a",
    coverColor2: "#3d3060",
    pages: 320,
    year: 2023,
    format: "Paperback",
    publisher: "Evening Press",
    language: "English",
    isbn: "978-1-23456-004-3",
    description: "Set in a crumbling Milanese palazzo, this luminous novel examines what we inherit from the people who hurt us most.",
    isNew: false,
    isBestseller: false,
    isFeatured: true,
  },
  {
    id: 5,
    title: "Everything the River Took",
    author: "Ada Fenwick",
    genre: "Fiction",
    price: 18.75,
    originalPrice: null,
    rating: 4.6,
    badge: "bestseller",
    coverColor: "#6b3d2a",
    coverColor2: "#4a2515",
    pages: 296,
    year: 2022,
    format: "Paperback",
    publisher: "Riverstone Books",
    language: "English",
    isbn: "978-1-23456-005-0",
    description: "After her son disappears in a flood, a mother retraces his final weeks through the small Louisiana town he called home.",
    isNew: false,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 6,
    title: "The Quiet Economy",
    author: "Daniel Roth",
    genre: "Non-fiction",
    price: 19.99,
    originalPrice: null,
    rating: 4.2,
    badge: null,
    coverColor: "#5a4020",
    coverColor2: "#3d2a10",
    pages: 380,
    year: 2024,
    format: "Hardcover",
    publisher: "Meridian Press",
    language: "English",
    isbn: "978-1-23456-006-7",
    description: "A groundbreaking analysis of how informal economies sustain communities that formal markets have abandoned.",
    isNew: false,
    isBestseller: false,
    isFeatured: false,
  },
  {
    id: 7,
    title: "Pip and the Paper Moon",
    author: "Lena Harf",
    genre: "Children",
    price: 11.50,
    originalPrice: null,
    rating: 4.9,
    badge: "bestseller",
    coverColor: "#7a6a1a",
    coverColor2: "#5a4a10",
    pages: 128,
    year: 2023,
    format: "Hardcover",
    publisher: "Little Lantern Books",
    language: "English",
    isbn: "978-1-23456-007-4",
    description: "Pip can't sleep — until she follows the paper moon out her window and into a world made entirely of stories.",
    isNew: false,
    isBestseller: true,
    isFeatured: false,
  },
  {
    id: 8,
    title: "Orbital Driftwood",
    author: "Nadia Vance",
    genre: "Sci-Fi",
    price: 21.00,
    originalPrice: null,
    rating: 4.7,
    badge: null,
    coverColor: "#2e7070",
    coverColor2: "#1a5050",
    pages: 410,
    year: 2024,
    format: "Paperback",
    publisher: "Void Press",
    language: "English",
    isbn: "978-1-23456-008-1",
    description: "A generation ship drifting off course carries 10,000 sleeping colonists — and one engineer who woke too early.",
    isNew: false,
    isBestseller: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: "The Saltmarsh Murders",
    author: "Edmund Pryce",
    genre: "Mystery",
    price: 16.00,
    originalPrice: null,
    rating: 4.1,
    badge: null,
    coverColor: "#6b2a2a",
    coverColor2: "#4a1a1a",
    pages: 320,
    year: 2022,
    format: "Paperback",
    publisher: "Fog & Stone",
    language: "English",
    isbn: "978-1-23456-009-8",
    description: "A retired detective returns to his coastal hometown and finds the tides have washed up something he buried long ago.",
    isNew: false,
    isBestseller: false,
    isFeatured: false,
  },
  {
    id: 10,
    title: "Hands in the Soil",
    author: "Greta Lindqvist",
    genre: "Non-fiction",
    price: 23.00,
    originalPrice: null,
    rating: 4.3,
    badge: null,
    coverColor: "#2d5a35",
    coverColor2: "#1a3d20",
    pages: 268,
    year: 2023,
    format: "Hardcover",
    publisher: "Terra Firma Books",
    language: "English",
    isbn: "978-1-23456-010-4",
    description: "An intimate portrait of small-scale farming across four continents, told through the farmers themselves.",
    isNew: false,
    isBestseller: false,
    isFeatured: false,
  },
  {
    id: 11,
    title: "Threads of the Void",
    author: "Kai Tanaka",
    genre: "Sci-Fi",
    price: 20.50,
    originalPrice: null,
    rating: 4.6,
    badge: "new",
    coverColor: "#3d5a8a",
    coverColor2: "#2a3d6a",
    pages: 352,
    year: 2024,
    format: "Paperback",
    publisher: "Void Press",
    language: "English",
    isbn: "978-1-23456-011-1",
    description: "A physicist discovers that the universe is held together not by gravity but by story — and someone is editing the text.",
    isNew: true,
    isBestseller: false,
    isFeatured: false,
  },
  {
    id: 12,
    title: "The Button Thief",
    author: "Marco Diaz",
    genre: "Children",
    price: 10.99,
    originalPrice: null,
    rating: 4.7,
    badge: "new",
    coverColor: "#7a6a1a",
    coverColor2: "#5a4a10",
    pages: 144,
    year: 2024,
    format: "Hardcover",
    publisher: "Little Lantern Books",
    language: "English",
    isbn: "978-1-23456-012-8",
    description: "Someone is stealing buttons from all the coats in Millhaven. Only eleven-year-old Rosie suspects it might be magic.",
    isNew: true,
    isBestseller: false,
    isFeatured: false,
  },
  {
    id: 13,
    title: "Shore Lines",
    author: "Camille Osei",
    genre: "Poetry",
    price: 14.00,
    originalPrice: null,
    rating: 4.5,
    badge: null,
    coverColor: "#2e5a6a",
    coverColor2: "#1a3d4a",
    pages: 96,
    year: 2023,
    format: "Paperback",
    publisher: "Tide & Ink",
    language: "English",
    isbn: "978-1-23456-013-5",
    description: "A debut collection mapping the grief of diaspora through the metaphors of coastlines, crossing, and return.",
    isNew: false,
    isBestseller: false,
    isFeatured: false,
  },
  {
    id: 14,
    title: "Still Water, Still Life",
    author: "Yuki Hashimoto",
    genre: "Poetry",
    price: 12.50,
    originalPrice: null,
    rating: 4.8,
    badge: "bestseller",
    coverColor: "#4a3d6a",
    coverColor2: "#2d2550",
    pages: 88,
    year: 2022,
    format: "Paperback",
    publisher: "Tide & Ink",
    language: "English",
    isbn: "978-1-23456-014-2",
    description: "Quiet and devastating, these poems trace the inner life of objects — cups, doorways, mirrors — each a vessel for unspoken feeling.",
    isNew: false,
    isBestseller: true,
    isFeatured: false,
  },
];

// Helper: render star rating
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return `★ <span class="rating-value">${rating.toFixed(1)}</span>`;
}

// Helper: format price
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

// Helper: create book card HTML
function createBookCard(book, delay = 0) {
  const badge = book.badge === 'bestseller'
    ? `<span class="book-badge book-badge--bestseller">Bestseller</span>`
    : book.badge === 'new'
    ? `<span class="book-badge book-badge--new">New</span>`
    : '';

  const originalPrice = book.originalPrice
    ? `<span class="book-price-original">${formatPrice(book.originalPrice)}</span>`
    : '';

  const titleShort = book.title.length > 22
    ? book.title.substring(0, 20) + '...'
    : book.title;

  return `
    <a class="book-card" href="book.html?id=${book.id}" 
       role="listitem" 
       aria-label="${book.title} by ${book.author}"
       style="animation-delay: ${delay}ms">
      <div class="book-cover-wrap">
        <div class="book-cover" style="background: linear-gradient(160deg, ${book.coverColor} 0%, ${book.coverColor2} 100%); --cover-glow: ${book.coverColor};">
          ${badge}
          <div class="book-cover-text">
            <div class="book-cover-title">${book.title}</div>
            <div class="book-cover-author">${book.author}</div>
          </div>
        </div>
      </div>
      <div class="book-info">
        <div class="book-title" title="${book.title}">${titleShort}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-pricing">
          <span class="book-price">${formatPrice(book.price)}</span>
          ${originalPrice}
          <div class="book-rating">
            <span class="star">★</span>
            <span class="rating-value">${book.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </a>
  `;
}

// Shopping bag state (localStorage)
const BAG_KEY = 'pages_co_bag';

function getBag() {
  try {
    return JSON.parse(localStorage.getItem(BAG_KEY)) || [];
  } catch {
    return [];
  }
}

function saveBag(bag) {
  localStorage.setItem(BAG_KEY, JSON.stringify(bag));
}

function addToBag(bookId) {
  const bag = getBag();
  const existing = bag.find(item => item.id === bookId);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    bag.push({ id: bookId, qty: 1 });
  }
  saveBag(bag);
  updateBagUI();
  showToast('Added to bag!');
}

function removeFromBag(bookId) {
  const bag = getBag().filter(item => item.id !== bookId);
  saveBag(bag);
  updateBagUI();
}

function updateBagUI() {
  const bag = getBag();
  const count = bag.reduce((s, item) => s + (item.qty || 1), 0);

  // Update all bag count elements
  document.querySelectorAll('.bag-count').forEach(el => {
    el.textContent = count;
  });

  // Update sidebar
  const bagItemsEl = document.getElementById('bag-items');
  const bagFooterEl = document.getElementById('bag-footer');
  const bagTotalEl = document.getElementById('bag-total-price');

  if (!bagItemsEl) return;

  if (bag.length === 0) {
    bagItemsEl.innerHTML = '<p class="bag-empty">Your bag is empty.</p>';
    if (bagFooterEl) bagFooterEl.hidden = true;
    return;
  }

  let total = 0;
  let html = '';

  bag.forEach(item => {
    const book = BOOKS.find(b => b.id === item.id);
    if (!book) return;
    const subtotal = book.price * (item.qty || 1);
    total += subtotal;

    html += `
      <div class="bag-item" data-id="${book.id}">
        <div class="book-cover bag-item-cover" style="background: linear-gradient(160deg, ${book.coverColor} 0%, ${book.coverColor2} 100%); width:48px; height:68px; border-radius:4px; flex-shrink:0; --cover-glow: ${book.coverColor};"></div>
        <div class="bag-item-info">
          <div class="bag-item-title">${book.title}</div>
          <div class="bag-item-author">${book.author}</div>
          <div class="bag-item-price">${formatPrice(subtotal)} ${item.qty > 1 ? `<span style="font-size:11px;color:var(--text-muted);">×${item.qty}</span>` : ''}</div>
        </div>
        <button class="bag-item-remove" onclick="removeFromBag(${book.id})" aria-label="Remove ${book.title}">
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;
  });

  bagItemsEl.innerHTML = html;
  if (bagFooterEl) {
    bagFooterEl.hidden = false;
    bagTotalEl.textContent = formatPrice(total);
  }
}

// Toast
function showToast(message, icon = '✓') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast-icon">${icon}</span>${message}`;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Wishlist (localStorage)
const WISHLIST_KEY = 'pages_co_wishlist';

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function toggleWishlist(bookId) {
  const wl = getWishlist();
  const idx = wl.indexOf(bookId);
  if (idx === -1) {
    wl.push(bookId);
    showToast('Added to wishlist! ♥', '♥');
  } else {
    wl.splice(idx, 1);
    showToast('Removed from wishlist');
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wl));
  return idx === -1;
}

// Shared nav setup
function initSharedNav() {
  // Scroll shadow
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open.toString());
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Bag sidebar
  const bagBtn = document.getElementById('bag-btn');
  const bagSidebar = document.getElementById('bag-sidebar');
  const bagClose = document.getElementById('bag-close');
  const overlay = document.getElementById('overlay');

  function openBag() {
    bagSidebar.hidden = false;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    updateBagUI();
  }

  function closeBag() {
    bagSidebar.hidden = true;
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  if (bagBtn) bagBtn.addEventListener('click', openBag);
  if (bagClose) bagClose.addEventListener('click', closeBag);
  if (overlay) overlay.addEventListener('click', closeBag);

  // Search
  const searchInput = document.getElementById('search-input');
  const searchOverlay = document.getElementById('search-overlay');
  const searchResults = document.getElementById('search-results');

  if (searchInput) {
    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const q = searchInput.value.trim().toLowerCase();
      if (q.length < 2) {
        if (searchOverlay) searchOverlay.hidden = true;
        return;
      }
      searchTimer = setTimeout(() => {
        const results = BOOKS.filter(b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q)
        ).slice(0, 6);

        if (results.length === 0) {
          if (searchOverlay) searchOverlay.hidden = true;
          return;
        }

        searchResults.innerHTML = results.map(b => `
          <a class="search-result-item" href="book.html?id=${b.id}">
            <div class="search-result-cover" style="background: linear-gradient(160deg, ${b.coverColor} 0%, ${b.coverColor2} 100%);"></div>
            <div class="search-result-info">
              <div class="search-result-title">${b.title}</div>
              <div class="search-result-author">${b.author}</div>
            </div>
            <span class="search-result-price">${formatPrice(b.price)}</span>
          </a>
        `).join('');

        if (searchOverlay) searchOverlay.hidden = false;
      }, 200);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        if (searchOverlay) searchOverlay.hidden = true;
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && searchOverlay && !searchOverlay.contains(e.target)) {
        searchOverlay.hidden = true;
      }
    });
  }

  // Newsletter
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      if (email) {
        showToast('You\'re on the list! 📚');
        document.getElementById('newsletter-email').value = '';
      }
    });
  }

  // Sign in button
  const signinBtn = document.getElementById('btn-signin');
  if (signinBtn) {
    signinBtn.addEventListener('click', () => {
      if (typeof window.openLoginModal !== 'function') {
        showToast('Sign in coming soon!');
      }
    });
  }

  // Init bag count
  updateBagUI();
}
