<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
<<<<<<< HEAD
    <card id="searchCard">
      <from class="form-inline">
        <div class="form-group searchItem">
          <input type="text" class="text-center form-control" placeholder="请输入关键词、制度编号"/>
        </div>
          <button type="submit" class="btn btn-primary ">搜索</button>
      </from>
    </card>
    <card id="tableCard">
      <table class="table ruleTable">
        <tbody>
          <tr>
            <td>关于作息时间的规定1</td>
            <td class="text-right">2017/03/12</td>
          </tr>
          <tr>
            <td>关于作息时间的规定2</td>
            <td class="text-right">2017/03/12</td>
          </tr>
          <tr>
            <td>关于作息时间的规定3</td>
            <td class="text-right">2017/03/12</td>
          </tr>
          <tr>
            <td>关于作息时间的规定4</td>
            <td class="text-right">2017/03/12</td>
          </tr>
        </tbody>
      </table>
   </card>
=======
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
>>>>>>> c879ec5918738e6664152f1614c6048911ac6a81
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import router from '../index.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
export default {
<<<<<<< HEAD
    name: 'ruleRegulation',
    data() {
    	return {
    		paths: [
        		{name: '规章制度', url: '/rule-regulation', present: true}
      		]
    	};
    },
    components: {
    	crumbs,
    	card
    }
=======
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
>>>>>>> c879ec5918738e6664152f1614c6048911ac6a81
}
</script>

<style lang="sass" scoped>
<<<<<<< HEAD
.main{
  #searchCard{
    padding-left: 0;
    background: none;
    border: none;
    box-shadow: none;
      .searchItem{
      width: 90%;
      input{
        width: 100%;
        height: 50px;
        font-size: 16px;
      }
    }
    button{
      width: 75px;
      height: 40px;
      margin-left: 10px;
      font-size: 16px;
    }
  }
 #tableCard{
   margin-top: -15px;
    .ruleTable{
    td{
      border-top: none;
      border-bottom: 1px solid #ddd;
    }
  }
 }
=======
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
>>>>>>> c879ec5918738e6664152f1614c6048911ac6a81
}
</style>
