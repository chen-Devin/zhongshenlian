<template>
  <div class="normal-wrap">
    <h4 class="main-title">
      业务报告
      {{ business.reports.length }}
      <button class="btn my-btn submit-btn pull-right"
              @click="add()"
              v-if="salesShow">
        上传报告
      </button>
    </h4>
    <div class="com-list list-group">
      <li class="list-group-item list-head row">
        <div class="col-xs-1 text-center">序号</div>
        <div class="col-xs-5">报告名称</div>
        <div class="col-xs-1 text-center">附件</div>
        <div class="col-xs-1 text-center" v-if="salesShow">修改</div>
        <div class="col-xs-2 text-center">复审状态</div>
        <div class="col-xs-1 text-center">二维码</div>
        <div class="col-xs-1 text-center">归档</div>
      </li>
      <li class="list-group-item row"
          v-for="(REPORT, index) in business.reports"
          :key="index">
        <div class="col-xs-1 text-center">{{index+1+'.'}}</div>
        <div class="col-xs-5">{{REPORT.reportName}}</div>
        <div class="col-xs-1 text-center">
          <a class="text-primary title"
             :href="REPORT.url"
             target="_blank">下载</a>
        </div>
        <div class="col-xs-1 text-center" v-if="salesShow">
          <a class="text-primary title"
             v-if="REPORT.adviceState===0"
             @click="mod(REPORT)">修改</a>
          <span class="text-primary title"
                v-if="REPORT.adviceState!==0">不可修改</span>
        </div>
        <div class="col-xs-2 text-center">
          <template v-if="riskShow">
            <template v-if="REPORT.adviceState===1">
              <button class="btn my-btn submit-btn report-btn" type="button" @click="judgeReport(REPORT, '通过')">通过</button>
              <button class="btn my-btn draft-btn report-btn" type="button" @click="judgeReport(REPORT, '不通过')">不通过</button>
            </template>
            <span class="label label-warning"
                  v-if="REPORT.adviceState===0">未通过</span>
            <span class="label label-success"
                  v-if="REPORT.adviceState===2">已通过</span>
          </template>
          <template v-if="salesShow">
            <button class="btn my-btn submit-btn report-btn" type="button"
               v-if="REPORT.adviceState===0"
               @click="sub(REPORT)">提交复审</button>
            <span class="label label-success"
                  v-if="REPORT.adviceState===2">已通过复审</span>
            <span class="label label-info"
                  v-if="REPORT.adviceState===1">等待复审</span>
          </template>
          <template v-if="!salesShow && !riskShow">
            <span class="label label-info"
                  v-if="REPORT.adviceState===0">未通过复审</span>
            <span class="label label-success"
                  v-if="REPORT.adviceState===2">已通过复审</span>
            <span class="label label-info"
                  v-if="REPORT.adviceState===1">等待复审</span>
          </template>
        </div>
        <div class="col-xs-1 text-center">
          <template v-if="archivesShow">
            <input class="checkbox"
                   type="checkbox"
                   v-model="REPORT.state"
                   @change="reportStatChan(REPORT)">
          </template>
          <template v-if="!archivesShow">
            <span class="label label-info adjust-download" v-if="!REPORT.state">未下载</span>
            <span class="label label-success adjust-download" v-if="REPORT.state">已下载</span>
          </template>
        </div>
        <div class="col-xs-1 text-center">
          <template v-if="archivesShow">
            <input class="checkbox"
                   type="checkbox"
                   v-model="REPORT.archivingState"
                   @change="reportArchivingStatChan(REPORT)">
          </template>
          <template v-if="!archivesShow">
            <span class="label label-info adjust-download" v-if="!REPORT.archivingState">未归档</span>
            <span class="label label-success adjust-download" v-if="REPORT.archivingState">已归档</span>
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
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    // if (this.user.department === '业务部') {
    //   this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/business-reports`, present: false });
    //   this.paths.push({ name: '业务报告', url: `/business-handle-detail-sales-${this.$route.params.id}/business-reports`, present: true });
    // } else if (this.user.department === '风险评估部') {
    //   this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/business-reports`, present: false });
    //   this.paths.push({ name: '业务报告', url: `/business-handle-detail-risk-${this.$route.params.id}/business-reports`, present: true });
    // } else if (this.user.department === '所长') {
    //   this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/business-reports`, present: false });
    //   this.paths.push({ name: '业务报告', url: `/business-handle-detail-leader-${this.$route.params.id}/business-reports`, present: true });
    // } else if (this.user.department === '办公室') {
    //   this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/business-reports`, present: false });
    //   this.paths.push({ name: '业务报告', url: `/business-handle-detail-office-${this.$route.params.id}/business-reports`, present: true });
    // } else if (this.user.department === '财务部') {
    //   this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/business-reports`, present: false });
    //   this.paths.push({ name: '业务报告', url: `/business-handle-detail-financial-${this.$route.params.id}/business-reports`, present: true });
    // } else if (this.user.department === '档案部') {
    //   this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/business-reports`, present: false });
    //   this.paths.push({ name: '业务报告', url: `/business-handle-detail-archives-${this.$route.params.id}/business-reports`, present: true });
    // }
    // this.$emit('pathsChan', this.paths);
  },
  methods: {
    add() {
      if (this.business.reports.length > 3) {
        this.$message.error('最多上传4份业务报告')
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
    },
    reportArchivingStatChan(FILE) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'confirmArchiving',
              platform: 'web',
              projectAnnexId: FILE.id,
              result: FILE.state ? '0' : '1'
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
.com-list > .list-group-item {
    padding-left: 0;
    padding-right: 0;
    line-height: 26px;
    margin-left: -20px;
    margin-right: -20px;
}
.com-list .list-head {
    padding-left: 0;
    padding-right: 0;
    line-height: 26px;
}
.report-btn {
    padding: .2em 1em .3em;
    min-width: 76px;
    height: 26px;
    font-size: 12px;
}
.list-adjust {
  margin-left: 0px;
}
.checkbox {
    display: inline;
}
.adjust-download {
  margin-left: 5px;
}
</style>
