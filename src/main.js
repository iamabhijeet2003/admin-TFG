import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/js/bootstrap.min";

import '@fortawesome/fontawesome-free/js/all'

createApp(App).use(store).use(router).mount('#app')