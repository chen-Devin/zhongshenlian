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
						<td>{{ project.biddingName }}</td>
						<td class="ta-r">
							{{ project.updateAt }}
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
.dateMr {
	padding-right: 32px;
}
table {
	tbody {
		tr {
			cursor: pointer;
		}
	}
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
	  		],
	  		isAccounting: true,
	  		isAssessment: false,
	  		isTax: false,
	  		isCost: false,
	  		unfinishedList: [],
	  		office: '会计所'
		}
	},
	methods: {
		sel_kjs() {
			this.isAccounting = true;
			this.isAssessment= false;
	  		this.isTax= false;
	  		this.isCost= false;
	  		this.unfinishedList = [];
	  		this.office = '会计所';
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
			        type: 'temp',
			        updateAt: new Date()
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
			this.office = '评估所';
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
			        type: 'temp',
			        updateAt: new Date()
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
			this.office = '税务所';
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
			        type: 'temp',
			        updateAt: new Date()
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
			this.office = '造价所';
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
			        type: 'temp',
			        updateAt: new Date()
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
		checkMessage(project) {
			this.$router.push('/bid-info-detail/'+project.id+"&"+this.office);
		}
	},
	created() {
		this.sel_kjs();
	},
	components: {
		crumbs,
		card
	}
}
</script>