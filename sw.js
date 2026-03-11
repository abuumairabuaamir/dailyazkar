const CACHE_NAME = 'daily-azkar-v3';

// Yahan humne aapki saari files ka naam likh diya hai taaki offline save ho jayein
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './about.html',
  './azkar_menu.html',
  './calculator.html',
  './eidain.html',
  './evening.html',
  './hajj.html',
  './juma.html',
  './kahf_full.html',
  './morning.html',
  './munasabat.html',
  './namaz.html',
  './quran.html',
  './quran_madani.html',
  './quran_maliksaud.html',
  './ramadan.html',
  './salah.html',
  './sleeping.html',
  './surah_mulk.html',
  './surah_sajdah.html',
  './zakat.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './fonts/jameel.ttf',
  './fonts/amiri.ttf',
  './fonts/tiro.ttf'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event (Puraana data delete karne ke liye)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (Pehle offline dikhayega, na ho to net se layega)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );

});

