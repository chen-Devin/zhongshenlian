<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        业务列表
        <router-link class="btn my-btn submit-btn pull-right add-btn" to="/business-review-add" tag="button" v-if="addBusiness">
          新建项目
        </router-link>
      </h3>
      <div class="com-list list-group list-adjust">
        <li class="list-group-item list-head">
          <span class="title">业务列表</span>
          <span class="date pull-right">创建时间</span>
        </li>
        <router-link class="list-group-item" :to="businessRoute(BUSINESS)" v-for="(BUSINESS, index) in businesses" :key="index">
          <span class="label label-danger"
                v-if="BUSINESS.projectStatus===10">尚未完成</span>
          <span class="label label-info"
                v-else-if="BUSINESS.projectStatus===20||BUSINESS.projectStatus===40">已提交待审核</span>
          <span class="label label-warning"
                v-else-if="BUSINESS.projectStatus===30||BUSINESS.projectStatus===50">已审核未通过</span>
          <span class="label label-success"
                v-else-if="BUSINESS.projectStatus===60">待上传合同</span>
          <span class="label label-primary"
                v-else-if="BUSINESS.projectStatus===70">待发合同编号</span>
          <span class="title">{{BUSINESS.businessName}}</span>
          <span class="date pull-right">{{BUSINESS.finishTime.substring(0,10)}}</span>
        </router-link>
        <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="currentChange"></my-pagination>
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
  name: 'businessReviewListSales',
  data() {
    return {
      paths: [
        { name: '立项审批', url: '/business-review-list-sales', present: true }
      ],
      businesses: [],
      addBusiness: false,
      totalPage: 1,
      page: {
        total: 0,
        current: 0
      }
    };
  },
  props: ['user'],
  created() {
    this.getInfo(1);
    setTimeout(() => {
      this.addBusinessJud();
    }, 500);
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    addBusinessJud() {
      this.addBusiness = this.user.authority['业务立项'];
    },
    currentChange(newPage) {
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
      if (BUSINESS.projectStatus >= 60) {
        return '/business-review-detail-sales-' + BUSINESS.id;
      } else {
        return '/business-review-edit-' + BUSINESS.id;
      }
    }
  },
  components: {
    crumbs,
    card,
    myPagination
  }
};
</script>

<style lang="sass" scoped>
  .add-btn {
    background-color: #38a5fe;
    &:hover {
      background-color: #288ada;
    }
    &:active {
      background-color: #288ada;
    }
  }
</style>
