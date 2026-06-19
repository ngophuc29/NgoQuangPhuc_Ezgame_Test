/**
 * checkout.js — Checkout page + Login Modal logic
 * - Renders cart items with quantity controls
 * - Real-time order summary
 * - Login modal (triggered by Checkout btn / Sign In btn)
 * - Create account view switch
 */

document.addEventListener('DOMContentLoaded', () => {
  initSharedNav();
  initCheckoutPage();

  // On checkout page, clicking bag btn redirects to checkout
  const bagBtn = document.getElementById('bag-btn');
  if (bagBtn) {
    bagBtn.addEventListener('click', () => {
      // Already on checkout page — just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Handle Checkout button click -> opens login modal (loaded via modal.js)
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (getBag().length > 0) {
        if (typeof window.openLoginModal === 'function') {
          window.openLoginModal();
        }
      }
    });
  }

  // Hook into successful login to show order confirmation
  window.onLoginSuccess = () => {
    setTimeout(showOrderConfirmation, 500);
  };
});

/* ============================================================
   CHECKOUT PAGE
   ============================================================ */
function initCheckoutPage() {
  renderCartItems();
  renderSummary();
}

function renderCartItems() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const checkoutLayoutEl = document.getElementById('checkout-layout');
  const checkoutBtn = document.getElementById('checkout-btn');

  const bag = getBag();

  if (bag.length === 0) {
    checkoutLayoutEl.hidden = true;
    cartEmptyEl.hidden = false;
    return;
  }

  cartEmptyEl.hidden = true;
  checkoutLayoutEl.hidden = false;

  cartItemsEl.innerHTML = bag.map(item => {
    const book = BOOKS.find(b => b.id === item.id);
    if (!book) return '';
    const subtotal = book.price * (item.qty || 1);

    return `
      <div class="cart-item" id="cart-item-${book.id}" data-id="${book.id}">

        <!-- Thumbnail cover -->
        <div class="cart-cover-wrap">
          <div class="cart-cover"
            style="background: linear-gradient(160deg, ${book.coverColor} 0%, ${book.coverColor2} 100%);"
            role="img" aria-label="Cover of ${book.title}"></div>
        </div>

        <!-- Info: title, author, remove -->
        <div class="cart-item-info">
          <div class="cart-item-title">${book.title}</div>
          <div class="cart-item-author">${book.author}</div>
          <button class="cart-item-remove" data-id="${book.id}"
            aria-label="Remove ${book.title} from bag">Remove</button>
        </div>

        <!-- Qty controls -->
        <div class="cart-item-qty" aria-label="Quantity for ${book.title}">
          <button class="qty-btn qty-minus" data-id="${book.id}"
            aria-label="Decrease quantity" ${(item.qty || 1) <= 1 ? 'disabled' : ''}>&minus;</button>
          <span class="qty-value" id="qty-${book.id}">${item.qty || 1}</span>
          <button class="qty-btn qty-plus" data-id="${book.id}" aria-label="Increase quantity">+</button>
        </div>

        <!-- Price -->
        <div class="cart-item-price" id="price-${book.id}">$${subtotal.toFixed(2)}</div>

      </div>
    `;
  }).join('');


  // Attach events
  attachCartEvents();
}

function attachCartEvents() {
  // Remove buttons
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      removeFromBag(id);

      // Animate out
      const itemEl = document.getElementById(`cart-item-${id}`);
      if (itemEl) {
        itemEl.style.transition = 'all 0.3s ease';
        itemEl.style.opacity = '0';
        itemEl.style.transform = 'translateX(-20px)';
        itemEl.style.maxHeight = itemEl.offsetHeight + 'px';
        setTimeout(() => {
          itemEl.style.maxHeight = '0';
          itemEl.style.padding = '0';
          itemEl.style.margin = '0';
          itemEl.style.border = 'none';
        }, 200);
        setTimeout(() => {
          itemEl.remove();
          renderCartItems(); // re-render if empty
          renderSummary();
        }, 400);
      }
    });
  });

  // Qty minus
  document.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      changeQty(id, -1);
    });
  });

  // Qty plus
  document.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      changeQty(id, +1);
    });
  });
}

function changeQty(bookId, delta) {
  const bag = getBag();
  const item = bag.find(i => i.id === bookId);
  if (!item) return;

  item.qty = Math.max(1, (item.qty || 1) + delta);
  saveBag(bag);

  // Update qty display
  const qtyEl = document.getElementById(`qty-${bookId}`);
  if (qtyEl) qtyEl.textContent = item.qty;

  // Update minus button disabled state
  const minusBtn = document.querySelector(`.qty-minus[data-id="${bookId}"]`);
  if (minusBtn) minusBtn.disabled = item.qty <= 1;

  // Update item price
  const book = BOOKS.find(b => b.id === bookId);
  const priceEl = document.getElementById(`price-${bookId}`);
  if (priceEl && book) priceEl.textContent = `$${(book.price * item.qty).toFixed(2)}`;

  // Update bag count + summary
  updateBagUI();
  renderSummary();
}

function renderSummary() {
  const bag = getBag();
  const totalItems = bag.reduce((s, i) => s + (i.qty || 1), 0);
  let subtotal = 0;

  bag.forEach(item => {
    const book = BOOKS.find(b => b.id === item.id);
    if (book) subtotal += book.price * (item.qty || 1);
  });

  const shipping = subtotal >= 35 ? 'Free' : '$4.99';
  const shippingAmount = subtotal >= 35 ? 0 : 4.99;
  const total = subtotal + shippingAmount;

  const labelEl = document.getElementById('summary-label');
  const subtotalEl = document.getElementById('summary-subtotal');
  const shippingEl = document.getElementById('summary-shipping');
  const totalEl = document.getElementById('summary-total');

  if (labelEl) labelEl.textContent = `Subtotal (${totalItems} item${totalItems !== 1 ? 's' : ''})`;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) {
    shippingEl.textContent = shipping;
    shippingEl.style.color = shipping === 'Free' ? '#2d5a45' : 'var(--text-muted)';
  }
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

/* ============================================================
   ORDER CONFIRMATION (simulated)
   ============================================================ */
function showOrderConfirmation() {
  const layout = document.getElementById('checkout-layout');
  const cartEmpty = document.getElementById('cart-empty');

  if (layout) {
    layout.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px 20px; animation:slideUp 0.5s ease;">
        <div style="font-size:56px; margin-bottom:20px;">🎉</div>
        <h2 style="font-size:28px; font-weight:700; margin-bottom:12px; color:var(--text);">
          Order confirmed!
        </h2>
        <p style="font-size:15px; color:var(--text-muted); margin-bottom:8px; max-width:400px; margin-left:auto; margin-right:auto; line-height:1.6;">
          Thank you for your order. You'll receive a confirmation email shortly. Happy reading! 📚
        </p>
        <p style="font-size:13px; color:var(--text-light); margin-bottom:32px;">
          Order #PC-${Math.floor(Math.random() * 90000) + 10000}
        </p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <a href="index.html" class="btn-gold">Back to homepage</a>
          <a href="shop.html" style="display:inline-flex;align-items:center;padding:10px 22px;border-radius:100px;border:1.5px solid var(--border);font-size:14px;font-weight:500;color:var(--text);transition:all 0.15s;">
            Continue shopping
          </a>
        </div>
      </div>
    `;

    // Clear the bag
    saveBag([]);
    updateBagUI();
  }
}
