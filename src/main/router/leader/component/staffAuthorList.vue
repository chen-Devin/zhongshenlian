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
      <tbody>
        <tr>
          <th class="text-center">职员</th>
          <th class="text-center"
              v-for="(AUTH, index) in staffs.authorityArray"
              :key="index">{{AUTH.name}}</th>
        </tr>
        <tr v-for="STAFF in staffs.staffArray"
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

    },
    ediBtnTog() {
      if (this.ediBtn.ediStat) {
        this.ediBtn.dis = true;
        this.ediBtn.cont = '提交...';
        let promiseArr = [];
        for (let i = 0; i < this.staffs.staffArray.length; i++) {
          let arr = [];
          for (let j = 0; j < this.staffs.staffArray[i].authority.length; j++) {
            let obj = {
              name: this.staffs.staffArray[i].authority[j].authName,
              authority: this.staffs.staffArray[i].authority[j].stat ? '1' : '0'
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
                    staffUserId: this.staffs.staffArray[i].id,
                    department: this.staffs.staffArray[i].department,
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
</style>
