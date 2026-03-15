// HSA Days Service Worker — bump version on significant deploys
const CACHE_VERSION = "2026-03-14";
const CACHE_NAME = `hsadays-v${CACHE_VERSION}`;

// App shell assets to precache
const PRECACHE_ASSETS = [
  "/",
  "/days",
  "/manifest.json",
  "/offline",
  "/icons/icon-192.png",
  "/icons/apple-touch-icon.png",
  "/illustrations/icons/icon-paw-print.png",
  "/illustrations/icons/icon-journal.png",
  "/illustrations/icons/icon-heart.png",
];

// Install: precache app shell, then activate
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Listen for SKIP_WAITING message from update notification
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Fetch: cache-first for static assets, network-first with offline fallback for navigation
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip API routes — always network
  if (url.pathname.startsWith("/api/")) return;

  // Static assets: cache-first
  if (
    url.pathname.match(/\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|svg|ico|webp)$/) ||
    url.pathname === "/manifest.json"
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          // Cache new static assets
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // Journal routes (/days, /days/*): network-first, cache on success for offline access
  if (event.request.mode === "navigate" && url.pathname.match(/^\/days(\/|$)/)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() =>
          caches
            .match(event.request)
            .then((cached) => cached || caches.match("/offline").then((c) => c || caches.match("/")))
        )
    );
    return;
  }

  // Other navigation requests: network-first with offline fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match("/offline").then((cached) => cached || caches.match("/"))
      )
    );
    return;
  }

  // Everything else: network only
});
