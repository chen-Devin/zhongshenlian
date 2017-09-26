<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ functionInfoEdit.name }}</h1>
    <h5 class="main-title">部门信息</h5>
    <div class="company-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p class="input-wrapper">
            部门编号：
            <input type="text" class="form-control" v-model="functionInfoEdit.number" placeholder="请输入部门编号">
          </p>
          <p class="input-wrapper">
            部门名称：
            <input type="text" class="form-control" v-model="functionInfoEdit.name" placeholder="请输入部门名称">
          </p>
          <p class="input-wrapper">
            是否有部门负责人：
            <input type="text" class="form-control" v-model="functionInfoEdit.principalTelephone" placeholder="请输入是否有部门负责人">
          </p>
          <p class="input-wrapper">
            人员数量：
            <input type="text" class="form-control" v-model="functionInfoEdit.staffNum" placeholder="请输入人员数量">
          </p>
          <p class="input-wrapper">
            分管业务权限：
            <el-checkbox-group v-model="authority">
              <el-checkbox label="kjs">会计所</el-checkbox>
              <el-checkbox label="sjs">审计所</el-checkbox>
              <el-checkbox label="pgs">评估所</el-checkbox>
              <el-checkbox label="zjs">造价所</el-checkbox>
            </el-checkbox-group>
          </p>
        </el-col>
      </el-row>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn draft-btn" @click="cancel">取消</button>
      <button type="button" class="btn my-btn submit-btn" @click="submit">保存</button>
    </p>
  </div>
</div>
</template>

<script>
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';

export default {
  name: 'companyDetail',
  data() {
    return {
      company: {},
      authority: []
    };
  },
  methods: {
    cancel () {
      this.$emit('cancel', 0)
    },
    submit () {
      let arr = []
      this.checked.forEach((item, index) => {
        arr.push({name: item})
      })
      this.company.reportType = arr
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editDepartment',
                platform: 'web',
                data: this.functionInfoEdit
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('editSuccess', 2, rep.data.data.companyId)
            this.$message('编辑公司信息成功')
            resolve('done');
          }
        }, (rep) => { });
      })
    },
  },
  props: ['functionInfoEdit'],
  created() {

  },
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
    background-color: #fafafa;
    padding: 10px 30px;
    .input-wrapper {
      display: flex;
      height: 34px;
      line-height: 34px;
      .form-control {
        display: inline-block;
        flex: 1;
      }
    }
  }
  .post-type {
    display: flex;
    .title {
      width: 235px;
    }
  }
  + button {
    margin-top: 10px;
  }
  .btns {
    margin-top: 10px;
    margin-bottom: 0;
    text-align: right;
  }
}
</style>