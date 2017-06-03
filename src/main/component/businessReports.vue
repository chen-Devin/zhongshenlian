<template>
  <div class="normal-wrap">
    <h4 class="main-title">
      业务报告
      <button class="btn btn-primary pull-right"
              @click="addReport()"
              v-if="salesShow">
        添加业务报告
      </button>
    </h4>
    <div class="com-list list-group">
      <li class="list-group-item list-head">
        <span class="title">报告列表</span>
      </li>
      <li class="list-group-item row">
        <div class="col-xs-4">报告名称</div>
        <div class="col-xs-1">附件</div>
        <div class="col-xs-1" v-if="salesShow">修改</div>
        <div class="col-xs-1">复审状态</div>
        <div class="col-xs-1">下载二维码</div>
      </li>
      <li class="list-group-item row"
          v-for="(REPORT, index) in business.reports"
          :key="index">
        <div class="col-xs-4">{{REPORT.name}}</div>
        <div class="col-xs-1">
          <a class="text-primary title"
             :href="REPORT.url"
             download>下载</a>
        </div>
        <div class="col-xs-1" v-if="salesShow">
          <a class="text-primary title"
             @click="REPORT.url">修改</a>
        </div>
        <div class="col-xs-1">
          <template v-if="riskShow">{{}}</template>
          <template v-if="!riskShow">
            <span class="label label-warning"
                  v-if="BUSINESS.projectStatus<130">未复审</span>
            <span class="label label-info"
                  v-else-if="BUSINESS.projectStatus===130">待复审</span>
          </template>
        </div>
        <div class="col-xs-1">
          <template v-if="archivesShow">{{}}</template>
          <template v-if="!archivesShow">
            <span class="label label-warning"
                  v-if="BUSINESS.projectStatus<130">未复审</span>
            <span class="label label-info"
                  v-else-if="BUSINESS.projectStatus===130">待复审</span>
          </template>
        </div>
      </li>
    </div>
    <report-add-modal v-if="showAddModal"
                      :user="user"
                      @added="added"
                      @canceled="addCanceled"></report-add-modal>
    <report-mod-modal v-if="showModModal"
                      :initalCustomer="modCustomer"
                      @del="del"
                      @saved="saved"
                      @canceled="modCanceled"></report-mod-modal>
    <report-del-modal v-if="showDelModal"
                      :initalCustomer="delCustomer"
                      @deleted="deleted"
                      @canceled="delCanceled"></report-del-modal>
    <report-sub-modal v-if="showSubModal"
                      :initalCustomer="subCustomer"
                      @submited="submited"
                      @canceled="subCanceled"></report-sub-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Upload,Message } from 'element-ui';

import reportAddModal from './reportAddModal.vue';
import reportModModal from './reportModModal.vue';
import reportDelModal from './reportDelModal.vue';
import reportSubModal from './reportSubModal.vue';

Vue.use(Upload);
Vue.prototype.$message = Message;

export default {
  name: 'businessReports',
  data() {
    return {
      paths: [],
      business: this.initBusiness
    };
  },
  computed: {
    salesShow() {
      return this.user.department === '业务部' ? true : false;
    },
    riskShow() {
      return this.user.department === '风险评估部' ? true : false;
    },
    archivesShow() {
      return this.user.department === '档案部' ? true : false;
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-sales-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-risk-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-leader-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-office-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-financial-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-archives-${this.$route.params.id}/business-reports`, present: true });
    }
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    addReport() {
      if (this.business.report.amount < this.business.reports.length + 1) {
        this.$message({
          message: '报告数量超过要求数量',
          type: 'warning'
        });
        return false;
      } else {

      }
    }
  },
  components: {
    reportAddModal,
    reportModModal,
    reportDelModal,
    reportSubModal
  }
};
</script>

<style lang="sass" scoped>
.total-amount {
  margin-top: 30px;
}
</style>
