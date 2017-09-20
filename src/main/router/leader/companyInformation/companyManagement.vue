<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <button class="btn my-btn" @click="switchDepart">职能部门</button>
      <button class="btn my-btn" @click="switchDepart">业务部门</button>
    </card>
    <div v-if="functionShow">
      <company-list v-if="reloadList" @noticeJump="noticeJump"></company-list>
      <div class="company-wrapper">
        <router-view @reloadComList="reloadComList"></router-view>
      </div>
    </div>
    <div class="depart-wrapper" v-else>
      <card class="tree">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </card>
      <card class="detail">
        <company-detail :iniCompany="company" v-if="checking" @edit="edit"></company-detail>
        <company-edit v-if="editing" @cancel="cancel" @editSuccess="editSuccess"></company-edit>
      </card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import companyList from '@/main/router/leader/companyInformation/component/companyList.vue';
import companyDetail from './component/companyDetail.vue';
import companyEdit from './component/companyEdit.vue';

export default {
  name: 'companyManagement',
  data() {
    return {
      paths: [
        { name: '信息管理', url: '/business-review-list-leader', present: true },
        { name: '公司信息管理', url: '/business-review-list-leader', present: true }
      ],
      reloadList: true,
      functionShow: true,
      comId: '',
      checking: true,
      editing: false,
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
      data: [{
               label: '一级 1',
               children: [{
                 label: '二级 1-1',
                 children: [{
                   label: '三级 1-1-1'
                 }]
               }]
             }, {
               label: '一级 2',
               children: [{
                 label: '二级 2-1',
                 children: [{
                   label: '三级 2-1-1'
                 }]
               }, {
                 label: '二级 2-2',
                 children: [{
                   label: '三级 2-2-1'
                 }]
               }]
             }, {
               label: '一级 3',
               children: [{
                 label: '二级 3-1',
                 children: [{
                   label: '三级 3-1-1'
                 }]
               }, {
                 label: '二级 3-2',
                 children: [{
                   label: '三级 3-2-1'
                 }]
               }]
             }],
             defaultProps: {
                       children: 'children',
                       label: 'label'
                     }
    };
  },
  computed: {
    path1 () {
      return this.$route.path
    }
  },
  watch: {
    path1: function(val, oldVal) {
      if (val !== oldVal) {
        if (val === '/company-management') {
          this.$router.push(`/company-management/${this.comId}`)
        }
      }
    }
  },
  methods: {
    delSuccess () {
      this.reloadList = false
      this.reloadList = true
    },
    reloadComList () {
      this.reloadList = false
      setTimeout(() => {
        this.reloadList = true
      }, 100)
    },
    noticeJump (comId) {
      this.comId = comId
      this.$router.push(`/company-management/${comId}`)
    },
    switchDepart () {
      this.functionShow = !this.functionShow
    },
    getFullCompanyList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getFullCompanyList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            console.log(rep.data.data)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    editSuccess () {
          this.getCompanyInfo()
          this.checking = true
          this.editing = false
        },
    edit () {
          this.checking = false
          this.editing = true
        },
    cancel () {
          this.editing = false
          this.checking = true
        }
  },
  created() {
    this.noticeJump(this.comId)
    this.getFullCompanyList()
  },
  components: {
    crumbs,
    card,
    companyList,
    companyDetail,
    companyEdit
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../scss/_variables.scss';
  .company-wrapper {
    margin-left: 180px;
  }
  .depart-wrapper {
    display: flex;
    > .tree {
      width: 220px;
    }
    > .detail {
      flex: 1;
    }
  }
</style>
