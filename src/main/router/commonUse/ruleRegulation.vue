<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card id="searchCard">
      <form class="form-inline">
        <div class="form-group searchItem">
          <input type="text" class="text-center form-control" placeholder="请输入关键词、制度编号"/>
        </div>
          <button type="submit" class="btn btn-primary ">搜索</button>
      </form>
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
      		]
    	};
    },
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
}
</style>
