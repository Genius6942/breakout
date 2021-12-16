// Files to cache
const cacheName = 'breakout-v1';
const appShellFiles = [
 	'/breakout/',
	'/breakout/index.html',
	
];

const gamesImages = [];
// Installing Service Worker
self.addEventListener('install', (e) => {
  	console.log('[Service Worker] Install');
  	e.waitUntil((async () => {
		const cache = await caches.open(cacheName);
		await cache.addAll(appShellFiles);
  	})());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
	e.respondWith((async () => {
		const r = await caches.match(e.request);
		console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
		if (r) return r;
		const response = await fetch(e.request);
		const cache = await caches.open(cacheName);
		console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
		cache.put(e.request, response.clone());
		return response;
	})());
});
