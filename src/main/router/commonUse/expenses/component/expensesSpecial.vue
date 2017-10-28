<template>
  <div class="expenses-detail">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <h5 class="main-title" v-if="!editAble">可报销金额：</h5>
      <div class="title-wrapper">
        <el-row>
          <el-col class="d-f" :span="9">
            <span style="width:90px">报销类型：</span>
            <el-select v-model="reimbursementInfo.submitType" placeholder="请选择报销方式" :disabled="!editAble">
              <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="d-f" :span="9">
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
            <span style="width:90px">申请人：</span>
            {{ user.name }}
          </el-col>
        </el-row>
      </div>
    </card>
    <card class="card2">
      <expense-table
        type="特殊报销"
        :reimbursementInfo="reimbursementInfo"
        :editAble="editAble"></expense-table>
      <div class="message-box">
        <el-row>
          <el-col class="d-f" :span="12">
            <span style="width:90px">报销单ID：</span>
            {{ reimbursementInfo.id }}
          </el-col>
          <el-col class="d-f" :span="12">
            <span style="width:120px">预算所属公司：</span>
            <span v-if="!editAble">{{ reimbursementInfo.budgetCompanyName }}</span>
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
            <span style="width:90px">所在公司：</span>
            {{ user.companyName }}
          </el-col>
          <el-col class="d-f" :span="12">
            <span style="width:120px">预算所属部门：</span>
            <span v-if="!editAble">{{ reimbursementInfo.budgetDepartmentName }}</span>
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
        <el-row>
        </el-row>
        <template v-if="group || project">
          <el-row>
            <el-col style="display: flex;" :span="12">
              <span style="width:80px;">账户名称：</span>
              <el-input v-model="reimbursementInfo.accountName" placeholder="请填写账户名称" :disabled="!editAble"></el-input>
            </el-col>
            <el-col style="display: flex;" :span="12">
              <span style="width:80px;">开户银行：</span>
              <el-input v-model="reimbursementInfo.accountBank" placeholder="请填写开户银行" :disabled="!editAble"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="display: flex;" :span="12">
              <span style="width:80px;">银行账户：</span>
              <el-input v-model="reimbursementInfo.accountBankNumber" placeholder="请填写银行账户" :disabled="!editAble"></el-input>
            </el-col>
            <el-col class="d-f" :span="12" v-if="project">
              <span style="width:80px;">合同编号：</span>
              <el-select v-model="reimbursementInfo.projectNumberArray" filterable multiple placeholder="请选择合同编号" :disabled="!editAble">
                <el-option
                  v-for="item in contracts"
                  :key="item.id"
                  :label="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </template>
      </div>
      <div class="electronical-bill" v-if="paper || electric">
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
        <el-row class="table-content" v-if="paper">
          <el-col :span="4">
            纸质发票报销
          </el-col>
          <el-col :span="4">
            <el-select 
              v-model="reimbursementInfo.paperInvoiceNum" 
              placeholder="请选择张数" 
              :disabled="!editAble" 
              @change="changeNumbers('paper')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input v-model="reimbursementInfo.paperInvoiceAmount" placeholder="请填写金额" :disabled="!editAble">
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.paperRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="table-content"  v-if="electric">
          <el-col :span="4">
            电子发票报销
          </el-col>
          <el-col :span="4">
            <el-select 
              v-model="reimbursementInfo.electricInvoiceNum" 
              placeholder="请选择张数" 
              :disabled="!editAble" 
              @change="changeNumbers('electric')">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input v-model="reimbursementInfo.electricInvoiceAmount" placeholder="请填写金额" :disabled="!editAble">
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <div v-for="(each, index) in reimbursementInfo.electricRArray" :key="index" class="each">
              <el-input v-model="each.amount" placeholder="请填写单笔金额" :disabled="!editAble">
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div v-for="(item, index) in reimbursementInfo.electricRArray" :key="index" class="each">
              <el-upload :show-file-list="false"
                         :action="getUploadUrl(item.amount, 'electricR')"
                         :on-progress="UploadProgress"
                         :on-success="UploadSuccess">
                <button class="btn my-btn submit-btn"
                        type="button"
                        slot="trigger"
                        :disabled="!item.amount" @click="selIndex(index)">点击上传</button>
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
        <button class="btn my-btn submit-btn" @click="addOrEditReimbursement">提交审批</button>
        <button class="btn my-btn cancel-btn" @click="back">取消</button>
      </p>
    </card>
    <card class="card3" v-if="!editAble ">
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
        :disabled="!editAble">
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
      user: {},
      paths: [
        // { name: '报销申请', url: '/expenses-list', present: false },
        // { name: '报销列表', url: '/expenses-list', present: false },
        // { name: '报销详情', url: '/expenses-detail', present: true }
      ],
      rejectShow: false,
      reimbursementInfo: {
        submitType: '',
        billingType: '',
        expenditureProject: '',
        totalAmount: '',
        summary: '',
        budgetCompanyId: '',
        budgetDepartmentId: '',
        accountName: '',
        accountBank: '',
        accountBankNumber: '',
        paperInvoiceNum: 1,
        paperInvoiceAmount: '',
        projectNumberArray: [],
        paperRArray: [
          {
            id: '',
            amount: ''
          }
        ],
        electricInvoiceNum: 1,
        electricInvoiceAmount: '',
        electricRArray: [
          {
            id: '',
            amount: '',
            annexUrl: '',
            uploadURL: '',
            path: '',
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
      detailType: 'detail'
    };
  },
  computed: {
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
    }
  },
  methods: {
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
                idArray: [{id: this.expenseId}],
                reason: reason
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
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
            // this.companyList = rep.data.data.companyList
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    changeNumbers (type) {
      if (type === 'paper') {
        this.reimbursementInfo.paperRArray = []
        for (let i = 0; i < Number(this.reimbursementInfo.paperInvoiceNum); i++) {
          this.reimbursementInfo.paperRArray.push(
            {
              id: '',
              amount: ''
            }
          )
        }
      } else if (type === 'electric') {
        this.reimbursementInfo.electricRArray = []
        for (let i = 0; i < Number(this.reimbursementInfo.electricInvoiceNum); i++) {
          this.reimbursementInfo.electricRArray.push(
            {
              id: '',
              amount: '',
              annexUrl: '',
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
      }
    },
    // checkDetail (item) {
      
    // },
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
      } else {
        this.reimbursementInfo.electricRArray[this.uploadIndex].state.uploadFail = true
      }
    },
    // addOrEditReimbursement () {
    //   console.log(this.reimbursementInfo)
    //   // return new Promise((resolve, reject) => {
    //   //   axios({
    //   //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //   //     method: 'get',
    //   //     url: '/service',
    //   //     params: {
    //   //       data: (() => {
    //   //         let obj = {
    //   //           command: 'addOrEditReimbursement',
    //   //           platform: 'web',
    //   //           data: this.reimbursementInfo
    //   //         }
    //   //         return JSON.stringify(obj);
    //   //       })()
    //   //     }
    //   //   }).then((rep) => {
    //   //     if (rep.data.statusCode === '10001') {
    //   //       this.$message.success('提交成功，返回报销列表')
    //   //       this.$router.push('/expenses-list')
    //   //       resolve('done')
    //   //     } else {
    //   //       this.$message.success(rep.data.msg)
    //   //     }
    //   //   }, (rep) => { });
    //   // })
    // },
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
      if (this.paper) {
        this.uploadAmount(this.reimbursementInfo.paperRArray[0].amount, 'paperR').then(() => {
          var promiseArr = []
          if (this.reimbursementInfo.paperRArray.length > 1) {
            this.reimbursementInfo.paperRArray.forEach((item) => {
              promiseArr.push(this.uploadAmount(item.amount, 'paperR'))
            })
          }
          Promise.all(promiseArr).then(() => {
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
          { name: '待处理业务', url: '/expenses-review', present: false },
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

<style lang="sass" scoped>
  .expenses-detail {
    padding-bottom: 30px;
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