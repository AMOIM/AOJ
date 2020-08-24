import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import QnA from '../views/QnA/QnA.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/contest/qna',
        name: QnA,
        component: QnA
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
