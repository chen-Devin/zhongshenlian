<template>
  <div class="main">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <expense-list-only :expensesList="expensesList" listType="list" :totalNum="totalNum" @currentChange="currentChange" @search="search" @changeClick="changeClick"></expense-list-only>
  </div>
</template>

<script>
import axios from 'axios'
import crumbs from '@/main/component/crumbs.vue'
import expenseListOnly from './component/expenseListOnly.vue'

export default {
  name: 'expensesList',
  data() {
    return {
      pageNum: 1,
      paths: [
        { name: '报销审批记录', url: '/expenses-review', present: true }
      ],
      expensesList: [{
        id: '',
        companyName: '',
        departmentName: '',
        applicantName: {},
        type: '',
        time: ''
      }],
      totalNum: 1,
      searchObj: {},
      projectNames: '',
      companyId: '',
      companyList: [],
      id: ''
    }
  },
  watch: {
    $route: function(val, oldVal) {
      if (val !== oldVal) {
        this.pageNum = 1
        this.getHandledHistory()
      }
    }
  },
  methods: {
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
        this.getHandledHistory()
    },
    getHandledHistory () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getHandledHistory',
                platform: 'web',
                pageNum: this.pageNum,
                companyId: this.companyId,
                id: this.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.totalNum = rep.data.data.totalNum
            this.expensesList = rep.data.data.reimbursementArray
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    currentChange (pageNum) {
      this.pageNum = pageNum
      this.getHandledHistory()
    },
    search (obj) {
      this.searchObj = {}
      this.searchObj = obj
      if (this.searchObj.id) {
        this.companyId = ''
        this.id = this.searchObj.id
      } else if (this.searchObj.companyName) {
        this.id = ''
        this.companyId = this.searchObj.companyName
      }
      this.pageNum = 1
      this.getHandledHistory()
    }
  },
  created () {
    this.getHandledHistory()
  },
  components: {
    crumbs,
    expenseListOnly
  }
}
</script>

<style lang="sass" scoped></style>