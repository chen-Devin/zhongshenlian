<template>
  <div class="normal-wrap">
    <h4 class="main-title">
      开票信息
      <div class="pull-right" v-if="uploadEnabled">
        <button class="btn btn-info" v-if="billNotUpload" @click="confirm" :disabled="disConfirm">已开票</button>
        <button class="btn btn-primary" v-else-if="receiptNotUpload" @click="finish" :disabled="disFinish">已收款</button>
      </div>
      <div class="pull-right" v-if="stateShow">
        <small class="label label-info" v-if="billNotUpload">尚未开票</small>
        <small class="label label-info" v-else-if="receiptNotUpload">尚未收款</small>
      </div>
      <small class="label label-success pull-right" v-if="finished">已完成该申请</small>
    </h4>
    <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
      <div class="form-group" v-if="uploadEnabled">
        <label class="col-sm-2 control-label">
          发票图片
        </label>
        <el-upload class="col-sm-9"
                  :multiple="false"
                  :action="uploadBill.URL"
                  :on-progress="uploadBillProgress"
                  :on-success="uploadBillSuccess"
                  :show-file-list="false">
          <button class="btn my-btn submit-btn"
                  type="button"
                  :disabled="uploadBill.progressShow">上传发票图片</button>
          <span slot="tip"
                class="text-info">&emsp;文件大小建议不超过3Mb</span>
        </el-upload>
        <div class="col-sm-offset-2 col-sm-9">
          <div class="progress-wrap" v-show="uploadBill.progressShow">
            <div class="progress">
              <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: uploadBill.percentage}">
                {{uploadBill.percentage}}
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-offset-2 col-sm-9">
          <ul class="com-list attachment-list list-group">
            <li class="list-group-item" v-for="(FILE,index) in bill.billFiles" :key="index">
              <span class="fa fa-file-text-o"></span>
              <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
              <a class="text-danger pull-right" @click="delBillFile(FILE)"><i class="fa fa-times"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="form-group" v-if="uploadEnabled">
        <label class="col-sm-2 control-label">
          收款图片
        </label>
        <el-upload class="col-sm-9"
                  :multiple="false"
                  :action="uploadReceipt.URL"
                  :on-progress="uploadReceiptProgress"
                  :on-success="uploadReceiptSuccess"
                  :show-file-list="false">
          <button class="btn my-btn submit-btn"
                  type="button"
                  :disabled="uploadReceipt.progressShow">上传收款图片</button>
          <span slot="tip"
                class="text-info">&emsp;文件大小建议不超过3Mb</span>
        </el-upload>
        <div class="col-sm-offset-2 col-sm-9">
          <div class="progress-wrap" v-show="uploadReceipt.progressShow">
            <div class="progress">
              <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: uploadReceipt.percentage}">
                {{uploadReceipt.percentage}}
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-offset-2 col-sm-9">
          <ul class="com-list attachment-list list-group">
            <li class="list-group-item" v-for="(FILE,index) in bill.receiptFiles" :key="index">
              <span class="fa fa-file-text-o"></span>
              <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
              <a class="text-danger pull-right" @click="delReceiptFile(FILE)"><i class="fa fa-times"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="form-group" v-if="uploadDisabled">
        <label class="col-sm-2 control-label">
          发票图片
        </label>
        <ul class="col-sm-9 com-list attachment-list list-group">
          <li class="list-group-item" v-for="(FILE,index) in bill.billFiles" :key="index">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
          </li>
        </ul>
      </div>
      <div class="form-group" v-if="uploadDisabled">
        <label class="col-sm-2 control-label">
          收款图片
        </label>
        <ul class="col-sm-9 com-list attachment-list list-group">
          <li class="list-group-item" v-for="(FILE,index) in bill.receiptFiles" :key="index">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">签订合同编号</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{business.number}}</p>
        </div>
      </div>
      <div class="form-group">
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
      <!-- <div class="form-group">
        <label class="col-sm-2 control-label">开票申请人</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.proposer.name}}</p>
        </div>
      </div>
      <div class="form-group" v-if="false">
        <label class="col-sm-2 control-label">申请人电话</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.proposer.tele}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">委托单位联系人</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{business.institution.name}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">联系人电话</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{business.institution.telephone}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">计划工期</label>
        <div class="col-sm-9">
          <div class="row">
            <div class="col-sm-6">
              <p class="form-control-static">开始时间：{{business.time.start}}</p>
            </div>
            <div class="col-sm-6">
              <p class="form-control-static">结束时间：{{business.time.end}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">合同体制</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{business.contractType.name}}</p>
        </div>
      </div>
      <div class="form-group"
          v-if="contractTypeChan">
        <label class="col-sm-2 control-label">基本取费</label>
        <div class="col-sm-9">
          <div class="row form-group">
            <div class="col-sm-6">
              <p class="form-control-static">
                主办方：{{business.contractType.basicFee.main.name}}
              </p>
            </div>
            <div class="col-sm-5">
              <p class="form-control-static">
                比例：{{business.contractType.basicFee.main.percentage}}%
              </p>
            </div>
          </div>
          <div class="row form-group"
              v-for="(DEPEND, index) in business.contractType.basicFee.depend"
              :key="index">
            <div class="col-sm-6">
              <p class="form-control-static">
                协办方：{{DEPEND.name}}
              </p>
            </div>
            <div class="col-sm-5">
              <p class="form-control-static">
                比例：{{DEPEND.percentage}}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group"
          v-if="contractTypeChan">
        <label class="col-sm-2 control-label">效益取费</label>
        <div class="col-sm-9">
          <div class="row form-group">
            <div class="col-sm-6">
              <p class="form-control-static">
                主办方：{{business.contractType.benefitFee.main.name}}
              </p>
            </div>
            <div class="col-sm-5">
              <p class="form-control-static">
                比例：{{business.contractType.benefitFee.main.percentage}}%
              </p>
            </div>
          </div>
          <div class="row form-group"
              v-for="(DEPEND, index) in business.contractType.benefitFee.depend"
              :key="index">
            <div class="col-sm-6">
              <p class="form-control-static">
                协办方：{{DEPEND.name}}
              </p>
            </div>
            <div class="col-sm-5">
              <p class="form-control-static">
                比例：{{DEPEND.percentage}}%
              </p>
            </div>
          </div>
        </div>
      </div> -->
      <div class="form-group">
        <label class="col-sm-2 control-label">累计开票金额</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.addUpAmount===''?'':`${bill.addUpAmount}元`}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">本次开票金额</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.amount===''?'':`${bill.amount}元`}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">销售方单位名称</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.billingUnit}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">申请开票种类</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.type}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">单位名称</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.unit.name}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">纳税人识别号</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.taxpayerID}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">单位地址</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.unit.address}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">单位电话</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.unit.tele}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">开户银行</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.unit.depositBank}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">开户账号</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.unit.account}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">申请日期</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.filingDate}}</p>
        </div>
      </div>
      <div class="form-group" v-if="receiptNotUpload">
        <label class="col-sm-2 control-label">开票日期</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.billingDate}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">送达方式</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.way}}</p>
        </div>
      </div>
      <div class="form-group" v-show="bill.way==='快递'">
        <label class="col-sm-2 control-label">快递收件人</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.receiver}}</p>
        </div>
      </div>
      <div class="form-group" v-show="bill.way==='快递'">
        <label class="col-sm-2 control-label">收件地址</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.receiveAdd}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">服务内容</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.content}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">备注</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.remark}}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Upload,Message } from 'element-ui';

