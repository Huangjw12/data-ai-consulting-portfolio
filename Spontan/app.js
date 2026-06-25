const STORAGE_KEY = 'spontan_custom_trips';
const FAVORITES_KEY = 'spontan_favorites';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80';
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80';

const DEFAULT_TRIPS = [
  {
    id: 1,
    title: '巴厘岛潜水小分队 招募一名会拍照的队友',
    description: '计划 7 月在图兰奔深潜，已有 3 人。希望找一位擅长水下摄影的朋友，一起记录这次蓝色冒险。',
    destination: '巴厘岛 · 印尼',
    tag: '潜水',
    date: '7.12 – 7.20',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    host: {
      name: '林小鱼',
      bio: '自由潜水教练 · 去过 12 个国家',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    },
  },
  {
    id: 2,
    title: '京都赏枫慢游 缺一位爱逛老铺的饭搭子',
    description: '不想赶景点，只想在岚山、祇园慢慢走。每天 1 家百年老店 + 1 处小众庭院，节奏轻松。',
    destination: '京都 · 日本',
    tag: '文化',
    date: '11.18 – 11.24',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    host: {
      name: '陈和',
      bio: '建筑系研究生 · 日式美学爱好者',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
  },
  {
    id: 3,
    title: '冰岛环岛自驾 再招 2 人分摊油费',
    description: '沿 1 号公路逆时针环岛，看瀑布、黑沙滩和极光。会开车最好，不会也可以轮流坐副驾。',
    destination: '雷克雅未克 · 冰岛',
    tag: '自驾',
    date: '2.3 – 2.12',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80',
    host: {
      name: '周远',
      bio: '摄影师 · 极光追了 5 次',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    },
  },
  {
    id: 4,
    title: '摩洛哥撒哈拉星空露营 找会吉他的人',
    description: '从马拉喀什进沙漠，骑骆驼看日落，晚上围篝火。希望有人带吉他，一起唱到星河满天。',
    destination: '梅尔祖卡 · 摩洛哥',
    tag: '露营',
    date: '10.5 – 10.11',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea274ae675?w=800&q=80',
    host: {
      name: '阿杰',
      bio: '背包客第 8 年 · 沙漠老手',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    },
  },
  {
    id: 5,
    title: '新西兰南岛徒步 缺一位体力好的搭档',
    description: '走 Milford Track 和 Routeburn，每天 15–20 km。已有装备清单，求靠谱、守时的徒步搭子。',
    destination: '皇后镇 · 新西兰',
    tag: '徒步',
    date: '3.15 – 3.25',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    host: {
      name: '苏晴',
      bio: '户外领队 · UTMB 完赛者',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    },
  },
];

const stackEl = document.getElementById('cardStack');
const counterEl = document.getElementById('counter');
const btnSkip = document.getElementById('btnSkip');
const btnJoin = document.getElementById('btnJoin');
const btnUndo = document.getElementById('btnUndo');
const btnPublish = document.getElementById('btnPublish');
const btnLikes = document.getElementById('btnLikes');
const likesBadge = document.getElementById('likesBadge');
const toastEl = document.getElementById('toast');
const modalEl = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const publishForm = document.getElementById('publishForm');
const imageInput = document.getElementById('imageInput');
const drawerEl = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const drawerClose = document.getElementById('drawerClose');
const favoritesList = document.getElementById('favoritesList');
const favoritesEmpty = document.getElementById('favoritesEmpty');
const btnAuth = document.getElementById('btnAuth');

const AUTH_TOKEN_KEY = 'spontan_token';
const AUTH_USER_KEY = 'spontan_user';

let trips = [];
let currentIndex = 0;
let isAnimating = false;
let toastTimer = null;
let nextCustomId = Date.now();

/** @type {{ lastLeftSkipped: { trip: object, index: number } | null, canUndoLeft: boolean }} */
const swipeState = {
  lastLeftSkipped: null,
  canUndoLeft: false,
};

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

function normalizeTrip(trip) {
  if (!trip || typeof trip !== 'object') return null;

  const host = trip.host && typeof trip.host === 'object' ? trip.host : {};

  return {
    id: typeof trip.id === 'number' ? trip.id : Date.now() + Math.random(),
    title: trip.title || trip.description || '未命名旅程',
    description: trip.description || trip.title || '',
    destination: trip.destination || '未知目的地',
    tag: trip.tag || '旅行',
    date: trip.date || '',
    image: trip.image || DEFAULT_IMAGE,
    custom: Boolean(trip.custom),
    host: {
      name: host.name || '旅人',
      bio: host.bio || '',
      avatar: host.avatar || DEFAULT_AVATAR,
    },
  };
}

function loadCustomTrips() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeTrip).filter(Boolean);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function saveCustomTrips(customTrips) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customTrips));
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeTrip).filter(Boolean);
  } catch {
    localStorage.removeItem(FAVORITES_KEY);
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function addToFavorites(trip) {
  const favorites = loadFavorites();
  const existing = favorites.findIndex((f) => f.id === trip.id);
  const entry = { ...trip, savedAt: Date.now() };

  if (existing >= 0) {
    favorites.splice(existing, 1);
  }
  favorites.unshift(entry);
  saveFavorites(favorites);
  updateLikesBadge();
  if (drawerEl.classList.contains('drawer--open')) {
    renderFavorites();
  }
}

function removeFromFavorites(id) {
  const favorites = loadFavorites().filter((f) => f.id !== id);
  saveFavorites(favorites);
  updateLikesBadge();
  return favorites;
}

function updateUndoButton() {
  if (!btnUndo) return;
  const visible = swipeState.canUndoLeft && swipeState.lastLeftSkipped !== null && !isAnimating;
  btnUndo.hidden = !visible;
  btnUndo.disabled = !visible;
}

function clearUndoState() {
  swipeState.lastLeftSkipped = null;
  swipeState.canUndoLeft = false;
  updateUndoButton();
}

function setLeftSkipUndo(trip, index) {
  swipeState.lastLeftSkipped = { trip, index };
  swipeState.canUndoLeft = true;
  updateUndoButton();
}

function updateLikesBadge() {
  const count = loadFavorites().length;
  if (count > 0) {
    likesBadge.textContent = count > 99 ? '99+' : count;
    likesBadge.hidden = false;
  } else {
    likesBadge.hidden = true;
  }
}

function renderFavorites() {
  const favorites = loadFavorites();
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesEmpty.classList.remove('drawer__empty--hidden');
    favoritesList.classList.add('drawer__list--hidden');
    return;
  }

  favoritesEmpty.classList.add('drawer__empty--hidden');
  favoritesList.classList.remove('drawer__list--hidden');

  favorites.forEach((trip, i) => {
    const li = document.createElement('li');
    li.className = 'fav-item';
    li.style.animationDelay = `${i * 0.05}s`;
    li.dataset.id = trip.id;
    li.innerHTML = `
      <img class="fav-item__thumb" src="${escapeHtml(trip.image)}" alt="" loading="lazy" />
      <div class="fav-item__content">
        <div class="fav-item__dest">${escapeHtml(trip.destination)}</div>
        <div class="fav-item__title">${escapeHtml(trip.title)}</div>
        <div class="fav-item__date">${escapeHtml(trip.date)}</div>
      </div>
      <button class="fav-item__remove" type="button" aria-label="取消心动">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    `;

    li.querySelector('.fav-item__remove').addEventListener('click', () => {
      li.classList.add('fav-item--removing');
      setTimeout(() => {
        removeFromFavorites(trip.id);
        renderFavorites();
        showToast(`已取消「${trip.destination}」的心动`);
      }, 280);
    });

    favoritesList.appendChild(li);
  });
}

