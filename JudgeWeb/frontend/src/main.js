import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import VueLogger from 'vuejs-logger';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
    vuetify,
    router,
    VueLogger,
    render: h => h(App)
}).$mount('#app');
