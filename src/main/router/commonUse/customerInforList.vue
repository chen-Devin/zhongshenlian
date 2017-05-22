<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <customer-infor :customers="customers"
                    :user="user"
                    :page="page"
                    @pageChan="pageChan"
                    @search="search"></customer-infor>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import customerInfor from './component/customerInfor.vue';

export default {
  name: 'customerInforList',
  data() {
    return {
      paths: [
        { name: '客户信息', url: '/customer-infor-list', present: true }
      ],
      customers: [],
      page: {
        total: 0,
        current: 0
      },
      searchCont: ''
    };
  },
  props: ['user'],
  created() {
    this.getInfo(1);
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    search(searchCont) {
      this.searchCont = searchCont;
      if(this.searchCont === '') {
        this.getInfo(1);
      } else {
        this.seaInfo(1);
      }
    },
    pageChan(newPage) {
      if (this.searchCont === '') {
        this.getInfo(newPage);
      } else {
        this.seaInfo(newPage);
      }
    },
    getInfo(newPage) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getCustomerList',
              platform: 'web',
              pageNum: newPage
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.page.total = parseInt(rep.data.data.totalNum);
          this.page.current = newPage;
          this.customers.length = 0;
          for (let i = 0; i < rep.data.data.customerArray.length; i++) {
            let obj = {
              id: rep.data.data.customerArray[i].id,
              customerName: rep.data.data.customerArray[i].customerName,
              name: rep.data.data.customerArray[i].name,
              telephone: rep.data.data.customerArray[i].telephone,
              duty: rep.data.data.customerArray[i].duty,
              department: rep.data.data.customerArray[i].department,
              registeredAddress: rep.data.data.customerArray[i].registeredAddress,
              mailingAddress: rep.data.data.customerArray[i].mailingAddress,
              businessLicenseNumber: rep.data.data.customerArray[i].businessLicenseNumber,
              registeredCapital: rep.data.data.customerArray[i].registeredCapital,
              customerNature: rep.data.data.customerArray[i].customerNature,
              assetSize: rep.data.data.customerArray[i].assetSize,
              industry: rep.data.data.customerArray[i].industry,
              setUpTime: rep.data.data.customerArray[i].setUpTime,
              founderId: rep.data.data.customerArray[i].founderId,
              founderName: rep.data.data.customerArray[i].founderName,
              founderDepartment: rep.data.data.customerArray[i].founderDepartment
            };
            this.customers.push(obj);
          }
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    seaInfo(newPage) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'searchCustomer',
              platform: 'web',
              searchContent: this.searchCont,
              pageNum: newPage
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.page.total = parseInt(rep.data.data.totalNum);
          this.page.current = newPage;
          this.customers.length = 0;
          for (let i = 0; i < rep.data.data.customerArray.length; i++) {
            let obj = {
              id: rep.data.data.customerArray[i].id,
              customerName: rep.data.data.customerArray[i].customerName,
              name: rep.data.data.customerArray[i].name,
              telephone: rep.data.data.customerArray[i].telephone,
              duty: rep.data.data.customerArray[i].duty,
              department: rep.data.data.customerArray[i].department,
              registeredAddress: rep.data.data.customerArray[i].registeredAddress,
              mailingAddress: rep.data.data.customerArray[i].mailingAddress,
              businessLicenseNumber: rep.data.data.customerArray[i].businessLicenseNumber,
              registeredCapital: rep.data.data.customerArray[i].registeredCapital,
              customerNature: rep.data.data.customerArray[i].customerNature,
              assetSize: rep.data.data.customerArray[i].assetSize,
              industry: rep.data.data.customerArray[i].industry,
              setUpTime: rep.data.data.customerArray[i].setUpTime,
              founderId: rep.data.data.customerArray[i].founderId,
              founderName: rep.data.data.customerArray[i].founderName,
              founderDepartment: rep.data.data.customerArray[i].founderDepartment
            };
            this.customers.push(obj);
          }
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    }
  },
  components: {
    crumbs,
    customerInfor
  }
}
</script>

<style lang="sass" scoped>
</style>
