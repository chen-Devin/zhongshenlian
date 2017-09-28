<template>
  <div class="main staff-manage">
    <crumbs :paths="paths"></crumbs>
    <card>
      <button class="btn my-btn" @click="switchDepart">职能部门</button>
      <button class="btn my-btn" @click="switchDepart">业务部门</button>
    </card>
    <div class="left-contain">
      <card class="card">
        <div class="depart-filter">
          <h5>部门筛选</h5>
          <div class="content-contain">
            <el-tree :data="treeData" :props="defaultProps" :highlight-current="highlightCurrent" :expand-on-click-node="expandOnClickNode" :default-expand-all="defaultExpandAll" @node-click="selectNode"></el-tree>
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
      <card>
        <staff-detail></staff-detail>
      </card>
      <card>
        <authority-set></authority-set>
      </card>
      <card>
        <salary-detail></salary-detail>
      </card>
      <card>
        <bonus-detail></bonus-detail>
      </card>
      <card>
        <education-bg></education-bg>
      </card> 
    </div>
    <staff-add-modal @cancel="cancel" v-if="addShow"></staff-add-modal>
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

export default {
  name: 'staffManagementAuthor',
  data() {
    return {
      paths: [
        { name: '职员权限管理', url: '/author-management-author', present: true }
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
      highlightCurrent: true,
      expandOnClickNode: false,
      defaultExpandAll: true,
      addShow: false,
      staffFilterId: '',
      staffFilterType: '',
      staffAllList: [{
        jobNumber: '',
        name: '',
        duty: '',
        isActive: false
      }],
      reloadStaffList: true
    };
  },
  methods: {
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
            console.log(this.staffAllList)
            resolve('done');
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
      this.staffFilter()
    },
    selectStaff (staff) {
      this.staffAllList.forEach((item) => {
        item.isActive = false
      })
      staff.isActive = true
      this.reloadStaffList = false
      this.reloadStaffList = true
    },
    switchDepart () {

    },
    showAdd () {
      this.addShow = true
    },
    cancel () {
      this.addShow = false
    }
  },
  created () {
    this.getFullCompanyList()
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
    staffAddModal
  }
}
</script>

<style lang="sass" scoped>
  .staff-manage {
    .left-contain {
      float: left;
      width: 400px;
      .card {
        margin-top: 0;
      }
      .depart-filter {
        .content-contain {
          width: 100%;
          height: 400px;
          overflow: auto;
          background-color: #fafafa;
        }
      }
      .staff-filter {
        .content-contain {
          width: 100%;
          height: 400px;
          padding-top: 10px;
          overflow: auto;
          background-color: #fafafa;
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
                background-color: #edf7ff;
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
      margin-left: 400px;
    }
  }
</style>
