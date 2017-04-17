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
        <p class="form-control-static">{{business.proposer.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目申请人电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposer.tele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位</label>
      <div class="col-sm-9">
        <select class="form-control"
                v-model="business.institution.name"
                v-bind:readonly="!editable">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">客户名称</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institution.client}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">业务类型</label>
      <div class="col-sm-9">
        <select class="form-control"
                v-model="business.type"
                v-bind:readonly="!editable">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目经理</label>
      <div class="col-sm-9">
        <select class="form-control"
                v-model="business.manager"
                v-bind:readonly="!editable">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目计划时间</label>
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">开始时间</div>
              <input type="date"
                     class="form-control"
                     placeholder="请输入项目开始时间"
                     v-model="business.time.start"
                     v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">结束时间</div>
              <input type="date"
                     class="form-control"
                     placeholder="请输入项目结束时间"
                     v-model="business.time.end"
                     v-bind:readonly="!editable">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">资产总额</label>
      <div class="col-sm-9">
        <div class="input-group">
          <div class="input-group-addon">￥</div>
          <input type="number"
                 class="form-control"
                 placeholder="请输入资产总额"
                 v-model="business.assetAmount"
                 v-bind:readonly="!editable">
          <div class="input-group-addon">元</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同金额</label>
      <div class="col-sm-9">
        <div class="input-group">
          <div class="input-group-addon">￥</div>
          <input type="number"
                 class="form-control"
                 placeholder="请输入合同金额"
                 v-model="business.contractAmount"
                 v-bind:readonly="!editable">
          <div class="input-group-addon">元</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同单价</label>
      <div class="col-sm-9">
        <div class="input-group">
          <div class="input-group-addon">￥</div>
          <input type="number"
                 class="form-control"
                 placeholder="请输入合同单价"
                 v-model="business.contractPrice"
                 v-bind:readonly="!editable">
          <div class="input-group-addon">元</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">出据报告类型</label>
      <div class="col-sm-9">
        <template v-for="(TYPE, index) in business.report.type">
          <h5>{{TYPE.name}}</h5>
          <label class="checkbox-inline"
                 v-for="(WORD, index) in TYPE.words"
                 v-bind:key="index">
            <input type="checkbox"
                   v-model="WORD.state"
                   v-on:change="reportTypeChan(TYPE, WORD)"
                   v-bind:readonly="!editable"> {{WORD.name}}
          </label>
          <hr>
        </template>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目编号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.number}}</p>
      </div>
    </div>
    <div class="form-group"
         v-if="business.auditTime.exist">
      <label class="col-sm-2 control-label">审计时间</label>
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">开始时间</div>
              <input type="date"
                     class="form-control"
                     placeholder="请输入项目开始时间"
                     v-model="business.auditTime.start"
                     v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">结束时间</div>
              <input type="date"
                     class="form-control"
                     placeholder="请输入项目结束时间"
                     v-model="business.auditTime.end"
                     v-bind:readonly="!editable">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同体制</label>
      <div class="col-sm-9">
        <label class="radio-inline">
          <input type="radio"
                 name="contractSystem"
                 value="联合体"
                 v-model="business.contractType.name"
                 v-bind:readonly="!editable"> 联合体
        </label>
        <label class="radio-inline">
          <input type="radio"
                 name="contractSystem"
                 value="非联合体"
                 v-model="business.contractType.name"
                 v-bind:readonly="!editable"> 非联合体
        </label>
      </div>
    </div>
    <div class="form-group"
         v-if="contractTypeChan">
      <label class="col-sm-2 control-label">基本取费</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">主体</div>
              <input type="text"
                     class="form-control"
                     placeholder="请输入主体"
                     v-model="business.contractType.basicFee.main.name"
                     v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.contractType.basicFee.main.percentage"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group"
             v-for="(DEPEND, index) in business.contractType.basicFee.depend"
             v-bind:key="index">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">从属体</div>
              <input type="text"
                     class="form-control"
                     placeholder="请输入从属体"
                     v-model="DEPEND.name"
                     v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="DEPEND.percentage"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
          <h4 class="col-sm-1"
              v-if="editable">
            <a class="fa fa-times-circle text-danger"
               v-on:click="delBasicFee(index)"></a>
          </h4>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-1 col-sm-offset-11"
              v-if="editable">
            <a class="fa fa-plus-circle text-success"
               v-on:click="addBasicFee()"></a>
          </h4>
        </div>
      </div>
    </div>
    <div class="form-group"
         v-if="contractTypeChan">
      <label class="col-sm-2 control-label">效益取费</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">主体</div>
              <input type="text"
                     class="form-control"
                     placeholder="请输入主体"
                     v-model="business.contractType.benefitFee.main.name"
                     v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.contractType.benefitFee.main.percentage"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group"
             v-for="(DEPEND, index) in business.contractType.benefitFee.depend"
             v-bind:key="index">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">从属体</div>
              <input type="text"
                     class="form-control"
                     placeholder="请输入从属体"
                     v-model="DEPEND.name"
                     v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="DEPEND.percentage"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
          <h4 class="col-sm-1"
              v-if="editable">
            <a class="fa fa-times-circle text-danger"
               v-on:click="delBenefitFee(index)"></a>
          </h4>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-1 col-sm-offset-11"
              v-if="editable">
            <a class="fa fa-plus-circle text-success"
               v-on:click="addBenefitFee()"></a>
          </h4>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">部门合作</label>
      <div class="col-sm-9">
        <label class="radio-inline">
          <input type="radio"
                 name="departmentCooperation"
                 value="有部门合作"
                 v-model="business.departmentCoop.name"
                 v-bind:readonly="!editable"> 有部门合作
        </label>
        <label class="radio-inline">
          <input type="radio"
                 name="departmentCooperation"
                 value="无部门合作"
                 v-model="business.departmentCoop.name"
                 v-bind:readonly="!editable"> 无部门合作
        </label>
      </div>
    </div>
    <div class="form-group"
         v-if="departmentCoopChan">
      <label class="col-sm-2 control-label">合作部门</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <p class="form-control-static">主体</p>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.departmentCoop.departments.main.percentage"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group"
             v-for="(COOP, index) in business.departmentCoop.departments.coop">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">合作体</div>
              <input type="text"
                     class="form-control"
                     placeholder="请输入合作体"
                     v-model="COOP.name"
                     v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="COOP.percentage"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
          <h4 class="col-sm-1"
              v-if="editable">
            <a class="fa fa-times-circle text-danger"
               v-on:click="delDepartments(index)"></a>
          </h4>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-1 col-sm-offset-11"
              v-if="editable">
            <a class="fa fa-plus-circle text-success"
               v-on:click="addDepartments()"></a>
          </h4>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">参审注师</label>
      <div class="col-sm-9">
        <select class="form-control"
                v-model="business.reviewCPA"
                v-bind:readonly="!editable">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">参审助理</label>
      <div class="col-sm-9">
        <select class="form-control"
                v-model="business.reviewAssistant"
                v-bind:readonly="!editable">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告数量</label>
      <div class="col-sm-9">
        <div class="input-group">
          <input type="number"
                 class="form-control"
                 placeholder="请输入比例"
                 v-model="business.report.amount"
                 v-bind:readonly="!editable">
          <div class="input-group-addon">份（类）</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告用途</label>
      <div class="col-sm-9">
        <select class="form-control"
                v-model="business.report.usage"
                v-bind:readonly="!editable">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">上次报告事务所</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入上次报告事务所"
               v-model="business.lastoffice"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目取得方式</label>
      <div class="col-sm-9">
        <label class="checkbox-inline">
          <input type="checkbox"
                 name="gainingMethod"
                 v-model="business.getWay.direct.state"
                 v-bind:readonly="!editable"> {{business.getWay.direct.name}}
        </label>
        <label class="checkbox-inline">
          <input type="checkbox"
                 name="gainingMethod"
                 v-model="business.getWay.bid.state"
                 v-bind:readonly="!editable"> {{business.getWay.bid.name}}
        </label>
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
        <button class="btn btn-info btn-sm"
                type="button"
                v-if="editable">点击上传</button>
        <span slot="tip"
              class="text-info"
              v-if="editable">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <div class="col-sm-offset-2 col-sm-9">
        <ul class="attachment-list list-group">
          <li class="list-group-item"
              v-for="FILE in business.files">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title"
               v-bind:href="FILE.url"
               target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right"
               v-on:click="delFile(FILE)"
               v-if="editable"><i class="fa fa-times"></i></a>
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
  computed: {
    contractTypeChan() {
      if (this.business.contractType.name === '联合体') {
        return true;
      } else {
        return false;
      }
    },
    departmentCoopChan() {
      if (this.business.departmentCoop.name === '有部门合作') {
        return true;
      } else {
        return false;
      }
    }
  },
  props: ['initBusiness', 'editable'],
  created() {
    bus.$on('subBusiness', () => { this.sub() });
    bus.$on('savBusiness', () => { this.save() });
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.business.id,
      type: 'projectAnnex'
    };
    this.uploadURL = 'http://tzucpa.lovecampus.cn/fileUpload?data=' + JSON.stringify(data);
  },
  methods: {
    reportTypeChan(TYPE, WORD) {
      let flag = false;
      outermost1:
      for (let i = 0; i < this.business.report.type.length; i++) {
        if (this.business.report.type[i].name === '会计所') {
          for (let j = 0; j < this.business.report.type[i].words.length; j++) {
            if (this.business.report.type[i].words[j].state) {
              flag = true;
              break outermost1;
            }
          }
        }
      }
      this.business.auditTime.exist = flag;

      flag = false;
      let type = '';
      let word = '';
      let t = new Date();
      let year = t.getFullYear();
      outermost2:
      for(let i = 0; i < this.business.report.type.length; i++) {
        for (let j = 0; j < this.business.report.type[i].words.length; j++) {
          if (this.business.report.type[i].words[j].state) {
            flag = true;
            type = this.business.report.type[i].code;
            word = this.business.report.type[i].words[j].code;
            break outermost2;
          }
        }
      }

      if (flag) {
        this.business.number = `${type}-${word}-${year}-XXX`;
      } else {
        this.business.number = '';
      }

    },
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
        }, (rep) => { });
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
        }, (rep) => { });
      });
      return promise;
    },
    reSave(file) {
      if (this.business.id === '') {
        return this.save().then((rep) => {
          let data = {
            command: 'handlerBusiness',
            platform: 'web',
            id: this.business.id,
            type: 'projectAnnex'
          };
          this.uploadURL = 'http://tzucpa.lovecampus.cn/fileUpload?data=' + JSON.stringify(data);
        }, (rep) => { });
      } else {
        return true;
      }
    },
    uploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
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
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.business.files.length; i++) {
            if (this.business.files[i].id === FILE.id) {
              this.business.files.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.business);
        }
      }, (rep) => { });
    },
    delBasicFee(index) {
      this.business.contractType.basicFee.depend.splice(index, 1);
    },
    addBasicFee() {
      this.business.contractType.basicFee.depend.push({name:'',percentage:0});
    },
    delBenefitFee(index) {
      this.business.contractType.benefitFee.depend.splice(index, 1);
    },
    addBenefitFee() {
      this.business.contractType.benefitFee.depend.push({name:'',percentage:0});
    },
    delDepartments(index) {
      this.business.departmentCoop.departments.coop.splice(index, 1);
    },
    addDepartments() {
      this.business.departmentCoop.departments.coop.push({name:'',percentage:0});
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
  a.fa {
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }
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
