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
			<my-pagination :iniTotalPage="totalPage" @currentChange="currentChange"></my-pagination>
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
import myPagination from '../../component/pagination.vue';

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
	  		office: '会计所',
	  		pageNum: 1,
        totalPage: ''
		}
	},
	methods: {
		getList() {
			axios({
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			  method: 'get',
			  url: '/service',
			  params: {
			    data: (() => {
			      let obj = {
			        command: 'getBiddingList',
			        platform: 'web',
			        type: 'temp',
			        pageNum: this.pageNum
			      }
			      return JSON.stringify(obj);
			    })()
			  }
			}).then((rep) => {
	    		if (rep.data.statusCode === '10001') {
					this.unfinishedList = rep.data.data.businessArray;
          this.totalPage = parseInt(rep.data.data.pageNum);
	    		}
	  		}, (rep) => {});
		},
		currentChange(val) {
			this.pageNum = val;
			this.getList();
		},
		checkMessage(project) {
			this.$router.push('/bid-info-detail/'+project.id+"&isDraft");
		}
	},
	created() {
		this.getList();
	},
	components: {
		crumbs,
		card,
		myPagination
	}
}
</script>
