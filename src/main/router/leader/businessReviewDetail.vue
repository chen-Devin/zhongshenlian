<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        项目详情
        <div class="pull-right">
          <template v-if="decide==='undecide'">
            <button class="btn my-btn submit-btn" @click="approve()">通过</button>
            <button class="btn my-btn draft-btn mr-10" @click="refuse()">不通过</button>
          </template>
          <small class="label label-success" v-else-if="decide==='approve'">已选择通过</small>
          <small class="label label-danger" v-else-if="decide==='refuse'">已选择未通过</small>
        </div>
      </h3>
      <progress-bar :progress="progress"></progress-bar>
      <business-profile :initBusiness="business" :user="user"></business-profile>
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
    <business-approve-modal v-if="showApproveModal"
                            :initalBusiness="business"
                            @approved="approved"
                            @canceled="appCanceled"></business-approve-modal>
    <business-refuse-modal v-if="showRefuseModal"
                           :initalBusiness="business"
                           @refused="refused"
                           @canceled="refCanceled"></business-refuse-modal>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import businessProfile from '../../component/businessProfile.vue';
import approverAdvice from '../../component/approverAdvice.vue';
import businessApproveModal from '../../component/businessApproveModal.vue';
import businessRefuseModal from '../../component/businessRefuseModal.vue';
import progressBar from '../../component/progressBarSVG.vue';

