// Generated at build time by vite.config.ts.
const CACHE = 'farm-18063d604f20';
const FILES = ["./","assets/index-BowDXba-.js","assets/index-CrEEWaJB.css","icons/apple-touch-icon-120.png","icons/apple-touch-icon-152.png","icons/apple-touch-icon-167.png","icons/apple-touch-icon.png","icons/favicon-32.png","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('farm-') && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) return;
  // The page itself: network first so updates show up, cached copy when offline.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('./', { ignoreVary: true })));
    return;
  }
  // Icons straight from the network when it's there: whatever fetches the
  // home-screen icon should get the real file, not a cached hiccup.
  if (new URL(request.url).pathname.includes('/icons/')) {
    event.respondWith(fetch(request).catch(() => caches.match(request, { ignoreVary: true, ignoreSearch: true })));
    return;
  }
  // Everything else is content-hashed, so the cache is always right. Vite's
  // crossorigin scripts send an Origin header, so a Vary header on the
  // cached copy mustn't stop it matching.
  event.respondWith(caches.match(request, { ignoreVary: true }).then((hit) => hit || fetch(request)));
});
