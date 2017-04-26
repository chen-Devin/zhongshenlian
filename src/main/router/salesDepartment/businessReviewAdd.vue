<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3>
        新建业务
        <div class="pull-right">
          <button class="btn btn-success" @click="sub()">提交</button>
          <button class="btn btn-warning" @click="sav()">暂存</button>
          <button class="btn btn-danger" @click="del()">撤销</button>
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
import axios from 'axios';
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
        { name: '待审核业务', url: '/business-review-list-sales', present: false },
        { name: '创建新任务', url: '/business-review-add', present: true },
      ],
      business: {
        id: '',
        name: '',
        proposer: {
          id: this.user.id,
          name: this.user.name,
          tele: this.user.telephone
        },
        institution: {
          id: '',
          customerName: '',
          name: '',
          telephone: '',
        },
        type: '',
        manager: {
          id: '',
          name: ''
        },
        time: {
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
        assetAmount: 0,
        contractAmount: 0,
        contractPrice: 0,
        report: {
          type: [
            {
              name: '会计所',
              code: 'TZUk',
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
                }
              ]
            },{
              name: '评估所',
              code: 'TZUp',
              words: [
                {
                  name: '评字',
                  code: '01',
                  state: false
                },{
                  name: '评咨字',
                  code: '02',
                  state: false
                }
              ]
            },{
              name: '税务所',
              code: 'TZUs',
              words: [
                {
                  name: '税鉴字',
                  code: '01',
                  state: false
                }
              ]
            },{
              name: '造价所',
              code: 'TZUz',
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
                }
              ]
            },{
              name: 'DX',
              code: 'DX',
              words: [
                {
                  name: 'DX',
                  code: 'DX',
                  state: false
                }
              ]
            },{
              name: 'BH',
              code: 'BH',
              words: [
                {
                  name: 'BH',
                  code: 'BH',
                  state: false
                }
              ]
            }
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
            main: { name: '主要部门', percentage: 0 },
            coop: [{ name: '', percentage: 0 }]
          },
        },
        reviewCPA: {
          id: '',
          name: ''
        },
        reviewAssistant: {
          id: '',
          name: ''
        },
        lastOffice: '',
        getWay: [
          {
            name: '直接委托',
            state: false
          },{
            name: '中标委托',
            state: false
          },
        ],
        files: [],
        projectStatus: 1,
        contracts: [],
        projectApproverArray: [],
        projectSchduleArray: [],
        bills: [],
        reports: [],
        projectOperatingArray: [],
        QRCode: {
          id: '',
          name: '',
          url: ''
        }
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
      this.business = submitedBusiness;
      this.$message({
        message: '提交成功，将返回待审核业务列表',
        type: 'success'
      });
      setTimeout(() => {
        this.$router.push({ path: '/business-review-list-sales' });
      }, 1000);
    },
    sav() {
      bus.$emit('savBusiness');
    },
    saved(savedBusiness) {
      this.business = savedBusiness;
      this.$message('暂存成功');
    },
    del() {
      this.showDelModal = true;
    },
    deleted() {
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
