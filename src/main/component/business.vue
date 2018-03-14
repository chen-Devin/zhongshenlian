<template>
  <div>
    <progress-bar :progress="progress"></progress-bar>
    <tab-control :initParts="parts"
                 :initBusiness="business"
                 :user="user"
                 @pathsChan="pathsChan"
                 v-if="tabControlShow"></tab-control>
  </div>
</template>

<script>
import progressBar from './progressBarSVG.vue';
import tabControl from './tabControl.vue';

export default {
  name: 'business',
  data() {
    return {
      user: {},
      parts: [],
      business: this.initBusiness,
      tabControlShow: false
    };
  },
  props: ['initBusiness', 'progress'],
  created() {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
      if (this.user.department) {
        if (this.user.department === '所长') {
          this.parts.splice(0, 0,
            {name: '项目概况', path: 'business-profile', state: true},
            // {name: '项目开展', path: 'business-conduct', state: false},
            {name: '开票信息', path: 'billing-infor', state: false},
            {name: '项目报告', path: 'business-reports', state: false},
            {name: '操作历史', path: 'operat-history', state: false}
          );
        } else if (this.user.department === '办公室') {
          this.parts.splice(0, 0,
            {name: '项目概况', path: 'business-profile', state: true},
            {name: '项目报告', path: 'business-reports', state: false}
          );
        } else if (this.user.department === '业务部') {
          this.parts.splice(0, 0,
            {name: '项目概况', path: 'business-profile', state: true},
            // {name: '项目开展', path: 'business-conduct', state: false},
            {name: '开票信息', path: 'billing-infor', state: false},
            {name: '项目报告', path: 'business-reports', state: false}
            // {name: '操作历史', path: 'operat-history', state: false}
          );
        } else if (this.user.department === '质控部') {
          this.parts.splice(0, 0,
            {name: '项目概况', path: 'business-profile', state: true},
            {name: '项目报告', path: 'business-reports', state: false}
            // {name: '操作历史', path: 'operat-history', state: false}
          );
        } else if (this.user.department === '档案部') {
          this.parts.splice(0, 0,
            {name: '项目概况', path: 'business-profile', state: true},
            {name: '项目报告', path: 'business-reports', state: false}
          );
        } else if (this.user.department === '财务部') {
          this.parts.splice(0, 0,
            {name: '项目概况', path: 'business-profile', state: true},
            {name: '开票信息', path: 'billing-infor', state: false}
          );
        } else if (this.user.department === '市场部') {
          this.parts.splice(0, 0);
        }
      }
      this.tabControlShow = true
    }, () => { });
  },
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
