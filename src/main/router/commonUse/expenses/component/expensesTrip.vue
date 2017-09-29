<template>
  <div class="expenses-detail">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <h5 class="main-title">可报销金额：1</h5>
      <div class="title-wrapper">
        <el-row>
          <el-col :span="6">
            报销方式：
            <el-select v-model="typeSelected" placeholder="请选择报销方式" disabled>
              <el-option
                v-for="item in typeOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="number">
            合同号：
            <el-input v-model="input" placeholder="请填写合同号" disabled></el-input>
          </el-col>
          <el-col :span="6">
            开票类型：
            <el-select v-model="classSelected" placeholder="请选择开票类型" disabled>
              <el-option
                v-for="item in classOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            申请人：张三
          </el-col>
        </el-row>
      </div>
    </card>
    <card class="card2">
      <expense-table></expense-table>
      <div class="message-box">
        <el-row>
          <el-col :span="12">
            报销单ID：1127930482679
          </el-col>
          <el-col :span="12">
            预算所属公司：
            <el-select v-model="companySelected" placeholder="请选择预算所属公司" disabled>
              <el-option
                v-for="item in companyOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            所在公司：天津中审联事务所
          </el-col>
          <el-col :span="12">
            预算所属部门：
            <el-select v-model="departmentSelected" placeholder="请选择预算所属部门" disabled>
              <el-option
                v-for="item in departmentOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="electronical-bill">
        <div class="title">
          电子发票报销
        </div>
        <el-row class="table-title">
          <el-col :span="4" :offset="4">
            附件张数
          </el-col>
          <el-col :span="4">
            金额
          </el-col>
          <el-col :span="4">
            单笔金额
          </el-col>
        </el-row>
        <el-row class="table-content" v-for="(item, index) in electronicalBills" :key="index">
          <el-col :span="4">
            {{ item.type }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="item.numbers" placeholder="请填写张数" disabled></el-input> 张
          </el-col>
          <el-col :span="4">
            <el-input v-model="item.accounts" placeholder="请填写金额" disabled></el-input> 元
          </el-col>
          <el-col :span="4">
            <div v-for="(each, jndex) in item.list" :key="jndex" class="each">
              <el-input v-model="each.account" placeholder="请填写单笔金额" disabled></el-input> 元
            </div>
          </el-col>
          <el-col :span="7">
            <div v-for="(each, jndex) in item.list" :key="jndex" class="each">
              <!-- <a href="each.address">下载</a> -->
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList">
                <el-button size="small" type="primary">上传文件</el-button>
                <span>建议文件大小不超过300kb</span>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
    </card>
    <card class="card3">
      <div class="f-l">报销状态：</div>
      <state-svg></state-svg>
      <div class="f-l">
        状态描述：
      </div>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="textarea"
        disabled>
      </el-input>
      <p class="btns">
        <button class="btn my-btn submit-btn">审批通过</button>
        <button class="btn my-btn cancel-btn">驳回</button>
      </p>
      <p class="btns">
        <button class="btn my-btn submit-btn">提交审批</button>
        <button class="btn my-btn cancel-btn">取消</button>
      </p>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import stateSvg from './stateSvg.vue';
import expenseTable from './expenseTable.vue';

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
      }],
      textarea: '',
      typeOptions: ['合同报销', '非合同报销'],
      classOptions: ['纸质发票报销', '电子发票报销'],
      companyOptions: ['会计所', '造价所', '评估所', '税务所'],
      departmentOptions: [],
      typeSelected: '非合同报销',
      classSelected: '',
      companySelected: '',
      departmentSelected: ''
    };
  },
  methods: {
    checkDetail (item) {
      
    }
  },
  components: {
    crumbs,
    card,
    stateSvg,
    expenseTable
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
      line-height: 36px;
      margin-top: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-top: 1px solid #fafafa;
      overflow: hidden;
      .el-select {
        width: 50%;
      }
      .number {
        .el-input {
          width: 50%;
        }
      }
    }
    .card2 {
      .message-box {
        width: 100%;
        padding-top: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
        margin-top: 10px;
        background-color: #fafafa;
        .el-row {
          line-height: 36px;
          margin-bottom: 10px;
        }
      }
      .electronical-bill {
        padding-top: 10px;
        .title {
          margin-bottom: 10px;
          font-size: 15px;
          font-weight: 800;
        }
        .table-content {
          line-height: 36px;
          .each {
            margin-top: 5px;
            &:first-child {
              margin-top: 0;
            }
          }
          .el-input {
            width: 50%;
          }
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
    .card3 {
      .btns {
        margin-top: 20px;
        text-align: center;
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