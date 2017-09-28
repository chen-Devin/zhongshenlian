<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <!-- <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit">编辑权限</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template> -->
      </div>
      <!-- <h5 class="main-title">权限设置</h5> -->
      <div class="basic-form"> 
         <!-- <el-table
           :data="resultArray"
           border
           style="width: 100%">
           <el-table-column prop="arr1"
             label="权限名称"
             :row-key="arr1"
             width="150">
             <el-table-column 
             prop="companyName"
             label="公司名称"
             width="150">
             </el-table-column>
           </el-table-column>
           <el-table-column :row-class-name="arr1">
           </el-table-column>
           <el-table-column >
           </el-table-column>
           <el-table-column >
           </el-table-column>
         </el-table>      -->
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
                staffId: '1'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.resultArray = rep.data.data.resultArray
            this.arr = this.resultArray[0].authorityArray
            let arr1 = []
            this.arr.forEach((item, index) => {
              arr1.push(item.name)
            })
            this.arr1 = arr1
            this.authorityData = []
            this.resultArray.forEach((item, index) => {
              // console.log(item)

            })
            // this.authorityData.push({
            //   companyName: 
            // })
            this.loadTable = true
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
  },
  components: {
    authForm
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