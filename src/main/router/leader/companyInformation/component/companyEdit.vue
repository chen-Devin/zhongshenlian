<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ company.name == ''? '分公司信息录入':company.name }}</h1>
    <h5 class="main-title">公司信息</h5>
    <div class="company-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p class="input-wrapper">
            公司编号：
            <input type="text" class="form-control" v-model="company.number" placeholder="请输入公司编号">
          </p>
          <p class="input-wrapper">
            公司名称：
            <input type="text" class="form-control" v-model="company.name" placeholder="请输入公司名称">
          </p>
          <p class="input-wrapper">
            社会统一信用代码：
            <input type="text" class="form-control" v-model="company.creditCode" placeholder="请输入信用代码">
          </p>
          <p class="input-wrapper">
            公司法人：
            <input type="text" class="form-control" v-model="company.legalPersonName" placeholder="请输入公司法人">
          </p>
          <p class="input-wrapper">
            公司负责人：
            <input type="text" class="form-control" v-model="company.principalName" placeholder="请输入公司负责人">
          </p>
        </el-col>
        <el-col :span="9" :offset="4">
          <!-- <p class="input-wrapper">
            参审人员标签：
            <input type="text" class="form-control" v-model="company.counselorTagArray" placeholder="请输入参审人员标签">
          </p> -->
          <p class="input-wrapper">
            经营范围：
            <input type="text" class="form-control" v-model="company.mainWork" placeholder="请输入经营范围">
          </p>
          <p class="input-wrapper">
            开户银行：
            <el-select v-model="openAccountBankName" placeholder="请选择开户银行">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p class="input-wrapper">
            开户银行账号：
            <input type="text" class="form-control" v-model="company.openAccountBankNumber" placeholder="请输入开户账号">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <input-report-type @inputReportModal="inputReportModal" v-if=""></input-report-type>
        <edit-report-type v-if=""></edit-report-type>
      </el-row>
    </div>
  </div>
  <!-- <modal class="type-modal" modalWidth="550px" v-if="typeShow">
    <div slot="body">
      <span class="f-r" @click="closeType">x</span>
      <h5 class="main-title">添加/删除可出具报告类型</h5>
      <section>
        <template v-for="(item, index) in iniReportType" v-if="iniSelect">
          <input class="magic-checkbox" type="checkbox" :value="item.name" v-model="typeChecked" :id="index">
          <label :for="index" v-if="!item.input">
            {{ item.name }}
          </label>
          <label :for="index" v-if="item.input">
            <input type="text" v-model="item.name">
          </label>
        </template>
        <el-checkbox-group v-model="selectionsArray" v-if="!iniSelect">
          <el-checkbox v-for="item in selectionsArray"></el-checkbox>
        </el-checkbox-group>
        <p>{{ selectionsArray }}</p>
      </section>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn">删除</button>
      <button class="btn my-btn draft-btn" @click="addType">添加</button>
      <button class="btn my-btn submit-btn">保存</button>
    </div>
  </modal> -->
  <input-report-modal
    @saveIputModal="saveIputModal"
    @closeIputModal="closeIputModal"
    v-if="inputReportModalShow"></input-report-modal>
</div>
</template>

<script>
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';
import inputReportType from './inputReportType.vue';
import inputReportModal from './inputReportModal.vue';
import editReportType from './editReportType.vue';

export default {
  name: 'companyDetail',
  data() {
    return {
      options: [{
                value: '招商银行',
                label: '招商银行'
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
              openAccountBankName: '',
      typeShow: false,
      typeChecked: [],
      iniSelect: false,
      isNew: false,
      inputReportModalShow: false
    };
  },
  watch: {
    operateType: function(val, oldVal) {
      if (val === 'new') {
        console.log('new')
        this.iniSelect = true
      } else {
        this.iniSelect = false
      }
    }
  },
  computed: {
    company () {
      return this.iniCompany
    },
    operateType () {
      return this.iniOperateType
    }
  },
  methods: {
    inputReportModal () {
      this.inputReportModalShow = true
    },
    closeIputModal () {
      this.inputReportModalShow = false
    },
    saveIputModal (companyId) {
      console.log(companyId)
      // this.$router.push('/company-management/' + companyId)
    },
    showType () {
      this.typeShow = true;
      console.log(this.iniOperateType)
      console.log(this.operateType)
    },
    closeType () {
      this.typeShow = false;
    },
    addType () {
      if (this.operateType === 'new') {
        this.iniReportType.push({
          name: '',
          selected: false,
          input: true
        })
      } else {
        this.selectionsArray.push('')
      }
    }
  },
  props: ['iniCompany', 'iniOperateType', 'opertionsArray', 'selectionsArray'],
  created() {

  },
  components: {
    card,
    modal,
    inputReportType,
    editReportType,
    inputReportModal
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
    background-color: #fafafa;
    .type-input {
      height: 20px;
      width: 100px;
      padding: 0;
    }
  }
}
</style>
