var cacheName = "afterschool-v1";
var cacheFiles = [
    "/index.html",
];

self.addEventListener("install", function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName). then(function(cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (cachedFile) {
            if (cachedFile) {
                console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
                return cachedFile;
            } else {
                return fetch(e.request).then(function (response) {
                    // Check if the response is cloneable
                    if (!response || !response.clone) {
                        console.log("[Service Worker] Cannot clone response for: " + e.request.url);
                        return response;
                    }

                    return caches.open(cacheName).then(function (cache) {
                        // Add new file to the cache
                        cache.put(e.request, response.clone());

                        console.log("[Service Worker] Resource fetched and saved in the cache for: " +
                            e.request.url);
                        return response;
                    });
                })
                .catch(function(error) {
                    console.error("[Service Worker] Fetch error:", error);
                    throw error;
                });
            }
        })
    );
});

