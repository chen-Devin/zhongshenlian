<template>
  <modal>
    <div slot="body">
      <p>
        <span class="fa fa-exclamation-circle fa-5x text-primary"></span>
        <span class="text-cont">
          <span v-if="initBusiness.reports.length===0">尚未上传项目报告，</span>
          确定提交复审吗？
        </span>
      </p>
    </div>
    <div slot="footer">
      <button class="btn btn-primary modal-default-button" @click="sub()" :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn btn-default modal-default-button" @click="cancel()">
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
  name: 'ruleDelModal',
  data() {
    return {
      subBtn: {
        dis: false,
        cont: '确定'
      }
    };
  },
  props: ['initBusiness'],
  methods: {
    del() {
      this.subBtn.dis = true;
      this.subBtn.cont = '提交中...';
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'submitReview',
              platform: 'web',
              id: this.initBusiness.id
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.subBtn.cont = '已提交';
          this.$emit('submited');
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
}
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
