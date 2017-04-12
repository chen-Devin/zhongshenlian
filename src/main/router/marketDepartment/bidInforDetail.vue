<template>
	<div class="main">
		<crumbs v-bind:paths="paths"></crumbs>
		<card>
			<form class="form-horizontal">
			  <div class="form-group">
			    <label for="bidman" class="col-sm-2 control-label">招标人：</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="bidman" v-model="tenderPersonName" placeholder="">
			    </div>
			  </div>
			  <div class="form-group">
			    <label for="angent" class="col-sm-2 control-label">招标代理机构：</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="angent" placeholder="">
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">招标内容：</label>
			    <div class="col-sm-10">
					<label class="radio-inline">
						<input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="estimate"> 概算
					</label>
					<label class="radio-inline">
						<input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="budget"> 预算
					</label>
					<label class="radio-inline">
						<input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="settlement"> 结算
					</label>
			    </div>
			  </div>
			  <div class="form-group">
			    <label for="concret" class="col-sm-2 control-label">具体内容：</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="concret" placeholder="">
			    </div>
			  </div>
			  <div class="form-group">
			    <div class="col-sm-offset-2 col-sm-10">
			      <button type="submit" class="btn btn-default">Sign in</button>
			    </div>
			  </div>
			</form>
		</card>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';

export default {
    name: 'bidInforDetail',
    data() {
    	return {
			paths: [
	    		{name: '招投标信息看板', url: '/bid-infor-list-market', present: false},
	    		{name: '招投标详情', url: '/bid-infor-detail', present: true}
	  		],
    	}
    },
    components: {
    	crumbs,
    	card
    }
}
</script>

<style lang="sass" scoped>

</style>