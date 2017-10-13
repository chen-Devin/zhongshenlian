<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit">编辑</button>
          <button class="btn my-btn cancel-btn" @click="deleteStaff">删除员工</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template>
      </div>
      <h5 class="main-title">基础信息</h5>
      <div class="basic-form">
        <el-row>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="100px" :model="staff" :rules="staffRules" ref="staff">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="staff.name" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="工号" prop="jobNumber">
                <el-input v-model="staff.jobNumber" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-input v-model="staff.gender" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="民族" prop="nation">
                <el-input v-model="staff.nation" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="staff.idCard" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="telephone">
                <el-input v-model="staff.telephone" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="staff.email" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="是否为部门负责人" prop="isPrincipal">
                <el-input v-model="staff.isPrincipal" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="所属业务部" v-if="type==='department'">
                <el-input v-model="staff.companyDepartment" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="所属项目部" v-if="type==='department'">
                <el-input v-model="staff.projectDepartment" :disabled="!editAble"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
              <el-form-item label="所属小组" v-if="type==='department'">
                <el-input v-model="staff.group" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="duties">
                <el-input v-model="staff.duties" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="学历" prop="education">
                <el-input v-model="staff.education" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="职称" prop="jonTitle">
                <el-input v-model="staff.jonTitle" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="是否有注会证书" prop="isHaveCertificate">
                <el-input v-model="staff.isHaveCertificate" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="入职时间" prop="entryTime">
                <el-input v-model="staff.entryTime" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="合同到期日">
                <el-input v-model="staff.expireTime" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="劳动合同">
                <el-input v-model="staff.type" :disabled="!editAble"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :rules="staffRules">
            <el-form-item label="单科成绩" prop="singleSubjects">
              <el-checkbox-group v-model="staff.singleSubjectsArray">
                <el-checkbox :label="option" v-for="(option, index) in scoresOption" :key="index" :disabled="!editAble">{{ option }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-row>
        <!-- <p>{{ staff }}</p> -->
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
            <el-form-item label="执行证书" prop="professionalCertificate">
              <el-checkbox-group v-model="staff.PCSelected">
                <el-checkbox :label="option" :value="option" v-for="(option, index) in staff.PCOptions" :key="index" :disabled="!editAble"></el-checkbox>
              </el-checkbox-group>
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
      singleSubjects: [],
      professionalCertificate: [],
      staff: {

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
  methods: {
    getStaffInfo (id) {
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
                id: 1  // ly没给id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.staff = rep.data.data
            this.staff = this.staffDataHandle(this.staff)
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    staffDataHandle (staff) {
      staff.singleSubjectsArray = staff.singleSubjects.split('，')
      staff.PCOptions = staff.professionalCertificate.map((item) => {
        return item.name
      })
      staff.PCSelected = staff.professionalCertificate.map((item) => {
        if (item.value === '1') {
          return item.name
        }
      })
      return staff
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
                duity: this.staff.duties,
                idCard: this.staff.idCard,
                email: this.staff.email,
                education: this.staff.education,
                jonTitle: this.staff.jonTitle,
                entryTime: this.staff.entryTime,
                expireTime: this.staff.expireTime,
                singleSubjects: this.staff.singleSubjects,
                professionalCertificate: this.staff.professionalCertificate,
                isPrincipal: this.staff.isPrincipal,
                isHaveCertificate: this.staff.isHaveCertificate
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('保存成功')
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
          this.getStaffInfo()
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
  props: ['type'],
  created () {
    this.getStaffInfo()
  }
}
</script>

<style lang="sass" scoped>
  .staff-wrapper {
    .basic-contain {
      padding-left: 40px;
      padding-right: 20px;
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