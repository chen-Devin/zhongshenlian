<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card class="card-tabs" style="box-shadow: none;">
      <el-tabs class="f-l" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane 
          :label="tab.label" 
          :name="tab.name"
          v-for="(tab, index) in tabList"
          :key="index"></el-tab-pane>
      </el-tabs>
      <search-bar 
        class="f-r" 
        :searchItems="searchItems"
        @search="search" v-if="reloadSearch"></search-bar>
    </card>
    <radios :companyList="companyList" @changeClick="changeClick"></radios>
    <card style="margin-top: 0;">
      <table class="table table-bordered table-hover table-list">
        <thead style="background: #fff;">
          <tr>
            <th>项目名称</th>
            <th>分管公司</th>
            <th v-if="projectShow">发起时间</th>
            <th v-else>项目发起人</th>
            <th v-if="projectShow">状态</th>
            <th v-else>变更申请人</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(project, index) in businessArray"
            @click="jumpLink(project)" 
            :key="index">
            <td v-if="projectShow">{{ project.businessName }}</td>
            <td v-else>{{ project.projectName }}</td>
            <td>{{ project.companyName }}</td>
            <td v-if="projectShow">{{ project.finishTime.substring(0,10) }}</td>
            <td v-else>{{ project.applicant }}</td>
            <td v-if="projectShow">
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
            <td v-else>{{ project.applyer }}</td>
          </tr>
        </tbody>
      </table>
      <p class="empty-list-p" v-if="businessArray.length === 0">暂无数据</p>
      <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="currentChange" v-if="reloadPagination"></my-pagination>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import radios from '../../component/selectRadio.vue'
import myPagination from '../../component/pagination.vue';
import searchBar from '@/main/component/searchBar.vue'

export default {
  name: 'businessReviewListLeader',
  data() {
    return {
      paths: [
        { name: '待办事项', url: '/expenses-review', present: true },
        { name: '立项审批', url: '/business-review-list-leader', present: true }
      ],
      data: {},
      businessArray: [],
      totalPage: 1,
      pageNum: 1,
      page: {
        total: 0,
        current: 0
      },
      activeName: 'project',
      tabList: [
        {
          label: '项目审批',
          name: 'project'
        },
        {
          label: '合同变更审批',
          name: 'change'
        }
      ],
      searchItems: [{
        label: '项目名称',
        value: 'projectName'
      }],
      projectShow: true,
      searchObj: {},
      reloadPagination: true,
      reloadSearch: true,
      companyList: [],
      projectNames: '',
      companyId: ''
    };
  },
  watch: {
    $route: 'getBusinessChecking',
    userId (a, b) {
      if (a) {
        this.getCompanyList();
      }
    }
  },
  computed : {
    userId () {
      return this.$store.getters.getUser.id
    }
  },
  created () {
    this.getCompanyList()
    this.getBusinessChecking()
  },
  methods: {
    jumpLink (project) {
      if (this.projectShow) {
        let routeData = this.$router.resolve({ path: '/business-review-detail-leader-'+project.id});
        window.open(routeData.href, '_blank');
      } else {
        let routeData = this.$router.resolve({ path: '/contract-change-check/'+project.id});
        window.open(routeData.href, '_blank');
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
      if(this.projectShow === true) {
        this.getBusinessChecking()
      } else {
        this.getContractChangeList()
      }
    },
    tabClick (tab, event) {
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
      if (tab.name === 'project') {
        this.projectShow = true       
        this.getBusinessChecking()
      } else if (tab.name === 'change') {
        this.projectShow = false
        this.getContractChangeList()
      }
    },
    currentChange(newPage) {
      this.pageNum = newPage
      if (this.projectShow == true) {
        this.getBusinessChecking()
      } else {
        this.getContractChangeList()
      } 
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
              platform: 'web',
              userId: this.userId
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
    getBusinessChecking() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getBusinessChecking',
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
          this.page.total = parseInt(rep.data.data.totalNum)
          this.page.current = this.pageNum
          this.businessArray = rep.data.data.businessArray
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    getContractChangeList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getContractChangeList',
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
            this.page.total = parseInt(rep.data.data.totalNum)
            this.page.current = this.pageNum
            this.businessArray = rep.data.data.businessArray
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    search (obj) {
      this.searchObj = {}
      this.searchObj = obj
      this.pageNum = 1
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500) 
      if (this.projectShow) {
        this.getBusinessChecking()  
      } else {
        this.getContractChangeList()
      } 
    }
  },
  components: {
    crumbs,
    card,
    myPagination,
    searchBar,
    radios
  }
}
</script>

<style lang="sass" scoped>
</style>
