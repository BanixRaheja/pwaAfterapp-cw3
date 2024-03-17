import Vue from 'vue'
import App from './App.vue'

// // Service Worker Registration
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./service-worker.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
  }


new Vue({
  render: (h) => h(App)
}).$mount('#app')
