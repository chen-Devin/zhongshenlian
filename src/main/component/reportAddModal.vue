<template>
  <div>
    <modal class="report-add" modalWidth="600px">
      <div slot="body">
        <div class="d-f">
          <h5 class="name">报告名称：</h5>
          <el-input v-model="reportName" placeholder="请输入报告名称"></el-input>
        </div>
        <div class="d-f">
          <h5 class="name2">选择文件：</h5>
          <el-upload ref="upload"
                     :show-file-list="false"
                     :action="reportURL"
                     :on-progress="UploadProgress1"
                     :on-success="UploadSuccess1">
            <button class="btn my-btn submit-btn"
                    type="button"
                    slot="trigger"
                    :disabled="uploadState1.uploading || uploadState2.uploading || uploadState3.uploading || uploadState4.uploading || btnDis">审计报告</button>
            <span slot="tip"
                  class="text-info" v-if="uploadState1.notUpload">&emsp;文件大小建议不超过3Mb</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState1.uploading">
                  &emsp;
                  <i class="el-icon-loading"></i>
                  &emsp;
                  {{ uploadState1.percentage }}%
                  </span>
            <span slot="tip"
                  class="text-info" v-if="uploadState1.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState1.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState1.uploaded">
                  &emsp;
                  <span class="fa fa-file-text-o"></span>
                  <a :href="uploadState1.fileAddress" target="_blank">{{ uploadState1.fileName }}</a>
                  </span>
          </el-upload>
        </div>
        <div class="d-f">
          <h5 class="name2"></h5>
          <el-upload ref="upload"
                     :show-file-list="false"
                     :action="reportScheduleURL"
                     :on-progress="UploadProgress2"
                     :on-success="UploadSuccess2">
            <button class="btn my-btn submit-btn"
                    type="button"
                    slot="trigger"
                    :disabled="uploadState1.uploading || uploadState2.uploading || uploadState3.uploading || uploadState4.uploading || btnDis">报告附表</button>
            <span slot="tip"
                  class="text-info" v-if="uploadState2.notUpload">&emsp;文件大小建议不超过3Mb</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState2.uploading">
                  &emsp;
                  <i class="el-icon-loading"></i>
                  &emsp;
                  {{ uploadState2.percentage }}%
                  </span>
            <span slot="tip"
                  class="text-info" v-if="uploadState2.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState2.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState2.uploaded">
                  &emsp;
                  <span class="fa fa-file-text-o"></span>
                  <a :href="uploadState2.fileAddress" target="_blank">{{ uploadState2.fileName }}</a>
                  </span>
          </el-upload>
        </div>
        <div class="d-f">
          <h5 class="name2"></h5>
          <el-upload ref="upload"
                     :show-file-list="false"
                     :action="annotationURL"
                     :on-progress="UploadProgress3"
                     :on-success="UploadSuccess3">
            <button class="btn my-btn submit-btn"
                    type="button"
                    slot="trigger"
                    :disabled="uploadState1.uploading || uploadState2.uploading || uploadState3.uploading || uploadState4.uploading || btnDis">报表附注</button>
            <span slot="tip"
                  class="text-info" v-if="uploadState3.notUpload">&emsp;文件大小建议不超过3Mb</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState3.uploading">
                  &emsp;
                  <i class="el-icon-loading"></i>
                  &emsp;
                  {{ uploadState3.percentage }}%
                  </span>
            <span slot="tip"
                  class="text-info" v-if="uploadState3.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState3.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState3.uploaded">
                  &emsp;
                  <span class="fa fa-file-text-o"></span>
                  <a :href="uploadState3.fileAddress" target="_blank">{{ uploadState3.fileName }}</a>
                  </span>
          </el-upload>
        </div>
        <div class="d-f">
          <h5 class="name2"></h5>
          <el-upload ref="upload"
                     :show-file-list="false"
                     :action="remarkURL"
                     :on-progress="UploadProgress4"
                     :on-success="UploadSuccess4">
            <button class="btn my-btn submit-btn"
                    type="button"
                    slot="trigger"
                    :disabled="uploadState1.uploading || uploadState2.uploading || uploadState3.uploading || uploadState4.uploading || btnDis">备注</button>
            <span slot="tip"
                  class="text-info" v-if="uploadState4.notUpload">&emsp;文件大小建议不超过3Mb</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState4.uploading">
                  &emsp;
                  <i class="el-icon-loading"></i>
                  &emsp;
                  {{ uploadState4.percentage }}%
                  </span>
            <span slot="tip"
                  class="text-info" v-if="uploadState4.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState4.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
            <span slot="tip"
                  class="text-info" v-if="uploadState4.uploaded">
                  &emsp;
                  <span class="fa fa-file-text-o"></span>
                  <a :href="uploadState4.fileAddress" target="_blank">{{ uploadState4.fileName }}</a>
                  </span>
          </el-upload>
        </div>
      </div>
      <div slot="footer" class="ta-c">
        <button class="btn my-btn submit-btn modal-default-button"
                @click="cancel" :disabled="btnDis">
          保存
        </button>
        <button class="btn my-btn draft-btn modal-default-button"
                @click="delProjectReport">
          取消
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import modal from './modal.vue'

