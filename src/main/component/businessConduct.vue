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
      paths: []
    };
  },
  props: ['initBusiness', 'user'],
  mounted() {
    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-sales-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-risk-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-leader-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-office-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-financial-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-archives-${this.$route.params.id}/business-conduct`, present: true });
    }
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
