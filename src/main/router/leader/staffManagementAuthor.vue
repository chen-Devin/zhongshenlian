<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <department-author v-for="(DEP, index) in departments" :department="DEP" :key="index"></department-author>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import departmentAuthor from './component/departmentAuthor.vue';

export default {
  name: 'staffManagementAuthor',
  data() {
    return {
      paths: [
        {name: '职员权限管理', url: '/author-management-author', present: true}
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        method: 'get',
        url: '/service',
        params: {
            data: (()=>{
            var obj = {
                command: 'staffManagement',
                platform: 'web'
            }
            return JSON.stringify(obj);
            })()
        }
      }).then(
          (rep)=>{
            if(rep.data.statusCode === '10001') {
              this.departments = rep.data.data.departmentArray;
              for(let i=0; i < this.departments.length; i++) {
                for(let j=0; j < this.departments[i].staffArray.length; j++) {
                  let arr = [];
                  for(let k=0; k < this.departments[i].authorityArray.length; k++) {
                    for(let m=0; m < this.departments[i].staffArray[j].authority.length; m++) {
                      if (this.departments[i].authorityArray[k].name === this.departments[i].staffArray[j].authority[m].name) {
                        let obj = {
                          authName: this.departments[i].staffArray[j].authority[m].name,
                          stat: this.departments[i].staffArray[j].authority[m].authority === '0' ? false : true,
                        };
                        arr.push(obj);
                        break;
                      }
                    }
                  }
                  this.departments[i].staffArray[j].authority = arr;
                }
              }
            }
          },(rep)=>{});
    }
  },
  components: {
    crumbs,
    departmentAuthor
  }
}
</script>

<style lang="sass" scoped>

</style>
