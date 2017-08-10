<template>
  <card class="customer-info-edit">
    <p class="btns f-r">
      <template v-if="!isEdit">
        <button class="btn my-btn submit-btn" @click="save">保存</button>
        <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
      </template>
      <template v-if="isEdit">
        <button class="btn my-btn submit-btn" @click="edit">编辑</button>
        <button class="btn my-btn cancel-btn" @click="deleteCustomer">删除</button>
      </template>
    </p>
    <h4 class="main-title" v-if="!isEdit">客户信息录入</h4>
    <h4 class="main-title" v-if="isEdit">{{ newCustomerInfo.customerName }}</h4>
    <div class="edit-form">
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">客户名称：</span>
            <span>{{ newCustomerInfo.customerName }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">公司联系人:</span>
            <input class="form-control" type="text" placeholder="请输入公司联系人" v-model="newCustomerInfo.name">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <!---->
        <el-col :span="12">
          <p>
            <span class="title">客户ID：</span>
            <span>{{  }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">联系人电话：</span>
            <input class="form-control" type="text" placeholder="请输入联系人电话" v-model="newCustomerInfo.telephone">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">信用代码：</span>
            <span>{{ newCustomerInfo.code }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">联系人职务：</span>
            <input class="form-control" type="text" placeholder="请输入联系人职务" v-model="newCustomerInfo.duty">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <!---->
        <el-col :span="12">
          <p>
            <span class="title">经营范围：</span>
            <span>{{  }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">联系人部门：</span>
            <input class="form-control" type="text" placeholder="请输入联系人部门" v-model="newCustomerInfo.department">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">公司法人：</span>
            <span>{{ newCustomerInfo.legalPersonTelephone }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">注册地址：</span>
            <span>{{ newCustomerInfo.registeredAddress }}</span>
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
            <span class="title">创建人：</span>
            <input class="form-control" type="text" placeholder="请输入创建人" v-model="newCustomerInfo.companyFounder">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">所属行业：</span>
            <span>{{ newCustomerInfo.industry }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">创建时间：</span>
            <input class="form-control" type="text" placeholder="请输入创建时间" v-model="newCustomerInfo.createAt">
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">客户性质：</span>
            <span>{{ newCustomerInfo.customerNatureId }}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span class="title">资产规模：</span>
            <span>{{ newCustomerInfo.assetSize }}（万元）</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>
            <span class="title">注册资本：</span>
            <span>{{ newCustomerInfo.registeredCapital }}（万元）</span>
          </p>
        </el-col>
        <!---->
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
    </div>
  </card>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';

export default {
  name: 'customerModModal',
  data() {
    return {
      paths: [
        { name: '客户信息', url: '/customer-infor-list', present: false },
        { name: '客户信息录入', url: '/customer-infor-list/add', present: true }
      ],
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
      value: ''
    }
  },
  methods: {
    save () {
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

    },
    deleteCustomer () {

    }
  },
  props: ['iniNewCustomerInfo', 'iniIsEdit'],
  components: {
    card
  }
};
</script>

<style lang="sass" scoped>
  .customer-info-edit {
    .edit-form {
      p {
        display: flex;
        line-height: 34px;
        padding: 6px 50px;
        > .title {
          width: 110px;
        }
      }
    }
  }
</style>