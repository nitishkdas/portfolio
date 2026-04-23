# AGENTS.md

## Developer Commands

```bash
npm run build:tailwind   # Build CSS once
npm run watch:tailwind # Build CSS with auto-reload
```

## Important Notes

- **Tailwind CSS is generated**: Edit `src/input.css` or `tailwind.config.js`, then run `npm run build:tailwind`. The generated `dist/output.css` is NOT source—do not edit directly.

- **Content lives in `content.json`**: All site text (name, role, about, skills, projects) is JSON-driven. No content in `index.html`.

- **No tests/lint/typecheck**: This is a simple static site. No test suite or validation scripts.

- **Fonts**: IBM Plex Sans, Inter, JetBrains Mono loaded from Google Fonts (edit `index.html` to change).

- **Entry point**: Open `index.html` directly or serve locally (`npx serve .`).