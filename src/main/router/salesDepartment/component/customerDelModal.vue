<template>
  <modal>
    <div slot="body">
      <p>
        <span class="fa fa-exclamation-circle fa-5x text-danger"></span>
        <span class="text-cont">确定删除客户{{initalCustomer.name}}吗？</span>
      </p>
    </div>
    <div slot="footer">
      <button class="btn btn-danger modal-default-button" v-on:click="del()" v-bind:disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn btn-default modal-default-button" v-on:click="cancel()">
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
  name: 'customerDelModal',
  data() {
    return {
      subBtn: {
        dis: false,
        cont: '删除'
      }
    };
  },
  props: ['initalCustomer'],
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
              command: 'delCustomerInfo',
              platform: 'web',
              id: this.initalCustomer.id
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep)=>{
        if (rep.data.statusCode === '10001') {
          this.subBtn.cont = '已删除';
          this.$emit('deleted', this.initalCustomer);
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
    &.text-cont {

    }
  }
}
</style>
