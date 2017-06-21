<template>
  <modal>
    <div slot="body">
      <p>
        <span class="fa fa-exclamation-circle fa-5x text-danger"></span>
        <span class="text-cont">确定删除该报告吗？</span>
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn modal-default-button" @click="del()" :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn submit-btn modal-default-button" @click="cancel()">
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
  name: 'reportDelModal',
  data() {
    return {
      subBtn: {
        dis: false,
        cont: '删除'
      }
    };
  },
  props: ['initReport', 'initBusiness'],
  methods: {
    del() {
      this.subBtn.dis = true;
      this.subBtn.cont = '删除中...';
      axios({
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: this.initReport.id,
              type: 'projectReport'
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep)=>{
        if (rep.data.statusCode === '10001') {
          this.subBtn.cont = '已删除';
          this.$emit('deleted', this.initReport);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep)=>{});
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
