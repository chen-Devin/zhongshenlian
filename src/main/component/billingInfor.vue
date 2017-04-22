<template>
  <h3>
    <router-link class="btn btn-primary pull-right"
                 to="billing-infor-editor">
      新增开票申请
    </router-link>
  </h3>
  <div class="billing-list list-group">
    <router-link class="list-group-item" to="billing-infor-detail/">billing 1</router-link>
    <router-link class="list-group-item" to="billing-infor-detail/">billing 2</router-link>
    <router-link class="list-group-item" to="billing-infor-detail/">billing 3</router-link>
    <router-link class="list-group-item" to="billing-infor-detail/">billing 4</router-link>
    <router-link class="list-group-item" to="billing-infor-detail/">billing 5</router-link>
    <router-link class="list-group-item" to="billing-infor-detail/">billing 6</router-link>
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
      ]
    };
  },
  create() {
    this.$emit('pathsChan', this.paths);
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
    > span.title {
      margin-left: 7px;
    }
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
