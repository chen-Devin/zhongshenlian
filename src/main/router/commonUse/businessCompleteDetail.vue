<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3>
        {{business.name}}
      </h3>
      <div class="business-wrap">
        <business :initBusiness="business" :user="user" :progress="progress" @pathsChan="pathsChan"></business>
        <hr>
        <div class="row">
          <approver-advice :advices="riskAdvices">风险评估部意见</approver-advice>
          <approver-advice :advices="leaderAdivces">审批人意见</approver-advice>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import business from '../../component/business.vue';
import approverAdvice from '../../component/approverAdvice.vue';

export default {
  name: 'businessCompleteDetail',
  data() {
    return {
      paths: [
        { name: '已完成业务', url: '/business-complete-list', present: false },
        { name: '业务详情', url: `/business-complete-detail-${this.$route.params.id}`, present: false }
      ],
      business: {
        id: this.$route.params.id,
        name: '',
        proposer: {
          id: '',
          name: '',
          tele: ''
        },
        institution: {
          id: '',
          customerName: '',
          name: '',
          telephone: '',
          assetSize: 0
        },
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
        contractAmount: 0,
        contractPrice: 0,
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
            main: { name: '主要部门', percentage: 0 },
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
        getWay: [
          {
            name: '直接委托',
            state: false
          }, {
            name: '中标委托',
            state: false
          },
        ],
        files: [],
        projectStatus: 0,
        contracts: [],
        projectApproverArray: [],
        schdules: [],
        bills: [],
        reports: [],
        projectOperatingArray: [],
        QRCode: {
          id: '',
          name: '',
          url: ''
        }
      },
      riskAdvices: [],
      leaderAdivces: []
    };
  },
  props: ['user'],
  computed: {
    progress() {
      if (this.business.projectStatus < 20) {
          return [
              { name: '立项申请', passed: false, active: false },
              { name: '风控初审', passed: false, active: false },
              { name: '所长终审', passed: false, active: false },
              { name: '发放编号', passed: false, active: false },
              { name: '处理业务', passed: false, active: false },
              { name: '风控复审', passed: false, active: false },
              { name: '上传注协', passed: false, active: false },
              { name: '业务完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus < 40) {
          return [
              { name: '立项申请', passed: false, active: true },
              { name: '风控初审', passed: false, active: false },
              { name: '所长终审', passed: false, active: false },
              { name: '发放编号', passed: false, active: false },
              { name: '处理业务', passed: false, active: false },
              { name: '风控复审', passed: false, active: false },
              { name: '上传注协', passed: false, active: false },
              { name: '业务完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus < 60) {
          return [
              { name: '立项申请', passed: true, active: false },
              { name: '风控初审', passed: false, active: true },
              { name: '所长终审', passed: false, active: false },
              { name: '发放编号', passed: false, active: false },
              { name: '处理业务', passed: false, active: false },
              { name: '风控复审', passed: false, active: false },
              { name: '上传注协', passed: false, active: false },
              { name: '业务完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus < 80) {
          return [
              { name: '立项申请', passed: true, active: false },
              { name: '风控初审', passed: true, active: false },
              { name: '所长终审', passed: false, active: true },
              { name: '发放编号', passed: false, active: false },
              { name: '处理业务', passed: false, active: false },
              { name: '风控复审', passed: false, active: false },
              { name: '上传注协', passed: false, active: false },
              { name: '业务完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus < 130) {
          return [
              { name: '立项申请', passed: true, active: false },
              { name: '风控初审', passed: true, active: false },
              { name: '所长终审', passed: true, active: false },
              { name: '发放编号', passed: false, active: true },
              { name: '处理业务', passed: false, active: false },
              { name: '风控复审', passed: false, active: false },
              { name: '上传注协', passed: false, active: false },
              { name: '业务完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus < 140) {
          return [
              { name: '立项申请', passed: true, active: false },
              { name: '风控初审', passed: true, active: false },
              { name: '所长终审', passed: true, active: false },
              { name: '发放编号', passed: true, active: false },
              { name: '处理业务', passed: false, active: true },
              { name: '风控复审', passed: false, active: false },
              { name: '上传注协', passed: false, active: false },
              { name: '业务完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus < 150) {
          return [
              { name: '立项申请', passed: true, active: false },
              { name: '风控初审', passed: true, active: false },
              { name: '所长终审', passed: true, active: false },
              { name: '发放编号', passed: true, active: false },
              { name: '处理业务', passed: true, active: false },
              { name: '风控复审', passed: false, active: true },
              { name: '上传注协', passed: false, active: false },
              { name: '业务完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus < 160) {
          return [
              { name: '立项申请', passed: true, active: false },
              { name: '风控初审', passed: true, active: false },
              { name: '所长终审', passed: true, active: false },
              { name: '发放编号', passed: true, active: false },
              { name: '处理业务', passed: true, active: false },
              { name: '风控复审', passed: true, active: false },
              { name: '上传注协', passed: false, active: true },
              { name: '业务完结', passed: false, active: false }
          ];
      } else {
          return [
              { name: '立项申请', passed: true, active: false },
              { name: '风控初审', passed: true, active: false },
              { name: '所长终审', passed: true, active: false },
              { name: '发放编号', passed: true, active: false },
              { name: '处理业务', passed: true, active: false },
              { name: '风控复审', passed: true, active: false },
              { name: '上传注协', passed: true, active: false },
              { name: '业务完结', passed: false, active: true }
          ];
      }
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
            this.business.id = rep.data.data.id;
            this.business.name = rep.data.data.projectName;

            this.business.proposer.id = rep.data.data.applicantId;
            this.business.proposer.name = rep.data.data.applicantName;
            this.business.proposer.tele = rep.data.data.applicantPhone;

            this.business.institution.id = rep.data.data.requesterId;
            this.business.institution.customerName = rep.data.data.requester;
            this.business.institution.name = rep.data.data.requesterName;
            this.business.institution.telephone = rep.data.data.requesterPhone;
            this.business.institution.assetSize = rep.data.data.totalAssets;

            this.business.type = rep.data.data.businessType;

            //手动输入
            // this.business.manager.id = rep.data.data.projectManagerId;
            // this.business.manager.name = rep.data.data.projectManagerName;
            this.business.manager.name = rep.data.data.projectManager;

            this.business.time.start = rep.data.data.startTime;
            this.business.time.end = rep.data.data.endTime;

            this.business.contractAmount = rep.data.data.contractAmount;
            this.business.contractPrice = rep.data.data.contractPrice;

            let flag = false;
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
            }
            this.business.report.amount = rep.data.data.reportCopies;
            this.business.report.usage = rep.data.data.reportPurpose;

            this.business.number = rep.data.data.contractNo;

            this.business.auditTime.exist = flag;
            this.business.auditTime.start = rep.data.data.checkStartTime;
            this.business.auditTime.end = rep.data.data.checkEndTime;

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
            this.business.reviewCPA.name = rep.data.data.trialTeacher;

            //手动输入
            // this.business.reviewAssistant.id = rep.data.data.trialAssistantId;
            // this.business.reviewAssistant.name = rep.data.data.trialAssistantName;
            this.business.reviewAssistant.name = rep.data.data.trialAssistant;

            this.business.lastOffice = rep.data.data.lastOffice;
            this.business.getWay = rep.data.data.getWay;

            this.business.projectStatus = parseInt(rep.data.data.projectStatus);

            this.business.files = [];
            for (let i = 0; i < rep.data.data.annexArray.length; i++) {
              let obj = {
                id: rep.data.data.annexArray[i].id,
                name: rep.data.data.annexArray[i].annexName,
                url: rep.data.data.annexArray[i].annexUrl
              }
              this.business.files.push(obj);
            }

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

            for (let i = 0; i < rep.data.data.projectSchduleArray.length; i++) {
              let obj = {
                name: rep.data.data.projectSchduleArray[i].name,
                state: rep.data.data.projectSchduleArray[i].state === '0' ? true : false
              };
              this.business.schdules.push(obj);
            }

            this.business.bills = [];
            for (let i = 0; i < rep.data.data.projectBillingArray.length; i++) {
              let obj = {
                id: rep.data.data.projectBillingArray[i].id,
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
                receiver: rep.data.data.projectBillingArray[i].recipientName,
                receiveAdd: rep.data.data.projectBillingArray[i].deliverAddress,
                content: rep.data.data.projectBillingArray[i].serviceContent,
                billFiles: (() => {
                  let arr = [];
                  for (let j = 0; j < rep.data.data.projectBillingArray[i].annexArray.length; j++) {
                    if (rep.data.data.projectBillingArray[i].annexArray[j].annexType === 'billingOthers') {
                      let obj = {
                        id: rep.data.data.projectBillingArray[i].annexArray[j].id,
                        name: rep.data.data.projectBillingArray[i].annexArray[j].annexName,
                        url: rep.data.data.projectBillingArray[i].annexArray[j].annexUrl
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
                        url: rep.data.data.projectBillingArray[i].annexArray[j].annexUrl
                      };
                      arr.push(obj);
                    }
                  }
                  return arr;
                })(),
                state: parseInt(rep.data.data.projectBillingArray[i].financeHandleStatus)
              };
              this.business.bills.push(obj);
            }

            this.business.reports = [];
            for (let i = 0; i < rep.data.data.reportAnnexArray.length; i++) {
              let obj = {
                id: rep.data.data.reportAnnexArray[i].id,
                name: rep.data.data.reportAnnexArray[i].annexName,
                url: rep.data.data.reportAnnexArray[i].annexUrl
              }
              this.business.reports.push(obj);
            }

            this.business.projectOperatingArray = rep.data.data.projectOperatingArray;

            if (rep.data.data.qrcodeAnnexArray.length) {
              this.business.QRCode.id = rep.data.data.qrcodeAnnexArray[0].id;
              this.business.QRCode.name = rep.data.data.qrcodeAnnexArray[0].annexName;
              this.business.QRCode.url = rep.data.data.qrcodeAnnexArray[0].annexUrl;
            }

            this.adviceClassify();

            resolve(this.business);
          }
        }, (rep) => { });
      });
      return promise;
    },
    adviceClassify() {
      this.riskAdvices = [];
      this.leaderAdivces = [];
      for (let i = 0; i < this.business.projectApproverArray.length; i++) {
        if (this.business.projectApproverArray[i].department === '风险评估部') {
          this.riskAdvices.push(this.business.projectApproverArray[i]);
        } else {
          this.leaderAdivces.push(this.business.projectApproverArray[i]);
        }
      }
    },
    pathsChan(paths) {
      this.paths = paths;
    }
  },
  components: {
    crumbs,
    card,
    business,
    approverAdvice
  }
}
</script>

<style lang="sass" scoped>
.business-wrap {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
