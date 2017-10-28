<template>
  <div>
    <h5 class="main-title">
      权限设置 {{ authorityData }}
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
    <table class="table table-hover table-inner">
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
      transData: ''
    };
  },
  props: ['id', 'type'],
  methods: {
    edit () {
      this.editAble = true
    },
    cancel () {
      this.editAble = false
    },
    getStaffAuthority () {
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
                staffId: this.id
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
      if (this.type === 'function') {
        this.authorityData.forEach((item) => {
          // delete item.companyName
          item.authorityArray.forEach((jtem) => {
            jtem.authority = Number(jtem.stat)
            delete jtem.stat
          })
        })
      }
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
                staffId: this.id
              }
              if (this.type === 'function') {
                Object.assign(obj, {
                  deAuthorityArray: this.authorityData
                })
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('保存成功')
            this.getStaffAuthority()
            this.editAble = false
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  created () {
    this.getStaffAuthority()
  },
  components: {
    
  }
};
</script>

<style lang="sass" scoped>
  .main-title {
    margin-left: 0;
  }
</style>
