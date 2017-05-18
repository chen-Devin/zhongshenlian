<template>
  <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目名称</label>
      <div class="col-sm-5">
        <input type="text" class="form-control half-width" placeholder="请输入项目名称" v-model="business.name" :disabled="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">提交申请人</label>
      <div class="col-sm-5">
        <p class="form-control-static">{{business.proposer.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目申请人电话</label>
      <div class="col-sm-5">
        <p class="form-control-static">{{business.proposer.tele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位（客户）</label>
      <div class="col-sm-5">
        <select class="form-control" v-model="business.institution" :disabled="!editable">
          <option v-for="(CUS, index) in customers" :value="CUS" :key="index">{{CUS.customerName}}</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">客户联系人</label>
      <div class="col-sm-5">
        <p class="form-control-static">{{business.institution.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">业务类型</label>
      <div class="col-sm-5">
        <select class="form-control" v-model="business.type" :disabled="!editable">
          <option v-for="(TYPE, index) in businessType" :value="TYPE" :key="index">{{TYPE}}</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目经理</label>
      <div class="col-sm-5">
        <input type="text" class="form-control" placeholder="请输入项目经理" v-model="business.manager.name" :disabled="!editable">
        <!--<select class="form-control"
                  v-model="business.manager"
                  :disabled="!editable">
            <option v-for="(STA, index) in staffs"
                    :value="STA"
                    :key="index">{{STA.name}}</option>
          </select>-->
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目计划时间</label>
      <div class="col-sm-5">
        <div class="row">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">开始时间</div>
              <input type="date" class="form-control" placeholder="请输入项目开始时间" v-model="business.time.start" :disabled="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">结束时间</div>
              <input type="date" class="form-control" placeholder="请输入项目结束时间" v-model="business.time.end" :disabled="!editable">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目取得方式</label>
      <div class="col-sm-5">
        <label class="radio-inline" v-for="(WAY, index) in getWay" :key="index">
          <input type="radio" name="gainingMethod" v-model="business.getWay" :value="WAY" :disabled="!editable"> {{WAY}}
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">资产总额</label>
      <div class="col-sm-5">
        <div class="input-group">
          <p class="form-control-static">{{business.institution.assetSize+'万元'}}</p>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同金额</label>
      <div class="col-sm-5">
        <div class="input-group">
          <masked-input type="text"
                        class="form-control"
                        placeholder="请输入合同金额"
                        v-model="business.contractAmount"
                        :disabled="!editable"
                        :mask="currencyMask"
                        :guide="false"
                        placeholderChar="#">
          </masked-input>
          <div class="input-group-addon">元</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同单价</label>
      <div class="col-sm-5">
        <div class="input-group">
          <masked-input type="text"
                        class="form-control"
                        placeholder="请输入合同单价"
                        v-model="business.contractPrice"
                        :disabled="!editable"
                        :mask="currencyMask"
                        :guide="false"
                        placeholderChar="#">
          </masked-input>
          <div class="input-group-addon">元</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">出据报告类型</label>
      <div class="col-sm-5">
        <label class="checkbox-inline" v-for="(TYPE, index) in business.report.type" :key="index">
          <input type="checkbox" v-model="TYPE.state" @change="typeChan(TYPE)" :disabled="!editable"> {{TYPE.name}}
        </label>
        <hr>
        <template v-for="(TYPE, index) in business.report.type" v-if="TYPE.state">
          <h5>{{TYPE.name}}</h5>
          <label class="checkbox-inline" v-for="(WORD, index) in TYPE.words" :key="index">
            <input type="checkbox" v-model="WORD.state" @change="reportTypeChan(TYPE, WORD)" :disabled="!editable"> {{WORD.name}}
          </label>
          <hr>
        </template>
      </div>
    </div>
    <div class="form-group" v-show="false">
      <label class="col-sm-2 control-label">项目编号</label>
      <div class="col-sm-5">
        <p class="form-control-static">{{business.number}}</p>
      </div>
    </div>
    <div class="form-group" v-if="business.auditTime.exist">
      <label class="col-sm-2 control-label">审计时间</label>
      <div class="col-sm-5">
        <div class="row">
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">开始时间</div>
              <input type="date" class="form-control" placeholder="请输入项目开始时间" v-model="business.auditTime.start" :disabled="!editable">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">结束时间</div>
              <input type="date" class="form-control" placeholder="请输入项目结束时间" v-model="business.auditTime.end" :disabled="!editable">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同体制</label>
      <div class="col-sm-5">
        <label class="radio-inline">
          <input type="radio" name="contractSystem" value="联合体" v-model="business.contractType.name" :disabled="!editable"> 联合体
        </label>
        <label class="radio-inline">
          <input type="radio" name="contractSystem" value="非联合体" v-model="business.contractType.name" :disabled="!editable"> 非联合体
        </label>
      </div>
    </div>
    <div class="form-group" v-if="contractTypeChan">
      <label class="col-sm-2 control-label">基本取费</label>
      <div class="col-sm-5">
        <div class="row form-group">
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">主办方</div>
              <input type="text" class="form-control" placeholder="请输入主办方" v-model="business.contractType.basicFee.main.name" :disabled="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number" class="form-control" placeholder="请输入比例" v-model.number="business.contractType.basicFee.main.percentage" :disabled="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group" v-for="(DEPEND, index) in business.contractType.basicFee.depend" :key="index">
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">协办方</div>
              <input type="text" class="form-control" placeholder="请输入协办方" v-model="DEPEND.name" :disabled="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number" class="form-control" placeholder="请输入比例" v-model.number="DEPEND.percentage" :disabled="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
          <h4 class="col-sm-1" v-if="editable">
            <a class="fa fa-times-circle text-danger" @click="delBasicFee(index)"></a>
          </h4>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-1 col-sm-offset-11" v-if="editable">
            <a class="fa fa-plus-circle text-success" @click="addBasicFee()"></a>
          </h4>
        </div>
      </div>
    </div>
    <div class="form-group" v-if="contractTypeChan">
      <label class="col-sm-2 control-label">效益取费</label>
      <div class="col-sm-5">
        <div class="row form-group">
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">主办方</div>
              <input type="text" class="form-control" placeholder="请输入主办方" v-model="business.contractType.benefitFee.main.name" :disabled="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number" class="form-control" placeholder="请输入比例" v-model.number="business.contractType.benefitFee.main.percentage" :disabled="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group" v-for="(DEPEND, index) in business.contractType.benefitFee.depend" :key="index">
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">协办方</div>
              <input type="text" class="form-control" placeholder="请输入协办方" v-model="DEPEND.name" :disabled="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number" class="form-control" placeholder="请输入比例" v-model.number="DEPEND.percentage" :disabled="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
          <h4 class="col-sm-1" v-if="editable">
            <a class="fa fa-times-circle text-danger" @click="delBenefitFee(index)"></a>
          </h4>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-1 col-sm-offset-11" v-if="editable">
            <a class="fa fa-plus-circle text-success" @click="addBenefitFee()"></a>
          </h4>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">部门合作</label>
      <div class="col-sm-5">
        <label class="radio-inline">
          <input type="radio" name="departmentCooperation" value="有部门合作" v-model="business.departmentCoop.name" :disabled="!editable"> 有部门合作
        </label>
        <label class="radio-inline">
          <input type="radio" name="departmentCooperation" value="无部门合作" v-model="business.departmentCoop.name" :disabled="!editable"> 无部门合作
        </label>
      </div>
    </div>
    <div class="form-group" v-if="departmentCoopChan">
      <label class="col-sm-2 control-label">合作部门</label>
      <div class="col-sm-5">
        <div class="row form-group">
          <div class="col-sm-5">
            <p class="form-control-static">主要部门：{{business.departmentCoop.departments.main.name}}</p>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number" class="form-control" placeholder="请输入比例" v-model.number="business.departmentCoop.departments.main.percentage" :disabled="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
        </div>
        <div class="row form-group" v-for="(COOP, index) in business.departmentCoop.departments.coop">
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">合作部门</div>
              <input type="text" class="form-control" placeholder="请输入合作部门" v-model="COOP.name" :disabled="!editable">
            </div>
          </div>
          <div class="col-sm-5">
            <div class="input-group">
              <div class="input-group-addon">比例</div>
              <input type="number" class="form-control" placeholder="请输入比例" v-model.number="COOP.percentage" :disabled="!editable">
              <div class="input-group-addon">%</div>
            </div>
          </div>
          <h4 class="col-sm-1" v-if="editable">
            <a class="fa fa-times-circle text-danger" @click="delDepartments(index)"></a>
          </h4>
        </div>
        <div class="row form-group">
          <h4 class="col-sm-1 col-sm-offset-11" v-if="editable">
            <a class="fa fa-plus-circle text-success" @click="addDepartments()"></a>
          </h4>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">参审注师</label>
      <div class="col-sm-5">
        <input type="text" class="form-control" placeholder="请输入参审注师" v-model="business.reviewCPA.name" :disabled="!editable">
        <!--<select class="form-control"
                  v-model="business.reviewCPA"
                  :disabled="!editable">
            <option v-for="(STA, index) in staffs"
                    :value="STA"
                    :key="index">{{STA.name}}</option>
          </select>-->
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">参审助理</label>
      <div class="col-sm-5">
        <input type="text" class="form-control" placeholder="请输入参审助理" v-model="business.reviewAssistant.name" :disabled="!editable">
        <!--<select class="form-control"
                  v-model="business.reviewAssistant"
                  :disabled="!editable">
            <option v-for="(STA, index) in staffs"
                    :value="STA"
                    :key="index">{{STA.name}}</option>
          </select>-->
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告数量</label>
      <div class="col-sm-5">
        <div class="input-group">
          <input type="number" class="form-control" placeholder="请输入比例" v-model.number="business.report.amount" :disabled="!editable">
          <div class="input-group-addon">份（类）</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告用途</label>
      <div class="col-sm-5">
        <input type="text" class="form-control" placeholder="请输入报告用途" v-model="business.report.usage" :disabled="!editable">
      </div>
    </div>
    <div class="form-group" v-if="business.auditTime.exist">
      <label class="col-sm-2 control-label">上次报告事务所</label>
      <div class="col-sm-5">
        <input type="text" class="form-control" placeholder="请输入上次报告事务所" v-model="business.lastOffice" :disabled="!editable">
      </div>
    </div>
    <div class="form-group" v-if="false">
      <label class="col-sm-2 control-label">相关附件</label>
      <el-upload class="col-sm-5"
                 :multiple="false"
                 :action="upload.URL"
                 :before-upload="reSave"
                 :on-progress="uploadProgress"
                 :on-success="uploadSuccess"
                 :show-file-list="false">
        <button class="btn btn-info btn-sm"
                type="button"
                v-if="editable"
                :disabled="upload.progressShow">点击上传</button>
        <span slot="tip"
              class="text-info"
              v-if="editable">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <div class="col-sm-offset-2 col-sm-5">
        <div class="progress-wrap" v-show="upload.progressShow">
          <div class="progress">
            <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: upload.percentage}">
              {{upload.percentage}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-offset-2 col-sm-5">
        <ul class="com-list attachment-list list-group">
          <li class="list-group-item" v-for="FILE in business.files">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right" @click="delFile(FILE)" v-if="editable">
              <i class="fa fa-times"></i>
            </a>
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
import moment from 'moment';
import { Upload } from 'element-ui';
import maskedInput from 'vue-text-mask';

import bus from '../../../bus.js';
import currencyMask from '../../../currencyMask.js';

Vue.use(Upload);

export default {
  name: 'businessEditor',
  data() {
    return {
      business: this.initBusiness,
      upload: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      },
      staffs: [],
      customers: [],
      businessType: [
        '年度报告审计',
        '中期报告审计',
        '专项资金收支使用情况审计',
        '经济责任审计',
        '资产清查、清产核资审计',
        '财务收支审计',
        '高新、软件企业审计',
        '金融企业审计',
        '改组、股权转让审计',
        '发债申报审计',
        '并购重组审计',
        '内部制度审计',
        '评估前审计',
        '收入、支出、成本等专项审计',
        '外资权益确认审计',
        '工程决算',
        '验资',
        '审阅',
        '咨询',
        '评估',
        '税审',
        '工程结算',
        '其他'
      ],
      getWay: [
        '直接委托',
        '中标委托'
      ]
    };
  },
  computed: {
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    },
    departmentCoopChan() {
      return (this.business.departmentCoop.name === '有部门合作') ? true : false;
    }
  },
  props: ['initBusiness', 'editable'],
  created() {
    bus.$on('subBusiness', () => { this.sub() });
    bus.$on('savBusiness', () => { this.save() });

    this.uploadURLGen();

    /*
    暂时停用下拉菜单
    */
    // this.getStaffs().then(() => {
    //   if (this.business.manager.id === '') {
    //     this.business.manager = this.staffs[0];
    //   } else {
    //     for (let i = 0; i < this.staffs.length; i++) {
    //       if (this.business.manager.id === this.staffs[i].id) {
    //         this.business.manager = this.staffs[i];
    //         break;
    //       }
    //     }
    //   }
    //   if (this.business.reviewCPA.id === '') {
    //     this.business.reviewCPA = this.staffs[0];
    //   } else {
    //     for (let i = 0; i < this.staffs.length; i++) {
    //       if (this.business.reviewCPA.id === this.staffs[i].id) {
    //         this.business.reviewCPA = this.staffs[i];
    //         break;
    //       }
    //     }
    //   }
    //   if (this.business.reviewAssistant.id === '') {
    //     this.business.reviewAssistant = this.staffs[0];
    //   } else {
    //     for (let i = 0; i < this.staffs.length; i++) {
    //       if (this.business.reviewAssistant.id === this.staffs[i].id) {
    //         this.business.reviewAssistant = this.staffs[i];
    //         break;
    //       }
    //     }
    //   }
    // }, () => { });

    this.getCustomers().then(() => {
      if (this.business.institution.id === '') {
        this.business.institution = this.customers[0];
      } else {
        for (let i = 0; i < this.customers.length; i++) {
          if (this.business.institution.id === this.customers[i].id) {
            this.business.institution = this.customers[i];
            break;
          }
        }
      }
    }, () => { });

    if (this.business.type === '') {
      this.business.type = this.businessType[0];
    }

    this.reportTypeChan();
  },
  methods: {
    currencyMask,
    typeChan(TYPE) {
      if (!TYPE.state) {
        for (let i = 0; i < TYPE.words.length; i++) {
          TYPE.words[i].state = false;
        }
        if (TYPE.name === '会计所') {
          this.business.auditTime.exist = false;
        }
      }
    },
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
      for (let i = 0; i < this.business.report.type.length; i++) {
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
        this.business.number = `${type}-${word}-${year}-XXXX`;
      } else {
        this.business.number = '';
      }
    },
    getStaffs() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'staffManagement',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            for (let i = 0; i < rep.data.data.departmentArray.length; i++) {
              for (let j = 0; j < rep.data.data.departmentArray[i].staffArray.length; j++) {
                this.staffs.push(rep.data.data.departmentArray[i].staffArray[j])
              }
            }
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      });
      return promise;
    },
    getCustomers() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getCustomerList',
                platform: 'web',
              pageNum: 1
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            for (let i = 0; i < rep.data.data.customerArray.length; i++) {
              let obj = {
                id: rep.data.data.customerArray[i].id,
                customerName: rep.data.data.customerArray[i].customerName,
                name: rep.data.data.customerArray[i].name,
                telephone: rep.data.data.customerArray[i].telephone,
                duty: rep.data.data.customerArray[i].duty,
                department: rep.data.data.customerArray[i].department,
                registeredAddress: rep.data.data.customerArray[i].registeredAddress,
                mailingAddress: rep.data.data.customerArray[i].mailingAddress,
                businessLicenseNumber: rep.data.data.customerArray[i].businessLicenseNumber,
                registeredCapital: rep.data.data.customerArray[i].registeredCapital,
                customerNature: rep.data.data.customerArray[i].customerNature,
                assetSize: rep.data.data.customerArray[i].assetSize,
                industry: rep.data.data.customerArray[i].industry,
                setUpTime: rep.data.data.customerArray[i].setUpTime,
                founderId: rep.data.data.customerArray[i].founderId,
                founderName: rep.data.data.customerArray[i].founderName,
                founderDepartment: rep.data.data.customerArray[i].founderDepartment
              };
              this.customers.push(obj);
            }
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      });
      return promise;
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
                  contractNo: this.business.number,
                  requester: this.business.institution.customerName,
                  requesterId: this.business.institution.id,
                  requesterName: this.business.institution.name,
                  requesterPhone: this.business.institution.telephone,
                  reportPurpose: this.business.report.usage,
                  startTime: this.business.time.start,
                  endTime: this.business.time.end,
                  totalAssets: this.business.institution.assetSize,
                  contractAmount: this.business.contractAmount,
                  contractPrice: this.business.contractPrice,
                  reportCopies: this.business.report.amount,
                  reportType: (() => {
                    let out = [];
                    for (let i = 0; i < this.business.report.type.length; i++) {
                      let flag = false;
                      let typeArray = [];
                      for (let j = 0; j < this.business.report.type[i].words.length; j++) {
                        if (this.business.report.type[i].words[j].state) {
                          flag = true;
                          typeArray.push({
                            name: this.business.report.type[i].words[j].name
                          });
                        }
                      }
                      if (flag) {
                        out.push({
                          department: this.business.report.type[i].name,
                          typeArray
                        });
                      }
                    }
                    return out;
                  })(),
                  businessType: this.business.type,
                  projectStatus: this.business.projectStatus,
                  projectManagerId: this.business.manager.id,
                  projectManagerName: this.business.manager.name,
                  //手动输入
                  projectManager: this.business.manager.name,
                  checkStartTime: this.business.auditTime.start,
                  checkEndTime: this.business.auditTime.end,
                  cooperationDepartment: (() => {
                    let out = {};
                    if (this.business.departmentCoop.name === '有部门合作') {
                      out.mainDepartment = this.business.departmentCoop.departments.main.name;
                      out.mainRate = this.business.departmentCoop.departments.main.percentage;
                      out.otherArray = [];
                      for (let i = 0; i < this.business.departmentCoop.departments.coop.length; i++) {
                        out.otherArray.push({
                          cooperation: this.business.departmentCoop.departments.coop[i].name,
                          cooperationRate: this.business.departmentCoop.departments.coop[i].percentage
                        });
                      }
                    }
                    return out;
                  })(),
                  trialTeacherId: this.business.reviewCPA.id,
                  trialTeacherName: this.business.reviewCPA.name,
                  //手动输入
                  trialTeacher: this.business.reviewCPA.name,
                  trialAssistantId: this.business.reviewAssistant.id,
                  trialAssistantName: this.business.reviewAssistant.name,
                  //手动输入
                  trialAssistant: this.business.reviewAssistant.name,
                  lastOffice: this.business.lastOffice,
                  getWay: this.business.getWay,
                  contractType: (() => {
                    let out = {
                      type: this.business.contractType.name,
                      mainBasicName: this.business.contractType.basicFee.main.name,
                      mainBasicRate: this.business.contractType.basicFee.main.percentage,
                      mainEfficiencyName: this.business.contractType.benefitFee.main.name,
                      mainEfficiencyRate: this.business.contractType.benefitFee.main.percentage,
                      subBasicArray: [],
                      subEfficiencyArray: []
                    };
                    for (let i = 0; i < this.business.contractType.basicFee.depend.length; i++) {
                      out.subBasicArray.push({
                        name: this.business.contractType.basicFee.depend[i].name,
                        rate: this.business.contractType.basicFee.depend[i].percentage
                      });
                    }
                    for (let i = 0; i < this.business.contractType.benefitFee.depend.length; i++) {
                      out.subEfficiencyArray.push({
                        name: this.business.contractType.benefitFee.depend[i].name,
                        rate: this.business.contractType.benefitFee.depend[i].percentage
                      });
                    }
                    return out;
                  })(),
                  annexArray: this.business.files,
                  contractAnnexArray: this.business.contracts,
                  projectApproverArray: this.business.projectApproverArray,
                  projectSchduleArray: (() => {
                    let arr = [];
                    for (let i = 0; i < this.business.schdules.length; i++) {
                      let obj = {
                        name: this.business.schdules[i].name,
                        state: this.business.schdules[i].state === true ? '0' : '1'
                      };
                      arr.push(obj);
                    }
                    return arr;
                  })(),
                  projectBillingArray: this.business.bills,
                  projectOperatingArray: this.business.projectOperatingArray
                }
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business.id = rep.data.data.id;
            /*暂时废止上传附件*/
            // this.uploadURLGen();
            this.$emit('saved', this.business);
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      });
      return promise;
    },
    sub() {
      if (!this.contractAmountCheck()) {
        return false;
      } else if (!this.auditTimeCheck()) {
        return false;
      } else if (!this.departmentsNameCheck()) {
        return false;
      } else if (!this.basicFeeCheck()) {
        return false;
      } else if (!this.benefitFeeCheck()) {
        return false;
      } else if (!this.departmentsCheck()) {
        return false;
      } else {
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
                    contractNo: this.business.number,
                    requester: this.business.institution.customerName,
                    requesterId: this.business.institution.id,
                    requesterName: this.business.institution.name,
                    requesterPhone: this.business.institution.telephone,
                    reportPurpose: this.business.report.usage,
                    startTime: this.business.time.start,
                    endTime: this.business.time.end,
                    totalAssets: this.business.institution.assetSize,
                    contractAmount: this.business.contractAmount,
                    contractPrice: this.business.contractPrice,
                    reportCopies: this.business.report.amount,
                    reportType: (() => {
                      let out = [];
                      for (let i = 0; i < this.business.report.type.length; i++) {
                        let flag = false;
                        let typeArray = [];
                        for (let j = 0; j < this.business.report.type[i].words.length; j++) {
                          if (this.business.report.type[i].words[j].state) {
                            flag = true;
                            typeArray.push({
                              name: this.business.report.type[i].words[j].name
                            });
                          }
                        }
                        if (flag) {
                          out.push({
                            department: this.business.report.type[i].name,
                            typeArray
                          });
                        }
                      }
                      return out;
                    })(),
                    businessType: this.business.type,
                    projectStatus: this.business.projectStatus,
                    projectManagerId: this.business.manager.id,
                    projectManagerName: this.business.manager.name,
                    //手动输入
                    projectManager: this.business.manager.name,
                    checkStartTime: this.business.auditTime.start,
                    checkEndTime: this.business.auditTime.end,
                    cooperationDepartment: (() => {
                      let out = {};
                      if (this.business.departmentCoop.name === '有部门合作') {
                        out.mainDepartment = this.business.departmentCoop.departments.main.name;
                        out.mainRate = this.business.departmentCoop.departments.main.percentage;
                        out.otherArray = [];
                        for (let i = 0; i < this.business.departmentCoop.departments.coop.length; i++) {
                          out.otherArray.push({
                            cooperation: this.business.departmentCoop.departments.coop[i].name,
                            cooperationRate: this.business.departmentCoop.departments.coop[i].percentage
                          });
                        }
                      }
                      return out;
                    })(),
                    trialTeacherId: this.business.reviewCPA.id,
                    trialTeacherName: this.business.reviewCPA.name,
                    //手动输入
                    trialTeacher: this.business.reviewCPA.name,
                    trialAssistantId: this.business.reviewAssistant.id,
                    trialAssistantName: this.business.reviewAssistant.name,
                    //手动输入
                    trialAssistant: this.business.reviewAssistant.name,
                    lastOffice: this.business.lastOffice,
                    getWay: this.business.getWay,
                    contractType: (() => {
                      let out = {
                        type: this.business.contractType.name,
                        mainBasicName: this.business.contractType.basicFee.main.name,
                        mainBasicRate: this.business.contractType.basicFee.main.percentage,
                        mainEfficiencyName: this.business.contractType.benefitFee.main.name,
                        mainEfficiencyRate: this.business.contractType.benefitFee.main.percentage,
                        subBasicArray: [],
                        subEfficiencyArray: []
                      };
                      for (let i = 0; i < this.business.contractType.basicFee.depend.length; i++) {
                        out.subBasicArray.push({
                          name: this.business.contractType.basicFee.depend[i].name,
                          rate: this.business.contractType.basicFee.depend[i].percentage
                        });
                      }
                      for (let i = 0; i < this.business.contractType.benefitFee.depend.length; i++) {
                        out.subEfficiencyArray.push({
                          name: this.business.contractType.benefitFee.depend[i].name,
                          rate: this.business.contractType.benefitFee.depend[i].percentage
                        });
                      }
                      return out;
                    })(),
                    annexArray: this.business.files,
                    contractAnnexArray: this.business.contracts,
                    projectApproverArray: this.business.projectApproverArray,
                    projectSchduleArray: (() => {
                      let arr = [];
                      for (let i = 0; i < this.business.schdules.length; i++) {
                        let obj = {
                          name: this.business.schdules[i].name,
                          state: this.business.schdules[i].state === true ? '0' : '1'
                        };
                        arr.push(obj);
                      }
                      return arr;
                    })(),
                    projectBillingArray: this.business.bills,
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
            } else if (rep.data.statusCode === '10012') {
              window.location.href = 'signIn.html';
            }
          }, (rep) => { });
        });
        return promise;
      }
    },
    uploadURLGen() {
      let data = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.business.id,
        type: 'projectAnnex'
      };
      this.upload.URL = '/fileUpload?data=' + JSON.stringify(data);
    },
    reSave(file) {
      if (this.business.id === '') {
        return this.save();
      } else {
        return true;
      }
    },
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
        this.business.files.push(obj);
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
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: FILE.id,
              type: 'projectAnnex'
            }
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.business.files.length; i++) {
            if (this.business.files[i].id === FILE.id) {
              this.business.files.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.business);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    delBasicFee(index) {
      this.business.contractType.basicFee.depend.splice(index, 1);
    },
    addBasicFee() {
      this.business.contractType.basicFee.depend.push({ name: '', percentage: 0 });
    },
    basicFeeCheck() {
      if (this.business.contractType.name === '联合体') {
        let total = this.business.contractType.basicFee.main.percentage;
        for (let i = 0; i < this.business.contractType.basicFee.depend.length; i++) {
          total += this.business.contractType.basicFee.depend[i].percentage;
        }
        if (total === 100) {
          return true;
        } else {
          this.$emit('refuseSub', '基本取费比例之和应为100%，请检查');
          return false;
        }
      } else {
        return true;
      }
    },
    delBenefitFee(index) {
      this.business.contractType.benefitFee.depend.splice(index, 1);
    },
    addBenefitFee() {
      this.business.contractType.benefitFee.depend.push({ name: '', percentage: 0 });
    },
    benefitFeeCheck() {
      if (this.business.contractType.name === '联合体') {
        let total = this.business.contractType.benefitFee.main.percentage;
        for (let i = 0; i < this.business.contractType.benefitFee.depend.length; i++) {
          total += this.business.contractType.benefitFee.depend[i].percentage;
        }
        if (total === 100) {
          return true;
        } else {
          this.$emit('refuseSub', '效益取费比例之和应为100%，请检查');
          return false;
        }
      } else {
        return true;
      }
    },
    delDepartments(index) {
      this.business.departmentCoop.departments.coop.splice(index, 1);
    },
    addDepartments() {
      this.business.departmentCoop.departments.coop.push({ name: '', percentage: 0 });
    },
    departmentsCheck() {
      if (this.business.departmentCoop.name === '有部门合作') {
        let total = this.business.departmentCoop.departments.main.percentage;
        for (let i = 0; i < this.business.departmentCoop.departments.coop.length; i++) {
          total += this.business.departmentCoop.departments.coop[i].percentage;
        }
        if (total === 100) {
          return true;
        } else {
          this.$emit('refuseSub', '部门合作比例之和应为100%，请检查');
          return false;
        }
      } else {
        return true;
      }
    },
    departmentsNameCheck() {
      if (this.business.departmentCoop.name === '有部门合作') {
        let flag = true;
        for (let i = 0; i < this.business.departmentCoop.departments.coop.length; i++) {
          if(this.business.departmentCoop.departments.main.name === this.business.departmentCoop.departments.coop[i].name) {
            flag = false;
            break;
          }
        }
        if (flag) {
          return true;
        } else {
          this.$emit('refuseSub', '合作部门与主要部门不能是同一部门，请检查');
          return false;
        }
      } else {
        return true;
      }
    },
    contractAmountCheck() {
      if (this.business.contractAmount === '') {
        this.$emit('refuseSub', '请填写合同金额');
        return false;
      } else {
        let amoArr = this.business.contractAmount.split(',').reverse();
        let amoNum = 0;
        for (let i = 0; i < amoArr.length; i++) {
          amoNum += parseFloat(amoArr[i])*Math.pow(1000, i);
        }
        if (amoNum <= 0) {
          this.$emit('refuseSub', '合同金额必须大于零，请检查');
          return false;
        } else {
          return true;
        }
      }
    },
    auditTimeCheck() {
      if (this.business.auditTime.exist) {
        let sta = moment(this.business.auditTime.start, 'YYYY-MM-DD');
        let end = moment(this.business.auditTime.end, 'YYYY-MM-DD');
        if (sta.isAfter(new Date(), 'day') || end.isAfter(new Date(), 'day')) {
          this.$emit('refuseSub', '审计时间不能超过今天，请检查');
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  },
  components: {
    maskedInput
  }
};
</script>

<style lang="sass" scoped>
.normal-wrap {
  a.fa {
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
