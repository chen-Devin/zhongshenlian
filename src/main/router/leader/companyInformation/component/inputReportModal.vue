<template>
  <modal modalWidth="550px">
    <div class="type-modal" slot="body">
      <i class="fa fa-times close" aria-hidden="true" @click="close"></i>
      <h5 class="main-title">添加/删除可出具报告类型</h5>
      <section>
        <p>{{ iniReportType }} {{ selected }}</p>
        <el-checkbox-group v-model="operateArray">
          <el-checkbox :label="item" v-for="(item, index) in selected" :key="index" disabled></el-checkbox>
          <el-checkbox :label="item" v-for="(item, index) in restType" :key="index"></el-checkbox>
        </el-checkbox-group>
        <!-- <el-checkbox-group v-model="checked">
          <el-checkbox
            :label="item.name"
            v-for="(item, index) in reportType"
            :key="index"
            v-if="!item.input"></el-checkbox>
          <el-checkbox
            v-for="(item, index) in reportType"
            :key="index"
            v-if="item.input">
            <input type="text" name="" v-model="item.name">
          </el-checkbox>
        </el-checkbox-group> -->
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
      // checked: [],
      reportType: this.iniReportType,
      // reportTypeCopy: [],
      // selectionsCopy: [],
      operateArray: [],
      restType: []
    };
  },
  computed: {

  },
  methods: {
    // addType () {
    //   console.log(this.reportTypeCopy)
    //   this.reportType.push({
    //     name: '',
    //     input: true
    //   })
    // },
    // saveReportOption () {
    //   this.reportType.forEach((item, index) => {
    //     if (item.input) {
    //       delete item.input
    //     }
    //   })
    //   this.$emit('saveReportOption', this.reportType)
    // },
    // deleteOptions () {
    //   console.log(this.reportTypeCopy)
    //   let arr = []
    //   this.checked.forEach((item, index) => {
    //     this.reportType.forEach((jtem, jndex) => {
    //       if (item === jtem.name) {
    //         this.reportType.splice(jndex, 1)
    //       }
    //     })
    //     this.selected.forEach((ktem, kndex) => {
    //       if (item === ktem) {
    //         this.selected.splice(kndex, 1)
    //       }
    //     })
    //   })
    // },
    close () {
      this.$emit('closeTypeModal', this.reportTypeCopy, this.selectionsCopy)
    }
  },
  created() {
    // this.repotTypeOptionCopy = this.iniReportType
    // let objCopy = this.iniReportType.slice()
    // let objCopy2 = this.selected.slice()
    // this.reportTypeCopy = objCopy
    // this.selectionsCopy = objCopy2
    let arr = []
    this.iniReportType.forEach((item, index) => {
      var flag = 0
      this.selected.forEach((jtem, jndex) => {
        if (item.name === jtem) {
          flag = 1
        }
      })
      if (!flag) {
        arr.push(item.name)
      }
    })
    this.restType = arr
  },
  props: ['iniReportType', 'selected'],
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';
  
  .type-modal {
    position: relative;
    .close {
      position: absolute;
      top: -30px;
      right: -15px;
      color: red;
    }
  }
</style>
