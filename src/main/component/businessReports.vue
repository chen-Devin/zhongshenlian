<template>
  <div class="normal-wrap">
    <h4 class="main-title">
      业务报告
      {{ business.reports.length }}
      <!-- 确认上传 -->
      <button 
        class="btn my-btn cancel-btn f-r mr-10" 
        v-if="salesShow && (business.projectStatus === 90 || business.projectStatus === 110)"
        @click="finishUploadReport">上传完成</button>
      <button class="btn my-btn submit-btn pull-right mr-10"
              @click="add()"
              v-if="salesShow && (business.projectStatus === 90 || business.projectStatus === 110)">
        上传报告
      </button>
    </h4>
    <!-- <p>{{ business.reports[0] }}</p> -->
    <table class="table table-bordered table-list" v-if="reload">
      <thead>
        <tr>
          <th class="ta-c">报告编号</th>
          <th class="ta-c">报告名称</th>
          <th class="ta-c">复审状态</th>
          <th class="ta-c">附件下载</th>
          <th class="ta-c">二维码</th>
          <th class="ta-c">归档状态</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(REPORT, index) in business.reports" 
          :key="index">
          <td class="ta-c" v-if="user.department === '档案部'">
            <button class="btn my-btn submit-btn small-btn" v-if="!REPORT.number" @click="showProjectReport(index, REPORT.id)">待输入编号</button>
            <span v-else>{{ REPORT.number }}</span>
          </td>
          <td class="ta-c" v-else>{{ REPORT.number === '' ? '暂无' : REPORT.number }}</td>
          <td class="ta-c">{{ REPORT.name }}</td>
          <td class="ta-c" v-if="user.department === '质控部' && !REPORT.FStatus">
            <button class="btn my-btn submit-btn small-btn" @click="handleBusiness(REPORT.id, '通过')">通过</button>
            <button class="btn my-btn cancel-btn small-btn" @click="handleBusiness(REPORT.id, '不通过')">不通过</button>
          </td>
          <td class="ta-c" v-else>{{ FStatusMap[Number(REPORT.FStatus)] }}</td>
          <td class="ta-c" v-if="user.department === '档案部'">
            <a href="javascript:void(0);" class="btn my-btn submit-btn small-btn" v-if="!Number(REPORT.downloadStatus)" @click="showDownloadModal(index, REPORT.id)">待下载</a>
            <a href="javascript:void(0);" @click="showDownloadModal(index, REPORT.id)" v-else>
              <span class="fa fa-file-text-o"></span>
            </a>
          </td>
          <td class="ta-c" v-else>
            <a href="javascript:void(0);" @click="showDownloadModal(index, REPORT.id)">
              <span class="fa fa-file-text-o"></span>
            </a>
          </td>
          <td class="ta-c" v-if="user.department === '档案部'">
            <button 
              class="btn my-btn submit-btn small-btn" 
              v-if="(REPORT.QRcodeUrl === '')" 
              @click="showCodeModal(index, REPORT.id)"
              :disabled="REPORT.FStatus === 1">待上传</button>
            <span v-else>{{ REPORT.QRcodeUrl === '' ? '未上传' : '已上传' }}</span>
          </td>
          <td class="ta-c" v-else>{{ REPORT.QRcodeUrl === '' ? '未上传' : '已上传' }}</td>
          
          <td class="ta-c">{{ archivingStateMap[Number(REPORT.archivingState)] }}</td>
        </tr>
      </tbody>
    </table>
    <p class="empty-list-p" v-if="business.reports.length === 0">暂无数据</p>
    <report-add-modal 
      v-if="showAddModal"
      :initBusiness="business"
      @added="added"
      @canceled="addCanceled"></report-add-modal>
    <report-number-modal 
      v-if="projectReportShow"
      :id="reportId"
      @canceled="numberCanceled"
      @submit="numberSubmit"></report-number-modal>
    <report-download-modal 
      v-if="downloadModalShow"
      :id="reportId"
      @canceled="downloadCanceled"></report-download-modal>
    <report-code-modal 
      v-if="codeModalShow"
      :id="reportId"
      :projectId="business.id"
      @canceled="codeCanceled"
      @codeSubmitted="codeSubmitted"></report-code-modal>
    <!-- <report-del-modal v-if="showDelModal"
                      :initReport="delReport"
                      :initBusiness="business"
                      @deleted="deleted"
                      @canceled="delCanceled"></report-del-modal>
    <report-sub-modal v-if="showSubModal"
                      :initReport="subReport"
                      :initBusiness="business"
                      @submited="submited"
                      @canceled="subCanceled"></report-sub-modal> -->
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import reportAddModal from './reportAddModal.vue';
import reportNumberModal from './reportNumberModal.vue';
import reportDownloadModal from './reportDownloadModal.vue';
import reportCodeModal from './reportCodeModal.vue';
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
      subReport: {},
      FStatusMap: ['未复审', '未通过', '已通过'],
      archivingStateMap: ['未归档', '已归档'],
      projectReportShow: false,
      downloadModalShow: false,
      codeModalShow: false,
      reload: true,
      numberIndex: '',
      downloadIndex: '',
      codeIndex: '',
      reportId: ''
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
  methods: {
    handleBusiness (id, result) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'handleBusiness',
                platform: 'web',
                id: this.business.id,
                reportId: id,
                result: result
              }
              return JSON.stringify(obj)
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.getBusinessInfo()
            this.$message.success(rep.data.msg)
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { })
      })
    },
    finishUploadReport () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'finishUploadReport',
                platform: 'web',
                projectId: this.business.id
              }
              return JSON.stringify(obj)
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business.projectStatus = 111
            this.$message.success('项目报告已确认')
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { })
      })
    },
    getBusinessInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getBusinessInfo',
                platform: 'web',
                id: this.business.id
              }
              return JSON.stringify(obj)
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business.reports = []
            for (let i = 0; i < rep.data.data.reportArray.length; i++) {
              let obj = {
                id: rep.data.data.reportArray[i].id,
                name: rep.data.data.reportArray[i].reportName,
                number: rep.data.data.reportArray[i].number,
                downloadStatus: rep.data.data.reportArray[i].downloadStatus,
                QRcodeUrl: rep.data.data.reportArray[i].QRcodeUrl,
                archivingState: rep.data.data.reportArray[i].archivingState,
                FStatus: parseInt(rep.data.data.reportArray[i].FStatus)
              }
              this.business.reports.push(obj)
            }
            resolve('done')
          } else {
            // this.$message.error(rep.data.msg)
          }
        }, (rep) => { })
      })
    },
    showDownloadModal (index, id) {
      this.downloadIndex = index
      this.reportId = id
      this.downloadModalShow = true
    },
    showCodeModal (index, id) {
      this.codeIndex = index
      this.reportId = id
      this.codeModalShow = true
    },
    numberSubmit (number) {
      this.business.reports[this.numberIndex].number = number
      this.numberCanceled()
    },
    showProjectReport (index, id) {
      this.numberIndex = index
      this.reportId = id
      this.projectReportShow = true
    },
    add() {
      this.addReport = {};
      this.showAddModal = true;
    },
    added(addedReport) {
      this.business.reports.push(addedReport);
      this.showAddModal = false;
    },
    addCanceled() {
      this.getBusinessInfo().then(() => {
        this.reload = false
        setTimeout(() => {
          this.reload = true
        }, 500)
      }, () => {})
      this.showAddModal = false
    },
    codeSubmitted () {
      this.business.reports[this.codeIndex].QRcodeUrl = 1
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
    numberCanceled () {
      this.projectReportShow = false
    },
    downloadCanceled () {
      this.downloadModalShow = false
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'downloadProjectReport',
                platform: 'web',
                id: this.reportId
              }
              return JSON.stringify(obj)
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business.reports[this.downloadIndex].downloadStatus = 1
            resolve('done')
          } else {
            // this.$message.error(rep.data.msg)
          }
        }, (rep) => { })
      })
    },
    codeCanceled () {
      this.codeModalShow = false
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
    reportNumberModal,
    reportDownloadModal,
    reportCodeModal,
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
.main-title {
  margin-top: 0;
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
