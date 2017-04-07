<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        业务详情
        <div class="pull-right">
          <template v-if="!editable">
            <button class="btn btn-primary" v-on:click="edi()">编辑</button>
          </template>
          <template v-if="editable">
            <button class="btn btn-success" v-on:click="sub()">提交</button>
            <button class="btn btn-danger" v-on:click="del()">撤销</button>
          </template>
        </div>
      </h3>
      <business-editor v-bind:initBusiness="business"
                       v-bind:editable="editable"
                       v-on:saved="saved"
                       v-on:submited="submited"></business-editor>
      <hr>
      <approver-advice v-bind:advices="riskAdvices">风险评估部意见</approver-advice>
      <approver-advice v-bind:advices="leaderAdivces">审批人意见</approver-advice>
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
import businessEditor from './component/businessEditor.vue';
import approverAdvice from '../../component/approverAdvice.vue';

Vue.prototype.$message = Message;

export default {
  name: 'businessReviewEditSales',
  data() {
    return {
      paths: [
        { name: '待审核业务', url: '/business-review-list-sales', present: false },
        { name: '创建新任务', url: `/business-review-add/${this.$route.params.id}`, present: true },
      ],
      business: {
        id: this.$route.params.id,
        name: '',
        proposerId: this.user.id,
        proposerName: this.user.name,
        proposerTele: this.user.telephone,
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
        files: [
          // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          // {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        contractNo: '',
        projectType: '',
        projectAmount: '',
        projectStatus: '1',
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
            var obj = {
              command: 'getBusinessInfo',
              platform: 'web',
              id: this.$route.params.id
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.business.id = rep.data.date.id;
          this.business.name = rep.data.date.projectName;
          this.business.contractNo = rep.data.date.contractNo;
          this.business.proposerId = rep.data.date.businessUndertakerId;
          this.business.proposerName = rep.data.date.businessUndertakerName;
          this.business.proposerTele = rep.data.date.undertakerPhone;
          this.business.institution = rep.data.date.requester;
          this.business.institutionTele = rep.data.date.requesterPhone;
          this.business.purpose = rep.data.date.reportPurpose;
          this.business.startTime = rep.data.date.startTime;
          this.business.endTime = rep.data.date.endTime;
          this.business.peopleNum = rep.data.date.peopleNumber;
          this.business.institutionScale = rep.data.date.enterpriseScale;
          this.business.amount = rep.data.date.contractAmount;
          this.business.proposerOpinion = rep.data.date.applicantOpinion;
          this.business.projectType = rep.data.date.projectType;
          this.business.projectAmount = rep.data.date.projectAmount;
          this.business.projectStatus = rep.data.date.projectStatus;
          this.business.files = rep.data.date.annexArray;
          this.business.projectApproverArray = rep.data.date.projectApproverArray;
          this.business.projectSchduleArray = rep.data.date.projectSchduleArray;
          this.business.projectBillingArray = rep.data.date.projectBillingArray;
          this.business.projectOperatingArray = rep.data.date.projectOperatingArray;
          this.adviceClassify();
        }
      }, (rep) => {});
    },
    adviceClassify() {
      this.riskAdvices = [];
      this.leaderAdivces = [];
      for(let i=0; i < this.business.projectApproverArray.length; i++) {
        if(this.business.projectApproverArray[i].department === '风险评估部') {
          this.riskAdvices.pull(this.business.projectApproverArray[i]);
        } else {
          this.leaderAdivces.pull(this.business.projectApproverArray[i]);
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
      setTimeout(()=>{
        router.push({ path: '/business-review-list-sales' });
      }, 1000);
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
    }
  },
  components: {
    crumbs,
    card,
    businessEditor,
    approverAdvice
  }
}
</script>

<style lang="sass" scoped>

</style>
