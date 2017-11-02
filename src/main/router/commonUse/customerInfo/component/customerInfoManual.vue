<template>
<div>
  <card class="customer-info-edit">
    <p class="btns f-r mt-15">
      <template>
        <button class="btn my-btn submit-btn" @click="save">保存</button>
        <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
      </template>
    </p>
    <h4 class="main-title">客户信息录入</h4>
    <div class="edit-form">
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">公司联系人:</span>
            <input class="form-control" type="text" placeholder="请输入公司联系人" v-model="customerInfo.name" >
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">联系人电话：</span>
            <input class="form-control" type="text" placeholder="请输入联系人电话" v-model="customerInfo.telephone">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">联系人部门：</span>
            <input class="form-control" type="text" placeholder="请输入联系人部门" v-model="customerInfo.department">
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">资产规模：</span>
            <input class="form-control" type="text" placeholder="请输入资产规模" v-model="customerInfo.assetSize">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">联系人职务：</span>
            <input class="form-control" type="text" placeholder="请输入联系人职务" v-model="customerInfo.duty">
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">可见状态：</span>
            <el-select v-model="value" placeholder="请选择可见状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
        </el-col>
      </el-row>
      <div class="separator"></div>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">客户名称：</span>
            <input class="form-control" type="text" placeholder="请输入客户名称" v-model="customerInfo.customerName">
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">经营状态：</span>
            <input class="form-control" type="text" placeholder="请输入经营状态" v-model="customerInfo.runStatus">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title" style="width:200px;">社会统一信用代码：</span>
            <input class="form-control" type="text" placeholder="请输入社会统一信用代码" v-model="customerInfo.code">
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">公司类型：</span>
            <input class="form-control" type="text" placeholder="请输入公司类型" v-model="customerInfo.customerNature">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">公司法人：</span>
            <input class="form-control" type="text" placeholder="请输入公司法人" v-model="customerInfo.operName">
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">注册资金：</span>
            <input class="form-control" type="text" placeholder="请输入注册资金" v-model="customerInfo.registeredCapital">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">成立日期：</span>
            <input class="form-control" type="text" placeholder="请输入成立日期" v-model="customerInfo.setUpTime">
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">注册地址：</span>
            <input class="form-control" type="text" placeholder="请输入注册地址" v-model="customerInfo.registeredAddress">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">所属行业：</span>
            <input class="form-control" type="text" placeholder="请输入所属行业" v-model="customerInfo.industry">
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">电话：</span>
            <input class="form-control" type="text" placeholder="请输入电话" v-model="customerInfo.phoneNumber">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">经营范围：</span>
            <input class="form-control" type="text" placeholder="请输入经营范围" v-model="customerInfo.mainWork">
          </p>
        </el-col>
      </el-row>
      <div class="separator"></div>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">创建人：</span>
            <span>{{ companyFounder }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">创建时间：</span>
            <span>{{ customerInfo.createAt }}</span>
          </p>
        </el-col>
      </el-row>
    </div>
  </card>
  <modal v-if="showDeleteCustomer">
    <div slot="body">
      <p>删除客户信息将不可见并无法恢复，确认删除吗？</p>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn" @click="cancelDelete">取消</button>
      <button class="btn my-btn submit-btn" @click="deleteCustomer">确定</button>
    </div>
  </modal>
</div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';

export default {
  name: 'customerModModal',
  data() {
    return {
      customerInfo: this.iniNewCustomerInfo,
      disSubmit: true,
      loading: true,
      success: false,
      fail: false,
      isEdit: this.iniIsEdit,
      options: [{
        value: '同部门之间可见',
        label: '同部门之间可见'
      }, {
        value: '同部门之间不可见',
        label: '同部门之间不可见'
      }],
      value: '',
      companyFounder: '',
      showDeleteCustomer: false
    }
  },
  computed: {
    
  },
  watch: {
    iniNewCustomerInfo: function(val, oldVal) {
      if (val.id !== oldVal.id) {
        this.customerInfo = val
      }
    }
  },
  methods: {
    save () {
      // this.customerInfo = this.value // 可见状态赋值
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'addCustomerInfo',
                platform: 'web',
                data: this.customerInfo
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message('保存客户信息成功')
            this.$router.push('/customer-infor-list')
            resolve('done');
          } else if (rep.data.statusCode === '10013') {
            this.$message('您添加的客户已存在，请检查')
          }
        }, (rep) => { });
      })
    },
    cancel () {
      this.$router.push('/customer-infor-list')
    },
    edit () {
      this.isEdit = !this.isEdit
    },
    deleteCustomerShow () {
      this.showDeleteCustomer = true
    },
    cancelDelete () {
      this.showDeleteCustomer = false
    },
    deleteCustomer () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delCustomerInfo',
                platform: 'web',
                id: this.customerInfo.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message('删除客户信息成功')
            this.$router.push('/customer-infor-list')
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getTime () {
      let nd = new Date()
      let year = nd.getFullYear()
      let month = nd.getMonth() + 1
      let d = nd.getDate()
      let hours = nd.getHours()
      let minutes = nd.getMinutes()
      if (month < 10) {
        month = '0' + month
      }
      if (d < 10) {
        d = '0' + d
      }
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      return year + '-' + month + '-' + d + ' ' + hours + ':' + minutes
    }
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
      this.companyFounder = this.user.name
      this.customerInfo.createAt = this.getTime()
    }, () => { });
  },
  props: ['iniNewCustomerInfo', 'iniIsEdit'],
  components: {
    card,
    modal
  }
};
</script>

<style lang="sass" scoped>
  .customer-info-edit {
    .edit-form {
      padding-top: 20px;
      p {
        display: flex;
        line-height: 34px;
        padding: 6px 50px;
        > .title {
          width: 100px;
        }
      }
      .separator {
        width: 94%;
        margin: 10px auto;
        border-bottom: 1px solid #e3e3e3;
      }
    }
  }
</style>