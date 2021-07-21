const routes = [{
        path: '/',
        component: () =>
            import ('layouts/indexLayout.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/auth/Login.vue')
        }, {
            path: '/forget',
            component: () =>
                import ('pages/auth/Forget_password.vue')
        }]
    },
    {
        path: '/admin',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
            path: 'business',
            component: () =>
                import ('pages/Business.vue')
        }]
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes