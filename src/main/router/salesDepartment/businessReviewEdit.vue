<template>
  <div class="main">
    <!-- <crumbs :paths="paths"></crumbs> -->
    <card class="detail-page">
      <h3 class="main-title">
        项目详情
        <div class="pull-right">
          <template v-if="editStat">
            <template v-if="!editable">
              <button class="btn my-btn submit-btn mr-10" @click="edi()">编辑</button>
            </template>
            <template v-if="editable">
              <button class="btn my-btn submit-btn" @click="sub()">提交</button>
              <button class="btn my-btn draft-btn" @click="sav()">暂存</button>
              <button class="btn my-btn cancel-btn mr-10" @click="del()">撤销</button>
            </template>
          </template>
        </div>
      </h3>
      <business-editor :initBusiness="business"
                       :editable="editable"
                       @saved="saved"
                       @submited="submited"
                       @uploaded="uploaded"
                       @deletedFile="deletedFile"
                       @refuseSub="refuseSub"></business-editor>
      <template v-if="business.projectStatus>=30">
        <hr>
        <el-row>
          <el-col :span="12">
            <approver-advice :advices="riskAdvices">质控部意见</approver-advice>
          </el-col>
          <el-col :span="12">
            <approver-advice :advices="leaderAdivces">审批人意见</approver-advice>
          </el-col>
        </el-row>
      </template>
    </card>
    <business-del-modal v-if="showDelModal"
                        :initalBusiness="business"
                        @deleted="deleted"
                        @canceled="delCanceled"></business-del-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';

import bus from '../../bus.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import approverAdvice from '../../component/approverAdvice.vue';
import businessEditor from './component/businessEditor.vue';
import businessDelModal from './component/businessDelModal.vue';

Vue.prototype.$message = Message;

export default {
  name: 'businessReviewEdit',
  data() {
    return {
      paths: [
        { name: '立项项目', url: '/business-review-list-sales', present: false },
        { name: '项目详情', url: `/business-review-edit-${this.$route.params.id}`, present: true },
      ],
      business: {
        id: this.$route.params.id,
        name: '',
        proposer: {
          id: '',
          name: '',
          tele: ''
        },
        beingAuditedUnit: [{
          unit: ''
        }],
        institution: {
          id: '',
          customerName: '',
          name: '',
          telephone: ''
        },
        basisQuote: '',
        type: '',
        manager: {
          id: '',
          name: ''
        },
        time: {
          start: (() => {
            let t = new Date();
            let Y = t.getFullYear();
            let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            return `${Y}-${M}-${D}`;
          })(),
          end: (() => {
            let t = new Date();
            let Y = t.getFullYear();
            let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            return `${Y}-${M}-${D}`;
          })(),
        },
        contractAmount: '',
        feeBasis: '',
        feeBasisExist: false,
        feeRate: 0,
        report: {
          type: [
            {
              name: '会计所',
              code: 'TZUk',
              state: false,
              words: [
                {
                  name: '审字',
                  code: '01',
                  state: false
                },{
                  name: '专字',
                  code: '02',
                  state: false
                },{
                  name: '咨字',
                  code: '03',
                  state: false
                },{
                  name: '基决审字',
                  code: '04',
                  state: false
                },{
                  name: '外汇检字',
                  code: '05',
                  state: false
                },{
                  name: '验字',
                  code: '06',
                  state: false
                },{
                  name: '外审字',
                  code: '07',
                  state: false
                },{
                  name: '无报告',
                  code: '08',
                  state: false
                }
              ]
            },{
              name: '评估所',
              code: 'TZUp',
              state: false,
              words: [
                {
                  name: '评字',
                  code: '01',
                  state: false
                },{
                  name: '评咨字',
                  code: '02',
                  state: false
                }
              ]
            },{
              name: '税务所',
              code: 'TZUs',
              state: false,
              words: [
                {
                  name: '税鉴字',
                  code: '01',
                  state: false
                }
              ]
            },{
              name: '造价所',
              code: 'TZUz',
              state: false,
              words: [
                {
                  name: '基结审字',
                  code: '01',
                  state: false,
                },{
                  name: '评审字',
                  code: '02',
                  state: false,
                },{
                  name: '概审字',
                  code: '03',
                  state: false,
                },{
                  name: '咨字',
                  code: '04',
                  state: false
                }
              ]
            },{
              name: 'BH',
              code: 'BH',
              state: false,
              words: [
                {
                  name: '审字',
                  code: '01',
                  state: false
                },{
                  name: '专字',
                  code: '02',
                  state: false
                },{
                  name: '咨字',
                  code: '03',
                  state: false
                },{
                  name: '基决审字',
                  code: '04',
                  state: false
                },{
                  name: '外汇检字',
                  code: '05',
                  state: false
                },{
                  name: '验字',
                  code: '06',
                  state: false
                },{
                  name: '外审字',
                  code: '07',
                  state: false
                },{
                  name: '无报告',
                  code: '08',
                  state: false
                }
              ]
            },{
              name: 'QT',
              code: 'QT',
              state: false,
              words: [
                {
                  name: '审字',
                  code: '01',
                  state: false
                },{
                  name: '专字',
                  code: '02',
                  state: false
                },{
                  name: '咨字',
                  code: '03',
                  state: false
                },{
                  name: '基决审字',
                  code: '04',
                  state: false
                },{
                  name: '外汇检字',
                  code: '05',
                  state: false
                },{
                  name: '验字',
                  code: '06',
                  state: false
                },{
                  name: '外审字',
                  code: '07',
                  state: false
                },{
                  name: '无报告',
                  code: '08',
                  state: false
                }
              ]
            }
          ],
          amount: 0,
          usage: ''
        },
        number: '',
        auditTime: {
          exist: false,
          start: (() => {
            let t = new Date();
            let Y = t.getFullYear();
            let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            return `${Y}-${M}-${D}`;
          })(),
          end: (() => {
            let t = new Date();
            let Y = t.getFullYear();
            let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            return `${Y}-${M}-${D}`;
          })(),
        },
        contractType: {
          name: '非联合体',
          basicFee: {
            main: { name: '', percentage: 0 },
            depend: [{ name: '', percentage: 0 }]
          },
          benefitFee: {
            main: { name: '', percentage: 0 },
            depend: [{ name: '', percentage: 0 }]
          }
        },
        departmentCoop: {
          name: '无部门合作',
          departments: {
            main: { name: '', percentage: 0 },
            coop: [{ name: '', percentage: 0 }]
          },
        },
        reviewCPA: {
          id: '',
          name: ''
        },
        reviewAssistant: {
          id: '',
          name: ''
        },
        lastOffice: '',
        getWay: '直接委托',
        projectStatus: 0,
        contracts: [],
        projectApproverArray: [],
        schdules: [],
        billState: 0,
        bills: [],
        reports: [],
        projectOperatingArray: []
      },
      riskAdvices: [],
      leaderAdivces: [],
      editable: false,
      showDelModal: false
    };
  },
  computed: {
    editStat() {
      return this.business.projectStatus === 10 || this.business.projectStatus === 30 || this.business.projectStatus === 50;
    }
  },
  created() {
    this.getInfo();
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    getInfo() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getBusinessInfo',
                platform: 'web',
                id: this.$route.params.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            // this.business = rep.data.data;

            this.business.id = rep.data.data.id;
            this.business.name = rep.data.data.projectName;
            this.business.businessScope = rep.data.data.businessScope;
            this.business.beingAuditedUnit = rep.data.data.beingAuditedUnit;

            // this.business.proposer.id = rep.data.data.applicantId;
            this.business.proposer.name = rep.data.data.applicantName;
            this.business.proposer.tele = rep.data.data.applicantPhone;
            this.business.applicantDepartment = rep.data.data.applicantDepartment;

            this.business.institution.id = rep.data.data.requesterId;
            this.business.institution.customerName = rep.data.data.requester;
            this.business.institution.name = rep.data.data.requesterName;
            this.business.institution.telephone = rep.data.data.requesterPhone;

            this.business.basisQuote = rep.data.data.totalAssets;

            this.business.type = rep.data.data.businessType;

            //手动输入
            // this.business.manager.id = rep.data.data.projectManagerId;
            // this.business.manager.name = rep.data.data.projectManagerName;
            this.business.manager.name = rep.data.data.projectManager;

            this.business.time.start = rep.data.data.startTime;
            this.business.time.end = rep.data.data.endTime;

            this.business.contractAmount = rep.data.data.contractAmount;

            this.business.feeBasis = rep.data.data.feeBasis;
            this.business.feeRate = parseInt(rep.data.data.feeRate);

            let flag = false;
            let flag2 = false;
            for (let i=0; i<rep.data.data.reportType.length; i++) {
              for (let j=0; j<this.business.report.type.length; j++) {
                if (rep.data.data.reportType[i].department === this.business.report.type[j].name) {
                  for (let m=0; m<rep.data.data.reportType[i].typeArray.length; m++) {
                    for (let n=0; n<this.business.report.type[j].words.length; n++) {
                      if (rep.data.data.reportType[i].typeArray[m].name === this.business.report.type[j].words[n].name) {
                        this.business.report.type[j].state = true;
                        this.business.report.type[j].words[n].state = true;
                      }
                    }
                  }
                }
              }
              if(rep.data.data.reportType[i].department === '会计所') {
                flag = true;
              }
              if(rep.data.data.reportType[i].department === '造价所') {
                flag2 = true;
              }
            }
            this.business.report.amount = rep.data.data.reportCopies;
            this.business.report.usage = rep.data.data.reportPurpose;

            this.business.number = rep.data.data.contractNo;

            this.business.auditTime.exist = flag;
            this.business.auditTime.start = rep.data.data.checkStartTime;
            this.business.auditTime.end = rep.data.data.checkEndTime;

            this.business.feeBasisExist = flag2;

            this.business.contractType.name = rep.data.data.contractType.type;
            this.business.contractType.basicFee.main.name = rep.data.data.contractType.mainBasicName;
            this.business.contractType.basicFee.main.percentage = rep.data.data.contractType.mainBasicRate;
            this.business.contractType.benefitFee.main.name = rep.data.data.contractType.mainEfficiencyName;
            this.business.contractType.benefitFee.main.percentage = rep.data.data.contractType.mainEfficiencyRate;
            this.business.contractType.basicFee.depend = [];
            for (let i=0; i<rep.data.data.contractType.subBasicArray.length; i++) {
              this.business.contractType.basicFee.depend.push({
                name: rep.data.data.contractType.subBasicArray[i].name,
                percentage: parseInt(rep.data.data.contractType.subBasicArray[i].rate)
              });
            }
            this.business.contractType.benefitFee.depend = [];
            for (let i=0; i<rep.data.data.contractType.subEfficiencyArray.length; i++) {
              this.business.contractType.benefitFee.depend.push({
                name: rep.data.data.contractType.subEfficiencyArray[i].name,
                percentage: parseInt(rep.data.data.contractType.subEfficiencyArray[i].rate)
              });
            }

            if (rep.data.data.cooperationDepartment.hasOwnProperty('mainRate')) {
              this.business.departmentCoop.name = '有部门合作';
              this.business.departmentCoop.departments.main.name = rep.data.data.cooperationDepartment.mainDepartment;
              this.business.departmentCoop.departments.main.percentage = rep.data.data.cooperationDepartment.mainRate;
              this.business.departmentCoop.departments.coop = [];
              for (let i=0; i<rep.data.data.cooperationDepartment.otherArray.length; i++) {
                this.business.departmentCoop.departments.coop.push({
                  name: rep.data.data.cooperationDepartment.otherArray[i].cooperation,
                  percentage: rep.data.data.cooperationDepartment.otherArray[i].cooperationRate
                });
              }
            } else {
              this.business.departmentCoop.name = '无部门合作';
            }

            //手动输入
            // this.business.reviewCPA.id = rep.data.data.trialTeacherId;
            // this.business.reviewCPA.name = rep.data.data.trialTeacherName;
            this.business.reviewCPA = rep.data.data.trialTeacher;

            //手动输入
            // this.business.reviewAssistant.id = rep.data.data.trialAssistantId;
            // this.business.reviewAssistant.name = rep.data.data.trialAssistantName;
            this.business.reviewAssistant = rep.data.data.trialAssistant;

            this.business.lastOffice = rep.data.data.lastOffice;
            this.business.getWay = rep.data.data.getWay;

            this.business.getWay = rep.data.data.getWay;

            this.business.projectStatus = parseInt(rep.data.data.projectStatus);
            this.business.sumBillingAmount = parseInt(rep.data.data.sumBillingAmount);
            this.business.financeCreateBillingState = parseInt(rep.data.data.financeCreateBillingState);

            this.business.contracts = [];
            for (let i = 0; i < rep.data.data.contractAnnexArray.length; i++) {
              let obj = {
                id: rep.data.data.contractAnnexArray[i].id,
                name: rep.data.data.contractAnnexArray[i].annexName,
                url: rep.data.data.contractAnnexArray[i].annexUrl
              };
              this.business.contracts.push(obj);
            }

            this.business.projectApproverArray = rep.data.data.projectApproverArray;

            this.business.schdules = [];
            for (let i = 0; i < rep.data.data.projectSchduleArray.length; i++) {
              let obj = {
                name: rep.data.data.projectSchduleArray[i].name,
                state: rep.data.data.projectSchduleArray[i].state === '0' ? true : false
              };
              this.business.schdules.push(obj);
            }

            this.business.billState = parseInt(rep.data.data.financeCreateBillingState);
            this.business.bills = [];
            for (let i = 0; i < rep.data.data.projectBillingArray.length; i++) {
              let obj = {
                id: rep.data.data.projectBillingArray[i].id,
                revokeState: parseInt(rep.data.data.projectBillingArray[i].revokeState),
                applicationTime: rep.data.data.projectBillingArray[i].applicationTime,
                paymentTime: rep.data.data.projectBillingArray[i].paymentTime,
                billingTime: rep.data.data.projectBillingArray[i].billingTime,
                proposer: {
                  id: rep.data.data.projectBillingArray[i].billingApplicantId,
                  name: rep.data.data.projectBillingArray[i].billingApplicantName,
                  tele: rep.data.data.projectBillingArray[i].applicantPhone
                },
                addUpAmount: rep.data.data.projectBillingArray[i].totalBillingAmount,
                amount: rep.data.data.projectBillingArray[i].billingAmount,
                billingUnit: rep.data.data.projectBillingArray[i].billingUnit,
                type: rep.data.data.projectBillingArray[i].billingType,
                unit: {
                  name: rep.data.data.projectBillingArray[i].companyName,
                  address: rep.data.data.projectBillingArray[i].companyAddress,
                  tele: rep.data.data.projectBillingArray[i].companyPhone,
                  depositBank: rep.data.data.projectBillingArray[i].openCountBank,
                  account: rep.data.data.projectBillingArray[i].openBankNumber
                },
                taxpayerID: rep.data.data.projectBillingArray[i].taxpayerNumber,
                filingDate: rep.data.data.projectBillingArray[i].applicationDate,
                billingDate: rep.data.data.projectBillingArray[i].billingDate,
                way: rep.data.data.projectBillingArray[i].deliveryMethod,
                recipientName: rep.data.data.projectBillingArray[i].recipientName,
                deliveryAddress: rep.data.data.projectBillingArray[i].deliveryAddress,
                content: rep.data.data.projectBillingArray[i].serviceContent,
                billFiles: (() => {
                  let arr = [];
                  for (let j = 0; j < rep.data.data.projectBillingArray[i].annexArray.length; j++) {
                    if (rep.data.data.projectBillingArray[i].annexArray[j].annexType === 'billingOthers') {
                      let obj = {
                        id: rep.data.data.projectBillingArray[i].annexArray[j].id,
                        name: rep.data.data.projectBillingArray[i].annexArray[j].annexName,
                        url: rep.data.data.projectBillingArray[i].annexArray[j].annexUrl,
                        remark: rep.data.data.projectBillingArray[i].annexArray[j].remark
                      };
                      arr.push(obj);
                    }
                  }
                  return arr;
                })(),
                receiptFiles: (() => {
                  let arr = [];
                  for (let j = 0; j < rep.data.data.projectBillingArray[i].annexArray.length; j++) {
                    if (rep.data.data.projectBillingArray[i].annexArray[j].annexType === 'receivables') {
                      let obj = {
                        id: rep.data.data.projectBillingArray[i].annexArray[j].id,
                        name: rep.data.data.projectBillingArray[i].annexArray[j].annexName,
                        url: rep.data.data.projectBillingArray[i].annexArray[j].annexUrl,
                        remark: rep.data.data.projectBillingArray[i].annexArray[j].remark
                      };
                      arr.push(obj);
                    }
                  }
                  return arr;
                })(),
                state: parseInt(rep.data.data.projectBillingArray[i].state)
              };
              this.business.bills.push(obj);
            }

            this.business.reports = [];
            for (let i = 0; i < rep.data.data.reportArray.length; i++) {
              let obj = {
                id: rep.data.data.reportArray[i].id,
                name: rep.data.data.reportArray[i].reportName,
                number: rep.data.data.reportArray[i].number,
                downloadStatus: rep.data.data.reportArray[i].downloadStatus,
                QRcodeUrl: rep.data.data.reportArray[i].QRcodeUrl,
                archivingState: rep.data.data.reportArray[i].archivingState,
                FStatus: parseInt(rep.data.data.reportArray[i].FStatus),
                reportApproverArray: rep.data.data.reportArray[i].reportApproverArray
              }
              this.business.reports.push(obj);
            }

            this.business.projectOperatingArray = rep.data.data.projectOperatingArray;

            this.adviceClassify();

            resolve(this.business);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            this.$message.error(rep.data.msg)
            this.$router.push('/business-review-list-sales')
          }
        }, (rep) => { });
      });
      return promise;
    },
    adviceClassify() {
      this.riskAdvices = [];
      this.leaderAdivces = [];
      console.log('test')
      for (let i = 0; i < this.business.projectApproverArray.length; i++) {
        if (this.business.projectApproverArray[i].department === '质控部') {
          this.riskAdvices.push(this.business.projectApproverArray[i]);
        } else {
          this.leaderAdivces.push(this.business.projectApproverArray[i]);
        }
      }
    },
    edi() {
      this.editable = true;
    },
    sub() {
      bus.$emit('subBusiness');
    },
    submited(submitedBusiness) {
      this.business = submitedBusiness;
      this.$message({
        message: '提交成功，将返回立项审批列表',
        type: 'success'
      });
      this.$router.push({ path: '/business-review-list-sales' });
    },
    sav() {
      bus.$emit('savBusiness');
    },
    saved(savedBusiness) {
      this.business = savedBusiness;
      this.$message.success('暂存成功，将返回立项审批列表');
      this.$router.push({ path: '/business-review-list-sales' });
    },
    del() {
      this.showDelModal = true;
    },
    deleted() {
      this.showDelModal = false;
      this.$router.push({ path: '/business-review-list-sales' });
    },
    delCanceled() {
      this.showDelModal = false;
    },
    uploaded(uploadedBusiness) {
      this.business = uploadedBusiness;
    },
    deletedFile(deletedFileBusiness) {
      this.business = deletedFileBusiness;
    },
    refuseSub(msg) {
      this.$message({
        message: msg,
        type: 'warning'
      });
    }
  },
  components: {
    crumbs,
    card,
    businessEditor,
    approverAdvice,
    businessDelModal
  }
}
</script>

<style lang="sass" scoped>
  
</style>
