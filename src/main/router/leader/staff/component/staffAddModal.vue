<template>
  <modal>
    <div slot="body">
      <el-form ref="staff" :model="staff" :rules="rules" label-width="100px">
        <el-form-item label="所属部门" prop="company">
          <el-select v-model="companySelected" placeholder="请选择所属部门" @change="changeCompany">
            <el-option 
              :label="company.name" 
              :value="company.id" 
              v-for="(company, index) in companyList" 
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属业务部">
          <el-select v-model="departmentSelected" placeholder="请选择所属业务部" @change="changeDepartment">
            <el-option
              :label="department.name" 
              :value="department.id" 
              v-for="(department, index) in departmentList" 
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目部">
          <el-select v-model="projectSelected" placeholder="请选择所属项目部" @change="changeProject">
            <el-option 
              :label="project.name" 
              :value="project.id" 
              v-for="(project, index) in projectList" 
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属小组">
          <el-select v-model="groupSelected" placeholder="请选择所属小组">
            <el-option 
              :label="group.name" 
              :value="group.id" 
              v-for="(group, index) in groupList" 
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
      companyList: [{
        name: '',
        id: ''
      }],
      departmentList: [],
      projectList: [],
      groupList: [],
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
      companySelected: '',
      departmentSelected: '',
      projectSelected: '',
      groupSelected: ''
    };
  },
  methods: {
    getCompanyList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getCompanyList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.companyList = rep.data.data.companyList
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getCompanyDepartmentListByCom (id) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getCompanyDepartmentListByCom',
                platform: 'web',
                companyId: id
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
    getProjectDepartmentByComDepartment (id) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getProjectDepartmentByComDepartment',
                platform: 'web',
                companyDepartmentId: id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.projectList = rep.data.data.departmentList
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getGroupListByProjectDepartment (id) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getGroupListByProjectDepartment',
                platform: 'web',
                projectDepartmentId: id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.groupList = rep.data.data.departmentList
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    changeCompany (value) {
      this.getCompanyDepartmentListByCom(value)
    },
    changeDepartment (value) {
      this.getProjectDepartmentByComDepartment(value)
    },
    changeProject (value) {
      this.getGroupListByProjectDepartment(value)
    },
    save () {
      let type = 1
      if (this.departmentSelected === '') {
        type = 1
      } else if (this.projectSelected === '') {
        type = 2
      } else if (this.groupSelected === '') {
        type = 3
      } else {
        type = 4
      }
      this.$emit('saveNewStaff', [type, this.companySelected, this.departmentSelected, this.projectSelected, this.groupSelected])
    },
    cancel() {
      this.$emit('cancel');
    }
  },
  created () {
    this.getCompanyList()
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>

</style>