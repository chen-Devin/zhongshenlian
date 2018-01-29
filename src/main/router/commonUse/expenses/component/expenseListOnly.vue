<template>
  <div>
    <card class="card-tabs">
      <button class="btn my-btn submit-btn f-r" @click="applyExpense" v-if="applyAble">申请报销</button>
      <h3 class="main-title">报销列表
        <search-bar  class="f-r" :searchItems="searchItems" @search="search"></search-bar></h3>
    </card>
    <select-radio @changeClick="changeClick" v-show="styleShow" :companyList="companyList"></select-radio>
    <card :class="{mt: styleShow}">
      <table class="table table-bordered table-hover table-list">
        <thead :class="{bgColor: styleShow}">
          <tr>
            <th class="text-left">公司</th>
            <th class="text-left">部门</th>
            <th class="text-left">申请人</th>
            <th class="text-left">报销类型</th>
            <th class="text-left">申请时间</th>
            <th class="text-left">状态</th>
            <th class="text-left">报销Id</th>
            <th class="text-left">金额</th>
            <th class="text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in expensesList" >
            <td class="text-left" @click="checkDetail(item)">{{ item.companyName || '暂无' }}</td>
            <td class="text-left" @click="checkDetail(item)">{{ item.departmentName || '暂无' }}</td>
            <td class="text-left" @click="checkDetail(item)">{{ item.applicantName || '暂无' }}</td>
            <td class="text-left" @click="checkDetail(item)">
              <span v-if="item.type === 'contractR'">合同报销</span>
              <span v-else-if="item.type === 'nonContractR'">非合同报销</span>
              <span v-else-if="item.type === 'personalR'">个人报销</span>
              <span v-else-if="item.type === 'publicR'">对公报销</span>
              <span v-else-if="item.type === 'projectR'">项目报销</span>
              <span v-else></span>
            </td>
            <td class="text-left" @click="checkDetail(item)">{{ item.time }}</td>
            <td class="text-left" @click="checkDetail(item)">{{ changeStatus(item.status) }}</td>
            <td class="text-left" @click="checkDetail(item)">{{ item.id }}</td>
            <td class="text-left" @click="checkDetail(item)">{{ item.amount }}</td>
            <td class="text-left backMessage" @click="backMessageClick(item)" v-if="changeStatus(item.status) === '发出申请'">
              撤销
            </td>
            <td class="text-left" v-else @click="checkDetail(item)">无法撤销</td>
          </tr>
        </tbody>
      </table>
      <p class="empty-list-p" v-if="expensesList.length === 0">暂无数据</p>
      <my-pagination :totalNum="Number(totalNum)" @currentChange="currentChange" v-if="reloadPagination"></my-pagination>
    </card>
  </div>
</template>

<script>
import axios from 'axios'
import card from '@/main/component/card.vue'
import myPagination from '@/main/component/pagination.vue'
import searchBar from '@/main/component/searchBar.vue';
import selectRadio from '@/main/component/selectRadio.vue'

export default {
  name: 'expensesList',
  data() {
    return {
      user: {},
      searchItems: [
        {
          label: '公司全称',
          value: 'companyName'
        }
      ],
      reloadPagination: true,
      styleShow: false,
      companyList: []
    }
  },
  props: ['expensesList', 'totalNum', 'applyAble', 'listType'],
  methods: {
    changeClick (radio) {
      this.$emit('changeClick', radio)
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
    checkDetail (item) {
      if (item.type === 'contractR' ||  item.type === 'nonContractR') {
        this.$router.push('/expenses-trip/' + item.id + '&' + this.listType)
        // this.$router.push('/expenses-record/' + item.id + '/trip/' + this.listType)
      } else if (item.type === 'personalR' ||  item.type === 'publicR' ||  item.type === 'projectR') {
        this.$router.push('/expenses-special/' + item.id + '&' + this.listType)
        // this.$router.push('/expenses-record/' + item.id + '/special/' + this.listType)
      }
    },
    backMessageClick (item) {
      this.$confirm('此操作将撤销申请, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    return new Promise((resolve, reject) => {
                      axios({
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                        method: 'get',
                        url: '/service',
                        params: {
                          data: (() => {
                            let obj = {
                              command: 'undoReimbursement',
                              platform: 'web',
                              id: item.id
                            }
                            return JSON.stringify(obj);
                          })()
                        }
                      }).then((rep) => {
                        if (rep.data.statusCode === '10001') {
                          this.$router.push('/expenses-list')
                          this.$message('撤销成功')
                          resolve('done');
                        } else {
                          this.$message.error(rep.data.msg)
                        }
                      }, (rep) => { });
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    })
                })
    },
    applyExpense () {
      this.$router.push('/expenses-apply')
    },
    search (obj) {
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500)
      this.$emit('search', obj)
    },
    currentChange (val) {
      let pageNum = val
      this.$emit('currentChange', pageNum)
    },
    changeStatus (status) {
      if (status === '0010') {
        return '发出申请'
      } else if (status === '0020') {
        return '部门通过'
      } else if (status === '0040') {
        return '财务核单'
      } else if (status === '0060') {
        return '所长通过'
      } else if (status === '0080') {
        return '付款申请'
      } else if (status === '0100') {
        return '付款审核'
      }
    }
  },
  created () {
    this.getCompanyList()
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
    //console.log(this.expensesList)
    console.log(this.$route.fullPath)
    if (this.$route.fullPath === '/expenses-review/10') {
      this.styleShow = true
    }
  },
  components: {
    card,
    myPagination,
    searchBar,
    selectRadio
  }
}
</script>

<style lang="sass" scoped>
  .backMessage:hover{
    color: #70b0e8;
  }
  .mt{
    margin-top: 0 !important;
  }
  .bgColor{
    background-color: #fff !important;
  }
</style>