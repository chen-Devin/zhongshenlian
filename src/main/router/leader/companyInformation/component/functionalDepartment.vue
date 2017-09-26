<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ company.name }}</h1>
    <h5 class="main-title">部门信息</h5>
    <div class="company-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p>部门编号：{{ company.number }}</p>
          <p>部门名称：{{ company.name }}</p>
          <p>是否有部门负责人：{{ company.principalTelephone }}</p>
          <p>人员数量：{{ company.staffNum }}</p>
          <p>分管业务权限：{{ company.authority }}</p>
        </el-col>
      </el-row>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn submit-btn" @click="edit">编辑</button>
      <button type="button" class="btn my-btn cancel-btn" @click="deleteDep">删除部门</button>
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
      // company: this.functionInfo
    };
  },
  computed: {
    company () {
      console.log(this.functionInfo)
      return this.functionInfo
    }
  },
  methods: {
    edit () {
      this.$emit('edit', 0)
    },
  },
  props: ['functionInfo'],
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