Vue.use(Upload);
Vue.prototype.$message = Message;

export default {
  name: 'billingInforDetail',
  data() {
    return {
      paths: [],
      business: this.initBusiness,
      bill: {
        id: '',
        proposer: {
          id: '',
          name: '',
          tele: ''
        },
        addUpAmount: 0,
        amount: 0,
        billingUnit: '',
        type: '增值税普通发票',
        unit: {
          name: '',
          address: '',
          tele: '',
          depositBank: '',
          account: ''
        },
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
        way: '快递',
        receiver: '',
        receiveAdd: '',
        content: '',
        billFiles: [],
        receiptFiles: [],
        state: 0
      },
      uploadBill: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      },
      uploadReceipt: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      },
      disConfirm: false,
      disFinish: false,
    };
  },
  computed: {
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    },
    uploadEnabled() {
      return (this.user.department === '财务部' && this.business.projectStatus >= 80) ? true : false;
    },
    uploadDisabled() {
      return (this.user.department !== '财务部' && this.user.department !== '业务部' && this.business.projectStatus >= 80) ? true : false;
    },
    stateShow() {
      return (this.user.department !== '财务部' && this.business.projectStatus >= 80) ? true : false;
    },
    billNotUpload() {
      return (this.bill.state < 1) ? true : false;
    },
    receiptNotUpload() {
      return (this.bill.state < 2) ? true : false;
    },
    finished() {
      return (this.bill.state >= 2) ? true : false;
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    for (let i = 0; i < this.business.bills.length; i++) {
      if (parseInt(this.$route.params.billId) === this.business.bills[i].id) {
        this.bill = this.business.bills[i];
        break;
      }
    }

    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.bill.id,
      type: 'billingOthers'
    };
    this.uploadBill.URL = '/fileUpload?data=' + JSON.stringify(data);

    data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.bill.id,
      type: 'receivables'
    };
    this.uploadReceipt.URL = '/fileUpload?data=' + JSON.stringify(data);

    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理项目', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '项目详情', url: `/business-handle-detail-sales-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-sales-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票详情', url: `/business-handle-detail-sales-${this.$route.params.id}/billing-infor/billing-infor-detail-${this.$route.params.billId}`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审项目', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '项目详情', url: `/business-handle-detail-risk-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-risk-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票详情', url: `/business-handle-detail-risk-${this.$route.params.id}/billing-infor/billing-infor-detail-${this.$route.params.billId}`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理项目', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '项目详情', url: `/business-handle-detail-leader-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-leader-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票详情', url: `/business-handle-detail-leader-${this.$route.params.id}/billing-infor/billing-infor-detail-${this.$route.params.billId}`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结项目', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '项目详情', url: `/business-handle-detail-office-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-office-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票详情', url: `/business-handle-detail-office-${this.$route.params.id}/billing-infor/billing-infor-detail-${this.$route.params.billId}`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '项目详情', url: `/business-handle-detail-financial-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-financial-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票详情', url: `/business-handle-detail-financial-${this.$route.params.id}/billing-infor/billing-infor-detail-${this.$route.params.billId}`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理项目', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '项目详情', url: `/business-handle-detail-archives-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '开票信息', url: `/business-handle-detail-archives-${this.$route.params.id}/billing-infor`, present: false });
      this.paths.push({ name: '开票详情', url: `/business-handle-detail-archives-${this.$route.params.id}/billing-infor/billing-infor-detail-${this.$route.params.billId}`, present: true });
    }
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    uploadBillProgress(event, file, fileList) {
      this.uploadBill.progressShow = true;
      this.uploadBill.percentage = parseInt(file.percentage)+'%';
    },
    uploadBillSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.bill.billFiles.push(obj);
        this.$emit('uploaded', this.bill);
        setTimeout(() => {
          this.uploadBill.percentage = '0%';
          this.uploadBill.progressShow = false;
        }, 500);
      }
    },
    delBillFile(FILE) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: FILE.id,
              type: 'billingOthers'
            }
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.bill.billFiles.length; i++) {
            if (this.bill.billFiles[i].id === FILE.id) {
              this.bill.billFiles.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.bill);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    uploadReceiptProgress(event, file, fileList) {
      this.uploadReceipt.progressShow = true;
      this.uploadReceipt.percentage = parseInt(file.percentage)+'%';
    },
    uploadReceiptSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.bill.receiptFiles.push(obj);
        this.$emit('uploaded', this.bill);
        setTimeout(() => {
          this.uploadReceipt.percentage = '0%';
          this.uploadReceipt.progressShow = false;
        }, 500);
      }
    },
    delReceiptFile(FILE) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: FILE.id,
              type: 'receivables'
            }
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.bill.receiptFiles.length; i++) {
            if (this.bill.receiptFiles[i].id === FILE.id) {
              this.bill.receiptFiles.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.business);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    confirm() {
      if (this.bill.billFiles.length === 0) {
        this.$message({
          message: '请先上传发票图片',
          type: 'warning'
        });
        return false;
      } else {
        this.disConfirm = true;
        this.billStateChan().then(() => {
          this.bill.billingDate = (() => {
            let t = new Date();
            let Y = t.getFullYear();
            let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            return `${Y}-${M}-${D}`;
          })();
          this.disConfirm = false;
        }, () => {});
      }
    },
    finish() {
      if (this.bill.receiptFiles.length === 0) {
        this.$message({
          message: '请先上传收款图片',
          type: 'warning'
        });
        return false;
      } else {
        this.disFinish = true;
        this.billStateChan().then(() => {
          this.disFinish = false;
        }, () => {});
      }
    },
    billStateChan() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              let obj = {
                command: 'makeBilling',
                platform: 'web',
                id: this.bill.id,
                type: this.bill.state + 1
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.bill.state += 1;
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      });
      return promise;
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
