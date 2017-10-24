<template>
  <div class="main">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <h5 class="main-title">报销金额总计：</h5>
    </card>
    <card>
      <table class="table table-bordered table-list">
        <thead>
          <tr>
            <th class="text-center">姓名</th>
            <th class="text-center">摘要</th>
            <th class="text-center">报销金额</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in expensesRecords">
            <td class="ta-c">{{ item.name }}</td>
            <td class="ta-c">{{ item.summary }}</td>
            <td class="ta-c">{{ item.amount }}</td>
            <td class="ta-c">
              <a href="javascript:void(0);" @click="checkDetail(item)">查看</a>
            </td>
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
        { name: '报销列表', url: '/expenses-list', present: false },
        { name: '报销单据', url: '/expenses-record', present: true }
      ],
      expensesRecords: [{
        id: '',
        name: '',
        summary: '',
        amount: ''
      }],
      pageNum: 1
    };
  },
  methods: {
    checkDetail (item) {
      if (this.$route.params.type === '差旅费报销') {
        this.$router.push('/expenses-trip/' + item.id)
      } else if (this.$route.params.type === '特殊报销') {
        this.$router.push('/expenses-special/' + item.id)
      }
    },
    getExpensesRecords () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getExpensesRecords',
                platform: 'web',
                pageNum: this.pageNum,
                idR: this.$route.params.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.expensesRecords = rep.data.data.expensesRecords
            this.totalAmount = rep.data.data.totalAmount
            this.expensesRecords = [{
                                      id: 1,
                                      name: '张三',
                                      summary: '天津中审联会计师事务所项目报销申请',
                                      amount: 500000.00
                                    }]
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    }
  },
  created () {
    this.getExpensesRecords()
  },
  components: {
    crumbs,
    card,
    myPagination
  }
}
</script>

<style lang="sass" scoped>
  .com-list thead {
      background-color: #E6E6E6;
  }
  .table-bordered > tbody > tr {
    cursor: pointer;
  }
  .table-bordered > tbody > tr > td {
      border: none;
  }
</style>