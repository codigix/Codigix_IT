// Loaded from index.html <head>. Kept out of inline <script> tags and onload=""
// attributes so the Content-Security-Policy can block all inline scripts.

// Non-blocking web fonts: the stylesheets start as media="print" and switch on once loaded
document.querySelectorAll('link[data-async-style]').forEach(function (link) {
  var enable = function () { link.media = 'all'; };
  if (link.sheet) enable();
  else link.addEventListener('load', enable);
});

// Google Tag Manager
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-NXZPTHFH');

// Google tag (gtag.js); src/utils/analytics.js calls window.gtag for page views
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-T3T20910VX');
