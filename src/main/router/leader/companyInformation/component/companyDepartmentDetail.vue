<template>
<div>
  <div class="company-department-detail-box">
    <h1 class="title">{{ iniCompany3.name }}</h1>
    <h5 class="vice-title">公司信息</h5>
    <div class="company-department-detail">
      <el-form :label-position="labelPosition" label-width = "100px">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="部门名称：" label-width="80px" required>
              <el-input type="text" v-model="iniCompany3.name" placeholder="暂无" disabled></el-input>
            </el-form-item>
            <el-form-item label="部门编号：" label-width="80px" required>
              <el-input type="number" v-model="iniCompany3.number" placeholder="暂无" disabled></el-input>
            </el-form-item>
            <el-form-item label="部门负责人：" label-width="110px" required>
              <el-input type="text" v-model="iniCompany3.principalTelephone" placeholder="暂无" disabled></el-input>
            </el-form-item>
            <el-form-item label="参审注师人数：" label-width="110px" required>
              <el-input type="number" v-model="iniCompany3.counselorNum" placeholder="暂无" disabled></el-input>
            </el-form-item>
            <el-form-item label="参审助理人数：" label-width="110px" required>
              <el-input type="number" v-model="iniCompany3.assistantNum" placeholder="暂无" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn submit-btn" @click="edit">编辑</button>
      <button type="button" class="btn my-btn draft-btn" @click="add">新增子部门</button>
      <button type="button" class="btn my-btn cancel-btn" @click="deleteDep">删除</button>
    </p>
  </div>
</div>
</template>

<script>
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';

export default {
  name: 'companyDepartmentDetail',
  data() {
    return {
      labelPosition: 'left'
    };
  },
  methods: {
    edit () {
      this.$emit('edit', 3)
    },
    add () {
      this.$emit('add', 3)
    },
    deleteDep () {
      this.$emit('deleteDep', 3)
    }
  },
  props: ['iniCompany3'],
  created() {
    
  },
  components: {
    card,
    modal
  }
};
</script>

<style lang="sass" scoped>
// @import '../../../../../scss/_variables.scss';

.company-department-detail-box {
  > .title {
    font-size: 15px;
    margin: 0;
    text-align: center;
  }
  .company-department-detail {
    width: 100%;
    background-color: #f9fbfe;
    padding: 10px 30px;
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