function openDrawer() {
  renderFavorites();
  drawerEl.classList.add('drawer--open');
  drawerEl.setAttribute('aria-hidden', 'false');
  document.body.classList.add('drawer-open');
}

function closeDrawer() {
  drawerEl.classList.remove('drawer--open');
  drawerEl.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
}

function mergeTrips() {
  const customTrips = loadCustomTrips();
  customTrips.forEach((trip) => {
    if (typeof trip.id === 'number' && trip.id >= nextCustomId) {
      nextCustomId = trip.id + 1;
    }
  });
  return [...customTrips, ...DEFAULT_TRIPS];
}

function buildCustomTrip({ destination, message, date, image }) {
  const trimmedDest = destination.trim();
  const trimmedMsg = message.trim();
  const title = trimmedMsg.length > 36 ? `${trimmedMsg.slice(0, 36)}…` : trimmedMsg;

  return {
    id: nextCustomId++,
    title,
    description: trimmedMsg,
    destination: trimmedDest,
    tag: '新发布',
    date: date.trim(),
    image: image.trim() || DEFAULT_IMAGE,
    custom: true,
    host: {
      name: '我',
      bio: '刚刚发布的旅程',
      avatar: DEFAULT_AVATAR,
    },
  };
}

function createCardElement(trip, className) {
  const card = document.createElement('article');
  card.className = `card ${className}`;
  card.dataset.id = trip.id;
  card.innerHTML = `
    <div class="card__image">
      <img src="${escapeHtml(trip.image)}" alt="${escapeHtml(trip.destination)}" loading="lazy" />
      <div class="card__image-overlay"></div>
      <span class="card__destination">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        ${escapeHtml(trip.destination)}
      </span>
      <span class="card__tag">${escapeHtml(trip.tag)}</span>
    </div>
    <div class="card__body">
      <h2 class="card__title">${escapeHtml(trip.title)}</h2>
      <p class="card__desc">${escapeHtml(trip.description)}</p>
      <div class="card__meta">
        <img class="card__avatar" src="${escapeHtml(trip.host.avatar)}" alt="${escapeHtml(trip.host.name)}" />
        <div class="card__host-info">
          <div class="card__host-name">${escapeHtml(trip.host.name)}</div>
          <div class="card__host-bio">${escapeHtml(trip.host.bio)}</div>
        </div>
        <span class="card__date">${escapeHtml(trip.date)}</span>
      </div>
    </div>
  `;
  return card;
}

