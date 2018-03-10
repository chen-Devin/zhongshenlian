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
    <select-radio @changeClick="changeClick" :companyList="companyList" v-if="department === 'office'"></select-radio>
    <card>
      <h3 class="main-title" v-if="department === 'leader' || department === 'archives'">
        进行中项目
          <search-bar  class="f-r" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <select-radio @changeClick="changeClick" :companyList="companyList" style="margin: 0;" v-if="department === 'leader' || department === 'archives' || department === 'sales'"></select-radio>
      <h3 class="main-title" v-if="financialType === '0'">
        待开发票
          <search-bar  class="f-r" v-if="reloadSearch" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <select-radio @changeClick="changeClick" :companyList="companyList" style="margin: 0;" v-if="financialType === '0'"></select-radio>
      <h3 class="main-title" v-if="financialType === '1'">
        待上传截图
          <search-bar  class="f-r" v-if="reloadSearch" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <select-radio @changeClick="changeClick" :companyList="companyList" style="margin: 0;" v-if="financialType === '1'"></select-radio>
      <h3 class="main-title" v-if="financialType === '2'">
        开票撤销复核
          <search-bar  class="f-r" v-if="reloadSearch" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <select-radio @changeClick="changeClick" :companyList="companyList" style="margin: 0;" v-if="financialType === '2'"></select-radio>
      <h3 class="main-title" v-if="department === 'risk'">
        <span class="title-hover" @click="tabChange('project')">
          立项审批
          <span class="tran" v-show="!reportShow"></span>
        </span>
        <span class="title-hover" @click="tabChange('report')">
          报告审核
          <span class="tran" v-show="reportShow"></span>
        </span>
          <search-bar  class="f-r" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <select-radio @changeClick="changeClick" :companyList="companyList" style="margin: 0;" v-if="department === 'risk'"></select-radio>
      <table class="table table-bordered table-hover table-list">
        <thead :class="{bgColor: department === 'leader' || department === 'archives' || department === 'office' || department === 'sales' || financialType === '0' || financialType === '1' || financialType === '2'}">
          <tr>
            <th class="text-center">项目编号</th>
            <th class="text-center">项目名称</th>
            <th class="text-center">项目经理</th>
            <th class="text-center">立项时间</th>
            <th class="text-center">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(business, index) in businesses"
              :key="index"
              @click.prevent="mod(business)">
            <td class="text-center link-wrap">{{business.contractNo}}</td>
            <td class="text-center link-wrap">{{business.projectName}}</td>
            <td class="text-center">{{business.projectManager}}</td>
            <td class="text-center">{{business.startTime}}</td>
            <td class="text-center">
              <template v-if="checkShow">
                <span class="label label-warning"
                      v-if="business.projectStatus<130">未复审</span>
                <span class="label label-info"
                      v-else-if="business.projectStatus===130">待复审</span>
                <span class="label label-danger"
                      v-else-if="business.projectStatus===131">未通过</span>
                <span class="label label-success"
                      v-else-if="business.projectStatus===140">已通过</span>
                <span class="label label-primary"
                      v-else-if="business.projectStatus===150">已上传二维码</span>
                <span class="label label-default"
                      v-else-if="business.projectStatus===180">已完成</span>
              </template>
              <template v-if="billShow">
                <span class="label label-warning"
                      v-if="business.billState===0">未完成开票</span>
                <span class="label label-success"
                      v-else-if="business.billState===1">已完成开票</span>
              </template> 
              <template v-if="statusShow">
                <span class="label label-warning"
                      v-if="business.projectStatus === '0000'">废弃</span>
                <span class="label label-info"
                      v-else-if="business.projectStatus==='0011'">草稿</span>
                <span class="label label-danger"
                      v-else-if="business.projectStatus==='0020'">已提交</span>
                <span class="label label-success"
                      v-else-if="business.projectStatus==='0030'">质控部不通过</span>
                <span class="label label-primary"
                      v-else-if="business.projectStatus==='0040'">质控部通过</span>
                <span class="label label-default"
                      v-else-if="business.projectStatus==='0050'">所长不通过</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0060'">所长通过</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0070'">办公室审核完成</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0080'">办公室盖章完成</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0090'">办公室上传合同</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0110'">业务部上传报告</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0111'">业务部确认上传</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0112'">报告二维码上传完成</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0113'">办公室完成装订盖章</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0114'">办公室返回报告</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0120'">档案部归档</span>
                      <span class="label label-default"
                      v-else-if="business.projectStatus==='0130'">业务完结</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="empty-list-p" v-if="businesses.length === 0">暂无数据</p>
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
import selectRadio from '@/main/component/selectRadio.vue'
import myPagination from '@/main/component/pagination.vue';

