<template>
  <form class="form-horizontal normal-wrap">
    <div class="form-group"
         v-if="reportUploadShow">
      <label class="col-sm-2 control-label">业务报告</label>
      <el-upload class="col-sm-9"
                 :multiple="false"
                 :action="upload.URL"
                 :on-progress="uploadProgress"
                 :on-success="uploadSuccess"
                 :show-file-list="false">
        <button class="btn btn-info btn-sm"
                type="button"
                :disabled="upload.progressShow">点击上传</button>
        <span slot="tip"
              class="text-info">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <div class="col-sm-offset-2 col-sm-9">
        <div class="progress-wrap" v-show="upload.progressShow">
          <div class="progress">
            <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: upload.percentage}">
              {{upload.percentage}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-offset-2 col-sm-9">
        <ul class="attachment-list list-group">
          <li class="list-group-item"
              v-for="FILE in business.reports">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title"
               :href="FILE.url"
               target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right"
               @click="delFile(FILE)"><i class="fa fa-times"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-group"
         v-if="reportFileShow">
      <label class="col-sm-2 control-label">业务报告</label>
      <ul class="col-sm-9 attachment-list list-group">
        <li class="list-group-item"
            v-for="FILE in business.reports">
          <span class="fa fa-file-text-o"></span>
          <a class="text-primary title"
             :href="FILE.url"
             target="_blank">{{FILE.name}}</a>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { Upload } from 'element-ui';

Vue.use(Upload);

export default {
  name: 'businessReport',
  data() {
    return {
      paths: [],
      business: this.initBusiness,
      upload: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      }
    };
  },
  computed: {
    reportUploadShow() {
      return (this.user.department === '业务部' && this.business.projectStatus >= 80) ? true : false;
    },
    reportFileShow() {
      return (this.user.department !== '业务部' && this.business.projectStatus >= 80) ? true : false;
    },
  },
  props: ['initBusiness', 'user'],
  mounted() {
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.business.id,
      type: 'projectReport'
    };
    this.upload.URL = '/fileUpload?data=' + JSON.stringify(data);

    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/business-report`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-sales-${this.$route.params.id}/business-report`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/business-report`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-risk-${this.$route.params.id}/business-report`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/business-report`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-leader-${this.$route.params.id}/business-report`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/business-report`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-office-${this.$route.params.id}/business-report`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '代开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/business-report`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-financial-${this.$route.params.id}/business-report`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/business-report`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-archives-${this.$route.params.id}/business-report`, present: true });
    }
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    uploadProgress(event, file, fileList) {
      this.upload.progressShow = true;
      this.upload.percentage = parseInt(file.percentage)+'%';
    },
    uploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.business.reports.push(obj);
        this.$emit('uploaded', this.business);
        setTimeout(() => {
          this.upload.percentage = '0%';
          this.upload.progressShow = false;
        }, 500);
      }
    },
    delFile(FILE) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: FILE.id,
              type: 'projectReport'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.business.reports.length; i++) {
            if (this.business.reports[i].id === FILE.id) {
              this.business.reports.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.business);
        }
      }, (rep) => { });
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
