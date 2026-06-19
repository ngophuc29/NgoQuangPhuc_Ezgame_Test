/**
 * modal.js — Standalone Login Modal
 * Works on index.html, shop.html, book.html
 * (checkout.html has its own inline logic in checkout.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStandaloneModal();
});

function initStandaloneModal() {
  const backdrop = document.getElementById('login-modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const loginForm = document.getElementById('login-form');
  const togglePwdBtn = document.getElementById('toggle-password');
  const createAccountLink = document.getElementById('modal-create-account');
  const signinBtn = document.getElementById('btn-signin');

  if (!backdrop) return;

  function openModal() {
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('login-email')?.focus(), 120);
  }

  function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = '';
    resetModalForm();
  }

  // Sign in button in nav
  if (signinBtn) {
    // Override the default handler from data.js
    signinBtn.onclick = null;
    signinBtn.addEventListener('click', openModal);
  }

  // Close button
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Backdrop click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) closeModal();
  });

  // Toggle password
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

  // Create account link
  if (createAccountLink) {
    createAccountLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchModalToRegister(closeModal);
    });
  }

  // Form submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateModal()) return;

      const submitBtn = document.getElementById('btn-sign-in');
      const btnText = submitBtn?.querySelector('.btn-text');
      const btnSpinner = submitBtn?.querySelector('.btn-spinner');

      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Signing in…';
      if (btnSpinner) btnSpinner.hidden = false;

      await new Promise(r => setTimeout(r, 1600));

      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Sign in';
      if (btnSpinner) btnSpinner.hidden = true;

      closeModal();
      showToast('Welcome back! ✨');

      // Update Sign In button
      const navSignin = document.getElementById('btn-signin');
      if (navSignin) navSignin.textContent = 'My account';

      // Global callback hook
      if (typeof window.onLoginSuccess === 'function') {
        window.onLoginSuccess();
      }
    });
  }

  // Make openModal available globally for other scripts
  window.openLoginModal = openModal;
}

function validateModal() {
  let valid = true;

  const emailInput = document.getElementById('login-email');
  const emailError = document.getElementById('email-error');
  const pwdInput = document.getElementById('login-password');
  const pwdError = document.getElementById('password-error');
  const nameInput = document.getElementById('register-name');

  // Name check (register view only)
  if (nameInput) {
    if (!nameInput.value.trim()) {
      nameInput.classList.add('input-error');
      valid = false;
    } else {
      nameInput.classList.remove('input-error');
    }
    nameInput.addEventListener('input', () => {
      nameInput.classList.remove('input-error');
    }, { once: true });
  }

  // Email check
  const emailVal = emailInput?.value.trim() || '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    emailInput?.classList.add('input-error');
    if (emailError) emailError.hidden = false;
    valid = false;
  } else {
    emailInput?.classList.remove('input-error');
    if (emailError) emailError.hidden = true;
  }

  // Password check
  if (!pwdInput?.value) {
    pwdInput?.classList.add('input-error');
    if (pwdError) pwdError.hidden = false;
    valid = false;
  } else {
    pwdInput?.classList.remove('input-error');
    if (pwdError) pwdError.hidden = true;
  }

  // Live clear on type
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

function resetModalForm() {
  document.getElementById('login-form')?.reset();
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  document.querySelectorAll('.form-error').forEach(el => el.hidden = true);

  // Reset to sign in view if needed
  const modal = document.getElementById('login-modal');
  if (modal?.dataset.view === 'register') {
    resetModalToSignIn();
  }
}

function switchModalToRegister(closeFn) {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  modal.dataset.view = 'register';

  const title = modal.querySelector('.modal-title');
  const subtitle = modal.querySelector('.modal-subtitle');
  const form = document.getElementById('login-form');
  const footerText = modal.querySelector('.modal-footer-text');

  if (title) title.textContent = 'Create an account';
  if (subtitle) subtitle.textContent = 'Join Pages & Co. and start your reading journey.';
  if (footerText) {
    footerText.innerHTML = 'Already have an account? <a href="#" class="modal-link" id="modal-back-signin">Sign in</a>';
    document.getElementById('modal-back-signin')?.addEventListener('click', (e) => {
      e.preventDefault();
      resetModalToSignIn();
    });
  }

  // Add name field
  if (form && !document.getElementById('name-group')) {
    const firstGroup = form.querySelector('.form-group');
    const nameGroup = document.createElement('div');
    nameGroup.className = 'form-group';
    nameGroup.id = 'name-group';
    nameGroup.innerHTML = `
      <label class="form-label" for="register-name">Full Name</label>
      <input type="text" id="register-name" class="form-input" placeholder="Your full name" autocomplete="name" />
    `;
    form.insertBefore(nameGroup, firstGroup);
  }

  const submitBtn = document.getElementById('btn-sign-in');
  if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Create account';
}

function resetModalToSignIn() {
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
      switchModalToRegister();
    });
  }

  document.getElementById('name-group')?.remove();

  const submitBtn = document.getElementById('btn-sign-in');
  if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Sign in';
}
