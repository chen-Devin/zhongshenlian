<template>
  <modal>
    <form class="clearfix"
          slot="body"
          @submit.prevent
          @keyup.enter.prevent>
      <div class="form-group">
        <label class="col-sm-2 control-label">报告名称</label>
        <div class="col-sm-10">
          <input type="text"
                 class="form-control"
                 placeholder="请输入报告名称"
                 v-model="report.reportName">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">业务报告</label>
        <el-upload class="col-sm-10"
                   :multiple="false"
                   :auto-upload="false"
                   :show-file-list="false"
                   :action="reportUpload.URL"
                   :on-change="modFile"
                   :on-progress="reportUploadProgress"
                   :on-success="reportUploadSuccess">
          <button class="my-btn submit-btn btn-sm"
                  type="button"
                  slot="trigger"
                  :disabled="reportUpload.progressShow">选择文件</button>
          <span slot="tip"
                class="text-info">&emsp;文件大小建议不超过3Mb</span>
        </el-upload>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="progress-wrap" v-show="reportUpload.progressShow">
            <div class="progress">
              <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: reportUpload.percentage}">
                {{reportUpload.percentage}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
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
    </form>
    <div slot="footer" class="ta-c">
      <button class="btn my-btn submit-btn modal-default-button"
              @click="save()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
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
import { Upload } from 'element-ui';

import modal from './modal.vue';

Vue.use(Upload);

export default {
  name: 'reportAddModal',
  data() {
    return {
      report: {
        id: '',
        name: '',
        url: '',
        state: false,
        reportName: '',
        adviceState: 0,
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
      }
    };
  },
  props: ['initBusiness'],
  mounted() {
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.initBusiness.id,
      type: 'projectReport'
    };
    this.reportUpload.URL = '/fileUpload?data=' + JSON.stringify(data);
  },
  methods: {
    modFile(file, fileList) {
      this.file = file;
    },
    reportUploadProgress(event, file, fileList) {
      this.reportUpload.progressShow = true;
      this.reportUpload.percentage = parseInt(file.percentage)+'%';
    },
    reportUploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path,
          state: false,
          reportName: this.report.reportName,
          adviceState: 0,
        };
        this.business.reports.push(obj);

        setTimeout(() => {
          this.reportUpload.percentage = '0%';
          this.reportUpload.progressShow = false;
        }, 500);
      }
    },
    save() {

    },
    cancel() {
      this.$emit('canceled');
    },
    del() {
      this.$emit('del', this.initalCustomer);
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
  .control-label {
    width: 100%;
  }
</style>
