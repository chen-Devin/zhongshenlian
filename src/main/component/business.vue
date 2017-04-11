<template>
  <div>
    <progress-bar></progress-bar>
    <tab-control v-bind:initParts="parts"
                 v-bind:initBusiness="business"
                 v-bind:user="user"></tab-control>
  </div>
</template>

<script>
import progressBar from './progressBar.vue';
import tabControl from './tabControl.vue';

import businessProfile from './businessProfile.vue';
import businessConduct from './businessConduct.vue';
import billingInfor from './billingInfor.vue';
import businessReport from './businessReport.vue';
import operatHistory from './operatHistory.vue';

export default {
  name: 'business',
  data() {
    return {
      parts: [
        {name: '业务概况', content: businessProfile, disp: true},
        {name: '业务开展', content: businessConduct, disp: false},
        {name: '开票信息', content: billingInfor, disp: false},
        {name: '业务报告', content: businessReport, disp: false},
        {name: '操作历史', content: operatHistory, disp: false}
      ],
      business: this.initBusiness
    };
  },
  props: ['initBusiness'],
  components: {
    progressBar,
    tabControl,
    businessProfile,
    businessConduct,
    billingInfor,
    businessReport,
    operatHistory
  }
};
</script>

<style lang="sass" scoped>

</style>
