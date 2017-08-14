<template>
  <div class="company-detail-wrapper">
    <card>
      <company-detail :iniCompany="company" v-if="checking" @edit="edit"></company-detail>
      <company-edit v-if="editing" @cancel="cancel" @editSuccess="editSuccess"></company-edit>
      <input-company v-if="adding" @reloadComList="reloadComList"></input-company>
      </p>
    </card>
    <card>
      <company-department
        :iniCompany="company"
        :iniDepartmentArray="company.departmentArray"
        @reloadList="reloadList"></company-department>
    </card>
    <company-del @cancel="cancelDelete" v-if="deleteShow" @reloadComList="reloadComList"></company-del>
  </div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import companyDetail from './companyDetail.vue';
import companyEdit from './companyEdit.vue';
import inputCompany from './inputCompany.vue';
import companyDepartment from './companyDepartment.vue';
import companyDel from './companyDel.vue';

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
        reportType: [{
          name: ''
        }],
        reportTypeOption: [{
          name: ''
        }],
        counselorTagArray: [{
          counselorTag: ''
        }],
        opertionsArray: [],
        selectionsArray: []
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
        reportType: [{
          name: ''
        }],
        reportTypeOption: [{
          name: ''
        }],
        counselorTagArray: [{
          counselorTag: ''
        }]
      },
      editing: false,
      deleteShow: false,
      cancelBtn: true,
      adding: false,
      checking: true
    };
  },
  computed: {
    companyPath () {
      // console.log(this.$route.path)
      return this.$route.path
    },
    companyId () {
      return this.$route.params.id
    }
  },
  watch: {
    companyId: function(val, oldVal) {
      if (val !== oldVal) {
        if (val === 'add') {  // 新建状态
          this.editing = false
          this.adding = true
          this.checking = false
          this.company = this.companyEmpty
          this.cancelBtn = false
        } else if (val === 'del') {
          this.deleteShow = true
          // this.adding = false
        } else {  // 详情状态
          this.adding = false
          this.checking = true
          this.cancelBtn = true
          this.editing = false
          this.getCompanyInfo()
        }
      }
    }
  },
  methods: {
    reloadComList () {
      this.$emit('reloadComList')
    },
    reloadList () {
      this.getCompanyInfo()
    },
    editSuccess () {
      this.getCompanyInfo()
      this.checking = true
      this.editing = false
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
            this.opertionsArrayTrim(this.company)
            this.selectionsArrayTrim(this.company)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    opertionsArrayTrim (company) {
      let arr = []
      this.company.reportTypeOption.forEach((item, index) => {
        arr.push(item.name)
      })
      this.company.opertionsArray = arr
    },
    selectionsArrayTrim (company) {
      let arr = []
      this.company.reportType.forEach((item, index) => {
        arr.push(item.name)
      })
      this.company.selectionsArray = arr
    },
    departmentArrayTrim (company) {
      company.departmentArray.forEach((item, index) => {
        item.editing = false
      })
    },
    edit () {
      this.checking = false
      this.editing = true
    },
    cancel () {
      this.editing = false
      this.checking = true
    },
    cancelDelete () {
      this.deleteShow = false
    },
    delSuccess () {
      this.$emit('delSuccess')
    }
  },
  created() {
    this.getCompanyInfo()
    setTimeout(() => {
      if (this.companyPath === '/company-management/add') {
        this.editing = false
        this.adding = true
        this.checking = false
        this.company = this.companyEmpty
        this.cancelBtn = false
      }
    }, 100)
  },
  components: {
    card,
    companyDetail,
    companyEdit,
    inputCompany,
    companyDepartment,
    companyDel
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
