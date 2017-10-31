<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        已完成业务
          <search-bar  class="f-r" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <table class="table table-bordered table-hover table-list">
        <thead>
          <tr>
            <th class="text-center">合同号</th>
            <th class="text-center">项目名称</th>
            <th class="text-center">项目经理</th>
            <th class="text-center">分管公司</th>
            <th class="text-center">立项时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(BUSINESS, index) in businesses"
              :key="index"
              @click.prevent="mod(BUSINESS)">
            <td class="text-center">{{BUSINESS.contractNo}}</td>
            <td class="text-center link-wrap">{{BUSINESS.projectName}}</td>
            <td class="text-center">{{BUSINESS.projectManager}}</td>
            <td class="text-center">{{BUSINESS.companyName}}</td>
            <td class="text-center">{{BUSINESS.startTime}}</td>
          </tr>
        </tbody>
      </table>
      <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange" v-if="reloadPagination"></my-pagination>
    </card>
    <!-- <card>
      <form class="search-form" @submit.prevent @keyup.enter.prevent>
        <div class="row">
          <div class="f-r">
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
    </card> -->
  </div>
</template>

<script>
import axios from 'axios';
import businessCompleteSearchBar from '@/main/component/businessCompleteSearchBar.vue';
import searchBar from '@/main/component/searchBar.vue';
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
      reloadPagination: true,
      searchTog: false,
      simpleSearch: true,
      searchDown: true,
      searchUp: false,
      higherSearch: false,
      searchItems: [
        {
          label: '项目名称',
          value: 'projectName'
        }
      ],
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
      totalPage: 1,
      totalNum: 1,
      pageNum: 1
    };
  },
  created() {
    this.pageNum = 1;
    this.getBusinessFinished();
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    mod(BUSINESS) {
    this.$router.push('/business-complete-list/business-complete-detail-'+BUSINESS.id)
    },
    // seaTypeChan() {
    //   this.get(1);
    //   this.seaInit();
    // },
    // showHigherSearch() {
    //   if (this.higherSearch === false) {
    //     this.higherSearch = true;
    //     this.simpleSearch = false;
    //     this.searchUp = true;
    //     this.searchDown = false;
    //   } else {
    //     this.higherSearch = false;
    //     this.simpleSearch = true;
    //     this.searchUp = false;
    //     this.searchDown = true;
    //   }
    // },
    // seaInit() {
    //   this.sea = {
    //     searchContent: '',
    //     requester: '',
    //     requesterName: '',
    //     applicantName: '',
    //     time: {
    //       start: '',
    //       end: ''
    //     },
    //     amount: '所有',
    //     type: '所有',
    //   };
    // },
    // tog(seaCont) {
    //   this.searchTog = true;
    //   if (this.seaType === '关键字搜索') {
    //     this.sea.searchContent = seaCont;
    //   } else if (this.seaType === '条件查询') {
    //     this.sea.requester = seaCont.requester;
    //     this.sea.requesterName = seaCont.requesterName;
    //     this.sea.applicantName = seaCont.applicantName;
    //     this.sea.time.start = seaCont.time.start;
    //     this.sea.time.end = seaCont.time.end;
    //     this.sea.amount = seaCont.amount;
    //     this.sea.type = seaCont.type;
    //   }
    //   this.search(1);
    // },
    currentChange(val) {
      // if (this.searchTog) {
      //   this.search(newPage);
      // } else {
      //   this.get(newPage);
      // }
      this.pageNum = val;
      this.getBusinessFinished()
    },
    getBusinessFinished() {
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
                pageNum: this.pageNum
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.totalNum = parseInt(rep.data.data.totalNum);
            // this.page.current = newPage;
            this.businesses.length = 0;
            for (let i = 0; i < rep.data.data.businessArray.length; i++) {
              let obj = {
                id: rep.data.data.businessArray[i].id,
                companyName: rep.data.data.businessArray[i].companyName,
                finishTime: rep.data.data.businessArray[i].finishTime,
                startTime: rep.data.data.businessArray[i].startTime,
                projectManager: rep.data.data.businessArray[i].projectManager,
                projectName: rep.data.data.businessArray[i].projectName,
                contractNo: rep.data.data.businessArray[i].contractNo,
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
    // search(newPage) {
    //   let promise = new Promise((resolve, reject) => {
    //     axios({
    //       headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //       method: 'get',
    //       url: '/service',
    //       params: {
    //         data: (() => {
    //           var obj = {
    //             command: 'searchBusinessFinished',
    //             platform: 'web',
    //             searchContent: this.sea.searchContent === '' ? null : this.sea.searchContent,
    //             requester: this.sea.requester === '' ? null : this.sea.requester,
    //             requesterName: this.sea.requesterName === '' ? null : this.sea.requesterName,
    //             applicantName: this.sea.applicantName === '' ? null : this.sea.applicantName,
    //             beginTime: this.sea.time.start === '' ? null : this.sea.time.start,
    //             endTime: this.sea.time.end === '' ? null : this.sea.time.end,
    //             businessAmount: this.sea.amount === '所有' ? null : this.sea.amount,
    //             businessType: this.sea.type === '所有' ? null : this.sea.type,
    //             pageNum: newPage
    //           }
    //           return JSON.stringify(obj);
    //         })()
    //       }
    //     }).then((rep) => {
    //       if (rep.data.statusCode === '10001') {
    //         this.page.total = parseInt(rep.data.data.pageNum);
    //         this.page.current = newPage;
    //         this.businesses.length = 0;
    //         for (let i = 0; i < rep.data.data.businessArray.length; i++) {
    //           let obj = {
    //             id: rep.data.data.businessArray[i].id,
    //             businessName: rep.data.data.businessArray[i].businessName,
    //             finishTime: rep.data.data.businessArray[i].finishTime,
    //             projectStatus: parseInt(rep.data.data.businessArray[i].projectStatus)
    //           };
    //           this.businesses.push(obj);
    //         }
    //       } else if (rep.data.statusCode === '10012') {
    //         window.location.href = 'signIn.html';
    //       }
    //     }, (rep) => { });
    //   });
    //   return promise;
    // }
    search(obj) {
      this.searchObj = {}
      this.searchObj = obj
      this.pageNum = 1
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500)
      this.getBusinessFinished()
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
.text-center {
  text-align: left; 
}
.pull-right {
  margin-right: 30px;
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
