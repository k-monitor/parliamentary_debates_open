/* Kill switch for the service worker the retired app registered.
 *
 * The old app used a Workbox precache service worker, so browsers that visited
 * parlament.k-monitor.hu before the shutdown would keep serving the cached app
 * shell and never see the redirect. This replacement takes over, drops every
 * cache, unregisters itself and reloads open tabs so they hit the network (and
 * therefore the redirect page). It must stay at /service-worker.js — that is
 * the URL the old registration polls for updates.
 */

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            return caches.delete(key);
          })
        );
      })
      .then(function () {
        return self.registration.unregister();
      })
      .then(function () {
        return self.clients.matchAll({ type: "window" });
      })
      .then(function (clients) {
        clients.forEach(function (client) {
          if (client.navigate) {
            client.navigate(client.url);
          }
        });
      })
  );
});

// Never serve anything from cache while this worker is still in control.
self.addEventListener("fetch", function (event) {
  event.respondWith(fetch(event.request));
});
