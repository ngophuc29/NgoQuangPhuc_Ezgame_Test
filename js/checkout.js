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
  initLoginModal();

  // On checkout page, clicking bag btn redirects to checkout
  const bagBtn = document.getElementById('bag-btn');
  if (bagBtn) {
    bagBtn.addEventListener('click', () => {
      // Already on checkout page — just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
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
   LOGIN MODAL
   ============================================================ */
function initLoginModal() {
  const backdrop = document.getElementById('login-modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const loginForm = document.getElementById('login-form');
  const checkoutBtn = document.getElementById('checkout-btn');
  const togglePwdBtn = document.getElementById('toggle-password');
  const createAccountLink = document.getElementById('modal-create-account');
  const signinBtn = document.getElementById('btn-signin');

  if (!backdrop) return;

  function openModal() {
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    // Focus email input
    setTimeout(() => {
      document.getElementById('login-email')?.focus();
    }, 100);
  }

  function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = '';
    resetForm();
  }

  // Open modal triggers
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (getBag().length > 0) openModal();
    });
  }

  if (signinBtn) {
    signinBtn.addEventListener('click', openModal);
  }

  // Close triggers
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Close on backdrop click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) closeModal();
  });

  // Toggle password visibility
  if (togglePwdBtn) {
    togglePwdBtn.addEventListener('click', () => {
      const pwdInput = document.getElementById('login-password');
      const eyeShow = togglePwdBtn.querySelector('.eye-show');
      const eyeHide = togglePwdBtn.querySelector('.eye-hide');

      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeShow.style.display = 'none';
        eyeHide.style.display = 'block';
        togglePwdBtn.setAttribute('aria-label', 'Hide password');
      } else {
        pwdInput.type = 'password';
        eyeShow.style.display = 'block';
        eyeHide.style.display = 'none';
        togglePwdBtn.setAttribute('aria-label', 'Show password');
      }
    });
  }

  // Create account link — switch modal to register view
  if (createAccountLink) {
    createAccountLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchToRegister();
    });
  }

  // Form submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateLoginForm()) return;

      const submitBtn = document.getElementById('btn-sign-in');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      // Loading state
      submitBtn.disabled = true;
      btnText.textContent = 'Signing in…';
      if (btnSpinner) btnSpinner.hidden = false;

      // Simulate auth delay
      await new Promise(r => setTimeout(r, 1800));

      // Simulate success
      submitBtn.disabled = false;
      btnText.textContent = 'Sign in';
      if (btnSpinner) btnSpinner.hidden = true;

      closeModal();
      showToast('Welcome back! ✨');

      // Update nav button
      if (signinBtn) {
        signinBtn.textContent = 'My account';
      }

      // On checkout page: proceed to simulated checkout
      if (window.location.pathname.includes('checkout')) {
        setTimeout(() => {
          showOrderConfirmation();
        }, 500);
      }
    });
  }
}

function validateLoginForm() {
  let valid = true;

  const emailInput = document.getElementById('login-email');
  const emailError = document.getElementById('email-error');
  const pwdInput = document.getElementById('login-password');
  const pwdError = document.getElementById('password-error');

  // Email
  const emailVal = emailInput?.value.trim() || '';
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  if (!emailOk) {
    emailInput?.classList.add('input-error');
    if (emailError) emailError.hidden = false;
    valid = false;
  } else {
    emailInput?.classList.remove('input-error');
    if (emailError) emailError.hidden = true;
  }

  // Password
  const pwdVal = pwdInput?.value || '';
  if (pwdVal.length < 1) {
    pwdInput?.classList.add('input-error');
    if (pwdError) pwdError.hidden = false;
    valid = false;
  } else {
    pwdInput?.classList.remove('input-error');
    if (pwdError) pwdError.hidden = true;
  }

  // Clear errors on input
  emailInput?.addEventListener('input', () => {
    emailInput.classList.remove('input-error');
    if (emailError) emailError.hidden = true;
  }, { once: true });

  pwdInput?.addEventListener('input', () => {
    pwdInput.classList.remove('input-error');
    if (pwdError) pwdError.hidden = true;
  }, { once: true });

  return valid;
}

function resetForm() {
  const form = document.getElementById('login-form');
  if (form) {
    form.reset();
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    form.querySelectorAll('.form-error').forEach(el => el.hidden = true);
  }
  // Reset to sign in view if was on register
  const modal = document.getElementById('login-modal');
  if (modal?.dataset.view === 'register') {
    switchToSignIn();
  }
}

function switchToRegister() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;

  modal.dataset.view = 'register';

  const title = modal.querySelector('.modal-title');
  const subtitle = modal.querySelector('.modal-subtitle');
  const form = document.getElementById('login-form');
  const footerText = modal.querySelector('.modal-footer-text');

  if (title) title.textContent = 'Create an account';
  if (subtitle) subtitle.textContent = 'Join Pages & Co. and start your reading journey.';
  if (footerText) footerText.innerHTML = 'Already have an account? <a href="#" class="modal-link" id="modal-signin-link">Sign in</a>';

  // Add name field
  if (form) {
    const firstGroup = form.querySelector('.form-group');
    if (firstGroup && !document.getElementById('register-name')) {
      const nameGroup = document.createElement('div');
      nameGroup.className = 'form-group';
      nameGroup.id = 'name-group';
      nameGroup.innerHTML = `
        <label class="form-label" for="register-name">Full Name</label>
        <input type="text" id="register-name" class="form-input" placeholder="Your full name" autocomplete="name" required />
      `;
      form.insertBefore(nameGroup, firstGroup);
    }

    const submitBtn = form.querySelector('.btn-sign-in');
    if (submitBtn) {
      submitBtn.querySelector('.btn-text').textContent = 'Create account';
    }
  }

  // Bind switch back
  setTimeout(() => {
    const signinLink = document.getElementById('modal-signin-link');
    if (signinLink) {
      signinLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToSignIn();
      });
    }
  }, 0);
}

function switchToSignIn() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;

  modal.dataset.view = 'signin';

  const title = modal.querySelector('.modal-title');
  const subtitle = modal.querySelector('.modal-subtitle');
  const footerText = modal.querySelector('.modal-footer-text');

  if (title) title.textContent = 'Welcome back';
  if (subtitle) subtitle.textContent = 'Sign in to access your bag, orders and wishlist.';
  if (footerText) {
    footerText.innerHTML = 'New here? <a href="#" class="modal-link" id="modal-create-account">Create an account</a>';
    document.getElementById('modal-create-account')?.addEventListener('click', (e) => {
      e.preventDefault();
      switchToRegister();
    });
  }

  // Remove name field
  document.getElementById('name-group')?.remove();
  document.getElementById('register-name')?.closest('.form-group')?.remove();

  const submitBtn = document.getElementById('login-form')?.querySelector('.btn-sign-in');
  if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Sign in';
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

/* ============================================================
   GLOBAL: Export openLoginModal so other pages can use it
   ============================================================ */
window.openLoginModal = function() {
  const backdrop = document.getElementById('login-modal-backdrop');
  if (backdrop) {
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('login-email')?.focus(), 100);
  }
};
