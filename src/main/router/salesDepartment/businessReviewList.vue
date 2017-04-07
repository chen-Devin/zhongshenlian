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
      <div class="business-list-review list-group">
        <router-link class="list-group-item"
                     v-bind:to="businessRoute(BUSINESS)"
                     v-for="(BUSINESS, index) in businesses"
                     v-bind:key="index">
          <span class="label label-warning"
                v-if="BUSINESS.state==='1'">尚未完成</span>
          <span class="label label-info"
                v-else-if="BUSINESS.state==='2'">已提交待审核</span>
          <span class="label label-danger"
                v-else-if="BUSINESS.state==='3'">已审核未通过</span>
          <span class="label label-success"
                v-else-if="BUSINESS.state==='4'">待发合同编号</span>
          <span class="title">{{BUSINESS.businessName}}</span>
          <span class="date pull-right">{{BUSINESS.finishTime}}</span>
        </router-link>
      </div>
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
        { name: '待审核业务', url: '/business-review-list-sales', present: true }
      ],
      businesses: []
    };
  },
  computed: {
    businessRoute(BUSINESS) {
      return `/business-review-edit-sales/${BUSINESS.id}`;
    }
  },
  created() {
    this.getInfo();
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    getInfo() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getBusinessChecking',
              platform: 'web'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < rep.data.data.businessArray.length; i++) {
            let obj = {
              id: rep.data.data.businessArray[i].id,
              businessName: rep.data.data.businessArray[i].businessName,
              finishTime: rep.data.data.businessArray[i].finishTime,
              state: rep.data.data.customerArray[i].state
            };
            this.customers.push(obj);
          }
        }
      }, (rep) => { });
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
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  > a.list-group-item {
    border-right: 0;
    border-left: 0;
    // height: 50px;
    // line-height: 30px;
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
