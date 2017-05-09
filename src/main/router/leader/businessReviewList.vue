<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3>
          业务列表
        </h3>
      <div class="com-list list-group">
        <router-link class="list-group-item"
                     :to="'/business-review-detail-leader-'+BUSINESS.id"
                     v-for="(BUSINESS, index) in businesses"
                     :key="index">
          <span class="label label-warning"
                v-if="BUSINESS.projectStatus===10">尚未完成</span>
          <span class="label label-info"
                v-else-if="BUSINESS.projectStatus===20||BUSINESS.projectStatus===40">已提交待审核</span>
          <span class="label label-danger"
                v-else-if="BUSINESS.projectStatus===30||BUSINESS.projectStatus===50">已审核未通过</span>
          <span class="label label-success"
                v-else-if="BUSINESS.projectStatus===60">待上传合同</span>
          <span class="label label-primary"
                v-else-if="BUSINESS.projectStatus===70">待发合同编号</span>
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
  name: 'businessReviewListLeader',
  data() {
    return {
      paths: [
        { name: '待审核业务', url: '/business-review-list-leader', present: true }
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
              command: 'getBusinessChecking',
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
