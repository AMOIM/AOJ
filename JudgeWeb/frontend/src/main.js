import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import router from './router';
import VueLogger from 'vuejs-logger';
import Vuex from 'vuex';
import store from './store/auth';

const isProduction = process.env.NODE_ENV === 'production';
 
const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(Vuex);
Vue.use(VueLogger, options);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
new Vue({
    el : '#app',
    template: '<App/>',
    components : {App},
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');