<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="basic-form"> 
        <auth-form></auth-form>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';
import authForm from './authForm.vue';

export default {
  name: 'staffDetail',
  data() {
    return { 
    editAble: false,
    resultArray: [{
      companyName: '',
      companyId: '',
      authorityArray: [{
        name: '',
        authority: ''
      }]
    }],
    arr: [{
      name: '',
      authority: ''
    }],
    arr1: [],
    loadTable: false
    };
  },
  methods: {
    // getStaffAuthority () {
    //   return new Promise((resolve, reject) => {
    //     axios({
    //       headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //       method: 'get',
    //       url: '/service',
    //       params: {
    //         data: (() => {
    //           let obj = {
    //             command: 'getStaffAuthority',
    //             platform: 'web',
    //             staffId: '1'
    //           }
    //           return JSON.stringify(obj);
    //         })()
    //       }
    //     }).then((rep) => {
    //       if (rep.data.statusCode === '10001') {
    //         this.resultArray = rep.data.data.resultArray
    //         this.arr = this.resultArray[0].authorityArray
    //         let arr1 = []
    //         this.arr.forEach((item, index) => {
    //           arr1.push(item.name)
    //         })
    //         this.arr1 = arr1
    //         this.authorityData = []
    //         this.resultArray.forEach((item, index) => {
    //           // console.log(item)

    //         })
    //         // this.authorityData.push({
    //         //   companyName: 
    //         // })
    //         this.loadTable = true
    //         resolve('done');
    //       }
    //     }, (rep) => { });
    //   })
    // },
    // edit () {
    //   this.editAble = true
    // },
    // add () {
    //   //
    // },
    // cancel () {
    //   this.editAble = false
    // }
  },
  components: {
    authForm
  }
}
</script>

<style lang="sass" scoped>
  .staff-wrapper {
    .basic-contain {
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 20px;
      .basic-form {
        margin-top: 30px;
      }
    }
  }
</style>