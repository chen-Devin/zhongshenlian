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
      <h5 class="main-title">奖金信息</h5>
      <div class="basic-form"> 
        <el-form label-width="100px">
          <el-row>
            <el-col :span="10" :pull="2">
              <el-form-item label="发放形式">
                <el-input :disabled="!editAble" v-model="bonusArray[0].releaseModus"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :push="5">
              <el-form-item label="工资卡账户">
                <el-input :disabled="!editAble" v-model="bonusArray[0].salaryCardAccount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :disabled="!editAble"
               :data="bonusArray"
               style="width: 100%">
               <el-table-column
                 prop="batchNumber" 
                 label="批次编号"
                 width="180">
                 <template scope="scope">
                 <el-input v-model=scope.row.batchNumber :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="applyPersonTelephone"
                 label="申请人"
                 width="180">
                 <template scope="scope">
                   <el-input v-model=scope.row.applyPersonTelephone :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="applyDate"
                 label="申请日期">
                 <template scope="scope">
                   <el-input v-model=scope.row.applyDate :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="releaseDate"
                 label="发放日期">
                 <template scope="scope">
                   <el-input v-model=scope.row.releaseDate :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="amount"
                 label="发放金额">
                 <template scope="scope">
                   <el-input v-model=scope.row.amount :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="remark"
                 label="备注说明">
                 <template scope="scope">
                   <el-input v-model=scope.row.remark :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
        </el-table>     
      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'staffDetail',
  data() {
    return {
      editAble: false,
      bonusArray: [{
        amount: '',
        applyDate: '',
        applyPersonTelephone: '',
        batchNumber: '',
        bonusNumber: '',
        createAt: '',
        id: '',
        releaseDate: '',
        releaseModus: '',
        remark: '',
        removeStatus: '',
        salaryCardAccount: '',
        updateAt: '',
      }]  
    };
  },
  methods: {
    getUserBonusInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUserBonusInfo',
                platform: 'web',
                staffId: '1'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.bonusArray = rep.data.data.bonusArray
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
    this.getUserBonusInfo()
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