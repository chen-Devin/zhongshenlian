<template>
<div class="main">
    <crumbs :paths="paths"></crumbs>
    <card id="searchCard">
      <form class="form-inline">
        <div class="form-group searchItem">
          <input type="text" class="text-center form-control" placeholder="请输入关键词、制度编号" @keyup.enter="searchRuleBtn" v-model.trim="searchKeyRule"/>
        </div>
          <button type="submit" class="btn btn-primary" @click="searchRuleBtn">搜索</button>
      </form>
    </card>
    <card id="tableCard">
      <table class="table ruleTable">
        <tbody>
          <tr class="addRule" :user="user" v-if="this.user.department =='所长'">
            <td></td>
            <td>
              <router-link to="/rule-regulation-add">
                 <button type="button" class="btn btn-primary pull-right">添加</button>
              </router-link>
            </td>
        </tr>
        <router-link tag="tr" v-bind:to="'/rule-regulation-detail/'+rule.id" v-for="(rule,index) in rules" v-bind:key="index">
          <td>{{rule.title}}</td>
          <td class="text-right">{{rule.releaseTime}}</td>
        </router-link>
        </tbody>
      </table>
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
    name: 'ruleRegulation',
    data() {
    	return {
    		paths: [
        		{name: '规章制度', url: '/rule-regulation', present: true}
      		],
          rules: [],
          searchKeyRule: ""
    	};
    },
    //页面初始状态：获取到规章制度列表
    created(){
      this.getRuleLists();
    },
    props: ['user'],
    methods: {
      getRuleLists(){
         axios({
        method: 'get',
        url: '/service',
        params: {
            data: (()=>{
            var obj = {
                command: 'getRegulationsList',
                platform: 'web',
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
      },
      //搜索关键词得到相应列表
      searchRuleBtn(){
         axios({
        method: 'get',
        url: '/service',
        params: {
            data: (()=>{
            var obj = {
                command: 'searchRegulationsList',
                platform: 'web',
                searchContent: this.searchKeyRule
            }
            return JSON.stringify(obj);
            })()
        }
    }).then((rep) => {
            if (rep.data.statusCode === '10001') {
             this.rules.length = 0; //请求搜索成功后清空列表
             this.searchKeyRule = "";  //请求成功后清空搜索内容
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
      },
     //showRuleDetail(ruleId){
        //this.$router.push("/rule-regulation-detail/"+ruleId);
    // }
    },
    //引入的组件部分
    components: {
    	crumbs,
    	card
    }
}
</script>

<style lang="sass" scoped>
.main{
  #searchCard{
    padding-left: 0;
    background: none;
    border: none;
    box-shadow: none;
    margin-top: 10px;
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
   margin-top: -25px;
  .ruleTable{
    td{
      font-size: 16px;
      border-top: none;
      border-bottom: 1px solid #ddd;
    }
  }
  .addRule td{
    .addRuleTitle{
        font-size: 16px;
    }
    button{
      width: 75px;
      height: 40px;
      font-size: 16px;
    }
  }
 }
}
</style>
