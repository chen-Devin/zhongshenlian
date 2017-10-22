<template>
  <modal>
    <div slot="body">
      <h5>项目报告下载</h5>
      <hr>
      <div class="download-wrapper">
        <a :href="item.annexUrl" v-for="(item, index) in annexArray" :key="index">{{ item.annexType }}</a>
      </div>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn" @click="cancel()">
        返回
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios'
import modal from './modal.vue'

export default {
  data () {
    return {
      annexArray: []
    }
  },
  name: 'reportNumberModal',
  props: ['id'],
  methods: {
    getAnnexListOfOneReport () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getAnnexListOfOneReport',
                platform: 'web',
                id: this.id
              }
              return JSON.stringify(obj)
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.annexArray = rep.data.data.annexArray
            console.log(1, this.annexArray)
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { })
      })
    },
    cancel() {
      this.$emit('canceled')
    }
  },
  created () {
    this.getAnnexListOfOneReport()
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>
  .download-wrapper {
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #f9fbfe;
  }
</style>