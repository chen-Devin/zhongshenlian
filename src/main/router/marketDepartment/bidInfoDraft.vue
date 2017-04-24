<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
			<table class="table table-hover projectList">
				<thead>
					<tr>
						<td>业务</td>
						<td class="ta-r dateMr">最后保存时间</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="project in unfinishedList" @click="checkMessage(project)">
						<td><span class="state-wrap">{{project.biddingState}}</span>{{project.biddingName}}</td>
						<td class="ta-r">
							{{project.openBidDate}}
						</td>
					</tr>
				</tbody>
			</table>
		</card>
	</div>
</template>

<style lang="sass" scoped>
.ta-r {
	text-align: right;
}
</style>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';

export default {
	name: 'bidInfoDraft',
	data() {
		return {
			paths: [
	    		{name: '草稿箱', url: '/bid-info-draft', present: true}
	  		]
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
			        command: 'getBiddingList',
			        platform: 'web',
			        departmentType: '',
			        type: 'temp'
			      }
			      return JSON.stringify(obj);
			    })()
			  }
			}).then((rep) => {
	    		if (rep.data.statusCode === '10001') {
					this.unfinishedList = rep.data.data;
	    		}
	  		}, (rep) => {});
		}
	},
	created() {
		this.getInfo();
	},
	components: {
		crumbs,
		card,
	}
}
</script>