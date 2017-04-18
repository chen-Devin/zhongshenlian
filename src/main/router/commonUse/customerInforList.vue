<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <customer-infor v-bind:customers="customers"
                    v-bind:user="user"
                    v-bind:indClassify="indClassify"></customer-infor>
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
      indClassify: [
        '机构组织',
        '农林牧渔',
        '医疗卫生',
        '医药卫生',
        '建筑建材',
        '冶金矿产'
      ]
    };
  },
  props: ['user'],
  created() {
    this.getInfo();
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    getInfo() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getCustomerList',
              platform: 'web'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
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
