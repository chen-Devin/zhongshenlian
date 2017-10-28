<template>
  <div class="main staff-manage">
    <crumbs :paths="paths1" v-if="functionActive"></crumbs>
    <crumbs :paths="paths2" v-else></crumbs>
    <card class="card-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane 
          :label="tab.label" 
          :name="tab.name"
          v-for="(tab, index) in tabList"
          :key="index"></el-tab-pane>
      </el-tabs>
      <search-bar class="f-r addi" :searchItems="searchItems"
      @search="search"></search-bar>
    </card>
    <div class="left-contain">
      <card class="card">
        <div class="depart-filter">
          <h5>部门筛选</h5>
          <div class="content-contain">
            <el-tree 
              :data="treeData" 
              :props="defaultProps" 
              :highlight-current="highlightCurrent" 
              :expand-on-click-node="expandOnClickNode" 
              :default-expand-all="defaultExpandAll" 
              @node-click="selectNode"></el-tree>
          </div>
        </div>
        <div class="staff-filter">
          <h5>职员筛选</h5>
          <div class="content-contain">
            <ul class="staff-list" v-if="reloadStaffList">
              <li 
                :class="{ active: item.isActive }" 
                v-for="(item, index) in staffAllList" 
                :key="index"
                @click="selectStaff(item)">
                <span>{{ item.jobNumber }}</span>
                <span>{{ item.name }}</span>
                <span>{{ item.duty }}</span>
              </li>
            </ul>
          </div>
        </div>
        <p class="ta-c">
          <a href="javascript:void(0);" @click="showAdd">添加职员</a>
        </p>
      </card>
    </div>
    <div class="right-contain">
      <template v-if="staffShow">
        <card>
          <staff-detail 
            :staff="staff"
            :type="type"
            :isNew="isNew"
            @addSuccess="addSuccess"></staff-detail>
        </card>
        <card v-if="!isOpen" class="basic-contain">
          <p class="check-more">
            <a href="javascript:void(0);" @click="checkMore">查看更多信息</a>
          </p>
        </card>
      </template>
      <template v-if="isOpen">
        <card>
          <authority-set
            :id="staff.id" 
            :type="type"></authority-set>
        </card>
        <card>
          <salary-detail :staffId="staff.id"></salary-detail>
        </card>
        <card>
          <bonus-detail></bonus-detail>
        </card>
        <card>
          <education-bg></education-bg>
        </card>
        <card v-if="isOpen" class="basic-contain">
          <p class="check-more">
            <a href="javascript:void(0);" @click="foldMore">收起</a>
          </p>
        </card>
      </template>
    </div>
    <staff-add-modal @saveNewStaff="saveNewStaff" @cancel="cancel" v-if="addShow"></staff-add-modal>
    <function-staff-add @saveNewStaff="saveNewStaff" @cancel="cancel" v-if="addFuncShow"></function-staff-add>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';
import TreeDataHandle from '@/main/component/tree-data-handle.js';
import staffDetail from './component/staffDetail.vue';
import authoritySet from './component/authoritySet.vue';
import salaryDetail from './component/salaryDetail.vue';
import bonusDetail from './component/bonusDetail.vue';
import educationBg from './component/educationBg.vue';
import staffAddModal from './component/staffAddModal.vue';
import functionStaffAdd from './component/functionStaffAdd.vue';
import searchBar from '@/main/component/searchBar.vue'

