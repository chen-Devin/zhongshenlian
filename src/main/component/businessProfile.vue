<template>
  <form class="form-horizontal">
    <div class="form-group"
         v-if="contractNumShow">
      <label class="col-sm-2 control-label">项目编号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.number}}</p>
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
        <p class="form-control-static">{{business.proposer.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposer.tele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institution.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">客户名称</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institution.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">业务类型</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.type}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目经理</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.manager.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目计划时间</label>
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-6">
            <p class="form-control-static">开始时间：{{business.time.start}}</p>
          </div>
          <div class="col-sm-6">
            <p class="form-control-static">结束时间：{{business.time.end}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">资产总额</label>
      <div class="col-sm-9">
        <p class="form-control-static">￥{{business.assetAmount}}元</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">￥{{business.contractAmount}}元</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同单价</label>
      <div class="col-sm-9">
        <p class="form-control-static">￥{{business.contractPrice}}元</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">出据报告类型</label>
      <div class="col-sm-9">
        <p class="form-control-static" v-html="reportFormat"></p>
      </div>
    </div>
    <div class="form-group"
         v-if="business.auditTime.exist">
      <label class="col-sm-2 control-label">审计时间</label>
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-6">
            <p class="form-control-static">开始时间：{{business.auditTime.start}}</p>
          </div>
          <div class="col-sm-6">
            <p class="form-control-static">结束时间：{{business.auditTime.end}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同体制</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.contractType.name}}</p>
      </div>
    </div>
    <div class="form-group"
         v-if="contractTypeChan">
      <label class="col-sm-2 control-label">基本取费</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <p class="form-control-static">
              主体：{{business.contractType.basicFee.main.name}}
            </p>
          </div>
          <div class="col-sm-5">
            <p class="form-control-static">
              比例：{{business.contractType.basicFee.main.percentage}}%
            </p>
          </div>
        </div>
        <div class="row form-group"
             v-for="(DEPEND, index) in business.contractType.basicFee.depend"
             v-bind:key="index">
          <div class="col-sm-6">
            <p class="form-control-static">
              从属体：{{DEPEND.name}}
            </p>
          </div>
          <div class="col-sm-5">
            <p class="form-control-static">
              比例：{{DEPEND.percentage}}%
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group"
         v-if="contractTypeChan">
      <label class="col-sm-2 control-label">效益取费</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <p class="form-control-static">
              主体：{{business.contractType.benefitFee.main.name}}
            </p>
          </div>
          <div class="col-sm-5">
            <p class="form-control-static">
              比例：{{business.contractType.benefitFee.main.percentage}}%
            </p>
          </div>
        </div>
        <div class="row form-group"
             v-for="(DEPEND, index) in business.contractType.benefitFee.depend"
             v-bind:key="index">
          <div class="col-sm-6">
            <p class="form-control-static">
              从属体：{{DEPEND.name}}
            </p>
          </div>
          <div class="col-sm-5">
            <p class="form-control-static">
              比例：{{DEPEND.percentage}}%
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">部门合作</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.departmentCoop.name}}</p>
      </div>
    </div>
    <div class="form-group"
         v-if="departmentCoopChan">
      <label class="col-sm-2 control-label">合作部门</label>
      <div class="col-sm-9">
        <div class="row form-group">
          <div class="col-sm-6">
            <p class="form-control-static">
              主体
            </p>
          </div>
          <div class="col-sm-5">
            <p class="form-control-static">
              比例：{{business.departmentCoop.departments.main.percentage}}%
            </p>
          </div>
        </div>
        <div class="row form-group"
             v-for="(COOP, index) in business.departmentCoop.departments.coop"
             v-bind:key="index">
          <div class="col-sm-6">
            <p class="form-control-static">
              合作体：{{COOP.name}}
            </p>
          </div>
          <div class="col-sm-5">
            <p class="form-control-static">
              比例：{{COOP.percentage}}%
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">参审注师</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.reviewCPA.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">参审助理</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.reviewAssistant.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告数量</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.report.amount}}份（类）</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告用途</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.report.usage}}份（类）</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">上次报告事务所</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.lastoffice}}份（类）</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目取得方式</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{getWayFormat}}</p>
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
      <label class="col-sm-2 control-label">正式合同</label>
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

import bus from '../bus.js';

Vue.use(Upload);

export default {
  name: 'businessProfile',
  data() {
    return {
      paths: [
        { name: '待处理业务', url: '/business-handle-list-sales', present: false },
        { name: '业务详情', url: `/business-handle-detail-sales/${this.$route.params.id}`, present: false },
        { name: '业务概况', url: `/business-handle-detail-sales/${this.$route.params.id}/business-profile`, present: true }
      ],
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
    },
    getWayFormat() {
      let out = '';
      for (let i=0; i<this.business.getWay.length; i++) {
        if (this.business.getWay[i].state) {
          out += this.business.getWay[i].name + ' ';
        }
      }
    },
    reportFormat() {
      let out = '';
      let typeEx = false;
      let wordsFormat = '';
      for (let i=0; i<this.business.report.type.length; i++) {
        typeEx = false;
        wordsFormat = '';
        for (let j=0; j<this.business.report.type[i].words.length; j++) {
          if (this.business.report.type[i].words[j].state) {
            typeEx = ture;
            wordsFormat += this.business.report.type[i].words[j].name + ' ';
          }
        }
        if (typeEx) {
          out += `<h4>${this.business.report.type[i].name}</h4>
                    <p class="form-control-static">${wordsFormat}</p>
                  <hr>`;
        }
      }
      return out;
    },
    contractUploadShow() {
      if (this.user.department === '业务部' && this.business.projectStatus >= 6 && this.business.projectStatus <= 7) {
        return true;
      } else {
        return false;
      }
    },
    contractFileShow() {
      if (this.user.department === '业务部') {
        if (this.business.projectStatus > 7) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.business.projectStatus > 6) {
          return true;
        } else {
          return false;
        }
      }

    },
    contractNumShow() {
      if (this.business.projectStatus > 7) {
        return true;
      }
    }
  },
  props: ['initBusiness', 'user'],
  created() {
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.business.id,
      type: 'electronicContract'
    };
    this.uploadURL = 'http://tzucpa.lovecampus.cn/fileUpload?data='+JSON.stringify(data);

    this.$emit('pathsChan', this.paths);

    bus.$on('projectStatusUpdate', (projectStatus) => {
      this.business.projectStatus = projectStatus;
    });
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
