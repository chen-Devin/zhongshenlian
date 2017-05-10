<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <staff-author-list></staff-author-list>
    <department-author v-for="(DEP, index) in departments"
                       :department="DEP"
                       :key="index"></department-author>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import departmentAuthor from './component/departmentAuthor.vue';
import staffAuthorList from './component/staffAuthorList.vue';

export default {
  name: 'staffManagementAuthor',
  data() {
    return {
      paths: [
        { name: '职员权限管理', url: '/author-management-author', present: true }
      ],
      departments: []
    };
  },
  created() {
    this.getDepartmentInfo().then((rep) => {
      for (let i = 0; i < rep.data.data.departmentArray.length; i++) {
        this.getStaffInfo(rep.data.data.departmentArray[i].departmentName).then((rep) => {
          for(let j=0; j < rep.data.data.staffArray.length; j++) {
            let arr = [];
            for(let k=0; k < rep.data.data.authorityArray.length; k++) {
              for(let m=0; m < rep.data.data.staffArray[j].authority.length; m++) {
                if (rep.data.data.authorityArray[k].name === rep.data.data.staffArray[j].authority[m].name) {
                  let obj = {
                    authName: rep.data.data.staffArray[j].authority[m].name,
                    stat: rep.data.data.staffArray[j].authority[m].authority === '0' ? false : true,
                  };
                  arr.push(obj);
                  break;
                }
              }
            }
            rep.data.data.staffArray[j].authority = arr;
          }
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
    departmentAuthor,
    staffAuthorList
  }
}
</script>

<style lang="sass" scoped>

</style>
