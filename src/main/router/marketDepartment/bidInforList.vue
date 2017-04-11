<template>
	<div class="main">
		<crumbs v-bind:paths="paths"></crumbs>
		<card>
			<form class="form-inline">
				<div class="row">
					<div class="form-group keyword-btn col-md-11">
		    			<input type="text" class="form-control" placeholder="请输入关键字" v-model.trim="searchContent">
		    			<p>{{searchContent}}</p>
		  			</div>
		  			<button type="submit" class="btn btn-primary" @click="search()">搜索</button>
				</div>
				
	  			
			</form>
			<p class="bid-time">招标时间</p>
			<input type="date" v-model="bidStartDate">
			<input type="date" name="" v-model="bidEndDate">
			<p>
				<input type="checkbox" name="ZhongBiao">已中标
				<input type="checkbox" name="RuWei">已入围
				<input type="checkbox" name="ZhaiPai">已摘牌
				<input type="checkbox" name="weiZhaiPai">未摘牌
			</p>
			<button class="btn btn-primary type-btn">录入</button>
			<table class="table table-hover projectList">
				<thead>
					<tr>
						<td>项目名称</td>
						<td class="blank"></td>
						<td>上传日期</td>
						<td>截止日期</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="project in biddingArray">
						<td>{{project.biddingName}}</td>
						<td class="blank"></td>
						<td>{{project.uploadDate}}</td>
						<td>{{project.endDate}}</td>
					</tr>
				</tbody>
			</table>	
		</card>
	</div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';

export default {
    name: 'bidInforListMarket',
    data() {
    	return {
    		paths: [
        		{name: '招投标信息看板', url: '/customer-infor-list-leader', present: true}
      		],
      		searchContent: '',
      		bidStartDate: '',
      		bidEndDate: '',
      		biddingArray: [{id:"信息id",biddingName:"标名",uploadDate:"上传时间",endDate:"截止时间",biddingState:"中标状态，1表示中标，0表示未中",shortlistedState:"入围状态，1表示入围，0表示未入围"},
      			{id:"信息id",biddingName:"标名",uploadDate:"上传时间",endDate:"截止时间",biddingState:"中标状态，1表示中标，0表示未中",shortlistedState:"入围状态，1表示入围，0表示未入围"},
      			{id:"信息id",biddingName:"标名",uploadDate:"上传时间",endDate:"截止时间",biddingState:"中标状态，1表示中标，0表示未中",shortlistedState:"入围状态，1表示入围，0表示未入围"}
      			]
    	};
    },
    created() {
      this.getInfo();
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
    		        platform: 'web'
    		      }
    		      return JSON.stringify(obj);
    		    })()
    		  }
    		}).then((rep) => {
        		if (rep.data.statusCode === '10001') {
					this.biddingArray = rep.data.data.biddingArray;
        		}
      		}, (rep) => {});
    	},
    	search() {
    		axios({
    		  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    		  method: 'get',
    		  url: '/service',
    		  params: {
    		    data: (() => {
    		      let obj = {
    		        command: 'searchBiddingList',
    		        platform: 'web',
    		        searchContent: this.searchContent,
    		        bidStartDate: this.bidStartDate,
    		        bidEndDate: this.bidEndDate
    		      }
    		      return JSON.stringify(obj);
    		    })()
    		  }
    		}).then((rep) => {
        		if (rep.data.statusCode === '10001') {
					this.biddingArray = rep.data.data.biddingArray;
        		}
      		}, (rep) => {});
    	}
    },
    components: {
    	crumbs,
    	card
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
		input {
			width: 100%;
		}
		input::-ms-input-placeholder{text-align: center;}
		input::-webkit-input-placeholder{text-align: center;}
	}
	.type-btn {
		position: absolute;
		top: 90px;
		right: 30px;
	}
	.projectList {
		background-color: #eee;
		width: 95%;
		tr {
			td {
				text-align: center;
			}
			.blank {
				width:60%;
			}
		}
	}
}
</style>
