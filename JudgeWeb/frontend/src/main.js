import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import VueLogger from 'vuejs-logger';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

const options = {
    isEnabled: true,
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, options);

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');
