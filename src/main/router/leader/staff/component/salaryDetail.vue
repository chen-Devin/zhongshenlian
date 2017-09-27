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
    };
  },
  methods: {
    getStaffAuthority () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getStaffAuthority',
                platform: 'web',
                id: '1'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.staff = rep.data.data
            console.log(this.staff)
            this.staff = this.staffDataHandle(this.staff)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    edit () {
      this.editAble = true
    },
    cancel () {
      this.editAble = false
    },
    staffDataHandle (staff) {
      this.staff.singleSubjectsArray = this.staff.singleSubjects.split('，')
      this.staff.PCOptions = this.staff.professionalCertificate.map((item) => {
        return item.name
      })
      this.staff.PCSelected = this.staff.professionalCertificate.map((item) => {
        if (item.value === '1') {
          return item.name
        }
      })
      return staff
    }
  },
  created () {
    this.getStaffAuthority()
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