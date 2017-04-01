<template>
  <modal>
    <form slot="body">
      <div class="form-group"
           v-bind:class="{'has-error': !customer.name.ver}">
        <label for="customer-name"
               class="control-label">姓名</label>
        <input type="text"
               class="form-control"
               placeholder="请输入客户姓名"
               v-model="customer.name.val">
      </div>
      <div class="form-group"
           v-bind:class="{'has-error': !customer.telephone.ver}">
        <label for="customer-telephone"
               class="control-label">手机号</label>
        <input type="tele"
               class="form-control"
               placeholder="请输入客户手机号码"
               v-model="customer.telephone.val">
      </div>
      <div class="form-group" 
           v-bind:class="{'has-error': !customer.customerNature.ver}">
        <label for="customer-nature"
               class="control-label">客户性质</label>
        <input type="text"
               class="form-control"
               placeholder="请输入客户性质"
               v-model="customer.customerNature.val">
      </div>
      <div class="form-group"
           v-bind:class="{'has-error': !customer.businessLicenseNumber.ver}">
        <label for="customer-business-license-number"
               class="control-label">营业执照号码</label>
        <input type="text"
               class="form-control"
               placeholder="请输入客户营业执照号码"
               v-model="customer.businessLicenseNumber.val">
      </div>
      <div class="form-group">
        <label for="customer-set-up-time"
               class="control-label">成立日期</label>
        <input type="text"
               class="form-control"
               placeholder="请输入客户成立日期"
               v-model="customer.setUpTime.val">
      </div>
      <div class="form-group"
           v-bind:class="{'has-error': !customer.registeredCapital.ver}">
        <label for="customer-registered-capital"
               class="control-label">注册资本</label>
        <input type="text"
               class="form-control"
               placeholder="请输入客户注册资本"
               v-model="customer.registeredCapital.val">
      </div>
      <div class="form-group"
           v-bind:class="{'has-error': !customer.assetSize.ver}">
        <label for="customer-asset-size"
               class="control-label">资产规模</label>
        <input type="text"
               class="form-control"
               placeholder="请输入客户资产规模"
               readonly
               v-model="customer.assetSize.val">
      </div>
      <div class="form-group">
        <label for="customer-industry"
               class="control-label">所属行业</label>
        <input type="text"
               class="form-control"
               placeholder="请输入客户所属行业"
               v-model="customer.industry.val">
      </div>
      <div class="form-group">
        <label for="customer-id"
               class="control-label">客户编号</label>
        <p class="form-control-static">
          {{customer.id.val}}
        </p>
      </div>
      <div class="form-group">
        <label for="customer-department-name"
               class="control-label">业务部门</label>
        <p class="form-control-static">
          {{customer.departmentName.val}}
        </p>
      </div>
      <div class="form-group">
        <label for="customer-founder-name"
               class="control-label">创建人</label>
        <p class="form-control-static">
          {{customer.founderName.val}}
        </p>
      </div>
      <div class="alert alert-danger well-sm"
           v-show="alert.show">
        {{alert.cont}}
      </div>
    </form>
    <div slot="footer">
      <button class="btn btn-primary modal-default-button"
              v-on:click="save()"
              v-bind:disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn btn-default modal-default-button"
              v-on:click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from './modal.vue';

