<template>
	<div class="main">
	  <crumbs v-bind:paths="paths"></crumbs>
	  <form class="form-inline">
	  <div class="form-group">
	    <label class="sr-only" for="exampleInputEmail3">Email address</label>
	    <input type="email" class="form-control" id="exampleInputEmail3" placeholder="请输入关键字">
	  </div>
	  <button type="submit" class="btn btn-default">搜索</button>
	</form>
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

</style>
