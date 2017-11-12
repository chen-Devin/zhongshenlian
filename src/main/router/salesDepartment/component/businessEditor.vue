<template>
  <div>
    <el-form 
      :model="business" 
      :label-position="labelPosition"
      :rules="rules"
      ref="business"
      label-width="100px" 
      class="business-editor" 
      :disabled="!editable">
      <div class="basic-message">
        <el-row>
          <el-form-item label="基础信息："></el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目名称：" prop="name" v-if="editable">
              <el-input v-model="business.name"></el-input>
            </el-form-item>
            <p v-else>项目名称：{{business.name}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务范围与审计目标：" label-width="160px" prop="scope" required v-if="editable">
              <el-input v-model="business.scope" type="textarea"></el-input>
            </el-form-item>
            <p v-else>业务范围与审计目标：{{business.scope}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>提交申请人：{{user.name}}</p>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型：" required v-if="editable">
              <el-select  v-model="business.type" placeholder="选择业务类型">
                <el-option 
                v-for="(TYPE, index) in businessType" 
                :value="TYPE" 
                :key="index">
                </el-option>
              </el-select>
            </el-form-item>
            <p v-else>业务类型：{{business.type}}</p>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目取得方式：" label-width="120px" required v-if="editable">
              <el-select  v-model="business.getWay" placeholder="选择项目取得方式">
                <el-option 
                  v-for="item in getWay"
                  :value="item"
                  :key="item">
                </el-option>
              </el-select>    
            </el-form-item>
            <p v-else>项目取得方式：{{business.getWay}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="委托单位(客户）：" label-width="140px" required v-if="editable">
              <el-select v-model="business.institution.customerName" filterable @change="changeCustomer" placeholder="选择客户">
                <el-option 
                  v-for="item in customerList"
                  :key="item.id"
                  :label="item.customerName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <p v-else>委托单位(客户）：{{business.institution.customerName}}</p>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目经理：" required  v-if="editable">
              <div class="manager-input" @click="showStaffModal('projectManager')">
                {{ projectManager }}
                <i class="fa fa-x fa-user f-r" aria-hidden="true"></i>
              </div>              
            </el-form-item>
            <p v-else>项目经理：{{ projectManager }}</p>
            <!-- <el-form-item label="项目经理：" required>
              <el-select v-model="business.projectManager" placeholder="请选择项目经理">
                <el-option
                  v-for="item in staffArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同预估金额：" label-width="120px" required v-if="editable" prop="contractAmount">
              <!-- <masked-input type="text" placeholder="请输入合同预估金额"  v-model="business.contractAmount"
                            v-if="editable"
                            :mask="currencyMask"
                            :guide="false"
                            placeholderChar="#">
              </masked-input> -->
              <el-input v-model="business.contractAmount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <p v-else>合同预估金额：{{business.contractAmount}}(元)</p>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <p>客户联系人：{{user.telephone}}</p>
          </el-col>
          <el-col :span="16">
            <el-form-item label="计划工期：" required v-if="editable">
              <el-col :span="11">
                <el-form-item >
                  <el-date-picker type="date" placeholder="选择日期" v-model="business.time.start" style="width: 100%;"></el-date-picker>                 
                </el-form-item>           
              </el-col>
              <el-col class="line" :span="2">至</el-col>
              <el-col :span="11">
               <el-form-item>
                 <el-date-picker type="date" placeholder="选择日期" v-model="business.time.end" style="width: 100%;" v-if="editable"></el-date-picker>
               </el-form-item>
              </el-col>
            </el-form-item>
             <p v-else>计划工期：{{business.time.start}}至{{business.time.end}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="报价依据："  placeholder="请输入报价依据" required v-if="editable" prop="basisQuote">
              <el-input v-model="business.basisQuote" ></el-input>
            </el-form-item>
            <p v-else>报价依据：{{business.basisQuote}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="被审计单位：" required>
              <template class="addition" v-for="(Unit, index) in business.beingAuditedUnit">
                <el-row>
                  <el-col :span="22">
                    <div v-if="editable">
                      <el-select v-model="Unit.unit" filterable placeholder="请选择">
                        <el-option
                          v-for="item in customerList"
                          :key="item.id"
                          :label="item.customerName"
                          :value="item.customerName">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="input-group" v-if="!editable">
                      <div>{{ Unit.unit }}</div>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <a class="text-danger" @click="delUnits(index)" v-if="editable">
                      <img src="../../../../img/delete_icon.svg">
                    </a>
                  </el-col>
                </el-row>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <h4 class="d-ib f-l" v-if="editable">
              <a class="text-danger" @click="addUnits()">
                <img src="../../../../img/add_icon.svg">
              </a>
            </h4>
          </el-col>
        </el-row> 
      </div>
      <div class="report-message">
        <el-row>
          <el-form-item label="报告信息："></el-form-item>
        </el-row>
        <div class="d-f">
          <el-form-item label="出具报告类型：" required label-width="120px "></el-form-item>
         <!--  <p style="width:100px;">出具报告类型：</p> -->
          <div class="check-wrap">
            <p class="d-ib" v-if="!editable">{{ reportType }}</p>
            <div class="d-ib" v-for="(TYPE, index) in business.report.type" :key="index" v-else>
              <input class="magic-checkbox" type="checkbox" v-model="TYPE.state" @change="typeChan(TYPE)" :id="TYPE.name+index">
              <label class="checkbox-inline" :key="index" :for="TYPE.name+index">
                {{TYPE.name}}
              </label>
            </div>
            <div class="type-wrapper">
              <template v-for="(TYPE, indexOuter) in business.report.type" v-if="TYPE.state">
                <p class="bold-title">{{TYPE.name}}</p>
                <p class="d-ib" v-if="!editable">{{ wordsMap(TYPE.words) }}</p>
                <div class="d-ib" v-for="(WORD, index) in TYPE.words" :key="index" v-else>
                  <input class="magic-checkbox" type="checkbox" v-model="WORD.state" @change="reportTypeChan(TYPE, WORD)" :disabled="!editable" :id="index+TYPE.name">
                  <label class="checkbox-inline" :key="index" :for="index+TYPE.name">
                    {{WORD.name}}
                  </label>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="form-group" v-show="false">
          <label class="col-sm-2 control-label">项目编号</label>
          <div class="my-col-sm-5">
            <p class="form-control-static">{{business.number}}</p>
          </div>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报告数量：" label-width="100px"  v-if="editable">
              <el-input placeholder="请输入报告数量" type="number" v-model="business.report.amount"></el-input>
            </el-form-item>
            <p v-else>
              <span v-if="business.report.amount">报告数量：{{business.report.amount}}</span>
              <span v-else>报告数量：暂无</span>
            </p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报告用途：" label-width="80px"  v-if="editable">
              <el-input placeholder="请输入报告用途" type="text" v-model="business.report.usage"></el-input>
            </el-form-item>
            <p v-else>
              <span v-if="business.report.usage">报告用途：{{business.report.usage}}</span>
              <span v-esle>报告用途：暂无</span>
            </p>
          </el-col>
        </el-row>
        <el-row v-if="business.feeBasisExist">
          <el-col :span="12">
            <el-form-item label="取费依据：" label-width="100px" v-if="editable">
              <el-input placeholder="请输入取费依据" v-model="business.feeBasis"></el-input>
            </el-form-item>
            <p v-else>取费依据：{{business.feeBasis}}</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="费率：" label-width="80px"  v-if="editable">
              <el-input placeholder="请输入费率" type="number" v-model="business.feeRate">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>        
          </el-col>
        </el-row>
      </div>
      <div class="system-message">
        <el-row>
          <el-col :span="24">
            <el-form-item label="合同体制信息：" label-width="110px"></el-form-item>
          </el-col>
        </el-row>
        <div class="d-f ">
          <p style="width:90px;" class="required">合同体制：</p>
          <div class="check-wrap" v-if="editable">
            <input class="magic-radio" type="radio" name="contractSystem" value="联合体" v-model="business.contractType.name" id="common">
            <label class="radio-inline" for="common">
              联合体
            </label>
            <input class="magic-radio" type="radio" name="contractSystem" value="非联合体" v-model="business.contractType.name" id="nocommon">
            <label class="radio-inline" for="nocommon">
              非联合体
            </label>
          </div>
          <p v-else>{{ business.contractType.name }}</p>
        </div>
        <div class="form-group bgc-fff" v-if="contractTypeChan">
          <p>基本取费</p>
          <div>
            <el-row>
              <el-col :span="10">
                <el-input 
                  placeholder="请输入主办方" 
                  type="text" 
                  v-model="business.contractType.basicFee.main.name" 
                  v-if="editable">
                  <template slot="prepend">主办方</template>
                </el-input>
                <p v-else>主办方：{{ business.contractType.basicFee.main.name }}</p>
              </el-col>
              <el-col :span="10">
                <el-input 
                  placeholder="请输入比例" 
                  type="number" 
                  v-model="business.contractType.basicFee.main.percentage" 
                  v-if="editable">
                  <template slot="prepend">比例</template>
                  <template slot="append">%</template>
                </el-input>
                <p v-else>比例：{{business.contractType.basicFee.main.percentage}}%</p>
              </el-col>
            </el-row>
          </div>
          <div class="support-box">
            <el-row v-for="(DEPEND, index) in business.contractType.basicFee.depend" :key="index">
              <el-col :span="10">
                <el-input 
                  placeholder="请输入协办方" 
                  type="text" 
                  v-model="DEPEND.name" 
                  v-if="editable">
                  <template slot="prepend">协办方</template>
                </el-input>
                <p v-else>协办方：{{DEPEND.name}}</p>
              </el-col>
              <el-col :span="10">
                <el-input 
                  placeholder="请输入比例" 
                  type="number" 
                  v-model="DEPEND.percentage" 
                  v-if="editable">
                  <template slot="prepend">比例</template>
                  <template slot="append">%</template>
                </el-input>
                <p v-else>比例：{{DEPEND.percentage}}%</p>
              </el-col>
              <el-col :span="2">
                <h4 v-if="editable">
                  <a class="text-danger" @click="delBasicFee(index)">
                    <img src="../../../../img/delete_icon.svg">
                  </a>
                </h4>
              </el-col>
              <el-col :span="2">
                <h4 v-if="editable">
                  <a class="text-danger" @click="addBasicFee()">
                    <img src="../../../../img/add_icon.svg">
                  </a>
                </h4>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="form-group bgc-fff" v-if="contractTypeChan">
          <p>效益取费</p>
          <div>
            <el-row>
              <el-col :span="10">
                <el-input 
                  placeholder="请输入主办方" 
                  type="text" 
                  v-model="business.contractType.benefitFee.main.name" 
                  v-if="editable">
                  <template slot="prepend">主办方</template>
                </el-input>
                <p v-else>主办方：{{business.contractType.benefitFee.main.name}}</p>
              </el-col>
              <el-col :span="10">
                <el-input 
                  placeholder="请输入比例" 
                  type="number" 
                  v-model="business.contractType.benefitFee.main.percentage" 
                  v-if="editable">
                  <template slot="prepend">比例</template>
                  <template slot="append">%</template>
                </el-input>
                <p v-else>比例：{{business.contractType.benefitFee.main.percentage}}%</p>
              </el-col>
            </el-row>
          </div>
          <div class="support-box">
            <el-row v-for="(DEPEND, index) in business.contractType.benefitFee.depend" :key="index">
              <el-col :span="10">
                <el-input 
                  placeholder="请输入协办方" 
                  type="text" 
                  v-model="DEPEND.name" 
                  v-if="editable">
                  <template slot="prepend">协办方</template>
                </el-input>
                <p v-else>协办方：{{DEPEND.name}}</p>
              </el-col>
              <el-col :span="10">
                <el-input 
                  placeholder="请输入比例" 
                  type="number" 
                  v-model="DEPEND.percentage" 
                  v-if="editable">
                  <template slot="prepend">比例</template>
                  <template slot="append">%</template>
                </el-input>
                <p v-else>比例：{{DEPEND.percentage}}%</p>
              </el-col>
              <el-col :span="2">
                <h4 v-if="editable">
                  <a class="text-danger" @click="delBenefitFee(index)">
                    <img src="../../../../img/delete_icon.svg">
                  </a>
                </h4>
              </el-col>
              <el-col :span="2">
                <h4 v-if="editable">
                  <a class="text-danger" @click="addBenefitFee()">
                    <img src="../../../../img/add_icon.svg">
                  </a>
                </h4>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="d-f">
          <p style="width:90px;" class="required">部门协作：</p>
          <div class="my-col-sm-5 check-wrap"  v-if="editable">
            <input class="magic-radio" type="radio" name="departmentCooperation" value="有部门合作" v-model="business.departmentCoop.name" id="has">
            <label class="radio-inline" for="has">
              有部门合作
            </label>
            <input class="magic-radio" type="radio" name="departmentCooperation" value="无部门合作" v-model="business.departmentCoop.name" id="hasNot">
            <label class="radio-inline" for="hasNot">
              无部门合作
            </label>
          </div>
          <p v-else>{{ business.departmentCoop.name }}</p>
        </div>
        <div class="form-group bgc-fff" v-if="departmentCoopChan">
          <p>合作部门</p>
          <div>
            <el-row>
              <el-col :span="10">
                <el-input 
                  placeholder="无" 
                  type="text" 
                  v-model="business.departmentCoop.departments.main.name" 
                  v-if="editable">
                  <template slot="prepend">合作部门</template>
                </el-input>
                <p v-else>合作部门：{{business.departmentCoop.departments.main.name}}</p>
              </el-col>
              <el-col :span="10">
                <el-input 
                  placeholder="请输入比例" 
                  type="number" 
                  v-model="business.departmentCoop.departments.main.percentage" 
                  v-if="editable">
                  <template slot="prepend">比例</template>
                  <template slot="append">%</template>
                </el-input>
                <p v-else>比例：{{business.departmentCoop.departments.main.percentage}}%</p>
              </el-col>
            </el-row>
          </div>
          <div class="support-box">
            <el-row v-for="(COOP, index) in business.departmentCoop.departments.coop" :key="index">
              <el-col :span="10">
                <el-input 
                  placeholder="请输入合作部门" 
                  type="text" 
                  v-model="COOP.name" 
                  v-if="editable">
                  <template slot="prepend">合作部门</template>
                </el-input>
                <p v-else>合作部门：{{COOP.name}}</p>
              </el-col>
              <el-col :span="10">
                <el-input 
                  placeholder="请输入比例" 
                  type="number" 
                  v-model="COOP.percentage" 
                  v-if="editable">
                  <template slot="prepend">比例</template>
                  <template slot="append">%</template>
                </el-input>
                <p v-else>比例：{{COOP.percentage}}%</p>
              </el-col>
              <el-col :span="2">
                <h4 v-if="editable">
                  <a class="text-danger" @click="delDepartments(index)">
                    <img src="../../../../img/delete_icon.svg">
                  </a>
                </h4>
              </el-col>
              <el-col :span="2">
                <h4 v-if="editable">
                  <a class="text-danger" @click="addDepartments()">
                    <img src="../../../../img/add_icon.svg">
                  </a>
                </h4>
              </el-col>
            </el-row>
          </div>
        </div>
      </div> 
      <div class="staff-message">
        <el-row>
          <el-form-item label="人员信息："></el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="参审注师：" required>
              <span>{{ reviewCPAsName }}</span>
              <i class="fa fa-x fa-user-plus c-p" :class="{'c-na': !editable }" style="color:#50bef7;" aria-hidden="true" @click="showStaffModal('reviewCPA')"></i>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="参审助理：" required>
              <span>{{ reviewAssistantsName }}</span>
              <i class="fa fa-x fa-user-plus c-p" :class="{'c-na': !editable }" style="color:#50bef7;" aria-hidden="true" @click="showStaffModal('reviewAssistant')"></i>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <select-staff-modal 
      v-if="staffModalShow"
      :staffModalIdentity="staffModalIdentity"
      :staffModalSelect="staffModalSelect"
      :staffSelected="staffSelected"
      @selected="selected"
      @cancel="cancel"></select-staff-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import maskedInput from 'vue-text-mask';
import selectStaffModal from '@/main/component/selectStaffModal.vue';

import bus from '../../../bus.js';
import currencyMask from '../../../currencyMask.js';

export default {
  name: 'businessEditor',
  data() {
    return {
      labelPosition: 'left',
      business: this.initBusiness,
      user: {},
      upload: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      },
      staffs: [],
      bCustomers: [{
        assetSize: '',
        businessLicenseNumber: '',
        createAt: '',
        customerName: '',
        customerNature: [{
          state: '',
          val: ''
        }],
        department: '',
        duty: '',
        founderDepartment: '',
        founderId: '',
        founderName: '',
        id: '',
        industry: '',
        mailingAddress: '',
        name: '',
        registeredAddress: '',
        registeredCapital: '',
        removedStatus: '',
        telephone: '',
        updateAt: ''
      }],
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
        '财务服务',
        '其他'
      ],
      getWay: [
        '直接委托',
        '中标委托'
      ],
      projectManagers: [
        1
      ],
      customerList: [{
        id: '',
        customerName: '',
        name: '',
        telephone: '',
        value: ''
      }],
      checkedCustomer: '',
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        scope:[
          { required: true, message: '请输入业务范围与审计目标', trigger: 'blur' }
        ],
        contractAmount:[
          { required: true, message: '请输入合同预估金额', trigger: 'blur' }
        ],
        basisQuote:[
          { required: true, message: '请输入报价依据', trigger: 'blur' }
        ]
      },
      staffModalShow: false,
      staffModalIdentity: '',
      staffModalSelect: '',
      staffSelected: ''
    };
  },
  computed: {
    reportType () {
      let arr = []
      this.business.report.type.forEach((item) => {
        if (item.state) {
          arr.push(item.name)
        }
      })
      return arr.join('、')
    },
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    },
    departmentCoopChan() {
      return (this.business.departmentCoop.name === '有部门合作') ? true : false;
    },
    projectManager () {
      if (this.business.manager.name) {
        return this.business.manager.name
      } else {
        return '点击选择项目经理'
      }
    },
    reviewCPAsName () {
      let arr = []
      if (this.business.reviewCPA instanceof Array) {
        this.business.reviewCPA.forEach((item) => {
          arr.push(item.name)
        })
        let str = arr.join(',')
        return str
      } else {
        let arr = []
        return arr.join(',')
      }
    },
    reviewAssistantsName () {
      let arr = []
      if (this.business.reviewAssistant instanceof Array) {
        this.business.reviewAssistant.forEach((item) => {
          arr.push(item.name)
        })
        let str = arr.join(',')
        return str
      } else {
        let arr = []
        return arr.join(',')
      }
    }
  },
  props: ['initBusiness', 'editable'],
  created() {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
    bus.$on('subBusiness', () => { this.sub() });
    bus.$on('savBusiness', () => { this.save() });

    this.getCustomerListWithoutPage()
    // this.getBussinessUnitUserList()

    if (this.business.type === '') {
      this.business.type = this.businessType[0];
    }

    this.reportTypeChan();
  },
  destroyed: function() {
    bus.$off('subBusiness');
    bus.$off('savBusiness');
  },
  methods: {
    wordsMap(words) {
      let arr = []
      words.forEach((item) => {
        if (item.state) {
          arr.push(item.name)
        }
      })
      return arr.join('、')
    },
    // getBussinessUnitUserList () {
    //   return new Promise((resolve, reject) => {
    //     axios({
    //       headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //       method: 'get',
    //       url: '/service',
    //       params: {
    //         data: (() => {
    //           let obj = {
    //             command: 'getBussinessUnitUserList',
    //             platform: 'web',
    //             pageNum: 1
    //           }
    //           return JSON.stringify(obj);
    //         })()
    //       }
    //     }).then((rep) => {
    //       if (rep.data.statusCode === '10001') {
    //         // this.$message.success(rep.data.msg)
    //         this.staffArray = rep.data.data.userArray
    //         this.staffArray.forEach((item) => {
    //           item.checked = false
    //         })
    //         resolve('done');
    //       } else {
    //         this.$message.error(rep.data.msg)
    //       }
    //     }, (rep) => { });
    //   })
    // },
    currencyMask,
    selected (type, val) {
      console.log(val)
      if (type === '项目经理') {
        this.business.manager.name = val
      } else if (type === '参审注师') {
        this.business.reviewCPA = val
      } else if (type === '参审助理') {
        this.business.reviewAssistant = val
      }
      this.cancel()
    },
    showStaffModal (type) {
      if (this.editable) {
        if (type === 'projectManager') {
          this.staffModalIdentity = '项目经理'
          this.staffModalSelect = 'radio'
          this.staffSelected = this.business.manager.name
        } else if (type === 'reviewCPA') {
          this.staffModalIdentity = '参审注师'
          this.staffModalSelect = 'check'
          let arr = []
          console.log(this.business.reviewCPA)
          this.business.reviewCPA.forEach((item) => {
            arr.push(item.id)
          })
          this.staffSelected = arr
        } else if (type === 'reviewAssistant') {
          this.staffModalIdentity = '参审助理'
          this.staffModalSelect = 'check'
          let arr = []
          this.business.reviewAssistant.forEach((item) => {
            arr.push(item.id)
          })
          this.staffSelected = arr
        }
        this.staffModalShow = true
      }
    },
    cancel () {
      this.staffModalShow = false
    },
    changeCustomer (val) {
      this.customerList.forEach((item, index, array) => {
        if (val == item.id) {
          this.business.institution = item
        }
      })
    },
    typeChan(TYPE) {
      if (!TYPE.state) {
        for (let i = 0; i < TYPE.words.length; i++) {
          TYPE.words[i].state = false;
        }
        if (TYPE.name === '会计所') {
          this.business.auditT
          ime.exist = false;
        }
        if (TYPE.name === '造价所') {
          this.business.feeBasisExist = false;
        }
      }
    },
    reportTypeChan(TYPE, WORD) {
      let flag = false;
      let flag2 = false;
      outermost1:
      for (let i = 0; i < this.business.report.type.length; i++) {
        if (this.business.report.type[i].name === '会计所') {
          for (let j = 0; j < this.business.report.type[i].words.length; j++) {
            if (this.business.report.type[i].words[j].state) {
              flag = true;
            }
          }
        } else if (this.business.report.type[i].name === '造价所') {
          for (let j = 0; j < this.business.report.type[i].words.length; j++) {
            if (this.business.report.type[i].words[j].state) {
              flag2 = true;
            }
          }
        }
      }
      this.business.auditTime.exist = flag;
      this.business.feeBasisExist = flag2;

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
    getCustomerListWithoutPage() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getCustomerListWithoutPage',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.customerList = rep.data.data.customerList
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
                  businessScope: this.business.scope,
                  applicantId: this.user.id,
                  applicantName: this.user.name,
                  applicantPhone: this.user.telephone,
                  contractNo: this.business.number,
                  requester: this.business.institution.customerName,
                  requesterId: this.business.institution.id,
                  requesterName: this.business.institution.name,  // 客户联系人
                  requesterPhone: this.business.institution.telephone,
                  reportPurpose: this.business.report.usage,
                  startTime: this.business.time.start.slice(0,10),
                  endTime: this.business.time.end.slice(0,10),
                  totalAssets: this.business.basisQuote,
                  contractAmount: this.business.contractAmount,
                  contractPrice: this.business.contractPrice,
                  reportCopies: this.business.report.amount,
                  beingAuditedUnit: this.business.beingAuditedUnit,
                  feeRate: this.business.feeRate,
                  feeBasis: this.business.feeBasis,
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
                  trialTeacher: this.business.reviewCPA,
                  trialAssistantId: this.business.reviewAssistant.id,
                  trialAssistantName: this.business.reviewAssistant.name,
                  //手动输入
                  trialAssistant: this.business.reviewAssistant,
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
      } else if (this.business.institution.id === '') {
        this.$message.warning('请选择委托单位')
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
                    businessScope: this.business.scope,
                    applicantId: this.user.id,
                    applicantName: this.user.name,
                    applicantPhone: this.user.telephone,

                    contractNo: this.business.number,
                    requester: this.business.institution.customerName,
                    requesterId: this.business.institution.id,
                    requesterName: this.business.institution.name,
                    requesterPhone: this.business.institution.telephone,
                    reportPurpose: this.business.report.usage,
                    startTime: this.business.time.start.slice(0,10),
                    endTime: this.business.time.end.slice(0,10),
                    totalAssets: this.business.basisQuote,
                    contractAmount: this.business.contractAmount,
                    contractPrice: this.business.contractPrice,
                    reportCopies: this.business.report.amount,
                    beingAuditedUnit: this.business.beingAuditedUnit,
                    feeRate: this.business.feeRate,
                    feeBasis: this.business.feeBasis,
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
    delBasicFee(index) {
      if (this.business.contractType.basicFee.depend.length > 1) {
        this.business.contractType.basicFee.depend.splice(index, 1);
      }
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
      if (this.business.contractType.benefitFee.depend.length > 1) {
        this.business.contractType.benefitFee.depend.splice(index, 1);
      }
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
      if (this.business.departmentCoop.departments.coop.length > 1) {
        this.business.departmentCoop.departments.coop.splice(index, 1);
      }
    },
    addDepartments() {
      this.business.departmentCoop.departments.coop.push({ name: '', percentage: 0 });
    },
    delUnits(index) {
      if (this.business.beingAuditedUnit.length > 1) {
        this.business.beingAuditedUnit.splice(index, 1);
      }
    },
    addUnits() {
      this.business.beingAuditedUnit.push({ unit: '' });
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
        this.$emit('refuseSub', '请填写合同预估金额');
        return false;
      } else {
        let amoArr = this.business.contractAmount.split(',').reverse();
        let amoNum = 0;
        for (let i = 0; i < amoArr.length; i++) {
          amoNum += parseFloat(amoArr[i])*Math.pow(1000, i);
        }
        if (amoNum <= 0) {
          this.$emit('refuseSub', '合同预估金额必须大于零，请检查');
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
          this.$emit('refuseSub', '审计期间不能超过今天，请检查');
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
    maskedInput,
    selectStaffModal
  }
};
</script>

<style lang="sass" scoped>
.required {
  &:before{
    content: "*";
    color: #f00;
    padding-right: 5px;
  }
}
.business-editor {
  .input-group {
    line-height: 39px;
  }
  .check-wrap {
    padding-top: 10px;
    flex: 1;
  }
  > .basic-message {
    padding-left: 35px;
    padding-right: 35px;
    background-color: #f9fbfe;
    .manager-input {
      width: 100%;
      height: 36px;
      padding-left: 20px;
      padding-right: 20px;
      line-height: 36px;
      background-color: #fff;
      border: 1px solid #bfcbd9;
      border-radius: 4px;
      &:hover {
        cursor: pointer;
        color: #8391a5; 
        border-color: #8391a5;
      }
      &.disabled {
        background-color: #fafafa;
        &:hover {
          cursor: not-allowed;
          color: #666; 
          border-color: #bfcbd9;
        }
      }
      i {
        color: #50bef7; 
        margin-top: 10px;
      }
    }
  }
  > .report-message {
    padding-left: 35px;
    padding-right: 35px;
    .type-wrapper {
      padding-left: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
      background-color: #f9fbfe;
      > p {
        &:first-child {
          padding-top: 20px;
        }
        &:last-of-type {
          + div {
            padding-bottom: 20px;
          }
        }
      }
    }
  }
  > .system-message {
    padding-left: 35px;
    padding-right: 35px;
    padding-bottom: 1px;
    background-color: #f9fbfe;
    img {
      cursor: pointer;
    }
  }
  > .staff-message {
    padding-left: 35px;
    padding-right: 35px;
    padding-bottom: 1px;
  }
  .bgc-fff {
    padding: 10px;
    background-color: #fff;
    margin-left: 80px;
    margin-right: 80px;
  }
  .el-col {
    min-height: 50px;
    line-height: 50px;
    padding-right: 10px;
    img {
      cursor: pointer;
    }
    h4 {
      line-height: 48px;
      margin-left: 10px;
    }
  }
}
.delete{
  margin-top: -72px;
  margin-left: 220px;
}
.addition{
  position: relative;
}

.support-box {
  margin-top: 10px;
  > .el-row {
    > .el-col {
      &:last-child {
        display: none;
      }
    }
    &:last-child {
      > .el-col {
        &:last-child {
          display: block;
        }
      }
    }
  }
}

</style>
