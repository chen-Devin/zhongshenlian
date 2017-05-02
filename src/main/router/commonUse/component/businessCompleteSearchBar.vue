<template>
  <div class="search-wrap">
    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-sm-12">
          <div class="input-group">
            <input type="text"
                   class="form-control"
                   placeholder="请输入委托单位、委托单位联系人或提交申请人进行搜索"
                   v-model="sea.cont">
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button" @click="search()">搜索</button>
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">业务完成时间</label>
        <div class="col-sm-5">
          <div class="input-group">
            <div class="input-group-addon">开始时间</div>
            <input type="date"
                   class="form-control"
                   placeholder="请输入开始时间"
                   v-model="sea.time.start"
                   @change="search()">
          </div>
        </div>
        <div class="col-sm-5">
          <div class="input-group">
            <div class="input-group-addon">结束时间</div>
            <input type="date"
                   class="form-control"
                   placeholder="请输入结束时间"
                   v-model="sea.time.end"
                   @change="search()">
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-6">
          <div class="input-group">
            <div class="input-group-addon">项目金额</div>
            <select class="form-control" v-model="sea.amount" @change="search()">
              <option :value="AMO" v-for="(AMO, index) in amounts" :key="index">{{AMO}}</option>
            </select>
            <div class="input-group-addon">万元</div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group">
            <div class="input-group-addon">业务类型</div>
            <select class="form-control" v-model="sea.type" @change="search()">
              <option :value="TYPE" v-for="(TYPE, index) in types" :key="index">{{TYPE}}</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'businessCompleteSearchBar',
  data() {
    return {
      sea: {
        cont: '',
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
.search-wrap {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
