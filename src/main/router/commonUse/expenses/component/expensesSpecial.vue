<template>
  <div class="expenses-detail">
    <!--面包屑导航-->
    <!-- <crumbs :paths="paths"></crumbs> -->
    <card class="detail-page">
      <card>
        <template v-if="!editAble">
          <h5 class="main-title">可报销金额：</h5>
          <hr>
        </template>
        <div class="title-wrapper">
          <el-row>
            <el-col class="d-f" :span="6">
              <template v-if="editAble">
                <span style="width:90px" class="required">报销类型：</span>
                <el-select 
                  v-model="reimbursementInfo.submitType" 
                  placeholder="请选择报销方式" 
                  v-if="editAble" 
                  @change="changeType">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
              <p v-else>报销方式：{{ getsubmitType(reimbursementInfo.submitType) }}</p>
            </el-col>
            <el-col class="d-f" :span="6">
              <template v-if="editAble">
                <span style="width:90px">开票类型：</span>
                <el-select 
                  v-model="reimbursementInfo.billingType" 
                  placeholder="请选择开票类型" 
                  v-if="editAble" 
                  :disabled="changeTypeDisabled"
                  @change="changeBillingType">
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
              <span style="width:70px">申请人：</span>
              {{ applicantName }}
            </el-col>
            <el-col class="d-f" :span="6" v-if="editAble === false">
              <span style="width:70px">申请时间：</span>
              {{ reimbursementInfo.createAt.substr(0,10) }}
            </el-col>
          </el-row>
        </div>
      </card>
      <card class="card2">
        <expense-table
          type="特殊报销"
          :totalAmount="totalAmount"
          :reimbursementInfo="reimbursementInfo"
          :editAble="editAble"></expense-table>
        <div class="message-box">
          <template v-if="group || project">
            <el-row v-if="project">
              <el-col class="d-f" :span="12" v-if="editAble">
                <span style="width:100px;" class="required">合同编号：</span>
                <el-select 
                  multiple 
                  v-model="reimbursementInfo.projectNumberArray" 
                  placeholder="请选择合同编号" 
                  @change="changeContract"
                  v-if="editAble">
                  <el-option
                    v-for="item in contracts"
                    :key="item.contractNo"
                    :label="item.contractNo"
                    :value="item.contractNo">
                  </el-option>
                </el-select>
              </el-col>
              <p v-else>合同编号：{{ reimbursementInfo.projectNumberArray.join('、') }}</p>
            </el-row>
            <el-row>
              <el-col style="display: flex;" :span="12">
                <template v-if="editAble">
                  <span style="width:100px;" class="required">账户名称：</span>
                  <el-input v-model="reimbursementInfo.accountName" placeholder="请填写账户名称"></el-input>
                </template>
                <p v-else>账户名称：{{ reimbursementInfo.accountName }}</p>
              </el-col>
              <el-col style="display: flex;" :span="12">
                <template v-if="editAble">
                  <span style="width:100px;" class="required">开户银行：</span>
                  <el-input v-model="reimbursementInfo.accountBank" placeholder="请填写开户银行"></el-input>
                </template>
                <p v-else>开户银行：{{ reimbursementInfo.accountBank }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="display: flex;" :span="12">
                <template v-if="editAble">
                  <span style="width:100px;" class="required">银行账户：</span>
                  <el-input v-model="reimbursementInfo.accountBankNumber" placeholder="请填写银行账户"></el-input>
                </template>
                <p v-else>银行账户：{{ reimbursementInfo.accountBankNumber }}</p>
              </el-col>
            </el-row>
          </template>
          <el-row>
            <el-col class="d-f" :span="12">
              <template v-if="editAble">
                <span style="width:110px" class="required">报销单ID：</span>
                {{ reimbursementInfo.id }}
              </template>
              <p v-else>报销单ID：{{ reimbursementInfo.id }}</p>
            </el-col>
            <el-col class="d-f" :span="12">
              <template v-if="editAble">
                <span style="width:140px" class="required">预算所属公司：</span>
                <el-select 
                  v-model="reimbursementInfo.budgetCompanyId" 
                  placeholder="请选择预算所属公司" 
                  @change="companyChange()"
                  :disabled="selectedCompany">
                  <el-option
                    v-for="item in companyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
              <p v-else>预算所属公司：{{ reimbursementInfo.budgetCompanyName }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="d-f" :span="12">
              <template v-if="editAble">
                <span style="width:110px" class="required">所在公司：</span>
                {{ companyName }}
              </template>
              <p v-else>所在公司：{{ reimbursementInfo.companyName }}</p>
            </el-col>
            <el-col class="d-f" :span="12">
              <template v-if="editAble">
                <span style="width:140px" class="required">预算所属部门：</span>
                <el-select 
                  v-model="reimbursementInfo.budgetDepartmentId"
                  placeholder="请选择预算所属部门">
                  <el-option
                    v-for="item in departmentList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
              <p v-else>预算所属部门：{{ reimbursementInfo.budgetDepartmentName }}</p>
            </el-col>
          </el-row>
        </div>
        <div class="electronical-bill" v-if="paper || electric">
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
          <el-row class="table-content" v-if="paper">
            <el-col :span="4">
              纸质发票报销
            </el-col>
            <el-col :span="4">
              <el-select 
                v-model="reimbursementInfo.paperInvoiceNum" 
                placeholder="请选择张数" 
                v-if="editAble" 
                :disabled="paperDisabled"
                @change="changeNumbersP">
                <el-option
                  v-for="item in numbers"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <p v-else>{{ reimbursementInfo.paperInvoiceNum }}张</p>
            </el-col>
            <el-col :span="4">
              <div v-if="editAble">{{ paperInvoiceAmount }}元</div>
              <p v-else>{{ paperInvoiceAmount }}元</p>
            </el-col>
            <el-col :span="4">
              <div v-for="(each, index) in reimbursementInfo.paperRArray" :key="index" class="each">
                <el-input v-model="each.amount" placeholder="请填写单笔金额" v-if="editAble">
                  <template slot="append">元</template>
                </el-input>
                <p v-else>{{ each.amount }}元</p>
              </div>
            </el-col>
          </el-row>
          <el-row class="table-content" v-if="electric">
            <el-col :span="4">
              电子发票报销
            </el-col>
            <el-col :span="4">
              <el-select 
                v-model="reimbursementInfo.electricInvoiceNum" 
                placeholder="请选择张数" 
                v-if="editAble" 
                :disabled="electricDisabled"
                @change="changeNumbersE">
                <el-option
                  v-for="item in numbers"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <p v-else>{{ reimbursementInfo.electricInvoiceNum }}张</p>
            </el-col>
            <el-col :span="4">
              <div v-if="editAble">{{ electricInvoiceAmount }}元</div>
              <p v-else>{{ electricInvoiceAmount }}元</p>
            </el-col>
            <el-col :span="4">
              <div v-for="(each, index) in reimbursementInfo.electricRArray" :key="index" class="each">
                <el-input v-model="each.amount" placeholder="请填写单笔金额" type="number" v-if="editAble">
                  <template slot="append">元</template>
                </el-input>
                <p v-if="!editAble">{{ each.amount }}元</p>
              </div>
            </el-col>
            <el-col :span="7" v-if="electric && editAble">
              <div v-for="(item, index) in reimbursementInfo.electricRArray" :key="index" class="each">
                <el-upload :show-file-list="false"
                           :action="getUploadUrl(item.amount, 'electricR', item.annexId)"
                           :on-progress="UploadProgress"
                           :on-success="UploadSuccess">
                  <button class="btn my-btn submit-btn"
                          type="button"
                          slot="trigger"
                          @click="selIndex(index)">点击上传</button>
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
          <button class="btn my-btn cancel-btn" @click="cancelCon()">取消</button>
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
          <button class="btn my-btn cancel-btn" @click="back()">
            确定
          </button>     
        </div>
      </modal>
      <card class="card3" v-if="!editAble ">
        <div class="f-l">报销状态：</div>
        <state-svg 
          :status="status"
          v-if="status"></state-svg>
        <div class="state-description d-f">
          <div style="width:90px;">
            状态描述：
          </div>
          <div class="description">
            <p v-model="reimbursementInfo.statusDescription" v-if="reimbursementInfo.statusDescription"></p>
            <p v-else>暂无</p>
          </div>
        </div>
        <p class="btns" v-if="!editAble && detailType === 'review'">
          <button class="btn my-btn submit-btn" @click="agree">审批通过</button>
          <button class="btn my-btn cancel-btn" @click="showReject">驳回</button>
        </p>
      </card>
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
import modal from '@/main/component/modal.vue';
import card from '@/main/component/card.vue';
import stateSvg from './stateSvg.vue';
import expenseTable from './expenseTable.vue';
import rejectExpenseModal from './rejectExpenseModal.vue';

export default {
  name: 'expensesList',
  data() {
    return {
      cancelShow: false,
      user: {},
      paths: [],
      rejectShow: false,
      paperDisabled: false,
      electricDisabled: false,
      changeTypeDisabled: false,
      reimbursementInfo: {
        id: '',
        applicantName: '',
        companyName: '',
        submitType: '',
        billingType: '',
        expenditureProject: '',
        totalAmount: '',
        summary: '',
        budgetCompanyId: '',
        budgetDepartmentId: '',
        budgetDepartmentType: '',
        accountName: '',
        accountBank: '',
        accountBankNumber: '',
        paperInvoiceNum: 0,
        paperInvoiceAmount: '',
        projectNumberArray: [],
        paperRArray: [
          
        ],
        electricInvoiceNum: 0,
        electricInvoiceAmount: '',
        electricRArray: [
          
        ],
      },
      recordList: [{
        id: 1,
        name: '张三',
        abstract: '天津中审联会计师事务所项目报销申请',
        account: 500000.00
      }],
      bills: {
        type: '',
        numbers: 1,
        amounts: '',
        list: [
          {
            amount: '',
            address: ''
          }
        ]
      },
      textarea: '',
      typeOptions: [
        {
          name: '个人报销',
          id: 'personalR'
        },
        {
          name: '对公报销',
          id: 'publicR'
        },
        {
          name: '项目报销',
          id: 'projectR'
        }
      ],
      classOptions: ['纸质发票报销', '电子发票报销'],
      companyList: [],
      departmentList: [],
      companySelected: '',
      departmentSelected: '',
      editAble: this.$route.params.id === 'new' ? true : false,
      numbers: [],
      uploadIndex: '',
      expenseId: '',
      contracts: [],
      contractsArray: [],
      detailType: 'detail',
      companyArray: [],
      selectedCompany: false,
      comunicating: false
    };
  },
  computed: {
    saveAble () {
      if (this.reimbursementInfo.submitType && this.reimbursementInfo.budgetCompanyId && this.reimbursementInfo.budgetDepartmentId && !this.comunicating) {
        return false
      } else {
        return true
      }
    },
    personal () {
      if (this.reimbursementInfo.submitType === 'personalR') {
        return true
      } else {
        return false
      }
    },
    group () {
      if (this.reimbursementInfo.submitType === 'publicR') {
        return true
      } else {
        return false
      }
    },
    project () {
      if (this.reimbursementInfo.submitType === 'projectR') {
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
    electric () {
      if (this.reimbursementInfo.billingType === '电子发票报销') {
        return true
      } else {
        return false
      }
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
        case '0010' || '0030':
          arr[0] = 1
          break;
        case '0020' || '0050':
          arr[1] = 1
          break;
        case '0040' || '0070':
          arr[2] = 1
          break;
        case '0060' || '0090':
          arr[3] = 1
          break;
        case '0080' || '0101':
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
    paperInvoiceAmount () {
      let total = 0
      this.reimbursementInfo.paperRArray.forEach((item) => {
        total = total + Number(item.amount)
      })
      return total.toFixed(2)
    },
    electricInvoiceAmount () {
      let total = 0
      this.reimbursementInfo.electricRArray.forEach((item) => {
        total = total + Number(item.amount)
      })
      return total.toFixed(2)
    },
    totalAmount () {
      let total = 0
      if (this.reimbursementInfo.billingType === '纸质发票报销') {
        total = Number(this.paperInvoiceAmount)
      } else {
        total = Number(this.electricInvoiceAmount)
      }
      return total.toFixed(2)
    }
  },
  methods: {
    changeType () {
      this.selectedCompany = false
      this.reimbursementInfo.budgetCompanyId = ''
      this.reimbursementInfo.projectNumberArray = []
    },
    changeBillingType () {
      this.changeTypeDisabled = true
    },
    changeContract () {
      this.selectedCompany = true
      let budgetCompany = this.user.companyName
      this.contracts.forEach((item, index) => {
        if (item.applicantCompany === budgetCompany) {
          this.reimbursementInfo.budgetCompanyId = item.applicantCompanyId
        }
      })
    },
    cancelCon () {
      this.cancelShow = true
    },
    getsubmitType (id) {
      if (id === 'personalR') {
        return '个人报销'
      } else if (id === 'publicR') {
        return '对公报销'
      } else if (id === 'projectR') {
        return '项目报销'
      }
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
    },
    agree () {
      this.handleReimbursement('通过', '')
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
            this.$message.success('审批成功')
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
            console.log(rep.data.data)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    changeNumbersE() {
      this.reimbursementInfo.electricRArray = []
      for (let i = 0; i < Number(this.reimbursementInfo.electricInvoiceNum); i++) {
        this.reimbursementInfo.electricRArray.push(
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
            name: '',
            path: ''
          }
        )
      }
      this.electricDisabled = true
    },
    changeNumbersP() {
      this.reimbursementInfo.paperRArray = []
      for (let i = 0; i < Number(this.reimbursementInfo.paperInvoiceNum); i++) {
        this.reimbursementInfo.paperRArray.push(
          {
            id: '',
            amount: 0
          }
        )
      }
      this.paperDisabled = true
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
            resolve(rep.data.data.departmentList);
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
    selIndex (i) {
      this.uploadIndex = i
    },
    UploadProgress (event, file, fileList) {
        this.reimbursementInfo.electricRArray[this.uploadIndex].state = {
          notUpload: false,
          uploading: true,
          uploaded: false
        }
        this.reimbursementInfo.electricRArray[this.uploadIndex].percentage = parseInt(event.percent)
    },
    UploadSuccess (response, file, fileList) {
      this.reimbursementInfo.electricRArray[this.uploadIndex].state = {
        notUpload: false,
        uploading: false,
        uploaded: false,
        uploadFail: false
      }
      if (response.statusCode === '10001') {
        this.reimbursementInfo.electricRArray[this.uploadIndex].state.uploaded = true
        this.reimbursementInfo.electricRArray[this.uploadIndex].path = response.data.path
        this.reimbursementInfo.electricRArray[this.uploadIndex].name = response.data.name
        this.reimbursementInfo.id = response.data.id
        if (this.electric) {
          this.reimbursementInfo.electricRArray[this.uploadIndex].annexId = response.data.annexId
        }
      } else {
        this.reimbursementInfo.electricRArray[this.uploadIndex].state.uploadFail = true
        this.reimbursementInfo.electricRArray[this.uploadIndex].uploadFailInfo = response.msg
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
      this.comunicating = true
      let reg = /^00.*/
      if (reg.test(this.reimbursementInfo.budgetDepartmentId)) {
        this.reimbursementInfo.budgetDepartmentType = 'department'
        this.reimbursementInfo.budgetDepartmentId = this.reimbursementInfo.budgetDepartmentId.slice(2)
      } else {
        this.reimbursementInfo.budgetDepartmentType = 'companyDepartment'
      }
      this.reimbursementInfo.totalAmount = this.totalAmount
      if (this.paper) {
        this.uploadAmount(this.reimbursementInfo.paperRArray[0].amount, 'paperR').then(() => {
          var promiseArr = []
          if (this.reimbursementInfo.paperRArray.length > 1) {
            this.reimbursementInfo.paperRArray.forEach((item, index) => {
              if (index > 0) {
                promiseArr.push(this.uploadAmount(item.amount, 'paperR'))
              }
            })
          }
          Promise.all(promiseArr).then(() => {
            this.reimbursementInfo.companyName = this.user.companyName
            this.reimbursementInfo.applicantName = this.user.applicantName
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
                    return JSON.stringify(obj)
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
    }
  },
  created () {
    console.log(this.reimbursementInfo)
    this.getProjectByPerson()
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
    this.getCompanyList()
    this.numbers = new Array(11).fill(0).map((item, index) => {
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
    modal,
    rejectExpenseModal
  }
}
</script>

<style lang="sass" scoped>
#app .page-main > .main-contain{
  margin-left: 200px !important;
}
.detail-page {
  margin-top: 0 !important;
}
  .expenses-detail {
    hr {
      margin-top: 0;
      margin-bottom: 0;
    }
    .el-row {
      padding-left: 30px;
      padding-right: 30px;
      .el-col {
        padding-right: 20px;
      }
    }
    h5 {
      overflow: hidden;
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
        .title {
          margin-bottom: 10px;
          font-size: 15px;
          font-weight: 800;
        }
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
    .state-description {
      .description {
        flex: 1;
        padding: 10px 20px;
        background-color: #f9fbfe;
      }
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
  .el-input.is-disabled .el-input__inner {
    background-color: #eef1f6;
  }
</style>