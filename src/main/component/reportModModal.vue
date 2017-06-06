<template>
  <modal>
    <form class="form-horizontal clearfix"
          slot="body"
          @submit.prevent
          @keyup.enter.prevent>
      <div class="form-group">
        <label class="col-xs-2 control-label">报告名称</label>
        <div class="col-xs-10">
          <input type="text"
                 class="form-control"
                 placeholder="请输入报告名称"
                 v-model="report.reportName">
        </div>
      </div>
      <div class="form-group">
        <label class="col-xs-2 control-label">业务报告</label>
        <el-upload class="col-xs-10"
                   ref="upload"
                   :auto-upload="false"
                   :show-file-list="false"
                   :action="reportUpload.URL"
                   :on-change="modReport"
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
      <button class="btn my-btn cancel-btn modal-default-button"
              @click="del()">
        删除
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
  name: 'reportModModal',
  data() {
    return {
      report: this.initReport,
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
  props: ['initReport', 'initBusiness'],
  methods: {
    modReport(file, fileList) {
      console.log(file);
      if (file.status === 'ready') {
        this.file = file;
        fileList.splice(0, fileList.length-1);
        console.log(fileList);
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
        this.report.state = this.report.state;
        this.report.reportName = this.report.reportName;
        this.report.adviceState = this.report.adviceState;

        setTimeout(() => {
          this.reportUpload.percentage = '0%';
          this.reportUpload.progressShow = false;
          this.$emit('saved', this.report);
        }, 500);
      }
    },
    save() {
      if (this.report.reportName === '') {
        this.$message({
          message: '请输入报告名称',
          type: 'warning'
        });
        return false;
      } else if (this.file.name === '') {
        this.subBtn.cont = '保存...';
        this.subBtn.dis = true;
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'post',
          url: '/fileUpload',
          data: qs.stringify({
            data: (() => {
              let obj = {
                command: 'handlerBusiness',
                platform: 'web',
                id: this.initBusiness.id,
                type: 'projectReport',
                reportName: this.report.reportName,
                annexId: this.report.id
              }
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.report.id = this.report.id;
            this.report.name = this.report.name;
            this.report.url = this.report.url;
            this.report.state = this.report.state;
            this.report.reportName = this.report.reportName;
            this.report.adviceState = this.report.adviceState;

            setTimeout(() => {
              this.reportUpload.percentage = '0%';
              this.reportUpload.progressShow = false;
              this.$emit('saved', this.report);
            }, 500);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      } else {
        this.subBtn.cont = '保存...';
        this.subBtn.dis = true;
        let data = {
          command: 'handlerBusiness',
          platform: 'web',
          id: this.initBusiness.id,
          type: 'projectReport',
          reportName: this.report.reportName,
          annexId: this.report.id
        };
        this.reportUpload.URL = '/fileUpload?data=' + JSON.stringify(data);

        setTimeout(() => {
          this.$refs.upload.submit();
        }, 100);
      }
    },
    cancel() {
      this.$emit('canceled');
    },
    del() {
      this.$emit('del', this.initReport);
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
form {
  padding-left: 10px;
  padding-right: 10px;
  .control-label {
    width: 100%;
  }
}
</style>
