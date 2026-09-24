// 小小练字 PWA Service Worker (v2)
var VERSION = 'v2';
var SHELL_CACHE = 'hanzi-shell-' + VERSION;
var RUNTIME_CACHE = 'hanzi-runtime-' + VERSION;

var SHELL_ASSETS = [
    './',
    './xxlz.html',
    './index.html',
    './manifest.json',
    './cnchar.min.js',
    './cnchar.order.min.js',
    './hanzi-writer.min.js',
    './assets/icon-512.png',
    './assets/icon-512-maskable.png'
].concat([
    'heng2','shu4','pie3','na4','dian3','ti2','wan1_gou1','pie3_zhe2','pie3_dian3','xie2_gou1',
    'heng2_zhe2','heng2_zhe2_zhe2','heng2_zhe2_zhe2_zhe2_gou1','heng2_zhe2_zhe2_pie3','heng2_zhe2_ti2',
    'heng2_zhe2_gou1','heng2_pie3','heng2_xie2_gou1','shu4_wan1','shu4_wan1_gou1','shu4_zhe2_zhe2_gou1',
    'shu4_zhe2_pie3','shu4_ti2','shu4_gou1','heng2_gou1','heng2_wan1_gou1','heng2_pie3_wan1_gou1',
    'heng2_wan1','wo4_gou1','shu4_heng2_pie3'
].map(function (n) { return './voice/strokes/' + n + '.mp3'; }));

var runtimeCache = null;

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(SHELL_CACHE)
            .then(function (cache) {
                return Promise.all(SHELL_ASSETS.map(function (url) {
                    return cache.add(url).catch(function (err) {
                        console.warn('SW: shell asset missing, skipped:', url, err);
                    });
                }));
            })
            .then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (names) {
            return Promise.all(names.map(function (name) {
                if (name !== SHELL_CACHE && name !== RUNTIME_CACHE) {
                    return caches.delete(name);
                }
            }));
        }).then(function () { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function (event) {
    if (event.request.method !== 'GET') return;
    var url = new URL(event.request.url);
    if (url.origin !== location.origin) return;

    var isData = url.pathname.indexOf('/hanzi-data/') !== -1;
    var isVoice = url.pathname.indexOf('/voice/') !== -1;

    if (isData || isVoice) {
        // cache-first：用过即缓存，离线可复用
        event.respondWith(handleRuntime(event.request));
        return;
    }

    // 其他同源请求：缓存优先，未命中走网络并回填
    event.respondWith(
        caches.match(event.request).then(function (cached) {
            if (cached) return cached;
            return fetch(event.request).then(function (res) {
                if (res.ok) {
                    var clone = res.clone();
                    event.waitUntil(caches.open(SHELL_CACHE).then(function (cache) { cache.put(event.request, clone); }));
                }
                return res;
            });
        })
    );
});

function handleRuntime(request) {
    return getRuntimeCache().then(function (cache) {
        return cache.match(request).then(function (cached) {
            if (cached) return cached;
            return fetch(request).then(function (res) {
                if (res.ok) {
                    var clone = res.clone();
                    cache.put(request, clone);
                }
                return res;
            });
        });
    });
}

function getRuntimeCache() {
    if (runtimeCache) return Promise.resolve(runtimeCache);
    return caches.open(RUNTIME_CACHE).then(function (cache) {
        runtimeCache = cache;
        return cache;
    });
}
