<template>
  <form class="form-horizontal">
    <div class="form-group">
      <div class="checkbox col-sm-offset-2 col-sm-10">
        <label>
          <input type="checkbox">
          审前调查
        </label>
      </div>
    </div>
    <div class="form-group">
      <div class="checkbox col-sm-offset-2 col-sm-10">
        <label>
          <input type="checkbox">
          现场工作
        </label>
      </div>
    </div>
    <div class="form-group">
      <div class="checkbox col-sm-offset-2 col-sm-10">
        <label>
          <input type="checkbox">
          整理底稿
        </label>
      </div>
    </div>
    <div class="form-group">
      <div class="checkbox col-sm-offset-2 col-sm-10">
        <label>
          <input type="checkbox">
          审前调查
        </label>
      </div>
    </div>
    <div class="form-group">
      <div class="checkbox col-sm-offset-2 col-sm-10">
        <label>
          <input type="checkbox">
          客户通报
        </label>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'businessConduct',
  data() {
    return {
      paths: [
        { name: '待处理业务', url: '/business-handle-list-sales', present: false },
        { name: '业务详情', url: `/business-handle-detail-sales/${this.$route.params.id}`, present: false },
        { name: '业务开展', url: `/business-handle-detail-sales/${this.$route.params.id}/business-conduct`, present: true }
      ]
    };
  },
  create() {
    this.$emit('pathsChan', this.paths);
  }
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
