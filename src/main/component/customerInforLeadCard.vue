<template>
  <section>
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th class="text-center">客户姓名</th>
          <th class="text-center">客户性质</th>
          <th class="text-center">营业执照号码</th>
          <th class="text-center">客户编号</th>
          <th class="text-center">&nbsp;</th>
        </tr>
        <tr v-for="(CUSTOMER, index) in _customers"
            v-bind:key="index">
          <td class="text-center">{{CUSTOMER.name}}</td>
          <td class="text-center">{{CUSTOMER.customerNature}}</td>
          <td class="text-center">{{CUSTOMER.businessLicenseNumber}}</td>
          <td class="text-center">{{CUSTOMER.id}}</td>
          <td class="text-center link-wrap">
            <a class="text-paimary"
               v-on:click.prevent="mod(CUSTOMER)">修改</a>
          </td>
          <td class="link-wrap">
            <a class="text-danger"
               v-on:click.prevent="del(CUSTOMER)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <mod-customer-modal v-if="showModModal"
                        v-bind:initalCustomer="modCustomer"
                        v-on:saved="saved"
                        v-on:canceled="modCanceled"></mod-customer-modal>
    <del-customer-modal v-if="showDelModal"
                        v-bind:initalCustomer="delCustomer"
                        v-on:deleted="deleted"
                        v-on:canceled="delCanceled"></del-customer-modal>
  </section>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';

import modCustomerModal from './modCustomerModal.vue';
import delCustomerModal from './delCustomerModal.vue';

export default {
  name: 'customerInforLeadCard',
  data() {
    return {
      _customers: _.cloneDeep(this.customers),
      showModModal: false,
      modCustomer: {},
      showDelModal: false,
      delCustomer: {},
    };
  },
  props: ['customers'],
  methods: {
    mod(CUSTOMER) {
      this.modCustomer = CUSTOMER;
      this.showModModal = true;
    },
    del(CUSTOMER) {
      this.delCustomer = CUSTOMER;
      this.showDelModal = true;
    },
    saved(modedCustomer) {
      for (let i=0; i < this._customers.length; i++) {
        if (this._customers[i].id === modedCustomer.id) {
          this._customers[i].name = this.customer.name.val;
          this._customers[i].telephone = this.customer.telephone.val;
          this._customers[i].businessLicenseNumber = this.customer.businessLicenseNumber.val;
          this._customers[i].registeredCapital = this.customer.registeredCapital.val;
          this._customers[i].customerNature = this.customer.customerNature.val;
          this._customers[i].assetSize = this.customer.assetSize.val;
          this._customers[i].industry = this.customer.industry.val;
          this._customers[i].setUpTime = this.customer.setUpTime.val;
          this._customers[i].founderId = this.customer.founderId.val;
          this._customers[i].founderName = this.customer.founderName.val;
          this._customers[i].departmentName = this.customer.departmentName.val;
          break;
        }
      }
      this.modCustomer = {};
      this.showModModal = false;
    },
    modCanceled() {
      this.modCustomer = {};
      this.showModModal = false;
    },
    deleted(deletedCustomer) {
      for (let i=0; i < this._customers.length; i++) {
        if (this._customers[i].id === deletedCustomer.id) {
          this._customers[i].splice(i, 1);
          break;
        }
      }
      this.delCustomer = {};
      this.showDelModal = false;
    },
    delCanceled() {
      this.delCustomer = {};
      this.showDelModal = false;
    },
  },
  components: {
    modCustomerModal,
    delCustomerModal
  }
};
</script>

<style lang="sass" scoped>
@import '../../scss/variables.scss';

section {
  position: relative;
  margin: 30px 10px;
  padding: 10px 20px;
  background-color: $origin-color;
  border: 1px solid $section-border;
  box-shadow: 1px 2px 4px $section-border-shadow;
  table {
    margin: 20px auto;
    .link-wrap {
      width: 45px;
      a:hover {
        cursor: pointer;
      }
    }
  }
}
</style>