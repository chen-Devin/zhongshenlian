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
      <label class="col-sm-2 control-label">项目申请人电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposerTele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位</label>
      <div class="col-sm-9">
        <select class="form-control" v-model="business.institution" v-bind:readonly="!editable">
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
        <p class="form-control-static">{{business.proposerName}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">业务类型</label>
      <div class="col-sm-9">
        <select class="form-control" v-model="business.institution" v-bind:readonly="!editable">
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
        <select class="form-control" v-model="business.institution" v-bind:readonly="!editable">
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
                  v-model="business.startTime"
                  v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">结束时间</div>
              <input type="date"
                     class="form-control"
                     placeholder="请输入项目结束时间"
                     v-model="business.endTime"
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
               placeholder="请输入合同金额"
               v-model="business.amount"
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
               v-model="business.amount"
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
               v-model="business.amount"
               v-bind:readonly="!editable">
          <div class="input-group-addon">元</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">出据报告类型</label>
      <div class="col-sm-9">
        <h5>会计所</h5>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox1" value="option1"> 审字
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox2" value="option2"> 专字
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox3" value="option3"> 咨字
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox1" value="option1"> 基决审字
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox2" value="option2"> 外汇检字
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox3" value="option3"> 验字
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox2" value="option2"> 外审字
        </label>
        <hr>
        <h5>评估所</h5>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox1" value="option1"> 评字
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox2" value="option2"> 评咨字
        </label>
        <hr>
        <h5>税务所</h5>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox1" value="option1"> 税鉴字
        </label>
        <hr>
        <h5>造价所</h5>
        <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox1" value="option1"> 基结审字
        </label>
         <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox1" value="option1"> 评审字
        </label>
         <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox1" value="option1"> 概审字
        </label>
         <label class="checkbox-inline">
          <input type="checkbox" id="inlineCheckbox1" value="option1"> 咨字
        </label>
        <hr>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">审计时间</label>
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">开始时间</div>
              <input type="date"
                  class="form-control"
                  placeholder="请输入项目开始时间"
                  v-model="business.startTime"
                  v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">结束时间</div>
              <input type="date"
                     class="form-control"
                     placeholder="请输入项目结束时间"
                     v-model="business.endTime"
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
          <input type="radio" name="contractSystem" value="联合体"> 联合体
        </label>
        <label class="radio-inline">
          <input type="radio" name="contractSystem" value="非联合体"> 非联合体
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">基本取费</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">主体</div>
              <input type="text"
                  class="form-control"
                  placeholder="请输入主体"
                  v-model="business.startTime"
                  v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.endTime"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">从属体</div>
              <input type="text"
                  class="form-control"
                  placeholder="请输入从属体"
                  v-model="business.startTime"
                  v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.endTime"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-12"><a class="fa fa-plus-circle pull-right"></a></h4>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">效益取费</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">主体</div>
              <input type="text"
                  class="form-control"
                  placeholder="请输入主体"
                  v-model="business.startTime"
                  v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.endTime"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">从属体</div>
              <input type="text"
                  class="form-control"
                  placeholder="请输入从属体"
                  v-model="business.startTime"
                  v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.endTime"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-12"><a class="fa fa-plus-circle pull-right"></a></h4>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">部门合作</label>
      <div class="col-sm-9">
        <label class="radio-inline">
          <input type="radio" name="departmentCooperation" value="有部门合作"> 有部门合作
        </label>
        <label class="radio-inline">
          <input type="radio" name="departmentCooperation" value="无部门合作"> 无部门合作
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合作部门</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <p class="form-control-static">主体</p>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">合作比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.endTime"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">合作体</div>
              <input type="text"
                  class="form-control"
                  placeholder="请输入合作体"
                  v-model="business.startTime"
                  v-bind:readonly="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number"
                     class="form-control"
                     placeholder="请输入比例"
                     v-model="business.endTime"
                     v-bind:readonly="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-12"><a class="fa fa-plus-circle pull-right"></a></h4>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">参审注师</label>
      <div class="col-sm-9">
        <select class="form-control" v-model="business.institution" v-bind:readonly="!editable">
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
        <select class="form-control" v-model="business.institution" v-bind:readonly="!editable">
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
                 v-model="business.endTime"
                 v-bind:readonly="!editable">
          <div class="input-group-addon">份（类）</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告用途</label>
      <div class="col-sm-9">
        <select class="form-control" v-model="business.institution" v-bind:readonly="!editable">
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
               v-model="business.name"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目取得方式</label>
      <div class="col-sm-9">
        <label class="checkbox-inline">
          <input type="checkbox" name="gainingMethod" value="直接委托"> 直接委托
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" name="gainingMethod" value="中标委托"> 中标委托
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目编号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposerName}}</p>
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
  a.fa-plus-circle {
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
