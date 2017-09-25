<template>
  <div id="app">
    <com-header :user="user"></com-header>
    <index :user="user"></index>
    <!--<com-footer></com-footer>-->
  </div>
</template>

<script>
import comFooter from './component/comFooter.vue';
import comHeader from './component/comHeader.vue';
import index from './component/index.vue';

export default {
  name: 'app',
  data() {
    return {
      userInfo: {}
    };
  },
  props: ['user'],
  components: {
    comFooter,
    comHeader,
    index
  },
  methods: {
    jumpPage() {
      if (this.userInfo.department === '所长') {
        this.$router.push('/quick');
      } else if (this.userInfo.department === '业务部') {
        this.$router.push('/business-review-list-sales');
      } else if (this.userInfo.department === '风险评估部') {
        this.$router.push('/business-complete-list');
      } else if (this.userInfo.department === '市场部') {
        this.$router.push('/bid-info-list');
      } else if (this.userInfo.department === '财务部') {
        this.$router.push('/business-handle-list-financial');
      } else if (this.userInfo.department === '档案部') {
        this.$router.push('/business-handle-list-archives');
      } else if (this.userInfo.department === '办公室') {
        this.$router.push('/business-complete-list');
      }
    }
  },
  created() {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.userInfo = this.$store.getters.getUser;
      this.jumpPage();
    }, () => { });
  }
};
</script>

<style lang="sass">
  .el-tree {
    background-color: #fafafa;
    border: none;
  }
</style>
