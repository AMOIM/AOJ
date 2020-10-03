import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/contest/qna/:id',
        name: 'QnA',
        component: () => import('../views/QnA/QnA.vue')
    },
    {
        path: '/contest/notice/:id',
        name: 'Notice',
        component: () => import('../views/Notice/Notice.vue')
    },
    {
        path: '/problem/create',
        name: 'ProblemCreate',
        component: () => import('../views/CreateProblem.vue')
    },
    {
        path: '/problem/:id?',
        name: 'Problem',
        component: () => import('../views/problem.vue')
    },
    {
        path : '/contest/scoreboard/:id?',
        name : 'Scoreboard',
        component: () => import('../views/scoreboard.vue')
    },
    {
        path : '/contest/status/:id?',
        name : 'status',
        component: () => import('../views/status.vue')
    },
    {
        path : '/contest/:id',
        name : 'Contest Main',
        component: () => import('../views/ContestMain.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
