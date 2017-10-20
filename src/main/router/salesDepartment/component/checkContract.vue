<template>
  <div>
    <modal class="check-modal" modalWidth="615px">
      <div class="modal-body" slot="body">
        <button class="btn my-btn cancel-btn f-r" @click="cancel">返回</button>
        <h5>新合同</h5>
        <div class="contract-wrapper">
          <div class="contract-item" v-for="(item, index) in newContractArray" :key="index">
            <img class="c-p" width="150px" height="200px" :src="item.annexUrl" @click="checkPhoto(item.annexUrl)">
            <p>上传时间</p>
            <p>{{ item.createAt }}</p>
          </div>
        </div>
        <hr>
        <h5>旧合同</h5>
        <div class="contract-wrapper">
          <div class="contract-item" v-for="(item, index) in oldContractArray" :key="index">
            <img class="c-p" width="150px" height="200px" :src="item.annexUrl" @click="checkPhoto(item.annexUrl)">
            <p>上传时间</p>
            <p>{{ item.createAt }}</p>
          </div>
        </div>
      </div>
      <div class="ta-c" slot="footer">
        
      </div>
    </modal>
    <modal setPadding="0" v-if="photoShow" modalWidth="480px">
      <div slot="body">
        <img width="480px" height="640px" :src="photoUrl">
      </div>
      <div slot="footer">
        <button class="btn my-btn draft-btn" @click="quitPhoto">返回</button>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import modal from '@/main/component/modal.vue'

export default {
  name: 'changeModal',
  data() {
    return {
      applyAccount: '',
      newContractArray: [],
      oldContractArray: [],
      photoShow: false,
      photoUrl: ''
    }  
  },
  props: ['businessId'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    viewContract () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'viewContract',
                platform: 'web',
                projectId: this.businessId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.newContractArray = rep.data.data.newContractArray
            this.oldContractArray = rep.data.data.oldContractArray
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    checkPhoto (url) {
      this.photoUrl = url
      this.photoShow = true
    },
    quitPhoto () {
      this.photoShow = false
    }
  },
  created () {
    this.viewContract()
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>
  .check-modal {
    .modal-body {
      .d-ib {
        font-size: 13px;
        vertical-align: top;
      }
      .contract-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        > .contract-item {
          margin-right: 20px;
          > p {
            margin-bottom: 0;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>