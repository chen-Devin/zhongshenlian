<template>
  <div class="salary-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit">编辑</button>
          <button class="btn my-btn submit-btn" @click="add">新增</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template>
      </div>
      <h5 class="main-title">薪资信息</h5>
      <div class="basic-form">
        <el-form :label-position="labelPosition" label-width="100px" :model="baseSalaryJson" :rules="basicRules" ref="baseSalaryJson">
          <el-row>
            <el-col class="title" :span="12">
              <el-form-item label="基本工资" label-width="70px" prop="baseSalary">
                <el-input :disabled="!editAble" v-model="baseSalaryJson.baseSalary">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位工资" prop="postSalary">
                <el-input :disabled="!editAble" v-model="baseSalaryJson.postSalary">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="薪级工资" prop="wagePay">
                <el-input :disabled="!editAble" v-model="baseSalaryJson.wagePay">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> 
        <el-form :label-position="labelPosition" label-width="100px" :model="subsidyJson" :rules="basicRules" ref="subsidyJson">
          <el-row>
            <el-col class="title" :span="12">
              <el-form-item label-width="70px" label="津贴补贴" prop="subsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.subsidy">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="未纳补贴" prop="nonSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.nonSubsidy">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="卫生津贴" prop="healthSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.healthSubsidy">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="值班费" prop="dutyPaid">
                <el-input :disabled="!editAble" v-model="subsidyJson.dutyPaid">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采暖补贴" prop="heatingSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.heatingSubsidy">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="住房物业补贴" prop="housingSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.housingSubsidy">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通讯补贴" prop="communicationSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.communicationSubsidy">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="上下班交通补贴" prop="trafficSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.trafficSubsidy">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="加班费" prop="overtimePay">
                <el-input :disabled="!editAble" v-model="subsidyJson.overtimePay">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>  
        <el-form :label-position="labelPosition" label-width="100px" :model="performanceSalaryJson" :rules="basicRules" ref="performanceSalaryJson">
          <el-row>
            <el-col class="title" :span="12">
              <el-form-item label-width="100px" label="基础绩效工资" prop="performanceSalary">
                <el-input :disabled="!editAble" v-model="performanceSalaryJson.performanceSalary">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="16基础绩效" prop="basicPerformance">
                <el-input :disabled="!editAble" v-model="performanceSalaryJson.basicPerformance">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form :label-position="labelPosition" label-width="100px" :model="subsidyJson" :rules="basicRules" ref="subsidyJson">
          <el-row>
            <el-col class="title" :span="12">
              <el-form-item label-width="70px" label="应扣：" prop="deductible">
                <el-input :disabled="!editAble" v-model="deductibleJson.deductible">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="扣会费" prop="membershipFees">
                <el-input :disabled="!editAble" v-model="deductibleJson.membershipFees">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣养老保险" prop="pension">
                <el-input :disabled="!editAble" v-model="deductibleJson.pension">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="扣个人年金" prop="personalAnnuity">
                <el-input :disabled="!editAble" v-model="deductibleJson.personalAnnuity">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣医疗保险" prop="medicalInsurance">
                <el-input :disabled="!editAble" v-model="deductibleJson.medicalInsurance">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="扣失业保险" prop="unemploymentInsurance">
                <el-input :disabled="!editAble" v-model="deductibleJson.unemploymentInsurance">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣公积金" prop="housingFund">
                <el-input :disabled="!editAble" v-model="deductibleJson.housingFund">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="个所税" prop="tax">
                <el-input :disabled="!editAble" v-model="deductibleJson.tax">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>      
      </div>
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
      labelPosition: 'left'
    };
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
                staffId: '1'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.baseSalaryJson = rep.data.data.baseSalaryJson
            this.deductibleJson = rep.data.data.deductibleJson
            this.performanceSalaryJson = rep.data.data.performanceSalaryJson
            this.subsidyJson = rep.data.data.subsidyJson
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    edit () {
      this.editAble = true
    },
    add () {
      //
    },
    cancel () {
      this.editAble = false
    }
    // staffDataHandle (staff) {
    //   this.staff.singleSubjectsArray = this.staff.singleSubjects.split('，')
    //   this.staff.PCOptions = this.staff.professionalCertificate.map((item) => {
    //     return item.name
    //   })
    //   this.staff.PCSelected = this.staff.professionalCertificate.map((item) => {
    //     if (item.value === '1') {
    //       return item.name
    //     }
    //   })
    //   return staff
    // }
  },
  created () {
    this.getUserSalaryInfo()
  }
}
</script>

<style lang="sass" scoped>
  .salary-wrapper {
    .basic-contain {
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