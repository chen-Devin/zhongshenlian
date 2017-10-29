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
      <h5 class="main-title">教育背景</h5>
      <div class="basic-form"> 
        <table class="table table-inner table-hover table-input">
          <thead>
            <tr>
              <td class="text-center">学校名称</td>
              <td class="text-center">学历</td>
              <td class="text-center">就读时间</td>
              <td class="text-center">毕业时间</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in educationArray"
                :key="index">
              <td class="text-center">
                <el-input type="text"
                       v-model="item.schoolName"
                       :disabled="!editAble"></el-input>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.education"
                       :disabled="!editAble"></el-input>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.startTime"
                       :disabled="!editAble"></el-input>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.endTime"
                       :disabled="!editAble"></el-input>
              </td>
            </tr>
          </tbody>
        </table>     
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
      educationArray: [],
      educationArrayEmpty: {
       id: '',
       userId: '',
       certificateNumber: '',
       createAt: '',
       education: '',
       endTime: '',
       remark: '',
       removeStatus: '',
       schoolName: '',
       startTime: '',
       updateAt: ''
      } 
    };
  },
  props: ['id'],
  methods: {
    getUserEducationInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUserEducationInfo',
                platform: 'web',
                staffId: this.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.educationArray = rep.data.data.educationArray
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
      this.educationArrayEmpty.userId = this.id
      this.educationArray.push(this.educationArrayEmpty)
    },
    cancel () {
      this.editAble = false
      this.getUserEducationInfo()
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
                command: 'editEducationalExperience',
                platform: 'web',
                educationalExperience: this.educationArray
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
          this.getUserEducationInfo()
          this.editAble = false
        }, (rep) => { });
      })
    }
  },
  created () {
    this.getUserEducationInfo()
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
      }
    }
  }
</style>