<template>
  <card>
    <h3>客户列表</h3>
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th class="text-center">客户姓名</th>
          <th class="text-center">客户性质</th>
          <th class="text-center">营业执照号码</th>
          <th class="text-center">客户编号</th>
          <th class="text-center">&nbsp;</th>
          <th class="text-center">&nbsp;</th>
        </tr>
        <tr v-for="(CUSTOMER, index) in thisCustomers"
            v-bind:key="index">
          <td class="text-center">{{CUSTOMER.name}}</td>
          <td class="text-center">{{CUSTOMER.customerNature}}</td>
          <td class="text-center">{{CUSTOMER.businessLicenseNumber}}</td>
          <td class="text-center">{{CUSTOMER.id}}</td>
          <td class="text-center link-wrap">
            <a class="text-primary"
               v-on:click.prevent="mod(CUSTOMER)">修改</a>
          </td>
          <td class="text-center link-wrap">
            <a class="text-danger"
               v-on:click.prevent="del(CUSTOMER)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <customer-mod-modal v-if="showModModal"
                        v-bind:initalCustomer="modCustomer"
                        v-on:saved="saved"
                        v-on:canceled="modCanceled"></customer-mod-modal>
    <customer-del-modal v-if="showDelModal"
                        v-bind:initalCustomer="delCustomer"
                        v-on:deleted="deleted"
                        v-on:canceled="delCanceled"></customer-del-modal>
  </card>
</template>

<script>
import axios from 'axios';

import card from '../../../component/card.vue';
import customerModModal from './customerModModal.vue';
import customerDelModal from './customerDelModal.vue';

export default {
  name: 'customerInfor',
  data() {
    return {
      thisCustomers: this.customers,
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
      for (let i=0; i < this.thisCustomers.length; i++) {
        if (this.thisCustomers[i].id === modedCustomer.id) {
          this.thisCustomers[i].name = this.customer.name.val;
          this.thisCustomers[i].telephone = this.customer.telephone.val;
          this.thisCustomers[i].businessLicenseNumber = this.customer.businessLicenseNumber.val;
          this.thisCustomers[i].registeredCapital = this.customer.registeredCapital.val;
          this.thisCustomers[i].customerNature = this.customer.customerNature.val;
          this.thisCustomers[i].assetSize = this.customer.assetSize.val;
          this.thisCustomers[i].industry = this.customer.industry.val;
          this.thisCustomers[i].setUpTime = this.customer.setUpTime.val;
          this.thisCustomers[i].founderId = this.customer.founderId.val;
          this.thisCustomers[i].founderName = this.customer.founderName.val;
          this.thisCustomers[i].departmentName = this.customer.departmentName.val;
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
      for (let i=0; i < this.thisCustomers.length; i++) {
        if (this.thisCustomers[i].id === deletedCustomer.id) {
          this.thisCustomers.splice(i, 1);
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
    card,
    customerModModal,
    customerDelModal
  }
};
</script>

<style lang="sass" scoped>
table {
  margin: 20px auto;
  .link-wrap {
    width: 45px;
    a:hover {
      cursor: pointer;
    }
  }
}
</style>
