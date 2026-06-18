/**
 * book-detail.js — Book Detail page
 * Loads book data by ?id= URL param, renders full detail view
 * and "You may also like" section
 */

document.addEventListener('DOMContentLoaded', () => {
  initSharedNav();
  initBookDetail();
});

let currentBook = null;

function initBookDetail() {
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get('id'), 10);

  const book = BOOKS.find(b => b.id === bookId);

  if (!book) {
    // Book not found
    document.getElementById('book-detail-layout').innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:80px 20px;">
        <p style="font-size:48px; margin-bottom:16px;">📖</p>
        <h2 style="font-size:24px; margin-bottom:12px;">Book not found</h2>
        <a href="shop.html" style="color:var(--red-link); font-weight:500;">Browse all books →</a>
      </div>
    `;
    return;
  }

  currentBook = book;

  // Update page metadata
  document.getElementById('page-title').textContent = `${book.title} – Pages & Co.`;
  document.getElementById('page-meta-desc').setAttribute('content',
    `${book.title} by ${book.author}. ${book.description}`);
  document.getElementById('breadcrumb-title').textContent = book.title;

  // Render detail layout
  renderBookDetail(book);

  // Render "you may also like"
  renderAlsoLike(book);
}

function renderBookDetail(book) {
  const layout = document.getElementById('book-detail-layout');
  if (!layout) return;

  const originalPrice = book.originalPrice
    ? `<span class="detail-price-original">${formatPrice(book.originalPrice)}</span>`
    : '';

  const badge = book.badge === 'bestseller'
    ? `<span class="book-badge book-badge--bestseller" style="position:relative;top:auto;left:auto;display:inline-block;margin-bottom:14px;">Bestseller</span>`
    : book.badge === 'new'
    ? `<span class="book-badge book-badge--new" style="position:relative;top:auto;left:auto;display:inline-block;margin-bottom:14px;">New</span>`
    : '';

  const inWishlist = (JSON.parse(localStorage.getItem('pages_co_wishlist') || '[]')).includes(book.id);

  layout.innerHTML = `
    <!-- Left: Cover -->
    <div class="detail-cover-wrap">
      <div class="detail-cover" 
           style="background: linear-gradient(160deg, ${book.coverColor} 0%, ${book.coverColor2} 100%);"
           role="img"
           aria-label="Cover of ${book.title}">
        <div class="detail-cover-text">
          <div class="detail-cover-title">${book.title}</div>
          <div class="detail-cover-author">${book.author}</div>
        </div>
      </div>
    </div>

    <!-- Right: Info -->
    <div class="detail-info">
      <span class="detail-genre-tag">${book.genre}</span>
      ${badge}
      <h1 class="detail-title">${book.title}</h1>
      <p class="detail-author">by <em>${book.author}</em></p>

      <div class="detail-meta-inline">
        <span class="rating">
          <span style="color:var(--gold);">★</span>&nbsp;${book.rating.toFixed(1)}
        </span>
        <span>${book.pages} pages</span>
        <span>${book.year}</span>
      </div>

      <div class="detail-price-wrap">
        <span class="detail-price">${formatPrice(book.price)}</span>
        ${originalPrice}
      </div>

      <p class="detail-description">${book.description}</p>

      <div class="detail-actions">
        <button class="btn-primary" id="add-to-bag-btn" aria-label="Add ${book.title} to bag for ${formatPrice(book.price)}">
          Add to bag — ${formatPrice(book.price)}
        </button>
        <button class="btn-wishlist" id="wishlist-btn" aria-label="Add to wishlist" aria-pressed="${inWishlist}">
          <svg viewBox="0 0 24 24" fill="${inWishlist ? 'var(--red-accent)' : 'none'}" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${inWishlist ? 'Wishlisted' : 'Wishlist'}
        </button>
      </div>

      <dl class="detail-specs">
        <div class="spec-item">
          <dt class="spec-label">Format</dt>
          <dd class="spec-value">${book.format}</dd>
        </div>
        <div class="spec-item">
          <dt class="spec-label">Pages</dt>
          <dd class="spec-value">${book.pages}</dd>
        </div>
        <div class="spec-item">
          <dt class="spec-label">Published</dt>
          <dd class="spec-value">${book.year}</dd>
        </div>
        <div class="spec-item">
          <dt class="spec-label">Publisher</dt>
          <dd class="spec-value"><a href="#">${book.publisher}</a></dd>
        </div>
        <div class="spec-item">
          <dt class="spec-label">Language</dt>
          <dd class="spec-value">${book.language}</dd>
        </div>
        <div class="spec-item">
          <dt class="spec-label">ISBN</dt>
          <dd class="spec-value">${book.isbn}</dd>
        </div>
      </dl>
    </div>
  `;

  // Add to bag
  document.getElementById('add-to-bag-btn')?.addEventListener('click', () => {
    addToBag(book.id);

    // Open bag sidebar after adding
    setTimeout(() => {
      const bagSidebar = document.getElementById('bag-sidebar');
      const overlay = document.getElementById('overlay');
      if (bagSidebar) {
        bagSidebar.hidden = false;
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
        updateBagUI();
      }
    }, 300);
  });

  // Wishlist
  document.getElementById('wishlist-btn')?.addEventListener('click', function() {
    const added = toggleWishlist(book.id);
    const svg = this.querySelector('svg');
    if (svg) svg.setAttribute('fill', added ? 'var(--red-accent)' : 'none');
    this.setAttribute('aria-pressed', added.toString());
    this.innerHTML = `
      <svg viewBox="0 0 24 24" fill="${added ? 'var(--red-accent)' : 'none'}" stroke="${added ? 'var(--red-accent)' : 'currentColor'}" stroke-width="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ${added ? 'Wishlisted' : 'Wishlist'}
    `;
  });
}

function renderAlsoLike(currentBook) {
  const grid = document.getElementById('also-like-grid');
  if (!grid) return;

  // Find books in same genre, excluding current
  let alsoLike = BOOKS.filter(b => b.id !== currentBook.id && b.genre === currentBook.genre);

  // If not enough, add from other genres (bestsellers first)
  if (alsoLike.length < 2) {
    const extras = BOOKS.filter(b => b.id !== currentBook.id && b.genre !== currentBook.genre)
      .sort((a, b) => {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return b.rating - a.rating;
      });
    alsoLike = [...alsoLike, ...extras].slice(0, 4);
  } else {
    alsoLike = alsoLike.slice(0, 4);
  }

  grid.innerHTML = alsoLike.map((b, i) => createBookCard(b, i * 60)).join('');
}
