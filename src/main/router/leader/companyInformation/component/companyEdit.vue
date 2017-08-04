<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">分公司信息录入</h1>
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
        <el-col :span="20" :offset="2">
          <div class="post-type">
            <div class="title">
              分管公司出具报告类型：
            </div>
            <div class="selections">
              <template v-for="(item, index) in iniReportType">
                <input class="magic-checkbox" type="checkbox" :value="item.name" v-model="typeChecked" :id="index">
                <label :for="index">
                  {{ item.name }}
                </label>
              </template>
              <!-- <template v-for="item in company.reportType">
                <input class="magic-checkbox" type="checkbox" value="item.selected" v-model="company.reportType">
                <label for="1">
                  {{ item.name }}
                </label>
              </template> -->
              <a href="javascript:void(0);" @click="showType">添加/删除报告类型</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <modal class="type-modal" modalWidth="550px" v-if="typeShow">
    <div slot="body">
      <span class="f-r" @click="closeType">x</span>
      <h5 class="main-title">添加/删除可出具报告类型</h5>
      <section>
        <template v-for="(item, index) in iniReportType">
          <input class="magic-checkbox" type="checkbox" :value="item.name" v-model="typeChecked" :id="index">
          <label :for="index" v-if="!item.input">
            {{ item.name }}
          </label>
          <label :for="index" v-if="item.input">
            <input type="text" v-model="item.name">
          </label>
        </template>
        <!-- <template v-for="item in company.reportType">
          <input class="magic-checkbox" type="checkbox" value="item.name" v-model="company.reportType">
          <label for="1">
            {{ item.name }}
          </label>
        </template> -->
      </section>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn">删除</button>
      <button class="btn my-btn draft-btn" @click="addType">添加</button>
      <button class="btn my-btn submit-btn">保存</button>
    </div>
  </modal>
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
      iniReportType: [{
        name: '审字',
        selected: false
      }, {
        name: '专字',
        selected: false
      }, {
        name: '咨字',
        selected: false
      }, {
        name: '基决审字',
        selected: false
      }, {
        name: '外汇检字',
        selected: false
      }, {
        name: '验字',
        selected: false
      }, {
        name: '外审字',
        selected: false
      }, {
        name: '无报告',
        selected: false
      }],
      typeChecked: [],
      addORedit: this.iniAddORedit
    };
  },
  computed: {
    company () {
      return this.iniCompany
    }
    // reportTypeShow () {
    //   return this.iniReportType
    // },
    // typeCheckedShow () {
    //   return this.typeChecked
    // }
  },
  methods: {
    showType () {
      this.typeShow = true;
    },
    closeType () {
      this.typeShow = false;
    },
    addType () {
      this.iniReportType.push({
        name: '',
        selected: false,
        input: true
      })
    }
  },
  props: ['iniCompany', 'iniAddORedit'],
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
      .el-select {
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
