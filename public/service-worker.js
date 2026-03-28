const CACHE_NAME = "admin-dashboard-v2"; // 🔥 change version on updates

const urlsToCache = [
  "/",
  "/admin",
  "/notification.mp3"
];

// ✅ INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("🗄️ Caching app shell");

      for (const url of urlsToCache) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn(`⚠️ Failed to cache ${url}:`, err);
        }
      }
    })
  );
});

// ✅ ACTIVATE
self.addEventListener("activate", (event) => {
  self.clients.claim();

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log("🧹 Deleting old cache:", key);
            return caches.delete(key);
          })
      )
    )
  );
});

// ✅ FETCH (🔥 better strategy)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // update cache in background
        const cloned = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, cloned);
        });
        return networkResponse;
      })
      .catch(() => {
        // fallback to cache
        return caches.match(event.request);
      })
  );
});