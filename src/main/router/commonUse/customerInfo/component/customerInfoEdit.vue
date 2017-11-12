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
       <el-form :label-position="labelPosition" label-width = "90px">
         <el-row>
           <el-col :span="10" :offset="1">
             <el-form-item label="公司联系人：" required  label-width = "100px" v-if="!isEdit">
               <el-input type="text" v-model="newCustomerInfo.name" placeholder="请输入公司联系人"></el-input>
             </el-form-item>
             <p v-else>公司联系人：{{newCustomerInfo.name}}</p>
           </el-col>
           <el-col :span="10" :offset="1">
             <el-form-item label="联系人电话：" required label-width = "100px" v-if="!isEdit">
               <el-input type="text" v-model="newCustomerInfo.telephone" placeholder="请输入联系人电话"></el-input>
             </el-form-item>
             <p v-else>联系人电话：{{newCustomerInfo.telephone}}</p>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10" :offset="1">
             <el-form-item label="联系人部门：" v-if="!isEdit">
               <el-input type="text" v-model="newCustomerInfo.department" placeholder="请输入联系人部门"></el-input>
             </el-form-item> 
             <p v-else><span v-if="newCustomerInfo.department">联系人部门：{{newCustomerInfo.department}}</span>
             <span v-else>联系人部门：暂无</span></p>
           </el-col>
           <el-col :span="10" :offset="1">
             <el-form-item label="资产规模：" v-if="!isEdit">
               <el-input type="text" v-model="newCustomerInfo.assetSize" placeholder="请输入资产规模">
                 <template slot="append">万元</template>
               </el-input>
             </el-form-item>
             <p v-else>
              <span v-if="newCustomerInfo.assetSize">资产规模：{{newCustomerInfo.assetSize}}(万元)</span>
              <span v-else>资产规模：暂无</span>
             </p>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10" :offset="1">
             <el-form-item label="联系人职务：" v-if="!isEdit">
               <el-input type="text" v-model="newCustomerInfo.duty" placeholder="请输入联系人职务"></el-input>
             </el-form-item>
             <p v-else>
              <span v-if="newCustomerInfo.duty">联系人职务：{{newCustomerInfo.duty}}</span>
              <span v-else>联系人职务：暂无</span>
             </p>
           </el-col>
           <el-col :span="10" :offset="1">
             <el-form-item label="可见状态：" v-if="!isEdit">
               <el-select v-model="value" placeholder="请选择可见状态">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
             <p v-else>
              <span v-if="value">可见状态：{{value}}</span>
              <span v-else>可见状态：暂无</span>
             </p>
           </el-col>
         </el-row>
         <div class="separator"></div>
         <el-row>
           <el-col :span="10" :offset="1">
             <p>客户名称：{{ newCustomerInfo.customerName }}</p>
           </el-col>
           <el-col :span="10" :offset="1">
             <p>
              <span v-if="newCustomerInfo.runStatus">经营状态：{{ newCustomerInfo.runStatus }}</span>
              <span v-else>经营状态：暂无</span>
             </p>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10" :offset="1">            
             <p>社会统一信用代码：{{ newCustomerInfo.code }}</p>
           </el-col>
           <el-col :span="10" :offset="1">
             <p>
              <span v-if="newCustomerInfo.customerNature">公司类型：{{ customerNatureMap(newCustomerInfo.customerNature) }}</span>
              <span v-else>公司类型：暂无</span>
             </p>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10" :offset="1">
             <p>
              <span v-if="newCustomerInfo.operName">公司法人：{{ newCustomerInfo.operName }}</span>
              <span v-else>公司法人：暂无</span>
             </p>
           </el-col>
           <el-col :span="10" :offset="1">
             <p>
              <span v-if="newCustomerInfo.registeredCapital">注册资金：{{ newCustomerInfo.registeredCapital }}（万元）</span>
              <span v-else>注册资金：暂无</span>
             </p>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10" :offset="1">
             <p>
              <span v-if="newCustomerInfo.setUpTime">成立日期：{{ newCustomerInfo.setUpTime }}</span>
              <span v-else>成立日期：暂无</span>
             </p>
           </el-col>
           <el-col :span="10" :offset="1">
             <p>
              <span v-if="newCustomerInfo.registeredAddress">注册地址：{{ newCustomerInfo.registeredAddress }}</span>
              <span v-else>注册地址：暂无</span>
             </p>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10" :offset="1">
             <p>
              <span v-if="newCustomerInfo.industry">所属行业：{{ newCustomerInfo.industry }}</span>
              <span v-else>所属行业：暂无</span>
             </p>
           </el-col>
           <el-col :span="10" :offset="1">
             <p> 
              <span v-if="newCustomerInfo.phoneNumber">电话：{{ newCustomerInfo.phoneNumber }}</span>
              <span v-else>电话：暂无</span>
             </p>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="10" :offset="1">
            <p>
              <span v-if="newCustomerInfo.mainWork">经营范围：{{ newCustomerInfo.mainWork }}</span>
              <span v-else>经营范围：暂无</span>
            </p>
           </el-col>
         </el-row>
         <div class="separator"></div>
         <el-row>
           <el-col :span="10" :offset="1">
              <p>创建人：{{ newCustomerInfo.founderName }}</p>
           </el-col>
           <el-col :span="10" :offset="1">
              <p>创建时间：{{ newCustomerInfo.createAt }}</p>
           </el-col>
         </el-row>
      </el-form>
      <!-- <el-row>
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
      </el-row> -->
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
      canEdit: true,
      labelPosition: 'left'
    }
  },
  computed: {
    // customerNature () {
    //   let arr = []
    //   this.newCustomerInfo.customerNature.forEach((item) => {
    //     if (item.state) {
    //       arr.push(item.val)
    //     }
    //   })
    //   return arr.join('、')
    // }
  },
  watch: {
    iniNewCustomerInfo: function(val, oldVal) {
      if (val.id !== oldVal.id) {
        this.newCustomerInfo = val
      }
    }
  },
  methods: {
    customerNatureMap (customerNature) {
      let arr = []
      customerNature.forEach((item) => {
        if (item.state) {
          arr.push(item.val)
        }
      })
      return arr.join('、')
    },
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
            this.$message.success('保存客户信息成功')
            this.$router.push('/customer-infor-list')
            resolve('done');
          } else if (rep.data.statusCode === '10013') {
            this.$message.error('您添加的客户已存在，请检查')
          } else {
            this.$message.error(rep.data.msg)
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
          } else {
            this.$message.error(rep.data.msg)
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