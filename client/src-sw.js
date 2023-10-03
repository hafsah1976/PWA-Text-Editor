// Import necessary Workbox modules
const {offlineFallback, warmStrategyCache} = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route resources defined in the service worker manifest
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name for the cache
  plugins: [
    // Cache responses with status codes 0 (offline) and 200 (successful)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set expiration time for cached pages (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days in seconds
    }),
  ],
});

// Warm the cache by specifying URLs to be cached immediately
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to cache
  strategy: pageCache,
});

// Register a route for navigation requests (e.g., HTML pages) using the CacheFirst strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Asset caching
registerRoute(
  // Match specific asset requests (stylesheets, scripts, and worker files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // Cache name for assets
    plugins: [
      // Cache responses with status codes 0 (offline) and 200 (successful)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

