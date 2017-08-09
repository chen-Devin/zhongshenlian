<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h4>职能部门信息管理</h4>
    </card>
    <functional-list v-if="reloadList" @noticeJump="noticeJump"></functional-list>
    <div class="company-wrapper">
      <router-view @reloadComList="reloadComList"></router-view>
    </div>
  </div>
</template>

<script>
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import functionalList from './component/functionalList.vue';

export default {
  name: 'companyManagement',
  data() {
    return {
      paths: [
        { name: '信息管理', url: '/business-review-list-leader', present: true },
        { name: '公司信息管理', url: '/business-review-list-leader', present: true }
      ],
      reloadList: true,
      comId: ''
    };
  },
  computed: {
    
  },
  methods: {
    delSuccess () {
      this.reloadList = false
      this.reloadList = true
    },
    reloadComList () {
      this.reloadList = false
      setTimeout(() => {
        this.reloadList = true
      }, 100)
      console.log('submitted')
    },
    noticeJump (comId) {
      this.comId = comId
      this.$router.push(`/functional-management/${comId}`);
    }
  },
  created() {
    this.noticeJump(this.comId)
  },
  components: {
    crumbs,
    card,
    functionalList
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../scss/_variables.scss';
  .company-wrapper {
    margin-left: 180px;
  }
</style>
