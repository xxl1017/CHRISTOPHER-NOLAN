# Christopher Nolan Archive

An experimental React portfolio that presents Christopher Nolan's films as a minimalist cinematic archive. The interface uses black-and-white imagery, typographic grids, subtle motion, and bilingual labels to explore themes of time, memory, inversion, and structure.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Motion
- React Router

## Project Structure

```text
public/
  memento.jpg
  tenet.jpg
src/
  App.tsx      Main routes, pages, archive data, and audio player
  index.css    Tailwind import, theme tokens, grid, and texture styles
  main.tsx     React entry point
```

## Routes

- `/#/` - Home archive page
- `/#/film/following`
- `/#/film/memento`
- `/#/film/inception`
- `/#/film/interstellar`
- `/#/film/tenet`

The app uses `HashRouter` so deep links work on static hosting without server-side rewrite rules.

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run TypeScript checks:

```bash
npm run lint
```

Clean the build output:

```bash
npm run clean
```

## Notes

- The app currently depends on several external media URLs from Unsplash and Suno, so a network connection is required for the complete visual and audio experience.
- `public/memento.jpg` and `public/tenet.jpg` are local assets used by both archive cards and detail pages.
- No Gemini API key or backend server is required.
