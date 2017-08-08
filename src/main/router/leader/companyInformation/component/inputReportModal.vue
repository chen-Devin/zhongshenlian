<template>
  <modal class="type-modal" modalWidth="550px">
    <div slot="body">
      <h5 class="main-title">添加/删除可出具报告类型</h5>
      <section>
        <el-checkbox-group v-model="checked">
          <el-checkbox
            :label="item.name"
            v-for="(item, index) in iniReportType"
            :key="index"
            v-if="!item.input"></el-checkbox>
          <el-checkbox
            v-for="(item, index) in iniReportType"
            :key="index"
            v-if="item.input">
            <input type="text" name="" v-model="item.name">
          </el-checkbox>
        </el-checkbox-group>
      </section>
    </div>
    <div slot="footer">
      <button class="btn my-btn cancel-btn">删除</button>
      <button class="btn my-btn draft-btn" @click="addType">添加</button>
      <button class="btn my-btn submit-btn" @click="save">保存</button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import modal from '@/main/component/modal.vue';

export default {
  name: '',
  data() {
    return {
      iniReportType: [{
        name: '审字'
      }, {
        name: '专字'
      }, {
        name: '咨字'
      }, {
        name: '基决审字'
      }, {
        name: '外汇检字'
      }, {
        name: '验字'
      }, {
        name: '外审字'
      }, {
        name: '无报告'
      }],
      checked: []
    };
  },
  computed: {

  },
  methods: {
    addType () {
      this.iniReportType.push({
        name: '',
        input: true
      })
    },
    save () {
      this.iniReportType.forEach((item, index) => {
        if (item.input) {
          delete item.input
        }
      })
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editCompany',
                platform: 'web',
                data: {
                  reportTypeOption: this.iniReportType
                }
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message('保存成功')
            this.companyId = rep.data.data.companyId
            this.$emit('saveIputModal', this.companyId)
            this.$emit('closeIputModal')
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  created() {

  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';


</style>
