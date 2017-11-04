<template>
  <div class="expenses-detail">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <h5 class="main-title" v-if="!editAble">可报销金额：</h5>
      <div class="title-wrapper">
        <el-row>
          <el-col :span="6" class="d-f">
            <span style="width:90px">报销方式：</span>
            <el-select v-model="reimbursementInfo.submitType" placeholder="请选择报销方式" :disabled="!editAble">
              <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="number d-f" v-if="contractNumberShow">
            <span style="width:70px">合同号：</span>
            <el-select 
              v-model="projectNumber" 
              placeholder="请选择合同" 
              :disabled="!editAble"
              @change="changeContract">
              <el-option
                v-for="item in contracts"
                :key="item.id"
                :label="item.id"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="d-f" :span="6">
            <span style="width:90px">开票类型：</span>
            <el-select v-model="reimbursementInfo.billingType" placeholder="请选择开票类型" :disabled="!editAble">
              <el-option
                v-for="item in classOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="d-f" :span="6">
            <span style="width:70px">申请人：</span>
            {{ applicantName }}
          </el-col>
        </el-row>
      </div>
    </card>
    <card class="card2">
      <expense-table
        type="差旅费报销"
        :reimbursementInfo="reimbursementInfo"
        :editAble="editAble"></expense-table>
      <div class="message-box">
        <el-row>
          <el-col class="d-f" :span="12">
            <span style="width:70px">报销单ID：</span>
            {{ reimbursementInfo.id }}
          </el-col>
          <el-col class="d-f" :span="12">
            <span style="width:120px">预算所属公司：</span>
            <el-select 
              v-model="reimbursementInfo.budgetCompanyName" 
              v-if="!editAble"
              disabled></el-select>
            <el-select 
              v-model="reimbursementInfo.budgetCompanyId" 
              placeholder="请选择预算所属公司" 
              @change="companyChange()"
              v-else>
              <el-option
                v-for="item in companyList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="d-f" :span="12">
            <span style="width:70px">所在公司：</span>
            {{ companyName }} 
          </el-col>
          <el-col class="d-f" :span="12">
            <span style="width:120px">预算所属部门：</span>
            <!-- <span v-if="!editAble">{{ reimbursementInfo.budgetDepartmentName }}</span> -->
            <el-select 
              v-model="reimbursementInfo.budgetDepartmentName" 
              v-if="!editAble"
              disabled></el-select>
            <el-select 
              v-model="reimbursementInfo.budgetDepartmentId" 
              placeholder="请选择预算所属部门" 
              v-else>
              <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="electronical-bill" v-if="electric || paper">
        <h5 class="vice-title" v-if="electric">
          电子发票报销
        </h5>
        <h5 class="vice-title" v-if="paper">
          纸质发票报销
        </h5>
        <el-row class="table-title">
          <el-col :span="4" :offset="4">
            附件张数
          </el-col>
          <el-col :span="4">
            金额
          </el-col>
          <el-col :span="4">
            单笔金额
          </el-col>
        </el-row>
        <el-row class="table-content">
          <el-col :span="4">
            交通费票据
          </el-col>
          <el-col :span="4">
            <el-select 
              v-model="reimbursementInfo.transportationBillingNum" 
              placeholder="请选择张数" 
              :disabled="!editAble" 
              @change="changeNumbers('transportation')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input 
              v-model="reimbursementInfo.transportationTotalFee" 
              placeholder="请填写金额" 
              type="number"
              :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.travelRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7" v-if="electric && !editAble">
            <p v-for="(item, index) in reimbursementInfo.travelRArray" :key="index">
              <a :href="item.annexUrl" target="_blank">附件</a>
            </p>
          </el-col>
          <el-col :span="7" v-if="electric && editAble">
            <div v-for="(item, index) in reimbursementInfo.travelRArray" :key="index" class="each">
              <el-upload :show-file-list="false"
                         :action="getUploadUrl(item.amount, 'travelR')"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        :disabled="!item.amount" @click="selIndex(index, 'transportation')">点击上传</button>
                <span slot="tip"
                      class="text-info" v-if="item.state.notUpload">&emsp;文件大小建议不超过3Mb</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploading">
                      &emsp;
                      <i class="el-icon-loading"></i>
                      &emsp;
                      {{ item.percentage }}%
                      </span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">
                      &emsp;
                      <span class="fa fa-file-text-o"></span>
                      <a :href="item.path" target="_blank">{{ item.name }}</a>
                      </span>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row class="table-content">
          <el-col :span="4">
            住宿费票据
          </el-col>
          <el-col :span="4">
            <el-select 
              v-model="reimbursementInfo.stayBillingNum" 
              placeholder="请选择张数" 
              :disabled="!editAble" 
              @change="changeNumbers('stay')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input 
              v-model="reimbursementInfo.stayTotalFee" 
              placeholder="请填写金额"
              type="number" 
              :disabled="!editAble">
                <template slot="append">元</template>
              </el-input> 
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.stayRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7" v-if="electric && !editAble">
            <p v-for="(item, index) in reimbursementInfo.stayRArray" :key="index">
              <a :href="item.annexUrl" target="_blank">附件</a>
            </p>
          </el-col>
          <el-col :span="7" v-if="electric && editAble">
            <div v-for="(item, index) in reimbursementInfo.stayRArray" :key="index" class="each">
              <el-upload :show-file-list="false"
                         :action="getUploadUrl(item.amount, 'stayR')"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        :disabled="!item.amount" @click="selIndex(index, 'stay')">点击上传</button>
                <span slot="tip"
                      class="text-info" v-if="item.state.notUpload">&emsp;文件大小建议不超过3Mb</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploading">
                      &emsp;
                      <i class="el-icon-loading"></i>
                      &emsp;
                      {{ item.percentage }}%
                      </span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">
                      &emsp;
                      <span class="fa fa-file-text-o"></span>
                      <a :href="item.path" target="_blank">{{ item.name }}</a>
                      </span>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row class="table-content">
          <el-col :span="4">
            本地餐费票据
          </el-col>
          <el-col :span="4">
            <el-select 
              v-model="reimbursementInfo.localMealsBillingNum" 
              placeholder="请选择张数" 
              :disabled="!editAble" 
              @change="changeNumbers('local')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input 
              v-model="reimbursementInfo.localMealsTotalFee" 
              placeholder="请填写金额"
              type="number" 
              :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.localRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7" v-if="electric && !editAble">
            <p v-for="(item, index) in reimbursementInfo.localRArray" :key="index">
              <a :href="item.annexUrl" target="_blank">附件</a>
            </p>
          </el-col>
          <el-col :span="7" v-if="electric && editAble">
            <div v-for="(item, index) in reimbursementInfo.localRArray" :key="index" class="each">
              <el-upload :show-file-list="false"
                         :action="getUploadUrl(item.amount, 'localR')"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        :disabled="!item.amount" @click="selIndex(index, 'local')">点击上传</button>
                <span slot="tip"
                      class="text-info" v-if="item.state.notUpload">&emsp;文件大小建议不超过3Mb</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploading">
                      &emsp;
                      <i class="el-icon-loading"></i>
                      &emsp;
                      {{ item.percentage }}%
                      </span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">
                      &emsp;
                      <span class="fa fa-file-text-o"></span>
                      <a :href="item.path" target="_blank">{{ item.name }}</a>
                      </span>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row class="table-content">
          <el-col :span="4">
            外地餐费票据
          </el-col>
          <el-col :span="4">
            <el-select 
              v-model="reimbursementInfo.fieldMealsBillingNum" 
              placeholder="请选择张数" 
              :disabled="!editAble" 
              @change="changeNumbers('field')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input 
              v-model="reimbursementInfo.fieldMealsTotalFee" 
              placeholder="请填写金额"
              type="number" 
              :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.fieldRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7" v-if="electric && !editAble">
            <p v-for="(item, index) in reimbursementInfo.fieldRArray" :key="index">
              <a :href="item.annexUrl" target="_blank">附件</a>
            </p>
          </el-col>
          <el-col :span="7" v-if="electric && editAble">
            <div v-for="(item, index) in reimbursementInfo.fieldRArray" :key="index" class="each">
              <el-upload :show-file-list="false"
                         :action="getUploadUrl(item.amount, 'fieldR')"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        :disabled="!item.amount" @click="selIndex(index, 'field')">点击上传</button>
                <span slot="tip"
                      class="text-info" v-if="item.state.notUpload">&emsp;文件大小建议不超过3Mb</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploading">
                      &emsp;
                      <i class="el-icon-loading"></i>
                      &emsp;
                      {{ item.percentage }}%
                      </span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">
                      &emsp;
                      <span class="fa fa-file-text-o"></span>
                      <a :href="item.path" target="_blank">{{ item.name }}</a>
                      </span>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
      <p class="btns ta-c" v-if="editAble">
        <button class="btn my-btn submit-btn" @click="addOrEditReimbursement" :disabled="submitAble">提交审批</button>
        <button class="btn my-btn cancel-btn" @click="back">取消</button>
      </p>
    </card>
    <card class="card3" v-if="!editAble">
      <div class="f-l">报销状态：</div>
      <state-svg
        :status="status"
        v-if="status"></state-svg>
      <div class="f-l">
        状态描述：
      </div>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="暂无"
        v-model="reimbursementInfo.statusDescription"
        disabled>
      </el-input>
      <p class="btns" v-if="!editAble && detailType === 'review'">
        <button class="btn my-btn submit-btn" @click="agree">审批通过</button>
        <button class="btn my-btn cancel-btn" @click="showReject">驳回</button>
      </p>
    </card>
    <reject-expense-modal
      v-if="rejectShow"
      @rejected="rejected"
      @cancel="cancel"></reject-expense-modal>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import stateSvg from './stateSvg.vue';
