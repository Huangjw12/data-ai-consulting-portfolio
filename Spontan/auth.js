const AUTH_TOKEN_KEY = 'spontan_token';
const AUTH_USER_KEY = 'spontan_user';

const tabs = document.querySelectorAll('.auth__tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');

function showError(el, message) {
  el.textContent = message;
  el.hidden = false;
}

function hideErrors() {
  loginError.hidden = true;
  registerError.hidden = true;
}

function switchTab(tabName) {
  tabs.forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle('auth__tab--active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  loginForm.classList.toggle('auth__form--hidden', tabName !== 'login');
  registerForm.classList.toggle('auth__form--hidden', tabName !== 'register');
  hideErrors();
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

function saveSession(token, user) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function redirectHome() {
  window.location.href = 'index.html';
}

async function apiPost(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || '请求失败，请确认已运行 npm start');
  }
  return data;
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideErrors();
  const formData = new FormData(loginForm);
  const submitBtn = loginForm.querySelector('.auth__submit');
  submitBtn.disabled = true;

  try {
    const data = await apiPost('/api/auth/login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });
    saveSession(data.token, data.user);
    redirectHome();
  } catch (err) {
    showError(loginError, err.message);
  } finally {
    submitBtn.disabled = false;
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideErrors();
  const formData = new FormData(registerForm);
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (password !== confirmPassword) {
    showError(registerError, '两次输入的密码不一致');
    return;
  }

  const submitBtn = registerForm.querySelector('.auth__submit');
  submitBtn.disabled = true;

  try {
    const data = await apiPost('/api/auth/register', {
      username: formData.get('username'),
      email: formData.get('email'),
      password,
    });
    saveSession(data.token, data.user);
    redirectHome();
  } catch (err) {
    showError(registerError, err.message);
  } finally {
    submitBtn.disabled = false;
  }
});

if (localStorage.getItem(AUTH_TOKEN_KEY)) {
  redirectHome();
}
