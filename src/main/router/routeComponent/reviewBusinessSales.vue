<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <business-list-review-sales-card></business-list-review-sales-card>
  </div>
</template>

<script>
import crumbs from '../../component/crumbs.vue';
import businessListReviewSalesCard from '../../component/businessListReviewSalesCard.vue';

export default {
  name: 'reviewBusinessSales',
  data() {
    return {
      paths: [
        { name: '职员管理', url: '/infor-management', present: false },
        { name: '资料管理', url: '/infor-management', present: true },
      ]
    };
  },
  components: {
    crumbs,
    businessListReviewSalesCard
  }
};
</script>

<style lang="sass" scoped>

</style>
