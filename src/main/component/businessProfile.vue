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
      <label class="col-sm-2 control-label">委托单位（客户）</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institution.customerName}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">客户联系人</label>
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
        <p class="form-control-static">{{business.assetAmount===''?'':`${business.assetAmount}万元`}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.contractAmount===''?'':`${business.contractAmount}万元`}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同单价</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.contractPrice===''?'':`${business.contractPrice}万元`}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">出据报告类型</label>
      <div class="col-sm-9">
        <p class="form-control-static"
           v-html="reportFormat"></p>
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
              主办方：{{business.contractType.basicFee.main.name}}
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
             :key="index">
          <div class="col-sm-6">
            <p class="form-control-static">
              协办方：{{DEPEND.name}}
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
              主办方：{{business.contractType.benefitFee.main.name}}
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
             :key="index">
          <div class="col-sm-6">
            <p class="form-control-static">
              协办方：{{DEPEND.name}}
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
              主要部门
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
             :key="index">
          <div class="col-sm-6">
            <p class="form-control-static">
              合作部门：{{COOP.name}}
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
        <p class="form-control-static">{{business.report.amount===''?'':`${business.report.amount}份（类）`}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告用途</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.report.usage}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">上次报告事务所</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.lastOffice}}</p>
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
             :href="FILE.url"
             target="_blank">{{FILE.name}}</a>
        </li>
      </ul>
    </div>
    <div class="form-group"
         v-if="contractUploadShow">
      <label class="col-sm-2 control-label">正式合同</label>
      <el-upload class="col-sm-10"
                 :multiple="false"
                 :action="uploadURL"
                 :on-success="uploadSuccess"
                 :show-file-list="false">
        <button class="btn btn-info btn-sm"
                type="button">点击上传</button>
        <span slot="tip"
              class="text-info">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <div class="col-sm-offset-2 col-sm-9">
        <ul class="attachment-list list-group">
          <li class="list-group-item"
              v-for="FILE in business.contracts">
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
         v-if="contractFileShow">
      <label class="col-sm-2 control-label">正式合同</label>
      <ul class="col-sm-9 attachment-list list-group">
        <li class="list-group-item"
            v-for="FILE in business.contracts">
          <span class="fa fa-file-text-o"></span>
          <a class="text-primary title"
             :href="FILE.url"
             target="_blank">{{FILE.name}}</a>
        </li>
      </ul>
    </div>
    <div class="form-group"
         v-if="QRCodeShow">
      <label class="col-sm-2 control-label">二维码</label>
      <div class="col-sm-9">
        <p class="form-control-static">
          <img :src="business.QRCode.url" alt="二维码" class="img-thumbnail QRCode">
        </p>
      </div>
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
      paths: [],
      business: this.initBusiness,
      uploadURL: ''
    };
  },
  computed: {
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    },
    departmentCoopChan() {
      return (this.business.departmentCoop.name === '有部门合作') ? true : false;
    },
    getWayFormat() {
      let out = '';
      for (let i = 0; i < this.business.getWay.length; i++) {
        if (this.business.getWay[i].state) {
          out += this.business.getWay[i].name + ' ';
        }
      }
      return out;
    },
    reportFormat() {
      let out = '';
      let typeEx = false;
      let wordsFormat = '';
      for (let i = 0; i < this.business.report.type.length; i++) {
        typeEx = false;
        wordsFormat = '';
        for (let j = 0; j < this.business.report.type[i].words.length; j++) {
          if (this.business.report.type[i].words[j].state) {
            typeEx = true;
            wordsFormat += this.business.report.type[i].words[j].name + ' ';
          }
        }
        if (typeEx) {
          out += `<h5>${this.business.report.type[i].name}</h5>
                    <p class="form-control-static">${wordsFormat}</p>
                  <hr>`;
        }
      }
      return out;
    },
    contractUploadShow() {
      return (this.user.department === '业务部' && this.business.projectStatus >= 6 && this.business.projectStatus <= 7) ? true : false;
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
      return (this.business.projectStatus > 7) ? true : false;
    },
    QRCodeShow() {
      return (this.business.projectStatus > 17) ? true : false;
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.business.id,
      type: 'electronicContract'
    };
    this.uploadURL = '/fileUpload?data=' + JSON.stringify(data);

    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-sales-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-risk-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-leader-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-office-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-financial-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-archives-${this.$route.params.id}/business-profile`, present: true });
    }
    this.$emit('pathsChan', this.paths);

    /*
    TODO
    */
    // bus.$on('projectStatusUpdate', (projectStatus) => {
    //   this.business.projectStatus = projectStatus;
    // });
  },
  methods: {
    uploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.business.contracts.push(obj);
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
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.business.contracts.length; i++) {
            if (this.business.contracts[i].id === FILE.id) {
              this.business.contracts.splice(i, 1);
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
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  .attachment-list {
    margin-top: 10px;
    > li.list-group-item {
      border-right: 0;
      border-left: 0;
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
  img.QRCode {
    width: 150px;
  }
}
</style>
