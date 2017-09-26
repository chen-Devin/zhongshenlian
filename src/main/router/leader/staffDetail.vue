<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit">编辑</button>
          <button class="btn my-btn cancel-btn">删除员工</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn">保存</button>
          <button class="btn my-btn draft-btn" @click="cancel">取消</button>
        </template>
      </div>
      <h5 class="main-title">基础信息</h5>
      <div class="basic-form">
        <el-row>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="80px" :model="staff" :rules="staffRules" ref="staff">
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
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
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
              <el-form-item label="合同到期日" prop="expireTime">
                <el-input v-model="staff.expireTime" :disabled="!editAble"></el-input>
              </el-form-item>
              <el-form-item label="劳动合同">
                <el-input v-model="staff.type" :disabled="!editAble"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-form :label-position="labelPosition" label-width="130px" :model="staff" :rules="staffRules" ref="staff">
            <el-form-item label="单科成绩">
              <el-checkbox-group v-model="staff.singleSubjects">
                <el-checkbox :label="option" name="type" v-for="(option, index) in scoresOption" :key="index"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'staffDetail',
  data() {
    return {
      labelPosition: 'left',
      staff: {
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
        singleSubjects: '',
        professionalCertificate: [{
          name: '',
          value: ''
        }],
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
      editAble: false,
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
        ]
      },
      scoresOption: ['会计', '财务成本管理', '税务', '经济法', '公司战略管理', '审计']
    };
  },
  methods: {
    getUserInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUserInfo',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.staff = rep.data.data
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    edit () {
      this.editAble = true
    },
    cancel () {
      this.editAble = false
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="sass" scoped>
  .staff-wrapper {
    .basic-contain {
      .basic-form {
        margin-top: 30px;
      }
    }
  }
</style>