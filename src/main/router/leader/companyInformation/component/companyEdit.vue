<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ iniCompanyEdit2.name }}</h1>
    <h5 class="vice-title">公司信息</h5>
    <div class="company-detail">
      <el-form :label-position="labelPosition" label-width = "130px" :model="iniCompanyEdit2" :rules="Rules" ref="iniCompanyEdit2" >
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item label="公司简称：" label-width="90px" required prop="number">
              <el-input type="text" v-model="iniCompanyEdit2.number" placeholder="请输入公司编号"></el-input>
            </el-form-item>
            <el-form-item label="公司名称：" label-width="90px" required prop="name">
              <el-input type="text" v-model="iniCompanyEdit2.name" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="社会统一信用代码：" label-width="140px" required prop="creditCode">
              <el-input type="text" v-model="iniCompanyEdit2.creditCode" placeholder="请输入信用代码"></el-input>
            </el-form-item>
            <el-form-item label="公司法人：" label-width="90px" required prop="legalPersonTelephone">
              <el-input type="text" v-model="iniCompanyEdit2.legalPersonTelephone" placeholder="请输入公司法人"></el-input>
            </el-form-item>
            <el-form-item label="公司负责人：" label-width="100px" required>  
              <p>{{iniCompanyEdit2.principalName}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="参审人员标签：" label-width="120px" required prop="counselorTag">
              <el-input type="text" v-model="iniCompanyEdit2.counselorTag" placeholder="请输入参审人员标签"></el-input>
            </el-form-item>
            <el-form-item label="经营范围：" label-width="90px" required prop="mainWork">
              <el-input type="text" v-model="iniCompanyEdit2.mainWork" placeholder="请输入经营范围"></el-input>
            </el-form-item>
            <el-form-item label="开户银行：" label-width="90px" required prop="openAccountBankName">
              <el-input type="text" v-model="iniCompanyEdit2.openAccountBankName" placeholder="请输入开户银行"></el-input>
            </el-form-item>
            <el-form-item label="开户银行账号：" label-width="120px" required prop="openAccountBankNumber">
              <el-input type="text" v-model="iniCompanyEdit2.openAccountBankNumber" placeholder="请输入开户账号"></el-input>
            </el-form-item>
            <el-form-item label="人员数量：" label-width="90px" required>
              <span>{{ iniCompanyEdit2.staffNum }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <div class="d-f">
              <div class="title" style="width:150px">
                分管公司出具报告类型
              </div>
              <div class="selections">
                <el-checkbox-group v-model="iniCompanyEdit2.reportTypeArray">
                  <el-checkbox :label="item.name" v-for="(item, index) in iniCompanyEdit2.reportTypeOption" :key="index"></el-checkbox>
                </el-checkbox-group>
                <a class="f-r" href="javascript:void(0);" @click="showType">添加/删除报告类型</a>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
  <p class="btns">
    <button type="button" class="btn my-btn draft-btn" @click="cancelShow = true">取消</button>
    <button type="button" class="btn my-btn submit-btn" @click="submit" :disabled="saveAble">保存</button>
  </p>
  <input-report-modal
    :iniReportType="iniCompanyEdit2.reportTypeOption"
    :selected="iniCompanyEdit2.reportTypeArray"
    @saveReportOption="saveReportOption"
    @closeTypeModal="closeTypeModal"
    v-if="inputReportModalShow"></input-report-modal>
  <modal v-if="cancelShow">
    <div slot="body">
      <p class="ta-c">取消后编辑内容将丢弃，确认取消吗？</p>
    </div>
    <div slot="footer">
      <button class="btn my-btn submit-btn" @click="cancelShow = false">
        取消
      </button>
      <button class="btn my-btn cancel-btn" @click="cancel">
        确定
      </button>     
    </div>
  </modal>
  </div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';
import inputReportModal from './inputReportModal.vue';

export default {
  name: 'companyDetail',
  data() {
    return {
      cancelShow: false,
      options: [{
        value: '招商银行',
        label: '招商银行'
      }],
      inputReportModalShow: false,
      company: this.iniCompany2,
      checked: [],
      labelPosition: 'left',
      Rules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入公司编号', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请输入信用代码', trigger: 'blur' }
        ],
        legalPersonTelephone: [
          { required: true, message: '请输入公司法人', trigger: 'blur' }
        ],
        counselorTag: [
          { required: true, message: '请输入参审人员标签', trigger: 'blur' }
        ],
        mainWork: [
          { required: true, message: '请输入经营范围', trigger: 'blur' }
        ],
        openAccountBankName: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        openAccountBankNumber: [
          { required: true, message: '请输入开户账号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    saveAble () {
      if (this.iniCompanyEdit2.name && this.iniCompanyEdit2.number && this.iniCompanyEdit2.creditCode && this.iniCompanyEdit2.legalPersonTelephone && this.iniCompanyEdit2.counselorTag && this.iniCompanyEdit2.mainWork && this.iniCompanyEdit2.openAccountBankName && this.iniCompanyEdit2.openAccountBankNumber) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    saveReportOption (iniReportType) {
      this.$message('保存成功')
      this.iniCompanyEdit2.reportTypeOption = iniReportType
      this.inputReportModalShow = false
    },
    closeTypeModal () {
      this.inputReportModalShow = false
    },
    showType () {
      this.inputReportModalShow = true
    },
    cancel () {
      this.cancelShow = false
      this.$emit('cancel', 2)
    },
    submit () {
      let arr = []
      this.iniCompanyEdit2.reportTypeArray.forEach((item, index) => {
        arr.push({name: item})
      })
      this.iniCompanyEdit2.reportType = arr
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
                data: this.iniCompanyEdit2
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('editSuccess', 2, rep.data.data.companyId)
            this.$message('编辑公司信息成功')
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  props: ['iniCompanyEdit2'],
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
    background-color: #f9fbfe;
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
    background-color: #f9fbfe;
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
