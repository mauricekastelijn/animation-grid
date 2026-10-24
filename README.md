# Pixel Cabinet

A pocket-sized universe of original animated pixel art. A 16×16 RGB matrix plays seven-second scenes indefinitely in a no-repeat shuffle, with fresh procedural variation on subsequent plays.

**GitHub Pages address once deployed:** https://mauricekastelijn.github.io/animation-grid/

## Features

- 328 scenes: 60 original scenes plus 268 adapted CC0 art scenes, with 944 imported source frames. Animals, robots, space, objects, landscapes, patterns, scrolling words, fantasy creatures and characters.
- Walking and hopping sprites, blinking, particle systems, steam, fire, fireworks, rain, parallax, waves, warping, and kaleidoscopic colour fields.
- Responsive LED cabinet with round LEDs or square pixels, adjustable brightness and glow.
- Animated gallery, category filters, search, saved favorites, shuffle or sequential playback, previous/next, pause, fullscreen, and distraction-free display mode.
- Custom scrolling messages (up to 60 characters, Latin A–Z, digits and basic punctuation; unsupported characters become question marks).
- Optional screen wake lock where supported. Favorites and appearance settings stay in browser storage.
- Static HTML/CSS/ES modules; no build, backend, API key, remote font, CDN, or runtime dependencies.

## Run

Use a static server, for example `python3 -m http.server 3000`, and open http://localhost:3000. ES modules require HTTP rather than opening index.html directly.

Run tests with Node 22+: `npm test`.

## Publish on GitHub Pages

1. Create a **public** repository named `animation-grid` under `mauricekastelijn`.
2. Push this folder to its `main` branch.
3. Under **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. Run the included **Test and deploy Pixel Cabinet** workflow, or push a commit. The workflow tests all scenes and publishes only the five web files.

Alternatively, select **Deploy from a branch → main → /(root)** to serve the app without Actions.

## Controls

Space: pause/resume · Left/Right: previous/next · F: fullscreen · Esc: leave display mode. Settings and filters work by touch. Display mode fits the matrix to the screen. Autoplay starts immediately; muted animations have no audio. Playback pauses when the tab is hidden and resumes on return. Each visible scene runs for seven seconds; manual navigation restarts its timer.

## Extend the collection

`engine.js` owns the 256-pixel RGB buffer, drawing primitives, 3×5 font and shuffle bag. `scenes.js` owns the original sprite art and animation recipes. Each scene has `{ id, name, category, draw(grid, elapsedSeconds, seed, customMessage) }`. Render with the supplied elapsed time and seed rather than wall-clock or unseeded randomness to keep frame generation deterministic. Animations run at 30 FPS; visible thumbnails update at 4 FPS. Offscreen thumbnails do not animate.

Add a scene with `add(id, title, category, draw)`. Coordinates outside the 16×16 grid are clipped. Bigger virtual worlds can pan across the grid by offsetting their drawing coordinates. Each new play gets a different seed. `catalog.js` adds imported frame artwork from `catalog-data.js`; `tools/import-art.py` rebuilds it from source downloads. Procedural effects run locally; this app does not call an AI service while playing.

## License

Code, original artwork and choreography: MIT. Imported art: CC0, with credits and source links in [CREDITS.md](./CREDITS.md) and original licence notices in `licenses/`. The supplied reference photographs inspired the LED presentation; photographs are not redistributed.
