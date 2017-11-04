<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit" :disabled="!canEdit.canEditEducation">编辑</button>
          <button class="btn my-btn submit-btn" @click="add" :disabled="!canEdit.canEditEducation">新增</button>
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
                <el-date-picker
                  style="width:100%"
                  v-model="item.startTime"
                  type="date"
                  placeholder="选择日期"
                  v-if="editAble">
                </el-date-picker>
              </td>
              <td class="text-center">
                <el-date-picker
                  style="width:100%"
                  v-model="item.endTime"
                  type="date"
                  placeholder="选择日期"
                  v-if="editAble">
                </el-date-picker>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="empty-list-p" v-if="educationArray.length === 0">暂无数据</p>    
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
  watch: {
    editAble: function (val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.canEdit.canEditDetail = false
          this.canEdit.canEditAuthority = false
          this.canEdit.canEditSalary = false
          this.canEdit.canEditBonus = false
          this.canEdit.canEditEducation = true
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