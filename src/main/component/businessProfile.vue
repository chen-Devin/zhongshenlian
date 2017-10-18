<template>
  <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
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
    <div class="form-group" v-if="false">
      <label class="col-sm-2 control-label">项目申请人电话</label>
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
      <label class="col-sm-2 control-label">被审计单位</label>
      <div class="col-sm-9">
        <p class="form-control-static" v-for="auditedUnit in business.beingAuditedUnit">{{ auditedUnit.unit }}</p>
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
      <label class="col-sm-2 control-label">计划工期</label>
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
      <label class="col-sm-2 control-label">项目取得方式</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.getWay}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同预估金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.contractAmount===''?'':`${business.contractAmount}元`}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报价依据</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.basisQuote}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">出具报告类型</label>
      <div class="col-sm-9">
        <p class="form-control-static"
           v-html="reportFormat"></p>
      </div>
    </div>
    <div class="form-group"
         v-if="business.auditTime.exist">
      <label class="col-sm-2 control-label">审计期间</label>
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
    <div class="form-group" v-if="business.feeBasisExist">
      <label class="col-sm-2 control-label">取费依据</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.feeBasis}}</p>
      </div>
    </div>
    <div class="form-group" v-if="business.feeBasisExist">
      <label class="col-sm-2 control-label">费率</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.feeRate}}%</p>
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
              主要部门：{{business.departmentCoop.departments.main.name}}
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
        <p class="form-control-static">{{ reviewCPAsName }}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">参审助理</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{ reviewAssistantsName }}</p>
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
    <div class="form-group"
         v-if="business.auditTime.exist">
      <label class="col-sm-2 control-label">上次报告事务所</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.lastOffice}}</p>
      </div>
    </div>
    <div class="form-group"
         v-if="contractUploadShow">
      <label class="col-sm-2 control-label">正式合同</label>
      <el-upload class="col-sm-10"
                 :multiple="false"
                 :action="contractUpload.URL"
                 :on-progress="contractUploadProgress"
                 :on-success="contractUploadSuccess"
                 :show-file-list="false">
        <button class="btn my-btn submit-btn"
                type="button"
                :disabled="contractUpload.progressShow">点击上传</button>
        <span slot="tip"
              class="text-info">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <label class="col-sm-2 control-label"></label>
      <div class="col-sm-10">
        <div class="progress-wrap" v-show="contractUpload.progressShow">
          <div class="progress">
            <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: contractUpload.percentage}">
              {{contractUpload.percentage}}
            </div>
          </div>
        </div>
      </div>
      <label class="col-sm-2 control-label"></label>
      <div class="col-sm-10">
        <ul class="com-list attachment-list list-group">
          <li class="list-group-item"
              v-for="(FILE,index) in business.contracts"
              :key="index">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title"
               :href="FILE.url"
               target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right"
               @click="contractDelFile(FILE)"><i class="fa fa-times"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-group"
         v-if="contractFileShow">
      <label class="col-sm-2 control-label">正式合同</label>
      <ul class="col-sm-9 com-list attachment-list list-group">
        <li class="list-group-item"
            v-for="(FILE,index) in business.contracts"
            :key="index">
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
import qs from 'qs';

import bus from '../bus.js';


export default {
  name: 'businessProfile',
  data() {
    return {
      paths: [],
      business: this.initBusiness,
      contractUpload: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      }
    };
  },
  computed: {
    reviewCPAsName () {
      let arr = []
      if (this.business.reviewCPA.name instanceof Array) {
        this.business.reviewCPA.name.forEach((item) => {
          arr.push(item.name)
        })
      }
      return arr.join(',')
    },
    reviewAssistantsName () {
      let arr = []
      if (this.business.reviewAssistant.name instanceof Array) {
        this.business.reviewAssistant.name.forEach((item) => {
          arr.push(item.name)
        })
      }
      return arr.join(',')
    },
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    },
    departmentCoopChan() {
      return (this.business.departmentCoop.name === '有部门合作') ? true : false;
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
          out += `<p>${this.business.report.type[i].name}</p>
                    <p class="form-control-static">${wordsFormat}</p>
                  <hr>`;
        }
      }
      return out;
    },
    contractUploadShow() {
      return (this.user.department === '业务部' && this.business.projectStatus >= 60 && this.business.projectStatus < 80) ? true : false;
    },
    contractFileShow() {
      if (this.user.department === '业务部') {
        if (this.business.projectStatus >= 80) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.business.projectStatus >= 70) {
          return true;
        } else {
          return false;
        }
      }
    },
    contractNumShow() {
      return (this.business.projectStatus >= 80) ? true : false;
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
    this.contractUpload.URL = '/fileUpload?data=' + JSON.stringify(data);

    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/business-profile`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-sales-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/business-profile`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-risk-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/business-profile`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-leader-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/business-profile`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-office-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/business-profile`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-financial-${this.$route.params.id}/business-profile`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/business-profile`, present: false });
      this.paths.push({ name: '业务概况', url: `/business-handle-detail-archives-${this.$route.params.id}/business-profile`, present: true });
    }
    this.$emit('pathsChan', this.paths);

  },
  methods: {
    contractUploadProgress(event, file, fileList) {  // file对象都有哪些属性
      this.contractUpload.progressShow = true;       // 有空再看一下，写一个组件
      this.contractUpload.percentage = parseInt(file.percentage)+'%';
    },
    contractUploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.business.contracts.push(obj);
        this.$emit('uploaded', this.business);
        setTimeout(() => {
          this.contractUpload.percentage = '0%';
          this.contractUpload.progressShow = false;
        }, 500);
      }
    },
    contractDelFile(FILE) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: FILE.id,
              type: 'electronicContract'
            }
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.business.contracts.length; i++) {
            if (this.business.contracts[i].id === FILE.id) {
              this.business.contracts.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.business);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    }
  }
};
</script>

<style lang="sass" scoped>
label.col-sm-2.control-label {
  width: 143px;
}

.check-code {
  margin-top: -6px;
  margin-left: 10px;
}
</style>
