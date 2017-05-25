<template>
  <modal>
    <div slot="body">
      <p>
        <span class="fa fa-exclamation-circle fa-5x text-success"></span>
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
      let promiseArr = [];
      for (let i = 0; i < this.business.bills.length; i++) {
        promiseArr.push(new Promise((resolve, reject) => {
          axios({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'post',
            url: '/service',
            data: qs.stringify({
              data: (() => {
                let obj = {
                  command: 'makeBilling',
                  platform: 'web',
                  id: this.business.bills[i].id,
                  type: this.business.bills[i].state + 1
                };
                return JSON.stringify(obj);
              })()
            })
          }).then((rep) => {
            if (rep.data.statusCode === '10001') {
              this.business.bills[i].state += 1;
              resolve(rep);
            } else if (rep.data.statusCode === '10012') {
              window.location.href = 'signIn.html';
            }
          }, (rep) => { });
        }));
      }
      Promise.all(promiseArr).then(values => {
        this.subBtn.cont = '已提交';
        this.$emit('submited');
      });
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
