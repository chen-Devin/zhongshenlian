import Vue from 'vue';
import App from './App.vue';
import isPromise from '../component/isPromise.js';

import loadScript from './loadScript.js';

import '../scss/index.scss';
import '../scss/sign.scss';

Vue.config.productionTip = true;

if (!isPromise()) {
    alert('网站在ie浏览器下无法正常使用，我们建议您使用谷歌浏览浏览器或QQ浏览器');
}

var app = new Vue({
    render: (h) => h(App)
}).$mount('#app');

//下载微信登录代码
loadScript('http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js', function() {
    var obj = new WxLogin({
        id: 'wechatLogin',
        appid: 'wxa606acd488841da7',
        scope: 'snsapi_login',
        redirect_uri: 'http://www.tzucpa.cn/wechat',
        state: Math.random(),
        style: 'black'
    });
});
