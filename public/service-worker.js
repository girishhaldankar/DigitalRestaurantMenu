const CACHE_NAME = "restaurant-pwa-v4"; // 🔥 bump version on every deploy

const STATIC_FILES = [
  "/",
  "/index.html",
  "/icons/icon-192-v3.png",
  "/icons/icon-512-v3.png"
];

/* =========================
   INSTALL
   ========================= */
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("📦 Caching static files");

      for (const file of STATIC_FILES) {
        try {
          await cache.add(file);
        } catch (err) {
          console.warn("❌ Failed to cache:", file);
        }
      }
    })
  );
});

/* =========================
   ACTIVATE
   ========================= */
self.addEventListener("activate", (event) => {
  self.clients.claim();

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log("🧹 Removing old cache:", key);
            return caches.delete(key);
          })
      )
    )
  );
});

/* =========================
   FETCH
   ========================= */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ❌ VERY IMPORTANT: skip non-GET (fix POST error)
  if (req.method !== "GET") return;

  // ❌ Skip external APIs (VERY IMPORTANT)
  if (
    req.url.includes("firestore") ||
    req.url.includes("googleapis") ||
    req.url.includes("razorpay") ||
    req.url.includes("checkout") ||
    req.url.includes("analytics")
  ) {
    return;
  }

  // 🖼️ IMAGES → Cache First
  if (req.destination === "image") {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;

        return fetch(req)
          .then((res) => {
            // ❌ do not cache bad responses
            if (!res || res.status !== 200) return res;

            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, clone);
            });

            return res;
          })
          .catch(() => {
            // fallback image (optional)
            return caches.match("/icons/icon-192-v3.png");
          });
      })
    );
    return;
  }

  // 📄 HTML / JS / CSS → Network First
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (!res || res.status !== 200) return res;

        const clone = res.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, clone);
        });

        return res;
      })
      .catch(() => {
        return caches.match(req).then((cached) => {
          return cached || caches.match("/index.html");
        });
      })
  );
});