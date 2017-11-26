<template>
  <div class="side-message">
    <div class="portrait-wrap">
      <img width="100" height="100" :src="portrait">
    </div>
    <p>
      {{ user.name }}，欢迎你
    </p>
    <button class="quit-btn" @click="quit">退出登录</button>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import bus from '../bus.js'

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
      bus.$emit('quit')
    }
  },
  components: {
    bus
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
</style>