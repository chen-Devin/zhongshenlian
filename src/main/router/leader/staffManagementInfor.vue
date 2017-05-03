<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <department-infor v-for="(DEP, index) in departments"
                      :department="DEP"
                      :key="index"></department-infor>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import departmentInfor from './component/departmentInfor.vue';

export default {
  name: 'staffManagementInfor',
  data() {
    return {
      paths: [
        { name: '职员资料管理', url: '/staff-management-infor', present: true }
      ],
      departments: []
    };
  },
  created() {
    this.getInfo();
  },
  watch: {
    $route: 'getInfo'
  },
  methods: {
    getInfo() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'staffManagement',
              platform: 'web'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.departments = rep.data.data.departmentArray;
        }
      }, (rep) => {});
    }
  },
  components: {
    crumbs,
    departmentInfor
  }
}
</script>

<style lang="sass" scoped>

</style>
