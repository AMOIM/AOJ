import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import QnA from '../views/QnA/QnA.vue';
import Notice from '../views/Notice/Notice.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/contest/qna/:id',
        name: QnA,
        component: QnA
    },
    {
        path: '/contest/notice/:id',
        name: Notice,
        component: Notice
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
