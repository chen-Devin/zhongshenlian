<template>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="col-sm-2 control-label">项目名称</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入项目名称"
               v-model="business.name"
               v-bind:readonly="!editable">
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
        <input type="text"
               class="form-control"
               placeholder="请输入委托单位"
               v-model="business.institution"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系人电话</label>
      <div class="col-sm-9">
        <input type="tel"
               class="form-control"
               placeholder="请输入联系人电话"
               v-model="business.institutionTele"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告使用目的</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入报告使用目的"
               v-model="business.purpose"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目开始时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入项目开始时间"
               v-model="business.startTime"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目结束时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入项目结束时间"
               v-model="business.endTime"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同体制</label>
      <div class="col-sm-9">
        <label class="radio-inline">
          <input type="radio" name="contractSystem" value="联合体"> 联合体
        </label>
        <label class="radio-inline">
          <input type="radio" name="contractSystem" value="非联合体"> 非联合体
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">基本取费</label>
      <div class="col-sm-4">

      </div>
      <div class="col-sm-4">

      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">效益取费</label>
      <div class="col-sm-4">

      </div>
      <div class="col-sm-4">

      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">现场人数</label>
      <div class="col-sm-9 input-group">
        <input type="number"
               class="form-control"
               placeholder="请输入现场人数"
               v-model="business.peopleNum"
               v-bind:readonly="!editable">
        <div class="input-group-addon">人</div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">企业规模</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入企业规模"
               v-model="business.institutionScale"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同金额</label>
      <div class="col-sm-9 input-group">
        <input type="number"
               class="form-control"
               placeholder="请输入合同金额"
               v-model="business.amount"
               v-bind:readonly="!editable">
        <div class="input-group-addon">元</div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请人意见</label>
      <div class="col-sm-9">
        <textarea cols="30"
                  rows="10"
                  class="form-control"
                  placeholder="请输入申请人意见"
                  v-model="business.proposerOpinion"
                  v-bind:readonly="!editable"></textarea>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">
        相关附件
      </label>
      <el-upload class="col-sm-10"
                 v-bind:multiple="false"
                 v-bind:action="uploadURL"
                 v-bind:before-upload="reSave"
                 v-bind:on-success="uploadSuccess"
                 v-bind:show-file-list="false">
        <button class="btn btn-info btn-sm" type="button" v-if="editable">点击上传</button>
        <span slot="tip" class="text-info" v-if="editable">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <div class="col-sm-offset-2 col-sm-9">
        <ul class="attachment-list list-group">
          <li class="list-group-item" v-for="FILE in business.files">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title" v-bind:href="FILE.url" target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right" v-on:click="delFile(FILE)" v-if="editable"><i class="fa fa-times"></i></a>
          </li>
        </ul>
      </div>
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
  name: 'businessEditor',
  data() {
    return {
      business: this.initBusiness,
      uploadURL: ''
    };
  },
  props: ['initBusiness', 'editable'],
  created() {
    bus.$on('subBusiness', ()=>{this.sub()});
    bus.$on('savBusiness', ()=>{this.save()});
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.business.id,
      type: 'projectAnnex'
    };
    this.uploadURL = 'http://tzucpa.lovecampus.cn/fileUpload?data='+JSON.stringify(data);
  },
  methods: {
    save() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              let obj = {
                command: 'addTempData',
                platform: 'web',
                data: {
                  id: this.business.id,
                  projectName: this.business.name,
                  contractNo: this.business.contractNo,
                  businessUndertakerId: this.business.proposerId,
                  businessUndertakerName: this.business.proposerName,
                  undertakerPhone: this.business.proposerTele,
                  requester: this.business.institution,
                  requesterPhone: this.business.institutionTele,
                  reportPurpose: this.business.purpose,
                  startTime: this.business.startTime,
                  endTime: this.business.endTime,
                  peopleNumber: this.business.peopleNum,
                  enterpriseScale: this.business.institutionScale,
                  contractAmount: this.business.amount,
                  applicantOpinion: this.business.proposerOpinion,
                  projectType: this.business.projectType,
                  projectAmount: this.business.projectAmount,
                  projectStatus: this.business.projectStatus,
                  annexArray: this.business.files,
                  projectApproverArray: this.business.projectApproverArray,
                  projectSchduleArray: this.business.projectSchduleArray,
                  projectBillingArray: this.business.projectBillingArray,
                  projectOperatingArray: this.business.projectOperatingArray
                }
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business.id = rep.data.data.id;
            this.$emit('saved', this.business);
            resolve(rep);
          }
        }, (rep) => {});
      });
      return promise;
    },
    sub() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              let obj = {
                command: 'addBusniessInfo',
                platform: 'web',
                data: {
                  id: this.business.id,
                  projectName: this.business.name,
                  contractNo: this.business.contractNo,
                  businessUndertakerId: this.business.proposerId,
                  businessUndertakerName: this.business.proposerName,
                  undertakerPhone: this.business.proposerTele,
                  requester: this.business.institution,
                  requesterPhone: this.business.institutionTele,
                  reportPurpose: this.business.purpose,
                  startTime: this.business.startTime,
                  endTime: this.business.endTime,
                  peopleNumber: this.business.peopleNum,
                  enterpriseScale: this.business.institutionScale,
                  contractAmount: this.business.amount,
                  applicantOpinion: this.business.proposerOpinion,
                  projectType: this.business.projectType,
                  projectAmount: this.business.projectAmount,
                  projectStatus: this.business.projectStatus,
                  annexArray: this.business.files,
                  projectApproverArray: this.business.projectApproverArray,
                  projectSchduleArray: this.business.projectSchduleArray,
                  projectBillingArray: this.business.projectBillingArray,
                  projectOperatingArray: this.business.projectOperatingArray
                }
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business.id = rep.data.data.id;
            this.$emit('submited', this.business);
            resolve(rep);
          }
        }, (rep) => {});
      });
      return promise;
    },
    reSave(file) {
      if (this.business.id==='') {
        return this.save().then((rep)=>{
          let data = {
            command: 'handlerBusiness',
            platform: 'web',
            id: this.business.id,
            type: 'projectAnnex'
          };
          this.uploadURL = 'http://tzucpa.lovecampus.cn/fileUpload?data='+JSON.stringify(data);
        },(rep)=>{});
      } else {
        return true;
      }
    },
    uploadSuccess(responseData, file, fileList) {
      if(responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.business.files.push(obj);
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
              type: 'projectAnnex'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then( (rep) => {
        if (rep.data.statusCode === '10001') {
          for(let i=0; i < this.business.files.length; i++) {
            if (this.business.files[i].id === FILE.id) {
              this.business.files.splice(i, 1);
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
  textarea {
    resize: vertical;
  }
  .attachment-list {
    margin-top: 10px;
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
