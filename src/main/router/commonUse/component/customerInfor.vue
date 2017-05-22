<template>
  <card>
    <h3 class="main-title">
      客户列表
      <button class="btn my-btn submit-btn pull-right"
              @click="add()">
        <!-- <img class="input-icon" src="../../../../img/market/input.svg">&nbsp; -->
        录入
      </button>
    </h3>
    <search-bar placeholder="请输入客户关键字进行搜索" @search="search"></search-bar>
    <table class="table table-bordered table-hover com-list">
      <thead>
        <tr>
          <th class="text-center">客户名称</th>
          <th class="text-center">客户联系人</th>
          <th class="text-center">联系人职位</th>
          <th class="text-center">联系人电话</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(CUSTOMER, index) in thisCustomers"
            :key="index">
          <td class="text-center">{{CUSTOMER.customerName}}</td>
          <td class="text-center">{{CUSTOMER.name}}</td>
          <td class="text-center">{{CUSTOMER.duty}}</td>
          <td class="text-center">{{CUSTOMER.telephone}}</td>
          <td class="text-center link-wrap">
            <a class="text-primary"
               @click.prevent="mod(CUSTOMER)">修改</a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pager :pageCount="page.total"
           :currentPage="page.current"
           @change="pageChan"></pager> -->
    <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="currentChange"></my-pagination>
    <customer-mod-modal v-if="showModModal"
                        :initalCustomer="modCustomer"
                        @del="del"
                        @saved="saved"
                        @canceled="modCanceled"></customer-mod-modal>
    <customer-del-modal v-if="showDelModal"
                        :initalCustomer="delCustomer"
                        @deleted="deleted"
                        @canceled="delCanceled"></customer-del-modal>
    <customer-add-modal v-if="showAddModal"
                        :user="user"
                        @added="added"
                        @canceled="addCanceled"></customer-add-modal>
  </card>
</template>

<script>
import card from '../../../component/card.vue';
import searchBar from '../../../component/searchBar.vue';
import pager from '../../../component/pager.vue';
import customerModModal from './customerModModal.vue';
import customerDelModal from './customerDelModal.vue';
import customerAddModal from './customerAddModal.vue';
import myPagination from '../../../component/pagination.vue';

export default {
  name: 'customerInfor',
  data() {
    return {
      thisCustomers: this.customers,
      showModModal: false,
      modCustomer: {},
      showDelModal: false,
      delCustomer: {},
      showAddModal: false,
      addCustomer: {},
      totalPage: 1
    };
  },
  props: ['customers', 'user', 'page'],
  methods: {
    search(searchCont) {
      this.$emit('search', searchCont);
    },
    currentChange(newPage) {
      this.$emit('pageChan', newPage);
    },
    mod(CUSTOMER) {
      this.modCustomer = CUSTOMER;
      this.showModModal = true;
    },
    del(CUSTOMER) {
      this.delCustomer = CUSTOMER;
      this.showModModal = false;
      this.showDelModal = true;
    },
    add() {
      this.addCustomer = {};
      this.showAddModal = true;
    },
    saved(modedCustomer) {
      for (let i=0; i < this.thisCustomers.length; i++) {
        if (this.thisCustomers[i].id === modedCustomer.id) {
          this.thisCustomers[i].customerName = this.customer.customerName.val;
          this.thisCustomers[i].name = this.customer.name.val;
          this.thisCustomers[i].telephone = this.customer.telephone.val;
          this.thisCustomers[i].duty = this.customer.duty.val;
          this.thisCustomers[i].department = this.customer.department.val;
          this.thisCustomers[i].registeredAddress = this.customer.registeredAddress.val;
          this.thisCustomers[i].mailingAddress = this.customer.mailingAddress.val;
          this.thisCustomers[i].businessLicenseNumber = this.customer.businessLicenseNumber.val;
          this.thisCustomers[i].registeredCapital = this.customer.registeredCapital.val;
          this.thisCustomers[i].customerNature = this.customer.customerNature;
          this.thisCustomers[i].assetSize = this.customer.assetSize.val;
          this.thisCustomers[i].industry = this.customer.industry.val;
          this.thisCustomers[i].setUpTime = this.customer.setUpTime.val;
          this.thisCustomers[i].founderId = this.customer.founderId.val;
          this.thisCustomers[i].founderName = this.customer.founderName.val;
          this.thisCustomers[i].founderDepartment = this.customer.founderDepartment.val;
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
      this.showModModal = true;
    },
    added(addedCustomer) {
      let cus = {};
      cus.id = addedCustomer.id.val;
      cus.customerName = addedCustomer.customerName.val;
      cus.name = addedCustomer.name.val;
      cus.telephone = addedCustomer.telephone.val;
      cus.duty = addedCustomer.duty.val;
      cus.department = addedCustomer.department.val;
      cus.registeredAddress = addedCustomer.registeredAddress.val;
      cus.mailingAddress = addedCustomer.mailingAddress.val;
      cus.businessLicenseNumber = addedCustomer.businessLicenseNumber.val;
      cus.registeredCapital = addedCustomer.registeredCapital.val;
      cus.customerNature = addedCustomer.customerNature;
      cus.assetSize = addedCustomer.assetSize.val;
      cus.industry = addedCustomer.industry.val;
      cus.setUpTime = addedCustomer.setUpTime.val;
      cus.founderId = addedCustomer.founderId.val;
      cus.founderName = addedCustomer.founderName.val;
      cus.founderDepartment = addedCustomer.founderDepartment.val;
      this.thisCustomers.push(cus);
      this.showAddModal = false;
    },
    addCanceled() {
      this.showAddModal = false;
    }
  },
  components: {
    card,
    searchBar,
    customerModModal,
    customerDelModal,
    customerAddModal,
    myPagination
  }
};
</script>

<style lang="sass" scoped>
.com-list {
  border: 1px solid #E6E6E6;
  thead {
    background-color: #E6E6E6;
  }
  .link-wrap {
    // width: 45px;
    a:hover {
      cursor: pointer;
    }
  }
}
.input-icon {
  margin-top: -2px;
}
</style>
