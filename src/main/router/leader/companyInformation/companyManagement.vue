<template>
  <div class="company-management">
    <crumbs :paths="paths"></crumbs>
    <card class="card-tabs">
      <search-bar class="f-r" :searchItems="searchItems" @search="search"></search-bar>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane 
          :label="tab.label" 
          :name="tab.name"
          v-for="(tab, index) in tabList"
          :key="index"></el-tab-pane>
      </el-tabs>
    </card>
    <div class="tree-wrapper">
      <card class="tree">
        <h5 class="vice-title">部门筛选</h5>
        <div class="content-contain">
          <el-tree 
            :data="treeData" 
            :props="defaultProps" 
            :highlight-current="highlightCurrent" 
            :expand-on-click-node="expandOnClickNode" 
            :default-expand-all="defaultExpandAll" 
            @node-click="selectNode" 
            v-if="reloadList"></el-tree>
        </div>
      </card>
    </div>
    <div class="function-wrapper" v-if="functionShow">
      <div class="company-wrapper">
        <card class="detail">
          <template v-if="functionContentShow">
            <functional-department 
              :functionInfo="functionInfo"
              @edit="edit"
              @deleteDep="deleteDep" 
              v-if="funcDetailShow"></functional-department>
            <functional-edit
              :functionInfoEdit="functionInfoEdit"
              @cancel="cancel" 
              @editSuccess="editSuccess"
              @save="save" 
              v-else></functional-edit>
          </template>
        </card>
      </div>
      <modal v-if="deleteFunction">
        <div slot="body">
          删除后公司信息将不可恢复，是否确定删除？
        </div>
        <div slot="footer">
          <button class="btn my-btn cancel-btn" @click="deleteFunction=false">取消</button>
          <button class="btn my-btn submit-btn" @click="confirmDelete(0)">确定</button>
        </div>
      </modal>
    </div>
    <div class="depart-wrapper" v-else>
      <card class="detail">
        <!--第二级 公司-->
        <template v-if="show2">
          <company-detail 
            :iniCompany2="company" 
            @edit="edit" 
            @add="add" 
            @deleteDep="deleteDep"
            v-if="detailShow2"></company-detail>
          <company-edit
           :iniCompanyEdit2="companyEdit"
           @cancel="cancel"
           @editSuccess="editSuccess"
           v-else></company-edit>
          <modal v-if="addShow2">
            <div slot="body">
              <el-form 
                :model="form2" 
                :rules="form2Rules" 
                ref="form2"
                :label-position="labelPosition"
                label-width="120px">
                <el-form-item label="部门编号：" prop="number">
                  <el-input v-model="form2.number"></el-input>
                </el-form-item>
                <el-form-item label="部门名称：" prop="name">
                  <el-input v-model="form2.name"></el-input>
                </el-form-item>
               <!--  <el-form-item label="部门负责人：" prop="principalTelephone">
                  <el-input v-model="form2.principalTelephone"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="参审注师人数：" prop="counselorNum">
                  <el-input v-model="form2.counselorNum"></el-input>
                </el-form-item>
                <el-form-item label="参审助理人数：" prop="assistantNum">
                  <el-input v-model="form2.assistantNum"></el-input>
                </el-form-item> -->
              </el-form>
            </div>
            <div slot="footer">
              <button class="btn my-btn submit-btn" @click="save(2)" :disabled="saveAble2">保存</button>
              <button class="btn my-btn cancel-btn" @click="addShow2=false">取消</button>
            </div>
          </modal>
          <modal v-if="deleteShow2">
            <div slot="body">
              删除后公司信息将不可恢复，是否确定删除？
            </div>
            <div slot="footer">
              <button class="btn my-btn cancel-btn" @click="deleteShow2=false">取消</button>
              <button class="btn my-btn submit-btn" @click="confirmDelete(2)">确定</button>
            </div>
          </modal>
        </template>
        <!--第三级 业务部-->
        <template v-if="show3">
          <company-department-detail
           :iniCompany3="companyDepartment"
           @edit="edit"
           @add="add"
           @deleteDep="deleteDep" v-if="detailShow3"></company-department-detail>
          <company-department-edit
           :iniCompanyEdit3="companyDepartmentEdit"
           @edit="edit"
           @cancel="cancel"
           @editSuccess="editSuccess"
           v-else></company-department-edit>
          <modal v-if="addShow3">
            <div slot="body">
              <el-form 
                :model="form3" 
                :rules="form3Rules" 
                ref="form3"
                :label-position="labelPosition"
                label-width="100px">
                <el-form-item label="业务部名称：" prop="name">
                  <el-input v-model="form3.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="业务部人数：" prop="number">
                  <el-input v-model="form3.number"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="业务部经理：" prop="principalTelephone">
                  <el-input v-model="form3.principalTelephone"></el-input>
                </el-form-item> -->
                <el-form-item label="分公司简称：" prop="companyAbbreviation">
                  <el-input v-model="form3.companyAbbreviation"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <button class="btn my-btn submit-btn" @click="save(3)" :disabled="saveAble3">保存</button>
              <button class="btn my-btn cancel-btn" @click="addShow3=false">取消</button>
            </div>
          </modal>
          <modal v-if="deleteShow3">
            <div slot="body">
              删除后部门信息将不可恢复，是否确定删除？
            </div>
            <div slot="footer">
              <button class="btn my-btn cancel-btn" @click="deleteShow3=false">取消</button>
              <button class="btn my-btn submit-btn" @click="confirmDelete(3)">确定</button>
            </div>
          </modal>
        </template>
        <!--第四级 业务部-->
        <template v-if="show4">
          <project-department-detail 
            :iniCompany4="projectDepartment" 
            @edit="edit" 
            @add="add" 
            @deleteDep="deleteDep" v-if="detailShow4"></project-department-detail>
          <project-department-edit 
            :iniCompanyEdit4="projectDepartmentEdit"
            @edit="edit" 
            @cancel="cancel"
            @editSuccess="editSuccess" v-else>
          </project-department-edit>
          <modal v-if="addShow4">
            <div slot="body">
              <el-form 
                :model="form4" 
                :rules="form4Rules" 
                ref="form4"
                :label-position="labelPosition" 
                label-width="100px">
                <el-form-item label="小组名称：" prop="groupName">
                  <el-input v-model="form4.groupName"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <button class="btn my-btn submit-btn" @click="save(4)" :disabled="saveAble4">保存</button>
              <button class="btn my-btn cancel-btn" @click="addShow4=false">取消</button>
            </div>
          </modal>
          <modal v-if="deleteShow4">
            <div slot="body">
              删除后部门信息将不可恢复，是否确定删除？
            </div>
            <div slot="footer">
              <button class="btn my-btn cancel-btn" @click="deleteShow4=false">取消</button>
              <button class="btn my-btn submit-btn" @click="confirmDelete(4)">确定</button>
            </div>
          </modal>
        </template>
        <!--第五级 小组-->
        <template v-if="show5">
          <group-detail :iniCompany5="group" @edit="edit" @deleteDep="deleteDep" v-if="detailShow5"></group-detail>
          <group-edit :iniCompanyEdit5="groupEdit" @cancel="cancel" @editSuccess="editSuccess" v-else></group-edit>
          <modal v-if="deleteShow5">
            <div slot="body">
              删除后小组信息将不可恢复，是否确定删除？
            </div>
            <div slot="footer">
              <button class="btn my-btn cancel-btn" @click="deleteShow5=false">取消</button>
              <button class="btn my-btn submit-btn" @click="confirmDelete(5)">确定</button>
            </div>
          </modal>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';
