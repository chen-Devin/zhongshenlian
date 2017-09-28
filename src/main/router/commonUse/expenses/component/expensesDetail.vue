<template>
  <div class="expenses-detail">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <h5 class="main-title">可报销金额：1</h5>
      <div class="title-wrapper">
        <el-row>
          <el-col :span="6">
            报销方式：合同报销
          </el-col>
          <el-col :span="6">
            合同号：12345678
          </el-col>
          <el-col :span="6">
            开票类型：电子发票报销
          </el-col>
          <el-col :span="6">
            申请人：张三
          </el-col>
        </el-row>
      </div>
    </card>
    <card class="card2">
      <div class="message-box">
        <el-row>
          <el-col :span="12">
            报销单ID：1127930482679
          </el-col>
          <el-col :span="12">
            预算所属公司：天津天天会计事务所
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            所在公司：天津中审联事务所
          </el-col>
          <el-col :span="12">
            预算所属部门：会计部
          </el-col>
        </el-row>
      </div>
      <div class="electronical-bill">
        <div class="title">
          电子发票报销
        </div>
        <el-row class="table-title">
          <el-col :span="5" :offset="5">
            附件张数
          </el-col>
          <el-col :span="5">
            金额
          </el-col>
          <el-col :span="5">
            单笔金额
          </el-col>
        </el-row>
        <el-row v-for="(item, index) in electronicalBills" :key="index">
          <el-col :span="5">
            {{ item.type }}
          </el-col>
          <el-col :span="5">
            {{ item.numbers }}
          </el-col>
          <el-col :span="5">
            {{ item.accounts }} 元
          </el-col>
          <el-col :span="5">
            <div v-for="(each, jndex) in item.list" :key="jndex">
              {{ each.account }} 元
            </div>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, jndex) in item.list" :key="jndex">
              <a href="each.address">下载</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </card>
    <card>
      <state-svg></state-svg>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import stateSvg from './stateSvg.vue';

export default {
  name: 'expensesList',
  data() {
    return {
      paths: [
        { name: '报销申请', url: '/expenses-list', present: false },
        { name: '报销列表', url: '/expenses-list', present: false },
        { name: '报销详情', url: '/expenses-detail', present: true }
      ],
      recordList: [{
        id: 1,
        name: '张三',
        abstract: '天津中审联会计师事务所项目报销申请',
        account: 500000.00
      }],
      electronicalBills: [{
        type: '交通费票据',
        numbers: '4',
        accounts: '999',
        list: [{
          account: 333,
          address: ''
        }, {
          account: 333,
          address: ''
        }, {
          account: 333,
          address: ''
        }]
      }, {
        type: '住宿费票据',
        numbers: '1',
        accounts: '999',
        list: [{
          account: 999,
          address: ''
        }]
      }]
    };
  },
  methods: {
    checkDetail (item) {
      
    }
  },
  components: {
    crumbs,
    card,
    stateSvg
  }
}
</script>

<style lang="sass" scoped>
  .expenses-detail {
    h5 {
      overflow: hidden;
    }
    .title-wrapper {
      width: 100%;
      margin-top: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-top: 1px solid #fafafa;
      overflow: hidden;
    }
    .card2 {
      .message-box {
        width: 100%;
        padding-top: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
        background-color: #fafafa;
      }
      .electronical-bill {
        padding-top: 10px;
        .title {
          margin-bottom: 10px;
          font-size: 15px;
          font-weight: 800;
        }
        .el-row {
          padding-top: 5px;
          padding-bottom: 5px;
          border-bottom: 1px solid #fafafa;
          &:nth-child(2), &:last-child {
            border: none;
          }
        }
      }
    }
  } 
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