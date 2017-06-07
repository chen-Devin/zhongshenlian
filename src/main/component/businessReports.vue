<template>
  <div class="normal-wrap">
    <h4 class="main-title">
      业务报告
      <button class="btn btn-primary pull-right"
              @click="add()"
              v-if="salesShow">
        添加业务报告
      </button>
    </h4>
    <div class="com-list list-group">
      <li class="list-group-item list-head row">
        <div class="col-xs-1">序号</div>
        <div class="col-xs-5">报告名称</div>
        <div class="col-xs-1">附件</div>
        <div class="col-xs-1" v-if="salesShow">修改</div>
        <div class="col-xs-2">复审状态</div>
        <div class="col-xs-2">下载二维码</div>
      </li>
      <li class="list-group-item row"
          v-for="(REPORT, index) in business.reports"
          :key="index">
        <div class="col-xs-1">{{index+1+'.'}}</div>
        <div class="col-xs-5">{{REPORT.reportName}}</div>
        <div class="col-xs-1">
          <a class="text-primary title"
             :href="REPORT.url"
             download>下载</a>
        </div>
        <div class="col-xs-1" v-if="salesShow">
          <a class="text-primary title"
             v-if="REPORT.adviceState!==2"
             @click="mod(REPORT)">修改</a>
          <span class="text-primary title"
                v-if="REPORT.adviceState===2">不可修改</span>
        </div>
        <div class="col-xs-2">
          <template v-if="riskShow">
            <template v-if="REPORT.adviceState===1">
              <a class="btn btn-success btn-sm" @click="judgeReport(REPORT, '通过')">通过</a>
              <a class="btn btn-danger btn-sm" @click="judgeReport(REPORT, '不通过')">不通过</a>
            </template>
            <span class="label label-warning"
                  v-if="REPORT.adviceState===0">未通过</span>
            <span class="label label-success"
                  v-if="REPORT.adviceState===2">已通过</span>
          </template>
          <template v-if="salesShow">
            <a class="label label-success btn-report"
               v-if="REPORT.adviceState===0"
               @click="sub(REPORT)">提交复审</a>
            <span class="label label-success"
                  v-if="REPORT.adviceState===2">已通过复审</span>
            <span class="label label-info"
                  v-if="REPORT.adviceState===1">等待复审</span>
          </template>
          <template v-if="archivesShow || officeShow">
            <span class="label label-info"
                  v-if="REPORT.adviceState===0">未通过复审</span>
            <span class="label label-success"
                  v-if="REPORT.adviceState===2">已通过复审</span>
            <span class="label label-info"
                  v-if="REPORT.adviceState===1">等待复审</span>
          </template>
        </div>
        <div class="col-xs-2">
          <template v-if="archivesShow">
            <label class="checkbox-inline">
              <input type="checkbox"
                     v-model="REPORT.state"
                     @change="reportStatChan(REPORT)"> 下载二维码
            </label>
          </template>
          <template v-if="!archivesShow">
            <span class="label label-info" v-if="!REPORT.state">未下载</span>
            <span class="label label-success" v-if="REPORT.state">已下载</span>
          </template>
        </div>
      </li>
    </div>
    <report-add-modal v-if="showAddModal"
                      :initBusiness="business"
                      @added="added"
                      @canceled="addCanceled"></report-add-modal>
    <report-mod-modal v-if="showModModal"
                      :initReport="modReport"
                      :initBusiness="business"
                      @del="del"
                      @saved="saved"
                      @canceled="modCanceled"></report-mod-modal>
    <report-del-modal v-if="showDelModal"
                      :initReport="delReport"
                      :initBusiness="business"
                      @deleted="deleted"
                      @canceled="delCanceled"></report-del-modal>
    <report-sub-modal v-if="showSubModal"
                      :initReport="subReport"
                      :initBusiness="business"
                      @submited="submited"
                      @canceled="subCanceled"></report-sub-modal>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import reportAddModal from './reportAddModal.vue';
import reportModModal from './reportModModal.vue';
import reportDelModal from './reportDelModal.vue';
import reportSubModal from './reportSubModal.vue';

export default {
  name: 'businessReports',
  data() {
    return {
      paths: [],
      business: this.initBusiness,
      showModModal: false,
      modReport: {},
      showDelModal: false,
      delReport: {},
      showAddModal: false,
      addReport: {},
      showSubModal: false,
      subReport: {}
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
    },
    officeShow() {
      return this.user.department === '办公室' ? true : false;
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
    add() {
      if (this.business.report.amount < this.business.reports.length + 1) {
        this.$message({
          message: '报告数量超过要求数量',
          type: 'warning'
        });
        return false;
      } else {
        this.addReport = {};
        this.showAddModal = true;
      }
    },
    added(addedReport) {
      this.business.reports.push(addedReport);
      this.showAddModal = false;
    },
    addCanceled() {
      this.showAddModal = false;
    },
    mod(REPORT) {
      this.modReport = REPORT;
      this.showModModal = true;
    },
    saved(modedReport) {
      for (let i = 0; i < this.business.reports.length; i++) {
        if (this.business.reports[i].id === modedReport.id) {
          this.business.reports.splice(i, 1, modedReport);
          break;
        }
      }
      this.modReport = {};
      this.showModModal = false;
    },
    modCanceled() {
      this.modReport = {};
      this.showModModal = false;
    },
    del(REPORT) {
      this.delReport = REPORT;
      this.showModModal = false;
      this.showDelModal = true;
    },
    deleted(deletedReport) {
      for (let i = 0; i < this.business.reports.length; i++) {
        if (this.business.reports[i].id === deletedReport.id) {
          this.business.reports.splice(i, 1);
          break;
        }
      }
      this.delReport = {};
      this.showDelModal = false;
    },
    delCanceled() {
      this.delReport = {};
      this.showDelModal = false;
      this.showModModal = true;
    },
    sub(REPORT) {
      this.subReport = REPORT;
      this.showSubModal = true;
    },
    submited(submitedReport) {
      for (let i = 0; i < this.business.reports.length; i++) {
        if (this.business.reports[i].id === submitedReport.id) {
          this.business.reports[i].adviceState = 1;
          break;
        }
      }
      this.subReport = {};
      this.showSubModal = false;
    },
    subCanceled() {
      this.subReport = {};
      this.showSubModal = false;
    },
    judgeReport(REPORT, result) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'handleBusiness',
              platform: 'web',
              id: this.business.id,
              reportId: REPORT.id,
              result: result
            }
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.business.reports.length; i++) {
            if (this.business.reports[i].id === REPORT.id) {
              this.business.reports[i].adviceState = result === '通过' ? 2 : 0;
              break;
            }
          }
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    reportStatChan(FILE) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'confirmQRcode',
              platform: 'web',
              projectAnnexId: FILE.id,
              result: FILE.state ? '1' : '0'
            }
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
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
a {
  &:hover {
    cursor: pointer;
  }
}
</style>
