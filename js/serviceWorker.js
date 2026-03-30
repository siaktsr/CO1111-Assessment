const cacheName = 'Treasure-Hunt-Game-3RussiansAndME';
const filesToCache = [
    '/',
    '/html/index.html',
    '/html/app.html',
    '/html/team.html',
    '/html/questions.html',
    '/html/leaderboard.html',
    '/css/index.css',
    '/css/app.css',
    '/css/team.css',
    '/css/questions.css',
    '/css/leaderboard.css',
    '/js/api.js',
    '/js/app.js',
    '/js/Geolocation.js',
    '/js/index.js',
    '/js/leaderboard.js',
    '/js/loader.js',
    '/js/main.js',
    '/js/modals.js',
    '/js/questions.js',
    '/js/resumeSession.js',
    '/js/score.js',
    '/js/serviceWorker.js',
    '/media/photo/cookies.png',
    '/media/photo/Facebook_icon.png',
    '/media/photo/pirate-hat.png',
    '/media/photo/X_icon.png',
    '/media/photo/Instagram_icon.png',
    '/media/photo/cookies.png'
];
//Start the service worker and cache all of the app's content.
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});
//Define which content to retrieve when the app is offline.
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
        })
    );
});