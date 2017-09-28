<template>
  <div>
    <h5 class="main-title">
      权限设置
      <button type="button"
              class="btn my-btn submit-btn pull-right"
              @click="ediBtnTog()"
              :disabled="ediBtn.dis">{{ediBtn.cont}}</button>
    </h5>
    <table class="table table-bordered table-hover com-list">
      <thead>
        <tr>
          <td class="text-center staff-max">公司名称</td>
          <td class="text-center"
              v-for="(AUTH, index) in authorityArray"
              :key="index">{{AUTH.name}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in authorityData"
            :key="index">
          <td class="text-center staff-max">{{ item.companyName }}</td>
          <td class="text-center"
              v-for="(jtem, index) in item.authorityArray"
              :key="index">
            <input type="checkbox"
                   v-model="jtem.stat"
                   :disabled="!ediBtn.ediStat">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

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
      authorityArray: [],
      authorityData: [],
    };
  },
  props: ['id'],
  filters: {
    transBoolean (value) {
      return value === '0' ? false : true
    }
  },
  methods: {
    ediBtnTog() {
      if (this.ediBtn.ediStat) {
        this.ediBtn.ediStat = false;
        this.ediBtn.cont = '编辑';
      } else {
        this.ediBtn.ediStat = true;
        this.ediBtn.cont = '保存';
      }
    },
    getStaffAuthority (id) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getStaffAuthority',
                platform: 'web',
                staffId: '1'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.resultArray = rep.data.data.resultArray
            this.authorityData = this.resultArray
            let arr = this.resultArray[0].authorityArray
            this.authorityArray = []
            arr.forEach((item, index) => {
              let stat = item.authority === '0' ? false : true
              this.authorityArray.push({
                name: item.name,
                stat: stat
              })
            })
            this.authorityData = []
            this.authorityData = this.resultArray
            this.authorityData.forEach((item) => {
              item.authorityArray.forEach((jtem) => {
                jtem.stat = jtem.authority === '0' ? false : true
              })
            })
            // this.resultArray.forEach((item, index) => {
            //   console.log(item)
            // })
            // this.authorityData.push({
            //   companyName: 
            // })
            this.loadTable = true
            resolve('done');
          }
        }, (rep) => { });
      })
    },
  },
  created () {
    this.getStaffAuthority(this.id)
  },
  components: {
    
  }
};
</script>

<style lang="sass" scoped>
.com-list {
  thead {
    background-color: #E6E6E6;
    th {
      width: 33.3%;
    }
  }
  .link-wrap {
    a:hover {
      cursor: pointer;
    }
  }
}
</style>
