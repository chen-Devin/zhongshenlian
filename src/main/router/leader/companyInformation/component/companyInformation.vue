<template>
  <div class="company-detail-wrapper">
    <card>
      <company-detail :iniCompany="company" v-show="!editing"></company-detail>
      <company-edit  :iniCompany="company" v-show="editing"></company-edit>
      <p class="btns">
        <button type="button" class="btn my-btn submit-btn" @click="edit" v-if="!editing">编辑</button>
        <template v-if="editing">
          <button type="button" class="btn my-btn draft-btn" @click="cancel">取消</button>
          <button type="button" class="btn my-btn submit-btn" @click="submit">保存</button>
        </template>
      </p>
    </card>
    <card>
      <company-department :iniCompany="company" :iniDepartmentArray="departmentArray"></company-department>
    </card>
  </div>
</template>

<script>
import card from '@/main/component/card.vue';
import companyDetail from './companyDetail.vue';
import companyEdit from './companyEdit.vue';
import companyDepartment from './companyDepartment.vue';

export default {
  name: 'companyInformation',
  data() {
    return {
      company: {
        id: '',
        name: '',
        number: '',
        creditCode: '',
        legalPersonId: '',
        legalPersonName: '',
        legalPersonTelephone: '',
        principalId: '',
        principalName: '',
        principalTelephone: '',
        mainWork: '',
        openAccountBankName: '',
        openAccountBankNumber: '',
        reportTypeArray: [{
          reportType: ''
        }],
        counselorTagArray: [{
          counselorTag: ''
        }]
      },
      editing: false
    };
  },
  computed: {
    companyId () {
      return this.$route.params.id
    }
  },
  methods: {
    getCompanyInfo () {
      this.company = {
        id: '1',
        name: '天津市科学技术委员会科技有限公司',
        number: 'G001',
        creditCode: '44030019612391L',
        legalPersonId: 'G001',
        legalPersonName: '王铁松',
        legalPersonTelephone: '1',
        principalId: '1',
        principalName: '王铁松',
        principalTelephone: '1',
        mainWork: '会计、审计服务等',
        openAccountBankName: '招商银行',
        openAccountBankNumber: '11014714864000',
        reportTypeArray: [{
          reportType: '审字'
        }, {
          reportType: '审字'
        }, {
          reportType: '审字'
        }, {
          reportType: '审字'
        }, {
          reportType: '审字'
        }, {
          reportType: '审字'
        }, {
          reportType: '审字'
        }, {
          reportType: '审字'
        }],
        counselorTagArray: [{
          counselorTag: ''
        }]
      };
      this.departmentArray = [{
        id: '1',
        name: '业务1部',
        number: 'Y001',
        principalId: '1',
        principalName: '',
        authorityType: '同部门之间业务可见',
        principalTelephone: ''
      }, {
        id: '1',
        name: '业务1部',
        number: 'Y001',
        principalId: '1',
        principalName: '',
        authorityType: '同部门之间业务可见',
        principalTelephone: ''
      }]
      // this.$router.push(`/company-management/${this.companyList[0].id}`);
      // return new Promise((resolve, reject) => {
      //   axios({
      //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      //     method: 'get',
      //     url: '/service',
      //     params: {
      //       data: (() => {
      //         let obj = {
      //           command: 'getCompanyInfo',
      //           platform: 'web',
      //           companyId: this.companyId
      //         }
      //         return JSON.stringify(obj);
      //       })()
      //     }
      //   }).then((rep) => {
      //     if (rep.data.statusCode === '10001') {
      //       resolve('done');
      //     }
      //   }, (rep) => { });
      // })
    },
    edit () {
      this.editing = true
    },
    cancel () {
      this.editing = false
    },
    submit () {

    }
  },
  created() {
    this.getCompanyInfo()
  },
  components: {
    card,
    companyDetail,
    companyEdit,
    companyDepartment
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

.company-detail-wrapper {
  .com-list {
    border: none;
    thead {
      background-color: #E6E6E6;
      th {
        text-align: center;
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
        }
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
  .btns {
    margin-top: 10px;
    margin-bottom: 0;
    text-align: right;
  }
}
</style>
