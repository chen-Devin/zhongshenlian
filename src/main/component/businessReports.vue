<template>
  <div class="normal-wrap">
    <h4 class="main-title">
      业务报告
      <button class="btn btn-primary pull-right"
              @click="addReport()"
              v-if="salesShow">
        新增业务报告
      </button>
    </h4>
    <div class="com-list list-group">
      <li class="list-group-item list-head">
        <span class="title">报告列表</span>
      </li>
      <li class="list-group-item row">
        <div class="col-xs-4">报告名称</div>
        <div class="col-xs-1">附件</div>
        <div class="col-xs-1" v-if="salesShow">修改</div>
        <div class="col-xs-1">复审状态</div>
        <div class="col-xs-1">下载二维码</div>
      </li>
      <li class="list-group-item row"
          v-for="(REPORT, index) in business.reports"
          :key="index">
        <div class="col-xs-4">{{REPORT.name}}</div>
        <div class="col-xs-1">
          <a class="text-primary title"
             :href="REPORT.url"
             download>下载</a>
        </div>
        <div class="col-xs-1" v-if="salesShow">
          <a class="text-primary title"
             @click="REPORT.url">修改</a>
        </div>
        <div class="col-xs-1">
          <template v-if="riskShow">{{}}</template>
          <template v-if="!riskShow">
            <span class="label label-warning"
                  v-if="BUSINESS.projectStatus<130">未复审</span>
            <span class="label label-info"
                  v-else-if="BUSINESS.projectStatus===130">待复审</span>
          </template>
        </div>
        <div class="col-xs-1">
          <template v-if="archivesShow">{{}}</template>
          <template v-if="!archivesShow">
            <span class="label label-warning"
                  v-if="BUSINESS.projectStatus<130">未复审</span>
            <span class="label label-info"
                  v-else-if="BUSINESS.projectStatus===130">待复审</span>
          </template>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'businessReports',
  data() {
    return {
      paths: [],
      business: this.initBusiness
    };
  },
  computed: {
    salesShow() {
      return this.user.department === '业务部' ? true : false;
    },
    riskShow() {
      return this.user.department === '风险评估部' ? true : false;
    },
    archivesShow() {
      return this.user.department === '档案部' ? true : false;
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-sales-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-risk-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-leader-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-office-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-financial-${this.$route.params.id}/business-reports`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/business-reports`, present: false });
      this.paths.push({ name: '业务报告', url: `/business-handle-detail-archives-${this.$route.params.id}/business-reports`, present: true });
    }
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    currencyToNum(amo) {
      let amoArr = amo.split(',').reverse();
      let amoNum = 0;
      for (let i = 0; i < amoArr.length; i++) {
        amoNum += parseFloat(amoArr[i])*Math.pow(1000, i);
      }
      return amoNum;
    },
    billRoute(BILL) {
      return 'business-reports-detail-'+BILL.id;
    }
  }
};
</script>

<style lang="sass" scoped>
.total-amount {
  margin-top: 30px;
}
</style>
