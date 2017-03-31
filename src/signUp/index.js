import Vue from 'vue';
import App from './App.vue';

import axios from 'axios';

import '../scss/index.scss';
import '../scss/sign.scss';

Vue.config.productionTip = true;

var app = new Vue({
    render: (h) => h(App)
}).$mount('#app');
