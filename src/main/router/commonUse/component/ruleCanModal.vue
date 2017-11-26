<template>
  <modal>
    <div slot="body">
      <p class="ta-c">
        <!-- <span class="fa fa-exclamation-circle fa-5x text-danger"></span> -->
        <span>取消后编辑内容将丢弃，确认取消吗？</span>
      </p>
    </div>
    <div slot="footer">
      <button class="btn my-btn submit-btn" @click="cancel()">
        取消
      </button>
      <button class="btn my-btn cancel-btn" @click="del()">
        确定
      </button>     
    </div>
  </modal>
</template>

<script>
import modal from '../../../component/modal.vue';

export default {
  name: 'ruleCanModal',
  data() {
    return {};
  },
  methods: {
    del() {
      this.$emit('deleted');
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
