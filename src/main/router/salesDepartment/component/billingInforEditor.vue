<template>
  <div>
    <h4>
      新增开票申请
      <div class="pull-right">
        <button class="btn btn-success" @click="add()">提交</button>
        <button class="btn btn-danger" @click="del()">撤销</button>
      </div>
    </h4>
    <form class="form-horizontal">
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
          <p class="form-control-static">{{business.contractAmount===''?'':`${business.contractAmount}万元`}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">开票申请人</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.proposer.name}}</p>
        </div>
      </div>
      <div class="form-group">
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
        <label class="col-sm-2 control-label">项目计划时间</label>
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
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">累计开票金额</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{bill.addUpAmount}}</p>
        </div>
      </div>
      <hr>
      <div class="form-group">
        <label class="col-sm-2 control-label">本次开票金额</label>
        <div class="col-sm-9">
          <input type="number"
                class="form-control"
                placeholder="请输入本次开票金额"
                v-model.number="bill.amount">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">开票单位</label>
        <div class="col-sm-9">
          <input type="text"
                class="form-control"
                placeholder="请输入开票单位"
                v-model="bill.billingUnit">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">申请开票种类</label>
        <div class="col-sm-9">
          <label class="radio-inline">
            <input type="radio"
                  name="contractSystem"
                  value="增值税普通发票"
                  v-model="bill.type"> 增值税普通发票
          </label>
          <label class="radio-inline">
            <input type="radio"
                  name="contractSystem"
                  value="增值税专用发票"
                  v-model="bill.type"> 增值税专用发票
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">单位名称</label>
        <div class="col-sm-9">
          <input type="text"
                class="form-control"
                placeholder="请输入单位名称"
                v-model="bill.unit.name">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">纳税人识别号</label>
        <div class="col-sm-9">
          <input type="text"
                class="form-control"
                placeholder="请输入纳税人识别号"
                v-model="bill.taxpayerID">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">单位地址</label>
        <div class="col-sm-9">
          <input type="text"
                class="form-control"
                placeholder="请输入单位地址"
                v-model="bill.unit.address">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">单位电话</label>
        <div class="col-sm-9">
          <input type="tel"
                class="form-control"
                placeholder="请输入单位电话"
                v-model="bill.unit.tele">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">开户银行</label>
        <div class="col-sm-9">
          <input type="text"
                class="form-control"
                placeholder="请输入开户银行"
                v-model="bill.unit.depositBank">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">开户账号</label>
        <div class="col-sm-9">
          <input type="text"
                class="form-control"
                placeholder="请输入开户账号"
                v-model="bill.unit.account">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">申请日期</label>
        <div class="col-sm-9">
          <input type="date"
                class="form-control"
                placeholder="请输入申请日期"
                v-model="bill.filingDate">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">开票日期</label>
        <div class="col-sm-9">
          <input type="date"
                class="form-control"
                placeholder="请输入开票日期"
                v-model="bill.billingDate">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">送达方式</label>
        <div class="col-sm-9">
          <label class="radio-inline">
            <input type="radio"
                  name="contractSystem"
                  value="快递"
                  v-model="bill.way"> 快递
          </label>
          <label class="radio-inline">
            <input type="radio"
                  name="contractSystem"
                  value="申请人送达"
                  v-model="bill.way"> 申请人送达
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">快递收件人</label>
        <div class="col-sm-9">
          <input type="text"
                class="form-control"
                placeholder="请输入快递收件人"
                v-model="bill.receiver">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">服务内容</label>
        <div class="col-sm-9">
          <input type="text"
                class="form-control"
                placeholder="请输入服务内容"
                v-model="bill.content">
        </div>
      </div>
    </form>
    <bill-del-modal v-if="showDelModal"
                    :initalBill="bill"
                    @deleted="deleted"
                    @canceled="delCanceled"></bill-del-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

import billDelModal from './billDelModal.vue';

Vue.prototype.$message = Message;

export default {
  name: 'billingInforDetail',
  data() {
    return {
      paths: [
        { name: '待处理业务', url: '/business-handle-list-sales', present: false },
        { name: '业务详情', url: `/business-handle-detail-sales/${this.$route.params.id}`, present: false },
        { name: '开票信息', url: `/business-handle-detail-sales/${this.$route.params.id}/billing-infor`, present: false },
        { name: '新增开票申请', url: `/business-handle-detail-sales/${this.$route.params.id}/billing-infor/billing-infor-editor`, present: true }
      ],
      business: this.initBusiness,
      bill: {
        id: '',
        proposer: {
          id: this.user.id,
          name: this.user.name,
          tele: this.user.telephone
        },
        addUpAmount: (() => {
          var sum = 0;
          for (let i = 0; i < this.business.bills.length; i++) {
            sum += parseInt(this.business.bills[i].amount);
          }
          return sum;
        })(),
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
        content: '',
        billFiles: [],
        receiptFiles: [],
        state: 0
      }
    };
  },
  computed: {
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    }
  },
  props: ['initBusiness', 'user'],
  create() {
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    amountCheck() {
      if (this.bill.addUpAmount + this.bill.amount > parseInt(this.business.contractAmount)) {
        this.$message({
          message: '开票总和不能大于合同金额',
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
    add() {
      if (!this.amountCheck()) {
        return false;
      } else if (!this.typeCheck()) {
        return false;
      } else {
        let promise = new Promise((resolve, reject) => {
          axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'post',
            url: '/service',
            data: qs.stringify({
              data: (() => {
                let obj = {
                  command: 'createBillingInfo',
                  platform: 'web',
                  id: this.business.id,
                  data: {
                    projectId: this.business.id,
                    billingApplicantId: this.bill.proposer.id,
                    billingApplicantName: this.bill.proposer.name,
                    applicantPhone: this.bill.proposer.tele,
                    requesterId: this.business.institution.id,
                    requesterName: this.business.institution.name,
                    requesterPhone: this.business.institution.telephone,
                    billingType: this.bill.type,
                    billingAmount: this.bill.amount,
                    companyName: this.bill.unit.name,
                    taxpayerNumber: this.bill.taxpayerID,
                    companyAddress: this.bill.unit.address,
                    companyPhone: this.bill.unit.tele,
                    openCountBank: this.bill.unit.depositBank,
                    openBankNumber: this.bill.unit.account,
                    applicationDate: this.bill.filingDate,
                    totalBillingAmount: this.bill.addUpAmount,
                    billingDate: this.bill.billingDate,
                    deliveryMethod: this.bill.way,
                    recipientName: this.bill.receiver,
                    recipientId: '',
                    signContractNumber: this.business.number,
                    serviceContent: this.bill.content,
                    signContractAmount: this.business.contractAmount,
                    startServiceTime: this.business.time.start,
                    endServiceTime: this.business.time.end,
                    annexArray: []
                  }
                };
                return JSON.stringify(obj);
              })()
            })
          }).then((rep) => {
            if (rep.data.statusCode === '10001') {
              this.bill.id = rep.data.data.id;
              this.business.bills.push(this.bill);
              this.$emit('submited', this.business);
              this.$router.push({ path: '../billing-infor' });
              resolve(rep);
            }
          }, (rep) => { });
        });
        return promise;
      }
    },
    del() {
      this.showDelModal = true;
    },
    deleted() {
      this.showDelModal = false;
      this.$router.push({ path: '../billing-infor' });
    },
    delCanceled() {
      this.showDelModal = false;
    },
  }
};
</script>

<style lang="sass" scoped>
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  .attachment-list {
    margin-top: 10px;
    > li.list-group-item {
      border-right: 0;
      border-left: 0;
      > a.title {
        margin-left: 7px;
      }
      > a.text-danger {
        cursor: pointer;
      }
    }
    > li.list-group-item:first-child {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
    > li.list-group-item:last-child {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
