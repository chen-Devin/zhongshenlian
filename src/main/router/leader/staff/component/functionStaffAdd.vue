<template>
  <modal>
    <div slot="body">
      <el-form ref="staff" :model="staff" :rules="rules" label-width="100px">
        <el-form-item label="所属部门：" prop="company">
          <el-select v-model="companySelected" placeholder="请选择所属部门">
            <el-option 
              :label="company.name" 
              :value="company.id" 
              v-for="(company, index) in departmentList" 
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn modal-default-button" @click="save" :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn submit-btn modal-default-button" @click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import modal from '@/main/component/modal.vue';

export default {
  name: 'staffAddModal',
  data() {
    return {
      departmentList: [{
        name: '',
        id: ''
      }],
      subBtn: {
        dis: false,
        cont: '保存'
      },
      staff: {

      },
      rules: {
        company:  [
          { required: true, message: '请选择所属部门', trigger: 'blur' }
        ]
      },
      companySelected: ''
    };
  },
  methods: {
    getInfoDepartmentList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getInfoDepartmentList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.departmentList = rep.data.data.departmentList
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    save () {
      this.$emit('saveNewStaff', [0, this.companySelected])
    },
    cancel() {
      this.$emit('cancel');
    }
  },
  created () {
    this.getInfoDepartmentList()
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>

</style>