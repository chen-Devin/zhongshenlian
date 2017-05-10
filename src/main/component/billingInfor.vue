<template>
  <div class="normal-wrap">
    <h3 class="main-title">
      开票列表
      <router-link class="btn btn-primary pull-right"
                   to="billing-infor-editor"
                   v-if="addBillShow">
        新增开票申请
      </router-link>
    </h3>
    <div class="com-list list-group">
      <router-link class="list-group-item"
                   :to="billRoute(BILL)"
                   v-for="(BILL, index) in business.bills"
                   :key="index">{{BILL.amount+'元'}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'billingInfor',
  data() {
    return {
      paths: [],
      business: this.initBusiness
    };
  },
  computed: {
    addBillShow() {
      return this.user.department === '业务部' ? true : false;
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-sales-${this.$route.params.id}/billing-infor`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-risk-${this.$route.params.id}/billing-infor`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-leader-${this.$route.params.id}/billing-infor`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-office-${this.$route.params.id}/billing-infor`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '代开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-financial-${this.$route.params.id}/billing-infor`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-archives-${this.$route.params.id}/billing-infor`, present: true });
    }
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    billRoute(BILL) {
      return 'billing-infor-detail-'+BILL.id;
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
