<template>
<div class="main">
    <crumbs :paths="paths"></crumbs>
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
