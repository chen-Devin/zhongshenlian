<template>
  <div>
    <h5 class="main-title">
      权限设置
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit">编辑</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template>
      </div>
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
                   :disabled="!editAble">
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
      editAble: false,
      authorityArray: [],
      authorityData: [],
    };
  },
  props: ['id'],
  methods: {
    edit () {
      this.editAble = true
    },
    cancel () {
      this.editAble = false
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
            this.loadTable = true
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    save () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editStaffAuthority',
                platform: 'web',
                staffId: '1'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve('done');
          }
        }, (rep) => { });
      })
    }
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
