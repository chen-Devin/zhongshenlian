<template>
<div>
  <div class="company-department-detail-box">
    <h1 class="title">{{ iniCompany5.groupName }}</h1>
    <h5 class="main-title">小组信息</h5>
    <div class="company-department-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p>小组名称：{{ iniCompany5.groupName }}</p>
        </el-col>
       </el-row>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn submit-btn" @click="edit">编辑</button>
      <button type="button" class="btn my-btn cancel-btn" @click="deleteDep">删除小组</button>
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
  methods: {
    edit () {
      this.$emit('edit', 5)
    },
    add () {
      this.$emit('add', 5)
    },
    deleteDep () {
      this.$emit('deleteDep', 5)
    }
  },
  props: ['iniCompany5'],
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