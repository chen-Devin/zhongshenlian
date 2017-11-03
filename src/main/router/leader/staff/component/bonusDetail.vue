<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit">编辑</button>
          <button class="btn my-btn submit-btn" @click="add">新增</button>
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
              <el-form-item label-width="80px" label="发放形式">
                <el-input :disabled="!editAble" v-model="bonusArray[0].releaseModus"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工资卡账户：">
                <el-input :disabled="!editAble" v-model="bonusArray[0].salaryCardAccount"></el-input>
              </el-form-item>
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
                       :disabled="!editAble"></el-input>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.applyPersonTelephone"
                       :disabled="!editAble"></el-input>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.applyDate"
                       :disabled="!editAble"></el-input>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.releaseDate"
                       :disabled="!editAble"></el-input>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.amount"
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
  props: ['id'],
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