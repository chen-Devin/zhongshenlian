<template>
  <div class="normal-wrap">
    <h4 class="main-title">
      新增开票申请
      <div class="pull-right">
        <button class="btn my-btn submit-btn" @click="sub()">提交</button>
        <button class="btn my-btn cancel-btn" @click="del()">撤销</button>
      </div>
    </h4>
    <p>{{ business }}</p>
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
          开票申请人：{{ bill.proposer.name }}
        </el-col>
        <el-col :span="8">
          申请时间：
        </el-col>
        <el-col :span="8">
          累计开票金额：
        </el-col>
      </el-row>
    </div>
    <div class="bill-message">
      <!-- <el-form 
        :model="bill" 
        :label-position="labelPosition"
        :rules="rules"
        ref="bill"
        label-width="100px" 
        class="bill-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="本次开票金额：" prop="name">
              <el-input v-model="bill.projectName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            
          </el-col>
        </el-row>
      </el-form> -->
    </div>
    <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
      <div class="form-group">
        <label class="col-sm-2 control-label">签订合同编号</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{business.contractNo}}</p>
        </div>
      </div>
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
    </form>
   <!--  <bill-sub-modal v-if="showSubModal" :initBill="bill" :business="business" @submited="submited" @canceled="subCanceled"></bill-sub-modal>
    <bill-del-modal v-if="showDelModal" :initBill="bill" @deleted="deleted" @canceled="delCanceled"></bill-del-modal> -->
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import maskedInput from 'vue-text-mask';

import billSubModal from './billSubModal.vue';
import billDelModal from './billDelModal.vue';
import currencyMask from '../../../currencyMask.js';


