/* jshint ignore:start */
var version = '113'
var cacheName = 'marko-pwa-cache-v' + version;
var dataCacheName = 'marko-pwa-data-cache-v' + version;
var staticServer = 'https://lorempixel.com';

var filesToCache = [
  '/',
  '/offline.html',
  '/service-worker.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
    .then(function() {
      self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
    .then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          return caches.delete(key);
        }
      }));
    })
    .then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(dataCacheName).then(function(cache) {
      return caches.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      }).catch(offlineFallback)
    }).catch(offlineFallback)
  )
});

var offlineFallback = function() {
  return caches.match('/offline.html');
}