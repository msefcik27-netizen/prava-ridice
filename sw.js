/* Práva řidiče — service worker (offline cache + push) */
const CACHE = 'pravaridice-v15';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Network-first for navigation, cache-first for assets */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    // no-store: obejit HTTP cache -> po commitu se vzdy natahne cerstva verze
    e.respondWith(fetch(req, { cache: 'no-store' }).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(()=>{});
      return r;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});

/* Push notifications (napojení na backend později) */
self.addEventListener('push', e => {
  let data = { title: 'Práva řidiče', body: 'Máte nové upozornění.' };
  try { if (e.data) data = e.data.json(); } catch (err) {}
  e.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [80, 40, 80],
    data: data.url || './index.html'
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data || './index.html'));
});
