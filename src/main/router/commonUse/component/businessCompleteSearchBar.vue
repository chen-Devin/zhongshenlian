<template>
  <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent="search">
    <div class="form-group">
      <div class="col-sm-4 row">
        <label class="col-xs-3 control-label">委托单位</label>
        <div class="col-xs-9">
          <input type="text" class="form-control" placeholder="请输入委托单位" v-model.trim="sea.requester">
        </div>
      </div>
      <div class="col-sm-4 row">
        <label class="col-xs-3 control-label">联系人</label>
        <div class="col-xs-9">
          <input type="text" class="form-control" placeholder="请输入联系人" v-model.trim="sea.requesterName">
        </div>
      </div>
      <div class="col-sm-4 row">
        <label class="col-xs-3 control-label">申请人</label>
        <div class="col-xs-9">
          <input type="text" class="form-control" placeholder="请输入申请人" v-model.trim="sea.applicantName">
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-6 row">
        <label class="col-xs-2 control-label">项目金额</label>
        <div class="col-xs-10">
          <div class="input-group">
            <select class="form-control" v-model="sea.amount" @change="search()">
              <option :value="AMO" v-for="(AMO, index) in amounts" :key="index">{{AMO}}</option>
            </select>
            <div class="input-group-addon">元</div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 row">
        <label class="col-xs-2 control-label">业务类型</label>
        <div class="col-xs-10">
          <select class="form-control" v-model="sea.type" @change="search()">
            <option :value="TYPE" v-for="(TYPE, index) in types" :key="index">{{TYPE}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12 row">
        <label class="col-xs-1 control-label">项目完成时间</label>
        <div class="col-xs-5">
          <input type="date"
                 class="form-control"
                 placeholder="请输入时间区间起点"
                 v-model.trim="sea.time.start"
                 @change="search()">
        </div>
        <div class="col-xs-5">
          <input type="date"
                 class="form-control"
                 placeholder="请输入时间区间终点"
                 v-model.trim="sea.time.end"
                 @change="search()">
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12">
        <button class="btn btn-primary" type="button" @click="search">
          查询
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'businessCompleteSearchBar',
  data() {
    return {
      sea: {
        requester: '',
        requesterName: '',
        applicantName: '',
        time: {
          start: '',
          end: ''
        },
        amount: '所有',
        type: '所有',
      },
      amounts: [
        '所有',
        '0.1-2',
        '2-8',
        '8-20',
        '20以上'
      ],
      types: [
        '所有',
        '年度报告审计',
        '中期报告审计',
        '专项资金收支使用情况审计',
        '经济责任审计',
        '资产清查、清产核资审计',
        '财务收支审计',
        '高新、软件企业审计',
        '金融企业审计',
        '改组、股权转让审计',
        '发债申报审计',
        '并购重组审计',
        '内部制度审计',
        '评估前审计',
        '收入、支出、成本等专项审计',
        '外资权益确认审计',
        '工程决算',
        '验资',
        '审阅',
        '咨询',
        '评估',
        '税审',
        '工程结算',
        '其他'
      ]
    };
  },
  methods: {
    search() {
      this.$emit('search', this.sea);
    }
  }
};
</script>

<style style="sass" scoped>
</style>
