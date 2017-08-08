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
          <a href="javascript:void(0);" @click="inputReportModal">添加/删除报告类型</a>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';

export default {
  name: '',
  data() {
    return {
      iniReportType: [{
        name: '审字',
        selected: false
      }, {
        name: '专字',
        selected: false
      }, {
        name: '咨字',
        selected: false
      }, {
        name: '基决审字',
        selected: false
      }, {
        name: '外汇检字',
        selected: false
      }, {
        name: '验字',
        selected: false
      }, {
        name: '外审字',
        selected: false
      }, {
        name: '无报告',
        selected: false
      }],
      checked: []
    };
  },
  computed: {

  },
  methods: {
    inputReportModal() {
      this.$emit('inputReportModal')
    }
  },
  created() {

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
