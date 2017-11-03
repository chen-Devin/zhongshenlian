<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ iniCompanyEdit3.name }}</h1>
    <h5 class="vice-title">公司信息</h5>
    <div class="company-detail">
      <el-form :label-position="labelPosition" label-width = "100px">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="部门名称：" label-width="80px" required>
              <el-input type="text" v-model="iniCompanyEdit3.name" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item label="部门编号：" label-width="80px" required>
              <el-input type="number" v-model="iniCompanyEdit3.number" placeholder="请输入部门编号"></el-input>
            </el-form-item>
            <el-form-item label="部门负责人：" label-width="110px" required>
              <el-input type="text" v-model="iniCompanyEdit3.principalTelephone" placeholder="请输入部门负责人"></el-input>
            </el-form-item>
            <el-form-item label="参审注师人数：" label-width="110px" required>
              <el-input type="number" v-model="iniCompanyEdit3.counselorNum" placeholder="请输入参审注师人数"></el-input>
            </el-form-item>
            <el-form-item label="参审助理人数：" label-width="110px" required>
              <el-input type="number" v-model="iniCompanyEdit3.assistantNum" placeholder="请输入参审助理人数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
  <p class="btns">
    <button type="button" class="btn my-btn draft-btn" @click="cancel">取消</button>
    <button type="button" class="btn my-btn submit-btn" @click="submit">保存</button>
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
      labelPosition: 'left'
    };
  },
  methods: {
    cancel () {
      this.$emit('cancel', 3)
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
                command: 'editCompanyDepartment',
                platform: 'web',
                data: this.iniCompanyEdit3
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('editSuccess', 3, rep.data.data.companyDepartmentId)
            this.$message('编辑部门信息成功')
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  props: ['iniCompanyEdit3'],
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