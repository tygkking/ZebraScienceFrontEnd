const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/login',
        meta: {
            title: 'login'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/register',
        meta: {
            title: 'register'
        },
        component: (resolve) => require(['./views/register.vue'], resolve)
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