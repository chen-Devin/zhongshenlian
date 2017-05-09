<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
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

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import pager from '../../component/pager.vue';

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
      }
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
    pager
  }
}
</script>

<style lang="sass" scoped>
</style>
