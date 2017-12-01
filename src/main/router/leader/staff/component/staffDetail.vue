<template>
  <div class="staff-wrapper">
    <div class="title-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn draft-btn" @click="modifyStaffShow=true" :disabled="!canEdit.canEditDetail">移动</button>
          <button class="btn my-btn submit-btn" @click="edit" :disabled="!canEdit.canEditDetail">编辑</button>
          <button class="btn my-btn cancel-btn" @click="deleteStaffShow=true" :disabled="!canEdit.canEditDetail">删除员工</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save1" :disabled="saveAble">保存</button>
          <button class="btn my-btn draft-btn" @click="cancelShow = true">取消</button>
        </template>
      </div>
      <h5 class="main-title">基础信息</h5>
    </div>
    <div class="basic-contain">
      <div class="basic-form">
        <el-row>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="100px" :model="staff" :rules="staffRules" ref="staff">
              <el-form-item label="姓名：" label-width="70px" prop="name" v-if="editAble">
                <el-input v-model="staff.name"></el-input>
              </el-form-item>
              <p v-else>姓名：{{staff.name}}</p>
              <el-form-item label="工号：" label-width="70px" prop="jobNumber" v-if="editAble">
                <el-input v-model="staff.jobNumber"></el-input>
              </el-form-item>
              <p v-else>工号：{{staff.jobNumber}}</p>
              <el-form-item label="性别：" label-width="70px" prop="gender" v-if="editAble">
                <el-radio v-model="staff.gender" label="男">男</el-radio>
                <el-radio v-model="staff.gender" label="女">女</el-radio>
              </el-form-item>
              <p v-else>性别：{{staff.gender}}</p>
              <el-form-item label="民族：" label-width="70px" prop="nation" v-if="editAble">
                <el-input v-model="staff.nation"></el-input>
              </el-form-item>
              <p v-else>民族：{{staff.nation}}</p>
              <el-form-item label="身份证号：" label-width="100px" prop="idCard" v-if="editAble">
                <el-input v-model="staff.idCard"></el-input>
              </el-form-item>
              <p v-else>身份证号：{{staff.idCard}}</p>
              <el-form-item label="手机号：" label-width="80px" prop="telephone" v-if="editAble" required>
                <el-input v-model="staff.telephone"></el-input>
              </el-form-item>
              <p v-else>手机号：{{staff.telephone}}</p>
              <el-form-item label="邮箱：" label-width="70px" prop="email" v-if="editAble">
                <el-input v-model="staff.email"></el-input>
              </el-form-item>
              <p v-else>邮箱：{{staff.email}}</p>
              <p v-if="type==='department' && isNew[0] === false && !editAble">
                <span>所属业务部：</span>
                <span v-if="staff.companyDepartment">{{ staff.companyDepartment }}</span>
                <span v-else>暂无</span>
              </p>
              <p v-if="type==='department' && isNew[0] === false && !editAble">
                <span>所属项目部：</span>
                <span v-if="staff.projectDepartment">{{ staff.projectDepartment }}</span>
                <span v-else>暂无</span>
              </p>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
              <p v-if="type==='department' && isNew[0] === false && !editAble">
                <span>所属小组：</span>
                <span v-if="staff.group">{{ staff.group }}</span>
                <span v-else>暂无</span>
              </p>
              <el-form-item label="职位：" label-width="70px" prop="duties" v-if="editAble">
                <el-select v-model="staff.duties" placeholder="选择职位">
                  <el-option 
                    v-for="item in dutiesList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <p v-else>职位：{{staff.duties}}</p>
              <el-form-item label="学历：" label-width="70px" prop="education" v-if="editAble">
                <el-input v-model="staff.education"></el-input>
              </el-form-item>
              <p v-else>学历：{{staff.education}}</p>
              <el-form-item label="职称：" label-width="70px" prop="jonTitle" v-if="editAble">
                <el-select v-model="staff.jonTitle" placeholder="选择职称">
                  <el-option 
                    v-for="item in jonTitleList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <p v-else>职称：{{staff.jonTitle}}</p>
              <el-form-item label="级别：" label-width="70px" prop="level" v-if="editAble">
                <el-select v-model="staff.level" placeholder="选择级别">
                  <el-option 
                    v-for="item in levelList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <p v-else>级别：{{staff.level}}</p>
              <el-form-item label="入职时间：" prop="entryTime" label-width="90px" v-if="editAble">
                <el-date-picker
                  style="width:100%"
                  v-model="staff.entryTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <p v-else>入职时间：{{staff.entryTime}}</p>
              <el-form-item label="合同到期日：" prop="expireTime" label-width="100px" v-if="editAble">
                <el-date-picker
                  style="width:100%"
                  v-model="staff.expireTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <p v-else>合同到期日：{{staff.expireTime}}</p>
              <el-form-item label="劳动合同：" prop="workContract" label-width="90px">
                <div v-if="editAble">
                  <el-upload ref="upload"
                             :show-file-list="false"
                             :action="workerUrl"
                             :auto-upload="autoUpload"
                             :on-change="handleChange"
                             :on-success="UploadSuccess">
                    <button class="btn my-btn submit-btn"
                            type="button"
                            slot="trigger">选取文件</button>
                    <span slot="tip"
                          class="text-info" v-if="workContract.name">&emsp;{{workContract.name}}</span>
                    <span slot="tip"
                          class="text-info" v-else>&emsp;文件大小建议不超过3Mb</span>
                  </el-upload>
                </div>
                <div v-else>
                  <a :href="staff.contractUrl" download v-if="staff.contractUrl">下载</a>
                  <span v-else>暂无</span>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :rules="staffRules">
            <el-form-item label="单科成绩：" label-width="90px" prop="singleSubjects" v-if="editAble">
              <el-checkbox-group v-model="singleSubjectsArray">
                <el-checkbox :label="option" v-for="(option, index) in scoresOption" :key="index">{{ option }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <p v-else>单科成绩：{{ singleSubjectsArray.join('、') }}</p>
          </el-form>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
            <el-form-item label="执行证书：" label-width="90px" prop="professionalCertificate" v-if="editAble">
              <el-checkbox-group v-model="professionalCertificateArray">
                <el-checkbox :label="option" :value="option" v-for="(option, index) in certificatesOption" :key="index"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <p v-else>执行证书：{{professionalCertificateArray.join('、')}}</p>
          </el-form>
        </el-row>
      </div>
    </div>
    <modal v-if="modifyStaffShow">
      <div class="ta-c" slot="body">
        <el-radio v-model="modifyStaffType" label="function">职能部门</el-radio>
        <el-radio v-model="modifyStaffType" label="department">业务部门</el-radio>
      </div>
      <div slot="footer">
        <button class="btn my-btn submit-btn" @click="showModify">确定</button>
        <button class="btn my-btn cancel-btn" @click="modifyStaffShow=false">取消</button>
      </div>
    </modal>
    <modal v-if="deleteStaffShow">
      <div slot="body">
        员工删除后将不能恢复，确认删除吗？
      </div>
      <div slot="footer">
        <button class="btn my-btn cancel-btn" @click="delUser">确定</button>
        <button class="btn my-btn submit-btn" @click="deleteStaffShow=false">取消</button>
      </div>
    </modal>
    <modal v-if="cancelShow">
      <div slot="body">
        <p class="ta-c">取消后编辑内容将丢弃，确认取消吗？</p>
      </div>
      <div slot="footer">
        <button class="btn my-btn submit-btn" @click="cancelShow = false">
          取消
        </button>
        <button class="btn my-btn cancel-btn" @click="cancel">
          确定
        </button>     
      </div>
    </modal>
    <staff-add-modal 
      @saveNewStaff="saveNewStaff" 
      @cancel="addShow=false" 
      v-if="addShow"></staff-add-modal>
    <function-staff-add 
      @saveNewStaff="saveNewStaff" 
      @cancel="addFuncShow=false" 
      v-if="addFuncShow"></function-staff-add>
  </div>
</template>

<script>
import axios from 'axios'
import modal from '@/main/component/modal.vue'
import staffAddModal from './staffAddModal.vue'
import functionStaffAdd from './functionStaffAdd.vue'

export default {
  name: 'staffDetail',
  data() {
    return {
      staff: this.iniStaff,
      cancelShow: false,
      editAble: false,
      deleteStaffShow: false,
      modifyStaffShow: false,
      modifyStaffType: 'function',
      addShow: false,
      addFuncShow: false,
      labelPosition: 'left',
      autoUpload: false,
      singleSubjectsArray: this.iniStaff.singleSubjectsArray,
      professionalCertificateArray: this.iniStaff.professionalCertificateArray,
      entryTime: '',
      expireTime: '',
      workContract: {
        name: ''
      },
      uploadState: {
        notUpload: true,
        uploading: false,
        uploaded: false,
        uploadFail: false,
        fileAddress: '',
        fileName: '',
        percentage: '0'
      },
      staffMid: {

      },
      staffRules: {
        telephone: [
          {
            // required: true
            // pattern: /^1\d{10}$/, 
            // message: '请输入以1开头的11位手机号', 
            // trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        jobNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        duties: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: false, message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请输入学历', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择级别', trigger: 'blur' }
        ],
        jonTitle: [
          { required: true, message: '请选择职称', trigger: 'blur' }
        ],
        entryTime: [
          { required: true, message: '请输入入职时间', trigger: 'blur' }
        ],
        expireTime: [
          { required: true, message: '请输入合同到期日', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请输入民族', trigger: 'blur' }
        ],
        isPrincipal:  [
          { required: true, message: '请输入是否为部门负责人', trigger: 'blur' }
        ],
        singleSubjects: [
          { required: true, message: '请选择单科成绩', trigger: 'blur' }
        ],
        professionalCertificate: [
          { required: true, message: '请选择职业证书', trigger: 'blur' }
        ],
        entryTime: [
          { required: true, message: '请选择入职时间' }
        ],
        expireTime: [
          { required: true, message: '请选择合同到期时间' }
        ],
        workContract: [
          { required: true, message: '提交劳动合同' }
        ]
      },
      scoresOption: ['会计', '财务成本管理', '税务', '经济法', '公司战略管理', '审计'],
      certificatesOption: ['注册会计师', '注册审计师', '注册造价工程师', '注册资产评估师', '注册土地评估师', '暂无'],
      levelList: ['一级', '二级', '三级'],
      jonTitleList: ['初级', '中级', '副高级', '高级'],
      dutiesList: ['部门经理', '项目经理', '主审', '职员']
    };
  },
  computed: {
    workerUrl () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        type: 'workContract',
        workerId: this.staff.id
      }
      return '/fileUpload?data=' + JSON.stringify(obj)
    },
    saveAble () {
      if (this.staff.name && this.staff.jobNumber && this.staff.gender && this.staff.nation && this.staff.idCard && this.staff.telephone && this.staff.duties && this.staff.education && this.staff.level && this.staff.entryTime && this.staff.expireTime) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    editAble: function (val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.canEdit.canEditDetail = true
          this.canEdit.canEditAuthority = false
          this.canEdit.canEditSalary = false
          this.canEdit.canEditBonus = false
          this.canEdit.canEditEducation = false
        } else {
          this.canEdit.canEditDetail = true
          this.canEdit.canEditAuthority = true
          this.canEdit.canEditSalary = true
          this.canEdit.canEditBonus = true
          this.canEdit.canEditEducation = true
        }
      }
    }
  },
  methods: {
    formatDate (nd) {
      let y = nd.getFullYear()
      let m = nd.getMonth() + 1
      if (m < 10) {
        m = '0' + m
      }
      let d = nd.getDate()
      if (d < 10) {
        d = '0' + d
      }
      return y + '-' + m + '-' + d
    },
    UploadSuccess (response, file, fileList) {
      if (response.statusCode === '10001') {
       this.editAble = false
       this.$message.success('保存成功')
       this.isNew[0] = false
      } else {
        this.$message.error('上传劳动合同失败，请重新上传')
      }
    },
    uploadFile () {
      this.$refs.upload.submit()
    },
    handleChange (file, fileList) {
      this.workContract = file
      console.log(file, fileList)
    }, 
    save1 () {
      console.log(1)
      if (this.isNew[0] !== false) {
        if (this.workContract.name) {
          this.addUser().then(() => {
            this.uploadFile()
          }, () => {})
        } else {
          this.addUser().then(() => {
            this.editAble = false
            this.$message.success('保存成功')
            this.$emit('reloadDetail', this.staff.id)
            this.isNew[0] = false
          }, () => {})
        }
      } else {
        if (this.workContract.name) {
          this.save().then(() => {
            this.uploadFile()
          }, () => {})
        } else {
          this.save().then(() => {
            this.editAble = false
            this.$message.success('保存成功')
            this.$emit('reloadDetail', this.staff.id)
            this.isNew[0] = false
          }, () => {})
        }
      }
    },
    addUser () {
      if (this.staff.entryTime instanceof Date) {
        this.entryTime = this.formatDate(this.staff.entryTime)
      } else {
        this.entryTime = this.staff.entryTime
      }
      if (this.staff.expireTime instanceof Date) {
        this.expireTime = this.formatDate(this.staff.expireTime)
      } else {
        this.expireTime = this.staff.expireTime
      }
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'addUser',
                platform: 'web',
                type: this.isNew[0],
                userName: this.staff.name,
                gender: this.staff.gender,
                phone: this.staff.telephone,
                jobNumber: this.staff.jobNumber,
                nation: this.staff.nation,
                duity: this.staff.duties,
                idCard: this.staff.idCard,
                email: this.staff.email,
                education: this.staff.education,
                level: this.staff.level,
                jonTitle: this.staff.jonTitle,
                entryTime: this.entryTime,
                expireTime: this.expireTime,
                singleSubjects: this.singleSubjectsArray.join('，'),
                professionalCertificate: this.professionalCertificateArray.join('，')
              }
              if (this.isNew[0] === 0) {
                Object.assign(obj, {
                  departmentId: this.isNew[1]
                })
              }
              if (this.type === 'department') {
                Object.assign(obj, {
                  companyId: this.isNew[1],
                  companyDepartmentId: this.isNew[2],
                  subdepartmentId: this.isNew[3],
                  groupId: this.isNew[4]
                })
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.staff.id = rep.data.data.id
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    save () {
      if (this.staff.entryTime instanceof Date) {
        this.entryTime = this.formatDate(this.staff.entryTime)
      } else {
        this.entryTime = this.staff.entryTime
      }
      if (this.staff.expireTime instanceof Date) {
        this.expireTime = this.formatDate(this.staff.expireTime)
      } else {
        this.expireTime = this.staff.expireTime
      }
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editUser',
                platform: 'web',
                editUserId: this.staff.id,
                userName: this.staff.name,
                gender: this.staff.gender,
                phone: this.staff.telephone,
                jobNumber: this.staff.jobNumber,
                nation: this.staff.nation,
                duity: this.staff.duties,
                idCard: this.staff.idCard,
                email: this.staff.email,
                education: this.staff.education,
                level: this.staff.level,
                jonTitle: this.staff.jonTitle,
                entryTime: this.entryTime,
                expireTime: this.expireTime,
                singleSubjects: this.singleSubjectsArray.join('，'),
                professionalCertificate: this.professionalCertificateArray.join('，')
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    edit () {
      this.staffMid = Object.assign({}, this.staff)
      this.editAble = true
    },
    cancel () {
      this.staff = this.staffMid
      this.cancelShow = false
      this.editAble = false
      if (this.isNew[0] === 0) {
        this.$emit('cancelNew')
      }
    },
    showModify () {
      if (this.modifyStaffType === 'function') {
        this.modifyStaffShow = false
        this.addShow = false
        this.addFuncShow = true
      } else {
        this.modifyStaffShow = false
        this.addShow = true
        this.addFuncShow = false
      }
    },
    saveNewStaff (typeArray) {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'modifyUserDepartment',
                platform: 'web',
                modifyUserId: this.staff.id,
                isPrincipal: this.staff.isPrincipal,
                newType: typeArray[0]
              }
              if (Number(typeArray[0]) === 0) {
                Object.assign(obj, {
                  departmentId: typeArray[1]
                })
              } else {
                Object.assign(obj, {
                  companyId: typeArray[1],
                  companyDepartmentId: typeArray[2],
                  subdepartmentId: typeArray[3],
                  groupId: typeArray[4]
                })
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('修改成员成功')
            this.addShow = false
            this.addFuncShow = false
            this.$emit('modifySuccess', typeArray[0])
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    delUser () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delUser',
                platform: 'web',
                delUserId: this.staff.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('成功删除员工')
            this.$emit('deleteSuccess')
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    }
  },
  props: ['type', 'iniStaff', 'isNew', 'canEdit'],
  created () {
    console.log(this.staff)
    if (this.isNew[0] !== false) {
      this.editAble = true
    }
  },
  components: {
    modal,
    staffAddModal,
    functionStaffAdd
  }
}
</script>

<style lang="sass" scoped>
  .staff-wrapper {
    .el-form {
      p {
        margin-bottom: 10px;
      }
    }
    .el-form-item {
      p {
        margin-bottom: 0;
      }
    }
    .title-contain {
      padding-left: 40px;
      padding-right: 10px;
      .main-title {
        margin-left: 0;
      }
    }
    .basic-contain {
      padding-top: 10px;
      padding-left: 40px;
      padding-right: 40px;
      background-color: #F9FBFE;
      .basic-form {
        margin-top: 5px;
      }
    }
    form {
      padding-left: 0;
      padding-right: 20px;
    }
  }
</style>