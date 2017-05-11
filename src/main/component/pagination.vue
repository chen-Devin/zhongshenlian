<template>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :page-size="20"
        :total="totalItems">
      </el-pagination>
    </div>
</template>

<style lang="sass">
    .el-pagination {
        white-space: nowrap;
        padding: 2px 5px;
        color: #48576a;
        text-align: right;
    }
</style>

<script>
import Vue from 'vue';
import { Pagination } from 'element-ui';

Vue.use(Pagination);

export default {
  name: 'myPagination',
  data() {
      return {

      };
  },
  computed: {
    totalItems() {
      return Number(this.totalNum);
    }
  },
  methods: {
      handleCurrentChange(val) {
          this.$emit('currentChange',val);
      }
  },
  props: ['totalNum'],
  created() {

  }
}
</script>
