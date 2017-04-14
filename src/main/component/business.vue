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

export default {
  name: 'business',
  data() {
    return {
      parts: [
        {name: '业务概况', path: 'business-profile'},
        {name: '业务开展', path: 'business-conduct'},
        {name: '开票信息', path: 'billing-infor'},
        {name: '业务报告', path: 'business-report'},
        {name: '操作历史', path: 'operat-history'}
      ],
      business: this.initBusiness
    };
  },
  props: ['initBusiness', 'user'],
  components: {
    progressBar,
    tabControl
  }
};
</script>

<style lang="sass" scoped>

</style>
