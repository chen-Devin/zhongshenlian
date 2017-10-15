<template>
  <div class="main">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <button class="btn my-btn submit-btn f-r addi" @click="applyExpense">申请报销</button>
      <h5 class="main-title">报销列表</h5>
    </card>
    <card>
      <table class="table table-bordered table-hover table-list">
        <thead>
          <tr>
            <th class="text-center">公司</th>
            <th class="text-center">部门</th>
            <th class="text-center">申请人</th>
            <th class="text-center">报销类型</th>
            <th class="text-center">申请时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in expensesList" @click="checkDetail(item)">
            <td class="ta-c">{{ item.companyName }}</td>
            <td class="ta-c">{{ item.departmentName }}</td>
            <td class="ta-c">{{ item.applicantName.name }}</td>
            <td class="ta-c">{{ item.type }}</td>
            <td class="ta-c">{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="currentChange"></my-pagination> -->
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import myPagination from '@/main/component/pagination.vue';

export default {
  name: 'expensesList',
  data() {
    return {
      paths: [
        { name: '报销申请', url: '/expenses-list', present: false },
        { name: '报销列表', url: '/expenses-list', present: true }
      ],
      pageNum: 1,
      expensesList: [{
        id: '',
        companyName: '',
        departmentName: '',
        applicantName: {},
        type: '',
        time: ''
      }]
    };
  },
  methods: {
    getExpensesList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getExpensesList',
                platform: 'web',
                pageNum: this.pageNum
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.expensesList = rep.data.data.expensesList
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    checkDetail (item) {
      console.log(item)
      this.$router.push('/expenses-record/' + item.id + '/' + item.type)
    },
    applyExpense () {
      this.$router.push('/expenses-apply')
    }
  },
  created () {
    this.getExpensesList()
  },
  components: {
    crumbs,
    card,
    myPagination
  }
}
</script>

<style lang="sass" scoped>
  .addi {
    margin-top: 14px;
    margin-right: 40px;
  }
</style>