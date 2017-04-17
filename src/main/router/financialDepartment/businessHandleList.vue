<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        业务列表
      </h3>
      <div class="business-list-handle list-group">
        <router-link class="list-group-item"
                     v-bind:to="businessRoute(BUSINESS)"
                     v-for="(BUSINESS, index) in businesses"
                     v-bind:key="index">
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
  name: 'businessHandleListFinancial',
  data() {
    return {
      paths: [
        { name: '待处理业务', url: '/business-handle-list-financial', present: true }
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
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getBusinessReviewing',
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
              projectStatus: parseInt(rep.data.data.businessArray[i].projectStatus)
            };
            this.businesses.push(obj);
          }
        }
      }, (rep) => { });
    },
    businessRoute(BUSINESS) {
      return '/business-handle-detail-sales/'+BUSINESS.id;
    }
  },
  components: {
    crumbs,
    card
  }
}
</script>

<style lang="sass" scoped>
.business-list-handle {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  > a.list-group-item {
    border-right: 0;
    border-left: 0;
    // height: 50px;
    // line-height: 30px;
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
