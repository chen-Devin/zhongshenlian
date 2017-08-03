<template>
  <div class="company-department-wrapper">
    <button type="button" class="btn my-btn submit-btn f-r" @click="addShow">新建部门</button>
    <h5 class="main-title">部门信息</h5>
    <table class="table table-bordered table-hover com-list">
      <thead>
        <tr>
          <th>部门名称</th>
          <th>部门编号</th>
          <th>业务权限类型</th>
          <th>部门所属分公司</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="department in departmentArray">
          <td>{{ department.name }}</td>
          <td>{{ department.number }}</td>
          <td>{{ department.authorityType }}</td>
          <td>{{ company.name }}</td>
          <td>
            <a href="javascript:void(0);">编辑</a>
            <a href="javascript:void(0);">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-show="showAdd">
      <div class="inputs" slot="body">
        <p>
          <span>部门编号：</span>
          <input class="form-control" type="text" v-model="companyDepartment.number">
        </p>
        <p>
          <span>部门名称：</span>
          <input class="form-control" type="text" v-model="companyDepartment.name">
        </p>
        <!-- <p>
          所属部门：
          <input class="form-control" type="text" v-model="companyDepartment.">
        </p> -->
        <!-- <p>
          <span>所属分公司：</span>
          <input class="form-control" type="text" v-model="companyDepartment.">
        </p> -->
        <p>
          <span>业务权限：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
      </div>
      <div slot="footer">
        <button class="btn my-btn submit-btn" @click="submit">保存</button>
        <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from '@/main/component/modal.vue';

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
      value: '',
      showAdd: false,
      companyDepartment: {
        id: '',
        name: '',
        number: '',
        principalId: '',
        principalName: '',
        principalTelephone: ''
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
    }
  },
  methods: {
    addShow () {
      this.showAdd = true
    },
    submit () {

    },
    cancel () {
      this.showAdd = false
    }
  },
  props: ['iniDepartmentArray', 'iniCompany'],
  created() {

  },
  components: {
    modal
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
  .inputs {
    p {
      display: flex;
      height: 34px;
      line-height: 34px;
      span {
        width: 100px;
      }
      input, .el-select {
        flex: 1;
      }
    }
  }
}
</style>