import expenseTable from './expenseTable.vue';
import rejectExpenseModal from './rejectExpenseModal.vue';

export default {
  name: 'expensesList',
  data() {
    return {
      paths: [],
      numbers: [],
      contracts: [],
      uploadIndex: '',
      uploadType: '',
      expenseId: '',
      projectNumber: '',
      reimbursementInfo: {
        id: '',
        applicantName: '',
        contractAmount: 0,
        submitType: '',
        billingType: '',
        startTime: '',
        endTime: '',
        place: '',
        reason: '',
        totalAmount: 0,
        summary: '',
        budgetCompanyId: '',
        budgetDepartmentId: '',
        transportationTotalFee: 0,
        transportationBillingNum: 1,
        travelRArray: [
          {
            id: '',
            amount: 0,
            annexUrl: '',
            uploadURL: '',
            state: {
              notUpload: true,
              uploading: false,
              uploadFail: false,
              uploaded: false
            },
            percentage: 0,
            name: ''
          }
        ],
        stayTotalFee: 0,
        stayBillingNum: 1,
        stayRArray: [
          {
            id: '',
            amount: 0,
            annexUrl: '',
            uploadURL: '',
            state: {
              notUpload: true,
              uploading: false,
              uploadFail: false,
              uploaded: false
            },
            percentage: 0,
            name: ''
          }
        ],
        localMealsTotalFee: 0,
        localMealsBillingNum: 1,
        localRArray: [
          {
            id: '',
            amount: 0,
            annexUrl: '',
            uploadURL: '',
            state: {
              notUpload: true,
              uploading: false,
              uploadFail: false,
              uploaded: false
            },
            percentage: 0,
            name: ''
          }
        ],
        fieldMealsTotalFee: 0,
        fieldMealsBillingNum: 1,
        fieldRArray: [
          {
            id: '',
            amount: 0,
            annexUrl: '',
            uploadURL: '',
            state: {
              notUpload: true,
              uploading: false,
              uploadFail: false,
              uploaded: false
            },
            percentage: 0,
            name: ''
          }
        ]
      },
      textarea: '',
      typeOptions: [
        {
          name: '合同报销',
          id: 'contractR'
        },
        {
          name: '非合同报销',
          id: 'nonContractR'
        }
      ],
      classOptions: ['纸质发票报销', '电子发票报销'],
      companyList: [],
      departmentList: [],
      typeSelected: '',
      classSelected: '',
      companySelected: '',
      departmentSelected: '',
      editAble: this.$route.params.id === 'new' ? true : false,
      user: {},
      rejectShow: false,
      detailType: 'detail'
    };
  },
  computed: {
    contractNumberShow () {
      if (this.reimbursementInfo.submitType === 'contractR') {
        return true
      } else {
        return false
      }
    },
    electric () {
      if (this.reimbursementInfo.billingType === '电子发票报销') {
        return true
      } else {
        return false
      }
    },
    paper () {
      if (this.reimbursementInfo.billingType === '纸质发票报销') {
        return true
      } else {
        return false
      }
    },
    projectNumberArray () {
      let arr = []
      arr[0] = this.projectNumber
      return arr
    },
    applicantName () {
      return this.reimbursementInfo.applicantName === '' ? this.user.name : this.reimbursementInfo.applicantName
    },
    companyName () {
      return this.reimbursementInfo.companyName === '' ? this.user.companyName : this.reimbursementInfo.companyName
    },
    status () {
      let arr = new Array(6).fill(0)
      switch(this.reimbursementInfo.status) {
        case '0010':
          arr[0] = 1
          break;
        case '0020':
          arr[1] = 1
          break;
        case '0030' || '0050' || '0070' || '0090':
          arr[0] = 1
          break;
        case '0040':
          arr[2] = 1
          break;
        case '0060':
          arr[3] = 1
          break;
        case '0080':
          arr[4] = 1
          break;
        case '0100':
          arr[5] = 1
          break;
        default: 
          return false
      }
      return arr
    },
    submitAble () {
      if (this.reimbursementInfo.submitType === 'contractR' && this.projectNumber === '' && this.reimbursementInfo.totalAmount <= 0.1 * Number(this.reimbursementInfo.contractAmount)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    changeContract (val) {
      this.contracts.forEach((item) => {
        if (item.id === val) {
          this.reimbursementInfo.contractAmount = item.contractAmount
        }
      })
      console.log(val)
    },
    agree () {
      this.handleReimbursement('通过', '').then(() => {
        
      }, () => {})
    },
    rejected (reason) {
      this.handleReimbursement('不通过', reason).then(() => {
        this.rejectShow = false
      }, () => {})
    },
    showReject () {
      this.rejectShow = true
    },
    cancel () {
      this.rejectShow = false
    },
    handleReimbursement (type, reason) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'handleReimbursement',
                platform: 'web',
                result: type,
                idArray: [
                  {
                    id: this.expenseId,
                    reason: reason
                  }
                ]
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            window.history.go(-1)
            this.$message.success(rep.data.msg)
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    getReimbursementInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getReimbursementInfo',
                platform: 'web',
                id: this.expenseId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.reimbursementInfo = rep.data.data
            this.projectNumber = this.reimbursementInfo.projectNumberArray[0]
            // this.companyList = rep.data.data.companyList
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    getCompanyList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getCompanyList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.companyList = rep.data.data.companyList
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getCompanyDepartmentListByCom () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getCompanyDepartmentListByCom',
                platform: 'web',
                companyId: this.reimbursementInfo.budgetCompanyId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.departmentList = rep.data.data.departmentList
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    companyChange () {
      this.reimbursementInfo.budgetDepartmentId = ''
      this.getCompanyDepartmentListByCom()
    },
    changeNumbers (item) {
      switch(item) {
        case 'transportation':
          this.reimbursementInfo.travelRArray = []
          for (let i = 0; i < Number(this.reimbursementInfo.transportationBillingNum); i++) {
            this.reimbursementInfo.travelRArray.push(
              {
                id: '',
                amount: 0,
                annexUrl: '',
                uploadURL: '',
                state: {
                  notUpload: true,
                  uploading: false,
                  uploadFail: false,
                  uploaded: false
                },
                percentage: 0,
                fileName: ''
              }
            )
          }
          break;
        case 'stay':
          this.reimbursementInfo.stayRArray = []
          for (let i = 0; i < Number(this.reimbursementInfo.stayBillingNum); i++) {
            this.reimbursementInfo.stayRArray.push(
              {
                id: '',
                amount: 0,
                annexUrl: '',
                uploadURL: '',
                state: {
                  notUpload: true,
                  uploading: false,
                  uploadFail: false,
                  uploaded: false
                },
                percentage: 0,
                fileName: ''
              }
            )
          }
          break;
        case 'local':
          this.reimbursementInfo.localRArray = []
          for (let i = 0; i < Number(this.reimbursementInfo.localMealsBillingNum); i++) {
            this.reimbursementInfo.localRArray.push(
              {
                id: '',
                amount: 0,
                annexUrl: '',
                uploadURL: '',
                state: {
                  notUpload: true,
                  uploading: false,
                  uploadFail: false,
                  uploaded: false
                },
                percentage: 0,
                fileName: ''
              }
            )
          }
          break;
        case 'field':
          this.reimbursementInfo.fieldRArray = []
          for (let i = 0; i < Number(this.reimbursementInfo.fieldMealsBillingNum); i++) {
            this.reimbursementInfo.fieldRArray.push(
              {
                id: '',
                amount: 0,
                annexUrl: '',
                uploadURL: '',
                state: {
                  notUpload: true,
                  uploading: false,
                  uploadFail: false,
                  uploaded: false
                },
                percentage: 0,
                fileName: ''
              }
            )
          }
          break;
        default: 
        console.log('有错')
      }
    },
    checkDetail (item) {
      
    },
    selIndex (i, type) {
      this.uploadIndex = i
      this.uploadType = type
    },
    getUploadUrl (amount, type) {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.reimbursementInfo.id,
        type: type,
        amount: amount
      }
      return '/fileUpload?data=' + JSON.stringify(obj)
    },
    UploadProgress (event, file, fileList) {
      switch(this.uploadType) {
        case 'transportation':
          this.reimbursementInfo.travelRArray[this.uploadIndex].state = {
            notUpload: false,
            uploading: true,
            uploaded: false
          }
          this.reimbursementInfo.travelRArray[this.uploadIndex].percentage = parseInt(event.percent)
          break;
        case 'stay':
          this.reimbursementInfo.stayRArray[this.uploadIndex].state = {
            notUpload: false,
            uploading: true,
            uploaded: false
          }
          this.reimbursementInfo.stayRArray[this.uploadIndex].percentage = parseInt(event.percent)
          break;
        case 'local':
          this.reimbursementInfo.localRArray[this.uploadIndex].state = {
            notUpload: false,
            uploading: true,
            uploaded: false
          }
          this.reimbursementInfo.localRArray[this.uploadIndex].percentage = parseInt(event.percent)
          break;
        case 'field':
          this.reimbursementInfo.fieldRArray[this.uploadIndex].state = {
            notUpload: false,
            uploading: true,
            uploaded: false
          }
          this.reimbursementInfo.fieldRArray[this.uploadIndex].percentage = parseInt(event.percent)
          break;
        default: 
        console.log('有错')
      }
    },
    UploadSuccess (response, file, fileList) {
      switch(this.uploadType) {
        case 'transportation':
          this.reimbursementInfo.travelRArray[this.uploadIndex].state = {
            notUpload: false,
            uploading: false,
            uploaded: false,
            uploadFail: false
          }
          if (response.statusCode === '10001') {
            this.reimbursementInfo.travelRArray[this.uploadIndex].state.uploaded = true
            this.reimbursementInfo.travelRArray[this.uploadIndex].path = response.data.path
            this.reimbursementInfo.travelRArray[this.uploadIndex].name = response.data.name
            this.reimbursementInfo.id = response.data.id
          } else {
            this.reimbursementInfo.travelRArray[this.uploadIndex].state.uploadFail = true
          }
          break;
        case 'stay':
          this.reimbursementInfo.stayRArray[this.uploadIndex].state = {
            notUpload: false,
            uploading: false,
            uploaded: false,
            uploadFail: false
          }
          if (response.statusCode === '10001') {
            this.reimbursementInfo.stayRArray[this.uploadIndex].state.uploaded = true
            this.reimbursementInfo.stayRArray[this.uploadIndex].path = response.data.path
            this.reimbursementInfo.stayRArray[this.uploadIndex].name = response.data.name
            this.reimbursementInfo.id = response.data.id
          } else {
            this.reimbursementInfo.stayRArray[this.uploadIndex].state.uploadFail = true
          }
          break;
        case 'local':
          this.reimbursementInfo.localRArray[this.uploadIndex].state = {
            notUpload: false,
            uploading: false,
            uploaded: false,
            uploadFail: false
          }
          if (response.statusCode === '10001') {
            this.reimbursementInfo.localRArray[this.uploadIndex].state.uploaded = true
            this.reimbursementInfo.localRArray[this.uploadIndex].path = response.data.path
            this.reimbursementInfo.localRArray[this.uploadIndex].name = response.data.name
            this.reimbursementInfo.id = response.data.id
          } else {
            this.reimbursementInfo.localRArray[this.uploadIndex].state.uploadFail = true
          }
          break;
        case 'field':
          this.reimbursementInfo.fieldRArray[this.uploadIndex].state = {
            notUpload: false,
            uploading: false,
            uploaded: false,
            uploadFail: false
          }
          if (response.statusCode === '10001') {
            this.reimbursementInfo.fieldRArray[this.uploadIndex].state.uploaded = true
            this.reimbursementInfo.fieldRArray[this.uploadIndex].path = response.data.path
            this.reimbursementInfo.fieldRArray[this.uploadIndex].name = response.data.name
            this.reimbursementInfo.id = response.data.id
          } else {
            this.reimbursementInfo.fieldRArray[this.uploadIndex].state.uploadFail = true
          }
          break;
        default: 
        console.log('有错')
      }
    },
    uploadAmount (amount, type) {
      let nd = new FormData()
      return new Promise((resolve, reject) => {
       axios({
         headers: { 'Content-Type': 'multipart/form-data' },
         method: 'post',
         url: this.getUploadUrl(amount, type),
         data: nd
       }).then((rep) => {
         if (rep.data.statusCode === '10001') {
          this.reimbursementInfo.id = rep.data.data.id
           resolve('done')
         } else {
           this.$message.error(rep.data.msg)
         }
       }, (rep) => { });
      })
    },
    addOrEditReimbursement () {
      console.log(this.paper)
      if (this.paper) {
        this.uploadAmount(this.reimbursementInfo.travelRArray[0].amount, 'travelR').then(() => {
          var promiseArr = []
          if (this.reimbursementInfo.travelRArray.length > 1) {
            this.reimbursementInfo.travelRArray.forEach((item) => {
              promiseArr.push(this.uploadAmount(item.amount, 'travelR'))
            })
          }
          this.reimbursementInfo.stayRArray.forEach((item) => {
            promiseArr.push(this.uploadAmount(item.amount, 'stayR'))
          })
          this.reimbursementInfo.localRArray.forEach((item) => {
            promiseArr.push(this.uploadAmount(item.amount, 'localR'))
          })
          this.reimbursementInfo.fieldRArray.forEach((item) => {
            promiseArr.push(this.uploadAmount(item.amount, 'fieldR'))
          })
          Promise.all(promiseArr).then(() => {
            let arr = []
            this.reimbursementInfo.projectNumberArray = this.projectNumberArray
            this.reimbursementInfo.companyName = this.user.companyName
            this.reimbursementInfo.travelRArray.forEach((item) => {
              delete item.percentage
              delete item.state
              delete item.uploadURL
            })
            this.reimbursementInfo.stayRArray.forEach((item) => {
              delete item.percentage
              delete item.state
              delete item.uploadURL
            })
            this.reimbursementInfo.localRArray.forEach((item) => {
              delete item.percentage
              delete item.state
              delete item.uploadURL
            })
            this.reimbursementInfo.fieldRArray.forEach((item) => {
              delete item.percentage
              delete item.state
              delete item.uploadURL
            })
            if (this.reimbursementInfo.id === '') {
              delete this.reimbursementInfo.id
            }
            return new Promise((resolve, reject) => {
              axios({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                method: 'get',
                url: '/service',
                params: {
                  data: (() => {
                    let obj = {
                      command: 'addOrEditReimbursement',
                      platform: 'web',
                      type: this.reimbursementInfo.submitType,
                      data: this.reimbursementInfo
                    }
                    return JSON.stringify(obj);
                  })()
                }
              }).then((rep) => {
                if (rep.data.statusCode === '10001') {
                  this.$message.success('提交成功，返回报销列表')
                  this.$router.push('/expenses-list')
                  resolve('done')
                } else {
                  this.$message.error(rep.data.msg)
                }
              }, (rep) => { });
            })
          }, () => {})
        }, () => {})
      } else {
        return new Promise((resolve, reject) => {
          axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            method: 'get',
            url: '/service',
            params: {
              data: (() => {
                let obj = {
                  command: 'addOrEditReimbursement',
                  platform: 'web',
                  type: this.reimbursementInfo.submitType,
                  data: this.reimbursementInfo
                }
                return JSON.stringify(obj);
              })()
            }
          }).then((rep) => {
            if (rep.data.statusCode === '10001') {
              this.$message.success('提交成功，返回报销列表')
              this.$router.push('/expenses-list')
              resolve('done')
            } else {
              this.$message.error(rep.data.msg)
            }
          }, (rep) => { });
        })
      }
    },
    back () {
      this.$router.push('/expenses-list')
    },
    getProjectByPerson () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getProjectByPerson',
                platform: 'web',
                type: 2
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.contracts = rep.data.data.resultArray
            resolve('done')
          } else {
            // this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    }
  },
  created () {
    this.getProjectByPerson()
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
    this.getCompanyList()
    this.numbers = new Array(100).fill(0).map((item, index) => {
      item = index
      return item
    })
    if (this.$route.params.id.split('&').length > 1) {
      this.expenseId = this.$route.params.id.split('&')[0]
      this.detailType = this.$route.params.id.split('&')[1]
      if (this.detailType === 'review') {
        this.paths =  [
          { name: '待处理项目', url: '/expenses-review', present: false },
          { name: '单据审核', url: '/expenses-review', present: false },
          { name: '报销详情', url: '/expenses-detail', present: true }
        ]
      } else {
        this.paths = [
          { name: '报销申请', url: '/expenses-list', present: false },
          { name: '报销列表', url: '/expenses-list', present: false },
          { name: '报销详情', url: '/expenses-detail', present: true }
        ]
      }
    } else {
      this.expenseId = this.$route.params.id
      this.paths = [
        { name: '报销申请', url: '/expenses-list', present: false },
        { name: '报销列表', url: '/expenses-list', present: false },
        { name: '报销详情', url: '/expenses-detail', present: true }
      ]
    }
    if (this.expenseId !== 'new') {
      this.getReimbursementInfo()
    }
  },
  components: {
    crumbs,
    card,
    stateSvg,
    expenseTable,
    rejectExpenseModal
  }
}
</script>

