import Vue from 'vue'
import App from './App.vue'


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }

// testing
new Vue({
  render: (h) => h(App)
}).$mount('#app')
