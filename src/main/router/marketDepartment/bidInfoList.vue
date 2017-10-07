<template>
  <div class="bid-info-list">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card class="card">
      <!--招投标列表子组件-->
      <bid-info-list-body></bid-info-list-body>
    </card>
  </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidInfoListBody from './bidInfoListBody.vue';

export default {
  name: 'bidInfoList',
  data() {
    return {
      paths: [
        { name: '招投标信息', url: '/bid-info-list', present: true }
      ]
    };
  },
  components: {
    crumbs,
    card,
    bidInfoListBody
  }
}
</script>

<style lang="sass">
  .bid-info-list {
    > .card {
      
    }
  }
</style>
