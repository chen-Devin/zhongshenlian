<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit">编辑</button>
          <button class="btn my-btn cancel-btn" @click="deleteStaff">删除员工</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save1">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template>
      </div>
      <h5 class="main-title">基础信息</h5>
      <div class="basic-form">
        <el-row>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="100px" :model="staff" :rules="staffRules" ref="staff">
              <el-form-item label="姓名" label-width="50px" prop="name">
                <el-input v-model="staff.name" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="工号" label-width="50px" prop="jobNumber">
                <el-input v-model="staff.jobNumber" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="性别" label-width="50px" prop="gender">
                <el-radio v-model="staff.gender" label="男" :disabled="!editAble">男</el-radio>
                <el-radio v-model="staff.gender" label="女" :disabled="!editAble">女</el-radio>
              </el-form-item>
              <el-form-item label="民族" label-width="50px" prop="nation">
                <el-input v-model="staff.nation" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" label-width="80px" prop="idCard">
                <el-input v-model="staff.idCard" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="手机号" label-width="70px" prop="telephone">
                <el-input v-model="staff.telephone" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" label-width="50px" prop="email">
                <el-input v-model="staff.email" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="是否为部门负责人" label-width="130px" prop="isPrincipal">
                <el-radio v-model="staff.isPrincipal" label="1" :disabled="!editAble">是</el-radio>
                <el-radio v-model="staff.isPrincipal" label="0" :disabled="!editAble">否</el-radio>
              </el-form-item>
              <el-form-item label="所属业务部" label-width="80px" v-if="type==='department' && isNew[0] === false">
                <el-input v-model="staff.companyDepartment" disabled></el-input>
              </el-form-item>
              <el-form-item label="所属项目部" label-width="80px" v-if="type==='department' && isNew[0] === false">
                <el-input v-model="staff.projectDepartment" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
              <el-form-item label="所属小组" label-width="70px" v-if="type==='department' && isNew[0] === false">
                <el-input v-model="staff.group" disabled></el-input>
              </el-form-item>
              <el-form-item label="职位" label-width="50px" prop="duties">
                <el-input v-model="staff.duties" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="学历" label-width="50px" prop="education">
                <el-input v-model="staff.education" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="职称" label-width="50px" prop="jonTitle">
                <el-input v-model="staff.jonTitle" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="是否有注会证书" prop="isHaveCertificate">
                <el-radio v-model="staff.isHaveCertificate" label="1" :disabled="!editAble">是</el-radio>
                <el-radio v-model="staff.isHaveCertificate" label="0" :disabled="!editAble">否</el-radio>
              </el-form-item>
              <el-form-item label="入职时间" label-width="70px">
                <el-date-picker
                  style="width:100%"
                  v-model="staff.entryTime"
                  type="date"
                  placeholder="选择日期"
                  :disabled="!editAble">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="合同到期日" label-width="80px">
                <el-date-picker
                  style="width:100%"
                  v-model="staff.expireTime"
                  type="date"
                  placeholder="选择日期"
                  :disabled="!editAble">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :rules="staffRules">
            <el-form-item label="单科成绩" label-width="80px" prop="singleSubjects">
              <el-checkbox-group v-model="singleSubjectsArray">
                <el-checkbox :label="option" v-for="(option, index) in scoresOption" :key="index" :disabled="!editAble">{{ option }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
            <el-form-item label="执行证书" label-width="80px" prop="professionalCertificate">
              <el-checkbox-group v-model="professionalCertificateArray">
                <el-checkbox :label="option" :value="option" v-for="(option, index) in certificatesOption" :key="index" :disabled="!editAble"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px">
            <el-form-item label="劳动合同" label-width="80px">
              <!-- <el-input v-model="staff.type" :disabled="!editAble"></el-input> -->
              <div>
                <el-upload ref="upload"
                           :show-file-list="false"
                           :action="workerUrl"
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
          {required: true, message: '请输入手机号', trigger: 'blur'}
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
          { required: true, message: '请输入邮箱', trigger: 'blur' }
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
        workerId: this.staff.id
      }
      return '/fileUpload?data=' + JSON.stringify(obj)
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
      console.log(this.isNew)
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
            this.$emit('addSuccess', this.staff.id)
            this.isNew[0] = false
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
          this.editAble = false
        }, (rep) => { });
      })
    },
    edit () {
      this.editAble = true
    },
    cancel () {
      this.editAble = false
    },
    deleteStaff () {
      this.$message.error('删除接口有问题')
    }
  },
  props: ['type', 'staff', 'isNew'],
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