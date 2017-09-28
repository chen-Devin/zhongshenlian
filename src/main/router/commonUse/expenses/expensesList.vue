<template>
  <div class="main">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <button class="btn my-btn submit-btn f-r">申请报销</button>
      <h5 class="main-title">报销列表</h5>
    </card>
    <card>
      <table class="table table-bordered table-hover com-list">
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
            <td class="ta-c">{{ item.company }}</td>
            <td class="ta-c">{{ item.depart }}</td>
            <td class="ta-c">{{ item.applicant }}</td>
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
      expensesList: [{
        id: 1,
        company: '天津中审联会计师事务所有限责任公司',
        depart: '业务部',
        applicant: '李四',
        type: '差旅费报销',
        time: '2017-07-23 19:03:11'
      }]
    };
  },
  methods: {
    checkDetail (item) {
      console.log(item)
      this.$router.push('/expenses-record')
    }
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