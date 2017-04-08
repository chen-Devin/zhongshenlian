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
          <span class="label label-success" v-else-if="decide==='approve'">已通过</span>
          <span class="label label-danger" v-else-if="decide==='refuse'">未通过</span>
        </div>
      </h3>
      <business-profile v-bind:initBusiness="business"></business-profile>
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
import Vue from 'vue';
import axios from 'axios';

import router from '../index.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import businessProfile from '../../component/businessProfile.vue';
import approverAdvice from '../../component/approverAdvice.vue';
import businessApproveModal from '../../component/businessApproveModal.vue';
import businessRefuseModal from '../../component/businessRefuseModal.vue';

export default {
  name: 'businessReviewDetailLeader',
  data() {
    return {
      paths: [
        { name: '待审核业务', url: '/business-review-list-leader', present: false },
        { name: '业务详情', url: `/business-review-detail-leader/${this.$route.params.id}`, present: true },
      ],
      business: {
        id: this.$route.params.id,
        name: '',
        proposerId: '',
        proposerName: '',
        proposerTele: '',
        institution: '',
        institutionTele: '',
        purpose: '',
        startTime: (()=>{
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth()+1<10)?`0${t.getMonth()+1}`:`${t.getMonth()+1}`;
          let D = (t.getDate()<10)?`0${t.getDate()}`:`${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })(),
        endTime: (()=>{
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth()+1<10)?`0${t.getMonth()+1}`:`${t.getMonth()+1}`;
          let D = (t.getDate()<10)?`0${t.getDate()}`:`${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })(),
        peopleNum: 0,
        institutionScale: '',
        amount: 0,
        proposerOpinion: '',
        files: [],
        contractNo: '',
        projectType: '',
        projectAmount: '',
        projectStatus: '',
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
        if (this.business.projectStatus === '2') {
          return 'undecide';
        } else if (this.business.projectStatus === '3') {
          return 'refuse';
        } else if (this.business.projectStatus === '4') {
          return 'approve';
        }
      } else if(this.user.department === '所长') {
        if (this.business.projectStatus === '4') {
          return 'undecide';
        } else if (this.business.projectStatus === '5') {
          return 'refuse';
        } else if (this.business.projectStatus === '6') {
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
          this.business.contractNo = rep.data.data.contractNo;
          this.business.proposerId = rep.data.data.businessUndertakerId;
          this.business.proposerName = rep.data.data.businessUndertakerName;
          this.business.proposerTele = rep.data.data.undertakerPhone;
          this.business.institution = rep.data.data.requester;
          this.business.institutionTele = rep.data.data.requesterPhone;
          this.business.purpose = rep.data.data.reportPurpose;
          this.business.startTime = rep.data.data.startTime;
          this.business.endTime = rep.data.data.endTime;
          this.business.peopleNum = rep.data.data.peopleNumber;
          this.business.institutionScale = rep.data.data.enterpriseScale;
          this.business.amount = rep.data.data.contractAmount;
          this.business.proposerOpinion = rep.data.data.applicantOpinion;
          this.business.projectType = rep.data.data.projectType;
          this.business.projectAmount = rep.data.data.projectAmount;
          this.business.projectStatus = rep.data.data.projectStatus;
          for(let i=0; i < rep.data.data.annexArray.length; i++) {
            let obj = {
              id: rep.data.data.annexArray[i].id,
              name: rep.data.data.annexArray[i].annexName,
              url: rep.data.data.annexArray[i].annexUrl
            }
            this.business.files.push(obj);
          }
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
        approverResult: '1',
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
      this.leaderAdivces.push(obj);
      this.business.projectStatus = '6';

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
        approverResult: '0',
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
      this.leaderAdivces.push(obj);
      this.business.projectStatus = '5';

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
