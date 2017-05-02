<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <business-complete-search-bar @search="search"></business-complete-search-bar>
      <h3>
        业务列表
      </h3>
      <div class="business-list-handle list-group">
        <router-link class="list-group-item"
                     :to="businessRoute(BUSINESS)"
                     v-for="(BUSINESS, index) in businesses"
                     :key="index">
          <span class="title">{{BUSINESS.businessName}}</span>
          <span class="date pull-right">{{BUSINESS.finishTime}}</span>
        </router-link>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import businessCompleteSearchBar from './component/businessCompleteSearchBar.vue';
import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';

export default {
  name: 'businessCompleteList',
  data() {
    return {
      paths: [
        { name: '已完成业务', url: '/business-complete-list', present: true }
      ],
      businesses: []
    };
  },
  methods: {
    search(sea) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'searchBusinessFinished',
                platform: 'web',
                searchContent: sea.cont === '' ? null : sea.cont,
                beginTime: sea.time.start === '' ? null : sea.time.start,
                endTime: sea.time.end === '' ? null : sea.time.end,
                businessAmount: sea.amount === '所有' ? null : sea.amount,
                businessType: sea.type === '所有' ? null : sea.type
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
      });
      return promise;
    },
    businessRoute(BUSINESS) {
      return '/business-complete-detail-'+BUSINESS.id;
    }
  },
  components: {
    crumbs,
    card,
    businessCompleteSearchBar
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
