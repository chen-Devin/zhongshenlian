<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
              业务详情
              <div class="pull-right">
                <template v-if="editStat">
                  <template v-if="!editable">
                    <button class="btn btn-primary" v-on:click="edi()">编辑</button>
                  </template>
                  <template v-if="editable">
                    <button class="btn btn-success" v-on:click="sub()">提交</button>
                    <button class="btn btn-warning" v-on:click="sav()" v-if="business.projectStatus==='1'">暂存</button>
                    <button class="btn btn-danger" v-on:click="del()">撤销</button>
                  </template>
                </template>
              </div>
            </h3>
      <business-editor v-bind:initBusiness="business"
                       v-bind:editable="editable"
                       v-on:saved="saved"
                       v-on:submited="submited"
                       v-on:uploaded="uploaded"
                       v-on:deletedFile="deletedFile"></business-editor>
      <template v-if="business.projectStatus!=='1'">
        <hr>
        <div class="row">
          <approver-advice v-bind:advices="riskAdvices">风险评估部意见</approver-advice>
          <approver-advice v-bind:advices="leaderAdivces">审批人意见</approver-advice>
        </div>
      </template>
    </card>
    <business-del-modal v-if="showDelModal"
                        v-bind:initalBusiness="business"
                        v-on:deleted="deleted"
                        v-on:canceled="delCanceled"></business-del-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';

import bus from '../../bus.js';
import router from '../index.js';

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
        { name: '待审核业务', url: '/business-review-list-sales', present: false },
        { name: '业务详情', url: `/business-review-edit/${this.$route.params.id}`, present: true },
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
        projectApproverArray: [],
        projectSchduleArray: [],
        projectBillingArray: [],
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
      return this.business.projectStatus === '1' || this.business.projectStatus === '3' || this.business.projectStatus === '5';
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
          for (let i = 0; i < rep.data.data.annexArray.length; i++) {
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
    edi() {
      this.editable = true;
    },
    sub() {
      bus.$emit('subBusiness');
    },
    submited(submitedBusiness) {
      this.business = submitedBusiness;
      this.$message({
        message: '提交成功，将返回待审核业务列表',
        type: 'success'
      });
      setTimeout(() => {
        router.push({ path: '/business-review-list-sales' });
      }, 1000);
    },
    sav() {
      bus.$emit('savBusiness');
    },
    saved(savedBusiness) {
      this.business = savedBusiness;
      this.$message('暂存成功');
    },
    del() {
      this.showDelModal = true;
    },
    deleted() {
      this.showDelModal = false;
      router.push({ path: '/business-review-list-sales' });
    },
    delCanceled() {
      this.showDelModal = false;
    },
    uploaded(uploadedBusiness) {
      this.business = uploadedBusiness;
    },
    deletedFile(deletedFileBusiness) {
      this.business = deletedFileBusiness;
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
