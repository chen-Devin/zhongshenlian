<template>
  <div>
    <h3>
      <router-link class="btn btn-primary pull-right"
                   to="billing-infor-editor">
        新增开票申请
      </router-link>
    </h3>
    <div class="billing-list list-group">
      <router-link class="list-group-item"
                   :to="billRoute(BILL)"
                   v-for="(BILL, index) in business.bills"
                   :key="index">{{BILL.billingAmount+'万元'}}</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'billingInfor',
  data() {
    return {
      paths: [
        { name: '待处理业务', url: '/business-handle-list-sales', present: false },
        { name: '业务详情', url: `/business-handle-detail-sales/${this.$route.params.id}`, present: false },
        { name: '开票信息', url: `/business-handle-detail-sales/${this.$route.params.id}/billing-infor`, present: true }
      ],
      business: this.initBusiness,
      props: ['initBusiness', 'user']
    };
  },
  create() {
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    billRoute(BILL) {
      return 'billing-infor-detail/'+BILL.id;
    }
  }
};
</script>

<style lang="sass" scoped>
div.billing-list {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  > a.list-group-item {
    border-right: 0;
    border-left: 0;
  }
  > a.list-group-item:first-child {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  > a.list-group-item:last-child {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
