import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/markdown/MarkdownHome.vue')
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('../views/user/SignUp.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/user/Login.vue')
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/user/UserInfo.vue')
    },
    {
        path: '/contest/create',
        name: 'CreateContest',
        component: () => import('../views/contest/CreateContest.vue')
    },
    {
        path: '/contest/update/:id',
        name: 'CreateUpdate',
        component: () => import('../views/contest/UpdateContest.vue')
    },
    {
        path: '/contest/list',
        name: 'Contestlist',
        component: () => import('../views/contest/ContestList.vue')
    },
    {
        path: '/contest/qna/:id',
        name: 'QnA',
        component: () => import('../views/qna/QnA.vue')
    },
    {
        path: '/contest/notice/:id',
        name: 'Notice',
        component: () => import('../views/notice/Notice.vue')
    },
    {
        path: '/problem/create',
        name: 'ProblemCreate',
        component: () => import('../views/problem/CreateProblem.vue')
    },
    {
        path: '/problem/update/:id?',
        name: 'ProblemUpdate',
        component: () => import('../views/problem/UpdateProblem.vue')
    },
    {
        path: '/problem/list',
        name: 'ProblemList',
        component: () => import('../views/problem/ProblemList.vue')
    },
    {
        path: '/problem/:id?',
        name: 'Problem',
        component: () => import('../views/problem/Problem.vue')
    },
    {
        path : '/contest/scoreboard/:id?',
        name : 'Scoreboard',
        component: () => import('../views/contest/Scoreboard.vue')
    },
    {
        path : '/status',
        name : 'My Status',
        component: () => import('../views/MyStatus.vue')
    },
    {
        path : '/contest/status/:id?',
        name : 'status',
        component: () => import('../views/contest/Status.vue')
    },
    {
        path : '/contest/:id',
        name : 'Contest Main',
        component: () => import('../views/contest/ContestMain.vue')
    },
    {
        path : '/markdown/create',
        name : 'MarkDown Create',
        component: () => import('../views/markdown/MarkdownCreate.vue')
    },
    {
        path : '/judge',
        name : 'Markdown Judge',
        component: () => import('../views/markdown/MarkdownJudge.vue')
    },
    {
        path: '/user/manage',
        name: 'manage User',
        component: () => import('../views/user/ManageUser.vue')
    },
    {
        path: '*',
        redirect: '/'
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
