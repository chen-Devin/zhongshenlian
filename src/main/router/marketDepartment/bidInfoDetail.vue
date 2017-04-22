<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
			<bid-info-check @isEdit="isEdit" v-show="checkShow"></bid-info-check>
			<bid-info-edit :iniProject="project" :office="office" v-show="editShow"></bid-info-edit>
		</card>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidInfoCheck from './component/bidInfoCheck.vue';
import bidInfoEdit from './component/bidInfoEdit.vue';

export default {
    name: 'bidInfoDetail',
    data() {
    	return {
			paths: [
	    		{name: '招投标信息看板', url: '/bid-info-list', present: false},
	    		{name: '招投标详情', url: '/bid-info-detail', present: true}
	  		],
	  		project: {},
	  		iniProject: {},
	  		office: '会计所',
	  		editShow: false,
	  		checkShow: false
    	}
    },
    methods: {
    	getInfo() {
    		axios({
    		  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    		  method: 'get',
    		  url: '/service',
    		  params: {
    		    data: (() => {
    		      let obj = {
    		        command: 'getBiddingInfo',
    		        platform: 'web',
    		        id: this.$route.params.id,
    		        type: this.$route.params.office,
    		      }
    		      return JSON.stringify(obj);
    		    })()
    		  }
    		}).then((rep) => {
        		if (rep.data.statusCode === '10001') {
					this.project = rep.data.data;
					this.iniProject = this.project;
        		}
      		}, (rep) => {});
    	},
    	isEdit() {
    		this.editShow = true;
    		this.checkShow = false;
    	}
    },
    created() {
    	this.getInfo();
    	this.editShow = false;
    	this.checkShow = true;
    },
    components: {
    	crumbs,
    	card,
    	bidInfoCheck,
    	bidInfoEdit
    }
}
</script>

<style lang="sass" scoped>

</style>