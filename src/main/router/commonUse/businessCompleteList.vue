<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
        <label class="radio-inline">
          <input type="radio" name="seaType" value="关键字搜索" v-model="seaType" @change="seaTypeChan"> 关键字搜索
        </label>
        <label class="radio-inline">
          <input type="radio" name="seaType" value="条件查询" v-model="seaType" @change="seaTypeChan"> 条件查询
        </label>
      </form>
      <business-complete-search-bar @search="tog" v-show="seaType==='条件查询'"></business-complete-search-bar>
      <search-bar placeholder="输入关键字搜索已完成业务" @search="tog" v-show="seaType==='关键字搜索'"></search-bar>
      <h3 class="main-title">
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
import searchBar from '../../component/searchBar.vue';
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
      seaType: '关键字搜索',
      searchTog: false,
      sea: {
        searchContent: '',
        requester: '',
        requesterName: '',
        applicantName: '',
        time: {
          start: '',
          end: ''
        },
        amount: '所有',
        type: '所有',
      },
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
    seaTypeChan() {
      this.get(1);
      this.seaInit();
    },
    seaInit() {
      this.sea = {
        searchContent: '',
        requester: '',
        requesterName: '',
        applicantName: '',
        time: {
          start: '',
          end: ''
        },
        amount: '所有',
        type: '所有',
      };
    },
    tog(seaCont) {
      this.searchTog = true;
      if (this.seaType === '关键字搜索') {
        this.sea.searchContent = seaCont;
      } else if (this.seaType === '条件查询') {
        this.sea.requester = seaCont.requester;
        this.sea.requesterName = seaCont.requesterName;
        this.sea.applicantName = seaCont.applicantName;
        this.sea.time.start = seaCont.time.start;
        this.sea.time.end = seaCont.time.end;
        this.sea.amount = seaCont.amount;
        this.sea.type = seaCont.type;
      }
      this.search(1);
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
            this.page.total = parseInt(rep.data.data.pageNum);
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
      });
      return promise;
    },
    search(newPage) {
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
                searchContent: this.sea.searchContent === '' ? null : this.sea.searchContent,
                requester: this.sea.requester === '' ? null : this.sea.requester,
                requesterName: this.sea.requesterName === '' ? null : this.sea.requesterName,
                applicantName: this.sea.applicantName === '' ? null : this.sea.applicantName,
                beginTime: this.sea.time.start === '' ? null : this.sea.time.start,
                endTime: this.sea.time.end === '' ? null : this.sea.time.end,
                businessAmount: this.sea.amount === '所有' ? null : this.sea.amount,
                businessType: this.sea.type === '所有' ? null : this.sea.type,
                pageNum: newPage
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.page.total = parseInt(rep.data.data.pageNum);
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
    searchBar,
    pager
  }
}
</script>

<style lang="sass" scoped>
</style>
