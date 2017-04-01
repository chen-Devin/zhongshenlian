<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-bind:class="{active: PART.disp}"
          v-for="PART in parts"
          v-on:click="tabSel(PART)">
        <a>{{PART.name}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane"
           v-for="PART in parts" v-bind:is="PART.content">
      </div>
    </div>
  </div>
</template>

<script>
import businessProfile from './buinessProfile.vue';
import businessConduct from './businessConduct.vue';
import billingInfor from './billingInfor.vue';
import operatHistory from './operatHistory.vue';

export default {
  name: 'tabControl',
  data() {
    return {
      parts: [
        {name: '业务概况', content: businessProfile, disp: true},
        {name: '业务开展', content: businessConduct, disp: false},
        {name: '开票信息', content: billingInfor, disp: false},
        {name: '业务报告', content: businessReport, disp: false},
        {name: '操作历史', content: operatHistory, disp: false}
      ]
    }
  },
  method: {

  }
}
</script>

<style lang="sass" scoped>
ul.nav {
  li {
    a {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