function showEmptyState() {
  stackEl.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon">✈️</div>
      <h2 class="empty-state__title">今日推荐已看完</h2>
      <p class="empty-state__text">休息一下，明天会有新的旅程等你</p>
    </div>
  `;
  counterEl.textContent = '—';
  btnSkip.disabled = true;
  btnJoin.disabled = true;
  updateUndoButton();
}

function updateCounter() {
  if (currentIndex >= trips.length) {
    counterEl.textContent = '—';
    return;
  }
  counterEl.textContent = `${currentIndex + 1} / ${trips.length}`;
}

function renderStack(animateEnter) {
  stackEl.innerHTML = '';

  if (currentIndex >= trips.length) {
    showEmptyState();
    return;
  }

  const nextIndex = currentIndex + 1;
  if (nextIndex < trips.length) {
    stackEl.appendChild(createCardElement(trips[nextIndex], 'card--next'));
  }

  const activeCard = createCardElement(trips[currentIndex], 'card--active');
  if (animateEnter) {
    activeCard.classList.add('card--enter');
  }
  stackEl.appendChild(activeCard);

  updateCounter();
  btnSkip.disabled = false;
  btnJoin.disabled = false;
  updateUndoButton();
}

function renderStackUndo() {
  stackEl.innerHTML = '';

  const nextIndex = currentIndex + 1;
  if (nextIndex < trips.length) {
    stackEl.appendChild(createCardElement(trips[nextIndex], 'card--next'));
  }

  const activeCard = createCardElement(trips[currentIndex], 'card--active card--undo-from-left');
  stackEl.appendChild(activeCard);

  updateCounter();
  btnSkip.disabled = true;
  btnJoin.disabled = true;
  updateUndoButton();
}

function undoLeftSkip() {
  if (!swipeState.canUndoLeft || !swipeState.lastLeftSkipped || isAnimating) return;

  isAnimating = true;

  const { trip, index } = swipeState.lastLeftSkipped;
  clearUndoState();

  currentIndex = index;
  renderStackUndo();

  showToast(`已撤回 · ${trip.destination}`);

  setTimeout(() => {
    isAnimating = false;
    renderStack(false);
  }, 520);
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('toast--visible');
  toastEl.setAttribute('aria-hidden', 'false');
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('toast--visible');
    toastEl.setAttribute('aria-hidden', 'true');
  }, 2200);
}

function swipe(direction) {
  if (isAnimating || currentIndex >= trips.length) return;

  isAnimating = true;
  btnSkip.disabled = true;
  btnJoin.disabled = true;
  updateUndoButton();

  const activeCard = stackEl.querySelector('.card--active');
  if (!activeCard) {
    isAnimating = false;
    return;
  }

  const trip = trips[currentIndex];
  const swipedIndex = currentIndex;
  const exitClass = direction === 'right' ? 'card--exit-right' : 'card--exit-left';
  activeCard.classList.remove('card--active');
  activeCard.classList.add(exitClass);

  if (direction === 'right') {
    addToFavorites(trip);
    showToast(`已加入心动墙 · ${trip.destination}`);
  }

  const nextCard = stackEl.querySelector('.card--next');
  if (nextCard) {
    nextCard.classList.remove('card--next');
    nextCard.classList.add('card--active', 'card--enter');
  }

  setTimeout(() => {
    currentIndex += 1;
    isAnimating = false;
    renderStack(true);
    if (direction === 'left') {
      setLeftSkipUndo(trip, swipedIndex);
    } else {
      clearUndoState();
    }
  }, 480);
}

function openModal() {
  modalEl.classList.add('modal--open');
  modalEl.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  imageInput.value = DEFAULT_IMAGE;
}

function closeModal() {
  modalEl.classList.remove('modal--open');
  modalEl.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function handlePublishSubmit(e) {
  e.preventDefault();

  const formData = new FormData(publishForm);
  const newTrip = buildCustomTrip({
    destination: formData.get('destination'),
    message: formData.get('message'),
    date: formData.get('date'),
    image: formData.get('image') || '',
  });

  const customTrips = loadCustomTrips();
  customTrips.unshift(newTrip);
  saveCustomTrips(customTrips);

  if (currentIndex >= trips.length) {
    trips.push(newTrip);
    currentIndex = trips.length - 1;
  } else {
    trips.splice(currentIndex + 1, 0, newTrip);
  }

  publishForm.reset();
  closeModal();
  renderStack(false);
  showToast(`「${newTrip.destination}」已发布，滑动即可看到`);
}

function initAuthUI() {
  if (!btnAuth) return;
  try {
    const user = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'null');
    if (user?.username) {
      btnAuth.textContent = user.username;
      btnAuth.href = '#';
      btnAuth.classList.add('btn-auth--user');
      btnAuth.title = '点击退出登录';
      btnAuth.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        window.location.href = 'login.html';
      });
    }
  } catch {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

function initApp() {
  try {
    trips = mergeTrips();
    if (!trips.length) trips = [...DEFAULT_TRIPS];
    updateLikesBadge();
    clearUndoState();
    renderStack(false);
  } catch (err) {
    console.error('Spontan init failed:', err);
    trips = [...DEFAULT_TRIPS];
    currentIndex = 0;
    updateLikesBadge();
    clearUndoState();
    renderStack(false);
  }
}

btnSkip.addEventListener('click', () => swipe('left'));
btnJoin.addEventListener('click', () => swipe('right'));
if (btnUndo) {
  btnUndo.addEventListener('click', (e) => {
    e.stopPropagation();
    undoLeftSkip();
  });
}
btnPublish.addEventListener('click', openModal);
btnLikes.addEventListener('click', openDrawer);
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
drawerClose.addEventListener('click', closeDrawer);
drawerBackdrop.addEventListener('click', closeDrawer);
publishForm.addEventListener('submit', handlePublishSubmit);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modalEl.classList.contains('modal--open')) {
      closeModal();
      return;
    }
    if (drawerEl.classList.contains('drawer--open')) {
      closeDrawer();
      return;
    }
  }
  if (modalEl.classList.contains('modal--open')) return;
  if (drawerEl.classList.contains('drawer--open')) return;
  if (e.key === 'ArrowLeft') swipe('left');
  if (e.key === 'ArrowRight') swipe('right');
});

initAuthUI();
initApp();
