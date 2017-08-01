<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h4>公司信息管理</h4>
    </card>
    <company-list></company-list>
    <div class="company-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import companyList from './component/companyList.vue';

export default {
  name: 'companyManagement',
  data() {
    return {
      paths: [
        { name: '信息管理', url: '/business-review-list-leader', present: true },
        { name: '公司信息管理', url: '/business-review-list-leader', present: true }
      ]
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
    
  },
  components: {
    crumbs,
    card,
    companyList
  }
};
</script>

<style lang="sass" scoped>
@import '../../../scss/_variables.scss';
  .company-wrapper {
    margin-left: 180px;
  }
</style>