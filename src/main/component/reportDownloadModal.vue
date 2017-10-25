<template>
  <modal>
    <div slot="body">
      <h5>项目报告下载</h5>
      <hr>
      <div class="download-wrapper">
        <p class="d-f" v-for="(item, index) in orignArray" :key="index">
          <span style="width:80px"><{{ item.type }}></span>
          <a :href="item.annexUrl" target="_blank" download>{{ item.annexName }}</a>
        </p>
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
      annexArray: [],
      orignArray: [
        {
          type: '审计报告',
          annexName: '',
          annexUrl: ''
        },
        {
          type: '报告附表',
          annexName: '',
          annexUrl: ''
        },
        {
          type: '报表资料',
          annexName: '',
          annexUrl: ''
        },
        {
          type: '备注',
          annexName: '',
          annexUrl: ''
        }
      ]
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
    this.getAnnexListOfOneReport().then(() => {
      this.annexArray.forEach((item) => {
        console.log(item)
        if (item.annexType === 'auditReport') {
          this.orignArray[0].annexName = item.annexName
          this.orignArray[0].annexUrl = item.annexUrl
        } else if (item.annexType === 'reportSchedule') {
          this.orignArray[1].annexName = item.annexName
          this.orignArray[1].annexUrl = item.annexUrl
        } else if (item.annexType === 'reportNote') {
          this.orignArray[2].annexName = item.annexName
          this.orignArray[2].annexUrl = item.annexUrl
        } else if (item.annexType === 'remarks') {
          this.orignArray[3].annexName = item.annexName
          this.orignArray[3].annexUrl = item.annexUrl
        }
      })
    }, () => {})
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>
  .download-wrapper {
    padding-top: 15px;
    padding-left: 30px;
    padding-bottom: 15px;
    background-color: #f9fbfe;
  }
</style>