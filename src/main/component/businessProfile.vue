<template>
  <form class="form-horizontal">
    <div class="form-group"
         v-if="contractNumShow">
      <label class="col-sm-2 control-label">合同编号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.contractNo}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目名称</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">提交申请人</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposerName}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposerTele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institution}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系人电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institutionTele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告使用目的</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.purpose}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开始时间</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.startTime}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">结束时间</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.endTime}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">现场人数</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.peopleNum}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">企业规模</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institutionScale}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.amount}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请人意见</label>
      <div class="col-sm-2">
        <p class="form-control-static">{{business.proposerOpinion}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">相关附件</label>
      <ul class="col-sm-9 attachment-list list-group">
        <li class="list-group-item"
            v-for="FILE in business.files">
          <span class="fa fa-file-text-o"></span>
          <a class="text-primary title"
             v-bind:href="FILE.url"
             target="_blank">{{FILE.name}}</a>
        </li>
      </ul>
    </div>
    <div class="form-group" v-if="contractUploadShow">
      <label class="col-sm-2 control-label">
        正式合同
      </label>
      <el-upload class="col-sm-10"
                 v-bind:multiple="false"
                 v-bind:action="uploadURL"
                 v-bind:on-success="uploadSuccess"
                 v-bind:show-file-list="false">
        <button class="btn btn-info btn-sm" type="button">点击上传</button>
        <span slot="tip" class="text-info">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <div class="col-sm-offset-2 col-sm-9">
        <ul class="attachment-list list-group">
          <li class="list-group-item" v-for="FILE in business.contractAnnexArray">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title" v-bind:href="FILE.url" target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right" v-on:click="delFile(FILE)" v-if="editable"><i class="fa fa-times"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-group" v-if="contractFileShow">
      <label class="col-sm-2 control-label">正式合同</label>
      <ul class="col-sm-9 attachment-list list-group">
        <li class="list-group-item"
            v-for="FILE in business.contractAnnexArray">
          <span class="fa fa-file-text-o"></span>
          <a class="text-primary title"
             v-bind:href="FILE.url"
             target="_blank">{{FILE.name}}</a>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Upload } from 'element-ui';

import bus from '../../../bus.js';

Vue.use(Upload);

export default {
  name: 'businessProfile',
  data() {
    return {
      business: this.initBusiness,
      uploadURL: ''
    };
  },
  props: ['initBusiness', 'user'],
  computed: {
    contractUploadShow() {
      if (this.user.department === '业务部' && this.business.projectStatus === '6') {
        return true;
      } else {
        return false;
      }
    },
    contractFileShow() {
      if (parseInt(this.business.projectStatus) > 6) {
        return true;
      }
    },
    contractNumShow() {
      if (this.business.contractNo !== '') {
        return true;
      }
    }
  },
  created() {
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.business.id,
      type: 'electronicContract'
    };
    this.uploadURL = 'http://tzucpa.lovecampus.cn/fileUpload?data='+JSON.stringify(data);
  },
  methods: {
    uploadSuccess(responseData, file, fileList) {
      if(responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.business.contractAnnexArray.push(obj);
        this.$emit('uploaded', this.business);
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
              type: 'electronicContract'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then( (rep) => {
        if (rep.data.statusCode === '10001') {
          for(let i=0; i < this.business.contractAnnexArray.length; i++) {
            if (this.business.contractAnnexArray[i].id === FILE.id) {
              this.business.contractAnnexArray.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.business);
        }
      }, (rep) => {});
    }
  }
};
</script>

<style lang="sass" scoped>
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  .attachment-list {
    > li.list-group-item {
      border-right: 0;
      border-left: 0;
      // height: 50px;
      // line-height: 30px;
      > a.title {
        margin-left: 7px;
      }
      > a.text-danger {
        cursor: pointer;
      }
    }
    > li.list-group-item:first-child {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
    > li.list-group-item:last-child {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
