<template>
<modal>
  <div slot="body">
    <p>
      <span class="fa fa-exclamation-circle fa-5x text-danger"></span>
      <span class="text-cont">确定撤销该开票申请吗？</span>
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
  name: 'billDelModal',
  data() {
    return {
      subBtn: {
        dis: false,
        cont: '删除'
      }
    };
  },
  props: ['initBill'],
  methods: {
    del() {
      this.subBtn.cont = '已删除';
      this.$emit('deleted');
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
