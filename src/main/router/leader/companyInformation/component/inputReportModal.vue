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
      <button class="btn my-btn cancel-btn" @click="deleteOptions">删除</button>
      <button class="btn my-btn draft-btn" @click="addType">添加</button>
      <button class="btn my-btn submit-btn" @click="saveReportOption">保存</button>
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
    saveReportOption () {
      this.iniReportType.forEach((item, index) => {
        if (item.input) {
          delete item.input
        }
      })
      this.$emit('saveReportOption', this.iniReportType)
    },
    deleteOptions () {
      let arr = []
      this.checked.forEach((item, index) => {
        this.iniReportType.forEach((jtem, jndex) => {
          if (item === jtem.name) {
            this.iniReportType.splice(jndex, 1)
          }
        })
      })
    }
  },
  created() {

  },
  props: ['iniReportType'],
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';


</style>
