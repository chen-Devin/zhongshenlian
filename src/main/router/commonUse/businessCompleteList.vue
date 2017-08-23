<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <form class="search-form" @submit.prevent @keyup.enter.prevent>
        <div class="row">
          <div class="col-md-11">
            <search-bar placeholder="请输入关键字进行搜索" @search="tog" v-show="simpleSearch"></search-bar>
          </div>
          <div class="col-md-10 replace" v-show="!simpleSearch"></div>
          <div class="col-md-1 higher-search f-r">
            <button type="button" class="btn my-btn high-btn f-r" @click="showHigherSearch()">
              高级搜索
              &nbsp;
              <img v-if="searchDown" class="search-icon" src="../../../img/market/search_down.svg">
              <img v-if="searchUp" class="search-icon" src="../../../img/market/search_up.svg">
            </button>
          </div>
        </div>
      </form>
      <business-complete-search-bar @search="tog" v-if="higherSearch"></business-complete-search-bar>
      <h3 class="main-title">
        业务列表
      </h3>
      <div class="com-list list-group list-adjust">
        <li class="list-group-item list-head" href="javascript:void(0);">
          <span class="title">信息列表</span>
          <span class="date pull-right">创建时间</span>
        </li>
        <router-link class="list-group-item"
                     :to="businessRoute(BUSINESS)"
                     v-for="(BUSINESS, index) in businesses"
                     :key="index">
          <span class="title">{{BUSINESS.businessName}}</span>
          <span class="date pull-right">{{BUSINESS.finishTime.substring(0,10)}}</span>
        </router-link>
        <my-pagination :totalNum="page.total" @currentChange="currentChange"></my-pagination>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import businessCompleteSearchBar from '@/main/component/businessCompleteSearchBar.vue';
import searchBar from '../../component/searchBar.vue';
import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import myPagination from '../../component/pagination.vue';

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
      simpleSearch: true,
      searchDown: true,
      searchUp: false,
      higherSearch: false,
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
    showHigherSearch() {
      if (this.higherSearch === false) {
        this.higherSearch = true;
        this.simpleSearch = false;
        this.searchUp = true;
        this.searchDown = false;
      } else {
        this.higherSearch = false;
        this.simpleSearch = true;
        this.searchUp = false;
        this.searchDown = true;
      }
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
    currentChange(newPage) {
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
      return '/business-complete-list/business-complete-detail-'+BUSINESS.id;
    }
  },
  components: {
    crumbs,
    card,
    businessCompleteSearchBar,
    searchBar,
    myPagination
  }
}
</script>

<style lang="sass" scoped>
.higher-search {
  margin-top: 30px;
}
.com-list > .list-group-item {
    padding-left: 32px;
}
.com-list > .list-head {
    padding-left: 32px;
}
.search-form {
  padding-left: 0;
  padding-right: 0;
}
</style>
