<template>
<div class="main">
    <crumbs :paths="paths"></crumbs>
    <button class="btn btn-primary pull-right" type="button" @click="editRule">编辑</button>
    <card id="ruleDetailSection">
      <div class="ruleDetail" v-bind="detail">
        <h3 class="ruleTitle">{{detail.title}}</h3>
        <p>{{detail.content}}</p>
        <p class="text-right releaseDepartment text-muted">{{detail.releaseDepartment}}</p>
        <p class="text-right releaseTime text-muted">{{detail.releaseTime}}</p>
      </div>
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
           releaseTime: ""
           //numbering: ""
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
              this.detail.releaseTime = rep.data.data.releaseTime
             // this.detail.numbering = rep.data.data.numbering
            }
          }, (rep) =>{})
      },
      editRule(){
        this.$router.push("/rule-regulation-edit");
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
   #ruleDetailSection{
    div{
    .ruleTitle{
        margin-bottom: 30px;
      }
    .releaseDepartment{
        font-size: 16px;
        margin-top: 40px;
    }
    .releaseTime{
        font-size: 16px;
      }
    }
  }
    button{
    width: 100px;
    height: 40px;
    font-size: 16px;
    margin-top: -54px;
    margin-right: 30px;
  }
}
</style>
