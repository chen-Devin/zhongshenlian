<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-bind:class="{active: PART.disp}"
          v-for="(PART, index) in parts"
          v-bind:key="index">
        <a v-on:click="tabSel(PART)">{{PART.name}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane"
           v-for="(PART, index) in parts"
           v-show="PART.disp"
           v-bind:is="PART.content"
           v-bind:key="index">
      </div>
    </div>
  </div>
</template>

<script>
import businessProfile from './buinessProfile.vue';
import businessConduct from './businessConduct.vue';
import billingInfor from './billingInfor.vue';
import businessReport from './businessReport.vue';
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
    tabSel(PART) {
      for(let i=0; i < this.parts.length; i++) {
        this.parts[i].disp = false;
      }
      PART.disp = true;
    }
  }
};
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
