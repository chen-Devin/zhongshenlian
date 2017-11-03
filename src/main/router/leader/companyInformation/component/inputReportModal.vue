<template>
  <modal modalWidth="550px">
    <div class="type-modal" slot="body">
      <img class="close" src="../../../../../img/close.png" @click="close">
      <h5 class="main-title">添加/删除可出具报告类型</h5>
      <section>
        <el-checkbox-group v-model="operateArray">
          <el-checkbox 
            :label="item.name" 
            v-for="(item, index) in selectedArray" 
            :key="index" 
            disabled></el-checkbox>
          <el-checkbox 
            :label="item.name"
            v-for="(item, index) in restType" 
            :key="index">
          </el-checkbox>
          <el-checkbox
            v-for="(item, index) in addTypeArray"
            :key="index">
            <input ref="inputTxt" type="text" v-model="item.name" autofocus>
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
      reportType: this.iniReportType,
      operateArray: [],
      restType: [],
      addTypeArray: [{
        name: ''
      }],
      selectedArray: []
    };
  },
  computed: {
    options () {
      return this.selectedArray.concat(this.restType).concat(this.addTypeArray)
    }
  },
  methods: {
    addType () {
      if (this.addTypeArray[this.addTypeArray.length -1].name) {
        this.addTypeArray.push({
          name: ''
        })
        setTimeout(() => {
          this.$refs.inputTxt[this.$refs.inputTxt.length -1].focus()
        }, 500)
      } else {
        this.$message.error('请填写内容后再添加可出具报告类型')
      }
    },
    saveReportOption () {
      let arr = []
      this.options.forEach((item) => {
        if (item.name) {
          arr.push(item)
        }
      })
      this.$emit('saveReportOption', arr)
    },
    deleteOptions () {
      this.operateArray.forEach((item) => {
        this.restType.filter((jtem, jndex, array) => {
          if (item === jtem.name) {
            array.splice(jndex, 1)
          }
        })
      })
    },
    close () {
      this.$emit('closeTypeModal')
    }
  },
  created() {
    let arr = []
    this.iniReportType.forEach((item, index) => {
      var flag = 0
      this.selected.forEach((jtem, jndex) => {
        if (item.name === jtem) {
          flag = 1
        }
      })
      if (!flag) {
        arr.push({
          name: item.name
        })
      }
    })
    this.restType = arr
    this.selected.forEach((item) => {
      this.selectedArray.push({
        name: item
      })
    })
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
    .main-title {
      margin-left: 0;
    }
  }
</style>
