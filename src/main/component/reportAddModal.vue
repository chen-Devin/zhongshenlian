<template>
  <modal class="report-add">
    <div slot="body">
      <div class="d-f">
        <h5 class="name">报告名称：</h5>
        <el-input v-model="report.reportName" placeholder="请输入报告名称"></el-input>
      </div>
      <!-- <div class="form-group">
        <label class="col-xs-2 control-label">报告编号</label>
        <div class="col-xs-10">
          <input type="text"
                 class="form-control"
                 placeholder="请输入报告编号"
                 v-model="report.number">
        </div>
        <div class="col-xs-10 error" v-if="numberError">{{ numberMessage }}</div>
      </div> -->
      <div class="d-f">
        <h5 class="name2">选择文件：</h5>
        <el-upload ref="upload"
                   :show-file-list="false"
                   :action="reportURL"
                   :on-change="modReport"
                   :on-progress="reportUploadProgress"
                   :on-success="reportUploadSuccess">
          <button class="my-btn submit-btn btn-sm"
                  type="button"
                  slot="trigger"
                  :disabled="reportUpload.progressShow">审计报告</button>
          <span slot="tip"
                class="text-info">&emsp;文件大小建议不超过3Mb</span>
        </el-upload>
      </div>
      <div class="d-f">
        <h5 class="name2"></h5>
        <el-upload ref="upload"
                   :show-file-list="false"
                   :action="reportScheduleURL"
                   :on-change="modReport"
                   :on-progress="reportUploadProgress"
                   :on-success="reportUploadSuccess">
          <button class="my-btn submit-btn btn-sm"
                  type="button"
                  slot="trigger"
                  :disabled="reportUpload.progressShow">报告附表</button>
          <span slot="tip"
                class="text-info">&emsp;文件大小建议不超过3Mb</span>
        </el-upload>
      </div>
      <div class="d-f">
        <h5 class="name2"></h5>
        <el-upload ref="upload"
                   :show-file-list="false"
                   :action="annotationURL"
                   :on-change="modReport"
                   :on-progress="reportUploadProgress"
                   :on-success="reportUploadSuccess">
          <button class="my-btn submit-btn btn-sm"
                  type="button"
                  slot="trigger"
                  :disabled="reportUpload.progressShow">报表附注</button>
          <span slot="tip"
                class="text-info">&emsp;文件大小建议不超过3Mb</span>
        </el-upload>
      </div>
      <div class="d-f">
        <h5 class="name2"></h5>
        <el-upload ref="upload"
                   :show-file-list="false"
                   :action="remarkURL"
                   :on-change="modReport"
                   :on-progress="reportUploadProgress"
                   :on-success="reportUploadSuccess">
          <button class="my-btn submit-btn btn-sm"
                  type="button"
                  slot="trigger"
                  :disabled="reportUpload.progressShow">备注</button>
          <span slot="tip"
                class="text-info">&emsp;文件大小建议不超过3Mb</span>
        </el-upload>
      </div>
      <div class="form-group" v-show="reportUpload.progressShow">
        <div class="col-xs-12">
          <div class="progress-wrap">
            <div class="progress">
              <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: reportUpload.percentage}">
                {{reportUpload.percentage}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group" v-show="file.name !== ''">
        <ul class="com-list attachment-list list-group">
          <li class="list-group-item">
            <span class="fa fa-file-text-o"></span>
            <span class="text-primary title">{{file.name}}</span>
          </li>
        </ul>
      </div>
      <div class="alert alert-danger well-sm"
           v-show="alert.show">
        {{alert.cont}}
      </div>
    </div>
    <div slot="footer" class="ta-c">
      <button class="btn my-btn submit-btn modal-default-button"
              @click="cancel()" :disabled="btnDis">
        保存
      </button>
      <button class="btn my-btn draft-btn modal-default-button"
              @click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Upload,Message } from 'element-ui';

import modal from './modal.vue';

Vue.use(Upload);
Vue.prototype.$message = Message;

export default {
  name: 'reportAddModal',
  data() {
    return {
      numberError: false,
      projectId: '',
      report: {
        id: '',
        name: '',
        url: '',
        state: false,
        archivingState: false,
        reportName: '',
        number: '',
        adviceState: 0
      },
      file: {
        name: ''
      },
      alert: {
        show: false,
        cont: ''
      },
      subBtn: {
        dis: false,
        cont: '保存'
      },
      reportUpload: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      },
      reportURL: '',
      reportScheduleURL: '',
      annotationURL: '',
      remarkURL: ''
    };
  },
  computed: {
    btnDis () {
      if (this.report.reportName) {
        return false
      } else {
        return true
      }
    },
    reportURL () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.projectId,
        type: 'projectReport'
      }
      return '/fileUpload' + JSON.stringify(obj)
    },
    reportScheduleURL () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.projectId,
        type: 'projectReport'
      }
      return '/fileUpload' + JSON.stringify(obj)
    },
    annotationURL () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.projectId,
        type: 'projectReport'
      }
      return '/fileUpload' + JSON.stringify(obj)
    },
    remarkURL () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.projectId,
        type: 'projectReport'
      }
      return '/fileUpload' + JSON.stringify(obj)
    }
  },
  props: ['initBusiness'],
  methods: {
    modReport(file, fileList) {
      if(file.status === 'ready') {
        this.file = file;
        fileList.splice(0, fileList.length-1);
      }
    },
    reportUploadProgress(event, file, fileList) {
      this.reportUpload.progressShow = true;
      this.reportUpload.percentage = parseInt(file.percentage)+'%';
    },
    reportUploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        this.report.id = responseData.data.id;
        this.report.name = file.name;
        this.report.url = responseData.data.path;
        this.report.state = false;
        this.report.archivingState = false;
        this.report.reportName = this.report.reportName;
        this.report.adviceState = 0;

        setTimeout(() => {
          this.reportUpload.percentage = '0%';
          this.reportUpload.progressShow = false;
          this.$emit('added', this.report);
        }, 500);
      } else {
        this.numberError = true;
        this.numberMessage = responseData.msg;
      }
    },
    save() {
      this.numberError = false;
      if (this.report.reportName === '') {
        this.$message({
          message: '请输入报告名称',
          type: 'warning'
        });
        return false;
      } else if (this.file.name === '') {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        });
        return false;
      } else if (this.report.number === '') {
        this.$message({
          message: '请输入报告编号',
          type: 'warning'
        });
        return false;
      } else {
        let data = {
          command: 'handlerBusiness',
          platform: 'web',
          id: this.initBusiness.id,
          type: 'projectReport',
          reportName: this.report.reportName,
          annexId: this.report.id,
          number: this.report.number,
        };
        this.reportUpload.URL = '/fileUpload?data=' + JSON.stringify(data);

        setTimeout(() => {
          this.$refs.upload.submit();
        }, 100);
      }
    },
    cancel() {
      this.numberError = false;
      this.$emit('canceled');
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
  .report-add {
    .name {
      width: 100px;
      line-height: 36px;
    }
    .name2 {
      width: 80px;
      line-height: 30px;
    }
    .d-f {
      margin: 10px 0;
    }
  }
</style>
