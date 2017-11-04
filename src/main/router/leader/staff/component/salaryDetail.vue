<template>
  <div class="salary-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit" :disabled="!canEdit.canEditSalary">编辑</button>
          <button class="btn my-btn submit-btn" @click="add" :disabled="!canEdit.canEditSalary">新增</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template>
      </div>
      <h5 class="main-title">薪资信息</h5>
      <div class="basic-form">
        <el-form :label-position="labelPosition" label-width="90px" :model="baseSalaryJson" :rules="basicRules" ref="baseSalaryJson">
          <el-row>
            <el-col class="title" :span="12">
              <el-form-item label="基本工资：" label-width="80px" prop="baseSalary" v-if="editAble">
                <el-input v-model="baseSalaryJson.baseSalary">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>基本工资：{{baseSalaryJson.baseSalary}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位工资：" label-width="80px" prop="postSalary" v-if="editAble">
                <el-input v-model="baseSalaryJson.postSalary">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>岗位工资：{{baseSalaryJson.postSalary}}元/月</p>
            </el-col>
            <el-col :span="12">
              <el-form-item label="薪级工资：" label-width="80px" prop="wagePay" v-if="editAble">
                <el-input v-model="baseSalaryJson.wagePay">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>薪级工资：{{baseSalaryJson.wagePay}}元/月</p>
            </el-col>
          </el-row>
        </el-form> 
        <hr>
        <el-form :label-position="labelPosition" label-width="90px" :model="subsidyJson" :rules="basicRules" ref="subsidyJson">
          <el-row>
            <el-col class="title" :span="12">
              <el-form-item label-width="80px" label="津贴补贴：" prop="subsidy" v-if="editAble">
                <el-input v-model="subsidyJson.subsidy">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>津贴补贴：{{subsidyJson.subsidy}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="未纳补贴：" prop="nonSubsidy">
                <el-input v-model="subsidyJson.nonSubsidy">
                  <template slot="append">元/月</template>
                </el-input>

              </el-form-item>
              <p v-else>未纳补贴：{{subsidyJson.nonSubsidy}}元/月</p>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="卫生津贴：" prop="healthSubsidy">
                <el-input v-model="subsidyJson.healthSubsidy">
                  <template slot="append">元/月</template>
                </el-input>

              </el-form-item>
              <p v-else>卫生津贴：{{subsidyJson.healthSubsidy}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="值班费：" prop="dutyPaid">
                <el-input v-model="subsidyJson.dutyPaid">
                  <template slot="append">元/月</template>
                </el-input>

              </el-form-item>
              <p v-else>值班费：{{subsidyJson.dutyPaid}}元/月</p>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="采暖补贴：" prop="heatingSubsidy">
                <el-input v-model="subsidyJson.heatingSubsidy">
                  <template slot="append">元/月</template>
                </el-input>

              </el-form-item>
              <p v-else>采暖补贴：{{subsidyJson.heatingSubsidy}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="住房物业补贴：" label-width="110px" prop="housingSubsidy">
                <el-input v-model="subsidyJson.housingSubsidy">
                  <template slot="append">元/月</template>
                </el-input>

              </el-form-item>
              <p v-else>住房物业补贴：{{subsidyJson.housingSubsidy}}元/月</p>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="通讯补贴：" prop="communicationSubsidy">
                <el-input v-model="subsidyJson.communicationSubsidy">
                  <template slot="append">元/月</template>
                </el-input>

              </el-form-item>
              <p v-else>通讯补贴：{{subsidyJson.communicationSubsidy}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="上下班交通补贴：" label-width="130px" prop="trafficSubsidy">
                <el-input v-model="subsidyJson.trafficSubsidy">
                  <template slot="append">元/月</template>
                </el-input>

              </el-form-item>
              <p v-else>上下班交通补贴：{{subsidyJson.trafficSubsidy}}元/月</p>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="加班费：" prop="overtimePay">
                <el-input v-model="subsidyJson.overtimePay">
                  <template slot="append">元/月</template>
                </el-input>

              </el-form-item>
              <p v-else>加班费：{{subsidyJson.overtimePay}}元/月</p>
            </el-col>
          </el-row>
        </el-form>  
        <hr>
        <el-form :label-position="labelPosition" label-width="100px" :model="performanceSalaryJson" :rules="basicRules" ref="performanceSalaryJson">
          <el-row>
            <el-col class="title" :span="12">
              <el-form-item v-if="editAble" label-width="100px" label="基础绩效工资：" prop="performanceSalary">
                <el-input v-model="performanceSalaryJson.performanceSalary">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>基础绩效工资：{{performanceSalaryJson.performanceSalary}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="16基础绩效：" label-width="100px" prop="basicPerformance">
                <el-input v-model="performanceSalaryJson.basicPerformance">
                  <template slot="append">元/月</template>
                </el-input>     
              </el-form-item>
              <p v-else>16基础绩效：{{performanceSalaryJson.basicPerformance}}元/月</p>
            </el-col>
          </el-row>
        </el-form>
        <hr>
        <el-form :label-position="labelPosition" label-width="100px" :model="subsidyJson" :rules="basicRules" ref="subsidyJson">
          <el-row>
            <el-col class="title" :span="12">
              <el-form-item v-if="editAble" label-width="60px" label="应扣：" prop="deductible">
                <el-input v-model="deductibleJson.deductible">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>应扣：{{deductibleJson.deductible}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="扣会费：" label-width="80px" prop="membershipFees">
                <el-input v-model="deductibleJson.membershipFees">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>扣会费：{{deductibleJson.membershipFees}}元/月</p>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="扣养老保险：" prop="pension">
                <el-input v-model="deductibleJson.pension">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>扣养老保险：{{deductibleJson.pension}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="扣个人年金：" prop="personalAnnuity">
                <el-input v-model="deductibleJson.personalAnnuity">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>扣个人年金：{{deductibleJson.personalAnnuity}}元/月</p>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="扣医疗保险：" prop="medicalInsurance">
                <el-input v-model="deductibleJson.medicalInsurance">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>扣医疗保险：{{deductibleJson.medicalInsurance}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="扣失业保险：" prop="unemploymentInsurance">
                <el-input v-model="deductibleJson.unemploymentInsurance">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>扣失业保险：{{deductibleJson.unemploymentInsurance}}元/月</p>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="扣公积金：" label-width="90px" prop="housingFund">
                <el-input v-model="deductibleJson.housingFund">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>扣公积金：{{deductibleJson.housingFund}}元/月</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="editAble" label="个所税：" label-width="70px" prop="tax">
                <el-input v-model="deductibleJson.tax">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
              <p v-else>个所税：{{deductibleJson.tax}}元/月</p>
            </el-col>
          </el-row>
        </el-form>     
      </div>
      <!-- <table class="table table-inner table-hover table-input">
        <thead>
          <tr>
            <td class="text-center">日期</td>
            <td class="text-center">发放金额</td>
            <td class="text-center">报销金额</td>
            <td class="text-center">备注说明</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in recordArray"
              :key="index">
            <td class="text-center">
              <el-input type="text"
                     v-model="item.date"
                     :disabled="!editAble"></el-input>
            </td>
            <td class="text-center">
              <el-input type="text"
                     v-model="item.releaseAmount"
                     :disabled="!editAble"></el-input>
            </td>
            <td class="text-center">
              <el-input type="text"
                     v-model="item.reimburseAmount"
                     :disabled="!editAble"></el-input>
            </td>
            <td class="text-center">
              <el-input type="text"
                     v-model="item.remark"
                     :disabled="!editAble"></el-input>
            </td>
          </tr>
        </tbody>
      </table> 
      <p class="empty-list-p" v-if="recordArray.length === 0">暂无数据</p> -->
    </div>    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'salaryDetail',
  data() {
    return {
      editAble: false,
      salaryId: '',
      baseSalaryJson: {
        baseSalary: '',
        postSalary: '',
        wagePay: ''
      },
      deductibleJson: {
        deductible: '',
        housingFund: '',
        medicalInsurance: '',
        membershipFees: '',
        pension: '',
        personalAnnuity: '',
        tax:''
      },
      performanceSalaryJson: {
        basicPerformance: '',
        performanceSalary: ''
      },
      subsidyJson: {
        communicationSubsidy: '',
        dutyPaid: '',
        healthSubsidy: '',
        heatingSubsidy: '',
        housingSubsidy: '',
        nonSubsidy: '',
        overtimePay: '',
        subsidy: '',
        trafficSubsidy: ''
      },
      basicRules: {

      },
      labelPosition: 'left',
      recordArray: [],
      recordArrayEmpty: [
        {
          id: '',
          releaseAmount: '',
          reimburseAmount: '',
          date: '',
          remark: '',
          removeStatus: '',
          createAt: '',
          updateAt: ''
        }
      ]
    };
  },
  watch: {
    editAble: function (val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.canEdit.canEditDetail = false
          this.canEdit.canEditAuthority = false
          this.canEdit.canEditSalary = true
          this.canEdit.canEditBonus = false
          this.canEdit.canEditEducation = false
        } else {
          this.canEdit.canEditDetail = true
          this.canEdit.canEditAuthority = true
          this.canEdit.canEditSalary = true
          this.canEdit.canEditBonus = true
          this.canEdit.canEditEducation = true
        }
      }
    }
  },
  methods: {
    getUserSalaryInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUserSalaryInfo',
                platform: 'web',
                staffId: this.staffId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.salaryId = rep.data.data.id
            this.baseSalaryJson = rep.data.data.baseSalaryJson
            this.deductibleJson = rep.data.data.deductibleJson
            this.performanceSalaryJson = rep.data.data.performanceSalaryJson
            this.subsidyJson = rep.data.data.subsidyJson
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getSalaryReleaseRecordInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getSalaryReleaseRecordInfo',
                platform: 'web',
                staffId: this.staffId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.recordArray = rep.data.data.recordArray
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    edit () {
      this.editAble = true
    },
    add () {
      this.editAble = true
      this.recordArray.push(this.recordArrayEmpty)
    },
    cancel () {
      this.editAble = false
      this.getUserSalaryInfo()
      this.getSalaryReleaseRecordInfo()
    },
    editSalaryReleaseRecord () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editSalaryReleaseRecord',
                platform: 'web',
                recordArray: this.recordArray
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('保存成功')
          } else {
            this.$message.error(rep.data.msg)
          }
          this.editAble = false
          resolve('done');
        }, (rep) => { });
      })
    },
    editSalary () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editSalary',
                platform: 'web',
                salary: [{
                  id: this.salaryId, 
                  userId: this.staffId, 
                  postSalary: this.baseSalaryJson.postSalary,
                  wagePay: this.baseSalaryJson.wagePay,
                  communicationSubsidy: this.subsidyJson.communicationSubsidy,
                  dutyPaid: this.subsidyJson.dutyPaid,
                  healthSubsidy: this.subsidyJson.healthSubsidy,
                  heatingSubsidy: this.subsidyJson.heatingSubsidy,
                  housingSubsidy: this.subsidyJson.housingSubsidy,
                  nonSubsidy: this.subsidyJson.nonSubsidy,
                  overtimePay: this.subsidyJson.overtimePay,
                  subsidy: this.subsidyJson.subsidy,
                  trafficSubsidy: this.subsidyJson.trafficSubsidy,
                  deductible: this.deductibleJson.deductible,
                  housingFund: this.deductibleJson.housingFund,
                  medicalInsurance: this.deductibleJson.medicalInsurance,
                  membershipFees: this.deductibleJson.membershipFees,
                  pension: this.deductibleJson.pension,
                  personalAnnuity: this.deductibleJson.personalAnnuity,
                  tax: this.deductibleJson.tax,
                  unemploymentInsurance: this.deductibleJson.unemploymentInsurance,
                  basicPerformance: this.performanceSalaryJson.basicPerformance,
                  performanceSalary: this.performanceSalaryJson.performanceSalary
                }]
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('保存成功')
          } else {
            this.$message.error(rep.data.msg)
          }
          this.editAble = false
          resolve('done');
        }, (rep) => { });
      })
    },
    save () {
      // this.editSalaryReleaseRecord().then(() => {
        this.editSalary().then(() => {
          this.getUserSalaryInfo()
          // this.getSalaryReleaseRecordInfo()
        }, () => {})
      // }, () => {})
      
    }
  },
  props: ['staffId', 'canEdit'],
  created () {
    this.getUserSalaryInfo()
    this.getSalaryReleaseRecordInfo()
  }
}
</script>

<style lang="sass" scoped>
  .salary-wrapper {
    .basic-contain {
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 20px;
      .main-title {
        margin-left: 0;
      }
      .basic-form {
        margin-top: 30px;
        > form {
          padding-left: 20px;
          padding-right: 20px;
          margin-bottom: 20px;
        }
      }
      .el-row {
        .el-col-12 {
          padding-right: 20px;
        }
        > .title {
          margin-left: -10px;
          padding-right: 10px;
        }
      }
    }
  }
</style>