export default {
  name: 'businessReviewDetailLeader',
  data() {
    return {
      paths: [
        { name: '立项批复', url: '/business-review-list-leader', present: false },
        { name: '项目详情', url: `/business-review-detail-leader-${this.$route.params.id}`, present: true },
      ],
      business: {
        id: this.$route.params.id,
        name: '',
        proposer: {
          id: '',
          name: '',
          tele: '',
          department: ''
        },
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
      showApproveModal: false,
      showRefuseModal: false
    };
  },
  props: ['user'],
  computed: {
    decide() {
      if (this.user.department === '风险评估部') {
        if (this.business.projectStatus === 20) {
          return 'undecide';
        } else if (this.business.projectStatus === 30) {
          return 'refuse';
        } else if (this.business.projectStatus === 40) {
          return 'approve';
        }
      } else if (this.user.department === '所长') {
        if (this.business.projectStatus === 40) {
          return 'undecide';
        } else if (this.business.projectStatus === 50) {
          return 'refuse';
        } else if (this.business.projectStatus === 60) {
          return 'approve';
        }
      }
    },
    progress() {
      if (this.business.projectStatus === 20 || this.business.projectStatus === 30) {
          return [
            { name: '立项申请', passed: true, active: true },
            { name: '风控初审', passed: false, active: false },
            { name: '所长终审', passed: false, active: false },
            { name: '合同审核', passed: false, active: false },
            { name: '合同盖章', passed: false, active: false },
            { name: '发放编号', passed: false, active: false },
            {
              qrCode: {name: '报告完成', passed: false, active: false},
              bill: {name: '开票完成', passed: false, active: false}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus === 40 || this.business.projectStatus === 50) {
          return [
            { name: '立项申请', passed: true, active: false },
            { name: '风控初审', passed: true, active: true },
            { name: '所长终审', passed: false, active: false },
            { name: '合同审核', passed: false, active: false },
            { name: '合同盖章', passed: false, active: false },
            { name: '发放编号', passed: false, active: false },
            {
              qrCode: {name: '报告完成', passed: false, active: false},
              bill: {name: '开票完成', passed: false, active: false}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus === 60) {
          return [
            { name: '立项申请', passed: true, active: false },
            { name: '风控初审', passed: true, active: false },
            { name: '所长终审', passed: true, active: true },
            { name: '合同审核', passed: false, active: false },
            { name: '合同盖章', passed: false, active: false },
            { name: '发放编号', passed: false, active: false },
            {
              qrCode: {name: '报告完成', passed: false, active: false},
              bill: {name: '开票完成', passed: false, active: false}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus === 70 || this.business.projectStatus === 71) {
          return [
            { name: '立项申请', passed: true, active: false },
            { name: '风控初审', passed: true, active: false },
            { name: '所长终审', passed: true, active: false },
            { name: '合同审核', passed: true, active: true },
            { name: '合同盖章', passed: false, active: false },
            { name: '发放编号', passed: false, active: false },
            {
              qrCode: {name: '报告完成', passed: false, active: false},
              bill: {name: '开票完成', passed: false, active: false}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus === 80) {
          return [
            { name: '立项申请', passed: true, active: false },
            { name: '风控初审', passed: true, active: false },
            { name: '所长终审', passed: true, active: false },
            { name: '合同审核', passed: true, active: false },
            { name: '合同盖章', passed: true, active: true },
            { name: '发放编号', passed: false, active: false },
            {
              qrCode: {name: '报告完成', passed: false, active: false},
              bill: {name: '开票完成', passed: false, active: false}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus >= 90 && this.business.projectStatus < 120) {
          return [
            { name: '立项申请', passed: true, active: false },
            { name: '风控初审', passed: true, active: false },
            { name: '所长终审', passed: true, active: false },
            { name: '合同审核', passed: true, active: false },
            { name: '合同盖章', passed: true, active: false },
            { name: '发放编号', passed: true, active: true },
            {
              qrCode: {name: '报告完成', passed: false, active: false},
              bill: {name: '开票完成', passed: false, active: false}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus >= 120 && this.business.financeCreateBillingState === 0) {
          return [
            { name: '立项申请', passed: true, active: false },
            { name: '风控初审', passed: true, active: false },
            { name: '所长终审', passed: true, active: false },
            { name: '合同审核', passed: true, active: false },
            { name: '合同盖章', passed: true, active: false },
            { name: '发放编号', passed: true, active: false },
            {
              qrCode: {name: '报告完成', passed: true, active: true},
              bill: {name: '开票完成', passed: false, active: false}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus >= 90 && this.business.projectStatus <= 110 && this.business.financeCreateBillingState === 1) {
          return [
            { name: '立项申请', passed: true, active: false },
            { name: '风控初审', passed: true, active: false },
            { name: '所长终审', passed: true, active: false },
            { name: '合同审核', passed: true, active: false },
            { name: '合同盖章', passed: true, active: false },
            { name: '发放编号', passed: true, active: false },
            {
              qrCode: {name: '报告完成', passed: false, active: false},
              bill: {name: '开票完成', passed: true, active: true}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus >= 120 && this.business.projectStatus < 130 && this.business.financeCreateBillingState === 1) {
          return [
            { name: '立项申请', passed: true, active: false },
            { name: '风控初审', passed: true, active: false },
            { name: '所长终审', passed: true, active: false },
            { name: '合同审核', passed: true, active: false },
            { name: '合同盖章', passed: true, active: false },
            { name: '发放编号', passed: true, active: false },
            {
              qrCode: {name: '报告完成', passed: true, active: true},
              bill: {name: '开票完成', passed: true, active: true}
            },
            { name: '项目完结', passed: false, active: false }
          ];
      } else if (this.business.projectStatus === 130) {
        return [
          { name: '立项申请', passed: true, active: false },
          { name: '风控初审', passed: true, active: false },
          { name: '所长终审', passed: true, active: false },
          { name: '合同审核', passed: true, active: false },
          { name: '合同盖章', passed: true, active: false },
          { name: '发放编号', passed: true, active: false },
          {
            qrCode: {name: '报告完成', passed: true, active: false},
            bill: {name: '开票完成', passed: true, active: false}
          },
          { name: '项目完结', passed: true, active: true }
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
            this.business.beingAuditedUnit = rep.data.data.beingAuditedUnit;
            this.business.businessScope = rep.data.data.businessScope;
            this.business.proposer.id = rep.data.data.applicantId;
            this.business.proposer.name = rep.data.data.applicantName;
            this.business.proposer.tele = rep.data.data.applicantPhone;
            this.business.proposer.department = rep.data.data.applicantDepartment;

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
            this.business.reviewCPA.name = rep.data.data.trialTeacher;

            //手动输入
            // this.business.reviewAssistant.id = rep.data.data.trialAssistantId;
            // this.business.reviewAssistant.name = rep.data.data.trialAssistantName;
            this.business.reviewAssistant.name = rep.data.data.trialAssistant;

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
                FStatus: parseInt(rep.data.data.reportArray[i].FStatus)
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
          }
        }, (rep) => { });
      });
      return promise;
    },
    adviceClassify() {
      this.riskAdvices = [];
      this.leaderAdivces = [];
      for (let i = 0; i < this.business.projectApproverArray.length; i++) {
        if (this.business.projectApproverArray[i].department === '质控部') {
          this.business.projectApproverArray[i].approverName = '';
          this.riskAdvices.push(this.business.projectApproverArray[i]);
        } else {
          this.leaderAdivces.push(this.business.projectApproverArray[i]);
        }
      }
    },
    approve() {
      this.showApproveModal = true;
    },
    approved(id) {
      let obj = {
        id: id,
        approverId: this.user.id,
        approverName: this.user.name,
        department: this.user.department,
        approveResult: '通过',
        approveOpinion: '',
        updateAt: (() => {
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
          let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })(),
        createAt: (()=>{
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth()+1<10)?`0${t.getMonth()+1}`:`${t.getMonth()+1}`;
          let D = (t.getDate()<10)?`0${t.getDate()}`:`${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })()
      };
      this.business.projectApproverArray.push(obj);
      this.leaderAdivces.push(obj);
      this.business.projectStatus = 60;

      this.showApproveModal = false;
    },
    appCanceled() {
      this.showApproveModal = false;
    },
    refuse() {
      this.showRefuseModal = true;
    },
    refused(id, reason) {
      let obj = {
        id: id,
        approverId: this.user.id,
        approverName: this.user.name,
        department: this.user.department,
        approveResult: '不通过',
        approveOpinion: reason,
        updateAt: (() => {
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
          let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })(),
        createAt: (()=>{
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth()+1<10)?`0${t.getMonth()+1}`:`${t.getMonth()+1}`;
          let D = (t.getDate()<10)?`0${t.getDate()}`:`${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })()
      };
      this.business.projectApproverArray.push(obj);
      this.leaderAdivces.push(obj);
      this.business.projectStatus = 50;

      this.showRefuseModal = false;
    },
    refCanceled() {
      this.showRefuseModal = false;
    }
  },
  components: {
    crumbs,
    card,
    businessProfile,
    approverAdvice,
    businessApproveModal,
    businessRefuseModal,
    progressBar
  }
}
</script>

<style lang="sass" scoped>

</style>
