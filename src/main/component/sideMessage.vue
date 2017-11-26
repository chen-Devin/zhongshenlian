<template>
  <div class="side-message">
    <div class="portrait-wrap">
      <img width="100" height="100" :src="portrait">
    </div>
    <p>
      {{ user.name }}，欢迎你
    </p>
    <button class="quit-btn" @click="quit">退出登录</button>
    <transition name="modal" v-if="quitShow">
      <div class="modal-mask">
        <div class="modal-container">
          <div class="cancel" @click="quitShow = false">x</div>
          <div class="modal-body">
            <p class="ta-c">您确定要退出登录吗</p>
          </div>
          <div class="modal-footer">
            <button class="btn my-btn submit-btn" @click="quitShow = false">
              取消
            </button>
            <button class="btn my-btn cancel-btn" @click="signOut">
              确定
            </button> 
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      quitShow: false
    }
  },
  computed: {
    portrait () {
      return this.user.wechatHeadImg || require('../../img/head.jpg')
    }
  },
  methods: {
    quit () {
      this.quitShow = true
    },
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
	props: ['user']
}
</script>

<style lang="sass" scoped>
	.side-message {
    text-align: center;
    > .portrait-wrap {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      margin-bottom: 15px;
      border-radius: 50px;
      overflow: hidden;
      background-color: #fff;
    }
    > p {
      height: 18px;
      line-height: 18px;
      font-size: 13px;
      margin-bottom: 15px;
      color: #fff;
    }
    > .quit-btn {
      width: 72px;
      height: 19px;
      line-height: 19px;
      padding: 0;
      border: 1px solid #4AB2E6;
      border-radius: 12px;
      background-color: rgba(1, 1, 1, 0);
      color: #4AB2E6;
      font-size: 13px;
      &:focus {
        outline: none;
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
    transition: opacity .3s ease;
  }
  .modal-container {
    position: relative;
    width: 400px;
    margin: 0px auto;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
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