export default {
  name: 'reportAddModal',
  data() {
    return {
      projectId: this.initBusiness.id,
      reportName: '',
      reportId: '',
      // file: {
      //   name: ''
      // },
      reportUpload: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      },
      uploadState1: {
        notUpload: true,
        uploading: false,
        uploaded: false,
        uploadFail: false,
        fileAddress: '',
        fileName: '',
        percentage: '0'
      },
      uploadState2: {
        notUpload: true,
        uploading: false,
        uploaded: false,
        uploadFail: false,
        fileAddress: '',
        fileName: '',
        percentage: '0'
      },
      uploadState3: {
        notUpload: true,
        uploading: false,
        uploaded: false,
        uploadFail: false,
        fileAddress: '',
        fileName: '',
        percentage: '0'
      },
      uploadState4: {
        notUpload: true,
        uploading: false,
        uploaded: false,
        uploadFail: false,
        fileAddress: '',
        fileName: '',
        percentage: '0'
      },
      photoShow: false
    };
  },
  computed: {
    btnDis () {
      if (this.reportName) {
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
        type: 'auditReport',
        reportName: this.reportName,
        reportId: this.reportId
      }
      return '/fileUpload?data=' + JSON.stringify(obj)
    },
    reportScheduleURL () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.projectId,
        type: 'reportSchedule',
        reportName: this.reportName,
        reportId: this.reportId
      }
      return '/fileUpload?data=' + JSON.stringify(obj)
    },
    annotationURL () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.projectId,
        type: 'reportNote',
        reportName: this.reportName,
        reportId: this.reportId
      }
      return '/fileUpload?data=' + JSON.stringify(obj)
    },
    remarkURL () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.projectId,
        type: 'remarks',
        reportName: this.reportName,
        reportId: this.reportId
      }
      return '/fileUpload?data=' + JSON.stringify(obj)
    }
  },
  props: ['initBusiness'],
  methods: {
    UploadProgress1 (event, file, fileList) {
      this.uploadState1.notUpload = false
      this.uploadState1.uploading = true
      this.uploadState1.uploaded = false
      this.uploadState1.percentage = parseInt(event.percent)
    },
    UploadSuccess1 (response, file, fileList) {
      this.uploadState1.notUpload = false
      this.uploadState1.uploading = false
      this.uploadState1.uploaded = false
      this.uploadState1.uploadFail = false
      if (response.statusCode === '10001') {
        this.uploadState1.uploaded = true
        this.uploadState1.fileAddress = response.data.path
        this.uploadState1.fileName = response.data.annexName
        this.reportId = response.data.id
      } else {
        this.uploadState1.uploadFail = true
      }
    },
    UploadProgress2 (event, file, fileList) {
      this.uploadState2.notUpload = false
      this.uploadState2.uploading = true
      this.uploadState2.uploaded = false
      this.uploadState2.percentage = parseInt(event.percent)
    },
    UploadSuccess2 (response, file, fileList) {
      this.uploadState2.notUpload = false
      this.uploadState2.uploading = false
      this.uploadState2.uploaded = false
      this.uploadState2.uploadFail = false
      if (response.statusCode === '10001') {
        this.uploadState2.uploaded = true
        this.uploadState2.fileAddress = response.data.path
        this.uploadState2.fileName = response.data.annexName
        this.reportId = response.data.id
      } else {
        this.uploadState2.uploadFail = true
      }
    },
    UploadProgress3 (event, file, fileList) {
      this.uploadState3.notUpload = false
      this.uploadState3.uploading = true
      this.uploadState3.uploaded = false
      this.uploadState3.percentage = parseInt(event.percent)
    },
    UploadSuccess3 (response, file, fileList) {
      this.uploadState3.notUpload = false
      this.uploadState3.uploading = false
      this.uploadState3.uploaded = false
      this.uploadState3.uploadFail = false
      if (response.statusCode === '10001') {
        this.uploadState3.uploaded = true
        this.uploadState3.fileAddress = response.data.path
        this.uploadState3.fileName = response.data.annexName
        this.reportId = response.data.id
      } else {
        this.uploadState3.uploadFail = true
      }
    },
    UploadProgress4 (event, file, fileList) {
      this.uploadState4.notUpload = false
      this.uploadState4.uploading = true
      this.uploadState4.uploaded = false
      this.uploadState4.percentage = parseInt(event.percent)
    },
    UploadSuccess4 (response, file, fileList) {
      this.uploadState4.notUpload = false
      this.uploadState4.uploading = false
      this.uploadState4.uploaded = false
      this.uploadState4.uploadFail = false
      if (response.statusCode === '10001') {
        this.uploadState4.uploaded = true
        this.uploadState4.fileAddress = response.data.path
        this.uploadState4.fileName = response.data.annexName
        this.reportId = response.data.id
      } else {
        this.uploadState4.uploadFail = true
      }
    },
    delProjectReport () {
      if (this.reportId) {
        return new Promise((resolve, reject) => {
          axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            method: 'get',
            url: '/service',
            params: {
              data: (() => {
                let obj = {
                  command: 'delProjectReport',
                  platform: 'web',
                  id: this.reportId
                }
                return JSON.stringify(obj);
              })()
            }
          }).then((rep) => {
            if (rep.data.statusCode === '10001') {
              this.cancel()
              resolve('done')
            } else {
              this.$message.error(rep.data.msg)
            }
          }, (rep) => { });
        })
      } else {
        this.cancel()
      }
      
    },
    cancel() {
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
