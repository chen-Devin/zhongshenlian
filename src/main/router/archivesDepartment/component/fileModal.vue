<template>
  <modal class="contract-change">
    <div slot="body">
      <p>
        操作状态不可撤销，是否确定归档报告？
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn"
              @click="confirmArchiving">
        确定
      </button>
      <button class="btn my-btn submit-btn"
              @click="cancel">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios'
import modal from '../../../component/modal.vue'

export default {
  name: 'packContractModal',
  data() {
    return {
      
    };
  },
  props: ['initBusiness'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirmArchiving () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'confirmArchiving',
                platform: 'web',
                id: this.initBusiness.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('已归档报告')
            this.$emit('changeSuccess')
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
  .contract-change {
    p {
      height: 36px;
      line-height: 36px;
    }
  }
</style>