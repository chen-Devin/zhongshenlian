<template>
  <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
    <div class="form-group" v-for="(SCHDULE, index) in business.schdules" :key="index">
      <div class="checkbox col-sm-offset-2 col-sm-10">
        <label>
          <input type="checkbox"
                 v-model="SCHDULE.state"
                 @change="stateChan(SCHDULE)"
                 :disabled="!editable">
          {{SCHDULE.name}}
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
      paths: [],
      business: this.initBusiness
    };
  },
  computed: {
    editable() {
      return true;
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-sales-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-risk-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-leader-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-office-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '代开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-financial-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-archives-${this.$route.params.id}/business-conduct`, present: true });
    }
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    stateChan(SCHDULE) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              let obj = {
                command: 'addBusniessInfo',
                platform: 'web',
                data: {
                  id: this.business.id,
                  projectName: this.business.name,
                  contractNo: this.business.number,
                  requester: this.business.institution.customerName,
                  requesterId: this.business.institution.id,
                  requesterName: this.business.institution.name,
                  requesterPhone: this.business.institution.telephone,
                  reportPurpose: this.business.report.usage,
                  startTime: this.business.time.start,
                  endTime: this.business.time.end,
                  totalAssets: this.business.institution.assetSize,
                  contractAmount: this.business.contractAmount,
                  contractPrice: this.business.contractPrice,
                  reportCopies: this.business.report.amount,
                  reportType: (() => {
                    let out = [];
                    for (let i = 0; i < this.business.report.type.length; i++) {
                      let flag = false;
                      let typeArray = [];
                      for (let j = 0; j < this.business.report.type[i].words.length; j++) {
                        if (this.business.report.type[i].words[j].state) {
                          flag = true;
                          typeArray.push({
                            name: this.business.report.type[i].words[j].name
                          });
                        }
                      }
                      if (flag) {
                        out.push({
                          department: this.business.report.type[i].name,
                          typeArray
                        });
                      }
                    }
                    return out;
                  })(),
                  businessType: this.business.type,
                  projectStatus: this.business.projectStatus,
                  projectManagerId: this.business.manager.id,
                  projectManagerName: this.business.manager.name,
                  //手动输入
                  projectManager: this.business.manager.name,
                  checkStartTime: this.business.auditTime.start,
                  checkEndTime: this.business.auditTime.end,
                  cooperationDepartment: (() => {
                    let out = {};
                    if (this.business.departmentCoop.name === '有部门合作') {
                      out.mainRate = this.business.departmentCoop.departments.main.percentage;
                      out.otherArray = [];
                      for (let i = 0; i < this.business.departmentCoop.departments.coop.length; i++) {
                        out.otherArray.push({
                          cooperation: this.business.departmentCoop.departments.coop[i].name,
                          cooperationRate: this.business.departmentCoop.departments.coop[i].percentage
                        });
                      }
                    }
                    return out;
                  })(),
                  trialTeacherId: this.business.reviewCPA.id,
                  trialTeacherName: this.business.reviewCPA.name,
                  //手动输入
                  trialTeacher: this.business.reviewCPA.name,
                  trialAssistantId: this.business.reviewAssistant.id,
                  trialAssistantName: this.business.reviewAssistant.name,
                  //手动输入
                  trialAssistant: this.business.reviewAssistant.name,
                  lastOffice: this.business.lastOffice,
                  getWay: this.business.getWay,
                  contractType: (() => {
                    let out = {
                      type: this.business.contractType.name,
                      mainBasicName: this.business.contractType.basicFee.main.name,
                      mainBasicRate: this.business.contractType.basicFee.main.percentage,
                      mainEfficiencyName: this.business.contractType.benefitFee.main.name,
                      mainEfficiencyRate: this.business.contractType.benefitFee.main.percentage,
                      subBasicArray: [],
                      subEfficiencyArray: []
                    };
                    for (let i = 0; i < this.business.contractType.basicFee.depend.length; i++) {
                      out.subBasicArray.push({
                        name: this.business.contractType.basicFee.depend[i].name,
                        rate: this.business.contractType.basicFee.depend[i].percentage
                      });
                    }
                    for (let i = 0; i < this.business.contractType.benefitFee.depend.length; i++) {
                      out.subEfficiencyArray.push({
                        name: this.business.contractType.benefitFee.depend[i].name,
                        rate: this.business.contractType.benefitFee.depend[i].percentage
                      });
                    }
                    return out;
                  })(),
                  annexArray: this.business.files,
                  contractAnnexArray: this.business.contracts,
                  projectApproverArray: this.business.projectApproverArray,
                  projectSchduleArray: (() => {
                    let arr = [];
                    for (let i = 0; i < this.business.schdules.length; i++) {
                      let obj = {
                        name: this.business.schdules[i].name,
                        state: this.business.schdules[i].state === true ? '0' : '1'
                      };
                      arr.push(obj);
                    }
                    return arr;
                  })(),
                  projectBillingArray: this.business.bills,
                  projectOperatingArray: this.business.projectOperatingArray
                }
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      });
      return promise;
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
