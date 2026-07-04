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
const input = document.getElementById('composeInput');
const counter = document.getElementById('charCounter');
const postBtn = document.getElementById('postBtn');

if (input) {
  input.addEventListener('input', () => {
    const left = 280 - input.value.length;
    counter.textContent = left;
    counter.classList.toggle('counter-warn', left <= 20);
    counter.classList.toggle('counter-danger', left <= 0);
    postBtn.disabled = input.value.trim().length === 0;
  });
}

// ---- Like toggle ----
const LIKE_ICON = './Assets/like.svg';
const LIKE_FILLED_ICON = './Assets/like-fill.svg';

function wireLikeButton(btn) {
  if (!btn) return;
  btn.addEventListener('click', () => {
    const liked = btn.classList.toggle('liked');
    btn.setAttribute('aria-pressed', String(liked));
    const span = btn.querySelector('span');
    const iconEl = btn.querySelector('img');
    
    if (iconEl) iconEl.src = liked ? LIKE_FILLED_ICON : LIKE_ICON;
    
    // increment / decrement display count
    if (span) {
      const n = parseInt(span.textContent.replace(/[^0-9]/g, '')) || 0;
      span.textContent = liked ? n + 1 : Math.max(0, n - 1);
    }
  });
}
document.querySelectorAll('.like-btn').forEach(wireLikeButton);

// ---- Retweet toggle ----
function wireRetweetButton(btn) {
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('retweeted');
    const rt = btn.classList.contains('retweeted');
    btn.setAttribute('aria-pressed', String(rt));
  });
}
document.querySelectorAll('.retweet-btn').forEach(wireRetweetButton);

// ---- Bookmark toggle ----
const BOOKMARK_ICON = './Assets/bookmark.svg';
const BOOKMARK_FILLED_ICON = './Assets/bookmark-fill.svg';

function wireBookmarkButton(btn) {
  if (!btn) return;
  btn.addEventListener('click', () => {
    const saved = btn.classList.toggle('bookmarked');
    const iconEl = btn.querySelector('img');
    if (iconEl) iconEl.src = saved ? BOOKMARK_FILLED_ICON : BOOKMARK_ICON;
  });
}
document.querySelectorAll('.bookmark-btn').forEach(wireBookmarkButton);

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

function wireMoreWrap(wrap) {
  if (!wrap) return;
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
}
document.querySelectorAll('.more-wrap').forEach(wireMoreWrap);

// Close on outside click or Escape
document.addEventListener('click', closeAllMoreMenus);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllMoreMenus();
});

// ============================================================
// ---- NEW: Actually posting a tweet ----
// ============================================================

const feedList = document.querySelector('.feed-list');

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function createTweetElement(text) {
  const article = document.createElement('article');
  article.className = 'tweet';
  article.setAttribute('aria-label', 'Tweet by Kazadi Mukendi');

  const safeText = escapeHtml(text).replace(/\n/g, '<br>');

  article.innerHTML = `
    <div class="tweet-avatar-col">
      <img src="./Assets/ProfilePic.jpg" alt="Kazadi Mukendi avatar" class="tweet-avatar" />
    </div>
    <div class="tweet-body">
      <div class="tweet-header">
        <span class="tweet-name">Kazadi Mukendi</span>
        <span class="tweet-handle">@kazadi_dev</span>
        <span class="tweet-dot">·</span>
        <span class="tweet-time">now</span>
        <div class="tweet-more-wrap more-wrap">
          <button class="tweet-more" aria-label="More options" aria-haspopup="true" aria-expanded="false">
            <img src="./Assets/more2.svg" alt="More">
          </button>
          <div class="more-menu" role="menu">
            <button class="menu-item" role="menuitem">Not interested in this post</button>
            <button class="menu-item menu-item-danger" role="menuitem">Delete post</button>
          </div>
        </div>
      </div>
      <p class="tweet-text">${safeText}</p>
      <div class="tweet-actions">
        <button class="action-btn reply-btn" aria-label="Comment">
          <img src="./Assets/comment.svg" alt="Comment"><span>0</span>
        </button>
        <button class="action-btn retweet-btn" aria-label="Repost">
          <img src="./Assets/retweet.svg" alt="Repost"><span>0</span>
        </button>
        <button class="action-btn like-btn" aria-label="Like" aria-pressed="false">
          <img src="./Assets/like.svg" alt="Like"><span>0</span>
        </button>
        <button class="action-btn view-btn" aria-label="Views">
          <img src="./Assets/view.svg" alt="Views"><span>1</span>
        </button>
        <button class="action-btn bookmark-btn" aria-label="Bookmark">
          <img src="./Assets/bookmarks.svg" alt="Bookmark">
        </button>
        <button class="action-btn share-btn" aria-label="Share">
          <img src="./Assets/share.svg" alt="Share">
        </button>
      </div>
    </div>
  `;

  // Wire up the new tweet's buttons exactly like the original ones
  wireLikeButton(article.querySelector('.like-btn'));
  wireRetweetButton(article.querySelector('.retweet-btn'));
  wireBookmarkButton(article.querySelector('.bookmark-btn'));
  wireMoreWrap(article.querySelector('.more-wrap'));

  return article;
}

function postTweet(text) {
  const trimmed = text.trim();
  if (!trimmed || !feedList) return;
  const tweetEl = createTweetElement(trimmed);
  feedList.insertBefore(tweetEl, feedList.firstChild);
}

// ---- Wire up the inline compose box ----
if (input && postBtn) {
  postBtn.addEventListener('click', () => {
    postTweet(input.value);
    input.value = '';
    input.style.height = '';
    counter.textContent = '280';
    counter.classList.remove('counter-warn', 'counter-danger');
    postBtn.disabled = true;
  });
}

// ---- Wire up the modal compose box ----
const modalInput = document.querySelector('#tweetModal .modal-input');
const modalCounter = document.querySelector('#tweetModal .char-counter');
const modalPostBtn = document.querySelector('#tweetModal .btn-post');

if (modalInput && modalCounter) {
  modalCounter.textContent = '280';
  modalInput.addEventListener('input', () => {
    const left = 280 - modalInput.value.length;
    modalCounter.textContent = left;
    modalCounter.classList.toggle('counter-warn', left <= 20);
    modalCounter.classList.toggle('counter-danger', left <= 0);
  });
}

if (modalInput && modalPostBtn) {
  modalPostBtn.addEventListener('click', () => {
    if (!modalInput.value.trim()) return;
    postTweet(modalInput.value);
    modalInput.value = '';
    if (modalCounter) {
      modalCounter.textContent = '280';
      modalCounter.classList.remove('counter-warn', 'counter-danger');
    }
    // close the modal (it's shown via the :target CSS trick)
    history.replaceState(null, '', window.location.pathname + window.location.search);
  });
}