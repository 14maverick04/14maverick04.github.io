# 14maverick04.github.io

Personal website of Jerin Thomas, built with [Hugo](https://gohugo.io) and the
[Anatole](https://github.com/lxndrblz/anatole) theme, deployed to GitHub Pages
at [www.jerinthomas.in](https://www.jerinthomas.in).

Notes ("Notables") live under `content/note/`. There are two ways to author
one: a plain Markdown note, or a [Quarto](https://quarto.org) note when you want
executable code, callouts, or math.

## Prerequisites

- **Hugo** `0.108.0` (extended) — matches the version pinned in CI
  (`.github/workflows/cd.yaml`). Newer Hugo drops the SCSS API the theme uses.
- **Quarto** `1.10.x` — only needed for `.qmd` notes.
- **Python 3 + Jupyter** (`pip install jupyter`) — only needed if a `.qmd`
  note runs Python code chunks.

## Local preview

```bash
# Plain Markdown only:
hugo server -D          # -D includes drafts

# With Quarto notes (renders .qmd, then runs hugo server with live reload):
quarto preview
```

Open the printed `http://localhost:<port>/` URL.

---

## Creating a simple note (plain Markdown)

1. Create a Markdown file under `content/note/`, e.g.
   `content/note/My-Note.md`.

2. Add front matter and content. Match the existing notes:

   ```markdown
   ---
   title: 'My Note'
   date: 2026-07-30T12:00:00-04:00
   draft: false          # set true while drafting; it won't publish
   image: '/images/profile.jpg'
   tags: ["example"]
   ---

   ## Section

   Write standard Markdown here. Fenced code blocks render as static,
   syntax-highlighted code (they do **not** execute).
   ```

   > Math (`$$...$$`) is already enabled site-wide via `[params.math]` in
   > `config.toml` — no per-note flag needed.

3. Preview: `hugo server -D`, then open the note under `/note/my-note/`.

4. When ready to publish, set `draft: false` and commit. Pushing to `main`
   deploys automatically.

---

## Creating a note with Quarto (`.qmd`)

Use this when you want **executable code**, **callouts**, cross-references, or
richer authoring. Quarto renders the `.qmd` (running any code) into a plain
`.md`, which Hugo then builds — Quarto is a pre-processor, not a replacement.

> **Note:** Quarto executes **Python, R, Julia, and Observable JS** — *not* Go.
> A Go block in a `.qmd` stays a static code block. Code runs at **render
> time** (its output is baked into the page); there is no in-browser "Run"
> button on the published site.

1. Create a `.qmd` file under `content/note/`, e.g.
   `content/note/My-Quarto-Note.qmd`. Use the same front matter as above.

2. Add an executable code chunk with the `{language}` syntax and, optionally,
   a callout:

   ````markdown
   ## Executable code

   ```{python}
   #| label: demo
   print(2 ** 10)
   ```

   ::: {.callout-note}
   This renders as a styled note box.
   :::
   ````

   The chunk's output (`1024`) is captured during render and embedded in the
   generated page.

3. Preview with live reload:

   ```bash
   quarto preview
   ```

   Edit the `.qmd` and save — Quarto re-executes the code and the browser
   refreshes with the new output.

4. Build once (what CI does): `quarto render` produces a sibling `.md`, then
   `hugo` builds the site.

`content/note/sample-quarto.qmd` is a working reference for all three
features (callout, math, Python). It's a `draft`, so delete it once you have
real content.

---

## How it fits together

- `quarto render` → executes `.qmd` code → writes plain `.md`
- `hugo` → builds `public/` from all `.md` (Quarto-generated and hand-written)
- CI (`.github/workflows/cd.yaml`) runs both on push to `main` and deploys
  `public/` to the `gh-pages` branch. Generated output (`public/`,
  `resources/`, `.quarto/`, `_freeze/`, and Quarto's `.md` from a `.qmd`) is
  gitignored and rebuilt by CI.
