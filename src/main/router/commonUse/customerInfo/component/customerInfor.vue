<template>
  <card>
    <h3 class="main-title">
      客户信息
      <!-- <router-link :to="{ path: '/customer-info-list/add' }"> -->
        <button class="btn my-btn submit-btn pull-right f-r" @click="add" v-show="enteringShow">
          <!-- <img class="input-icon" src="../../../../img/market/input.svg">&nbsp; -->
          客户录入
        </button>
      <!-- </router-link> -->
        <search-bar 
          class="f-r"
          :searchItems="searchItems"
          @search="search"></search-bar>
    </h3>
    <table class="table table-bordered table-hover table-list">
      <thead>
        <tr>
          <th class="text-center">客户名称</th>
          <th class="text-center">社会统一信用代码</th>
          <th class="text-center">录入时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(CUSTOMER, index) in thisCustomers"
            :key="index"
            @click.prevent="mod(CUSTOMER)">
          <td class="text-center link-wrap">{{CUSTOMER.customerName}}</td>
          <td class="text-center">{{CUSTOMER.code || '暂无'}}</td>
          <td class="text-center">
            {{CUSTOMER.setUpTime}}
          </td>
        </tr>
      </tbody>
    </table>
    <p class="empty-list-p" v-if="thisCustomers.length === 0">暂无数据</p>
    <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="currentChange" v-if="reloadPagination"></my-pagination>
  </card>
</template>

<script>
import card from '@/main/component/card.vue';
import searchBar from '@/main/component/searchBar.vue';
import myPagination from '@/main/component/pagination.vue';

export default {
  name: 'customerInfor',
  data() {
    return {
      thisCustomers: this.customers,
      showModModal: false,
      modCustomer: {},
      enteringShow: true,
      showDelModal: false,
      delCustomer: {},
      showAddModal: false,
      addCustomer: {},
      user: {},
      totalPage: 1,
      higherSearch: false,
      simpleSearch: true,
      searchDown: true,
      searchUp: false,
      customerName: '',
      reloadPagination: true,
      name: '',
      telephone: '',
      searchItems: [
        {
          label: '客户名称',
          value: 'customerName'
        }
      ]
    };
  },
  props: ['customers', 'page'],
  methods: {
    search(obj) {
      this.listType = 'search';
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500)
      this.$emit('search', obj);
    },
    higherSearchEvent() {
      this.listType = 'higherSearch';
      let searchObj = {};
      searchObj.customerName = this.customerName;
      searchObj.name = this.name;
      searchObj.telephone = this.telephone;
      this.$emit('higherSearchEvent', searchObj);
    },
    currentChange(newPage) {
      this.$emit('pageChan', newPage);
    },
    mod(CUSTOMER) {
      let routeData = this.$router.resolve({ path: '/customer-infor-list/detail/' + CUSTOMER.id});
      window.open(routeData.href, '_blank');
    },
    del(CUSTOMER) {
      this.delCustomer = CUSTOMER;
      this.showModModal = false;
      this.showDelModal = true;
    },
    add() {
      this.$router.push('/customer-infor-list/add')
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
    },
    //高级搜索与简单搜索切换
    showHigherSearch() {
      if (this.higherSearch === false) {
        this.higherSearch = true;
        this.simpleSearch = false;
        this.searchUp = true;
        this.searchDown = false;
      } else {
        this.higherSearch = false;
        this.simpleSearch = true;
        this.searchUp = false;
        this.searchDown = true;
      }
    },
    reset() {
      this.customerName = '';
      this.name = '';
      this.telephone = '';
      this.search('');
    }
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
      this.$store.getters.getUser.Jurisdiction[4].authority == 0 ? this.enteringShow = false : this.enteringShow = true;
    }, () => { });
  },
  components: {
    card,
    searchBar,
    myPagination
  }
};
</script>

<style lang="sass" scoped>
.text-center {
  text-align: left;
  padding-left:55px;
}
.pull-right {
  margin-right: 10px;
}
.f-r {
    float: right;
  }
.com-list {
  border: 1px solid #E6E6E6;
  thead {
    background-color: #E6E6E6;
  }
  .link-wrap {
    a:hover {
      cursor: pointer;
    }
  }
}
.input-icon {
  margin-top: -2px;
}
.search-form {
  padding-left: 0;
  padding-right: 0;
  margin-top: 30px;
  .customer-high-search {
    margin-top: 0;
  }
}
.search-btns {
  margin-top: 20px;
}
.higherForm {
  margin-top: -35px;
  .form-group {
    width: 100%;
    label {
      width: 25%;
    }
    input {
      width: 70%;
    }
  }
}
.normal-wrap {
    margin-top: 0;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
}
</style>