<style lang="sass">
  .expenses-detail {
    .main-title {
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      margin-bottom: 5px;
      margin-left: 30px;
    }
    padding-bottom: 40px;
    h5 {
      overflow: hidden;
    }
    .el-row {
      padding-left: 30px;
      padding-right: 30px;
      .el-col {
        padding-right: 20px;
      }
    }
    .title-wrapper {
      width: 100%;
      line-height: 36px;
      padding-top: 10px;
      padding-bottom: 10px;
      overflow: hidden;
    }
    .card2 {
      .message-box {
        width: 100%;
        padding-top: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
        margin-top: 10px;
        background-color: #f9fbfe;
        .el-row {
          line-height: 36px;
          margin-bottom: 10px;
        }
      }
      .electronical-bill {
        padding-top: 10px;
        .table-content {
          line-height: 36px;
          .each {
            margin-top: 5px;
            &:first-child {
              margin-top: 0;
            }
          }
        }
        .el-row {
          padding-top: 5px;
          padding-bottom: 5px;
          border-bottom: 1px solid #f9fbfe;
          &:nth-child(2), &:last-child {
            border: none;
          }
        }
      }
    }
    .btns {
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
  } 
  .com-list thead {
      background-color: #E6E6E6;
  }
  .table-bordered > tbody > tr {
    cursor: pointer;
  }
  .table-bordered > tbody > tr > td {
      border: none;
  }
</style>