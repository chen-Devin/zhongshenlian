<template>
  <div class="customer-info-add">
    <crumbs :paths="paths"></crumbs>
    <card v-if="apply">
      <h1 class="title">开票申请</h1>
      <div class="message-box">
        <el-row>
          <el-col :span="12" :offset="6">
            <p>
              <span>项目名称</span>
              <el-select v-model="projectId" placeholder="请选择项目" style="width:100%;">
                <el-option
                  v-for="item in projects"
                  :key="item.value"
                  :label="item.projectName"
                  :value="item.id">
                </el-option>
              </el-select>
            </p>
          </el-col>
        </el-row>
      </div>
      <p>
        <button class="btn my-btn submit-btn" type="button" :disabled="disSubmit" @click="jump">确定</button>
      </p>
    </card>
    <card v-else>
      <!-- <h4>开票申请</h4>
      <div class="project-message">
        <el-row>
          <el-col :span="8">
            项目编号：
          </el-col>
          <el-col :span="8">
            项目名称：
          </el-col>
          <el-col :span="8">
            合同金额：
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            开票申请人：
          </el-col>
          <el-col :span="8">
            申请时间：
          </el-col>
          <el-col :span="8">
            累计开票金额：
          </el-col>
        </el-row>
      </div>
      <div class="bill-message">
        <el-form 
          :model="bill" 
          :label-position="labelPosition"
          :rules="rules"
          ref="bill"
          label-width="100px" 
          class="bill-form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="本次开票金额" prop="name">
                <el-input v-model="bill.projectName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              
            </el-col>
          </el-row>
        </el-form>
      </div> -->
      <billing-info :business="business" :user="user" @cancel="cancel"></billing-info>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import crumbs from '@/main/component/crumbs.vue';
import billingInfo from './billingInfo.vue'

export default {
  name: 'contractChange',
  data() {
    return {
      paths: [
        { name: '开票申请', url: '/bill-apply', present: true }
      ],
      apply: true,
      projectId: '',
      projects: [],
      bill: {

      },
      user: {},
      labelPosition: 'left',
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        scope:[
          { required: true, message: '请输入业务范围与审计目标', trigger: 'blur' }
        ]
      },
      business: {}
    }
  },
  computed: {
    disSubmit () {
      if (this.projectId === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getBusinessInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getBusinessInfo',
                platform: 'web',
                id: this.projectId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business = rep.data.data
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    getProjectByPerson () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getProjectByPerson',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.projects = rep.data.data.resultArray
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    cancel () {
      this.apply = true
    },
    jump () {
      this.getBusinessInfo().then(() => {
        this.apply = false
      }, () => {})
    }
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
    this.getProjectByPerson()
  },
  components: {
    card,
    crumbs,
    billingInfo
  }
};
</script>

<style lang="sass" scoped>
  .customer-info-add {
    .title {
      font-size: 18px;
      text-align: center;
      margin-top: 40px;
      + p {
        font-size: 13px;
        text-align: center;
      }
    }
    .message-box {
      background-color: #f9fbfe;
      padding: 20px 50px;
      p {
        display: flex;
        line-height: 34px;
        padding: 0 20px;
        span {
          width: 88px;
        }
      }
      + p {
        margin-top: 20px;
        text-align: center;
      }
    }
    .project-message {
      background-color: #f9fbfe;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .bill-message {
      margin-top: 10px;
    }
  }
</style>