<template>
  <div class="expenses-detail">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <template v-if="!editAble">
        <h5 class="main-title">可报销金额：</h5>
        <hr>
      </template>
      <div class="title-wrapper">
        <el-row>
          <el-col :span="6" class="d-f">
            <template v-if="editAble">
              <span style="width:110px" class="required">报销方式：</span>
              <el-select v-model="reimbursementInfo.submitType" placeholder="请选择报销方式" @change="changeType">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
            <p v-else>报销方式：{{ reimbursementInfo.submitType === 'nonContractR' ? '非合同报销' : '合同报销' }}</p>
          </el-col>
          <el-col :span="6" class="number d-f" v-if="contractNumberShow">
            <template v-if="editAble">
              <span style="width:90px" class="required">合同号：</span>
              <el-select 
                v-model="projectNumber" 
                placeholder="请选择合同" 
                v-if="editAble"
                @change="changeContract">
                <el-option
                  v-for="item in contracts"
                  :key="item.contractNo"
                  :label="item.contractNo"
                  :value="item.contractNo">
                </el-option>
              </el-select>
            </template>
            <p v-else>合同号：{{ projectNumber }}</p>
          </el-col>
          <el-col class="d-f" :span="6">
            <template v-if="editAble">
              <span style="width:100px">开票类型：</span>
              <el-select 
                v-model="reimbursementInfo.billingType" 
                placeholder="请选择开票类型" 
                :disabled="changeTypeDisabled"
                @change="changeBillingType"
                v-if="editAble">
                <el-option
                  v-for="item in classOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </template>
            <p v-else>开票类型：{{ reimbursementInfo.billingType }}</p>
          </el-col>
          <el-col class="d-f" :span="6">
            <span style="width:60px">申请人：</span>
            {{ applicantName }}
          </el-col>
        </el-row>
      </div>
    </card>
    <card class="card2">
      <expense-table
        type="差旅费报销"
        :reimbursementInfo="reimbursementInfo"
        :totalAmount="totalAmount"
        :editAble="editAble"></expense-table>
      <div class="message-box">
        <el-row>
          <el-col class="d-f" :span="12">
            <span style="width:90px" class="required">报销单ID：</span>
            {{ reimbursementInfo.id }}
          </el-col>
          <el-col class="d-f" :span="12">
            <span style="width:130px" class="required">预算所属公司：</span>
            <p v-if="!editAble">{{ reimbursementInfo.budgetCompanyName }}</p>
            <el-select 
              v-model="reimbursementInfo.budgetCompanyId" 
              placeholder="请选择预算所属公司" 
              @change="companyChange()"
              :disabled="selectedCompany"
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
            <span style="width:90px" class="required">所在公司：</span>
            {{ companyName }} 
          </el-col>
          <el-col class="d-f" :span="12">
            <span style="width:130px" class="required">预算所属部门：</span>
            <p v-if="!editAble">{{ reimbursementInfo.budgetDepartmentName }}</p>
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
            小计
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
              v-if="editAble" 
              :disabled="transportationDisabled"
              @change="changeNumbers('transportation')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <p v-else>{{ reimbursementInfo.transportationBillingNum }}张</p>
          </el-col>
          <el-col :span="4">
            <div v-if="editAble">{{ transportationTotalFee }}元</div>
            <p v-else>{{ transportationTotalFee }}元</p>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.travelRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" v-if="editAble">
                <template slot="append">元</template>
              </el-input>
              <p v-if="!editAble">{{ each.amount }}元</p>
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
                         :action="getUploadUrl(item.amount, 'travelR', item.annexId)"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        @click="selIndex(index, 'transportation')">点击上传</button>
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
                      class="text-info" v-if="item.state.uploadFail">&emsp;<i class="el-icon-close"></i>{{ item.uploadFailInfo }}</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                <span slot="tip"
                      class="text-info width-limit" v-if="item.state.uploaded">
                      &emsp;
                      <span class="fa fa-file-text-o"></span>
                      <a :href="item.path" target="_blank">下载</a>
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
              v-if="editAble" 
              :disabled="stayDisabled"
              @change="changeNumbers('stay')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <p v-else>{{ reimbursementInfo.stayBillingNum }}张</p>
          </el-col>
          <el-col :span="4">
            <div v-if="editAble">{{ stayTotalFee }}元</div>
            <p v-else>{{ stayTotalFee }}元</p>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.stayRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" v-if="editAble">
                <template slot="append">元</template>
              </el-input>
              <p v-if="!editAble">{{ each.amount }}元</p>
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
                         :action="getUploadUrl(item.amount, 'stayR', item.annexId)"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        @click="selIndex(index, 'stay')">点击上传</button>
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
                      class="text-info" v-if="item.state.uploadFail">&emsp;<i class="el-icon-close"></i>{{ item.uploadFailInfo }}</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">
                      &emsp;
                      <span class="fa fa-file-text-o"></span>
                      <a :href="item.path" target="_blank">下载</a>
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
              v-if="editAble" 
              :disabled="localDisabled"
              @change="changeNumbers('local')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <p v-else>{{ reimbursementInfo.localMealsBillingNum }}张</p>
          </el-col>
          <el-col :span="4">
            <div v-if="editAble">{{ localMealsTotalFee }}元</div>
            <p v-else>{{ localMealsTotalFee }}元</p>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.localRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" v-if="editAble">
                <template slot="append">元</template>
              </el-input>
              <p v-if="!editAble">{{ each.amount }}元</p>
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
                         :action="getUploadUrl(item.amount, 'localR', item.annexId)"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        @click="selIndex(index, 'local')">点击上传</button>
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
                      class="text-info" v-if="item.state.uploadFail">&emsp;<i class="el-icon-close"></i>{{ item.uploadFailInfo }}</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">
                      &emsp;
                      <span class="fa fa-file-text-o"></span>
                      <a :href="item.path" target="_blank">下载</a>
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
              v-if="editAble" 
              :disabled="fieldDisabled"
              @change="changeNumbers('field')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <p v-else>{{ reimbursementInfo.fieldMealsBillingNum }}张</p>
          </el-col>
          <el-col :span="4">
            <div v-if="editAble">{{ fieldMealsTotalFee }}元</div>
            <p v-else>{{ fieldMealsTotalFee }}元</p>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.fieldRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" v-if="editAble">
                <template slot="append">元</template>
              </el-input>
              <p v-if="!editAble">{{ each.amount }}元</p>
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
                         :action="getUploadUrl(item.amount, 'fieldR', item.annexId)"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        @click="selIndex(index, 'field')">点击上传</button>
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
                      class="text-info" v-if="item.state.uploadFail">&emsp;<i class="el-icon-close"></i>{{ item.uploadFailInfo }}</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                <span slot="tip"
                      class="text-info" v-if="item.state.uploaded">
                      &emsp;
                      <span class="fa fa-file-text-o"></span>
                      <a :href="item.path" target="_blank">下载</a>
                      </span>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
      <p class="btns ta-c" v-if="editAble">
        <button class="btn my-btn submit-btn" @click="addOrEditReimbursement" :disabled="saveAble">提交审批</button>
        <button class="btn my-btn cancel-btn" @click="cancelShow = true">取消</button>
      </p>
    </card>
    <modal v-if="cancelShow">
      <div slot="body">
        <p class="ta-c">
          <span>取消后编辑内容将丢弃，确认取消吗？</span>
        </p>
      </div>
      <div slot="footer">
        <button class="btn my-btn submit-btn" @click="cancelShow = false">
          取消
        </button>
        <button class="btn my-btn cancel-btn" @click="back">
          确定
        </button>     
      </div>
    </modal>
    <card class="card3" v-if="!editAble">
      <div>
        <div class="f-l">报销状态：</div>
        <state-svg
          :status="status"
          v-if="status"></state-svg>
      </div>
      <div class="state-description d-f">
        <div style="width:90px;">
          状态描述：
        </div>
        <div class="description">
          <p>{{ reimbursementInfo.statusDescription || '暂无' }}</p>
        </div>
      </div>
      <p class="btns" v-if="!editAble && detailType === 'review'">
        <button class="btn my-btn submit-btn" @click="agree">审批通过</button>
        <button class="btn my-btn cancel-btn" @click="showReject">驳回</button>
      </p>
    </card>
    <reject-expense-modal
      v-if="rejectShow"
      @rejected="rejected"
      @cancel="cancel"></reject-expense-modal>
    <modal v-if="warnModalShow">
      <div slot="body">
        您申请的金额已超出可申请报销金额，请将报销方式修改为无合同报销
      </div>
      <div slot="footer">
        <button class="btn my-btn cancel-btn" @click="warnModalShow=false">确定</button>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import modal from "@/main/component/modal.vue";