export default {
  name: 'billingInforEditor',
  data() {
    return {
      paths: [
        { name: '待处理项目', url: '/business-handle-list-sales', present: false },
        { name: '项目详情', url: `/business-handle-detail-sales-${this.$route.params.id}/billing-infor`, present: false },
        { name: '开票信息', url: `/business-handle-detail-sales-${this.$route.params.id}/billing-infor`, present: false },
        { name: '新增开票申请', url: `/business-handle-detail-sales-${this.$route.params.id}/billing-infor/billing-infor-editor`, present: true }
      ],
      nonFirst: false,
      user: {},
      bill: {
        id: '',
        proposer: {
          id: this.user.id,
          name: this.user.name,
          tele: this.user.telephone
        },
        addUpAmount: '',
        amount: '',
        type: '增值税普通发票',
        unit: {
          name: '',
          address: '',
          tele: '',
          depositBank: '',
          account: ''
        },
        billingUnit: '',
        taxpayerID: '',
        filingDate: (() => {
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
          let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })(),
        billingDate: (() => {
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
          let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })(),
        way: '申请人送达',
        receiver: '',
        receiveAdd: '',
        content: '',
        billFiles: [],
        receiptFiles: [],
        state: 0
      },
      showSubModal: false,
      showDelModal: false,
      companyName: [{
        name: ''
      }]
    };
  },
  computed: {
    requestTime () {
      let nd = new Date()
      return nd.getFullYear() + '-' + nd.getMonth() + '-' + nd.getDate()
    },
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    },
    billingUnit() {
      if (this.business.contractType.name === "联合体") {
        return this.business.contractType.basicFee.main.name;
      } else {
        if (this.business.reportType[0] === "会计所") {
          return '天津中审联有限责任会计师事务所';
        } else if (this.business.reportType[0].department === "造价所") {
          return '天津中审联工程造价咨询有限公司';
        } else if (this.business.reportType[0].department === "评估所") {
          return '天津中审联资产评估有限公司';
        } else if (this.business.reportType[0].department === "税务所") {
          return '天津中审联税务师事务所有限公司';
        } else if (this.business.reportType[0].department === "BH") {
          return '天津中审联有限责任会计师事务所滨海新区分所';
        } else if (this.business.reportType[0].department === "QT") {
          return '其他';
        } else {
          return '';
        }
      }
    },
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
    },
    companyNameOptions () {
      let arr = []
      this.companyName.forEach((item, index, array) => {
        arr.push(item.unit)
      })
      return arr
    }
  },
  props: ['business'],
  mounted() {
    this.$emit('pathsChan', this.paths);

    this.bill.addUpAmount = this.addUpAmountInit();
  },
  methods: {
    currencyMask,
    currencyToNum(amo) {
      let amoArr = amo.split(',').reverse();
      let amoNum = 0;
      for (let i = 0; i < amoArr.length; i++) {
        amoNum += parseFloat(amoArr[i])*Math.pow(1000, i);
      }
      return amoNum;
    },
    addUpAmountInit() {
      let sum = 0;
      for (let i = 0; i < this.business.bills.length; i++) {
        sum += this.currencyToNum(this.business.bills[i].amount);
      }
      let sumStr = sum.toString().split('.');
      let sumInt = sumStr[0];
      let sumArr = [];
      for (let i = sumInt.length; i > 0; i -= 3) {
        let part = sumInt.substring(i-3, i);
        sumArr.unshift(part);
      }
      return sumArr.join(',') + ((sumStr.length > 1) ? ('.'+sumStr[1]) : '');
    },
    commonCheck() {
      if (this.bill.unit.name === '' || this.bill.taxpayerID === '') {
        this.$message({
          message: '必须填写单位单位名称、纳税人识别号',
          type: 'warning'
        });
      } else {
        return true;
      }
    },
    amountCheck() {
      if (this.bill.amount === '') {
        this.$message({
          message: '请填写开票金额',
          type: 'warning'
        });
        return false;
      } else if (this.currencyToNum(this.bill.amount) <= 0) {
        this.$message({
          message: '开票金额必须大于零，请检查',
          type: 'warning'
        });
        return false;
      } else if (this.currencyToNum(this.bill.addUpAmount) + this.currencyToNum(this.bill.amount) > this.currencyToNum(this.business.contractAmount)) {
        this.$message({
          message: '开票金额总和不能大于合同预估金额',
          type: 'warning'
        });
        return false;
      } else {
        return true;
      }
    },
    typeCheck() {
      if (this.bill.type === '增值税专用发票') {
        if (this.bill.unit.address === '' || this.bill.unit.tele === '' || this.bill.unit.depositBank === '' || this.bill.unit.account === '') {
          this.$message({
            message: '增值税专用发票必须填写单位地址、电话以及开户银行、开户账号',
            type: 'warning'
          });
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    sub() {
      if (!this.commonCheck()) {
        return false;
      } if (!this.amountCheck()) {
        return false;
      } else if (!this.typeCheck()) {
        return false;
      } else {
        this.bill.billingUnit = this.billingUnit;
        this.showSubModal = true;
      }
    },
    submited(id) {
      this.bill.id = id;
      this.business.bills.push(this.bill);
      this.$emit('submited', this.business);
      this.showSubModal = false;
      this.$router.push({ path: 'billing-infor' });
    },
    subCanceled() {
      this.showSubModal = false;
    },
    del() {
      this.showDelModal = true;
    },
    deleted() {
      this.showDelModal = false;
      this.$router.push({ path: 'billing-infor' });
    },
    delCanceled() {
      this.showDelModal = false;
    },
    getBillingCompanyName () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getBillingCompanyName',
                platform: 'web',
                id: this.business.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.companyName = rep.data.data.companyName
            console.log(this.companyName)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    judgeIsFirst (isFirst) {  // 判断是否第一次开票
      if (isFirst === '0') {
        this.nonFirst = true
        this.bill.unit.name = this.business.bills[0].unit.name
        this.bill.taxpayerID = this.business.bills[0].taxpayerID
        this.bill.unit.address = this.business.bills[0].unit.address
        this.bill.unit.tele = this.business.bills[0].unit.tele
        this.bill.unit.depositBank = this.business.bills[0].unit.depositBank
        this.bill.unit.account = this.business.bills[0].unit.account
      }
    }
  },
  created () {
    // console.log(this.$route.params.isFirst)
    // this.judgeIsFirst(this.$route.params.isFirst)
    // this.getBillingCompanyName()
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
  },
  components: {
    billSubModal,
    billDelModal,
    maskedInput
  }
};
</script>

<style lang="sass" scoped>
</style>
