<template>
	<div class="main">
		<crumbs v-bind:paths="paths"></crumbs>
		<form class="form-inline">
			<div class="form-group keyword-btn">
    			<input type="text" class="form-control" placeholder="请输入关键字">
  			</div>
  			<button type="submit" class="btn btn-primary">搜索</button>
		</form>
		<p class="bid-time">招标时间</p>
		<input type="date" name="">
		<input type="date" name="">
		<p>
			<input type="radio" name="ZhongBiao">已中标
			<input type="radio" name="RuWei">已入围
		</p>
		<button class="btn btn-primary type-btn">录入</button>
		<table class="table table-hover">
			<thead>项目名称 上传日期 截止日期</thead>
			<tbody>
				<tr>project1</tr>
				<tr>project2</tr>
				<tr>project3</tr>
				<tr>project4</tr>
				<tr>project5</tr>
			</tbody>
		</table>	
	</div>
	
</template>

<script>

import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';

export default {
    name: 'bidInforListMarket',
    data() {
    	return {
    		paths: [
        		{name: '招投标信息看板', url: '/customer-infor-list-leader', present: true}
      		]
    	};
    },
    components: {
    	crumbs
    }
}
</script>

<style lang="sass" scoped>

.main {
	position: relative;
	.bid-time {
		padding: 8px 10px 8px 10px;
		margin: 10px 0 10px 0;
		background-color: #E4E4E4;
		display: inline-block;

	}
	.keyword-btn {
		width: 90%;
		input {
			width: 100%;
		}
		input::-ms-input-placeholder{text-align: center;}
		input::-webkit-input-placeholder{text-align: center;}
	}
	.type-btn {
		position: absolute;
		top: 150px;
		right: 50px;
	}
}
</style>
