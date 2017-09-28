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
      <h5 class="main-title">教育背景</h5>
      <div class="basic-form"> 
        <el-table
               :data="educationArray"
               style="width: 100%">
               <el-table-column
                 prop="schoolName"
                 label="学校名称"
                 width="180">
                 <template scope="scope">
                   <el-input v-model=scope.row.schoolName :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="education"
                 label="学历"
                 width="180">
                 <template scope="scope">
                   <el-input v-model=scope.row.education :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="startTime"
                 label="就读时间">
                 <template scope="scope">
                   <el-input v-model=scope.row.startTime :disabled="!editAble"></el-input>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="endTime"
                 label="毕业时间">
                 <template scope="scope">
                   <el-input v-model=scope.row.endTime :disabled="!editAble"></el-input>
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
      educationArray: [{
       certificateNumber: '',
       createAt: '',
       education: '',
       endTime: '',
       id: '',
       remark: '',
       removeStatus: '',
       schoolName: '',
       startTime: '',
       updateAt: ''
      }]  
    };
  },
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
                staffId: '1'
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
    this.getUserEducationInfo()
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