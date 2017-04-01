<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <department-card-infor v-for="(DEP, index) in departments"
                           v-bind:department="DEP"
                           v-bind:key="index"></department-card-infor>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import departmentCardInfor from '../../component/departmentCardInfor.vue';

export default {
  name: 'inforManagement',
  data() {
    return {
      paths: [
        { name: '职员管理', url: '/infor-management', present: false },
        { name: '资料管理', url: '/infor-management', present: true },
      ],
      departments: []
    };
  },
  created() {
    this.getInfo();
  },
  watch: {
    '$route': 'getInfo'
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
      }).then(
        (rep) => {
          if (rep.data.statusCode === '10001') {
            this.departments = rep.data.data.departmentArray;
          }
        }, (rep) => {

        }
        );
    }
  },
  components: {
    crumbs,
    departmentCardInfor
  }
}
</script>

<style lang="sass" scoped>

</style>
