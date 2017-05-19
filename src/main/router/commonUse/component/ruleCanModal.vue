<template>
  <modal>
    <div slot="body">
      <p>
        <span class="fa fa-exclamation-circle fa-5x text-danger"></span>
        <span class="text-cont">取消后编辑内容将丢弃，确认取消编辑吗？</span>
      </p>
    </div>
    <div slot="footer">
      <button class="btn btn-danger modal-default-button" @click="del()">
        确定
      </button>
      <button class="btn btn-default modal-default-button" @click="cancel()">
        取消
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
