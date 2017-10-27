<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card class="card-tabs" v-if="department === 'sales'">
      <el-tabs class="f-l" v-model="activeNameSales" @tab-click="tabClickSales">
        <el-tab-pane 
          :label="tab.label" 
          :name="tab.name"
          v-for="(tab, index) in tabListSales"
          :key="index"></el-tab-pane>
      </el-tabs>
      <search-bar 
        class="f-r" 
        :searchItems="searchItems"
        v-if="reloadSearch"
        @search="search"></search-bar>
    </card>
    <card class="card-tabs" v-if="department === 'office'">
      <el-tabs class="f-l" v-model="activeNameOffice" @tab-click="tabClickOffice">
        <el-tab-pane 
          :label="tab.label" 
          :name="tab.name"
          v-for="(tab, index) in tabListOffice"
          :key="index"></el-tab-pane>
      </el-tabs>
      <search-bar 
        class="f-r" 
        v-if="reloadSearch"
        :searchItems="searchItems"
        @search="search"></search-bar>
    </card>
    <card>
      <h3 class="main-title" v-if="department === 'leader' || department === 'archives'">
        进行中业务
          <search-bar  class="f-r" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <h3 class="main-title" v-if="financialType === '0'">
        待开发票
          <search-bar  class="f-r" v-if="reloadSearch" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <h3 class="main-title" v-if="financialType === '1'">
        待上传截图
          <search-bar  class="f-r" v-if="reloadSearch" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <h3 class="main-title" v-if="financialType === '2'">
        开票撤销复核
          <search-bar  class="f-r" v-if="reloadSearch" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <h3 class="main-title" v-if="department === 'risk'">
        报告审核
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
            <td class="text-center link-wrap">{{BUSINESS.projectName}}</td>
            <td class="text-center">{{BUSINESS.projectManager}}</td>
            <td class="text-center">{{BUSINESS.startTime}}</td>
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
      <my-pagination 
        :iniTotalPage="totalPage" 
        :totalNum="totalNum" 
        @currentChange="currentChange"
        v-if="reloadPagination"></my-pagination>
    </card>
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
        { name: '进行中业务', url: '/business-handle-list-sales', present: true }
      ],
      activeNameSales: 'report',
      activeNameOffice: 'review',
      tabListSales: [
        {
          label: '待上传报告',
          name: 'report'
        },
        {
          label: '待开票业务',
          name: 'bill'
        }
      ],
      tabListOffice: [
        {
          label: '待审核合同',
          name: 'review'
        },
        {
          label: '待盖章',
          name: 'sign'
        },
        {
          label: '待发放编号',
          name: 'number'
        },
        {
          label: '待打印装订盖章',
          name: 'signet'
        },
        {
          label: '待返回报告',
          name: 'back'
        },
        {
          label: '合同变更执行',
          name: 'change'
        }
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
      },
      searchItems: [
        {
          label: '项目名称',
          value: 'projectName'
        }
      ],
      salesType: 0,
      officeType: 0,
      financeType: 0,
      pageNum: 1,
      reloadPagination: true,
      reloadSearch: true,
      searchObj: {}
    };
  },
  created() {
    if (this.iconType === "bill") {
      this.billShow = true
    } else {
      this.checkShow = true
    }
    if (this.department === 'sales') {
      this.getUnDealListOfBusinessUnit()
    } else if (this.department === 'leader') {
      //  office leader archives
    } else if (this.department === 'office') {
      this.getUnDealListOfOffice()
    } else if (this.department === 'archives') {
      this.getUnDealListOfArchives()
    } else if (this.department === 'financial') {
      this.getUnDealListOfFinance()
    } else if (this.department === 'risk') {
      this.getUnDealListOfRiskAssessment()
    } 
  },
  computed: {
    financialType () {
      return this.$route.params.type
    }
  },
  watch: {
    financialType: function (val, oldVal) {
      if (val !== oldVal) {
        this.pageNum = 1
        this.reloadPagination = false
        setTimeout(() => {
          this.reloadPagination = true
        }, 500)
        this.reloadSearch = false
        setTimeout(() => {
          this.reloadSearch = true
        }, 500)
        this.searchObj = {}
        this.getUnDealListOfFinance()
      }
    }
  },
  props: ['iconType', 'department'],
  methods: {
    tabClickSales (tab, event) {  // 尚未给接口
      this.pageNum = 1
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500)
      this.reloadSearch = false
      setTimeout(() => {
        this.reloadSearch = true
      }, 500)
      if (tab.name === 'report') {
        this.salesType = 0
      } else if (tab.name === 'bill') {
        this.salesType = 1
      }
      this.searchObj = {}
      this.getUnDealListOfBusinessUnit()
    },
    tabClickOffice (tab, event) {  // 尚未给接口
      this.pageNum = 1
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500)
      this.reloadSearch = false
      setTimeout(() => {
        this.reloadSearch = true
      }, 500)
      if (tab.name === 'review') {
        this.officeType = 0
      } else if (tab.name === 'sign') {
        this.officeType = 1
      } else if (tab.name === 'signet') {
        this.officeType = 3
      } else if (tab.name === 'number') {
        this.officeType = 2
      } else if (tab.name === 'back') {
        this.officeType = 5
      }  else if (tab.name === 'change') {
        this.officeType = 4
      }
      this.searchObj = {}
      this.getUnDealListOfOffice()
    },
    search (obj) {
      this.searchObj = {}
      this.searchObj = obj
      this.pageNum = 1
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500)
      if (this.department === 'office') {
        this.getUnDealListOfOffice()
      } else if (this.department === 'archives') {
        this.getUnDealListOfArchives()
      } else if (this.department === 'financial') {
        this.getUnDealListOfFinance()
      } else if (this.department === 'risk') {
        this.getUnDealListOfRiskAssessment()
      } else if (this.department === 'sales') {
        this.getUnDealListOfBusinessUnit()
      }
    },
    mod(BUSINESS) {
      // if (this.thiDepartment === 'office') {
      //   this.$router.push('/business-review-detail-office-' +BUSINESS.id)
      // } else {
        this.$router.push('/business-handle-detail-' + this.department + '-' +BUSINESS.id)
      // }
    },
    getUnDealListOfBusinessUnit () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUnDealListOfBusinessUnit',
                platform: 'web',
                type: this.salesType,
                pageNum: this.pageNum
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.businesses = rep.data.data.businessArray
            this.totalNum = parseInt(rep.data.data.totalNum)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getUnDealListOfArchives () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUnDealListOfArchives',
                platform: 'web',
                pageNum: this.pageNum
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.businesses = rep.data.data.businessArray
            this.totalNum = parseInt(rep.data.data.totalNum)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getUnDealListOfOffice () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUnDealListOfOffice',
                platform: 'web',
                type: this.officeType,
                pageNum: this.pageNum
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.businesses = rep.data.data.businessArray
            this.totalNum = parseInt(rep.data.data.totalNum)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getUnDealListOfFinance () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUnDealListOfFinance',
                platform: 'web',
                type: this.$route.params.type,
                pageNum: this.pageNum
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.businesses = rep.data.data.businessArray
            this.totalNum = parseInt(rep.data.data.totalNum)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getUnDealListOfRiskAssessment () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUnDealListOfRiskAssessment',
                platform: 'web',
                pageNum: this.pageNum
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.businesses = rep.data.data.businessArray
            this.totalNum = parseInt(rep.data.data.totalNum)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    // getInfo() {
    //   let start = ''
    //   let end = ''
    //   if (this.sea.time.start === null) {
    //     start = ''
    //   } else {
    //     start = this.sea.time.start
    //   }
    //   if (this.sea.time.end === null) {
    //     end = ''
    //   } else {
    //     end = this.sea.time.end
    //   }
    //   axios({
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //     method: 'get',
    //     url: '/service',
    //     params: {
    //       data: (() => {
    //         var obj = {
    //           command: 'getBusinessReviewing',
    //           platform: 'web',
    //           searchContent: this.searchCont,
    //           beginTime: start,
    //           endTime: end,
    //           businessAmount: this.sea.amount,
    //           businessType: this.sea.type,
    //           requester: this.sea.requester,
    //           requesterName: this.sea.requesterName,
    //           applicantName: this.sea.applicantName,
    //           pageNum: this.pageNum
    //         }
    //         return JSON.stringify(obj);
    //       })()
    //     }
    //   }).then((rep) => {
    //     if (rep.data.statusCode === '10001') {
    //       this.totalPage = parseInt(rep.data.data.pageNum);
    //       this.totalNum = parseInt(rep.data.data.totalNum);
    //       this.businesses.length = 0;
    //       for (let i = 0; i < rep.data.data.businessArray.length; i++) {
    //         let obj = {
    //           id: rep.data.data.businessArray[i].id,
    //           businessName: rep.data.data.businessArray[i].businessName,
    //           projectManager: rep.data.data.businessArray[i].projectManager,
    //           finishTime: rep.data.data.businessArray[i].finishTime,
    //           projectStatus: parseInt(rep.data.data.businessArray[i].projectStatus),
    //           billState: parseInt(rep.data.data.businessArray[i].financeCreateBillingState)
    //         };
    //         this.businesses.push(obj);
    //       }
    //     } else if (rep.data.statusCode === '10012') {
    //       window.location.href = 'signIn.html';
    //     }
    //   }, (rep) => { });
    // },
    businessRoute(BUSINESS) {
      // if (this.thiDepartment === 'office') {
      //   return '/business-handle-detail-office-' +BUSINESS.id;
      // } else {
        return '/business-handle-detail-' + this.department + '-' +BUSINESS.id;
      // }
    },
    currentChange(val) {
      this.pageNum = val
      if (this.department === 'sales') {
        this.getUnDealListOfBusinessUnit()
      } else if (this.department === 'leader') {
        //  office leader archives
      } else if (this.department === 'office') {
        this.getUnDealListOfOffice()
      } else if (this.department === 'archives') {
        this.getUnDealListOfArchives()
      } else if (this.department === 'financial') {
        this.getUnDealListOfFinance()
      } 
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
    }
    // higherSearchEvent (sea) {
    //   this.sea = sea
    //   this.searchCont = ''
    //   this.pageNum = 1
    //   this.getInfo()
    // },
    // tog(searchCont) {
    //   this.searchCont = searchCont
    //   this.sea = this.seaEmpty
    //   this.pageNum = 1
    //   this.getInfo()
    // },
    // reset () {
    //   this.pageNum = 1
    //   this.sea = this.seaEmpty
    //   this.getInfo()
    // }
  },
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