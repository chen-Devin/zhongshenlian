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
              <el-checkbox-group v-model="checked">
                <el-checkbox :label="item.name" v-for="(item, index) in iniReportType" :key="index"></el-checkbox>
              </el-checkbox-group>
              <a href="javascript:void(0);" @click="inputReportModal">添加/删除报告类型</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <input-report-modal
    :iniReportType="iniReportType"
    @saveReportOption="saveReportOption"
    @closeIputModal="closeIputModal"
    v-if="inputReportModalShow"></input-report-modal>
  <p class="btns">
    <button type="button" class="btn my-btn submit-btn" @click="submit">保存</button>
  </p>
</div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';
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
      inputReportModalShow: false,
      company: {
        id: '',
        name: '',
        number: '',
        creditCode: '',
        departmentArray: {
          id: '',
          name: '',
          number: '',
          principalId: '',
          principalName: '',
          authorityType: '',
          principalTelephone: '',
          editing: false
        },
        legalPersonId: '',
        legalPersonName: '',
        legalPersonTelephone: '',
        principalId: '',
        principalName: '',
        principalTelephone: '',
        mainWork: '',
        openAccountBankName: '',
        openAccountBankNumber: '',
        reportType: [{
          name: ''
        }],
        reportTypeOption: [{
          name: ''
        }],
        counselorTagArray: [{
          counselorTag: ''
        }],
        opertionsArray: [],
        selectionsArray: []
      },
      iniReportType: [{
        name: '审字'
      }, {
        name: '专字'
      }, {
        name: '咨字'
      }, {
        name: '基决审字'
      }, {
        name: '外汇检字'
      }, {
        name: '验字'
      }, {
        name: '外审字'
      }, {
        name: '无报告'
      }],
      checked: []
    };
  },
  watch: {
    
  },
  computed: {
    
  },
  methods: {
    submit () {
      this.company.reportTypeOption = this.iniReportType
      let arr = []
      this.checked.forEach((item, index) => {
        arr.push({name: item})
      })
      this.company.reportType = arr
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editCompany',
                platform: 'web',
                data: this.company
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('reloadComList')
            this.$message('新建公司成功')
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    inputReportModal () {
      this.inputReportModalShow = true
    },
    closeIputModal () {
      this.inputReportModalShow = false
    },
    saveReportOption (iniReportType) {
      this.$message('保存成功')
      this.iniReportType = iniReportType
      this.inputReportModalShow = false
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
  created() {

  },
  components: {
    card,
    modal,
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
.btns {
  margin-top: 10px;
  margin-bottom: 0;
  text-align: right;
}
</style>