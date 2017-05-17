<template>
  <modal>
    <div slot="body">
      <p>
        <span class="fa fa-exclamation-circle fa-5x text-success"></span>
        <span class="text-cont">确定通过该业务吗？</span>
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn submit-btn modal-default-button"
              @click="sub()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn cancel-btn modal-default-button"
              @click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from './modal.vue';

export default {
  name: 'businessApproveModal',
  data() {
    return {
      subBtn: {
        dis: false,
        cont: '确定'
      }
    };
  },
  props: ['initalBusiness'],
  methods: {
    sub() {
      this.subBtn.dis = true;
      this.subBtn.cont = '提交中...';
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'reviewProject',
              platform: 'web',
              id: this.initalBusiness.id,
              result: '通过',
              reason: ''
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.subBtn.cont = '已提交';
          this.$emit('approved', rep.data.data.id);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    cancel() {
      this.$emit('canceled');
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
p {
  span {
    display: inline-block;
    &.fa {
      margin: 0 20px 0 40px;
    }
  }
}
</style>