export default {
  name: 'staffManagementAuthor',
  data() {
    return {
      isNew: [false],
      paths1: [
        { name: '职员管理', url: '/staff-management-author', present: false },
        { name: '职能部门', url: '/staff-management-author', present: true }
      ],
      paths2: [
        { name: '职员管理', url: '/staff-management-author', present: false },
        { name: '业务部门', url: '/staff-management-author', present: true }
      ],
      departments: [],
      treeData: [{
        label: '天津中审联',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1',
            children: [{
              label: 1
            }, {
              label: 2
            }]
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchItems: [
        {
          label: '',
          value: ''
        },
        {
          label: '',
          value: ''
        },
        {
          label: '',
          value: ''
        },
        {
          label: '',
          value: ''
        }
      ],
      tabList: [
        {
          label: '职能部门',
          name: 'function'
        },
        {
          label: '业务部门',
          name: 'business'
        }
      ],
      activeName: "function",
      functionActive: true,
      departActive: false,
      highlightCurrent: true,
      expandOnClickNode: false,
      defaultExpandAll: true,
      isOpen: false,
      addShow: false,
      addFuncShow: false,
      staffShow: false,
      staffFilterId: '',
      staffFilterType: '',
      staffAllList: [
        // {
          // jobNumber: '',
          // name: '',
          // duty: '',
          // isActive: false
        // }
      ],
      staffId: '',
      staff: {},
      staffEmpty: {
        id: '',
        telephone: '',
        name: '',
        gender: '',
        jobNumber: '',
        department: '',
        subDepartment: '',
        duties: '',
        authority: [{
          name: '',
          authority: ''
        }],
        idCard: '',
        email: '',
        education: '',
        jonTitle: '',
        entryTime: '',
        expireTime: '',
        singleSubjects: [],
        professionalCertificate: [],
        singleSubjectsArray: [],
        professionalCertificateArray: [],
        companyDepartment: '',
        projectDepartment: '',
        group: '',
        isPrincipal: '',
        isHaveCertificate: '',
        wechatName: '',
        wechatHeadImg: '',
        nation: '',
        shortcutArray: []
      },
      reloadStaffList: true,
      type: 'function'
    };
  },
  methods: {
    search(searchObj) {
      // this.reloadPagination = false
      // setTimeout(() => {
      //   this.reloadPagination = true
      // }, 200)
      // this.pageNum = 1
      // this.searchObj = searchObj
      // this.getBiddingList()
    },
    saveNewStaff (type) {
      if (type[0] === 0) {
        this.type = 'function'
      } else {
        this.type = 'department'
      }
      this.staff = Object.assign({}, this.staffEmpty)
      this.isNew = type
      this.staffShow = false
      this.isOpen = false
      setTimeout(() => {
        this.staffShow = true
      }, 500)
      this.addShow = false
      this.addFuncShow = false
    },
    addSuccess (id) {
      this.staff.id = id
    },
    handleClick(tab, event) {
      if (tab.name === 'function') {
        this.functionActive = true
        this.departActive = false
        this.staffShow = false
        this.isOpen = false
        this.type = 'function'
        this.treeData = []
        this.staffAllList = []
        this.getInfoDepartmentList()
      } else if (tab.name === 'business') {
        this.functionActive = false
        this.departActive = true
        this.staffShow = false
        this.isOpen = false
        this.type = 'department'
        this.treeData = []
        this.staffAllList = []
        this.getFullCompanyList()
      }
    },
    getStaffInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getStaffInfo',
                platform: 'web',
                id: this.staffId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.staff = rep.data.data
            this.staff.singleSubjectsArray = rep.data.data.singleSubjects.split('，')
            this.staff.professionalCertificateArray = rep.data.data.professionalCertificate.split('，')
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
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
            this.treeData = TreeDataHandle(rep.data.data.companyArray)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getInfoDepartmentList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getInfoDepartmentList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.treeData = []
            this.treeData = rep.data.data.departmentList.map((item) => {
              item.label = item.name
              item.children = []
              return item
            })
            console.log(rep.data.data.departmentList, this.treeData)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    staffFilter () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'staffFilter',
                platform: 'web',
                id: this.staffFilterId,
                // type: this.staffFilterType
                type: 'department'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.staffAllList = []
            this.staffAllList[0] = rep.data.data.principal
            this.staffAllList = this.staffAllList.concat(rep.data.data.staffList)
            resolve('done');
          } else {
            this.staffAllList = []
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    selectNode (data) {
      this.staffFilterId = data.id
      if (data.level === 2) {
        this.staffFilterType = 'company'
      } else if (data.level === 3) {
        this.staffFilterType = 'companyDepartment'
      } else if (data.level === 4) {
        this.staffFilterType = 'projectDepartment'
      } else if (data.level === 5) {
        this.staffFilterType = 'group'
      }
      this.staffShow = false
      this.isOpen = false
      this.staffFilter()
    },
    selectStaff (staff) {
      this.staffAllList.forEach((item) => {
        item.isActive = false
      })
      staff.isActive = true
      this.reloadStaffList = false
      this.reloadStaffList = true
      this.staffId = staff.id
      this.getStaffInfo().then(() => {
        this.staffShow = true
      }, () => {})
    },
    // switchDepart () {
    //   this.functionActive = true
    //   this.departActive = false
    //   this.staffShow = false
    //   this.isOpen = false
    //   this.type = 'function'
    //   this.treeData = []
    //   this.staffAllList = []
    //   this.getInfoDepartmentList()
    // },
    // switchFunction () {
    //   this.functionActive = false
    //   this.departActive = true
    //   this.staffShow = false
    //   this.isOpen = false
    //   this.type = 'department'
    //   this.treeData = []
    //   this.staffAllList = []
    //   this.getFullCompanyList()
    // },
    showAdd () {
      // console.log(this.functionActive, this.departActive)
      if (this.functionActive) {
        this.addFuncShow = true
      } else if (this.departActive) {
        this.addShow = true
      }
    },
    cancel () {
      this.addShow = false
      this.addFuncShow = false
    },
    checkMore () {
      this.isOpen = true
    },
    foldMore () {
      this.isOpen = false
    }
  },
  created () {
    this.getInfoDepartmentList()
  },
  components: {
    crumbs,
    card,
    TreeDataHandle,
    staffDetail,
    authoritySet,
    salaryDetail,
    bonusDetail,
    educationBg,
    staffAddModal,
    functionStaffAdd,
    searchBar
  }
}
</script>

<style lang="sass" scoped>
  .addi {
    margin-top: -38px;
    margin-right: 40px;
  }
  .content-contain {
    width: 100%;
    height: 400px;
    padding-top: 10px;
    padding-left:10px;
    padding-right: 10px;
    overflow: auto;
    background-color: #F9FBFE;
  }
  h5 {
    padding: 16px;
  }
  .staff-manage {
    .card-tabs {
      padding-top: 7px;
      padding-bottom: 7px;
    }
    .left-contain {
      float: left;
      width: 400px;
      .staff-filter {
        .content-contain {
          .staff-list {
            margin: 0;
            padding: 0;
            font-size: 0;
            li {
              height: 36px;
              line-height: 36px;
              font-size: 14px;
              list-style: none;
              cursor: pointer;
              &:hover {
                background-color: #e4e8f1;
              }
              span {
                margin-left: 45px;
              }
              &.active {
                background-color: #DBEAFE;
              }
            }
          }
        }
        + p {
          padding-top: 10px;
        }
      }
    }
    .right-contain {
      // width: 100%;
      margin-left: 380px;
      .basic-contain{
        margin-bottom: 20px;
        .check-more {
          margin: 0;
          text-align: center;
          line-height: 40px;
          height: 40px;
        } 
      }  
    }
  }
</style>
