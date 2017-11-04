<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit" :disabled="!canEdit.canEditDetail">编辑</button>
          <button class="btn my-btn cancel-btn" @click="delUser" :disabled="!canEdit.canEditDetail">删除员工</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save1" :disabled="saveAble">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template>
      </div>
      <h5 class="main-title">基础信息</h5>
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
              <el-form-item label="手机号：" label-width="80px" prop="telephone" v-if="editAble">
                <el-input v-model="staff.telephone"></el-input>
              </el-form-item>
              <p v-else>手机号：{{staff.telephone}}</p>
              <el-form-item label="邮箱：" label-width="70px" prop="email" v-if="editAble">
                <el-input v-model="staff.email"></el-input>
              </el-form-item>
              <p v-else>邮箱：{{staff.email}}</p>
              <el-form-item label="是否为部门负责人：" label-width="150px" prop="isPrincipal" v-if="editAble">
                <el-radio v-model="staff.isPrincipal" label="1">是</el-radio>
                <el-radio v-model="staff.isPrincipal" label="0">否</el-radio>
              </el-form-item>
              <p v-else>是否为部门负责人：{{staff.isPrincipal==='1'? '是':'否'}} </p>
              <el-form-item label="所属业务部：" label-width="100px" v-if="type==='department' && isNew[0] === false">
                <p v-model="staff.companyDepartment" disabled></p>
              </el-form-item>
              <el-form-item label="所属项目部：" label-width="100px" v-if="type==='department' && isNew[0] === false">
                <p v-model="staff.projectDepartment" disabled></p>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
              <el-form-item label="所属小组：" label-width="80px" v-if="type==='department' && isNew[0] === false">
                <p v-model="staff.group" disabled></p>
              </el-form-item>
              <el-form-item label="职位：" label-width="70px" prop="duties" v-if="editAble">
                <el-input v-model="staff.duties"></el-input>
              </el-form-item>
              <p v-else>职位：{{staff.duties}}</p>
              <el-form-item label="学历：" label-width="70px" prop="education" v-if="editAble">
                <el-input v-model="staff.education"></el-input>
              </el-form-item>
              <p v-else>学历：{{staff.education}}</p>
              <el-form-item label="职称：" label-width="70px" prop="jonTitle" v-if="editAble">
                <el-input v-model="staff.jonTitle"></el-input>
              </el-form-item>
              <p v-else>职称：{{staff.jonTitle}}</p>
              <el-form-item label="是否有注会证书：" prop="isHaveCertificate" v-if="editAble">
                <el-radio v-model="staff.isHaveCertificate" label="1">是</el-radio>
                <el-radio v-model="staff.isHaveCertificate" label="0">否</el-radio>
              </el-form-item>
              <p v-else>是否有注会证书：{{staff.isHaveCertificate==='1'? '是':'否'}}</p>
              <el-form-item label="入职时间：" label-width="90px" v-if="editAble">
                <el-date-picker
                  style="width:100%"
                  v-model="staff.entryTime"
                  type="date"
                  placeholder="选择日期"
                 >
                </el-date-picker>
              </el-form-item>
              <p v-else>入职时间：{{staff.entryTime}}</p>
              <el-form-item label="合同到期日：" label-width="100px" v-if="editAble">
                <el-date-picker
                  style="width:100%"
                  v-model="staff.expireTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <p v-else>合同到期日：{{staff.expireTime}}</p>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :rules="staffRules">
            <el-form-item label="单科成绩：" label-width="90px" prop="singleSubjects">
              <el-checkbox-group v-model="singleSubjectsArray">
                <el-checkbox :label="option" v-for="(option, index) in scoresOption" :key="index" :disabled="!editAble">{{ option }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
            <el-form-item label="执行证书：" label-width="90px" prop="professionalCertificate">
              <el-checkbox-group v-model="professionalCertificateArray">
                <el-checkbox :label="option" :value="option" v-for="(option, index) in certificatesOption" :key="index" :disabled="!editAble"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="劳动合同：" label-width="80px">
              <!-- <el-input v-model="staff.type" :disabled="!editAble"></el-input> -->
              <div>
                <el-upload ref="upload"
                           :show-file-list="false"
                           :action="workerUrl"
                           :auto-upload="autoUpload"
                           :on-progress="UploadProgress"
                           :on-success="UploadSuccess">
                  <button class="btn my-btn submit-btn"
                          type="button"
                          slot="trigger"
                          :disabled="!editAble">上传文件</button>
                  <span slot="tip"
                        class="text-info" v-if="uploadState.notUpload">&emsp;文件大小建议不超过3Mb</span>
                  <span slot="tip"
                        class="text-info" v-if="uploadState.uploading">
                        &emsp;
                        <i class="el-icon-loading"></i>
                        &emsp;
                        {{ uploadState.percentage }}%
                        </span>
                  <span slot="tip"
                        class="text-info" v-if="uploadState.uploadFail">&emsp;<i class="el-icon-close"></i>上传失败，请重试</span>
                  <span slot="tip"
                        class="text-info" v-if="uploadState.uploaded">&emsp;<i class="el-icon-check"></i>已上传</span>
                  <span slot="tip"
                        class="text-info" v-if="uploadState.uploaded">
                        &emsp;
                        <span class="fa fa-file-text-o"></span>
                        <a :href="uploadState.fileAddress" target="_blank">{{ uploadState.fileName }}</a>
                        </span>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'staffDetail',
  data() {
    return {
      editAble: false,
      labelPosition: 'left',
      autoUpload: false,
      singleSubjectsArray: this.staff.singleSubjectsArray,
      professionalCertificateArray: this.staff.professionalCertificateArray,
      uploadState: {
        notUpload: true,
        uploading: false,
        uploaded: false,
        uploadFail: false,
        fileAddress: '',
        fileName: '',
        percentage: '0'
      },
      staffRules: {
        telephone: [
          {
            required: true, 
            pattern: /^1\d{10}$/, 
            message: '请输入以1开头的11位手机号', 
            trigger: 'blur'
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
          { type: 'email', required: true, message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请输入学历', trigger: 'blur' }
        ],
        jonTitle: [
          { required: true, message: '请输入职称', trigger: 'blur' }
        ],
        entryTime: [
          { required: true, message: '请输入入职时间', trigger: 'blur' }
        ],
        expireTime: [
          { required: true, message: '请输入合同到期日', trigger: 'blur' }
        ],
        isHaveCertificate:  [
          { required: true, message: '请输入是否有注会证书', trigger: 'blur' }
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
        ]
      },
      scoresOption: ['会计', '财务成本管理', '税务', '经济法', '公司战略管理', '审计'],
      certificatesOption: ['注册会计师', '注册审计师', '注册造价工程师', '注册资产评估师', '注册土地评估师', '暂无']
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
      if (this.staff.name && this.staff.jobNumber && this.staff.gender && this.staff.nation && this.staff.idCard && this.staff.telephone && this.staff.email && this.staff.isPrincipal && this.staff.duties && this.staff.education && this.staff.jonTitle && this.staff.isHaveCertificate) {
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
    UploadProgress (event, file, fileList) {
      this.uploadState.notUpload = false
      this.uploadState.uploading = true
      this.uploadState.uploaded = false
      this.uploadState.percentage = parseInt(event.percent)
    },
    UploadSuccess (response, file, fileList) {
      this.uploadState.notUpload = false
      this.uploadState.uploading = false
      this.uploadState.uploaded = false
      this.uploadState.uploadFail = false
      if (response.statusCode === '10001') {
        this.uploadState.uploaded = true
        this.uploadState.fileAddress = response.data.path
        this.uploadState.fileName = response.data.annexName
        this.reportId = response.data.id
      } else {
        this.uploadState.uploadFail = true
      }
    },
    save1 () {
      if (this.isNew[0] !== false) {
        this.addUser()
      } else {
        this.save()
      }
    },
    addUser () {
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
                duity: this.staff.duties,
                idCard: this.staff.idCard,
                email: this.staff.email,
                education: this.staff.education,
                jonTitle: this.staff.jonTitle,
                entryTime: this.staff.entryTime,
                expireTime: this.staff.expireTime,
                singleSubjects: this.singleSubjectsArray.join('，'),
                professionalCertificate: this.professionalCertificateArray.join('，'),
                isPrincipal: this.staff.isPrincipal,
                isHaveCertificate: this.staff.isHaveCertificate,
                nation: this.staff.nation 
              }
              if (this.isNew[0] === 0) {
                Object.assign(obj, {
                  departmentId: this.isNew[1]
                })
              }
              if (this.type = 'department') {
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
            this.editAble = false
            this.$message.success('保存成功,请继续编辑员工信息')
            this.$emit('addSuccess', rep.data.data.id)
            this.isNew[0] = false
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
          this.editAble = false
        }, (rep) => { });
      })
    },
    save () {
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
                jonTitle: this.staff.jonTitle,
                entryTime: this.staff.entryTime,
                expireTime: this.staff.expireTime,
                singleSubjects: this.singleSubjectsArray.join('，'),
                professionalCertificate: this.professionalCertificateArray.join('，'),
                isPrincipal: this.staff.isPrincipal,
                isHaveCertificate: this.staff.isHaveCertificate
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.editAble = false
            this.$message.success('保存成功')
            this.isNew[0] = false
            this.editAble = false
            // this.$emit('reloadDetail', this.staff.id)
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    edit () {
      this.editAble = true
    },
    cancel () {
      this.editAble = false
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
  props: ['type', 'staff', 'isNew', 'canEdit'],
  created () {
    if (this.isNew[0] !== false) {
      this.editAble = true
    }
  }
}
</script>

<style lang="sass" scoped>
  .staff-wrapper {
    .basic-contain {
      padding-left: 40px;
      padding-right: 40px;
      .main-title {
        margin-left: 0;
      }
      .basic-form {
        margin-top: 30px;
      }
    }
    form {
      padding-left: 0;
      padding-right: 20px;
    }
  }
</style>