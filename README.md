# Christopher Nolan Archive

An experimental React portfolio that presents Christopher Nolan's films as a minimalist cinematic archive. The interface uses black-and-white imagery, typographic grids, slow motion, and bilingual fragments to explore themes of time, memory, inversion, and structure.

The goal is not to build a normal movie information site. The site should feel like entering a timeline system: slow, analytical, nonlinear, and cinematic.

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

## Experience Notes

- The landing page uses a partial, low-opacity Nolan portrait with film grain and a slow zoom.
- The archive section behaves like a classified record browser: hovering a title changes the preview image and keyword field.
- Film pages reveal information gradually through full-screen scroll sections instead of showing all details at once.
- The Structure Lab is typography-only and treats film structure as an abstract visual system.
- English is the primary analytical layer; Chinese is smaller, lighter, and more interpretive.

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
- The landing portrait uses a Wikimedia Commons image of Christopher Nolan by BrokenSphere under CC BY-SA 3.0.
