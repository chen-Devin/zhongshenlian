<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ iniCompanyEdit4.name }}</h1>
    <h5 class="vice-title">部门信息</h5>
    <div class="company-detail">
      <el-form :label-position="labelPosition" label-width="100px" :model="iniCompanyEdit4" :rules="Rules">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="部门名称：" required prop="name">
              <el-input type="text" v-model="iniCompanyEdit4.name" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item label="部门编号：" required prop="number">
              <el-input type="text" v-model="iniCompanyEdit4.number" placeholder="请输入部门编号"></el-input>
            </el-form-item>
            <el-form-item label="业务部人数：" required prop="name">
              <p>{{iniCompanyEdit4.staffNum}}</p>
            </el-form-item>
            <el-form-item label="业务部经理：" required prop="name">
              <p>{{iniCompanyEdit4.principalName}}</p>
            </el-form-item>
            <!-- <el-form-item label="公司简称：" required prop="companyAbbreviation">
              <el-input type="text" v-model="iniCompanyEdit4.companyAbbreviation" placeholder="请输入公司简称"></el-input>
            </el-form-item> -->
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
  <p class="btns">
    <button type="button" class="btn my-btn draft-btn" @click="cancel">取消</button>
    <button type="button" class="btn my-btn submit-btn" @click="submit" :disabled="saveAble">保存</button>
  </p>
</div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';

export default {
  name: 'companyDepartmentEdit',
  data() {
    return {
      labelPosition: 'left',
      Rules: {
        name: [
          { required: true, message: '请输入业务部名称', trigger: 'blur' }
        ],
        companyAbbreviation: [
          { required: true, message: '请输入公司简称', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    saveAble () {
      return false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', 4)
    },
    submit () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editProjectDepartment',
                platform: 'web',
                data: this.iniCompanyEdit4
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            console.log(rep.data.data)
            this.$emit('editSuccess', 4, rep.data.data.id)
            this.$message('编辑业务部门信息成功')
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  props: ['iniCompanyEdit4'],
  components: {
    card,
    modal
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

.company-detail-box {
  > .title {
    font-size: 15px;
    margin: 0;
    text-align: center;
  }
  .company-detail {
    width: 100%;
    background-color: #f9fbfe;
    padding: 10px 30px;
    .input-wrapper {
      display: flex;
      height: 34px;
      line-height: 34px;
      .form-control {
        display: inline-block;
        flex: 1;
      }
      .el-select {
        flex: 1;
      }
    }
  }
  + button {
    margin-top: 10px;
  }
}
.type-modal {
  h5 {
    margin: 0;
    margin-bottom: 20px;
  }
  section {
    box-sizing: border-box;
    width: 100%;
    padding: 50px 20px;
    background-color: #f9fbfe;
    .type-input {
      height: 20px;
      width: 100px;
      padding: 0;
    }
  }
}
.btns {
  margin-top: 10px;
  margin-bottom: 0;
  text-align: right;
}
</style>