import Vue from 'vue';
import App from './App.vue';
import isPromise from '../component/isPromise.js';

import '../scss/index.scss';
import '../scss/sign.scss';

Vue.config.productionTip = true;

if (!isPromise()) {
    alert('网站在ie浏览器下无法正常使用，我们建议您使用谷歌浏览浏览器或QQ浏览器');
}

var app = new Vue({
    render: (h) => h(App)
}).$mount('#app');
