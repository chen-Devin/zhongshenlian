<template>
  <modal class="contract-change">
    <div slot="body">
      <h5>合同金额变更</h5>
      <hr>
      <p>
        <span style="width:120px;">合同预估金额：</span>
        {{ business.contractAmount }} 元
      </p>
      <p class="d-f">
        <span style="width:120px;">合同变更金额：</span>
        <el-input v-model="applyAccount"></el-input>
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn submit-btn"
              @click="changeContractAccount">
        确定
      </button>
      <button class="btn my-btn draft-btn"
              @click="cancel">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import modal from '../../../component/modal.vue';

export default {
  name: 'contractChangeModal',
  data() {
    return {
      applyAccount: '',
      business: this.initBusiness
    };
  },
  props: ['initBusiness'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    changeContractAccount () {
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
                projectId: this.business.id,
                applyAccount: this.applyAccount
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success(rep.data.msg)
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