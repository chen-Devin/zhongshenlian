<template>
  <form class="form-horizontal">
    <div class="checkbox">
      <label>
        <input type="checkbox">
        审前调查
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox">
        现场工作
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox">
        整理底稿
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox">
        客户通报
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox">
        报告初稿
      </label>
    </div>
  </form>
</template>

<script>
export default {
  name: 'businessConduct'
};
</script>

<style lang="sass" scoped>
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
