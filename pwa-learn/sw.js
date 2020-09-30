// 3 个生命周期; 前 2 个只发生一次; 后面的 fetch 发生无数次
// cache API; 可处理离线访问 技术;

const CACHE_NAME = 'cache-v2'; // b变动版本号.

self.addEventListener('install', event => {
    console.log('install', event)
    // event.waitUntil(self.skipWaiting())
    // 资源写入到缓存
    event.waitUntil(caches.open(CACHE_NAME).then( cache => {
        cache.addAll([
            '/',
            './index.css'
        ])
    }))
})

self.addEventListener('activate', event => {
    console.log('activate', event)
    // event.waitUntil(self.clients.claim())
    // 清理缓存空间;
    event.waitUntil(caches.keys().then( cacheNames => {
        return Promise.all(cacheNames.map( cacheName => {
            // 如果不是我们存的缓存,把他们清理了;
            if(cacheName !== CACHE_NAME) {
                return caches.delete(cacheName);
            }
        }));
    }))
})

self.addEventListener('fetch', event => {
    console.log('fetch', event);
    // 使用缓存
    event.respondWith(caches.open(CACHE_NAME).then( cache => {
        return cache.match(event.request).then( Response => {
            // 如果有这个缓存,返回
            if(response) {
                return response;
            }
            // 如果没有, 用 fetch 发起一个请求;
            return fetch(event.request).then( response => {
                cache.put(event.request, response.clone());
                
                return response;
            } )
        } )
    }))
})