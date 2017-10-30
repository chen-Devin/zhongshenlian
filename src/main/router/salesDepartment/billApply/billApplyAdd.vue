<template>
  <div class="customer-info-add">
    <crumbs :paths="paths"></crumbs>
    <card v-if="loaded">
      <billing-info :business="business" :user="user" @cancel="cancel"></billing-info>
    </card>
  </div>
</template>

<script>
import axios from 'axios'
import card from '@/main/component/card.vue'
import crumbs from '@/main/component/crumbs.vue'
import billingInfo from './billingInfo.vue'

export default {
  name: 'contractChange',
  data() {
    return {
      paths: [
        { name: '开票申请', url: '/bill-apply', present: true }
      ],
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
      business: {},
      loaded: false
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
                id: this.$route.params.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.business = rep.data.data
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    cancel () {
      this.$router.push('/bill-apply')
    }
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
    this.getBusinessInfo().then(() => {
      this.loaded = true
    }, () => {})
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