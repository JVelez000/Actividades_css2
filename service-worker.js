// service-worker.js
self.addEventListener('install', event => {
  event.waitUntil(
  caches.open('edc-cache').then(cache => {
    return cache.addAll([
      '/Actividades_css2/',
      '/Actividades_css2/index.html',
      '/Actividades_css2/style.css',
      '/Actividades_css2/Pics/edcr.png',
      '/Actividades_css2/boletas.html',
      '/Actividades_css2/testimonios.html',
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
