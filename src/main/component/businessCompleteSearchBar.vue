<template>
  <form class="form-inline higherForm">
    <div class="row">
      <div class="col-md-11">
        <div class="col-md-4 ta-c">
          <div class="form-group">
            <label for="projectName">委托单位</label>
            <input type="text" class="form-control" id="projectName" placeholder="请输入委托单位" v-model="sea.requester">
          </div>
        </div>
        <div class="col-md-4 ta-c">
          <div class="form-group">
            <label for="agency">联系人</label>
            <input type="text" class="form-control" id="agency" placeholder="请输入联系人" v-model="sea.requesterName">
          </div>
        </div>
        <div class="col-md-4 ta-c">
          <div class="form-group">
            <label for="tenderPerson">申请人</label>
            <input type="text" class="form-control" id="tenderPerson" placeholder="请输入申请人" v-model="sea.applicantName">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-11">
        <div class="col-md-4 ta-c">
          <div class="form-group">
            <label for="projectName">项目金额</label>
            <div class="input-group">
              <select class="form-control" v-model="sea.amount">
                <option :value="AMO" v-for="(AMO, index) in amounts" :key="index">{{AMO}}</option>
              </select>
              <div class="input-group-addon">元</div>
            </div>
          </div>
        </div>
        <div class="col-md-4 ta-c">
          <div class="form-group">
            <label for="agency">业务类型</label>
            <select class="form-control type" v-model="sea.type">
              <option :value="TYPE" v-for="(TYPE, index) in types" :key="index">{{TYPE}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4 ta-c"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-11">
        <div class="col-md-4 ta-c">
          <div class="form-group">
            <label for="tenderPerson">项目完成时间起</label>
            <input type="date"
                   class="form-control"
                   placeholder="请输入时间区间起"
                   v-model.trim="sea.time.start">
          </div>
        </div>
        <div class="col-md-4 ta-c">
          <div class="form-group">
            <label for="tenderPerson">项目完成时间止</label>
            <input type="date"
                   class="form-control"
                   placeholder="请输入时间区间止"
                   v-model.trim="sea.time.end">
          </div>
        </div>
        <div class="col-md-4">
          <div class="search-btns ta-c f-r">
            <button type="button" class="btn my-btn submit-btn" @click="higherSearchEvent()">查找</button>
            <button type="button" class="btn my-btn draft-btn" @click="reset()">重置</button>
          </div>
        </div>
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
          start: null,
          end: null
        },
        amount: '所有',
        type: '所有',
      },
      seaEmpty: {
        requester: '',
        requesterName: '',
        applicantName: '',
        time: {
          start: null,
          end: null
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
    higherSearchEvent () {
      if (this.sea.amount === '所有') {
        this.sea.amount = ''
      }
      if (this.sea.type === '所有') {
        this.sea.type = ''
      }
      this.$emit('higherSearchEvent', this.sea)
    },
    reset () {
      this.$emit('reset')
      this.sea = this.seaEmpty
    }
  }
};
</script>

<style lang="sass" scoped>
.normal-wrap {
  margin-top: 100px;
}
.higherForm {
  margin-top: -40px;
  .form-group {
    width: 100%;
    label {
      width: 25%;
    }
    input {
      width: 70%;
    }
    .input-group {
      width: 70%;
    }
  }
}
.form-inline .type {
    width: 70%;
}
.row {
    margin-bottom: 20px;
}
.submit-btn {
  margin-right: 30px;
}
.search-btns {
  margin-right: 10px;
}
</style>
