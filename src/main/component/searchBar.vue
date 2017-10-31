<template>
  <div class="search-bar-wrapper">
    <el-select v-model="searchItem" placeholder="查询条件">
      <el-option
        v-for="item in searchItems"
        :key="item.value"
        :label="item.label"
        :value="item">
      </el-option>
    </el-select>
    <el-input 
      v-model="searchContent" 
      :placeholder="placeholder"
      v-for="(item, index) in searchItems"
      :key="index"
      v-if="searchItem.value === item.value"></el-input>
    <img
      width="30"
      height="30"
      :src="searchIcon"
      class="search-icon"
      @mouseover="activeIcon"
      @mouseout="defaultIcon"
      @click="search">
    <a class="reset" 
      href="javascript:void(0);" 
      v-if="searchContent"
      @click="reset">重置</a>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  data() {
    return {
      searchItem: '',
      searchContent: '',
      searchIcon: require('../../img/assets2/search-default.png')
    }
  },
  computed: {
    placeholder () {
      return '请输入' + this.searchItem.label
    }
  },
  props: ['searchItems'],
  methods: {
    activeIcon () {
      this.searchIcon = require('../../img/assets2/search-active.png')
    },
    defaultIcon () {
      this.searchIcon = require('../../img/assets2/search-default.png')
    },
    search () {
      let obj = {}
      obj[this.searchItem.value] = this.searchContent
      if (this.searchContent) {
        this.$emit('search', obj)
      }
    },
    reset () {
      this.searchItem = {}
      this.searchContent = ''
      this.$emit('search', {})
    }
  }
}
</script>

<style lang="sass">
  .search-bar-wrapper {
    display: flex;
    height: 30px;
    > .el-select {
      display: inline-block;
      margin-right: 10px;
    }
    > .el-input {
      display: inline-block;
      margin-right: 10px;
    }
    > .search-icon {
      margin-right: 10px;
      cursor: pointer;
    }
    > .reset {
      display: inline-block;
      width: 80px;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
      font-size: 14px;
    }
    .el-input__inner {
      height: 30px;
    }
  }
</style>
