<template>
  <header>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img alt="Brand" src="../../img/brand.svg">
          </a>
        </div>
        <h4 class="navbar-text brand-name">
          天津中审联会计师管理系统
        </h4>
        <p class="navbar-text navbar-right">
          <span>{{user.name}} 欢迎您</span>
          <a class="navbar-link" @click="signOut()">退出</a>
        </p>
        <img :src="userHead" alt="头像" class="img-circle img-head navbar-right">
      </div><!-- /.container-fluid -->
    </nav>
  </header>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'comHeader',
  props: ['user'],
  computed: {
    userHead() {
      return this.user.wechatHeadImg || require('../../img/head.jpg');
    }
  },
  methods: {
    signOut() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'logOut',
              platform: 'web'
            }
            return JSON.stringify(obj);
          })()
        })
      }).then( (rep) => {
        if (rep.data.statusCode === '10001') {
          window.location.href = './signIn.html';
        }
      }, (rep) => {});
    }
  }
}
</script>

<style lang="sass" scoped>
.navbar {
  background-color: #1F6BA9;
  border-color: rgba(255,255,255,0);
  .navbar-brand {
    padding: 8px 15px;
    img {
      height: 100%
    }
  }
  h4.brand-name {
    margin-left: 0;
    color: rgba(240,240,240,0.9);
    font-weight: normal;
  }
  .img-head {
    width: 36px;
    height: 36px;
    margin: 7px 0;
  }
  .navbar-text {
    margin-right: 15px;
    span {
      display: inline-block;
      color: rgba(240,240,240,1);
      line-height: 1em;
      padding: 0 10px;
    }
    a {
      display: inline-block;
      color: rgba(240,240,240,1);
      line-height: 1em;
      padding: 0 10px;
      border-left: 1px solid rgba(255,255,255,1);
      cursor: pointer;
    }
  }
}
</style>
