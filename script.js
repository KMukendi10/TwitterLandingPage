// ---- Dark mode toggle (manual feature — no framework) ----
const toggle = document.getElementById('themeToggle');
const icon   = document.getElementById('themeIcon');
const label  = document.getElementById('themeLabel');
const html   = document.documentElement;

const MOON_ICON = './Assets/icons/moon.svg';
const SUN_ICON  = './Assets/icons/sun.svg';

// Persist preference
if (localStorage.getItem('theme') === 'dark') {
  html.setAttribute('data-theme', 'dark');
  icon.src = SUN_ICON;
  icon.alt = 'Light mode';
  label.textContent = 'Light mode';
  toggle.setAttribute('aria-pressed', 'true');
}

toggle.addEventListener('click', () => {
  const dark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', dark ? 'light' : 'dark');
  icon.src = dark ? MOON_ICON : SUN_ICON;
  icon.alt = dark ? 'Dark mode' : 'Light mode';
  label.textContent = dark ? 'Dark mode' : 'Light mode';
  toggle.setAttribute('aria-pressed', String(!dark));
  localStorage.setItem('theme', dark ? 'light' : 'dark');
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
  document.querySelectorAll('.tweet-more-wrap.open').forEach(wrap => {
    wrap.classList.remove('open');
    wrap.querySelector('.tweet-more').setAttribute('aria-expanded', 'false');
  });
}

document.querySelectorAll('.tweet-more-wrap').forEach(wrap => {
  const btn = wrap.querySelector('.tweet-more');
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // don't trigger the tweet-card click behind it
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