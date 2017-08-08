<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ company.name }}</h1>
    <h5 class="main-title">公司信息</h5>
    <div class="company-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p>公司编号：{{ company.number }}</p>
          <p>公司名称：{{ company.name }}</p>
          <p>社会统一信用代码：{{ company.creditCode }}</p>
          <p>公司法人：{{ company.legalPersonName }}</p>
          <p>公司负责人：{{ company.principalName }}</p>
        </el-col>
        <el-col :span="9" :offset="4">
          <!-- <p>参审人员标签：{{ company.counselorTagArray }}</p> -->
          <p>经营范围：{{ company.mainWork }}</p>
          <p>开户银行：{{ company.openAccountBankName }}</p>
          <p>开户银行账号：{{ company.openAccountBankNumber }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <div class="post-type">
            <div class="title">
              分管公司出具报告类型：
            </div>
            <div class="selections">
              <template v-for="item in company.reportTypeOption">
                <i class="fa fa-check-square-o" aria-hidden="true" v-if="item.selected"></i>
                <i class="fa fa-square-o" aria-hidden="true" v-else></i>
                <span>
                  {{ item.name }}
                </span>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn submit-btn" @click="edit">编辑</button>
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
      options: [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }],
              value: '',
      typeShow: false,
      filterState: []
    };
  },
  computed: {
    company () {
      this.iniCompany.reportTypeOption.forEach((item, index) => {
        this.iniCompany.reportType.forEach((jtem, index) => {
          if (item.name == jtem.name) {
            item.selected = true
          } else {
            // item.selected = false
          }
        })
      })
      console.log(this.iniCompany)
      return this.iniCompany
    }
  },
  methods: {
    edit () {
      this.$emit('edit')
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
  props: ['iniCompany'],
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
