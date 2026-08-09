// BANG! Dice — offline service worker
const CACHE = 'bang-dice-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-bang-96.png',
  './icons/icon-bang-180.png',
  './icons/icon-bang-192.png',
  './icons/icon-bang-512.png',
  './icons/icon-bang-maskable-512.png',
  './icons/icon-die-96.png',
  './icons/icon-die-180.png',
  './icons/icon-die-192.png',
  './icons/icon-die-512.png',
  './icons/icon-die-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Navigations: network first so updates land, cache as the offline fallback.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Everything else: cache first.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => hit))
  );
});
