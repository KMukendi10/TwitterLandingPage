# Kazadi X 🐦

A pixel-close clone of the X (Twitter) home timeline, built as a solo project for the Zaio *Project Simulation — Solo Twitter Project* course. Fully responsive from a 4K monitor down to an old Android phone, with a working post composer, dark mode, and an Explore page.

**Live demo:** _add your Netlify link here_
**Loom walkthrough:** _add your Loom link here_

---

## ✨ Features

### Base clone
- Three-column responsive layout: left navigation, main timeline feed, right sidebar
- Tweet feed with avatars, verified badges, images, and like / retweet / bookmark / reply / view actions
- Compose box with a live 280-character counter and a disabled-until-typed Post button
- Right sidebar: search, Subscribe to Premium widget, trending topics, and "Who to follow"
- "More options" dropdown menus on tweets, trends, and widgets
- Fully responsive:
  - **4K / ≥1600px** — wide sidebar with full labels
  - **≤1280px** — left nav collapses to icons only
  - **≤990px** — right sidebar hides
  - **≤700px** — mobile top bar + bottom nav + floating compose button

### 🌙 Dark mode toggle (custom feature, built without AI assistance)
Toggle in the right sidebar swaps the entire color scheme via a `data-theme` attribute and CSS custom properties, persists the choice in `localStorage`, and inverts flat SVG icons with a CSS filter so they stay visible in both themes.

### 📝 Tweet compose modal (Cursor-assisted)
Clicking **Post** opens a compose modal using a pure CSS `:target` trick (no JS needed to open/close it). Extended with custom JS for a working character counter and an actual post action.

### 🔎 Explore page (Cursor-assisted)
A second page (`explore.html`) with its own search header, filter tabs (For you / Trending / News / Sports / Entertainment), story cards, and a trending list, reusing the same design system as the home feed.

### Fully functional posting
Posting from either the inline compose box or the modal actually inserts a new tweet at the top of the feed — complete with working like, retweet, and bookmark buttons — rather than just looking like it works.

---

## 🛠️ Tech stack
- HTML5
- CSS3 (custom properties / variables for theming, Flexbox layout, media queries)
- Vanilla JavaScript (no frameworks or build tools)

---

## 📁 Project structure
```
├── index.html        # Home timeline
├── explore.html       # Explore page
├── style.css          # All styling, theming, and responsive breakpoints
├── script.js          # Dark mode, compose/post logic, tweet interactions, dropdowns
└── Assets/            # Icons, avatars, and images
```

---

## 🚀 Getting started locally

1. Clone or download this repository.
2. Open `index.html` directly in a browser — no build step or server required.
   - Or, for best results, serve it with a simple local server, e.g.:
     ```bash
     npx serve .
     ```

---

## ☁️ Deployment
Deployed as a static site on [Netlify](https://www.netlify.com/). Since everything is plain HTML/CSS/JS with relative asset paths, it can be deployed by simply dragging the project folder into Netlify or connecting the repo for continuous deployment.

---

## 🎓 Course context
Built for the Zaio [Solo Twitter Project](https://www.zaio.io/app/course/Project%20Simulation%20-%20Solo%20Twitter%20Project/61e56bcceb846b939f8db978) simulation, combining a hand-built base clone with one manual feature and two Cursor-assisted features.

## 👤 Author
**Kazadi Mukendi** — [@kazadi_dev](#)