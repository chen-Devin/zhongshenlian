import Vue from 'vue';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import axios from 'axios';

import '../scss/index.scss';
import '../scss/main.scss';

Vue.config.productionTip = true;

Vue.use(ElementUI);

var app = new Vue({
    data: {
        user: {
            id: '',
            telephone: '',
            name: '',
            jobNumber: '',
            department: '',
            subDepartment: '',
            duties: '',
            authority: {},
            gender: '',
            wechatName: '',
            wechatHeadImg: ''
        }
    },
    router,
    store,
    template: '<App :user="user"></App>',
    components: {
        App
    }
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
}).then((rep)=>{
        if(rep.data.statusCode === '10001') {
            app.user.id = rep.data.data.id;
            app.user.telephone = rep.data.data.telephone;
            app.user.name = rep.data.data.name;
            app.user.jobNumber = rep.data.data.jobNumber;
            app.user.department = rep.data.data.department;
            app.user.subDepartment = rep.data.data.subDepartment;
            app.user.duties = rep.data.data.duties;
            for (let i = 0; i < rep.data.data.authority.length; i++) {
                app.user.authority[rep.data.data.authority[i].name] = (rep.data.data.authority[i].authority === '0') ? false : true;
            }
            app.user.gender = rep.data.data.gender;
            app.user.wechatName = rep.data.data.wechatName;
            app.user.wechatHeadImg = rep.data.data.wechatHeadImg;
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
    },(rep)=>{});
