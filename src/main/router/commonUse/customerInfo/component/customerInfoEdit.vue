<template>
<div>
  <card class="customer-info-edit">
    <p class="btns f-r">
      <template v-if="!isEdit">
        <button class="btn my-btn submit-btn" @click="save">保存</button>
        <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
      </template>
      <template v-if="isEdit">
        <button class="btn my-btn submit-btn" @click="edit" v-if="canEdit">编辑</button>
        <button class="btn my-btn cancel-btn" @click="deleteCustomerShow">删除</button>
      </template>
    </p>
    <h4 class="main-title" v-if="!isEdit">客户信息录入</h4>
    <h4 class="main-title" v-if="isEdit">
      {{ newCustomerInfo.customerName === ''? '未命名': newCustomerInfo.customerName }}</h4>
    <div class="edit-form">
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">公司联系人:</span>
            <input class="form-control" type="text" placeholder="请输入公司联系人" v-model="newCustomerInfo.name"  v-if="!isEdit">
            <span v-if="isEdit">{{ newCustomerInfo.name }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">联系人电话：</span>
            <input class="form-control" type="text" placeholder="请输入联系人电话" v-model="newCustomerInfo.telephone" v-if="!isEdit">
            <span v-if="isEdit">{{ newCustomerInfo.telephone }}</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">联系人部门：</span>
            <input class="form-control" type="text" placeholder="请输入联系人部门" v-model="newCustomerInfo.department" v-if="!isEdit">
            <span v-if="isEdit">{{ newCustomerInfo.department }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">资产规模：</span>
            <input class="form-control" type="text" placeholder="请输入联系人部门" v-model="newCustomerInfo.assetSize" v-if="!isEdit">
            <span v-if="isEdit">{{ newCustomerInfo.assetSize }}（万元）</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">联系人职务：</span>
            <input class="form-control" type="text" placeholder="请输入联系人职务" v-model="newCustomerInfo.duty" v-if="!isEdit">
            <span v-if="isEdit">{{ newCustomerInfo.duty }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">可见状态：</span>
            <el-select v-model="value" placeholder="请选择可见状态" v-if="!isEdit">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- 可见状态 -->
            <span v-if="isEdit"></span>
          </p>
        </el-col>
      </el-row>
      <div class="separator"></div>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">客户名称：</span>
            <span>{{ newCustomerInfo.customerName }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">经营状态：</span>
            <span>{{ newCustomerInfo.runStatus }}</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title" style="width:130px;">社会统一信用代码：</span>
            <span>{{ newCustomerInfo.code }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">公司类型：</span>
            <span>{{ newCustomerInfo.customerNature }}</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">公司法人：</span>
            <span>{{ newCustomerInfo.operName }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">注册资金：</span>
            <span>{{ newCustomerInfo.registeredCapital }}（万元）</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">成立日期：</span>
            <span>{{ newCustomerInfo.setUpTime }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">注册地址：</span>
            <span>{{ newCustomerInfo.registeredAddress }}</span>
          </p>
        </el-col>
      </el-row>
        <el-col :span="12">
          <p>
            <span class="title">所属行业：</span>
            <span>{{ newCustomerInfo.industry }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">电话：</span>
            <span>{{ newCustomerInfo.phoneNumber }}</span>
          </p>
        </el-col>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">经营范围：</span>
            <span>{{ newCustomerInfo.mainWork }}</span>
          </p>
        </el-col>
      </el-row>
      <div class="separator"></div>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">创建人：</span>
            <span>{{ newCustomerInfo.founderName }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">创建时间：</span>
            <span>{{ newCustomerInfo.createAt }}</span>
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
      newCustomerInfo: this.iniNewCustomerInfo,
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
      user: {},
      showDeleteCustomer: false,
      canEdit: true
    }
  },
  computed: {
    
  },
  watch: {
    iniNewCustomerInfo: function(val, oldVal) {
      if (val.id !== oldVal.id) {
        this.newCustomerInfo = val
      }
    }
  },
  methods: {
    save () {
      if (!this.isEdit) {
        this.saveCommand = 'editCustomerInfo'
      } else {
        this.saveCommand = 'addCustomerInfo'
      }
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: this.saveCommand,
                platform: 'web',
                data: this.newCustomerInfo
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
                id: this.newCustomerInfo.id
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
    }
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
      if (this.user.department === '办公室') {
        this.user.authority.forEach((item, index, array) => {
          if (item.name === "客户信息修改") {
            if (item.authority === "0") {
              this.canEdit = false
            }
          }
        })
      }
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