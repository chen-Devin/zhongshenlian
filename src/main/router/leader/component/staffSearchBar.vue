<template>
  <div class="form-group">
    <input type="text"
           class="form-control input-sm"
           id="search"
           placeholder="输入工号、姓名或手机号"
           v-model="valueInput">
    <button type="button"
            class="btn btn-primary btn-sm"
            v-on:click="search()">&nbsp;搜索&nbsp;</button>
    <button type="button"
            class="btn btn-warning btn-sm"
            v-on:click="clear()">&nbsp;重置&nbsp;</button>
  </div>
</template>

<script>
export default {
  name: 'staffSearchBar',
  data() {
    return {
      valueInput: this.value
    }
  },
  props: ['value'],
  methods: {
    search() {
      this.$emit('search', this.valueInput);
    },
    clear() {
      this.valueInput = '';
      this.$emit('search', this.valueInput);
    }
  }
}
</script>

<style lang="sass" scoped>
div {
  float: left;
}
</style>
