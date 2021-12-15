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
self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
	    caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request);
	    })
	);
});
