<template>
  <modal class="change-modal" modalWidth="600px">
    <div class="modal-body" slot="body">
      <h5>合同金额变更</h5>
      <hr>
      <p>
        <span style="width:100px;">合同预估金额：</span>
        {{ amount }} 元
      </p>
      <p class="d-f">
        <span style="width:100px;">
          合同变更金额：
        </span>
        <el-input v-model="applyAccount" placeholder="请输入变更后的金额">
          <template slot="append">元</template>
        </el-input>
      </p>
    </div>
    <div class="ta-c" slot="footer">
      <button class="btn my-btn submit-btn" @click="submit">提交审批</button>
      <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios'
import modal from '@/main/component/modal.vue'

export default {
  name: 'changeModal',
  data() {
    return {
      applyAccount: ''
    }  
  },
  props: ['projectId', 'amount'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'changeContractAccount',
                platform: 'web',
                projectId: this.projectId,
                applyAccount: this.applyAccount
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success(rep.data.msg)
            this.cancel()
            resolve('done');
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
}
</script>

<style lang="sass" scoped>
  .change-modal {
    .modal-body {
      p {
        height: 36px;
        line-height: 36px;
      }
    }
    .el-input-group {
      width: 75%;
    }
  }
</style>