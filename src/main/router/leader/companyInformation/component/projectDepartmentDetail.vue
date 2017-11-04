<template>
<div>
  <div class="company-department-detail-box">
    <h1 class="title">{{ iniCompany4.name }}</h1>
    <h5 class="vice-title">公司信息</h5>
    <div class="company-department-detail">
      <el-form :label-position="labelPosition" label-width = "100px">
        <el-row>
          <el-col :span="9" :offset="2">
            <p>业务部名称：{{iniCompany4.name}}</p>
            <p>业务部人数：{{iniCompany4.number}}</p>
            <p>业务部经理：{{iniCompany4.principalTelephone}}</p>
            <p>公司简称：{{iniCompany4.companyAbbreviation}}</p>
          </el-col>         
        </el-row>
      </el-form> 
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn submit-btn" @click="edit">编辑</button>
      <button type="button" class="btn my-btn draft-btn" @click="add">新增小组</button>
      <button type="button" class="btn my-btn cancel-btn" @click="deleteDep">删除业务部</button>
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
      this.$emit('edit', 4)
    },
    add () {
      this.$emit('add', 4)
    },
    deleteDep () {
      this.$emit('deleteDep', 4)
    }
  },
  props: ['iniCompany4'],
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
