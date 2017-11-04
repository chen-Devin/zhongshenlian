<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ company.name }}</h1>
    <h5 class="vice-title">部门信息</h5>
    <div class="company-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p>部门编号：{{company.number}}</p>
          <p>部门名称：{{company.name}}</p>
          <p class="input-wrapper">
            是否有部门负责人：
            <span>{{ company.principalTelephone===''?'否':'是' }}</span>
          </p>
          <p class="input-wrapper">
            人员数量：{{company.staffNum}}
          </p>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="24" :offset="2"> 
            <p>
              <el-checkbox-group v-model="company.checked">
                分管项目权限：
                <el-checkbox 
                  :label="item.name" 
                  v-for="(item, index) in company.companyList" 
                  :key="index"
                  disabled>{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </p>
          </el-col>
      </el-row>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn submit-btn" @click="edit">编辑</button>
      <!-- <button type="button" class="btn my-btn cancel-btn" @click="deleteDep">删除部门</button> -->
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
      // 
    };
  },
  computed: {
    company () {
      return this.functionInfo
    }
  },
  methods: {
    edit () {
      this.$emit('edit', 0)
    },
    deleteDep () {
      this.$emit('deleteDep', 0)
    }
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
  .el-row {
    p {
      height: 36px;
      line-height: 36px;
    }
  }
  .company-detail {
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
    margin-right: 15px;
    text-align: right;
  }
}
</style>