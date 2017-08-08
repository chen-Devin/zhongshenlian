<template>
    <el-col :span="20" :offset="2">
      <div class="post-type">
        <div class="title">
          分管公司出具报告类型：
        </div>
        <div class="selections">
          <el-checkbox-group v-model="checked">
            <el-checkbox :label="item.name" v-for="(item, index) in iniReportType" :key="index"></el-checkbox>
          </el-checkbox-group>
          <a href="javascript:void(0);" @click="showType">添加/删除报告类型</a>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'editReportType',
  data() {
    return {
      iniReportType: [],
      checked: []
    };
  },
  computed: {
    companyId () {
      return this.$route.params.id
    }
  },
  methods: {
    getCompanyInfo () {
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
                companyId: this.companyId
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.company = rep.data.data
            this.iniReportType = this.company.reportTypeOption
            this.checked = this.company.reportType
            let arr = []
            this.checked.forEach((item, index) => {
              arr.push(item.name)
            })
            this.checked = arr
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    showType () {

    }
  },
  created() {
    this.getCompanyInfo()
  },
  components: {

  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

.post-type {
  display: flex;
  .title {
    width: 235px;
  }
}
</style>
