<template>
  <div class="customer-info-add">
    <crumbs :paths="paths"></crumbs>
    <card>
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
      projectId: '',
      projects: []
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
                platform: 'web',
                type: 0
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.projects = rep.data.data.resultArray
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    jump () {
      this.$router.push('/bill-apply-add/' + this.projectId)
    }
  },
  created () {
    this.getProjectByPerson()
  },
  components: {
    card,
    crumbs
  }
};
</script>

<style lang="sass" scoped>
  .customer-info-add {
    .title {
      font-size: 18px;
      text-align: center;
      margin-top: 40px;
      margin-bottom: 20px;
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