export default {
  name: 'modCustomerModal',
  data() {
    return {
      customer: (() => {
        return {
          id: {
            val: this.initalCustomer.id
          },
          name: {
            val: this.initalCustomer.name,
            ver: this.initalCustomer.name === '' ? false : true
          },
          telephone: {
            val: this.initalCustomer.telephone,
            ver: (() => {
              let reg = /^(1+\d{10})$/;
              if (this.initalCustomer.telephone === '') {
                return false;
              } else if (!reg.test(this.initalCustomer.telephone)) {
                return false;
              } else {
                return true;
              }
            })()
          },
          businessLicenseNumber: {
            val: this.initalCustomer.businessLicenseNumber,
            ver: this.initalCustomer.businessLicenseNumber === '' ? false : true
          },
          registeredCapital: {
            val: this.registeredCapital.registeredCapital,
            ver: this.registeredCapital.registeredCapital === '' ? false : true
          },
          customerNature: {
            val: this.initalCustomer.customerNature,
            ver: this.initalCustomer.customerNature === '' ? false : true
          },
          assetSize: {
            val: this.initalCustomer.assetSize,
            ver: this.initalCustomer.assetSize === '' ? false : true
          },
          industry: {
            val: this.initalCustomer.industry,
            ver: this.initalCustomer.industry === '' ? false : true
          },
          setUpTime: {
            val: this.initalCustomer.setUpTime,
            ver: this.initalCustomer.setUpTime === '' ? false : true
          },
          founderId: {
            val: this.initalCustomer.founderId
          },
          founderName: {
            val: this.initalCustomer.founderName
          },
          departmentName: {
            val: this.initalCustomer.departmentName
          }
        }
      })(),
      alert: {
        show: false,
        cont: ''
      },
      subBtn: {
        dis: false,
        cont: '保存'
      }
    };
  },
  props: ['initalCustomer'],
  methods: {
    save() {
      let reg = /^(1+\d{10})$/;
      this.alert.show = false;
      this.alert.cont = '';
      if (this.customer.name.val === '') {
        this.customer.name.ver = false;
      } else {
        this.customer.name.ver = true;
      }
      if (this.customer.telephone.val === '') {
        this.customer.telephone.ver = false;
      } else if (!reg.test(this.customer.telephone.val)) {
        this.customer.telephone.ver = false;
      } else {
        this.customer.telephone.ver = true;
      }
      if (this.customer.businessLicenseNumber.val === '') {
        this.customer.businessLicenseNumber.ver = false;
      } else {
        this.customer.businessLicenseNumber.ver = true;
      }
      if (this.customer.registeredCapital.val === '') {
        this.customer.registeredCapital.ver = false;
      } else {
        this.customer.registeredCapital.ver = true;
      }
      if (this.customer.customerNature.val === '') {
        this.customer.customerNature.ver = false;
      } else {
        this.customer.customerNature.ver = true;
      }
      if (this.customer.assetSize.val === '') {
        this.customer.assetSize.ver = false;
      } else {
        this.customer.assetSize.ver = true;
      }
      if (this.customer.industry.val === '') {
        this.customer.industry.ver = false;
      } else {
        this.customer.industry.ver = true;
      }
      if (this.customer.setUpTime.val === '') {
        this.customer.setUpTime.ver = false;
      } else {
        this.customer.setUpTime.ver = true;
      }
      if (!(this.customer.name.ver && this.customer.telephone.ver && this.customer.businessLicenseNumber.val && this.customer.registeredCapital.ver && this.customer.customerNature.ver && this.customer.assetSize.ver && this.customer.industry.ver && this.customer.setUpTime.ver)) {
        this.alert.show = true;
        this.alert.cont = '您有信息尚未输入或信息格式有误，请检查';
      } else {
        this.subBtn.dis = true;
        this.subBtn.cont = '保存中...';
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              var obj = {
                command: 'editCustomerInfo',
                platform: 'web',
                data: {
                  id: this.customer.id.val,
                  name: this.customer.name.val,
                  telephone: this.customer.telephone.val,
                  businessLicenseNumber: this.customer.businessLicenseNumber.val,
                  registeredCapital: this.customer.registeredCapital.val,
                  customerNature: this.customer.customerNature.val,
                  assetSize: this.customer.assetSize.val,
                  industry: this.customer.industry.val,
                  setUpTime: this.customer.setUpTime.val,
                  founderId: this.customer.founderId.val,
                  founderName: this.customer.founderName.val,
                  departmentName: this.customer.departmentName.val
                }
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.subBtn.cont = '已保存';
            this.$emit('saved', this.customer);
          }
        }, (rep) => {});
      }
    },
    cancel() {
      this.$emit('canceled');
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>

</style>
