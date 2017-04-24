<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
			<bid-classification :office="office"></bid-classification>
			<table class="table table-hover projectList">
				<thead>
					<tr>
						<td>业务</td>
						<td class="ta-r dateMr">最后保存时间</td>
					</tr>
				</thead>
				<tbody>
					<!-- <tr v-for="project in biddingArray" @click="checkMessage(project)">
						<td><span class="state-wrap">{{project.biddingState}}</span>{{project.biddingName}}</td>
						<td class="ta-r">
							{{project.openBidDate}}
						</td>
					</tr> -->
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
import bidClassification from './component/bidClassification.vue';

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
			        command: 'getBusinessUnFinished',
			        platform: 'web'
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
		bidClassification
	}
}
</script>