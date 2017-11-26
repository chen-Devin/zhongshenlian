<template>
  <header>
    <nav class="navbar navbar-inverse navbar-fixed-top adjust-left">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img alt="Brand" src="../../img/brand.svg">
          </a>
        </div>
        <h4 class="navbar-text brand-name">
          天津中审联办公管理系统
        </h4>
        <p class="navbar-text navbar-right">
          <!-- <span>{{user.name}} 欢迎您</span> -->
          <img width="18px" height="18px" src="../../img/quit.png" @click="quitShow=true">
          <!-- <a class="navbar-link" @click="signOut()">退出</a> -->
        </p>
        <!-- <img :src="userHead" alt="头像" class="img-circle img-head navbar-right"> -->
      </div><!-- /.container-fluid -->
    </nav>
    <modal v-if="quitShow">
      <div slot="body">
        <p class="ta-c">您确定要退出登录吗?</p>
      </div>
      <div slot="footer">
        <button class="btn my-btn submit-btn" @click="quitShow = false">
          取消
        </button>
        <button class="btn my-btn cancel-btn" @click="signOut">
          确定
        </button> 
      </div>
    </modal>
  </header>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import modal from './modal.vue'
import bus from '../bus.js'

export default {
  name: 'comHeader',
  props: ['user'],
  data() {
    return {
      quitShow: false
    }
  },
  methods: {
    signOut() {
      this.quitShow = false
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
          window.location.href = 'signIn.html';
        }
      }, (rep) => {});
    }
  },
  components: {
    modal,
    bus
  },
  created () {
    bus.$on('quit', () => { this.quitShow = true })
  }
}
</script>

<style lang="sass" scoped>
.navbar {
  background-color: #3B93DF;
  border-color: rgba(255,255,255,0);
  z-index: 3;
  &.adjust-left {
    left: 200px;
  }
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
    img {
      display: inline-block;
      cursor: pointer;
    }
  }
}
.modal-mask {
  position: fixed;
  z-index: 20;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  position: relative;
  width: 400px;
  margin: 0px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  .cancel{
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 20px;
    font-weight: bold;
  }
}
.modal-body {    
  margin: 10px 0;
}
.modal-footer {
  border-top: none;
  text-align: center;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
