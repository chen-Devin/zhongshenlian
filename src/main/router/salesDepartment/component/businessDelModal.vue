<template>
<modal>
  <div slot="body">
    <p>
      <span class="fa fa-exclamation-circle fa-5x text-danger"></span>
      <span class="text-cont">确定撤销该业务吗？</span>
    </p>
  </div>
  <div slot="footer">
      <button class="btn btn-danger modal-default-button" @click="del()" :disabled="subBtn.dis">
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
  name: 'businessDelModal',
  data() {
    return {
      subBtn: {
        dis: false,
        cont: '删除'
      }
    };
  },
  props: ['initalBusiness'],
  methods: {
    del() {
      if (this.initalBusiness.id === '') {
        this.subBtn.cont = '已删除';
        this.$emit('deleted', this.initalBusiness);
      } else {
        this.subBtn.dis = true;
        this.subBtn.cont = '删除中...';
        axios({
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              var obj = {
                command: 'delBusinessInfo',
                platform: 'web',
                id: this.initalBusiness.id
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep)=>{
          if (rep.data.statusCode === '10001') {
            this.subBtn.cont = '已删除';
            this.$emit('deleted', this.initalBusiness);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep)=>{});
      }

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