import stateSvg from './stateSvg.vue';
import expenseTable from './expenseTable.vue';
import rejectExpenseModal from './rejectExpenseModal.vue';

export default {
  name: 'expensesList',
  data() {
    return {
      cancelShow: false,
      paths: [],
      numbers: [],
      contracts: [],
      uploadIndex: '',
      uploadType: '',
      expenseId: '',
      projectNumber: '',
      changeTypeDisabled: false,
      transportationDisabled: false,
      stayDisabled: false,
      localDisabled: false,
      fieldDisabled: false,
      transportationChange: 0,
      stayChange: 0,
      localMealsChange: 0,
      fieldChange: 0,
      reimbursementInfo: {
        id: '',
        applicantName: '',
        companyName: '',
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
        budgetDepartmentType: '',
        transportationTotalFee: 0,
        transportationBillingNum: 0,
        travelRArray: [
          
        ],
        stayTotalFee: 0,
        stayBillingNum: 0,
        stayRArray: [
          
        ],
        localMealsTotalFee: 0,
        localMealsBillingNum: 0,
        localRArray: [
          
        ],
        fieldMealsTotalFee: 0,
        fieldMealsBillingNum: 0,
        fieldRArray: [
          
        ],
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
      companyArray: [],
      typeSelected: '',
      classSelected: '',
      companySelected: '',
      departmentSelected: '',
      editAble: this.$route.params.id === 'new' ? true : false,
      user: {},
      rejectShow: false,
      warnModalShow: false,
      detailType: 'detail',
      selectedCompany: false
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
        case '0030':
          arr[0] = 1
          break;
        case '0020':
          arr[1] = 1
          break;
        case '0050':
          arr[1] = 1
          break;
        case '0040':
          arr[2] = 1
          break;
        case '0070':
          arr[2] = 1
          break;
        case '0060':
          arr[3] = 1
          break;
        case '0090':
          arr[3] = 1
          break;
        case '0080':
          arr[4] = 1
          break;
        case '0101':
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
    saveAble () {
      if (this.reimbursementInfo.submitType && this.reimbursementInfo.budgetCompanyId && this.reimbursementInfo.budgetDepartmentId) {
        return false
      } else {
        return true
      }
    },
    transportationTotalFee () {
      let total = 0
      this.reimbursementInfo.travelRArray.forEach((item) => {
        total = Number(total) + Number(item.amount)
      })
      return total
    },
    stayTotalFee () {
      let total = 0
      this.reimbursementInfo.stayRArray.forEach((item) => {
        total = Number(total) + Number(item.amount)
      })
      return total
    },
    localMealsTotalFee () {
      let total = 0
      this.reimbursementInfo.localRArray.forEach((item) => {
        total = Number(total) + Number(item.amount)
      })
      return total
    },
    fieldMealsTotalFee () {
      let total = 0
      this.reimbursementInfo.fieldRArray.forEach((item) => {
        total = Number(total) + Number(item.amount)
      })
      return total
    },
    totalAmount () {
      let total = Number(this.transportationTotalFee) + Number(this.stayTotalFee) + Number(this.localMealsTotalFee) + Number(this.fieldMealsTotalFee)
      return total.toFixed(2)
    }
  },
  methods: {
    changeType () {
      this.selectedCompany = false
      this.reimbursementInfo.budgetCompanyId = ''
    },
    changeContract (val) {
      this.selectedCompany = true
      this.contracts.forEach((item) => {
        if (item.contractNo === val) {
          this.reimbursementInfo.contractAmount = item.contractAmount
          this.reimbursementInfo.budgetCompanyId = item.applicantCompanyId
        }
      })
    },
    changeBillingType() {
      this.changeTypeDisabled = true
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
    getFullCompanyList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getInfoDepartmentList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.companyArray = rep.data.data.departmentList
            this.companyArray.forEach((item) => {
              item.id = '00' + item.id
            })
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
            resolve(rep.data.data.departmentList)
          }
        }, (rep) => { });
      })
    },
    companyChange () {
      this.reimbursementInfo.budgetDepartmentId = ''
      this.reimbursementInfo.budgetDepartmentType = ''
      this.getCompanyDepartmentListByCom().then((departmentList) => {
        this.getFullCompanyList().then(() => {
          this.departmentList = departmentList.concat(this.companyArray)
        }, () => {})
      }, () => {})
    },
    changeNumbers (item) {
      console.log(123)
      switch(item) {
        case 'transportation':
          if (this.transportationChange < 1) {
            this.transportationChange++
            this.reimbursementInfo.travelRArray = []
            for (let i = 0; i < Number(this.reimbursementInfo.transportationBillingNum); i++) {
              this.reimbursementInfo.travelRArray.push(
                {
                  id: '',
                  amount: 0,
                  annexUrl: '',
                  annexId: '',
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
            this.transportationDisabled = true
          }
          break;
        case 'stay':
          if (this.stayChange < 1) {
            this.stayChange++
            this.reimbursementInfo.stayRArray = []
            for (let i = 0; i < Number(this.reimbursementInfo.stayBillingNum); i++) {
              this.reimbursementInfo.stayRArray.push(
                {
                  id: '',
                  amount: 0,
                  annexUrl: '',
                  annexId: '',
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
            this.stayDisabled = true
          }
          break;
        case 'local':
          if (this.localMealsChange < 1) {
            this.localMealsChange++
            this.reimbursementInfo.localRArray = []
            for (let i = 0; i < Number(this.reimbursementInfo.localMealsBillingNum); i++) {
              this.reimbursementInfo.localRArray.push(
                {
                  id: '',
                  amount: 0,
                  annexUrl: '',
                  annexId: '',
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
            this.localDisabled = true
          }
          break;
        case 'field':
          if (this.fieldChange < 1) {
            this.fieldChange++
            this.reimbursementInfo.fieldRArray = []
            for (let i = 0; i < Number(this.reimbursementInfo.fieldMealsBillingNum); i++) {
              this.reimbursementInfo.fieldRArray.push(
                {
                  id: '',
                  amount: 0,
                  annexUrl: '',
                  annexId: '',
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
            this.fieldDisabled = true
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
    getUploadUrl (amount, type, annexId) {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.reimbursementInfo.id,
        annexId: annexId,
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
            if (this.electric) {
              this.reimbursementInfo.travelRArray[this.uploadIndex].annexId = response.data.annexId
            }
          } else {
            this.reimbursementInfo.travelRArray[this.uploadIndex].state.uploadFail = true
            this.reimbursementInfo.travelRArray[this.uploadIndex].uploadFailInfo = response.msg
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
            if (this.electric) {
              this.reimbursementInfo.stayRArray[this.uploadIndex].annexId = response.data.annexId
            }
          } else {
            this.reimbursementInfo.stayRArray[this.uploadIndex].state.uploadFail = true
            this.reimbursementInfo.stayRArray[this.uploadIndex].uploadFailInfo = response.msg
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
            if (this.electric) {
              this.reimbursementInfo.localRArray[this.uploadIndex].annexId = response.data.annexId
            }
          } else {
            this.reimbursementInfo.localRArray[this.uploadIndex].state.uploadFail = true
            this.reimbursementInfo.localRArray[this.uploadIndex].uploadFailInfo = response.msg
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
            if (this.electric) {
              this.reimbursementInfo.fieldRArray[this.uploadIndex].annexId = response.data.annexId
            }
          } else {
            this.reimbursementInfo.fieldRArray[this.uploadIndex].state.uploadFail = true
            this.reimbursementInfo.fieldRArray[this.uploadIndex].uploadFailInfo = response.msg
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
         url: this.getUploadUrl(amount, type, ''),
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
      let reg = /^00.*/
      if (reg.test(this.reimbursementInfo.budgetDepartmentId)) {
        this.reimbursementInfo.budgetDepartmentType = 'department'
        this.reimbursementInfo.budgetDepartmentId = this.reimbursementInfo.budgetDepartmentId.slice(2)
      } else {
        this.reimbursementInfo.budgetDepartmentType = 'companyDepartment'
      }
      let flag = 0
      if (this.reimbursementInfo.submitType === 'contractR') {
        if (this.totalAmount > Number(this.reimbursementInfo.contractAmount) * 0.09) {
          this.warnModalShow = true
        } else {
          flag = 1
        }
      } else {
        flag = 1
      }
      if (flag) {
        if (this.paper) {
          this.uploadAmount(this.reimbursementInfo.travelRArray[0].amount, 'travelR').then(() => {
            var promiseArr = []
            if (this.reimbursementInfo.travelRArray.length > 1) {
              this.reimbursementInfo.travelRArray.forEach((item, index) => {
                if (index > 0) {
                  promiseArr.push(this.uploadAmount(item.amount, 'travelR'))
                }
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
              this.reimbursementInfo.applicantName = this.user.applicantName
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
      this.getCompanyList()
      this.numbers = new Array(100).fill(0).map((item, index) => {
        item = index
        return item
      })
      if (this.$route.params.id.split('&').length > 1) {
        this.expenseId = this.$route.params.id.split('&')[0]
        this.detailType = this.$route.params.id.split('&')[1]
        if (this.detailType === 'review') {
          console.log(2)
          if (this.user.department === '所长') {

            this.paths =  [
              { name: '待办事项', url: '/expenses-review', present: true },
              { name: '报销审批', url: '/expenses-review/10', present: false },
              { name: '报销详情', url: '/expenses-detail', present: true }
            ]
          } else {
            this.paths =  [
              { name: '待处理项目', url: '/expenses-review', present: false },
              { name: '单据审核', url: '/expenses-review', present: false },
              { name: '报销详情', url: '/expenses-detail', present: true }
            ]
          }
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
    }, () => { })

  },
  components: {
    crumbs,
    card,
    modal,
    stateSvg,
    expenseTable,
    rejectExpenseModal
  }
}
</script>

<style lang="sass">
  .expenses-detail {
    hr {
      margin-top: 0;
      margin-bottom: 0;
    }
    .width-limit {
      max-width: 20px;
      overflow: hidden;
    }
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
    .card3 {
      padding: 15px 20px;
      .state-description {
        .description {
          flex: 1;
          padding: 10px 20px;
          background-color: #f9fbfe;
        }
      }
    }
    .btns {
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
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
    .el-input.is-disabled .el-input__inner {
      background-color: #eef1f6;
    }
  }
</style>