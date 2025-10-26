// Service Worker untuk PAUD HI
const CACHE_NAME = 'paud-hi-v1.0.1';
const STATIC_CACHE = 'paud-hi-static-v1.0.1';
const DYNAMIC_CACHE = 'paud-hi-dynamic-v1.0.1';

// Assets yang akan di-cache saat install
const STATIC_ASSETS = [
  '/index.html',
  '/manifest.json'
];

// Assets yang akan di-cache secara dinamis
const DYNAMIC_ASSETS = [
  '/api/news',
  '/api/faq',
  '/api/ran-paud',
  '/api/pembelajaran'
];

// Install event - cache static assets (robust)
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(STATIC_CACHE);
      for (const url of STATIC_ASSETS) {
        const resp = await fetch(url, { cache: 'no-cache' });
        if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.status}`);
        await cache.put(url, resp.clone());
      }
      console.log('✅ Static assets cached successfully');
      await self.skipWaiting();
    } catch (error) {
      console.error('❌ Failed to cache static assets:', error);
    }
  })());
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Hapus cache lama yang tidak digunakan
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip service worker for development or problematic requests
  if (url.pathname.includes('.jsx') || url.pathname.includes('.js') && !url.pathname.includes('node_modules')) {
    return; // Let browser handle these requests normally
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    // Static assets - cache first strategy
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isApiRequest(request)) {
    // API requests - network first with cache fallback
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else if (isImageRequest(request)) {
    // Images - cache first with network fallback
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else {
    // Other requests - network first
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);
}

function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/');
}

function isImageRequest(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/);
}

// Cache first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('📦 Serving from cache:', request.url);
      return cachedResponse;
    }

    const networkResponse = await fetch(request, { cache: 'no-cache' });
    if (networkResponse.ok) {
      const ct = networkResponse.headers.get('content-type') || '';
      // Hindari meng-cache HTML untuk permintaan aset/gambar
      if (!ct.includes('text/html')) {
        const cache = await caches.open(cacheName);
        await cache.put(request, networkResponse.clone());
        console.log('💾 Cached new resource:', request.url);
      } else {
        console.warn('↩️ Skip caching (HTML detected for asset):', request.url);
      }
    }
    return networkResponse;
  } catch (error) {
    console.error('❌ Cache first failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request, { cache: 'no-cache' });
    if (networkResponse.ok) {
      const ct = networkResponse.headers.get('content-type') || '';
      if (!ct.includes('text/html')) {
        const cache = await caches.open(cacheName);
        await cache.put(request, networkResponse.clone());
        console.log('🌐 Network response cached:', request.url);
      } else {
        console.warn('↩️ Skip caching network response (HTML):', request.url);
      }
    }
    return networkResponse;
  } catch (error) {
    console.log('📦 Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Background sync untuk offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implementasi sync untuk data yang gagal dikirim saat offline
  console.log('🔄 Performing background sync...');
}

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/logo.png',
      badge: '/logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Lihat Detail',
          icon: '/logo.png'
        },
        {
          action: 'close',
          title: 'Tutup',
          icon: '/logo.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler untuk komunikasi dengan main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('🔧 Service Worker loaded successfully');
