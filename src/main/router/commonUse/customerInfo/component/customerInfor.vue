<template>
  <card>
    <h3 class="main-title">
      客户列表
      <!-- <router-link :to="{ path: '/customer-info-list/add' }"> -->
        <button class="btn my-btn submit-btn pull-right" @click="add">
          <!-- <img class="input-icon" src="../../../../img/market/input.svg">&nbsp; -->
          录入
        </button>
      <!-- </router-link> -->
    </h3>
    <!--搜索栏-->
    <form class="search-form" @submit.prevent @keyup.enter.prevent>
      <div class="row">
        <div class="col-md-11">
          <search-bar placeholder="请输入客户关键字进行搜索" @search="search" v-show="simpleSearch"></search-bar>
        </div>
        <div class="col-md-11 replace" v-show="!simpleSearch"></div>
        <div class="col-md-1 higher-search f-r">
          <button class="btn my-btn high-btn f-r customer-high-search" type="button" @click="showHigherSearch()">
            高级搜索
            &nbsp;
            <img class="search-icon" v-if="searchDown" src="../../../../../img/market/search_down.svg">
            <img class="search-icon" v-if="searchUp" src="../../../../../img/market/search_up.svg">
          </button>
        </div>
      </div>
    </form>
    <!--高级搜索-->
    <form class="form-inline higherForm" v-if="higherSearch">
      <div class="row">
        <div class="col-md-11">
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="customerName">客户名称</label>
              <input type="text" class="form-control ta-c" id="customerName" placeholder="请填写客户名称" v-model="customerName">
            </div>
          </div>
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="name">客户联系人</label>
              <input type="text" class="form-control ta-c" id="name" placeholder="请填写客户联系人" v-model="name">
            </div>
          </div>
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="telephone">联系人电话</label>
              <input type="text" class="form-control ta-c" id="telephone" placeholder="请填写联系人电话" v-model="telephone">
            </div>
          </div>
        </div>
      </div>
      <div class="search-btns ta-c">
        <button type="button" class="btn my-btn submit-btn" @click="higherSearchEvent()">查找</button>
        <button type="button" class="btn my-btn draft-btn" @click="reset()">重置</button>
      </div>
    </form>
    <table class="table table-bordered table-hover com-list">
      <thead>
        <tr>
          <th class="text-center">客户名称</th>
          <th class="text-center">社会统一信用代码</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(CUSTOMER, index) in thisCustomers"
            :key="index">
          <td class="text-center">{{CUSTOMER.customerName}}</td>
          <td class="text-center">{{CUSTOMER.code}}</td>
          <td class="text-center link-wrap">
            <a class="text-primary"
               @click.prevent="mod(CUSTOMER)">查看</a>
          </td>
        </tr>
      </tbody>
    </table>
    <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="currentChange"></my-pagination>
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
      name: '',
      telephone: ''
    };
  },
  props: ['customers', 'page'],
  methods: {
    search(searchCont) {
      this.listType = 'search';
      this.$emit('search', searchCont);
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
      this.$router.push('/customer-infor-list/detail/' + CUSTOMER.id)
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
