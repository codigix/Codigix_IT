// Pages built by scripts/prerender.mjs ship their rendered HTML inside #root so
// crawlers that don't run JavaScript see the full text. Capture it before React
// mounts so App can keep showing it (instead of a loading screen) until the
// route's code has loaded.
const root = typeof document !== 'undefined' ? document.getElementById('root') : null;

export const prerendered =
  root && root.firstElementChild
    ? { html: root.innerHTML, path: window.location.pathname }
    : null;
