<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        业务列表
      </h3>
      <div class="com-list list-group">
        <li class="list-group-item list-head">
          <span class="title">业务列表</span>
          <span class="date pull-right">创建时间</span>
        </li>
        <router-link class="list-group-item"
                     :to="businessRoute(BUSINESS)"
                     v-for="(BUSINESS, index) in businesses"
                     :key="index">
          <span class="title">{{BUSINESS.businessName}}</span>
          <span class="date pull-right">{{BUSINESS.finishTime.substring(0,10)}}</span>
        </router-link>
        <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="pageChan"></my-pagination>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import myPagination from '../../component/pagination.vue';

export default {
  name: 'businessHandleListOffice',
  data() {
    return {
      paths: [
        { name: '待完结业务', url: '/business-handle-list-office', present: true }
      ],
      businesses: [],
      page: {
        total: 0,
        current: 0
      },
      totalPage: 1
    };
  },
  created() {
    this.getInfo(1);
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    pageChan(newPage) {
      this.getInfo(newPage);
    },
    getInfo(newPage) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getBusinessReviewingAgain',
              platform: 'web',
              pageNum: newPage
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.page.total = parseInt(rep.data.data.totalNum);
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
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    businessRoute(BUSINESS) {
      return '/business-handle-detail-office-'+BUSINESS.id;
    }
  },
  components: {
    crumbs,
    card,
    myPagination
  }
}
</script>

<style lang="sass" scoped>
</style>
