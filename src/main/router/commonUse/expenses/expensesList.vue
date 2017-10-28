<template>
  <div class="main">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <expense-list-only :expensesList="expensesList" :applyAble="applyAble" listType="list" :totalNum="totalNum" @currentChange="currentChange" @search="search"></expense-list-only>
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
      totalNum: 1,
      paths: [
        { name: '报销申请', url: '/expenses-list', present: false },
        { name: '报销列表', url: '/expenses-list', present: true }
      ],
      expensesList: [{
        id: '',
        companyName: '',
        departmentName: '',
        applicantName: {},
        type: '',
        time: ''
      }],
      applyAble: true,
      searchObj: {}
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
                type: '4',
                pageNum: this.pageNum
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.totalNum = Number(rep.data.data.totalNum)
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
      this.getUnDealRListOfFinance()
    },
    search (obj) {
      this.searchObj = {}
      this.searchObj = obj
      this.pageNum = 1
      this.getUnDealRListOfFinance()
    }
  },
  created () {
    this.getUnDealRListOfFinance()
  },
  components: {
    crumbs,
    expenseListOnly
  }
}
</script>

<style lang="sass" scoped></style>