import TreeDataHandle from '@/main/component/tree-data-handle.js';
import functionalDepartment from '@/main/router/leader/companyInformation/component/functionalDepartment.vue';
import functionalEdit from '@/main/router/leader/companyInformation/component/functionalEdit.vue';
import companyList from '@/main/router/leader/companyInformation/component/companyList.vue';
import companyDetail from './component/companyDetail.vue';
import companyDepartmentDetail from './component/companyDepartmentDetail.vue';
import projectDepartmentDetail from './component/projectDepartmentDetail.vue';
import groupDetail from './component/groupDetail.vue';
import companyEdit from './component/companyEdit.vue';
import companyDepartmentEdit from './component/companyDepartmentEdit.vue';
import projectDepartmentEdit from './component/projectDepartmentEdit.vue';
import groupEdit from './component/groupEdit.vue';
import searchBar from '@/main/component/searchBar.vue';

export default {
  name: 'companyManagement',
  data() {
    return {
      labelPosition: 'left',
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
      activeName: 'function',
      paths: [
        { name: '信息管理', url: '/business-review-list-leader', present: true },
        { name: '公司信息管理', url: '/business-review-list-leader', present: true }
      ],
      searchItems: [],
      departmentList: [],
      operateId: '',
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
      companyEdit: {
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
      companyEditEmpty: {
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
        reportType: [
          {
            name: '审字'
          }
        ],
        reportTypeOption: [
          {
            name: '审字'
          }, 
          {
            name: '专字'
          },
          {
            name: '咨字'
          },
          {
            name: '基决审字'
          },
          {
            name: '外汇检字'
          },
          {
            name: '验字'
          },
          {
            name: '外审字'
          },
          {
            name: '无报告'
          }
        ],
        counselorTagArray: [{
          counselorTag: ''
        }]
      },
      companyDepartment: {
        assistantNum: '',
        counselorNum: '',
        createAt: '',
        id: '',
        name: '',
        number: '',
        principalTelephone: '',
        removeStatus: '',
        updateAt: ''
      },
      companyDepartmentEdit: {
        assistantNum: '',
        counselorNum: '',
        createAt: '',
        id: '',
        name: '',
        number: '',
        principalTelephone: '',
        removeStatus: '',
        updateAt: ''
      },
      projectDepartment: {
        companyAbbreviation: '',
        createAt: '',
        id: '',
        name: '',
        number: '',
        principalTelephone: '',
        removeStatus: '',
        updateAt: ''
      },
      group: {
        groupName: '',
        id: ''
      },
      functionInfo: {
        id: '',
        name: '',
        number: '',
        principalTelephone: '',
        authority: [{
          id: '',
          name: '',
          removeStatus: ''
        }]
      },
      functionInfoEdit: {
        id: '',
        name: '',
        number: '',
        principalTelephone: '',
        authority: [{
          id: '',
          name: '',
          removeStatus: ''
        }]
      },
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
      functionContentShow: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      addShow2: false,
      addShow3: false,
      addShow4: false,
      deleteFunction: false,
      deleteShow2: false,
      deleteShow3: false,
      deleteShow4: false,
      deleteShow5: false,
      detailShow2: true,
      detailShow3: true,
      detailShow4: true,
      detailShow5: true,
      funcDetailShow: true,
      companyId: '',
      functionId: '',
      form2: {
        id: '',
        companyId: '',
        number: '',
        name: '',
        principalTelephone: '',
        counselorNum: '',
        assistantNum: ''
      },
      form3: {
        id: '',
        companyDepartmentId: '',
        name: '',
        number: '',
        principalTelephone: '',
        companyAbbreviation: ''
      },
      form4: {
        id: '',
        companyDepartmentSubdepartmentId: '',
        groupName: ''
      },
      form2Rules: {
        number: [
          { required: true, message: '请输入部门编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        principalTelephone: [
          { required: true, message: '请输入部门负责人', trigger: 'blur' }
        ],
        counselorNum: [
          { required: true, message: '请输入参审注师人数', trigger: 'blur' }
        ],
        assistantNum: [
          { required: true, message: '请输入参审助理人数', trigger: 'blur' }
        ]
      },
      form3Rules: {
        // number: [
        //   { required: true, message: '请输入业务部人数', trigger: 'blur' }
        // ],
        name: [
          { required: true, message: '请输入业务部名称', trigger: 'blur' }
        ],
        principalTelephone: [
          { required: true, message: '请输入业务部经理', trigger: 'blur' }
        ],
        companyAbbreviation: [
          { required: true, message: '请输入分公司简称', trigger: 'blur' }
        ]
      },
      form4Rules: {
        groupName: [
          { required: true, message: '请输入小组名称', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    saveAble2 () {
      if (this.form2.number && this.form2.name) {
        return false
      } else {
        return true
      }
    },
    saveAble3 () {
      if (this.form3.name && this.form3.companyAbbreviation) {
        return false
      } else {
        return true
      }
    },
    saveAble4 () {
      if (this.form4.groupName) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'function') {
        this.functionShow = true
        this.treeData = []
        this.getInfoDepartmentList()
      } else if (tab.name === 'business') {
        this.functionShow = false
        this.treeData = []
        this.getFullCompanyList()
      }
    },
    search () {

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
            this.departmentList = rep.data.data.departmentList
            this.treeData = TreeDataHandle(rep.data.data.departmentList)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getDepartmentInfo (id) {
      this.functionId = id
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
                departmentId: id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.functionInfo = rep.data.data
            let arr = []
            this.functionInfo.authority.forEach((item, index) => {
              arr.push(item.name)
            })
            this.functionInfo.checked = arr
            this.functionInfoEdit = Object.assign({}, this.functionInfo)
            resolve('done');
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
    getCompanyInfo (id) {
      this.companyId = id
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
                companyId: id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.company = rep.data.data
            let arr = []
            this.company.reportType.forEach((item, index) => {
              arr.push(item.name)
            })
            this.company.reportTypeArray = arr
            this.companyEdit = Object.assign({}, this.company)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getCompanyDepartmentInfo (id) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getCompanyDepartmentInfo',
                platform: 'web',
                companyDepartmentId: id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.companyDepartment = rep.data.data
            this.companyDepartmentEdit = Object.assign({}, this.companyDepartment)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getProjectDepartmentInfo (id) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getProjectDepartmentInfo',
                platform: 'web',
                projectDepartmentId: id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.projectDepartment = rep.data.data
            this.projectDepartmentEdit = Object.assign({}, rep.data.data)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getDepartmentGroupInfo (id) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getDepartmentGroupInfo',
                platform: 'web',
                groupId: id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.group = rep.data.data
            this.groupEdit = Object.assign({}, this.group)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    editCompanyDepartment () {
      this.form2.companyId = this.operateId
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editCompanyDepartment',
                platform: 'web',
                data: this.form2
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message(rep.data.msg)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    editProjectDepartment () {
      this.form3.companyDepartmentId = this.operateId
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editProjectDepartment',
                platform: 'web',
                data: this.form3
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message(rep.data.msg)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    editDepartmentGroup () {
      this.form4.companyDepartmentSubdepartmentId = this.operateId
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editDepartmentGroup',
                platform: 'web',
                data: this.form4
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message(rep.data.msg)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    delCompany () {
      let arr = []
      let obj = {}
      obj.name = this.companyId
      arr.push(obj)
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delCompany',
                platform: 'web',
                companyId: arr
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success(rep.data.msg)
            this.deleteShow2 = false
            this.reloadTree()
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    delCompanyDepartment () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delCompanyDepartment',
                platform: 'web',
                companyDepartmentId: this.operateId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success(rep.data.msg)
            this.deleteShow3 = false
            this.reloadTree()
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    delProjectDepartment () {
      let arr = []
      let obj = {}
      obj.name = this.operateId
      arr.push(obj)
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delProjectDepartment',
                platform: 'web',
                projectDepartmentId: arr
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success(rep.data.msg)
            this.deleteShow4 = false
            this.reloadTree()
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    delDepartmentGroup () {
      let arr = []
      let obj = {}
      obj.name = this.operateId
      arr.push(obj)
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delDepartmentGroup',
                platform: 'web',
                groupId: arr
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success(rep.data.msg)
            this.deleteShow5 = false
            this.reloadTree()
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    delDepartment () {
      let arr = []
      let obj = {}
      obj.name = this.functionInfo.id
      arr.push(obj)
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delDepartment',
                platform: 'web',
                departmentId: arr
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success(rep.data.msg)
            this.deleteFunction = false
            this.reloadTree()
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    editSuccess (level, id) {
      if (level === 0) {
        this.getDepartmentInfo(id)
        this.funcDetailShow = true
        this.getInfoDepartmentList()
      } else if (level === 2) {
        this.getCompanyInfo(id)
        this.detailShow2 = true
        this.getFullCompanyList()
      } else if (level === 3) {
        this.getCompanyDepartmentInfo(id)
        this.detailShow3 = true
        this.getFullCompanyList()
      } else if (level === 4) {
        this.getProjectDepartmentInfo(id)
        this.detailShow4 = true
        this.getFullCompanyList()
      } else if (level === 5) {
        this.getDepartmentGroupInfo(id)
        this.detailShow5 = true
        this.getFullCompanyList()
      }
    },
    edit (level) {
      if (level === 0) {
        this.funcDetailShow = false
      } else if (level === 2) {
        this.detailShow2 = false
      } else if (level === 3) {
        this.detailShow3 = false
      } else if (level === 4) {
        this.detailShow4 = false
      } else if (level === 5) {
        this.detailShow5 = false
      }
    },
    add (level) {
      if (level === 2) {
        this.addShow2 = true
      } else if (level === 3) {
        this.addShow3 = true
      } else if (level === 4) {
        this.addShow4 = true
      }
    },
    deleteDep (level) {
      if (level === 0) {
        this.deleteFunction = true
      } else if (level === 2) {
        this.deleteShow2 = true
      } else if (level === 3) {
        this.deleteShow3 = true
      } else if (level === 4) {
        this.deleteShow4 = true
      } else if (level === 5) {
        this.deleteShow5 = true
      }
    },
    confirmDelete (level) {
      if (level === 0 ) {
        this.delDepartment()
      } else if (level === 2) {
        this.delCompany()
      } else if (level === 3) {
        this.delCompanyDepartment()
      } else if (level === 4) {
        this.delProjectDepartment()
      } else if (level === 5) {
        this.delDepartmentGroup()
      }
    },
    save (level) {
      if (level === 0) {
        
      }
      if (level === 2) {
        this.editCompanyDepartment().then(() => {
          this.addShow2 = false
          this.reloadTree()
        }, () => {})
      } else if (level === 3) {
        this.editProjectDepartment().then(() => {
          this.addShow3 = false
          this.reloadTree()
        }, () => {})
      } else if (level === 4) {
        this.editDepartmentGroup().then(() => {
          this.addShow4 = false
          this.reloadTree()
        })
      }
    },
    cancel (level) {
      if (level === 0) {
        this.funcDetailShow = true
      }
      if (level === 2) {
        this.detailShow2 = true
      } else if (level === 3) {
        this.detailShow3 = true
      } else if (level === 4) {
        this.detailShow4 = true
      } else if (level === 5) {
        this.detailShow5 = true
      }
    },
    reloadTree () {
      if (this.functionShow) {
        this.getInfoDepartmentList()
      } else {
        this.getFullCompanyList()
      }
      this.show2 = false
      this.show3 = false
      this.show4 = false
      this.show5 = false
      this.reloadList = false
      setTimeout(() => {
        this.reloadList = true
      }, 200)
    },
    addCompany () {
      this.show2 = true
      this.show3 = false
      this.show4 = false
      this.show5 = false
      this.detailShow2 = false
      this.companyEdit = Object.assign({}, this.companyEditEmpty)
    },
    selectNode (data) {
      this.operateId = data.id
      if (data.level === 2) {
        if (this.functionShow) {
          this.getDepartmentInfo(this.operateId)
          this.functionContentShow = true
          this.funcDetailShow = true
        } else {
          this.getCompanyInfo(this.operateId)
          this.show2 = true
          this.detailShow2 = true
          this.show3 = false
          this.show4 = false
          this.show5 = false
        }
      } else if (data.level === 3) {
        this.getCompanyDepartmentInfo(this.operateId)
        this.show2 = false
        this.show4 = false
        this.show3 = true
        this.detailShow3 = true
        this.show5 = false
      } else if (data.level === 4) {
        this.getProjectDepartmentInfo(this.operateId)
        this.show2 = false
        this.show3 = false
        this.show4 = true
        this.detailShow4 = true
        this.show5 = false
      } else if (data.level === 5) {
        this.getDepartmentGroupInfo(this.operateId)
        this.show2 = false
        this.show3 = false
        this.show4 = false
        this.show5 = true
        this.detailShow5 = true
      }
    }
  },
  created() {
    this.getInfoDepartmentList()
  },
  components: {
    crumbs,
    card,
    modal,
    functionalDepartment,
    functionalEdit,
    companyList,
    companyDetail,
    companyDepartmentDetail,
    projectDepartmentDetail,
    groupDetail,
    companyEdit,
    companyDepartmentEdit,
    projectDepartmentEdit,
    groupEdit,
    TreeDataHandle,
    searchBar
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../scss/_variables.scss';
  .company-management {
    .detail {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    > .function-wrapper {
      padding-left: 20px;
      > .company-list {
        
      }
    }
    > .tree-wrapper {
      float: left;
      width: 400px;
      .content-contain {
        width: 100%;
        height: 700px;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        overflow: auto;
        background-color: #F9FBFE;
      }
    }
  }
  .depart-wrapper {
    display: flex;
    > .detail {
      flex: 1;
      margin-left: 10px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

</style>
