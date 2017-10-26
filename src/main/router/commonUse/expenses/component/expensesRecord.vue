<template>
  <div class="main">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card class="card-tabs">
      <p class="btns f-r" v-if="this.$route.params.listType === 'review'">
        <button class="btn my-btn submit-btn" @click="agree" :disabled="btnDis">审批通过</button>
        <button class="btn my-btn cancel-btn" @click="showReject" :disabled="btnDis">驳回</button>
      </p>
      <h5 class="main-title">报销单据记录表</h5>
    </card>
    <card>
      <table class="table table-bordered table-list">
        <thead>
          <tr>
            <th class="text-center">姓名</th>
            <th class="text-center">摘要</th>
            <th class="text-center">报销金额</th>
            <th class="text-center">操作</th>
            <th class="text-center all">
              <input id="all" type="checkbox" name="all" v-model="checkAll">
              <label class="p-a" for="all">全选</label>
            </th>
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
            <td class="ta-c">
              <input type="checkbox" name="" :value="item.id" v-model="checkedProjects">
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="currentChange"></my-pagination> -->
      <!-- <p>{{ checkedProjects }} {{ checkedIdArray }}</p> -->
    </card>
    <reject-expense-modal
      v-if="rejectShow"
      @rejected="rejected"
      @cancel="cancel"></reject-expense-modal>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import myPagination from '@/main/component/pagination.vue';
import rejectExpenseModal from './rejectExpenseModal.vue';

export default {
  name: 'expensesList',
  data() {
    return {
      paths: [],
      expensesRecords: [{
        id: '',
        name: '',
        summary: '',
        amount: ''
      }],
      pageNum: 1,
      checkedProjects: [],
      checkAll: false,
      rejectShow: false,
      allProjects: []
    };
  },
  computed: {
    checkedIdArray () {
      let arr = []
      this.checkedProjects.forEach((item) => {
        arr.push(
          {
            id: item
          }
        )
      })
      return arr
    },
    btnDis () {
      if (this.checkedIdArray.length) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    checkAll: function (val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.checkedProjects = this.allProjects
        } else if (this.checkedProjects.length === this.allProjects.length) {
          this.checkedProjects = []
        }
      }
    },
    checkedProjects: function (val, oldVal) {
      if (val !== oldVal) {
        if (val.length !== this.allProjects.length) {
          this.checkAll = false
        }
      }
    }
  },
  methods: {
    checkDetail (item) {
      if (this.$route.params.type === '差旅费报销') {
        this.$router.push('/expenses-trip/' + item.id + '&' + 'review')
      } else if (this.$route.params.type === '特殊报销') {
        this.$router.push('/expenses-special/' + item.id + '&' + 'review')
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
            this.allProjects = []
            this.expensesRecords.forEach((item) => {
              this.allProjects.push(item.id)
            })
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    agree () {
      this.handleReimbursement('通过', '').then(() => {
        this.getExpensesRecords()
      }, () => {})
    },
    rejected (reason) {
      this.handleReimbursement('不通过', reason).then(() => {
        this.getExpensesRecords()
      }, () => {})
    },
    showReject () {
      this.rejectShow = true
    },
    cancel () {
      this.rejectShow = false
    },
    handleReimbursement (type, reason) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'handleReimbursement',
                platform: 'web',
                result: type,
                idArray: this.checkedIdArray,
                reason: reason
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('审批成功')
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
    if (this.$route.params.listType === 'list') {
      this.paths = [
        { name: '报销申请', url: '/expenses-list', present: false },
        { name: '报销列表', url: '/expenses-list', present: false },
        { name: '报销单据', url: '/expenses-record', present: true }
      ]
    } else if (this.$route.params.listType === 'review') {
      this.paths = [
        { name: '待处理业务', url: '/expenses-review', present: false },
        { name: '单据审核', url: '/expenses-review', present: false },
        { name: '报销单据记录表', url: '/expenses-record', present: true }
      ]
    }
  },
  components: {
    crumbs,
    card,
    myPagination,
    rejectExpenseModal
  }
}
</script>

<style lang="sass" scoped>
  .com-list thead {
      background-color: #E6E6E6;
  }
  .table-bordered > tbody > tr {
    // cursor: pointer;
  }
  .table-bordered > tbody > tr > td {
      border: none;
  }
  .all {
    label {
      line-height: 21px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
</style>