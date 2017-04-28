import Vue from 'vue';
import App from './App.vue';

import loadScript from './loadScript.js';

import '../scss/index.scss';
import '../scss/sign.scss';

Vue.config.productionTip = true;

var app = new Vue({
    render: (h) => h(App)
}).$mount('#app');

//下载微信登录代码
loadScript('http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js', function() {
    var obj = new WxLogin({
        id: 'wechatLogin',
        appid: 'wx81ca4ef030385fac',
        scope: 'snsapi_login',
        redirect_uri: '/wechat',
        state: Math.random(),
        style: 'black'
    });
});
