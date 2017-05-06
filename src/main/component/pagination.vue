<template>
    <!-- 传页数未解决-->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-size="10"
        :page-count="10" 
        class="myPagination">
      </el-pagination>
    </div>
</template>

<style lang="sass">
    .myPagination {
        text-align: center;
        ul {
            li {
                width: 35px;
                height: 35px;
                line-height: 35px;
            }
        }
        button {
            width: 35px;
            height: 35px;
            line-height: 35px;
            &:first-child {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }
            &:last-child {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }
        }
        margin-bottom: 20px;
    }
</style>

<script>
import Vue from 'vue';
// import axios from 'axios';
import { Pagination } from 'element-ui';

Vue.use(Pagination);

export default {
  name: 'myPagination',
  data() {
      return {
          totalPage: this.iniTotalPage,
      }
  },
  props: ['iniTotalPage'],
  created() {
    console.log(this.iniTotalPage);
  }
}
</script>