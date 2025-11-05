// @ts-nocheck
// Service Worker pour PWA BenHoops
// Note: Les erreurs TypeScript sont normales pour les Service Workers (API spécifique)

// ⚡ IMPORTANT: Incrémenter cette version à chaque déploiement force la mise à jour !
const VERSION = 'v1.1.0'; // <-- Change cette version à chaque déploiement
const CACHE_NAME = `benhoops-${VERSION}`;
const urlsToCache = ['/', '/teams', '/schedule', '/standings', '/stats', '/live'];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log(`[SW ${VERSION}] Installing...`);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`[SW ${VERSION}] Caching app shell`);
      return cache.addAll(urlsToCache);
    })
  );
  // Force le nouveau SW à devenir actif immédiatement
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log(`[SW ${VERSION}] Activating...`);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[SW ${VERSION}] Deleting old cache:`, cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Prendre le contrôle de tous les clients immédiatement
  self.clients.claim();
  
  // Notifier tous les clients qu'une nouvelle version est active
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'SW_UPDATED',
        version: VERSION,
      });
    });
  });
});

// Interception des requêtes avec stratégie intelligente
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Stratégie Network First pour les pages HTML (toujours vérifier les mises à jour)
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Mettre en cache la nouvelle version
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Si offline, utiliser le cache
          return caches.match(request);
        })
    );
    return;
  }

  // Stratégie Cache First pour les assets statiques (JS, CSS, images)
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(request).then((response) => {
        // Vérifier si réponse valide
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Cloner et mettre en cache
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'BenHoops';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'default',
    requireInteraction: false,
    actions: data.actions || [],
    data: data.data || {},
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Clic sur notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open a new window/tab with the target URL
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-matches') {
    event.waitUntil(syncMatches());
  }
});

async function syncMatches() {
  try {
    const response = await fetch('/api/matches');
    const data = await response.json();
    console.log('[SW] Synced matches:', data);
  } catch (error) {
    console.error('[SW] Sync failed:', error);
  }
}
