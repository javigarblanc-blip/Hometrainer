// Umbral: primero la red y, sin conexión, la caché. Sube CACHE en cada versión.
const CACHE = 'umbral-v33';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'nosleep.mp4', 'nosleep.webm',
  'mascota/saludo.webp', 'mascota/esfuerzo.webp', 'mascota/logro.webp', 'mascota/descanso.webp', 'mascota/entrenador.webp', 'mascota/avatar.webp', 'mascota/bebe.webp', 'mascota/puerto.webp', 'mascota/cable.webp', 'mascota/meta.webp'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    // no-cache: pregunta siempre al servidor (GitHub Pages guarda 10 min en la caché del navegador)
    fetch(r, {cache:'no-cache'}).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r).then(m => m || caches.match('index.html')))
  );
});
