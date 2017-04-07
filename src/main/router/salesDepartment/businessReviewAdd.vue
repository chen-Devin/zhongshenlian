<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        新建业务
        <div class="pull-right">
          <button class="btn btn-success" v-on:click="sub()">提交</button>
          <button class="btn btn-warning" v-on:click="sav()">暂存</button>
          <button class="btn btn-danger" v-on:click="del()">撤销</button>
        </div>
      </h3>
      <business-editor v-bind:initBusiness="business"
                       v-bind:editable="editable"
                       v-on:saved="saved"
                       v-on:submited="submited"></business-editor>
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

Vue.prototype.$message = Message;

export default {
  name: 'businessReviewAdd',
  data() {
    return {
      paths: [
        { name: '待审核业务', url: '/business-review-list-sales', present: false },
        { name: '创建新任务', url: '/business-review-add', present: true },
      ],
      business: {
        id: '',
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
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
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
      editable: true,
      showDelModal: false
    };
  },
  props: ['user'],
  methods: {
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
    }
  },
  components: {
    crumbs,
    card,
    businessEditor
  }
};
</script>

<style lang="sass" scoped>

</style>
