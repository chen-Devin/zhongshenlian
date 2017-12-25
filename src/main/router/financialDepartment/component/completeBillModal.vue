<template>
  <modal>
    <div slot="body">
      <p>
        <span class="text-cont">确定完成开票吗？</span>
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn submit-btn modal-default-button"
              @click="sub()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn draft-btn modal-default-button"
              @click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from '../../../component/modal.vue';

export default {
  name: 'completeBillModal',
  data() {
    return {
      business: this.initBusiness,
      subBtn: {
        dis: false,
        cont: '确定'
      }
    };
  },
  props: ['initBusiness'],
  methods: {
    sub() {
      this.subBtn.dis = true;
      this.subBtn.cont = '提交...';
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              let obj = {
                command: 'makeBilling',
                platform: 'web',
                id: this.business.bills[0].id,
                type: 3
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business.billState = 1;
            this.subBtn.cont = '已提交';
            this.$message.success('已完成开票')
            this.$emit('submited');
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            this.$message.error(rep.data.msg)
            this.subBtn.dis = false;
            this.subBtn.cont = '提交';
          }
        }, (rep) => { });
      });
      return promise;
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

</style>
