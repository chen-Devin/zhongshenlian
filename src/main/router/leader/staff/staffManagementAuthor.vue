<template>
  <div class="main staff-manage">
    <crumbs :paths="paths1" v-if="functionActive"></crumbs>
    <crumbs :paths="paths2" v-else></crumbs>
    <card class="card-tabs">
      <search-bar class="f-r" :searchItems="searchItems"
        @search="search" v-if="reloadSearch"></search-bar>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane 
          :label="tab.label" 
          :name="tab.name"
          v-for="(tab, index) in tabList"
          :key="index"></el-tab-pane>
      </el-tabs>
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
            <ul class="staff-list" v-if="reloadStaffList && staffAllList.length > 0">
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
            <p class="ta-c" v-else>暂无</p>
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
            @reloadDetail="reloadDetail"
            @deleteSuccess="deleteSuccess"></staff-detail>
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
          <salary-detail 
            :staffId="staff.id"></salary-detail>
        </card>
        <card>
          <bonus-detail
            :id="staff.id"></bonus-detail>
        </card>
        <card>
          <education-bg
            :id="staff.id"></education-bg>
        </card>
        <card v-if="isOpen" class="basic-contain">
          <p class="check-more">
            <a href="javascript:void(0);" @click="foldMore">收起</a>
          </p>
        </card>
      </template>
    </div>
    <staff-add-modal 
      @saveNewStaff="saveNewStaff" 
      @cancel="cancel" 
      v-if="addShow"></staff-add-modal>
    <function-staff-add 
      @saveNewStaff="saveNewStaff" 
      @cancel="cancel" 
      v-if="addFuncShow"></function-staff-add>
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
      reloadSearch: true,
      departments: [],
      treeData: [{
        label: '',
        children: [{
          label: '',
          children: [{
            label: '',
            children: [{
              label: ''
            }, {
              label: ''
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
          label: '职员姓名',
          value: 'staffName'
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
        isPrincipal: '0',
        isHaveCertificate: '0',
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
    search(obj) {
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 200)
      this.pageNum = 1
      this.searchObj = obj
      this.staffFilter()
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
    reloadDetail (id) {
      this.staffId = id
      this.getStaffInfo()
    },
    handleClick(tab, event) {
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 200)
      this.reloadSearch = false
      setTimeout(() => {
        this.reloadSearch = true
      }, 200)
      this.pageNum = 1
      this.searchObj = {}
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
            // this.treeData = rep.data.data.departmentList.map((item) => {
            //   item.label = item.name
            //   item.children = []
            //   return item
            // })
            this.treeData = TreeDataHandle(rep.data.data.departmentList)
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
                type: this.staffFilterType
              }
              Object.assign(obj, this.searchObj)
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.staffAllList = []
            if (!this.isEmpty(rep.data.data.principal)) {
              this.staffAllList[0] = rep.data.data.principal
            }
            this.staffAllList = this.staffAllList.concat(rep.data.data.staffList)
            resolve('done')
          } else {
            this.staffAllList = []
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    isEmpty (object) {
      if (object === null || object === undefined) {
          return false
      }
      for (var i in object) {
          return false
      }
      return true
    },
    selectNode (data) {
      if (data.level === 1) {
        this.staffAllList = []
        return false
      }
      this.isNew = [false]
      this.staffFilterId = data.id
      if (data.level === 2) {
        if (this.functionActive) {
          this.staffFilterType = 'department'
        } else if (this.departActive) {
          this.staffFilterType = 'company'
        }
      } else if (data.level === 3) {
        this.staffFilterType = 'companyDepartment'
      } else if (data.level === 4) {
        this.staffFilterType = 'projectDepartment'
      } else if (data.level === 5) {
        this.staffFilterType = 'group'
      } else {
        this.staffFilterType = 'department'
      }
      this.staffShow = false
      this.isOpen = false
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 200)
      this.reloadSearch = false
      setTimeout(() => {
        this.reloadSearch = true
      }, 200)
      this.pageNum = 1
      this.searchObj = {}
      this.staffFilter()
    },
    selectStaff (staff) {
      this.isOpen = false
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
