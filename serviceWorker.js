const thingsToAdd = [
	'/breakout',
	'/breakout/index.html',
	'/breakout/favicon.ico'
]

self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open('site').then(cache => {
			cache.addAll(thingsToAdd);
		})
	);
});
self.addEventListener("fetch", e => {
	e.respondWith((async () => {
		const r = await caches.match(e.request);
		console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
		if (r) return r;
		const response = await fetch(e.request);
		const cache = await caches.open('site');
		console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
		cache.put(e.request, response.clone());
		return response;
	}));
});
