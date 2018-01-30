<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card class="card-tabs">
      <el-tabs class="f-l" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane 
          :label="tab.label" 
          :name="tab.name"
          v-for="(tab, index) in tabList"
          :key="index"></el-tab-pane>
      </el-tabs>
      <router-link class="btn my-btn submit-btn pull-right add-btn" to="/business-review-add" tag="button" v-if="addBusiness">
        新建项目
      </router-link>
      <search-bar class="f-r" :searchItems="searchItems" v-if="reloadSearch"
      @search="search"></search-bar>
    </card>
    <select-radio @changeClick="changeClick" :companyList="companyList"></select-radio>
    <card style="margin-top: 0;">
      <table class="table table-bordered table-hover table-list" >
        <thead style="background-color: #fff;">
          <tr>
            <th>项目名称</th>
            <th>立项时间</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(project, index) in businessArray"
            @click="businessRoute(project)" 
            :key="index">
            <td>{{ project.projectName }}</td>
            <td>{{ project.standingTime }}</td>
            <td>
              <span class="label label-danger"
                    v-if="project.projectStatus==='0010'">尚未完成</span>
              <span class="label label-info"
                    v-else-if="project.projectStatus==='0020'||project.projectStatus==='0040'">已提交待审核</span>
              <span class="label label-warning"
                    v-else-if="project.projectStatus==='0030'||project.projectStatus==='0050'">已审核未通过</span>
              <span class="label label-success"
                    v-else-if="project.projectStatus==='0060'">待上传合同</span>
              <span class="label label-primary"
                    v-else-if="project.projectStatus==='0070'">待发合同编号</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="empty-list-p" v-if="businessArray.length === 0">暂无数据</p>
      <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange" v-if="reloadPagination"></my-pagination>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import myPagination from '../../component/pagination.vue';
import searchBar from '@/main/component/searchBar.vue'
import selectRadio from '@/main/component/selectRadio.vue'

export default {
  name: 'businessReviewListSales',
  data() {
    return {
      paths: [
        { name: '立项项目', url: '/business-review-list-sales', present: true }
      ],
      businessArray: [],
      addBusiness: false,
      totalPage: 1,
      totalNum: 1,
      searchObj: {},
      page: {
        total: 0,
        current: 0
      },
      tabList: [
        {
          label: '立项申请',
          name: 'business'
        },
        {
          label: '草稿箱',
          name: 'draft'
        }
      ],
      activeName: 'business',
      searchItems: [{
        label: '项目名称',
        value: 'projectName'
      }],
      reloadSearch: true,
      reloadPagination: true,
      pageNum: 1,
      //立项申请为0， 草稿箱为1 （搜索判断）
      contentType: 0,
      companyList: [],
      companyId: ''
    };
  },
  props: ['user'],
  created() {
    this.getUnDealListOfBusinessUnit();
    setTimeout(() => {
      this.addBusinessJud();
    }, 500);
    this.getCompanyList()
  },
  watch: {
    $route: 'getBusinessChecking'
  },
  methods: {
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
        if (this.contentType === 0) {
          this.getUnDealListOfBusinessUnit()
        } else if (this.contentType === 1) {
          this.getBusinessUnFinished()
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
    tabClick(tab, event) {
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
      if (tab.name === 'business') {
        this.getUnDealListOfBusinessUnit()
        this.contentType = 0
      } else if (tab.name === 'draft') {
        this.getBusinessUnFinished()
        this.contentType = 1
      }
    },
    search (obj) {
      this.searchObj = {}
      this.searchObj = obj
      this.pageNum = 1
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500)
      if (this.contentType === 0) {

        this.getUnDealListOfBusinessUnit()
      } else if (this.contentType === 1) {
        this.getBusinessUnFinished()
      }
    },
    addBusinessJud() {
      this.addBusiness = this.user.authority['项目立项'];
      this.addBusiness = true
    },
    currentChange(newPage) {
      this.pageNum = newPage
      // this.getBusinessChecking();
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
                type: 2,
                pageNum: this.pageNum,
                companyId: this.companyId
              }
              Object.assign(obj, this.searchObj);
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.totalNum = parseInt(rep.data.data.totalNum)
            this.businessArray = rep.data.data.businessArray
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    // getBusinessChecking() {
    //   axios({
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //     method: 'get',
    //     url: '/service',
    //     params: {
    //       data: (() => {
    //         var obj = {
    //           command: 'getBusinessChecking',
    //           platform: 'web',
    //           pageNum: this.pageNum
    //         }
    //         return JSON.stringify(obj);
    //       })()
    //     }
    //   }).then((rep) => {
    //     if (rep.data.statusCode === '10001') {
    //       this.page.total = parseInt(rep.data.data.totalNum);
    //       this.page.current = this.pageNum;
    //       this.businessArray = rep.data.data.businessArray;
    //     } else if (rep.data.statusCode === '10012') {
    //       window.location.href = 'signIn.html';
    //     }
    //   }, (rep) => { });
    // },
    getBusinessUnFinished () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getBusinessUnFinished',
                platform: 'web',
                pageNum: this.pageNum,
                companyId: this.companyId
              }
              Object.assign(obj, this.searchObj);
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.totalNum = parseInt(rep.data.data.totalNum)
            this.businessArray = rep.data.data.businessArray
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    businessRoute(business) {
      if (Number(business.projectStatus) >= 60) {
        this.$router.push('/business-review-detail-sales-' + business.id)
      } else {
        this.$router.push('/business-review-edit-' + business.id)
      }
    }
  },
  components: {
    crumbs,
    card,
    myPagination,
    searchBar,
    selectRadio
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
