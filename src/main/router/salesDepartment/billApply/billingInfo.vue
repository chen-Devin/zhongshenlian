<template>
  <div class="billing-info">
    <h4 class="main-title">
      新增开票申请
      <div class="pull-right mr-20">
        <button class="btn my-btn submit-btn" @click="submit()">提交</button>
        <button class="btn my-btn cancel-btn" @click="cancel()">撤销</button>
      </div>
    </h4>
    <div class="project-message">
      <el-row>
        <el-col :span="8">
          项目编号：{{ business.contractNo }}
        </el-col>
        <el-col :span="8">
          项目名称：{{ business.projectName }}
        </el-col>
        <el-col :span="8">
          合同金额：{{ business.contractAmount }} 元
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          开票申请人：{{ user.name }}
        </el-col>
        <el-col :span="8">
          申请时间：{{ requestTime }}
        </el-col>
        <el-col :span="8">
          累计开票金额：{{ business.sumBillingAmount }} 元
        </el-col>
      </el-row>
    </div>
    <div class="bill-message">
      <el-form 
        :model="bill" 
        :label-position="labelPosition"
        :rules="rules"
        ref="bill"
        label-width="80px" 
        class="bill-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="本次开票金额：" label-width="110px" prop="billingAmount">
              <el-input placeholder="请输入本次开票金额" type="number" v-model="bill.billingAmount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位电话：" prop="companyPhone">
              <el-input placeholder="请输入单位电话" v-model="bill.companyPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="销售方单位名称：" label-width="120px">
              <div>{{ bill.billingUnit }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户银行：" prop="openCountBank">
              <el-input placeholder="请输入开户银行" v-model="bill.openCountBank"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请开票种类：" label-width="120px" prop="billingType">
              <el-select  v-model="bill.billingType" placeholder="选择开票种类">
                <el-option 
                v-for="(TYPE, index) in billingTypes" 
                :value="TYPE" 
                :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户账号：" prop="openBankNumber">
              <el-input placeholder="请输入开户账号" v-model="bill.openBankNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位名称：" prop="companyName">
              <el-select  v-model="bill.companyName" placeholder="选择单位名称">
                <el-option 
                v-for="(item, index) in companyArray" 
                :value="item" 
                :key="index">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="单位名称：" prop="companyName">
              <el-input placeholder="请输入单位名称" v-model="bill.companyName"></el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务内容：" prop="serviceContent">
              <el-select  v-model="bill.serviceContent" placeholder="选择服务内容">
                <el-option 
                v-for="(TYPE, index) in serviceContents" 
                :value="TYPE" 
                :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="纳税人识别号：" label-width="110px" prop="taxpayerNumber">
              <el-input placeholder="请输入纳税人识别号" v-model="bill.taxpayerNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="送达方式：" prop="deliveryMethod">
              <el-select  v-model="bill.deliveryMethod" placeholder="选择送达方式">
                <el-option 
                v-for="(TYPE, index) in deliveryMethods" 
                :value="TYPE" 
                :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：" label-width="60px" prop="remark">
              <el-input placeholder="请输入备注信息" type="textarea" :rows="4" v-model="bill.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="bill.deliveryMethod==='快递'">
            <el-form-item label="快递收件人：" label-width="90px" prop="recipientName">
              <el-input placeholder="请输入快递收件人" v-model="bill.recipientName"></el-input>
            </el-form-item>
            <el-form-item label="收件地址：" label-width="80px" prop="recipientAddress">
              <el-input placeholder="请输入收件地址" v-model="bill.recipientAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'billingInfo',
  data() {
    return {
      bill: {
        billingUnit: this.business.applicantCompany,
        id: '',
        projectId: this.business.id,
        billingApplicantId: this.user.id,
        billingApplicantName: this.user.name,
        billingApplicantPhone: this.user.telephone,
        requesterId: this.business.requesterId,
        requesterName: this.business.requesterName,
        requesterPhone: this.business.requesterPhone,
        billingType: '',
        billingAmount: '',
        companyName: '',
        taxpayerNumber: '',
        companyAddress: this.business.companyAddress,
        companyPhone: this.business.companyPhone,
        openCountBank: '',
        openBankNumber: '',
        applicationDate: '',
        totalBillingAmount: '',
        billingDate: '',
        deliveryMethod: '',
        recipientName: '',
        recipientId: '',
        recipientAddress: '',
        signContractNumber: this.business.contractNo,
        serviceContent: '',
        signContractAmount: this.business.contractAmount,
        startServiceTime: '',
        endServiceTime: '',
        annexArray: [],
      },
      billingTypes: ['增值税普通发票', '增值税专用发票'],
      deliveryMethods: ['申请人送达', '快递'],
      labelPosition: 'left'
    }
  },
  computed: {
    requestTime () {
      let nd = new Date()
      let y = nd.getFullYear()
      let m = nd.getMonth() + 1
      let d = nd.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      return y + '-' + m + '-' + d
    },
    // billingUnit() {
    //   if (this.business.contractType.name === "联合体") {
    //     return this.business.contractType.basicFee.main.name
    //   } else {
    //     if (this.business.reportType[0] === "会计所") {
    //       return '天津中审联有限责任会计师事务所'
    //     } else if (this.business.reportType[0].department === "造价所") {
    //       return '天津中审联工程造价咨询有限公司'
    //     } else if (this.business.reportType[0].department === "评估所") {
    //       return '天津中审联资产评估有限公司'
    //     } else if (this.business.reportType[0].department === "税务所") {
    //       return '天津中审联税务师事务所有限公司'
    //     } else if (this.business.reportType[0].department === "BH") {
    //       return '天津中审联有限责任会计师事务所滨海新区分所'
    //     } else if (this.business.reportType[0].department === "QT") {
    //       return '其他'
    //     } else {
    //       return ''
    //     }
    //   }
    // },
    serviceContents() {
      if (this.business.contractType.name === "联合体") {
        return ['无'];
      } else {
        if (this.business.reportType[0] === "会计所") {
          return ['审计费', '验资费', '咨询费', '专项审计费'];
        } else if (this.business.reportType[0].department === "造价所") {
          return ['审计费','审核费', '咨询费'];
        } else if (this.business.reportType[0].department === "评估所") {
          return ['评估费'];
        } else if (this.business.reportType[0].department === "税务所") {
          return ['咨询费', '鉴证费'];
        } else if (this.business.reportType[0].department === "BH") {
          return ['会计服务费', '咨询费', '服务费', '审计费', '验资费'];
        } else if (this.business.reportType[0].department === "QT") {
          return ['审计费', '验资费', '咨询费', '专项审计费', '审核费', '评估费', '鉴证费', '会计服务费', '服务费'];
        } else {
          return '';
        }
      }
    }
  },
  props: ['business', 'user', 'companyArray'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.bill.applicationDate = this.requestTime
      // this.bill.billingUnit = this.billingUnit
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'createBillingInfo',
                platform: 'web',
                id: this.business.id,
                data: this.bill
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('开票成功')
            this.cancel()
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    }
  },
  created () {
    
  },
  components: {
    
  }
};
</script>

<style lang="sass" scoped>
  .billing-info {
    > .project-message {
      padding-left: 45px;
      padding-right: 45px;
      margin-bottom: 30px;
      background-color: #f9fbfe;
      overflow: hidden;
      >.el-row {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    > .bill-message {
      padding-left: 60px;
      padding-right: 40px;
      .el-col {
        padding-right: 20px;
      }
    }
  }
</style>