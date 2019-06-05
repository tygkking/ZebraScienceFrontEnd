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
            title: '专家详情'
        },
        component: (resolve) => require(['./views/ProfessorDetails.vue'], resolve)
    },
    {
        path: '/user',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
    {
        path: '/paperDetails',
        meta: {
            title: '论文详情'
        },
        component: (resolve) => require(['./views/paperDetails.vue'], resolve)
    },
    {
        path: '/news',
        name: 'news',
        meta: {
            title: '消息页面'
        },
        component: (resolve) => require(['./views/news.vue'], resolve)
    },
    {
        path: '/certify',
        name: 'certify',
        meta: {
            title: '申请认证'
        },
        component: (resolve) => require(['./views/certify.vue'], resolve)
    },
    {
        path: '/setting',
        name: 'setting',
        meta: {
            title: '设置'
        },
        component: (resolve) => require(['./views/setting.vue'], resolve)
    },
    {
        path: '/aboutUs',
        name: 'aboutUs',
        meta: {
            title: '关于我们'
        },
        component: (resolve) => require(['./views/aboutUs.vue'], resolve)
    },
];
export default routers;
