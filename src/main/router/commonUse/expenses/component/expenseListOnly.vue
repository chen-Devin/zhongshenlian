<template>
  <div>
    <card class="card-tabs">
      <button class="btn my-btn submit-btn f-r addi" @click="applyExpense" v-if="applyAble">申请报销</button>
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
            <td class="ta-c">{{ item.applicantName }}</td>
            <td class="ta-c">
              <span v-if="item.type === 'contractR'">合同报销</span>
              <span v-else-if="item.type === 'nonContractR'">非合同报销</span>
              <span v-else-if="item.type === 'personalR'">个人报销</span>
              <span v-else-if="item.type === 'publicR'">对公报销</span>
              <span v-else-if="item.type === 'projectR'">项目报销</span>
              <span v-else></span>
            </td>
            <td class="ta-c">{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
      <my-pagination :totalNum="Number(totalNum)" @currentChange="currentChange"></my-pagination>
    </card>
  </div>
</template>

<script>
import axios from 'axios'
import card from '@/main/component/card.vue'
import myPagination from '@/main/component/pagination.vue'

export default {
  name: 'expensesList',
  data() {
    return {
      user: {}
    }
  },
  props: ['expensesList', 'totalNum', 'applyAble', 'listType'],
  methods: {
    checkDetail (item) {
      if (item.type === 'contractR' ||  item.type === 'nonContractR') {
        this.$router.push('/expenses-trip/' + item.id + '&' + this.listType)
        // this.$router.push('/expenses-record/' + item.id + '/trip/' + this.listType)
      } else if (item.type === 'personalR' ||  item.type === 'publicR' ||  item.type === 'projectR') {
        this.$router.push('/expenses-special/' + item.id + '&' + this.listType)
        // this.$router.push('/expenses-record/' + item.id + '/special/' + this.listType)
      }
    },
    applyExpense () {
      this.$router.push('/expenses-apply')
    }
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
  },
  components: {
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