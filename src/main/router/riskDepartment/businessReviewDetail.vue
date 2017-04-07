<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        业务详情
        <div class="pull-right">
          <template v-if="decide===''">
            <button class="btn btn-success" v-on:click="approve()">通过</button>
            <button class="btn btn-danger" v-on:click="refuse()">不通过</button>
          </template>
          <template v-else-if="decide==='approve'">
            <span class="label label-success">已通过</span>
          </template>
          <template v-else-if="decide==='refuse'">
            <span class="label label-danger">未通过</span>
          </template>
        </div>
      </h3>
      <business-profile v-bind:initBusiness="business"></business-profile>
      <hr>
      <approver-advice v-bind:advices="riskAdvices">风险评估部意见</approver-advice>
      <approver-advice v-bind:advices="leaderAdivces">审批人意见</approver-advice>
    </card>
    <business-refuse-modal v-if="showRefuseModal"
                            v-bind:initalBusiness="business"
                            v-on:refused="refused"
                            v-on:canceled="refCanceled"></business-refuse-modal>
    <business-approve-modal v-if="showApproveModal"
                            v-bind:initalBusiness="business"
                            v-on:approved="approved"
                            v-on:canceled="appCanceled"></business-approve-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';

import bus from '../../bus.js';
import router from '../index.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import businessProfile from '../../component/businessProfile.vue';
import approverAdvice from '../../component/approverAdvice.vue';

Vue.prototype.$message = Message;

export default {
    name: 'businessReviewDetailRisk',
}
</script>

<style lang="sass" scoped>

</style>
