<template>
  <div class="change-check">
    <crumbs :paths="paths"></crumbs>
    <card class="card-top">
      <p class="f-r">
        <button class="btn my-btn submit-btn" @click="checkContractChange('通过')">审批通过</button>
        <button class="btn my-btn cancel-btn" @click="checkContractChange('不通过')">项目驳回</button>
      </p>
      <h5 class="ta-c">合同预估金额变更申请</h5>
      <el-row style="padding-left:32px;">
        <el-col :span="8">
          <p>项目名称：{{ business.projectName }}</p>
        </el-col>
        <el-col :span="8">
          <p>合同金额变更申请人：{{ business.changeApplerName }}</p>
        </el-col>
        <el-col :span="8">
          <p>申请人部门：{{ business.changeApplerDepartment }}</p>
        </el-col>
      </el-row>
      <div class="project-message">
        <p>项目信息</p>
        <el-row>
          <el-col :span="8">
            <p>项目编号：{{ business.projectNo }}</p>
          </el-col>
          <el-col :span="8">
            <p>委托单位（客户）：{{ business.requester }}</p>
          </el-col>
          <el-col :span="8">
            <p>计划工期：{{ business.startTime }} 至 {{ business.endTime }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>项目名称：{{ business.projectName }}</p>
          </el-col>
          <el-col :span="8">
            <p>客户联系人：***</p>
          </el-col>
          <el-col :span="8">
            <p>项目取得方式：{{ business.getWay }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>提交申请人：{{ business.applicantName }}</p>
          </el-col>
          <el-col :span="8">
            <p>业务类型：{{ business.businessType }}</p>
          </el-col>
          <el-col :span="8">
            <p>报价依据：{{ business.totalAssets }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>申请人所在部门：{{ business.applicantDepartment }}</p>
          </el-col>
          <el-col :span="8">
            <p>项目经理：{{ business.projectManager }}</p>
          </el-col>
          <el-col :span="8">
            <p>客户创建人：{{ business.RequesterFounder }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>出具报告类型：{{ reportTypeShow }}</p>
          </el-col>
        </el-row>
      </div>
    </card>
    <el-row class="amount-wrapper">
      <el-col :span="12">
        <card class="amount-card">
          <h5>合同预估金额：</h5>
          <p style="color:#50bef7;">{{ business.contractAmount }}元</p>
        </card>
      </el-col>
      <el-col :span="12">
        <card class="amount-card">
          <h5>合同变更金额：</h5>
          <p>{{ business.applyAccount }}元</p>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

import crumbs from '@/main/component/crumbs.vue'
import card from '@/main/component/card.vue'

export default {
  name: 'contractChangeCheck',
  data() {
    return {
      paths: [
        { name: '进行中业务', url: '/business-review-list-leader', present: false },
        { name: '合同变更审批', url: '', present: true }
      ],
      business: {}
    }
  },
  computed: {
    reportTypeShow () {
      let arr = []
      if (this.business.reportType instanceof Array) {
        this.business.reportType.forEach((item, index) => {
          let arr2 = []
          if (item.typeArray instanceof Array) {
            item.typeArray.forEach((jtem, jndex) => {
              arr2.push(jtem.name)
            })
          }
          arr.push(item.department + '(' + arr2 + ')')
        })
      }
      return arr.join(', ')
    }
  },
  created() {
    this.getContractChangeInfo()
  },
  methods: {
    getContractChangeInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getContractChangeInfo',
                platform: 'web',
                id: this.$route.params.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business = rep.data.data
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    checkContractChange (result) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'checkContractChange',
                platform: 'web',
                id: this.$route.params.id,
                result: result
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('操作成功')
            this.$router.push('/business-review-list-leader')
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    }
  },
  components: {
    crumbs,
    card
  }
}
</script>

<style lang="sass" scoped>
  .change-check {
    .card-top {
      padding: 15px 10px;
      h5 {
        height: 23px;
        line-height: 23px;
        font-size: 16px;
        margin-bottom: 13px;
      }
      .project-message {
        padding: 10px 5px;
        padding-top: 14px;
        padding-left: 32px;
        background-color: #f9fbfe;
      }
      .el-row {
        .el-col {
          line-height: 25px;
          padding-right: 20px;
          &:last-child {
            padding-right: 0;
          }
        }
      }
    }
    .amount-wrapper {
      padding-left: 20px;
      padding-right: 10px;
      .amount-card {
        display: flex;
        justify-content: center;
        padding: 50px 0;
        font-size: 16px;
        margin: 10px 0;
        h5 {
          height: 20px;
          line-height: 20px;
        }
        p {
          height: 20px;
          line-height: 20px;
          color: #FF9800;
        }
      }
      .el-col {
        &:first-child {
          padding-right: 5px;
        }
        &:last-child {
          padding-left: 5px;
        }
      }
    }
  }
</style>