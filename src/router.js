const routers = [
    {
        path: '/',
        name: 'index',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: (resolve) => require(['./views/register.vue'], resolve)
    },
    {
        path: '/search_detail',
        name: 'search_detail',
        meta: {
            title: '搜索详情'
        },
        component: (resolve) => require(['./views/search_detail.vue'], resolve)
    },
    {
        path: '/professorDetails',
        meta: {
            title: 'professorDetails'
        },
        component: (resolve) => require(['./views/ProfessorDetails.vue'], resolve)
    },
    {
        path: '/user',
        meta: {
            title: 'user'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
];
export default routers;
