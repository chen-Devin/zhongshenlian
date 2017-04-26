<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
			<ul class="nav nav-pills nav-justified">
			  <li role="presentation" :class="{ active: isAccounting }" @click="sel_kjs()"><a href="javascript:void(0);">会计所</a></li>
			  <li role="presentation" :class="{ active: isAssessment }" @click="sel_pgs()"><a href="javascript:void(0);">评估所</a></li>
			  <li role="presentation" :class="{ active: isTax }" @click="sel_sws()"><a href="javascript:void(0);">税务所</a></li>
			  <li role="presentation" :class="{ active: isCost }" @click="sel_zjs()"><a href="javascript:void(0);">造价所</a></li>
			</ul>
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
import bidClassification from './component/bidClassification.vue';

export default {
	name: 'bidInfoDraft',
	data() {
		return {
			paths: [
	    		{name: '草稿箱', url: '/bid-info-draft', present: true}
	  		],
	  		isAccounting: true,
	  		isAssessment: false,
	  		isTax: false,
	  		isCost: false,
	  		unfinishedList: []
		}
	},
	methods: {
		sel_kjs() {
			this.isAccounting = true;
			this.isAssessment= false;
	  		this.isTax= false;
	  		this.isCost= false;
	  		this.unfinishedList = [];
			axios({
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			  method: 'get',
			  url: '/service',
			  params: {
			    data: (() => {
			      let obj = {
			        command: 'getBiddingList',
			        platform: 'web',
			        departmentType: 'kjs',
			        type: 'temp'
			      }
			      return JSON.stringify(obj);
			    })()
			  }
			}).then((rep) => {
	    		if (rep.data.statusCode === '10001') {
					this.unfinishedList = rep.data.data.businessArray;
	    		}
	  		}, (rep) => {});
		},
		sel_pgs() {
			this.isAccounting= false;
			this.isAssessment= true;
			this.isTax= false;
			this.isCost= false;
			this.unfinishedList = [];
			axios({
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			  method: 'get',
			  url: '/service',
			  params: {
			    data: (() => {
			      let obj = {
			        command: 'getBiddingList',
			        platform: 'web',
			        departmentType: 'pgs',
			        type: 'temp'
			      }
			      return JSON.stringify(obj);
			    })()
			  }
			}).then((rep) => {
	    		if (rep.data.statusCode === '10001') {
					this.unfinishedList = rep.data.data.businessArray;
	    		}
	  		}, (rep) => {});
		},
		sel_sws() {
			this.isAccounting= false;
			this.isAssessment= false;
			this.isTax= true;
			this.isCost= false;
			this.unfinishedList = [];
			axios({
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			  method: 'get',
			  url: '/service',
			  params: {
			    data: (() => {
			      let obj = {
			        command: 'getBiddingList',
			        platform: 'web',
			        departmentType: 'sws',
			        type: 'temp'
			      }
			      return JSON.stringify(obj);
			    })()
			  }
			}).then((rep) => {
	    		if (rep.data.statusCode === '10001') {
					this.unfinishedList = rep.data.data.businessArray;
	    		}
	  		}, (rep) => {});
		},
		sel_zjs() {
			this.isAccounting= false;
			this.isAssessment= false;
			this.isTax= false;
			this.isCost= true;
			this.unfinishedList = [];
			axios({
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			  method: 'get',
			  url: '/service',
			  params: {
			    data: (() => {
			      let obj = {
			        command: 'getBiddingList',
			        platform: 'web',
			        departmentType: 'zjs',
			        type: 'temp'
			      }
			      return JSON.stringify(obj);
			    })()
			  }
			}).then((rep) => {
	    		if (rep.data.statusCode === '10001') {
					this.unfinishedList = rep.data.data.businessArray;
	    		}
	  		}, (rep) => {});
		}
	},
	created() {
		
	},
	components: {
		crumbs,
		card,
		bidClassification
	}
}
</script>