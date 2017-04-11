<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
          {{business.name}}
          <button class="btn btn-primary pull-right" v-on:click="sel()" v-if="business.contractNo===''">发放合同编号</button>
          <span class="label label-success pull-right" v-if="business.contractNo!==''">合同编号已经发放</span>
        </h3>
      <div class="business-wrap">
        <business v-bind:initBusiness="business"
                  v-bind:user="user"></business>
        <hr>
        <div class="row">
          <approver-advice v-bind:advices="riskAdvices">风险评估部意见</approver-advice>
          <approver-advice v-bind:advices="leaderAdivces">审批人意见</approver-advice>
        </div>
      </div>
    </card>
    <contract-num-modal v-if="showModal"
                        v-bind:business="business"
                        v-on:submited="submited"
                        v-on:canceled="canceled"></contract-num-modal>
  </div>
</template>

<script>
import axios from 'axios';

import router from '../index.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import business from '../../component/business.vue';
import approverAdvice from '../../component/approverAdvice.vue';
import contractNumModal from './component/contractNumModal.vue';

export default {
  name: 'businessHandleDetailOffice',
  data() {
    return {
      paths: [
        { name: '待处理业务', url: '/business-handle-list-sales', present: false },
        { name: '业务详情', url: `/business-handle-detail-sales/${this.$route.params.id}`, present: true },
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
        startTime: (() => {
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
          let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
          return `${Y}-${M}-${D}`;
        })(),
        endTime: (() => {
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
          let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
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
        contractAnnexArray: [],
        projectApproverArray: [],
        projectSchduleArray: [],
        projectBillingArray: [],
        projectOperatingArray: []
      },
      riskAdvices: [],
      leaderAdivces: [],
      showModal: false
    };
  },
  props: ['user'],
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
      }, (rep) => { });
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
    sel() {
      this.showModal = true;
    },
    submited(contNum) {
      this.business.contractNo = contNum;
      this.showModal = false;
    },
    canceled() {
      this.showModal = false;
    }
  },
  components: {
    crumbs,
    card,
    business,
    approverAdvice,
    contractNumModal
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
