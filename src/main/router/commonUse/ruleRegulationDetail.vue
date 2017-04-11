<template>
<div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <div class="ruleDetail">
        <ul v-for="detail in details">
          <li>{{detail.title}}</li>
          <li>{{detail.content}}</li>
          <li>{{detail.releaseDepartment}}</li>
          <li>{{detail.releaseTime}}</li>
          <li>{{detail.numbering}}</li>
        </ul>
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
import ruleRegulation from './commonUse/ruleRegulation.vue';
export default {
    name: 'ruleRegulation',
    data() {
    	return {
        paths: [
          { name: '制度详情', url: '/rule-regulation-detail', present: false },
          { name: '规章制度', url: `/rule-regulation/${this.$route.params.id}`, present: true },
        ]
    	}
      REGULATIONS: {
        id: this.$route.params.id,
        title: "",
        content: "",
        releaseDepartment: "",
        releaseTime: "",
        numbering: ""
      }
    },
    components: {
    	crumbs,
    	card,
      ruleRegulation
    }
}
</script>

<style lang="sass" scoped>
</style>
