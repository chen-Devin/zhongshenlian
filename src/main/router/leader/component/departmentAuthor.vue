<template>
  <card>
    <h3>{{thisDepart.department}}</h3>
    <form class="form-inline clearfix">
      <staff-search-bar v-model="searchVal"
                  v-on:search="search"></staff-search-bar>
      <button type="button"
            class="btn btn-default btn-sm pull-right"
            v-on:click="ediBtnTog()"
            v-bind:disabled="ediBtn.dis">&nbsp;{{ediBtn.cont}}&nbsp;</button>
    </form>
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th class="text-center">职员</th>
          <th class="text-center"
              v-for="(AUTH, index) in thisDepart.authorityArray"
              v-bind:key="index">{{AUTH.name}}</th>
        </tr>
        <tr v-for="STAFF in thisDepart.staffArray"
            v-bind:key="STAFF.id">
          <td class="text-center">{{STAFF.name}}</td>
          <td class="text-center"
              v-for="STAFF_AUTH in STAFF.authority"
              v-bind:key="STAFF.authName">
            <input type="checkbox"
                   v-model="STAFF_AUTH.stat"
                   v-bind:disabled="!ediBtn.ediStat">
          </td>
        </tr>
      </tbody>
    </table>
  </card>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import card from '../../../component/card.vue';
import staffSearchBar from './staffSearchBar.vue';

export default {
  name: 'departmentAuthor',
  data() {
    return {
      thisDepart: _.cloneDeep(this.department),
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
    search(val) {
      this.searchVal = val;
      axios({
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        method: 'get',
        url: '/service',
        params: {
            data: (()=>{
            var obj = {
                command: 'staffSearch',
                platform: 'web',
                searchContent: val,
                department: this.thisDepart.department
            }
            return JSON.stringify(obj);
            })()
        }
      }).then((rep)=>{
          if(rep.data.statusCode === '10001') {
            this.thisDepart.staffArray = rep.data.data.userArray;
            for(let j=0; j < this.thisDepart.staffArray.length; j++) {
              let arr = [];
              for(let k=0; k < this.thisDepart.authorityArray.length; k++) {
                for(let m=0; m < this.thisDepart.staffArray[j].authority.length; m++) {
                  if (this.thisDepart.authorityArray[k].name === this.thisDepart.staffArray[j].authority[m].name) {
                    let obj = {
                      authName: this.thisDepart.staffArray[j].authority[m].name,
                      stat: this.thisDepart.staffArray[j].authority[m].authority === '0' ? false : true,
                    };
                    arr.push(obj);
                    break;
                  }
                }
              }
              this.thisDepart.staffArray[j].authority = arr;
            }
          }
        },(rep)=>{});
    },
    ediBtnTog() {
      if (this.ediBtn.ediStat) {
        this.ediBtn.dis = true;
        this.ediBtn.cont = '提交...';
        let promiseArr = [];
        for (let i = 0; i < this.thisDepart.staffArray.length; i++) {
          let arr = [];
          for (let j = 0; j < this.thisDepart.staffArray[i].authority.length; j++) {
            let obj = {
              name: this.thisDepart.staffArray[i].authority[j].authName,
              authority: this.thisDepart.staffArray[i].authority[j].stat ? '1' : '0'
            };
            arr.push(obj);
          }
          promiseArr.push(new Promise((resolve, reject) => {
            axios({
              headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
              method: 'post',
              url: '/service',
              data: qs.stringify({
                data: (() => {
                  var obj = {
                    command: 'staffAuthorityEdit',
                    platform: 'web',
                    staffUserId: this.thisDepart.staffArray[i].id,
                    department: this.thisDepart.staffArray[i].department,
                    authorityArray: arr
                  };
                  return JSON.stringify(obj);
                })()
              })
            }).then((rep)=>{
              if(rep.data.statusCode === '10001') {
                resolve();
              } else {
                reject();
              }
            }, (rep)=>{
              reject();
            });
          }));
        }
        Promise.all(promiseArr).then(values => {
          this.ediBtn.dis = false;
          this.ediBtn.cont = '编辑';
          this.ediBtn.ediStat = false;
        });
      } else {
        this.ediBtn.ediStat = true;
        this.ediBtn.cont = '保存';
      }
    }
  },
  components: {
    staffSearchBar,
    card
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../scss/variables.scss';

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
</style>
