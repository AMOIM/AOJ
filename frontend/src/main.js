import Vue from 'vue';
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import VueLogger from 'vuejs-logger';
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
 
Vue.use(VueLogger, options);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');
