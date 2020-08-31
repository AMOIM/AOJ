import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/contest/qna/:id',
        name: 'QnA',
        component: () => import('../views/QnA/QnA.vue');
    },
    {
        path: '/contest/notice/:id',
        name: 'Notice',
        component: () => import('../views/Notice/Notice.vue');
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;