<!--
Short, actionable instructions for AI coding assistants working on this repository.
Keep this file concise (~20-50 lines). Reference specific files and patterns below.
-->

# ArcHoops — Copilot Instructions

This is a small, static landing-site repository (single-page marketing site + pitch page). The goal of edits should be conservative and focused: update copy, tweak styles, or add small JS interactions unless a larger refactor is requested.

Key facts and where to look
- Main entry: `index.html` — the single-page landing markup (sections identified by id attributes like `#hero`, `#learning-model`, `#demo`, etc.).
- Styling: root `styles.css` is the compiled stylesheet served by the site. Source SCSS: `site-assets/sass/main.scss` and partials in `site-assets/sass/libs/`.
- Images: `site-assets/images/` holds site images referenced directly from HTML.
- Fonts: `webfonts/` contains local font site-assets.
- JS: `site-assets/js/` contains `jquery.min.js`, `main.js`, `util.js`, and small libs; maintain the existing load order — jQuery first, plugins, then `main.js`.
- Pitch page: `pitch.html` — separate static page for the pitch deck.

Project conventions and patterns
- This repo uses an HTML5 UP template (see `README.txt` header). Many sections are left commented-out in `index.html`. Avoid deleting commented sections unless instructed.
- Asset paths are relative and rooted at the repo root (e.g., `<link href="styles.css">`, `<img src="site-assets/images/...">`).
- If editing styles prefer updating `site-assets/sass/main.scss` and compiling to `styles.css` (see workflow below) so changes remain maintainable.

Developer workflows (discoverable / recommended)
- Quick local test (static): run a simple static server from repo root and open `http://localhost:8000`.
  - Example (macOS / bash):
    ```bash
    python3 -m http.server 8000
    open http://localhost:8000
    ```
- Compile SCSS -> CSS (if you change `site-assets/sass/*.scss`):
  - Example using Dart Sass (install `sass` if needed):
    ```bash
    sass site-assets/sass/main.scss:styles.css --no-source-map
    ```
  - Note: `index.html` links `styles.css` in the repo root, so compile output should overwrite that file.

Integration & external dependencies
- FontAwesome: a kit script is injected in `index.html` (external). There is also a local `site-assets/css/fontawesome-all.min.css` asset — be careful when changing icons or removing the kit.
- Embedded content: YouTube iframe in `#demo`, and an outbound Google Forms link for signups. These are external by design and not served from repo.

Guidance for AI edits
- Prefer small, explicit diffs that modify one concern at a time (content, styles, or behavior).
- Keep the site static — avoid introducing server-side code unless explicitly requested. If adding a build toolchain, include a short README section and a minimal `package.json`/task so humans can reproduce builds.
- Preserve existing ordering of JS includes and the large commented blocks in `index.html` unless asked to remove them.
- When changing copy, update only the relevant text nodes in `index.html` or `pitch.html` and ensure links (e.g., contact email, survey URL) remain intact unless the change is intentional.

Files to check when editing
- `index.html` (landing page)
- `pitch.html` (pitch deck page)
- `styles.css` (served stylesheet)
- `site-assets/sass/main.scss` + `site-assets/sass/libs/` (style sources)
- `site-assets/js/main.js` and `site-assets/js/util.js` (site behavior)
- `site-assets/images/` and `webfonts/` for media and fonts

If anything here is unclear or you want the AI to follow a stricter style or commit convention (commit message prefix, branching rules, formatting), tell us and I will incorporate it.

---
Please review and tell me if you'd like stricter rules (linting, formatting, or CI) or additional examples (e.g., how to add a new section and nav link).
