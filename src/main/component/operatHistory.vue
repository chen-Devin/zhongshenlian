<template>
  <div class="row normal-wrap">
    <div class="col-sm-offset-2 col-sm-10">
      <ul class="list-group">
        <li class="list-group-item"
            v-for="(OPER, index) in business.projectOperatingArray"
            :key="index">
          <span class="time">{{OPER.updateAt}}</span>
          <span class="content">{{OPER.content}}</span>
          <span class="operator">{{OPER.operatorName}}</span>
        </li>
      </ul>
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
      this.paths.push({ name: '代开发票', url: '/business-handle-list-financial', present: false });
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

.normal-wrap {
  li.list-group-item {
    border-right: 0;
    border-top: 0;
    border-bottom: 0;
    border-left: 1px solid $gray-light;
    padding-left: 0;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-left: 5px;
    &:first-child {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
    &:last-child {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    &::before {
      content: ' ';
      position: absolute;
      left: -4px;
      top: 17px;
      width: 7px;
      height: 7px;
      background: $gray-light;
      border: 1px solid $body-bg;
      border-radius: 50%;
    }
    > span {
      display: inline-block;
      position: relative;
      &.time {
        margin-left: 15px;
      }
    }
  }
}
</style>
