<template>
  <div class="company-department-wrapper">
    <button
      type="button"
      class="btn my-btn submit-btn f-r"
      @click="addShow">新建部门</button>
    <h5 class="main-title">部门信息</h5>
    <table class="table table-bordered table-hover com-list" v-if="reloadTable">
      <thead>
        <tr>
          <th>部门名称</th>
          <th>部门编号</th>
          <th>业务权限类型</th>
          <th>部门所属分公司</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-if="haveData">
        <tr v-for="department in departmentArray">
          <td v-if="!department.editing">{{ department.name }}</td>
          <td v-if="department.editing">
            <input class="form-control ta-c" type="text" v-model="department.name">
          </td>
          <td v-if="!department.editing">{{ department.number }}</td>
          <td v-if="department.editing">
            <input class="form-control ta-c" type="text" v-model="department.number">
          </td>
          <td v-if="!department.editing">{{ department.authorityType }}</td>
          <td v-if="department.editing">
            <el-select v-model="department.authorityType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
          <td>{{ company.name }}</td>
          <td>
            <template v-if="!department.editing">
              <a href="javascript:void(0);" @click="edit(department)">编辑</a>
              <a href="javascript:void(0);" @click="deleteDepartment(department)">删除</a>
            </template>
            <template v-if="department.editing">
              <a href="javascript:void(0);" @click="submit(department)">保存</a>
              <a href="javascript:void(0);" @click="cancelEdit(department)">取消</a>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="ta-c" v-if="!haveData">暂无数据，请新建部门...</p>
    <add-company-department
      v-if="showAdd"
      @submit="submit"
      @cancel="cancel"></add-company-department>
  </div>
</template>

<script>
import axios from 'axios';
import modal from '@/main/component/modal.vue';
import addCompanyDepartment from './addCompanyDepartment.vue';

export default {
  name: 'companyDepartment',
  data() {
    return {
      options: [{
        value: '同部门之间业务可见',
        label: '同部门之间业务可见'
      }, {
        value: '同部门之间业务不可见',
        label: '同部门之间业务不可见'
      }],
      showAdd: false,
      editing: false,
      reloadTable: true,
      companyDepartment: {
        id: '',
        name: '',
        number: '',
        principalId: '',
        principalName: '',
        principalTelephone: '',
        authorityType: ''
      }
    };
  },
  computed: {
    companyId () {
      return this.$route.params.id
    },
    company () {
      return this.iniCompany
    },
    departmentArray () {
      return this.iniDepartmentArray
    },
    haveData () {
      return false
      // if (this.departmentArray.length == 0 || this.departmentArray[0].id === '') {
      //   return false
      // } else {
      //   return true
      // }
    }
  },
  watch: {
    departmentArray: function(val, oldVal) {
      console.log(val, oldVal)
    }
  },
  methods: {
    addShow () {
      this.showAdd = true
    },
    cancel () {
      this.showAdd = false
    },
    submit (companyDepartment) {
      console.log(companyDepartment)
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editCompanyDepartment',
                platform: 'web',
                data: {
                  id: companyDepartment.id,
                  companyId: this.companyId,
                  name: companyDepartment.name,
                  number: companyDepartment.number,
                  principalId: companyDepartment.principalId,
                  principalName: companyDepartment.principalName,
                  principalTelephone: companyDepartment.principalTelephone,
                  authorityType: companyDepartment.authorityType
                }
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            companyDepartment.id = rep.data.data.companyDepartmentId
            this.showAdd = false
            this.$emit('reloadList')
            console.log(companyDepartment)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    edit (department) {
      this.reloadTable = false
      this.reloadTable = true
      this.iniDepartmentArray.forEach((item, index) => {
        if (item.id === department.id) {
          item.editing = true
        } else {
          item.editing = false
        }
      })
    },
    cancelEdit (department) {
      this.reloadTable = false
      this.reloadTable = true
      this.iniDepartmentArray.forEach((item, index) => {
        item.editing = false
      })
    },
    deleteDepartment (department) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delCompanyDepartment',
                platform: 'web',
                companyDepartmentId: department.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('reloadList')
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  props: ['iniDepartmentArray', 'iniCompany'],
  created() {

  },
  components: {
    modal,
    addCompanyDepartment
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

.company-department-wrapper {
  .com-list {
    border: none;
    thead {
      background-color: #E6E6E6;
      th {
        text-align: center;
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
        }
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
