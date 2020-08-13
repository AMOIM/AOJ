import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NoticeCreate from '../views/Notice/NoticeCreate.vue';
import NoticeList from '../views/Notice/QnAList.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/notice/create',
        name: NoticeCreate,
        component: NoticeCreate
    },
    {
        path: '/notice',
        name: NoticeList,
        component: NoticeList
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
