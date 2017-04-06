<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        新建业务
        <div class="pull-right">
          <button class="btn btn-success" v-on:click="subimt()">提交</button>
          <button class="btn btn-warning">暂存</button>
          <button class="btn btn-danger">撤销</button>
        </div>
      </h3>
      <business-editor v-bind:initBusiness="business"
                       v-bind:editable="editable"></business-editor>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import bus from '../../bus.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import businessEditor from './component/businessEditor.vue'

export default {
  name: 'businessReviewAdd',
  data() {
    return {
      paths: [
        { name: '待审核业务', url: '/business-review-list-sales', present: false },
        { name: '创建新任务', url: '/business-review-add', present: true },
      ],
      business: {
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
          console.log(`${Y}-${M+1}-${D}`);
          return `${Y}-${M}-${D}`;
        })(),
        endTime: (()=>{
          let t = new Date();
          let Y = t.getFullYear();
          let M = (t.getMonth()+1<10)?`0${t.getMonth()+1}`:`${t.getMonth()+1}`;
          let D = (t.getDate()<10)?`0${t.getDate()}`:`${t.getDate()}`;
          console.log(`${Y}-${M+1}-${D}`);
          return `${Y}-${M}-${D}`;
        })(),
        peopleNum: 0,
        institutionScale: 0,
        amount: 0,
        proposerOpinion: '',
        files: []
      },
      editable: true,
    };
  },
  props: ['user'],
  methods: {
    subimt() {
      bus.$emit('submit');
    }
  },
  components: {
    crumbs,
    card,
    businessEditor
  }
}
</script>

<style lang="sass" scoped>

</style>
