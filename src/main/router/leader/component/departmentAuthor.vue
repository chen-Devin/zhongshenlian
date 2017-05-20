<template>
  <card>
    <h3 class="main-title">
      {{thisDepart.department}}
      <button type="button"
              class="btn my-btn submit-btn pull-right"
              @click="ediBtnTog()"
              :disabled="ediBtn.dis">{{ediBtn.cont}}</button>
    </h3>
    <table class="table table-striped table-hover com-list">
      <thead>
        <tr>
          <th class="text-center">职员</th>
          <th class="text-center"
              v-for="(AUTH, index) in thisDepart.authorityArray"
              :key="index">{{AUTH.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="STAFF in thisDepart.staffArray"
            :key="STAFF.id">
          <td class="text-center">{{STAFF.name}}</td>
          <td class="text-center"
              v-for="STAFF_AUTH in STAFF.authority"
              :key="STAFF.authName">
            <input type="checkbox"
                   v-model="STAFF_AUTH.stat"
                   :disabled="!ediBtn.ediStat">
          </td>
        </tr>
      </tbody>
    </table>
    <pager :pageCount="page.total"
           :currentPage="page.current"
           @change="pageChan"></pager>
    <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="currentChange"></my-pagination>
  </card>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import card from '../../../component/card.vue';
import myPagination from '../../../component/pagination.vue';

export default {
  name: 'departmentAuthor',
  data() {
    return {
      thisDepart: this.department,
      ediBtn: {
        dis: false,
        cont: '编辑',
        ediStat: false,
      },
      page: {
        total: this.department.pageNum,
        current: (this.department.pageNum === 0) ? 0 : 1
      },
      totalPage: 1
    };
  },
  props: ['department'],
  methods: {
    currentChange(newPage) {
      this.getStaffInfo(newPage);
    },
    getStaffInfo(newPage) {
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
                department: this.thisDepart.department,
                pageNum: newPage
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.page.total = parseInt(rep.data.data.totalNum);
            this.page.current = newPage;
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
            this.thisDepart.staffArray = rep.data.data.staffArray;
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            reject(rep);
          }
        }, (rep) => { });
      });
      return promise;
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
              } else if (rep.data.statusCode === '10012') {
                window.location.href = 'signIn.html';
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
    card,
    myPagination
  }
};
</script>

<style lang="sass" scoped>
</style>
