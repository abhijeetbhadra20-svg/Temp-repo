# Delight by Deepa — Multi-client Website Demo

A zero-dependency, phone-friendly static demo designed as a reusable website engine.

## What is included
- `index.html` — the website shell
- `styles.css` — responsive professional design
- `app.js` — client loader + interactions
- `sw.js` — offline cache after first successful load
- `data/delight.json` — Delight by Deepa client data
- `data/blank.json` — blank client starter configuration
- `assets/` — the supplied reference images used in the demo

## Open different clients

Delight:
`index.html?client=delight`

Blank starter:
`index.html?client=blank`

For localhost, serve this folder with any simple static server. Do **not** open only `index.html` via a `file://` URL because `fetch()` and the service worker are browser security features that need a local server.

## Phone / zero-budget workflow

Use any local static server you already have on your phone (for example, a local development app or Termux). The project has no npm packages and no external fonts or CDN dependencies.

For a new client, copy `data/blank.json`, rename it (for example `client2.json`), add its data, then add one entry to `CONFIGS` inside `app.js`:

```js
const CONFIGS = {
  delight: 'data/delight.json',
  client2: 'data/client2.json'
};
```

Then open `?client=client2`.

## Offline / slow network handling

- All core UI code is local.
- Images are bundled locally, so the demo does not depend on an image CDN.
- No web fonts or third-party JS libraries are required.
- After the first successful local-server load, the service worker caches the app shell and any requested assets.
- If the network drops, an offline notice appears and the cached page continues to work.
- `prefers-reduced-motion` is respected for users who disable animations.

## Demo limitations

This is a professional **showcase/demo**, not a production checkout system yet. Product purchase, payments, inventory, order management, analytics, CMS and client authentication should be added only when a real client signs the project.
