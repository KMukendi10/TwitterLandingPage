// ---- Dark mode toggle ----
const toggle = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');
const label = document.getElementById('themeLabel');
const html = document.documentElement;

const MOON_ICON = './Assets/Light.png';
const SUN_ICON = './Assets/Dark.png';

// Get saved theme (default to light)
const savedTheme = localStorage.getItem('theme') || 'light';

// Apply theme
html.setAttribute('data-theme', savedTheme);

if (savedTheme === 'dark') {
  icon.src = SUN_ICON;
  icon.alt = 'Light mode';
  label.textContent = 'Light mode';
  toggle.setAttribute('aria-pressed', 'true');
} else {
  icon.src = MOON_ICON;
  icon.alt = 'Dark mode';
  label.textContent = 'Dark mode';
  toggle.setAttribute('aria-pressed', 'false');
}

// Toggle theme
toggle.addEventListener('click', () => {
  const dark = html.getAttribute('data-theme') === 'dark';

  if (dark) {
    html.setAttribute('data-theme', 'light');
    icon.src = MOON_ICON;
    icon.alt = 'Dark mode';
    label.textContent = 'Dark mode';
    toggle.setAttribute('aria-pressed', 'false');
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    icon.src = SUN_ICON;
    icon.alt = 'Light mode';
    label.textContent = 'Light mode';
    toggle.setAttribute('aria-pressed', 'true');
    localStorage.setItem('theme', 'dark');
  }
});

// ---- Compose: char counter + enable Post button ----
const input   = document.getElementById('composeInput');
const counter = document.getElementById('charCounter');
const postBtn = document.getElementById('postBtn');

if (input) {
  input.addEventListener('input', () => {
    const left = 280 - input.value.length;
    counter.textContent = left;
    counter.classList.toggle('counter-warn',  left <= 20);
    counter.classList.toggle('counter-danger', left <= 0);
    postBtn.disabled = input.value.trim().length === 0;
  });
}

// ---- Like toggle ----
const LIKE_ICON       = './Assets/like.svg';
const LIKE_FILLED_ICON = './Assets/like-fill.svg';

document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const liked = btn.classList.toggle('liked');
    btn.setAttribute('aria-pressed', String(liked));
    const span = btn.querySelector('span');
    const icon = btn.querySelector('img');
    icon.src = liked ? LIKE_FILLED_ICON : LIKE_ICON;
    // increment / decrement display count
    const n = parseInt(span.textContent.replace(/[^0-9]/g, '')) || 0;
    span.textContent = liked ? n + 1 : Math.max(0, n - 1);
  });
});

// ---- Retweet toggle ----
document.querySelectorAll('.retweet-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('retweeted');
    const rt = btn.classList.contains('retweeted');
    btn.setAttribute('aria-pressed', String(rt));
  });
});

// ---- Bookmark toggle ----
const BOOKMARK_ICON        = './Assets/bookmark.svg';
const BOOKMARK_FILLED_ICON = './Assets/bookmark-fill.svg';

document.querySelectorAll('.bookmark-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const saved = btn.classList.toggle('bookmarked');
    const icon = btn.querySelector('img');
    icon.src = saved ? BOOKMARK_FILLED_ICON : BOOKMARK_ICON;
  });
});

// ---- Follow button toggle ----
document.querySelectorAll('.btn-follow').forEach(btn => {
  btn.addEventListener('click', () => {
    const following = btn.classList.toggle('following');
    btn.textContent = following ? 'Following' : 'Follow';
  });
});

// ---- Open tweet modal via button (also works via href="#tweetModal") ----
const openBtn = document.getElementById('openTweetModal');
if (openBtn) {
  openBtn.addEventListener('click', () => {
    window.location.hash = '#tweetModal';
  });
}

// ---- Feed tab switch ----
document.querySelectorAll('.feed-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.feed-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-pressed', 'true');
  });
});

// ---- Tweet "more options" drop-up menu ----
function closeAllMoreMenus() {
  document.querySelectorAll('.more-wrap.open').forEach(wrap => {
    wrap.classList.remove('open');
    const btn = wrap.querySelector(':scope > button');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

document.querySelectorAll('.more-wrap').forEach(wrap => {
  const btn = wrap.querySelector(':scope > button');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // don't trigger the card/item click behind it
    const wasOpen = wrap.classList.contains('open');
    closeAllMoreMenus();
    if (!wasOpen) {
      wrap.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Close on outside click or Escape
document.addEventListener('click', closeAllMoreMenus);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllMoreMenus();
});