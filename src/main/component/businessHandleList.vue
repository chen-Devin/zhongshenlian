<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        进行中业务
          <search-bar  class="f-r" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <table class="table table-bordered table-hover table-list">
        <thead>
          <tr>
            <th class="text-center">项目名称</th>
            <th class="text-center">项目经理</th>
            <th class="text-center">立项时间</th>
            <th class="text-center">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(BUSINESS, index) in businesses"
              :key="index"
              @click.prevent="mod(BUSINESS)">
            <td class="text-center link-wrap">{{BUSINESS.businessName}}</td>
            <td class="text-center">{{BUSINESS.projectManager}}</td>
            <td class="text-center">{{立项时间}}</td>
            <td class="text-center">
              <template v-if="checkShow">
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
              </template>
              <template v-if="billShow">
                <span class="label label-warning"
                      v-if="BUSINESS.billState===0">未完成开票</span>
                <span class="label label-success"
                      v-else-if="BUSINESS.billState===1">已完成开票</span>
              </template> 
            </td>
          </tr>
        </tbody>
      </table>
      <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
    </card>
    <!-- <card> -->
      <!-- <form class="search-form" @submit.prevent @keyup.enter.prevent>
        <div class="row">
          <div class="col-md-11">
            <search-bar placeholder="请输入关键字进行搜索" @search="tog" v-show="simpleSearch"></search-bar>
          </div>
          <div class="col-md-10 replace" v-show="!simpleSearch"></div>
          <div class="col-md-1 higher-search f-r">
            <button type="button" class="btn my-btn high-btn f-r" @click="showHigherSearch()">
              高级搜索
              &nbsp;
              <img v-if="searchDown" class="search-icon" src="../../img/market/search_down.svg">
              <img v-if="searchUp" class="search-icon" src="../../img/market/search_up.svg">
            </button>
          </div>
        </div>
      </form>
      <business-complete-search-bar 
        @higherSearchEvent="higherSearchEvent"
        @reset="reset"
        v-if="higherSearch"></business-complete-search-bar> -->
     <!--  <h3 class="main-title">
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
          <template v-if="checkShow">
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
          </template>
          <template v-if="billShow">
            <span class="label label-warning"
                  v-if="BUSINESS.billState===0">未完成开票</span>
            <span class="label label-success"
                  v-else-if="BUSINESS.billState===1">已完成开票</span>
          </template>
          <span class="title">{{BUSINESS.businessName}}</span>
          <span class="date pull-right">{{BUSINESS.finishTime.substring(0,10)}}</span>
        </router-link>
        <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
      </div>
    </card> -->
  </div>
</template>

<script>
import axios from 'axios';
import searchBar from '@/main/component/searchBar.vue';
import businessCompleteSearchBar from '@/main/component/businessCompleteSearchBar.vue';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import myPagination from '@/main/component/pagination.vue';

export default {
  name: 'businessHandleList',
  data() {
    return {
      paths: [
        { name: '待处理业务', url: '/business-handle-list-sales', present: true }
      ],
      businesses: [],
      thiDepartment: this.department,
      totalPage: 1,
      totalNum: 1,
      checkShow: false,
      billShow: false,
      simpleSearch: true,
      higherSearch: false,
      searchCont: '',
      currentPage: 1,
      searchDown: true,
      searchUp: false,
      sea: {
        requester: '',
        requesterName: '',
        applicantName: '',
        time: {
          start: null,
          end: null
        },
        amount: '',
        type: '',
      },
      seaEmpty: {
        requester: '',
        requesterName: '',
        applicantName: '',
        time: {
          start: null,
          end: null
        },
        amount: '',
        type: '',
      }
    };
  },
  created() {
    if (this.iconType === "bill") {
      this.billShow = true
    } else {
      this.checkShow = true
    }
    this.getInfo(1);
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    mod(BUSINESS) {
      if (this.thiDepartment === 'office') {
        this.$router.push('/business-review-detail-office-' +BUSINESS.id)
      } else {
        this.$router.push('/business-handle-detail-' + this.department + '-' +BUSINESS.id)
      }
    },
    getInfo() {
      let start = ''
      let end = ''
      if (this.sea.time.start === null) {
        start = ''
      } else {
        start = this.sea.time.start
      }
      if (this.sea.time.end === null) {
        end = ''
      } else {
        end = this.sea.time.end
      }
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getBusinessReviewing',
              platform: 'web',
              searchContent: this.searchCont,
              beginTime: start,
              endTime: end,
              businessAmount: this.sea.amount,
              businessType: this.sea.type,
              requester: this.sea.requester,
              requesterName: this.sea.requesterName,
              applicantName: this.sea.applicantName,
              pageNum: this.currentPage
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.totalPage = parseInt(rep.data.data.pageNum);
          this.totalNum = parseInt(rep.data.data.totalNum);
          this.businesses.length = 0;
          for (let i = 0; i < rep.data.data.businessArray.length; i++) {
            let obj = {
              id: rep.data.data.businessArray[i].id,
              businessName: rep.data.data.businessArray[i].businessName,
              projectManager: rep.data.data.businessArray[i].projectManager,
              finishTime: rep.data.data.businessArray[i].finishTime,
              projectStatus: parseInt(rep.data.data.businessArray[i].projectStatus),
              billState: parseInt(rep.data.data.businessArray[i].financeCreateBillingState)
            };
            this.businesses.push(obj);
          }
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    businessRoute(BUSINESS) {
      if (this.thiDepartment === 'office') {
        return '/business-review-detail-office-' +BUSINESS.id;
      } else {
        return '/business-handle-detail-' + this.department + '-' +BUSINESS.id;
      }
    },
    currentChange(val) {
      this.currentPage = val;
      this.getInfo();
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
    higherSearchEvent (sea) {
      this.sea = sea
      this.searchCont = ''
      this.currentPage = 1
      this.getInfo()
    },
    tog(searchCont) {
      this.searchCont = searchCont
      this.sea = this.seaEmpty
      this.currentPage = 1
      this.getInfo()
    },
    reset () {
      this.currentPage = 1
      this.sea = this.seaEmpty
      this.getInfo()
    }
  },
  props: ['iconType', 'department'],
  components: {
    crumbs,
    card,
    searchBar,
    businessCompleteSearchBar,
    myPagination
  }
};
</script>

<style lang="sass" scoped>
.text-center {
  text-align: left; 
}
.table-bordered {
  margin-top: 30px;
}
.pull-right {
  margin-right: 30px;
}
.higher-search {
  margin-top: 30px;
}
.search-form {
  padding-left: 0;
  padding-right: 0;
}
</style>