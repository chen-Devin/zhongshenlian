<template>
  <div class="normal-wrap">
    <h4 class="main-title">
      开票列表
      <router-link class="btn btn-primary pull-right"
                   :to="billingInforEditorLink"
                   v-if="addBillShow">
        新增开票申请
      </router-link>
    </h4>
    <h4 class="total-amount">
      <small>合同预估金额：</small><strong>{{business.contractAmount}}</strong>元&emsp;
      <small>当前申请发票总计：</small><strong>{{total}}</strong>元
    </h4>
    <div class="com-list list-group list-adjust">
      <li class="list-group-item list-head">
        <span class="title">开票列表</span>
      </li>
      <router-link class="list-group-item"
                   :to="billRoute(BILL)"
                   v-for="(BILL, index) in business.bills"
                   :key="index">
        <span class="label label-warning"
              v-if="BILL.state<1">未开票</span>
        <span class="label label-info"
              v-else-if="BILL.state<2">未付款</span>
        <span class="label label-success"
              v-else-if="BILL.state<3">已完成</span>
        {{BILL.amount+'元'}}
      </router-link>
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
    total() {
      let sum = 0;
      for (let i = 0; i < this.business.bills.length; i++) {
        sum += this.currencyToNum(this.business.bills[i].amount);
      }
      let sumStr = sum.toString().split('.');
      let sumInt = sumStr[0];
      let sumArr = [];
      for (let i = sumInt.length; i > 0; i -= 3) {
        let part = sumInt.substring(i-3, i);
        sumArr.unshift(part);
      }
      return sumArr.join(',') + ((sumStr.length > 1) ? ('.'+sumStr[1]) : '');
    },
    addBillShow() {
      return this.user.department === '业务部' ? true : false;
    },
    billingInforEditorLink () {
      if (this.business.bills.length === 0) {
        return 'billing-infor-editor/' + 1
      } else {
        return 'billing-infor-editor/' + 0
      }
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
      this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
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
    currencyToNum(amo) {
      let amoArr = amo.split(',').reverse();
      let amoNum = 0;
      for (let i = 0; i < amoArr.length; i++) {
        amoNum += parseFloat(amoArr[i])*Math.pow(1000, i);
      }
      return amoNum;
    },
    billRoute(BILL) {
      return 'billing-infor-detail-'+BILL.id;
    }
  }
};
</script>

<style lang="sass" scoped>
.total-amount {
  margin-top: 30px;
}
</style>
