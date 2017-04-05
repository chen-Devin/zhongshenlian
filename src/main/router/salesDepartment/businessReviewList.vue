<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        业务列表
        <router-link class="btn btn-primary pull-right"
                     to="/business-review-add">
          新建业务
        </router-link>
      </h3>
      <ul class="business-list-review">
        <li class="bg-warning">
          <h5 class="state">尚未完成</h5>
          <h5 class="title"><router-link to="/business-review-edit-sales">业务1</router-link></h5>
          <h5 class="date pull-right">2016/01/01-2016/01/01</h5>
        </li>
        <li class="bg-info">
          <h5 class="state">已提交待审核</h5>
          <h5 class="title"><router-link to="/business-review-edit-sales">业务1</router-link></h5>
          <h5 class="date pull-right">2016/01/01-2016/01/01</h5>
        </li>
        <li class="bg-danger">
          <h5 class="state">已审核未通过</h5>
          <h5 class="title"><router-link to="/business-review-edit-sales">业务1</router-link></h5>
          <h5 class="date pull-right">2016/01/01-2016/01/01</h5>
        </li>
        <li class="bg-success">
          <h5 class="state">待发合同编号</h5>
          <h5 class="title"><router-link to="/business-review-edit-sales">业务1</router-link></h5>
          <h5 class="date pull-right">2016/01/01-2016/01/01</h5>
        </li>
      </ul>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';

export default {
  name: 'businessReviewListSales',
  data() {
    return {
      paths: [
        {name: '待审核业务', url: '/business-review-list-sales', present: true}
      ],
      businesses: []
    };
  },
  created() {
    this.getInfo();
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    getInfo() {

    }
  },
  components: {
    crumbs,
    card
  }
};
</script>

<style lang="sass" scoped>
.business-list-review {
  list-style: none;
  padding-left: 0;
  margin-top: 30px;
  > li {
    > h5 {
      display: inline-block;
      &.state{
        width: 120px;
        text-align: center;
      }
      &.title {
        > a {
          &.hover {
            cursor: pointer;
          }
        }
      }
      &.date{
        padding-right: 10px;
      }
    }
  }
}
</style>
