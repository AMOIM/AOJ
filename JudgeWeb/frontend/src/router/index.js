import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Markdown/MarkdownHome.vue')
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
        path: '/user',
        name: 'User',
        component: () => import('../views/User.vue')
    },
    {
        path: '/contest/create',
        name: 'CreateContest',
        component: () => import('../views/CreateContest.vue')
    },
    {
        path: '/contest/update/:id',
        name: 'CreateUpdate',
        component: () => import('../views/contestUpdate.vue')
    },
    {
        path: '/contest/list',
        name: 'Contestlist',
        component: () => import('../views/Contestlist.vue')
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
        path: '/problem/list',
        name: 'ProblemList',
        component: () => import('../views/problemList.vue')
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
        path : '/status',
        name : 'My Status',
        component: () => import('../views/MyStatus.vue')
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
    },
    {
        path : '/markdown/create',
        name : 'MarkDown Create',
        component: () => import('../views/Markdown/MarkdownCreate.vue')
    },
    {
        path : '/judge',
        name : 'Markdown Judge',
        component: () => import('../views/Markdown/MarkdownJudge.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
