import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { vuetify } from './plugins/vuetify';
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router);
app.use(createPinia());
app.use(vuetify);
app.mount('#app')
