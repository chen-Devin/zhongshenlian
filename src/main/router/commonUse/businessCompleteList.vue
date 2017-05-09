<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <business-complete-search-bar @tog="search"></business-complete-search-bar>
      <h3>
        业务列表
      </h3>
      <div class="com-list list-group">
        <router-link class="list-group-item"
                     :to="businessRoute(BUSINESS)"
                     v-for="(BUSINESS, index) in businesses"
                     :key="index">
          <span class="label label-warning"
                v-if="BUSINESS.projectStatus<130">未复审</span>
          <span class="label label-info"
                v-else-if="BUSINESS.projectStatus===130">待复审</span>
          <span class="label label-danger"
                v-else-if="BUSINESS.projectStatus===131">未通过</span>
          <span class="label label-success"
                v-else-if="BUSINESS.projectStatus===140">已通过</span>
          <span class="label label-primary"
                v-else-if="BUSINESS.projectStatus===150">已上传二维码</span>
          <span class="label label-default"
                v-else-if="BUSINESS.projectStatus===180">已完成</span>
          <span class="title">{{BUSINESS.businessName}}</span>
          <span class="date pull-right">{{BUSINESS.finishTime}}</span>
        </router-link>
        <pager :pageCount="page.total"
               :currentPage="page.current"
               @change="pageChan"></pager>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import businessCompleteSearchBar from './component/businessCompleteSearchBar.vue';
import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import pager from '../../component/pager.vue';

export default {
  name: 'businessCompleteList',
  data() {
    return {
      paths: [
        { name: '已完成业务', url: '/business-complete-list', present: true }
      ],
      businesses: [],
      searchTog: false,
      page: {
        total: 0,
        current: 0
      }
    };
  },
  created() {
    this.get(1);
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    tog(sea) {
      this.searchTog = true;
      this.search(sea, 1);
    },
    pageChan(newPage) {
      if (this.searchTog) {
        this.search(newPage);
      } else {
        this.get(newPage);
      }
    },
    get(newPage) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getBusinessFinished',
                platform: 'web',
                pageNum: newPage
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.page.total = rep.data.data.pageNum;
            this.page.current = newPage;
            this.businesses.length = 0;
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
    search(sea, newPage) {
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
                businessType: sea.type === '所有' ? null : sea.type,
                pageNum: newPage
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.page.total = rep.data.data.pageNum;
            this.page.current = newPage;
            this.businesses.length = 0;
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
    businessCompleteSearchBar,
    pager
  }
}
</script>

<style lang="sass" scoped>
</style>
