<template>
  <div class="staff-wrapper">
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
        <el-form label-width="100px" :model="baseSalaryJson" :rules="basicRules" ref="baseSalaryJson">
          <el-col :span="23">
            <el-form-item label="基本工资" prop="baseSalary">
              <el-input :disabled="!editAble" v-model="baseSalaryJson.baseSalary"></el-input>
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="岗位工资" prop="postSalary">
                <el-input :disabled="!editAble" v-model="baseSalaryJson.postSalary"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="薪级工资" prop="wagePay">
                <el-input :disabled="!editAble" v-model="baseSalaryJson.wagePay"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> 
        <el-form label-width="110px" :model="subsidyJson" :rules="basicRules" ref="subsidyJson">
          <el-col :span="23">
            <el-form-item label="津贴补贴" prop="subsidy">
              <el-input :disabled="!editAble" v-model="subsidyJson.subsidy"></el-input>
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="未纳补贴" prop="nonSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.nonSubsidy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="卫生津贴" prop="healthSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.healthSubsidy"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="值班费" prop="dutyPaid">
                <el-input :disabled="!editAble" v-model="subsidyJson.dutyPaid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="采暖补贴" prop="heatingSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.heatingSubsidy"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="住房物业补贴" prop="housingSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.housingSubsidy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="通讯补贴" prop="communicationSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.communicationSubsidy"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="上下班交通补贴" prop="trafficSubsidy">
                <el-input :disabled="!editAble" v-model="subsidyJson.trafficSubsidy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="加班费" prop="overtimePay">
                <el-input :disabled="!editAble" v-model="subsidyJson.overtimePay"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>  
        <el-form label-width="100px" :model="performanceSalaryJson" :rules="basicRules" ref="performanceSalaryJson">
          <el-col :span="23">
            <el-form-item label="基础绩效工资" prop="performanceSalary">
              <el-input :disabled="!editAble" v-model="performanceSalaryJson.performanceSalary"></el-input>
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="16基础绩效" prop="basicPerformance">
                <el-input :disabled="!editAble" v-model="performanceSalaryJson.basicPerformance"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form label-width="110px" :model="subsidyJson" :rules="basicRules" ref="subsidyJson">
          <el-col :span="23">
            <el-form-item label="应扣：" prop="deductible">
              <el-input :disabled="!editAble" v-model="deductibleJson.deductible"></el-input>
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="扣会费" prop="membershipFees">
                <el-input :disabled="!editAble" v-model="deductibleJson.membershipFees"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="扣养老保险" prop="pension">
                <el-input :disabled="!editAble" v-model="deductibleJson.pension"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="扣个人年金" prop="personalAnnuity">
                <el-input :disabled="!editAble" v-model="deductibleJson.personalAnnuity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="扣医疗保险" prop="medicalInsurance">
                <el-input :disabled="!editAble" v-model="deductibleJson.medicalInsurance"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="扣失业保险" prop="unemploymentInsurance">
                <el-input :disabled="!editAble" v-model="deductibleJson.unemploymentInsurance"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="扣公积金" prop="housingFund">
                <el-input :disabled="!editAble" v-model="deductibleJson.housingFund"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="个所税" prop="tax">
                <el-input :disabled="!editAble" v-model="deductibleJson.tax"></el-input>
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

      }
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
  .staff-wrapper {
    .basic-contain {
      .basic-form {
        margin-top: 30px;
      }
    }
  }
</style>