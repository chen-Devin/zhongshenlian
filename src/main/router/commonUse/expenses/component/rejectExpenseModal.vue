<template>
  <modal class="contract-change">
    <div slot="body">
      <p>
        请填写驳回原因
      </p>
      <el-input rows="6" type="textarea" placeholder="请输入驳回愿意（200字内）" v-model="reason"></el-input>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn"
              @click="rejected">
        确定驳回
      </button>
      <button class="btn my-btn submit-btn"
              @click="cancel">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import modal from '@/main/component/modal.vue'

export default {
  name: 'packContractModal',
  data() {
    return {
      reason: ''
    };
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    rejected () {
      this.$emit('rejected', this.reason)
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