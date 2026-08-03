# my-site

A minimal static site — plain HTML/CSS/JS, no build tools, no frameworks, no npm dependencies. Built to be served directly by GitHub Pages.

## Structure

```
index.html              homepage
posts/                  one plain .html file per case-study article
  sample-post.html       dummy post proving layout + language toggle work
assets/
  css/
    main.css             single shared stylesheet for the whole site
  js/
    lang-toggle.js       small script powering the header language toggle
README.md
```

## Language toggle (zh / en)

Every page ships both languages at once, in two blocks:

```html
<section class="en"> ... English content ... </section>
<section class="zh"> ... 中文內容 ... </section>
```

The `<html>` element carries `data-lang="en"` or `data-lang="zh"`. In `main.css`, whichever block doesn't match `data-lang` is hidden:

```css
[data-lang="en"] .zh { display: none; }
[data-lang="zh"] .en { display: none; }
```

The header button (class `lang-toggle`) is wired up by `assets/js/lang-toggle.js`: on click it flips the `data-lang` attribute, updates the button label, and remembers the choice in `localStorage` so it persists across pages. No page reload, no separate `/en` or `/zh` URLs — this is the simple first-version approach; a URL-based i18n setup can replace it later if needed.

## Adding a new post

1. Copy `posts/sample-post.html` to `posts/your-post-slug.html`.
2. Update the `<title>`.
3. Edit the text inside both `<section class="en">` and `<section class="zh">`.
4. Add a link to it from `index.html`'s post list (and cross-link from other posts if relevant).
5. Keep paths relative — files inside `posts/` reference `../assets/...` and `../index.html`, not root-relative paths.

## Publishing with GitHub Pages

This repo is set up to be served straight from the root of the default branch, no build step required.

1. Go to the repo's **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**.
4. Save. GitHub will publish `index.html` and everything else in this repo as-is.

An alternative would be moving everything into a `/docs` folder and pointing Pages at `/docs` instead. That is **not** what this repo uses — root is simpler for a single-purpose site — but it's a valid option if you later want the repo root to hold non-site files too.
