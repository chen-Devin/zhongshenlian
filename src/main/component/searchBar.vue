<template>
  <div class="form-group">
    <input type="text"
           class="form-control input-sm"
           id="search"
           placeholder="输入工号、姓名或手机号"
           v-model="value">
    <button type="button"
            class="btn btn-primary btn-sm"
            v-on:click="search()">&emsp;搜索&emsp;</button>
    <button type="button"
            class="btn btn-warning btn-sm"
            v-on:click="clear()">&emsp;重置&emsp;</button>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  props: ['value'],
  methods: {
    search() {
      $emit('search');
    },
    clear() {
      $emit('clear');
    }
  }
}
</script>

<style lang="sass" scoped>
div {
  float: left;
}
</style>
