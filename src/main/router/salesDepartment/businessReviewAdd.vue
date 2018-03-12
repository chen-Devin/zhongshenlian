<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        立项申请
        <div class="pull-right">
          <button class="btn my-btn submit-btn" @click="sub()" :disabled="commitDisable">提交</button>
          <button class="btn my-btn draft-btn" @click="sav()" :disabled="commitDisable">暂存</button>
          <button class="btn my-btn cancel-btn mr-10" @click="del()" :disabled="commitDisable">撤销</button>
        </div>
      </h3>
      <business-editor :initBusiness="business"
                       :editable="editable"
                       @saved="saved"
                       @submited="submited"
                       @uploaded="uploaded"
                       @deletedFile="deletedFile"
                       @refuseSub="refuseSub"></business-editor>
    </card>
    <business-del-modal v-if="showDelModal"
                        :initalBusiness="business"
                        @deleted="deleted"
                        @canceled="delCanceled"></business-del-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import { Message } from 'element-ui';

import bus from '../../bus.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import businessEditor from './component/businessEditor.vue';
import businessDelModal from './component/businessDelModal.vue';

Vue.prototype.$message = Message;

export default {
  name: 'businessReviewAdd',
  data() {
    return {
      paths: [
        { name: '立项项目', url: '/business-review-list-sales', present: false },
        { name: '立项申请', url: '/business-review-add', present: true },
      ],
      commitDisable: false,
      business: {
        id: '',
        name: '',
        projectManager: '',
        proposer: {
          id: this.user.id,
          name: this.user.name,
          tele: this.user.telephone
        },
        institution: {
          id: '',
          customerName: '',
          name: '',
          telephone: ''
        },
        basisQuote: '',
        type: '',
        manager: {
          id: '',
          name: ''
        },
        time: {
          start: '',
            // (() => {
            //   let t = new Date();
            //   let Y = t.getFullYear();
            //   let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            //   let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            //   return `${Y}-${M}-${D}`;
            // })(),
          end: ''
            // (() => {
            //   let t = new Date();
            //   let Y = t.getFullYear();
            //   let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            //   let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            //   return `${Y}-${M}-${D}`;
            // })(),
        },
        contractAmount: '',
        feeBasis: '',
        feeBasisExist: false,
        feeRate: 0,
        report: {
          type: [
            {
              name: '会计所',
              code: 'TZUk',
              state: false,
              words: [
                {
                  name: '审字',
                  code: '01',
                  state: false
                },{
                  name: '专字',
                  code: '02',
                  state: false
                },{
                  name: '咨字',
                  code: '03',
                  state: false
                },{
                  name: '基决审字',
                  code: '04',
                  state: false
                },{
                  name: '外汇检字',
                  code: '05',
                  state: false
                },{
                  name: '验字',
                  code: '06',
                  state: false
                },{
                  name: '外审字',
                  code: '07',
                  state: false
                },{
                  name: '无报告',
                  code: '08',
                  state: false
                }
              ]
            },{
              name: '评估所',
              code: 'TZUp',
              state: false,
              words: [
                {
                  name: '评字',
                  code: '01',
                  state: false
                },{
                  name: '评咨字',
                  code: '02',
                  state: false
                },{
                  name: '无报告',
                  code: '03',
                  state: false
                }
              ]
            },{
              name: '税务所',
              code: 'TZUs',
              state: false,
              words: [
                {
                  name: '税鉴字',
                  code: '01',
                  state: false
                },{
                  name: '无报告',
                  code: '02',
                  state: false
                }
              ]
            },{
              name: '造价所',
              code: 'TZUz',
              state: false,
              words: [
                {
                  name: '基结审字',
                  code: '01',
                  state: false,
                },{
                  name: '评审字',
                  code: '02',
                  state: false,
                },{
                  name: '概审字',
                  code: '03',
                  state: false,
                },{
                  name: '咨字',
                  code: '04',
                  state: false
                },{
                  name: '无报告',
                  code: '05',
                  state: false
                }
              ]
            }
            // ,{
            //   name: 'BH',
            //   code: 'BH',
            //   state: false,
            //   words: [
            //     {
            //       name: '审字',
            //       code: '01',
            //       state: false
            //     },{
            //       name: '专字',
            //       code: '02',
            //       state: false
            //     },{
            //       name: '咨字',
            //       code: '03',
            //       state: false
            //     },{
            //       name: '基决审字',
            //       code: '04',
            //       state: false
            //     },{
            //       name: '外汇检字',
            //       code: '05',
            //       state: false
            //     },{
            //       name: '验字',
            //       code: '06',
            //       state: false
            //     },{
            //       name: '外审字',
            //       code: '07',
            //       state: false
            //     },{
            //       name: '无报告',
            //       code: '08',
            //       state: false
            //     }
            //   ]
            // },{
            //   name: 'QT',
            //   code: 'QT',
            //   state: false,
            //   words: [
            //     {
            //       name: '审字',
            //       code: '01',
            //       state: false
            //     },{
            //       name: '专字',
            //       code: '02',
            //       state: false
            //     },{
            //       name: '咨字',
            //       code: '03',
            //       state: false
            //     },{
            //       name: '基决审字',
            //       code: '04',
            //       state: false
            //     },{
            //       name: '外汇检字',
            //       code: '05',
            //       state: false
            //     },{
            //       name: '验字',
            //       code: '06',
            //       state: false
            //     },{
            //       name: '外审字',
            //       code: '07',
            //       state: false
            //     },{
            //       name: '无报告',
            //       code: '08',
            //       state: false
            //     }
            //   ]
            // },{
            //   name: '无报告',
            //   code: '无报告',
            //   state: false,
            //   words: [
            //     {
            //       name: '无',
            //       code: '01',
            //       state: false
            //     }
            //   ]
            // }
          ],
          amount: 0,
          usage: ''
        },
        number: '',
        auditTime: {
          exist: false,
          start: (() => {
            let t = new Date();
            let Y = t.getFullYear();
            let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            return `${Y}-${M}-${D}`;
          })(),
          end: (() => {
            let t = new Date();
            let Y = t.getFullYear();
            let M = (t.getMonth() + 1 < 10) ? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`;
            let D = (t.getDate() < 10) ? `0${t.getDate()}` : `${t.getDate()}`;
            return `${Y}-${M}-${D}`;
          })(),
        },
        beingAuditedUnit: [{
          unit: ''
        }],
        contractType: {
          name: '非联合体',
          basicFee: {
            main: { name: '', percentage: 0 },
            depend: [{ name: '', percentage: 0 }]
          },
          benefitFee: {
            main: { name: '', percentage: 0 },
            depend: [{ name: '', percentage: 0 }]
          }
        },
        departmentCoop: {
          name: '无部门合作',
          departments: {
            main: { name: this.user.subDepartment, percentage: 0 },
            coop: [{ name: '', percentage: 0 }]
          },
        },
        reviewCPA: [{
          id: '',
          name: ''
        }],
        reviewAssistant: [{
          id: '',
          name: ''
        }],
        lastOffice: '',
        getWay: '直接委托',
        projectStatus: 0,
        contracts: [],
        projectApproverArray: [],
        schdules: [
          {
            name: '审前调查',
            state: false
          },{
            name: '现场工作',
            state: false
          },{
            name: '整理底稿',
            state: false
          },{
            name: '客户沟通',
            state: false
          },{
            name: '报告初稿',
            state: false
          }
        ],
        billState: 0,
        bills: [],
        reports: [],
        projectOperatingArray: []
      },
      editable: true,
      showDelModal: false
    };
  },
  props: ['user'],
  methods: {
    sub() {
      bus.$emit('subBusiness');
    },
    submited(submitedBusiness) {
      this.commitDisable = false
      this.business = submitedBusiness;
      this.$message({
        message: '提交成功，将返回立项审批列表',
        type: 'success'
      });
      this.$router.push({ path: '/business-review-list-sales' });
    },
    sav() {
      bus.$emit('savBusiness');
    },
    saved(savedBusiness) {
      this.commitDisable = false
      this.business = savedBusiness;
      this.$message('暂存成功，将返回立项审批列表');
      this.$router.push({ path: '/business-review-list-sales' });
    },
    del() {
      this.commitDisable = true
      this.showDelModal = true;
    },
    deleted() {
      this.commitDisable = false
      this.showDelModal = false;
      this.$router.push({ path: '/business-review-list-sales' });
    },
    delCanceled() {
      this.showDelModal = false;
    },
    uploaded(uploadedBusiness) {
      this.business = uploadedBusiness;
    },
    deletedFile(deletedFileBusiness) {
      this.business = deletedFileBusiness;
    },
    refuseSub(msg) {
      this.$message({
        message: msg,
        type: 'warning'
      });
    }
  },
  created () {
    bus.$on('subing', () => { this.commitDisable = true });
    var _this = this
    this.$store.dispatch('fetchUserInfo').then(function () {
      var usear = _this.$store.getters.getUser;
      console.log(usear.companyName)
      var test1 = /会计/
      var test2 = /评估/
      var test3 = /税务/
      var test4 = /造价/
      if (test1.test(usear.companyName)) {
        _this.business.report.type[0].state = true
      } else if (test2.test(usear.companyName)) {
        _this.business.report.type[1].state = true
      } else if (test3.test(usear.companyName)) {
        _this.business.report.type[2].state = true
      } else if (test4.test(usear.companyName)) {
        _this.business.report.type[3].state = true
      }
     }, function () {});
  },
  components: {
    crumbs,
    card,
    businessEditor,
    businessDelModal
  }
};
</script>

<style lang="sass" scoped>

</style>
