// service-worker.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('edc-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/Pics/logo.png',
        '/Pics/edcr.png',
        'boletas.html',
        'testimonios.html',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
