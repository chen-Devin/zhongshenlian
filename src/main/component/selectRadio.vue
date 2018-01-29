<template>
	<div class="radios-wrapper">
		<el-radio-group v-model="radio" @change="changeClick">
			<el-radio label="all">全部</el-radio>
	    <el-radio v-for="item in companyList" :label="item.id">{{item.name}}</el-radio>
	  </el-radio-group>
	</div>
</template>
<script>
	export default {
    data () {
      return {
      	radio: '',
      	arr: []
      }
    },
    created () {
    	this.radio = 'all'
    },
    methods: {
    	changeClick () {
    		
    		this.$emit('changeClick', this.radio)
    	}
    },
    props: ['companyList']
  }
</script>
<style lang="sass" scoped>
	.radios-wrapper{
		margin-left: 20px;
		margin-right: 10px;
		background: #C4F4FF;
		padding-left: 20px;
	}
	.el-radio-group{
		line-height: 44px;
	}
.el-radio__input.is-checked .el-radio__inner {
    border-color: #101010;
    background: #101010;
  }
	.el-radio-group .el-radio{
		height: 44px;
		line-height: 44px;
	}
</style>