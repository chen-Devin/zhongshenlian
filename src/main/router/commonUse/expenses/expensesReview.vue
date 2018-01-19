<template>
  <div class="main">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <expense-list-only :expensesList="expensesList" listType="review" :totalNum="totalNum" @currentChange="currentChange" @search="search"></expense-list-only>
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
      searchObj: {}
    }
  },
  watch: {
    $route: function(val, oldVal) {
      if (val !== oldVal) {
        this.pageNum = 1
        this.getUnDealRListOfFinance()
      }
    }
  },
  methods: {
    getUnDealRListOfFinance () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUnDealRListOfFinance',
                platform: 'web',
                type: this.$route.params.id,
                pageNum: this.pageNum
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
    getExpensesList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUnDealRListOfFinance',
                platform: 'web',
                type: 5,
                pageNum: this.pageNum
              }
              Object.assign(obj, this.searchObj)
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
      if (parseInt(this.$route.params.id) === 10) {
        this.getExpensesList()
      } else {
        this.getUnDealRListOfFinance()
      }
    },
    search (obj) {
      this.searchObj = {}
      this.searchObj = obj
      this.pageNum = 1
      if (parseInt(this.$route.params.id) === 10) {
        this.getExpensesList()
      } else {
        this.getUnDealRListOfFinance()
      }
    }
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      let user = this.$store.getters.getUser
      console.log(this.$route.params.id)
      if (parseInt(this.$route.params.id) === 0) {
        this.paths = [
          { name: '待处理项目', url: '/expenses-review', present: true },
          { name: '单据审核', url: '/expenses-review/0', present: true }
        ]
      } else if (parseInt(this.$route.params.id) === 1) {
        this.paths = [
          { name: '待处理项目', url: '/expenses-review', present: true },
          { name: '付款申请', url: '/expenses-review/1', present: true }
        ]
      } else if (parseInt(this.$route.params.id) === 2) {
        this.paths = [
          { name: '待处理项目', url: '/expenses-review', present: true },
          { name: '付款审批', url: '/expenses-review/2', present: true }
        ]
      } else if (parseInt(this.$route.params.id) === 10) {
        this.paths = [
          { name: '待办事项', url: '/expenses-review', present: true },
          { name: '报销审批', url: '/expenses-review/10', present: true }
        ]
      } else {
        this.paths = [
          { name: '报销审批', url: '/expenses-review/' + this.$route.params.id, present: true }
        ]
      }
      if (parseInt(this.$route.params.id) === 10) {
        this.getExpensesList()
      } else {
        this.getUnDealRListOfFinance()
      }
    }, () => { })
  },
  components: {
    crumbs,
    expenseListOnly
  }
}
</script>

<style lang="sass" scoped></style>