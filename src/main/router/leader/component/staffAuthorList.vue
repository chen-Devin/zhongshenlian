<template>
  <card>
    <search-bar placeholder="输入关键字搜索员工" @search="tog"></search-bar>
    <h3 v-if="staffsShow">
      员工列表
      <button type="button"
              class="btn btn-default pull-right"
              @click="ediBtnTog()"
              :disabled="ediBtn.dis">{{ediBtn.cont}}</button>
    </h3>
    <table class="table table-striped table-hover com-list" v-if="staffsShow">
      <thead>
        <tr>
          <th class="text-center">职员</th>
          <th class="text-center">权限</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="STAFF in staffs"
            :key="STAFF.id">
          <td class="text-center">{{STAFF.name}}</td>
          <td class="text-center">
            <label class="checkbox-inline"
                   v-for="(STAFF_AUTH, index) in STAFF.authority"
                   :key="index">
              <input type="checkbox"
                     v-model="STAFF_AUTH.stat"
                     :disabled="!ediBtn.ediStat"> {{STAFF_AUTH.authName}}
            </label>
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
import searchBar from '../../../component/searchBar.vue';

export default {
  name: 'staffAuthorList',
  data() {
    return {
      staffs: [],
      ediBtn: {
        dis: false,
        cont: '编辑',
        ediStat: false,
      }
    }
  },
  computed: {
    staffsShow() {
      return this.staffs.length!==0;
    }
  },
  methods: {
    tog(searchCont) {
      this.searchStaffs(searchCont).then((rep) => {
        for(let m=0; m < rep.data.data.userArray.length; m++) {
          for(let n=0; n < rep.data.data.userArray[m].authority.length; n++) {
            let obj = {};
            obj.authName = rep.data.data.userArray[m].authority[n].name;
            obj.stat = rep.data.data.userArray[m].authority[n].authority === '0' ? false : true;
            rep.data.data.userArray[m].authority[n] = obj;
          }
        }
        this.staffs = rep.data.data.userArray;
      }, (rep) => {});
    },
    searchStaffs(searchCont) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'staffSearch',
                platform: 'web',
                searchContent: searchCont
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
    ediBtnTog() {
      if (this.ediBtn.ediStat) {
        this.ediBtn.dis = true;
        this.ediBtn.cont = '提交...';
        let promiseArr = [];
        for (let i = 0; i < this.staffs.length; i++) {
          let arr = [];
          for (let j = 0; j < this.staffs[i].authority.length; j++) {
            let obj = {
              name: this.staffs[i].authority[j].authName,
              authority: this.staffs[i].authority[j].stat ? '1' : '0'
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
                    staffUserId: this.staffs[i].id,
                    department: this.staffs[i].department,
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
    searchBar
  }
};
</script>

<style lang="sass" scoped>
.com-list {
  .checkbox-inline {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
