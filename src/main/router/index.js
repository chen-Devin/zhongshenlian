import Vue from 'vue';
import VueRouter from 'vue-router';
import inforManagement from '../component/inforManagement.vue';
import authorManagement from '../component/authorManagement.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/infor-management',
            component: inforManagement
        },
        {
            path: '/author-management',
            component: authorManagement
        }
    ]
});

export default router;
