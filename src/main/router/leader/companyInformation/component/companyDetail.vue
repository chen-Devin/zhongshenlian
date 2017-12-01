<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ iniCompany2.name }}</h1>
    <h5 class="vice-title">公司信息</h5>
    <div class="company-detail">
      <el-form :label-position="labelPosition" label-width = "120px">
        <el-row>
          <el-col :span="11" :offset="1">
            <p>公司简称：{{iniCompany2.number}}</p>
            <p>公司名称：{{iniCompany2.name}}</p>
            <p>社会统一信用代码：{{iniCompany2.creditCode}}</p>
            <p>公司法人：{{iniCompany2.legalPersonName}}</p>
            <p>公司负责人：{{iniCompany2.principalName}}</p>
          </el-col>
          <el-col :span="11" :offset="1">
            <p>参审人员标签：{{iniCompany2.counselorTag}}</p>
            <p>经营范围：{{iniCompany2.mainWork}}</p>
            <p>开户银行：{{iniCompany2.openAccountBankName}}</p>
            <p>开户银行账号：{{iniCompany2.openAccountBankNumber}}</p>
            <p>人员数量：{{iniCompany2.staffNum}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <div class="post-type">
                <!-- <el-checkbox-group v-model="iniCompany2.reportTypeArray">
                  <el-checkbox :label="item.name" v-for="(item, index) in iniCompany2.reportTypeOption" :key="index" disabled></el-checkbox>
                </el-checkbox-group> -->
                <p>分管公司出具报告类型：{{ iniCompany2.reportTypeArray.join('、') }}</p>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn submit-btn" @click="edit">编辑</button>
      <button type="button" class="btn my-btn draft-btn" @click="add">新增部门</button>
      <!-- <button type="button" class="btn my-btn cancel-btn" @click="deleteDep">删除</button> -->
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
      typeShow: false,
      filterState: [],
      labelPosition: 'left'
    };
  },
  computed: {
    // company () {
    //   this.iniCompany2.reportTypeOption.forEach((item, index) => {
    //     this.iniCompany2.reportType.forEach((jtem, index) => {
    //       if (item.name == jtem.name) {
    //         item.selected = true
    //       } else {
    //         // item.selected = false
    //       }
    //     })
    //   })
    //   return this.iniCompany2
    // }
  },
  methods: {
    edit () {
      this.$emit('edit', 2)
    },
    add () {
      this.$emit('add', 2)
    },
    deleteDep () {
      this.$emit('deleteDep', 2)
    },
    showType () {
      this.typeShow = true;
    },
    closeType () {
      this.typeShow = false;
    },
    addType () {

    }
  },
  props: ['iniCompany2'],
  created() {

  },
  components: {
    card,
    modal
  }
};
</script>

<style lang="sass">
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
  }
  .post-type {
    display: flex;
    .title {
      width: 160px;
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
