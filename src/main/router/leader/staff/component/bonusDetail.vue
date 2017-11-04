<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit" :disabled="!canEdit.canEditBonus">编辑</button>
          <button class="btn my-btn submit-btn" @click="add" :disabled="!canEdit.canEditBonus">新增</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template>
      </div>
      <h5 class="main-title">奖金信息</h5>
      <div class="basic-form"> 
        <el-form :label-position="labelPosition" label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="80px" label="发放形式：" v-if="editAble">
                <el-input v-model="bonusArray[0].releaseModus"></el-input>
              </el-form-item>
              <p v-else>发放形式：{{ bonusArray[0].releaseModus }}</p>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工资卡账户：" v-if="editAble">
                <el-input v-if="editAble" v-model="bonusArray[0].salaryCardAccount"></el-input>
              </el-form-item>
              <p v-else>工资卡账户：{{ bonusArray[0].salaryCardAccount }}</p>
            </el-col>
          </el-row>
        </el-form>
        <table class="table table-inner table-hover table-input">
          <thead>
            <tr>
              <td class="text-center">批次编号</td>
              <td class="text-center">申请人</td>
              <td class="text-center">申请日期</td>
              <td class="text-center">发放日期</td>
              <td class="text-center">发放金额</td>
              <td class="text-center">备注说明</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in bonusArray"
                :key="index">
              <td class="text-center">
                <el-input type="text"
                       v-model="item.batchNumber"
                       v-if="editAble"></el-input>
                <p v-else>{{ item.batchNumber }}</p>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.applyPersonTelephone"
                       v-if="editAble"></el-input>
                <p v-else>{{ item.applyPersonTelephone }}</p>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.applyDate"
                       v-if="editAble"></el-input>
                <p v-else>{{ item.applyDate }}</p>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.releaseDate"
                       v-if="editAble"></el-input>
                <p v-else>{{ item.releaseDate }}</p>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.amount"
                       v-if="editAble"></el-input>
                <p v-else>{{ item.amount }}</p>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.remark"
                       v-if="editAble"></el-input>
                <p v-else>{{ item.remark }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="empty-list-p" v-if="bonusArray.length === 0">暂无数据</p>  
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
      bonusArray: [],
      bonusArrayEmpty: {
        id: '',
        userId: '',
        amount: '',
        applyDate: '',
        applyPersonTelephone: '',
        batchNumber: '',
        bonusNumber: '',
        createAt: '',
        releaseDate: '',
        releaseModus: '',
        remark: '',
        removeStatus: '',
        salaryCardAccount: '',
        updateAt: '',
      },
      labelPosition: 'left'
    };
  },
  watch: {
    editAble: function (val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.canEdit.canEditDetail = false
          this.canEdit.canEditAuthority = false
          this.canEdit.canEditSalary = false
          this.canEdit.canEditBonus = true
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
  props: ['id', 'canEdit'],
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
                staffId: this.id
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
      this.editAble = true
      console.log(12)
      this.bonusArrayEmpty.userId = this.id
      this.bonusArray.push(this.bonusArrayEmpty)
    },
    cancel () {
      this.editAble = false
      this.getUserBonusInfo()
    },
    save () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editBonus',
                platform: 'web',
                bonus: this.bonusArray
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('保存成功')
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
          this.getUserBonusInfo()
          this.editAble = false
        }, (rep) => { });
      })
    }
  },
  created () {
    this.getUserBonusInfo()
  }
}
</script>

<style lang="sass" scoped>
  .staff-wrapper {
    .basic-contain {
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 20px;
      .main-title {
        margin-left: 0;
      }
      .basic-form {
        margin-top: 30px;
        padding: 0;
      }
    }
  }
  .table-inner {
    margin-top: 0;
  }
</style>