<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
      <h3 class="main-title">草稿箱</h3>
      <div class="com-list list-group">
        <li class="list-group-item list-head">
          <span class="title">信息详情</span>
          <span class="date pull-right">最后保存时间</span>
        </li>
        <a class="list-group-item" @click="checkMessage(project)" v-for="project in unfinishedList">
          <span class="project-name">{{project.biddingName}}</span>
          <span class="date pull-right">{{ project.updateAt }}</span>
        </a>
      </div>
			<my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
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
.com-list {
  a {
    cursor: pointer;
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
        totalNum: 1,
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
          this.totalPage = rep.data.data.pageNum;
          this.totalNum = rep.data.data.totalNum;
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
