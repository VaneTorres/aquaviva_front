import { route } from 'quasar/wrappers'
import router from '.'
const routes = [{
        path: '/',
        component: () =>
            import ('layouts/indexLayout.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/auth/Login.vue'), name:"login"
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
            path: 'company',
            component: () =>
                import ('src/pages/company/Company.vue'),
            name: 'company'
        },
        {
            path: 'dashboard',
            component: () =>
                import ('src/pages/dashboard.vue'),
            name: 'dashboard'
        },
        {
            path: 'mycompany',
            component: () =>
                import ('src/pages/company/Mycompany.vue'),
            name: 'Mycompany'
        },
        {
            path: 'environmental_monitored',
            component: () =>
                import ('src/pages/environmental_monitored.vue'),
            name: 'environmental_monitored'
        },
        {
            path: 'load_of_obligations/pma',
            component: () =>
                import ('src/pages/load_of_obligations/pma.vue'),
            name: 'pma'
        },
        {
            path: 'organizationtree',
            component: () =>
                import ('src/pages/organizationtree.vue'),
            name: 'pma'
        },
    ],
        meta:{requireAuth:true}
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