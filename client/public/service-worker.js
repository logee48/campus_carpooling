/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated!');
});

self.addEventListener('fetch', (event) => {
    console.log('Fetch event for ', event.request.url);
});
