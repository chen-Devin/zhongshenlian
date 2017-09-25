<template>
<div>
  <div class="company-department-detail-box">
    <h1 class="title">{{ iniCompany3.name }}</h1>
    <h5 class="main-title">公司信息</h5>
    <div class="company-department-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p>部门名称：{{ iniCompany3.name }}</p>
          <p>部门编号：{{ iniCompany3.number }}</p>
          <p>部门负责人：{{ iniCompany3.principalTelephone }}</p>
          <p>参审注师人数：{{ iniCompany3.counselorNum }}</p>
          <p>参审助理人数：{{ iniCompany3.assistantNum }}</p>
        </el-col>
       </el-row>
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
    };
  },
  // computed: {
  //   company () {
  //   //   this.iniCompany3.reportTypeOption.forEach((item, index) => {
  //   //     this.iniCompany3.reportType.forEach((jtem, index) => {
  //   //       if (item.name == jtem.name) {
  //   //         item.selected = true
  //   //       } else {
  //   //         // item.selected = false
  //   //       }
  //   //     })
  //   //   })
  //   //   return this.iniCompany3
  //   // }
  // },
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
    background-color: #fafafa;
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

