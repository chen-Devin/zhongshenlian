<template>
  <div class="company-detail-wrapper">
    <card>
      <company-detail :iniCompany="company" v-show="!editing"></company-detail>
      <company-edit  :iniCompany="company" v-show="editing" :iniAddORedit="addORedit"></company-edit>
      <p class="btns">
        <button type="button" class="btn my-btn submit-btn" @click="edit" v-if="!editing">编辑</button>
        <template v-if="editing">
          <button type="button" class="btn my-btn draft-btn" @click="cancel">取消</button>
          <button type="button" class="btn my-btn submit-btn" @click="submit">保存</button>
        </template>
      </p>
    </card>
    <card>
      <company-department 
        :iniCompany="company"
        :iniDepartmentArray="company.departmentArray"
        @reloadList="reloadList"></company-department>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
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
        departmentArray: {
          id: '',
          name: '',
          number: '',
          principalId: '',
          principalName: '',
          authorityType: '',
          principalTelephone: '',
          editing: false
        },
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
      companyEmpty: {
        id: '',
        name: '',
        number: '',
        creditCode: '',
        departmentArray: [{
          id: '',
          name: '',
          number: '',
          principalId: '',
          principalName: '',
          authorityType: '',
          principalTelephone: '',
          editing: false
        }],
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
      editing: false,
      addORedit: 'edit'
    };
  },
  computed: {
    companyId () {
      return this.$route.params.id
    }
  },
  watch: {
    companyId: function(val, oldVal) {
      console.log(val, typeof val)
      if (val !== oldVal) {
        if (val === 'add') {
          this.addORedit = 'add'
          this.editing = true
          this.company = this.companyEmpty
        } else if (val === 'del') {

        } else {
          this.editing = false
          this.getCompanyInfo()
        }
      }
    }
  },
  methods: {
    reloadList () {
      this.getCompanyInfo()
    },
    getCompanyInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getCompanyInfo',
                platform: 'web',
                companyId: this.companyId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.company = rep.data.data
            this.departmentArrayTrim(this.company)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    departmentArrayTrim (company) {
      company.departmentArray.forEach((item, index) => {
        item.editing = false
      })
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