export default {
  name: 'businessHandleList',
  data() {
    return {
      paths: [
        { name: '进行中项目', url: '/business-handle-list-sales', present: true }
      ],
      activeNameSales: 'report',
      activeNameOffice: 'review',
      tabListSales: [
        {
          label: '待上传报告',
          name: 'report'
        },
        {
          label: '待开票项目',
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
          label: '待上传合同',
          name: 'upload'
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
        },
        {
          label: '项目编号',
          value: 'contractNo'
        },
        {
          label: '项目经理',
          value: 'manageName'
        },
        {
          label: '金额',
          value: 'amount'
        }
      ],
      salesType: 0,
      officeType: 0,
      financeType: 0,
      pageNum: 1,
      reloadPagination: true,
      reloadSearch: true,
      searchObj: {},
      companyList: [],
      statusShow: false,
      reportShow: false,
      chooseType: '1'
    };
  },
  created() {
    this.getCompanyList()
    if (this.iconType === "bill") {
      this.billShow = true
    } else {
      this.checkShow = true
    }
    if (this.department === 'sales') {
      this.getUnDealListOfBusinessUnit()
    } else if (this.department === 'leader') {
      this.getBusinessReviewing()
    } else if (this.department === 'office') {
      this.getUnDealListOfOffice()
    } else if (this.department === 'archives') {
      this.getUnDealListOfArchives()
    } else if (this.department === 'financial') {
      this.statusShow = true
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
    tabChange (type) {
      if (type === 'report') {
        this.reportShow = true
        this.chooseType = '2'
        this.getUnDealListOfRiskAssessment()
      } else if (type === 'project'){
        this.chooseType = '1'
        this.reportShow = false
        this.getUnDealListOfRiskAssessment()
      }
    },
    changeClick (companyId) {
      this.companyList.forEach((item) => {
          if (item.id === companyId) {
            this.projectNames = item.name
          }
        })
        this.companyId = companyId
        if (companyId === 'all') {
          this.projectNames = ''
          this.companyId = ''
        }
        // console.log(this.projectNames)
        if (this.department === 'sales') {
          this.getUnDealListOfBusinessUnit()
        } else if (this.department === 'leader') {
          this.getBusinessReviewing()
        } else if (this.department === 'office') {
          this.getUnDealListOfOffice()
        } else if (this.department === 'archives') {
          this.getUnDealListOfArchives()
        } else if (this.department === 'financial') {
          this.getUnDealListOfFinance()
        } else if (this.department === 'risk') {
          this.getUnDealListOfRiskAssessment()
        } 
      //this.getUnDealRListOfFinance()
    },
    getCompanyList() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getCompanyList',
              platform: 'web'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.companyList = rep.data.data.companyList
        } else if (rep.data.statusCode === '10012') {
          // window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    tabClickSales (tab, event) {  
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
    tabClickOffice (tab, event) {  
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
      } else if (tab.name === 'change') {
        this.officeType = 4
      } else if (tab.name === 'upload') {
        this.officeType = 6
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
      } else if (this.department === 'leader') {
        this.getBusinessReviewing()
      }
    },
    mod(BUSINESS) {
      let routeData = this.$router.resolve({ path: '/business-handle-detail-' + this.department + '-' +BUSINESS.id});
      window.open(routeData.href, '_blank');
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
                pageNum: this.pageNum,
                companyId: this.companyId
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
                pageNum: this.pageNum,
                companyId: this.companyId
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
    getBusinessReviewing () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getBusinessReviewing',
                platform: 'web',
                pageNum: this.pageNum,
                companyId: this.companyId
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            console.log(rep.data.data.businessArray)
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
                pageNum: this.pageNum,
                companyId: this.companyId
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
                pageNum: this.pageNum,
                companyId: this.companyId
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
                pageNum: this.pageNum,
                companyId: this.companyId,
                type: this.chooseType
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
    businessRoute(BUSINESS) {
      return '/business-handle-detail-' + this.department + '-' +BUSINESS.id;
    },
    currentChange(val) {
      this.pageNum = val
      if (this.department === 'sales') {
        this.getUnDealListOfBusinessUnit()
      } else if (this.department === 'leader') {
        this.getBusinessReviewing()
      } else if (this.department === 'office') {
        this.getUnDealListOfOffice()
      } else if (this.department === 'archives') {
        this.getUnDealListOfArchives()
      } else if (this.department === 'financial') {
        this.getUnDealListOfFinance()
      } else if (this.department === 'risk') {
        this.getUnDealListOfRiskAssessment()
      }

    }
  },
  components: {
    crumbs,
    card,
    searchBar,
    businessCompleteSearchBar,
    myPagination,
    selectRadio
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
.bgColor{
  background-color: #fff;
}
.title-hover{
  display: inline-block;
  width: 150px;
  height: 100%;
  position: relative;
  cursor: pointer;
}
.tran{
  position: absolute;
  left: 15%;
  top: 25px;
  width: 0px;
  height: 0px;
border-width: 10px;
border-style: solid;
border-color: transparent transparent #C4F4FF transparent; 
}
</style>