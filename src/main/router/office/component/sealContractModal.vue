<template>
  <modal class="contract-change">
    <div slot="body">
      <p>
        操作状态不可撤销，是否确定盖章？
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn"
              @click="sealContract">
        确定
      </button>
      <button class="btn my-btn submit-btn"
              @click="cancel">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import modal from '../../../component/modal.vue';

export default {
  name: 'sealContractModal',
  data() {
    return {
      
    };
  },
  props: ['initBusiness'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    sealContract () {
      this.$emit('changeSuccess', 'upload')
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
  .contract-change {
    p {
      height: 36px;
      line-height: 36px;
    }
  }
</style>