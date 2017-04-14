<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>

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
        	 { name: '录入制度', url: '/editRule', present: false },
           { name: '规章制度', url: `/rule-regulation/${this.$route.params.id}`, present: true },
      		],
          rules: [],
          searchKeyRule: ""
    	};
    },
    //页面初始状态：获取到规章制度列表
    created(){
      this.getRuleLists();
    },
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
      }
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
    margin-top: -20px;
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
  .editRule td{
    margin-top: -10px;
    border-bottom: none;
    button{
      width: 75px;
      height: 40px;
      font-size: 16px;
    }
  }
 }
}
</style>
