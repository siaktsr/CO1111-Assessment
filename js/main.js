// Wait until the entire page (including images, scripts, etc.) is fully loaded
window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        // Register the service worker file
        navigator.serviceWorker.register('../js/serviceWorker.js');
    }
}