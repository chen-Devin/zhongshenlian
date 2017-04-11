<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <template id="searchRuleLists">
        <div class="form-inline searchInp">
          <input type="text" class="form-control text-center" placeholder="请输入关键词、制度编号"/>
          <button type="button" @click="searchRuleBtn" class="btn btn-primary ">搜索</button>
        </div>
        <div class="ruleLists">
          <table class="table .table-bordered">
          <tbody>
            <tr v-for="rule in rules" @click="showRuleDetails">
              <td class="tdTitle">{{rule.title}}</td>
              <td class="tdTime text-right">{{rule.releaseTime}}</td>
            </tr>
          </tbody>
          </table>
        </div>
      </template>
   </card>
   </crumbs>
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import router from '../index.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
export default {
  name: 'ruleRegulation',
  data(){
    return {
      rules: []
    }
  },
  methods: {
    searchRuleBtn() {
      axios({
      method: 'get',
      url: '/service',
      params: {
          data: (()=>{
          var obj = {
              command: 'getRegulationsList',
              platform: 'web'
          }
          return JSON.stringify(obj);
          })()
      }
  }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            for(let i=0; i < rep.data.data.regulationsArray.length; i++) {
              let obj = {
                id: rep.data.data.regulationsArray[i].id,
                title: rep.data.data.regulationsArray[i].title,
                releaseTime: rep.data.data.regulationsArray[i].releaseTime
              };
              this.rules.push(obj);
            }
          }
        }, (rep) =>{})
    }
  }
}
</script>

<style lang="sass" scoped>
#searchRuleLists{
  margin-top: 20px;
}
#searchRuleLists .searchInp input{
  margin-left: 10px;
  font-size: 18px;
  width: 84%;
  border: none;
  padding: 25px;
}
#searchRuleLists .searchInp button{
  width: 10%;
  padding: 7px;
  font-size: 18px;
  margin-left: 10px;
  border-radius: 15px;
  border: 0;
}
#searchRuleLists .ruleLists{
  margin: 30px 10px;
  background: #fff;
  font-size: 16px;
}
</style>
