<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <staff-infor-list></staff-infor-list>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import staffInforList from './component/staffInforList.vue';

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
    this.getDepartmentInfo().then((rep) => {
      for (let i = 0; i < rep.data.data.departmentArray.length; i++) {
        this.getStaffInfo(rep.data.data.departmentArray[i].departmentName).then((rep) => {
          this.departments.push(rep.data.data);
        }, (rep) => {});
      }
    }, (rep) => { });
  },
  watch: {
    $route: 'getDepartmentInfo'
  },
  methods: {
    getDepartmentInfo() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getDepartmentList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            reject(rep);
          }
        }, (rep) => { });
      });
      return promise;
    },
    getStaffInfo(department) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getStaffArrayByDepartment',
                platform: 'web',
                department: department,
                pageNum: 1
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            reject(rep);
          }
        }, (rep) => { });
      });
      return promise;
    }
  },
  components: {
    crumbs,
    staffInforList
  }
}
</script>

<style lang="sass" scoped>

</style>
