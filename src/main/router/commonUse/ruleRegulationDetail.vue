<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <button class="btn btn-primary pull-right" type="button" @click="editRule">编辑</button>
    <card>
      <ul class="list-group" v-bind="detail">
        <li class="list-group-item"><h3 class="text-center">{{detail.title}}</h3></li>
        <li class="list-group-item">{{detail.content}}</li>
        <li class="list-group-item text-right">{{detail.releaseDepartment}}</li>
        <li class="list-group-item text-right">{{detail.releaseTime}}</li>
        <li class="list-group-item text-right">{{detail.numbering}}</li>
      </ul>
   </card>
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import router from '../index.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
export default {
    name: 'ruleRegulationDetail',
    data() {
    	return {
        paths: [
          { name: '制度列表', url: '/rule-regulation', present: false },
          { name: '制度详情', url: `/rule-regulation-detail/${this.$route.params.id}`, present: true }
        ],
        detail: {
           id: this.$route.params.id,
           title: "",
           content: "",
           releaseDepartment: "",
           releaseTime: "",
           numbering: ""
        }
      }
    },
    created() {
      this.getRuleDetail();
    },
    methods: {
      getRuleDetail(){
         axios({
        method: 'get',
        url: '/service',
        params: {
            data: (()=>{
            var obj = {
                command: 'getRegulationsInfo',
                platform: 'web',
                regulationsId: this.$route.params.id
            }
            return JSON.stringify(obj);
            })()
        },
    }).then((rep) => {
            if (rep.data.statusCode === '10001') {
              this.detail.title =  rep.data.data.title,
              this.detail.content =  rep.data.data.content,
              this.detail.releaseDepartment = rep.data.data.releaseDepartment,
              this.detail.releaseTime = rep.data.data.releaseTime,
              this.detail.numbering = rep.data.data.numbering
            }
          }, (rep) =>{})
      }
    },
    components: {
    	crumbs,
    	card
    }
}
</script>

<style lang="sass" scoped>
.main{
  button{
    margin-top: -54px;
    margin-right: 50px;
  }
  ul li{
    border: none;
  }
}
</style>
