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
      <el-form :label-position="labelPosition" label-width = "80px">
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="公司联系人" required  label-width = "90px">
              <el-input type="text" v-model="customerInfo.name" placeholder="请输入公司联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="联系人电话" required label-width = "90px">
              <el-input type="text" v-model="customerInfo.telephone" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="联系人部门">
              <el-input type="text" v-model="customerInfo.department" placeholder="请输入联系人部门"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="资产规模">
              <el-input type="text" v-model="customerInfo.assetSize" placeholder="请输入资产规模">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="联系人职务">
              <el-input type="text" v-model="customerInfo.duty" placeholder="请输入联系人职务"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="可见状态">
              <el-select v-model="value" placeholder="请选择可见状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="separator"></div>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="客户名称" required>
              <el-input type="text" v-model="customerInfo.customerName" placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="经营状态">
              <el-input type="text" v-model="customerInfo.runStatus" placeholder="请输入经营状态"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="社会统一信用代码" label-width="130px" required>
              <el-input type="text" v-model="customerInfo.code" placeholder="请输入社会统一信用代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="公司类型">
              <el-input type="text" v-model="customerInfo.customerNature" placeholder="请输入公司类型"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="公司法人">
              <el-input type="text" v-model="customerInfo.operName" placeholder="请输入公司法人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="注册资金">
              <el-input type="text" v-model="customerInfo.registeredCapital" placeholder="请输入注册资金">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="成立日期">
              <el-input type="text" v-model="customerInfo.setUpTime" placeholder="请输入成立日期"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="注册地址">
              <el-input type="text" v-model="customerInfo.registeredAddress" placeholder="请输入注册地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="所属行业">
              <el-input type="text" v-model="customerInfo.industry" placeholder="请输入所属行业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="电话">
              <el-input type="text" v-model="customerInfo.phoneNumber" placeholder="请输入电话" required></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="经营范围">
              <el-input type="text" v-model="customerInfo.mainWork" placeholder="请输入经营范围"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="separator"></div>
        <el-row class="el-form-item">
          <el-col :span="10" :offset="1">
            <el-form-item label="创建人">
              <span>{{ companyFounder }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="创建时间">
              <span>{{ customerInfo.createAt }}</span>
            </el-form-item>
          </el-col>
        </el-row>
     </el-form>
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
      labelPosition: 'left',
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
        margin-bottom: 20px;
        border-top: 1px solid #e3e3e3;
      }
    }
  }
</style>