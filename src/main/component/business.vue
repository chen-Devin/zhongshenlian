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
      parts: [],
      business: this.initBusiness
    };
  },
  props: ['initBusiness', 'user', 'progress'],
  mounted() {
    if (this.user.department) {
      if (this.user.department === '所长') {
        this.parts.splice(0, 0,
          {name: '业务概况', path: 'business-profile', state: true},
          {name: '业务开展', path: 'business-conduct', state: false},
          {name: '开票信息', path: 'billing-infor', state: false},
          {name: '操作历史', path: 'operat-history', state: false}
        );
      } else if (this.user.department === '办公室') {
        this.parts.splice(0, 0,
          {name: '业务概况', path: 'business-profile', state: true}
        );
      } else if (this.user.department === '业务部') {
        this.parts.splice(0, 0,
          {name: '业务概况', path: 'business-profile', state: true},
          {name: '业务开展', path: 'business-conduct', state: false},
          {name: '开票信息', path: 'billing-infor', state: false},
          {name: '操作历史', path: 'operat-history', state: false}
        );
      } else if (this.user.department === '风险评估部') {
        this.parts.splice(0, 0,
          {name: '业务概况', path: 'business-profile', state: true},
          {name: '操作历史', path: 'operat-history', state: false}
        );
      } else if (this.user.department === '档案部') {
        this.parts.splice(0, 0,
          {name: '业务概况', path: 'business-profile', state: true}
        );
      } else if (this.user.department === '财务部') {
        this.parts.splice(0, 0,
          {name: '业务概况', path: 'business-profile', state: true},
          {name: '开票信息', path: 'billing-infor', state: false}
        );
      } else if (this.user.department === '市场部') {
        this.parts.splice(0, 0);
      }
    }
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
