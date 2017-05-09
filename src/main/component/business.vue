<template>
  <div>
    <progress-bar :progress="progress"></progress-bar>
    <tab-control :initParts="parts"
                 :initBusiness="business"
                 :user="user"
                 @pathsChan="pathsChan"></tab-control>
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
        {name: '业务概况', path: 'business-profile', state: true},
        {name: '业务开展', path: 'business-conduct', state: false},
        {name: '开票信息', path: 'billing-infor', state: false},
        {name: '业务报告', path: 'business-report', state: false},
        {name: '操作历史', path: 'operat-history', state: false}
      ],
      business: this.initBusiness
    };
  },
  props: ['initBusiness', 'user', 'progress'],
  methods: {
    pathsChan(paths) {
      this.$emit('pathsChan', paths);
    }
  },
  components: {
    progressBar,
    tabControl
  }
};
</script>

<style lang="sass" scoped>

</style>
