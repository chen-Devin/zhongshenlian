<template>
  <div class="customer-info-add">
    <crumbs :paths="paths"></crumbs>
    <card v-if="initInput">
      <h1 class="title">客户信息录入</h1>
      <p>请输入企业全称或社会统一信用代码获取工商局返回信息</p>
      <div class="message-box">
        <el-row>
          <el-col :span="12">
            <p>
              <span>客户名称</span>
              <input class="form-control" type="text" v-model="customer.customerName" placeholder="请输入客户名称">
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <span>信用代码</span>
              <input class="form-control" type="text" v-model="customer.code" placeholder="请输入信用代码">
            </p>
          </el-col>
        </el-row>
      </div>
      <p>
        <button class="btn my-btn submit-btn" type="button" :disabled="disSubmit" @click="submit">确定</button>
      </p>
    </card>
    <modal class="load-modal" v-if="modalShow">
      <div slot="body" class="loading">
        <template v-if="loading">
          <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </template>
        <i class="fa fa-check-circle fa-3x" aria-hidden="true" v-if="success"></i>
        <i class="fa fa-info-circle fa-3x" aria-hidden="true" v-if="fail"></i>
      </div>
      <div slot="footer">
        <p class="ta-c" v-if="loading">
          正在从工商局获取信息中，请稍后...
        </p>
        <p class="ta-c" v-if="success">
          获取成功
        </p>
        <p class="ta-c" v-if="fail">
          获取失败，请重新输入企业名称及社会统一信用代码
        </p>
      </div>
    </modal>
    <customer-info-edit v-if="inputEdit" :iniNewCustomerInfo="newCustomerInfo" :iniIsEdit="isEdit"></customer-info-edit>
  </div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import crumbs from '@/main/component/crumbs.vue';
import modal from '@/main/component/modal.vue';
import customerInfoEdit from './customerInfoEdit.vue';

export default {
  name: 'customerModModal',
  data() {
    return {
      paths: [
        { name: '客户信息', url: '/customer-infor-list', present: false },
        { name: '客户信息录入', url: '/customer-infor-list/add', present: true }
      ],
      initInput: true,
      inputEdit: false,
      modalShow: false,
      loading: true,
      success: false,
      fail: false,
      options: [{
        value: '同部门之间可见',
        label: '同部门之间可见'
      }, {
        value: '同部门之间不可见',
        label: '同部门之间不可见'
      }],
      customer: {
        customerName: '',
        code: ''
      },
      newCustomerInfo: {
        id: '',
        customerName: '',
        name: '',
        telephone: '',
        duty: '',
        department: '',
        registeredAddress: '',
        mailingAddress: '',
        businessLicenseNumber: '',
        registeredCapital: '',
        customerNature: '',
        assetSize: '',
        setUpTime: '',
        industry: '',
        companyFounder: '',
        founderId: '',
        founderName: '',
        founderDepartment: '',
        code: '',
        legalPersonTelephone: '',
        mainWork: '',
        customerIndustryId: '',
        customerNatureId: '',
        removedStatus: '',
        createAt: '',
        updateAt: ''
      },
      isEdit: false
    }
  },
  computed: {
    disSubmit () {
      if (this.customer.customerName === '' && this.customer.code === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    submit () {
      this.modalShow = true
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'entryCustomerInfo',
                platform: 'web',
                customerName: this.customer.customerName,
                code: this.customer.code
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.newCustomerInfo = rep.data.data
            this.loading = false
            this.success = true
            setTimeout(() => {
              this.modalShow = false
              this.loading = true
              this.success = false
              this.initInput = false
              this.inputEdit = true
            }, 1000)
            resolve('done');
          } else {
            this.loading = false
            this.fail = true
            setTimeout(() => {
              this.customer = {
                customerName: '',
                code: ''
              }
              this.modalShow = false
              this.$message(rep.data.msg)
            }, 1000)
          }
        }, (rep) => { });
      })
    }
  },
  components: {
    card,
    crumbs,
    modal,
    customerInfoEdit
  }
};
</script>

<style lang="sass" scoped>
  .customer-info-add {
    .title {
      font-size: 18px;
      text-align: center;
      + p {
        font-size: 13px;
        text-align: center;
      }
    }
    .message-box {
      background-color: #fafafa;
      padding: 20px 50px;
      p {
        display: flex;
        line-height: 34px;
        padding: 0 20px;
        span {
          width: 88px;
        }
      }
      + p {
        margin-top: 20px;
        text-align: center;
      }
    }
    .load-modal {
      .loading {
        text-align: center;
        font-size: 15px;
      }
    }
  }
</style>