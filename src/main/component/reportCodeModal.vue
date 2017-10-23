<template>
  <modal>
    <div slot="body">
      <p class="d-f">
        操作后状态不可撤销，是否确定生成二维码？
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn" @click="confirmQRcode()">
        确定
      </button>
      <button class="btn my-btn cancel-btn" @click="cancel()">
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
  name: 'reportNumberModal',
  data() {
    return {
      
    }
  },
  props: ['id'],
  methods: {
    confirmQRcode () {
      
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
  height: 36px;
  line-height: 36px;
  span {
    width: 100px;
  }
}
</style>