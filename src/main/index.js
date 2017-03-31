import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';

import axios from 'axios';

import '../scss/index.scss';
import '../scss/main.scss';

Vue.config.productionTip = true;

var app = new Vue({
    data: {
        user: {
            id: '',
            telephone: '',
            name: '',
            jobNumber: '',
            department: '',
            duties: '',
            authority: [],
            gender: '',
            wechatName: '',
            wechatHeadImg: ''
        }
    },
    router,
    template: '<App v-bind:user="user"></App>',
    components: {
        App
    }
    // render: (h) => h(App)
}).$mount('#app');

axios({
    method: 'get',
    url: '/service',
    params: {
        data: (()=>{
        var obj = {
            command: 'getUserInfo',
            platform: 'web'
        }
        return JSON.stringify(obj);
        })()
    }
}).then(
    (rep)=>{
        if(rep.data.statusCode = '10001') {
            app.user.id = rep.data.data.id;
            app.user.telephone = rep.data.data.telephone;
            app.user.name = rep.data.data.name;
            app.user.jobNumber = rep.data.data.jobNumber;
            app.user.department = rep.data.data.department;
            app.user.duties = rep.data.data.duties;
            app.user.authority = rep.data.data.authority;
            app.user.gender = rep.data.data.gender;
            app.user.wechatName = rep.data.data.wechatName;
            app.user.wechatHeadImg = rep.data.data.wechatHeadImg;
        }
    },(rep)=>{

    }
);
