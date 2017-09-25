<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <button class="btn my-btn" @click="switchDepart">职能部门</button>
      <button class="btn my-btn" @click="switchDepart">业务部门</button>
    </card>
    <div v-if="functionShow">
      <company-list v-if="reloadList" @switchFunction="switchFunction"></company-list>
      <div class="company-wrapper">
        <card>
          <functional-department :functionInfo="functionInfo"></functional-department>
        </card>
      </div>
    </div>
    <div class="depart-wrapper" v-else>
      <card class="tree">
        <el-tree :data="treeData" :props="defaultProps" :highlight-current="highlightCurrent" :expand-on-click-node="expandOnClickNode" :default-expand-all="defaultExpandAll" @node-click="selectNode"></el-tree>
      </card>
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
           :iniCompany2="company"
           @cancel="cancel"
           @editSuccess="editSuccess"
           v-else></company-edit>
          <modal v-if="addShow2">
            <div slot="body">
              <el-form 
                :model="form2" 
                :rules="form2Rules" 
                ref="form2" 
                label-width="100px">
                <el-form-item label="部门编号" prop="number">
                  <el-input v-model="form2.number"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="name">
                  <el-input v-model="form2.name"></el-input>
                </el-form-item>
                <el-form-item label="部门负责人" prop="principalTelephone">
                  <el-input v-model="form2.principalTelephone"></el-input>
                </el-form-item>
                <el-form-item label="参审注师人数" prop="counselorNum">
                  <el-input v-model="form2.counselorNum"></el-input>
                </el-form-item>
                <el-form-item label="参审助理人数" prop="assistantNum">
                  <el-input v-model="form2.assistantNum"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <button class="btn my-btn submit-btn" @click="save(2)">保存</button>
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
           :iniCompany3="companyDepartment" 
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
                label-width="100px">
                <el-form-item label="项目部名称" prop="name">
                  <el-input v-model="form3.name"></el-input>
                </el-form-item>
                <el-form-item label="项目部人数" prop="number">
                  <el-input v-model="form3.number"></el-input>
                </el-form-item>
                <el-form-item label="项目部经理" prop="principalTelephone">
                  <el-input v-model="form3.principalTelephone"></el-input>
                </el-form-item>
                <el-form-item label="分公司简称" prop="companyAbbreviation">
                  <el-input v-model="form3.companyAbbreviation"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <button class="btn my-btn submit-btn" @click="save(3)">保存</button>
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
        <!--第四级 项目部-->
        <template v-if="show4">
          <project-department-detail 
            :iniCompany4="ProjectDepartment" 
            @edit="edit" 
            @add="add" 
            @deleteDep="deleteDep" v-if="detailShow4"></project-department-detail>
          <project-department-edit :iniCompany4="ProjectDepartment" v-else></project-department-edit>
          <modal v-if="addShow4">
            <div slot="body">
              <el-form 
                :model="form4" 
                :rules="form4Rules" 
                ref="form4" 
                label-width="100px">
                <el-form-item label="小组名称" prop="groupName">
                  <el-input v-model="form4.groupName"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <button class="btn my-btn submit-btn">保存</button>
              <button class="btn my-btn cancel-btn" @click="addShow4=false">取消</button>
            </div>
          </modal>
          <modal v-if="deleteShow4">
            <div slot="body">
              删除后部门信息将不可恢复，是否确定删除？
            </div>
            <div slot="footer">
              <button class="btn my-btn cancel-btn" @click="deleteShow4=false">取消</button>
              <button class="btn my-btn submit-btn">确定</button>
            </div>
          </modal>
        </template>
        <!--第五级 小组-->
        <!-- <group-detail :iniCompany="company" @edit="edit"></group-detail>
        <group-detail-edit :iniCompany="company" @edit="edit"></group-detail-edit> -->
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
import companyList from '@/main/router/leader/companyInformation/component/companyList.vue';
import companyDetail from './component/companyDetail.vue';
import companyDepartmentDetail from './component/companyDepartmentDetail.vue';
import projectDepartmentDetail from './component/projectDepartmentDetail.vue';
import companyEdit from './component/companyEdit.vue';
import companyDepartmentEdit from './component/companyDepartmentEdit.vue';

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
      functionInfo: {
        id: '',
        name: '',
        number: '',
        principalTelephone: '',
        authority: ''
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
      show2: true,
      show3: false,
      addShow2: false,
      addShow3: false,
      addShow4: false,
      deleteShow2: false,
      deleteShow3: false,
      deleteShow4: false,
      detailShow2: true,
      detailShow3: true,
      detailShow4: true,
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
        name: '',
        number: '',
        principalTelephone: '',
        companyAbbreviation: ''
      },
      form4: {
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
        number: [
          { required: true, message: '请输入项目部人数', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入项目部名称', trigger: 'blur' }
        ],
        principalTelephone: [
          { required: true, message: '请输入项目部经理', trigger: 'blur' }
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
  methods: {
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
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    switchFunction (id) {
      this.getDepartmentInfo(id)
    },
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
            this.ProjectDepartment = rep.data.data
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    editCompanyDepartment () {
      this.form2.companyId = this.companyId
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
      this.form3.companyId = this.companyId
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
            this.$message(rep.data.msg)
            resolve('done');
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
                companyDepartmentId: 3
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
    editSuccess (level, id) {
      if (level === 2) {
        this.getCompanyInfo(id)
        this.detailShow2 = true
      } else if (level === 3) {
        this.getCompanyDepartmentInfo(id)
        this.detailShow3 = true
      }
    },
    edit (level) {
      if (level === 2) {
        this.detailShow2 = false
      } else if (level === 3) {
        this.detailShow3 = false
      } else if (level === 4) {
        this.detailShow4 = false
      }
    },
    add (level) {
      if (level === 2) {
        this.addShow2 = true
      } else if (level === 3) {
        this.addShow3 = true
      } else if (level === 4) {
        
      }
    },
    deleteDep (level) {
      if (level === 2) {
        this.deleteShow2 = true
      } else if (level === 3) {
        this.deleteShow3 = true
      } else if (level === 4) {
        this.deleteShow4 = true
      }
    },
    confirmDelete (level) {
      if (level === 2) {
        this.delCompany()
      } else if (level === 3) {
        this.delCompanyDepartment()
      }
    },
    save (level) {
      if (level === 2) {
        this.editCompanyDepartment().then(() => {
          this.addShow2 = false
        }, () => {})
      } else if (level ===3) {
        this.editProjectDepartment().then(() => {
          this.addShow3 = false
        }, () => {})
      }
    },
    cancel (level) {
      if (level === 2) {
        this.detailShow2 = true
      } else if (level === 3)
        // this.Show2 = false
        // this.show3 = true
        this.detailShow3 = true
    },
    selectNode (data) {
      if (data.level === 2) {
        this.getCompanyInfo(data.id)
        this.show2 = true
        this.show3 = false
        this.show4 = false
      } else if (data.level === 3) {
        this.getCompanyDepartmentInfo(data.id)
        this.show2 = false
        this.show3 = true
      } else if (data.level === 4) {
        this.getProjectDepartmentInfo(data.id)
        this.show2 = false
        this.show3 = false
        this.show4 = true
      }
      
    }
  },
  created() {
    this.noticeJump(this.comId)
    this.getFullCompanyList()
  },
  components: {
    crumbs,
    card,
    modal,
    functionalDepartment,
    companyList,
    companyDetail,
    companyDepartmentDetail,
    projectDepartmentDetail,
    companyEdit,
    companyDepartmentEdit,
    TreeDataHandle
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
