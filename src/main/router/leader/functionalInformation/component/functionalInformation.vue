<template>
  <div class="company-detail-wrapper">
    <card>
      <company-detail :iniDepartment="department" v-if="checking" @edit="edit"></company-detail>
      <company-edit v-if="editing" @cancel="cancel" @editSuccess="editSuccess"></company-edit>
      <input-company v-if="adding" @reloadComList="reloadComList"></input-company>
      </p>
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
      department: {
        id: '',
        name: '',
        number: '',
        principalTelephone: '',
        authority: [{
          name: ''
        }]
      },
      departmentEmpty: {
        id: '',
        name: '',
        number: '',
        principalTelephone: '',
        authority: [{
          name: ''
        }]
      },
      editing: false,
      deleteShow: false,
      adding: false,
      checking: true
    };
  },
  computed: {
    departmentId () {
      return this.$route.params.id
    }
  },
  watch: {
    departmentId: function(val, oldVal) {
      if (val !== oldVal) {
        if (val === 'add') {  // 新建状态
          this.editing = false
          this.adding = true
          this.checking = false
          this.company = this.companyEmpty
        } else if (val === 'del') {
          this.deleteShow = true
        } else {  // 详情状态
          this.adding = false
          this.checking = true
          this.editing = false
          this.getDepartmentInfo()
        }
      }
    }
  },
  methods: {
    reloadComList () {
      this.$emit('reloadComList')
    },
    reloadList () {
      this.getDepartmentInfo()
    },
    editSuccess () {
      this.checking = true
      this.editing = false
    },
    getDepartmentInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getDepartmentInfo',
                platform: 'web',
                departmentId: this.departmentId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.department = rep.data.data
            // this.departmentArrayTrim(this.company)
            // this.opertionsArrayTrim(this.company)
            // this.selectionsArrayTrim(this.company)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    // opertionsArrayTrim (company) {
    //   let arr = []
    //   this.company.reportTypeOption.forEach((item, index) => {
    //     arr.push(item.name)
    //   })
    //   this.company.opertionsArray = arr
    // },
    // selectionsArrayTrim (company) {
    //   let arr = []
    //   this.company.reportType.forEach((item, index) => {
    //     arr.push(item.name)
    //   })
    //   this.company.selectionsArray = arr
    // },
    // departmentArrayTrim (company) {
    //   company.departmentArray.forEach((item, index) => {
    //     item.editing = false
    //   })
    // },
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
    this.getDepartmentInfo()
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
