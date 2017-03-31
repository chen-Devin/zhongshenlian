<template>
  <section>
    <h3>{{department.department}}</h3>
    <form class="form-inline clearfix">
      <search-bar v-model="searchVal"
                  v-on:search="search(searchVal)"
                  v-on:clear="search('')"></search-bar>
      <button type="button"
            class="btn btn-default btn-sm pull-right"
            v-on:click="ediBtnTog()"
            v-bind:disabled="ediBtn.dis">&emsp;{{ediBtn.cont}}&emsp;</button>
    </form>
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th>职员</th>
          <th v-for="(AUTH, index) in department.authorityArray"
              v-bind:key="index">{{AUTH.name}}</th>
        </tr>
        <tr v-for="STAFF in department.staffArray"
            v-bind:key="STAFF.id">
          <td>{{STAFF.name}}</td>
          <td v-for="STAFF_AUTH in STAFF.authority"
              v-bind:key="STAFF.authName">
            <input type="checkbox"
                   v-model="STAFF_AUTH.stat"
                   v-bind:disabled="!ediBtn.ediStat">
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from 'axios';
import searchBar from './searchBar.vue';

export default {
  name: 'departmentCardAuthor',
  data() {
    return {
      searchVal: '',
      ediBtn: {
        dis: false,
        cont: '编辑',
        ediStat: false,
      }
    };
  },
  props: ['department'],
  methods: {
    ediBtnTog() {
      if (this.ediBtn.ediStat) {
        this.ediBtn.dis = true;
        this.ediBtn.cont = '提交...';
        let promiseArr = [];
        for (let i = 0; i < this.department.staffArray.length; i++) {
          let arr = [];
          for (let j = 0; j < this.department.staffArray[i].authority.length; j++) {
            let obj = {
              name: this.department.staffArray[i].authority[j].authName,
              authority: this.department.staffArray[i].authority[j].stat ? '1' : '0'
            };
            arr.push(obj);
          }
          promiseArr.push(new Promise((resolve, reject) => {
            axios({
              headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
              method: 'get',
              url: '/service',
              params: {
                data: (() => {
                  var obj = {
                    command: 'staffAuthorityEdit',
                    platform: 'web',
                    staffUserId: this.department.staffArray[i].id,
                    department: this.department.staffArray[i].department,
                    authorityArray: arr
                  };
                  return JSON.stringify(obj);
                })()
              }
            });
          }));
        }
        Promise.all(promiseArr).then(values => {
          console.log(values);
          this.ediBtn.dis = false;
          this.ediBtn.cont = '编辑';
          this.ediBtn.ediStat = false;
        });
      } else {
        this.ediBtn.ediStat = true;
        this.ediBtn.cont = '保存';
      }
    },
    search(val) {
      if(val === '') {
        this.searchVal = '';
      }
      axios({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'get',
        url: '/service',
        params: {
            data: (()=>{
            var obj = {
                command: 'staffSearch',
                platform: 'web',
                searchContent: this.searchVal,
                department: department.department
            }
            return JSON.stringify(obj);
            })()
        }
      }).then(
          (rep)=>{
            if(rep.data.statusCode = '10001') {
              this.department.staffArray = rep.data.data.userArray;
                for(let j=0; j < this.department.staffArray.length; j++) {
                  let arr = [];
                  for(let k=0; k < this.department.authorityArray.length; k++) {
                    for(let m=0; m < this.department.staffArray[j].authority.length; m++) {
                      if (this.department.authorityArray[k].name === this.department.staffArray[j].authority[m].name) {
                        let obj = {
                          authName: this.department.staffArray[j].authority[m].name,
                          stat: this.department.staffArray[j].authority[m].authority === '0' ? false : true,
                        };
                        arr.push(obj);
                        break;
                      }
                    }
                  }
                  this.department.staffArray[j].authority = arr;
                }
            }
          },(rep)=>{

          }
      );
    }
  },
  components: {
    searchBar
  }
}
</script>

<style lang="sass" scoped>
@import '../../scss/variables.scss';

section {
  position: relative;
  margin: 30px 10px;
  padding: 10px 20px;
  background-color: #ffffff;
  border: 1px solid rgba(0,0,0,0.15);
  box-shadow: 1px 2px 4px rgba(0,0,0,0.175);
  h3 {
    padding-left: 15px;
    border-left: 3px solid $brand-primary;
    margin-bottom: 20px;
  }
  form.form-inline {
    margin: 20px auto;
  }
  table {
    margin: 20px auto;
  }
}
</style>
