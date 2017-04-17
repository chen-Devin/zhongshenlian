<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        业务详情
        <div class="pull-right">
          <template v-if="decide==='undecide'">
            <button class="btn btn-success" v-on:click="approve()">通过</button>
            <button class="btn btn-danger" v-on:click="refuse()">不通过</button>
          </template>
          <span class="label label-success" v-else-if="decide==='approve'">已选择通过</span>
          <span class="label label-danger" v-else-if="decide==='refuse'">已选择未通过</span>
        </div>
      </h3>
      <business-profile v-bind:initBusiness="business" v-bind:user="user"></business-profile>
      <hr>
      <div class="row">
        <approver-advice v-bind:advices="riskAdvices">风险评估部意见</approver-advice>
        <approver-advice v-bind:advices="leaderAdivces">审批人意见</approver-advice>
      </div>
    </card>
    <business-approve-modal v-if="showApproveModal"
                            v-bind:initalBusiness="business"
                            v-on:approved="approved"
                            v-on:canceled="appCanceled"></business-approve-modal>
    <business-refuse-modal v-if="showRefuseModal"
                           v-bind:initalBusiness="business"
                           v-on:refused="refused"
                           v-on:canceled="refCanceled"></business-refuse-modal>
  </div>
</template>

<script>
import axios from 'axios';

import router from '../index.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import businessProfile from '../../component/businessProfile.vue';
import approverAdvice from '../../component/approverAdvice.vue';
import businessApproveModal from '../../component/businessApproveModal.vue';
import businessRefuseModal from '../../component/businessRefuseModal.vue';

export default {
  name: 'businessReviewDetailRisk',
  data() {
    return {
      paths: [
        { name: '待审核业务', url: '/business-review-list-risk', present: false },
        { name: '业务详情', url: `/business-review-detail-risk/${this.$route.params.id}`, present: true },
      ],
      business: {
        id: this.$route.params.id,
        name: '',
        proposer: {
          id: '',
          name: '',
          tele: ''
        },
        institution: null,
        type: '',
        manager: null,
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
        assetAmount: 0,
        contractAmount: 0,
        contractPrice: 0,
        report: {
          type: [
            {
              name: '会计所',
              code: 'TZUk',
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
              name: 'DX',
              code: 'DX',
              words: [
                {
                  name: 'DX',
                  code: 'DX',
                  state: false
                }
              ]
            },{
              name: 'BH',
              code: 'BH',
              words: [
                {
                  name: 'BH',
                  code: 'BH',
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
            main: { name: '主体', percentage: 0 },
            coop: [{ name: '', percentage: 0 }]
          },
        },
        reviewCPA: null,
        reviewAssistant: null,
        lastoffice: '',
        getWay: [
          {
            name: '直接委托',
            state: false
          },{
            name: '中标委托',
            state: false
          },
        ],
        files: [],
        projectStatus: 1,
        contractAnnexArray: [],
        projectApproverArray: [],
        projectSchduleArray: [],
        projectBillingArray: [],
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
      if(this.user.department === '风险评估部') {
        if (this.business.projectStatus === 2) {
          return 'undecide';
        } else if (this.business.projectStatus === 3) {
          return 'refuse';
        } else if (this.business.projectStatus === 4) {
          return 'approve';
        }
      } else if(this.user.department === '所长') {
        if (this.business.projectStatus === 4) {
          return 'undecide';
        } else if (this.business.projectStatus === 5) {
          return 'refuse';
        } else if (this.business.projectStatus === 6) {
          return 'approve';
        }
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

          this.business.institution.name = rep.data.data.requester;
          this.business.institution.client = rep.data.data.requesterName;

          this.business.type = rep.data.data.businessType;
          this.business.manager = rep.data.data.projectManager;

          this.business.time.start = rep.data.data.startTime;
          this.business.time.end = rep.data.data.endTime;

          this.business.assetAmount = rep.data.data.totalAssets;
          this.business.contractAmount = rep.data.data.contractAmount;
          this.business.contractPrice = rep.data.data.contractPrice;

          let flag = false;
          for (let i=0; i<rep.data.data.reportType.length; i++) {
            for (let j=0; j<this.business.report.type.length; j++) {
              if (rep.data.data.reportType[i].department === this.business.report.type[j].name) {
                for (let m=0; m<rep.data.data.reportType[i].typeArray.length; m++) {
                  for (let n=0; n<this.business.report.type[j].words.length; n++) {
                    if (rep.data.data.reportType[i].typeArray[m].name === this.business.report.type[j].words[n].name) {
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

          if (rep.data.data.contractType.cooperationDepartment.hasOwnProperty('mainRate')) {
            this.business.departmentCoop.name = '有部门合作';
            this.business.departmentCoop.departments.main.percentage = rep.data.data.contractType.cooperationDepartment.mainRate;
            this.business.departmentCoop.departments.coop = [];
            for (let i=0; i<rep.data.data.contractType.cooperationDepartment.otherArray.length; i++) {
              this.business.departmentCoop.departments.coop.push({
                name: rep.data.data.contractType.cooperationDepartment.otherArray[i].cooperation,
                percentage: rep.data.data.contractType.cooperationDepartment.otherArray[i].cooperationRate
              });
            }
          } else {
            this.business.departmentCoop.name = '无部门合作';
          }

          this.business.reviewCPA = rep.data.data.trialTeacher;
          this.business.reviewAssistant = rep.data.data.trialAssistant;
          this.business.lastoffice = rep.data.data.lastoffice;
          this.business.getWay = rep.data.data.getWay;
          this.business.projectAmount = rep.data.data.projectAmount;

          this.business.projectStatus = parseInt(rep.data.data.projectStatus);

          for (let i = 0; i < rep.data.data.annexArray.length; i++) {
            let obj = {
              id: rep.data.data.annexArray[i].id,
              name: rep.data.data.annexArray[i].annexName,
              url: rep.data.data.annexArray[i].annexUrl
            }
            this.business.files.push(obj);
          }

          this.business.contractAnnexArray = rep.data.data.contractAnnexArray;
          this.business.projectApproverArray = rep.data.data.projectApproverArray;
          this.business.projectSchduleArray = rep.data.data.projectSchduleArray;
          this.business.projectBillingArray = rep.data.data.projectBillingArray;
          this.business.projectOperatingArray = rep.data.data.projectOperatingArray;
          this.adviceClassify();
        }
      }, (rep) => {});
    },
    adviceClassify() {
      this.riskAdvices = [];
      this.leaderAdivces = [];
      for(let i=0; i < this.business.projectApproverArray.length; i++) {
        if(this.business.projectApproverArray[i].department === '风险评估部') {
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
        approverOpinion: '',
        updateAt: (()=>{
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth()+1<10)?`0${t.getMonth()+1}`:`${t.getMonth()+1}`;
          let D = (t.getDate()<10)?`0${t.getDate()}`:`${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })()
      };
      this.business.projectApproverArray.push(obj);
      this.riskAdvices.push(obj);
      this.business.projectStatus = 4;

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
        approverOpinion: reason,
        updateAt: (()=>{
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth()+1<10)?`0${t.getMonth()+1}`:`${t.getMonth()+1}`;
          let D = (t.getDate()<10)?`0${t.getDate()}`:`${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })()
      };
      this.business.projectApproverArray.push(obj);
      this.riskAdvices.push(obj);
      this.business.projectStatus = 3;

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
    businessRefuseModal
  }
}
</script>

<style lang="sass" scoped>

</style>
