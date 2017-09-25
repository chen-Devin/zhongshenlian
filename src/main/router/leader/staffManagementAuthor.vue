<template>
  <div class="main staff-manage">
    <crumbs :paths="paths"></crumbs>
    <card>
      <button class="btn my-btn" @click="switchDepart">职能部门</button>
      <button class="btn my-btn" @click="switchDepart">业务部门</button>
    </card>
    <!-- <staff-author-list></staff-author-list>
    <department-author v-for="(DEP, index) in departments"
                       :department="DEP"
                       :key="index"></department-author> -->
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
            
          </div>
        </div>
      </card>
    </div>
    <div class="right-contain">
      <card></card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import TreeDataHandle from '@/main/component/tree-data-handle.js';
import departmentAuthor from './component/departmentAuthor.vue';
import staffAuthorList from './component/staffAuthorList.vue';

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
    };
  },
  created() {
    this.getDepartmentInfo().then((rep) => {
      for (let i = 0; i < rep.data.data.departmentArray.length; i++) {
        this.getStaffInfo(rep.data.data.departmentArray[i].departmentName).then((rep) => {
          for(let j=0; j < rep.data.data.staffArray.length; j++) {
            let arr = [];
            for(let k=0; k < rep.data.data.authorityArray.length; k++) {
              for(let m=0; m < rep.data.data.staffArray[j].authority.length; m++) {
                if (rep.data.data.authorityArray[k].name === rep.data.data.staffArray[j].authority[m].name) {
                  let obj = {
                    authName: rep.data.data.staffArray[j].authority[m].name,
                    stat: rep.data.data.staffArray[j].authority[m].authority === '0' ? false : true,
                  };
                  arr.push(obj);
                  break;
                }
              }
            }
            rep.data.data.staffArray[j].authority = arr;
          }
          this.departments.push(rep.data.data);
        }, (rep) => {});
      }
    }, (rep) => { });
  },
  watch: {
    $route: 'getDepartmentInfo'
  },
  methods: {
    getDepartmentInfo() {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getDepartmentList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            reject(rep);
          }
        }, (rep) => { });
      });
      return promise;
    },
    getStaffInfo(department) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getStaffArrayByDepartment',
                platform: 'web',
                department: department,
                pageNum: 1
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            reject(rep);
          }
        }, (rep) => { });
      });
      return promise;
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
    selectNode (data) {
      if (data.level === 2) {
        this.getCompanyInfo(data.id)
      } else if (data.level === 3) {
        this.getCompanyDepartmentInfo(data.id)
      }
    }
  },
  created () {
    this.getFullCompanyList()
  },
  components: {
    crumbs,
    card,
    TreeDataHandle,
    departmentAuthor,
    staffAuthorList
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
          overflow: hidden;
          background-color: #fafafa;
        }
      }
    }
    .right-contain {
      width: 100%;
    }
  }
</style>
