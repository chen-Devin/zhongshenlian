<template>
  <modal>
    <form class="clearfix" slot="body">
      <div class="form-group">
        <textarea cols="30"
                  rows="10"
                  class="form-control"
                  placeholder="请输入不通过的建议"
                  v-model="reason"></textarea>
      </div>
    </form>
    <div slot="footer">
      <button class="btn btn-danger modal-default-button"
              @click="sub()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn btn-default modal-default-button"
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
      reason: '',
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
              result: '不通过',
              reason: this.reason
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.subBtn.cont = '已提交';
          this.$emit('refused', rep.data.data.id, this.reason);
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
form {
  textarea {
    resize: vertical;
  }
}
</style>
