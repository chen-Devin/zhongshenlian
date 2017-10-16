<template>
  <div class="billing-info">
    <h4 class="main-title">
      新增开票申请
      <div class="pull-right mr-20">
        <button class="btn my-btn submit-btn" @click="sub()">提交</button>
        <button class="btn my-btn cancel-btn" @click="del()">撤销</button>
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
          合同金额：{{ business.contractAmount }}
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
          累计开票金额：{{ totalAmount }}
        </el-col>
      </el-row>
    </div>
    <div class="bill-message">
      <el-form 
        :model="bill" 
        :label-position="labelPosition"
        :rules="rules"
        ref="bill"
        label-width="70px" 
        class="bill-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="本次开票金额" label-width="100px" prop="billingAmount">
              <el-input placeholder="请输入本次开票金额" v-model="bill.billingAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位电话" prop="companyPhone">
              <el-input placeholder="请输入单位电话" v-model="bill.companyPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="销售方单位名称" label-width="110px" prop="billingUnit">
              <el-input placeholder="请输入销售方单位名称" v-model="billingUnit" :disabled="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户银行" prop="openCountBank">
              <el-input placeholder="请输入开户银行" v-model="bill.openCountBank"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请开票种类" label-width="100px" prop="billingType">
              <el-select  v-model="business.billingType" placeholder="选择开票种类">
                <el-option 
                v-for="(TYPE, index) in billingTypes" 
                :value="TYPE" 
                :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户账号" prop="openBankNumber">
              <el-input placeholder="请输入开户账号" v-model="bill.openBankNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位名称" prop="companyName">
              <el-input placeholder="请输入单位名称" v-model="bill.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="送达方式" prop="deliveryMethod">
              <el-select  v-model="business.deliveryMethod" placeholder="选择送达方式">
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
            <el-form-item label="纳税人识别号" label-width="110px" prop="taxpayerNumber">
              <el-input placeholder="请输入纳税人识别号" v-model="bill.taxpayerNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务内容" prop="deliveryMethod">
              <el-select  v-model="business.serviceContent" placeholder="选择服务内容">
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
            <el-form-item label="备注" label-width="50px" prop="remark">
              <el-input placeholder="请输入备注信息" type="textarea" v-model="bill.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
      <div class="form-group">
        <label class="col-sm-2 control-label">签订合同编号</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{business.contractNo}}</p>
        </div>
      </div> -->
      <!-- <div class="form-group">
        <label class="col-sm-2 control-label">项目名称</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{business.name}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">签订合同金额</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{business.contractAmount===''?'':`${business.contractAmount}元`}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">累计开票金额</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.addUpAmount+'元'}}</p>
        </div>
      </div>
      <hr>
      <div class="form-group">
        <label class="col-sm-2 control-label">本次开票金额</label>
        <div class="col-sm-9">
          <div class="input-group">
            <masked-input type="text" class="form-control" placeholder="请输入本次开票金额" v-model="bill.amount" :mask="currencyMask" :guide="false" placeholderChar="#">
            </masked-input>
            <div class="input-group-addon">元</div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">销售方单位名称</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{ billingUnit }}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">申请开票种类</label>
        <div class="col-sm-9">
          <label class="radio-inline">
            <input type="radio" name="billType" value="增值税普通发票" v-model="bill.type"> 增值税普通发票
          </label>
          <label class="radio-inline">
            <input type="radio" name="billType" value="增值税专用发票" v-model="bill.type"> 增值税专用发票
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">
          单位名称<span class="text-danger">*</span>
        </label>
        <div class="col-sm-9">
          <select class="form-control" v-model="bill.unit.name" :disabled="nonFirst">
              <option disabled value="">请选择单位名称</option>
              <option v-for="option in companyNameOptions">{{ option }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">
          纳税人识别号<span class="text-danger">*</span>
        </label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="请输入纳税人识别号" v-model="bill.taxpayerID" :disabled="nonFirst">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">
          单位地址<span class="text-danger" v-show="bill.type==='增值税专用发票'">*</span>
        </label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="请输入单位地址" v-model="bill.unit.address" :disabled="nonFirst">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">
          单位电话<span class="text-danger" v-show="bill.type==='增值税专用发票'">*</span>
        </label>
        <div class="col-sm-9">
          <input type="tel" class="form-control" placeholder="请输入单位电话" v-model="bill.unit.tele" :disabled="nonFirst">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">
          开户银行<span class="text-danger" v-show="bill.type==='增值税专用发票'">*</span>
        </label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="请输入开户银行" v-model="bill.unit.depositBank" :disabled="nonFirst">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">
          开户账号<span class="text-danger" v-show="bill.type==='增值税专用发票'">*</span>
        </label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="请输入开户账号" v-model="bill.unit.account" :disabled="nonFirst">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">申请日期</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.filingDate}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">送达方式</label>
        <div class="col-sm-9">
          <label class="radio-inline">
            <input type="radio" name="sendWay" value="申请人送达" v-model="bill.way"> 申请人送达
          </label>
          <label class="radio-inline">
            <input type="radio" name="sendWay" value="快递" v-model="bill.way"> 快递
          </label>
        </div>
      </div>
      <div class="form-group" v-show="bill.way==='快递'">
        <label class="col-sm-2 control-label">快递收件人</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="请输入快递收件人" v-model="bill.receiver">
        </div>
      </div>
      <div class="form-group" v-show="bill.way==='快递'">
        <label class="col-sm-2 control-label">收件地址</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="请输入收件地址" v-model="bill.receiveAdd">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">服务内容</label>
        <div class="col-sm-9">
          <select class="form-control" v-model="bill.content">
              <option disabled value="">请选择服务内容</option>
              <option v-for="option in serviceContents">{{ option }}</option>
            </select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">备注栏</label>
        <div class="col-sm-9">
          <textarea maxlength="50" class="form-control" rows="3" placeholder="请输入备注 最多输入50个字" v-model="bill.remark"></textarea>
        </div>
      </div> -->
    <!-- </form> -->
   <!--  <bill-sub-modal v-if="showSubModal" :initBill="bill" :business="business" @submited="submited" @canceled="subCanceled"></bill-sub-modal>
    <bill-del-modal v-if="showDelModal" :initBill="bill" @deleted="deleted" @canceled="delCanceled"></bill-del-modal> -->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'billingInfo',
  data() {
    return {
      user: {},
      bill: {},
      billingTypes: [],
      deliveryMethods: [],
      serviceContents: [],
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
    totalAmount () {
      let total = 0
      if (this.business.projectBillingArray.length !== 0) {
        this.business.projectBillingArray.forEach((item) => {
          total += Number(item.billingAmount)
        })
      }
      return total
    },
    billingUnit() {
      if (this.business.contractType.name === "联合体") {
        return this.business.contractType.basicFee.main.name
      } else {
        if (this.business.reportType[0] === "会计所") {
          return '天津中审联有限责任会计师事务所'
        } else if (this.business.reportType[0].department === "造价所") {
          return '天津中审联工程造价咨询有限公司'
        } else if (this.business.reportType[0].department === "评估所") {
          return '天津中审联资产评估有限公司'
        } else if (this.business.reportType[0].department === "税务所") {
          return '天津中审联税务师事务所有限公司'
        } else if (this.business.reportType[0].department === "BH") {
          return '天津中审联有限责任会计师事务所滨海新区分所'
        } else if (this.business.reportType[0].department === "QT") {
          return '其他'
        } else {
          return ''
        }
      }
    },
  },
  props: ['business'],
  mounted() {
    
  },
  methods: {
    
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
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