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
self.addEventListener("fetch", (e) => {
	console.log(e.request.url);
	e.respondWith(
		caches.match(e.request).then((response) => response || fetch(e.request)),
	);
});
