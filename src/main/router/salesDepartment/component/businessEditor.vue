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
      <label class="col-sm-2 control-label">开始时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入开始时间"
               v-model="business.startTime"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">结束时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入结束时间"
               v-model="business.endTime"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">现场人数</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入现场人数"
               v-model="business.peopleNum"
               v-bind:readonly="!editable">
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
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入合同金额"
               v-model="business.amount"
               v-bind:readonly="!editable">
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
      <el-upload class="col-sm-9"
        action="https://jsonplaceholder.typicode.com/posts/"
        v-bind:before-upload="reSave"
        http-request=""
        v-bind:on-preview="handlePreview"
        v-bind:on-remove="handleRemove"
        v-bind:file-list="business.files">
        <el-button size="small" type="primary" v-if="editable">点击上传</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
      <!--<div class="col-sm-9 text-right">
        <button class="btn btn-primary pull-right">上传文件</button>
      </div>
      <div class="col-sm-offset-3 col-sm-9">
        <p class="form-control-static">
          <ul class="attachment-list">
            <li v-for="File in business.files">
              <a v-bind:href="File.addr" target="_blank"></a>
            </li>
          </ul>
        </p>
      </div>-->
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import { Button, Upload } from 'element-ui';

import bus from '../../../bus.js';

Vue.use(Button);
Vue.use(Upload);

export default {
  name: 'businessEditor',
  data() {
    return {
      business: this.initBusiness
    };
  },
  props: ['initBusiness', 'editable'],
  created() {
    bus.$on('subBusiness', ()=>{this.sub()});
    bus.$on('savBusiness', ()=>{this.save()});
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
        this.business.projectStatus = '2';
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
            this.$emit('submited', this.business);
            resolve(rep);
          }
        }, (rep) => {});
      });
      return promise;
    },
    reSave(file) {
      if (this.business.id==='') {
        let promise = this.save();
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

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
}
</style>
