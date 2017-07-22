<template>
  <div class="row normal-wrap">
    <div class="col-sm-12">
      <table class="table table-bordered table-hover com-list">
        <thead>
          <tr>
            <td class="ta-c">操作时间</td>
            <td class="ta-c">操作内容</td>
            <td class="ta-c">操作人姓名</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(OPER, index) in business.projectOperatingArray">
            <td class="ta-c">
              {{OPER.updateAt}}
            </td>
            <td class="ta-c">
              {{OPER.content}}
            </td>
            <td class="ta-c">
              {{OPER.operatorName}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'operatHistory',
  data() {
    return {
      paths: [],
      business: this.initBusiness
    };
  },
  props: ['initBusiness', 'user'],
  mounted() {
    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/operat-history`, present: false });
      this.paths.push({ name: '操作历史', url: `/business-handle-detail-sales-${this.$route.params.id}/operat-history`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/operat-history`, present: false });
      this.paths.push({ name: '操作历史', url: `/business-handle-detail-risk-${this.$route.params.id}/operat-history`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/operat-history`, present: false });
      this.paths.push({ name: '操作历史', url: `/business-handle-detail-leader-${this.$route.params.id}/operat-history`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/operat-history`, present: false });
      this.paths.push({ name: '操作历史', url: `/business-handle-detail-office-${this.$route.params.id}/operat-history`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/operat-history`, present: false });
      this.paths.push({ name: '操作历史', url: `/business-handle-detail-financial-${this.$route.params.id}/operat-history`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/operat-history`, present: false });
      this.paths.push({ name: '操作历史', url: `/business-handle-detail-archives-${this.$route.params.id}/operat-history`, present: true });
    }
    this.$emit('pathsChan', this.paths);
  }
}
</script>

<style lang="sass" scoped>
@import '../../scss/variables.scss';

.com-list {
  thead {
    tr {
      background-color: #E6E6E6;
    }
  }
}
</style>
