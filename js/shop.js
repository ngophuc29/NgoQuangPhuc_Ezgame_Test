/**
 * shop.js — Shop / All Books page interactions
 * Genre filtering, sort, and URL param support
 */

document.addEventListener('DOMContentLoaded', () => {
  initSharedNav();
  initShopPage();
});

let currentGenre = 'All';
let currentSort = 'featured';

function initShopPage() {
  // Read URL params
  const params = new URLSearchParams(window.location.search);
  const genreParam = params.get('genre');
  const sortParam = params.get('sort');

  if (genreParam) currentGenre = genreParam;
  if (sortParam) {
    if (sortParam === 'new') currentSort = 'new';
    if (sortParam === 'bestseller') currentSort = 'rating';
  }

  // Set active filter tab
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.classList.toggle('filter-tab--active', tab.dataset.genre === currentGenre);
    tab.setAttribute('aria-selected', (tab.dataset.genre === currentGenre).toString());

    tab.addEventListener('click', () => {
      currentGenre = tab.dataset.genre;
      filterTabs.forEach(t => {
        t.classList.remove('filter-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('filter-tab--active');
      tab.setAttribute('aria-selected', 'true');
      renderGrid();
    });
  });

  // Sort select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.value = currentSort;
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderGrid();
    });
  }

  renderGrid();
}

function getFilteredBooks() {
  let books = [...BOOKS];

  // Filter by genre
  if (currentGenre !== 'All') {
    books = books.filter(b => b.genre === currentGenre);
  }

  // Sort
  switch (currentSort) {
    case 'price-asc':
      books.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      books.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      books.sort((a, b) => b.rating - a.rating);
      break;
    case 'new':
      books.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return b.year - a.year;
      });
      break;
    default: // featured
      books.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return 0;
      });
  }

  return books;
}

function renderGrid() {
  const grid = document.getElementById('shop-grid');
  const subtitle = document.getElementById('shop-subtitle');

  if (!grid) return;

  const books = getFilteredBooks();

  // Update subtitle
  const genreLabel = currentGenre === 'All' ? '' : ` in ${currentGenre}`;
  if (subtitle) {
    subtitle.textContent = `${books.length} title${books.length !== 1 ? 's' : ''}${genreLabel} in the collection`;
  }

  if (books.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:60px 20px; color:var(--text-muted);">
        <p style="font-size:40px; margin-bottom:12px;">📚</p>
        <p style="font-size:16px; font-weight:600;">No books found</p>
        <p style="font-size:14px; margin-top:6px;">Try a different genre or sort option.</p>
      </div>
    `;
    return;
  }

  // Animate out
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(8px)';

  setTimeout(() => {
    grid.innerHTML = books.map((b, i) => createBookCard(b, i * 40)).join('');
    grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 150);
}
