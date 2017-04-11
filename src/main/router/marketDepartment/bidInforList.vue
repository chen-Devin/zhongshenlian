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
				<input type="checkbox" name="ZhongBiao" >已中标
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
					<tr v-for="project in businessArray">
						<td>{{project.biddingName}}</td>
						<td class="blank"></td>
						<td v-show="project.showTime">{{project.uploadDate}}</td>
						<td v-show="project.showTime">{{project.endDate}}</td>
						<td v-show="project.showBade"></td>
						<td v-show="project.showBade">已中标</td>
						<td v-show="project.showBrand"></td>
						<td v-show="project.showBrand">已摘牌</td>
						<td v-show="project.showOver"></td>
						<td v-show="project.showOver">已过期</td>
						<td v-show="project.showCheck"></td>
						<td v-show="project.showCheck">已审批</td>
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
      		businessArray: [{
				      			id:"0",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-15 23:31:19",
				      			biddingState:"中标状态，1表示中标，0表示未中",
				      			shortlistedState:"入围状态，1表示入围，0表示未入围",
				      			delipotentState:"0", //摘牌
				      			reviewState:"3"
	      					},{
				      			id:"1",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-09 23:31:19",
				      			biddingState:"1",
				      			shortlistedState:"入围状态，1表示入围，0表示未入围",
				      			delipotentState:"1",
				      			reviewState:"1"
	      					},{
				      			id:"2",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-09 23:31:19",
				      			biddingState:"0",
				      			shortlistedState:"入围状态，1表示入围，0表示未入围",
				      			delipotentState:"0",
				      			reviewState:"3"
	      					},{
				      			id:"3",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-15 23:31:19",
				      			biddingState:"中标状态，1表示中标，0表示未中",
				      			shortlistedState:"入围状态，1表示入围，0表示未入围",
				      			delipotentState:"1",
				      			reviewState:"3"
	      					},{
				      			id:"4",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-15 23:31:19",
				      			biddingState:"中标状态，1表示中标，0表示未中",
				      			shortlistedState:"入围状态，1表示入围，0表示未入围",
				      			delipotentState:"1",
				      			reviewState:"0"
	      					}]
    	};
    },
    created() {
      this.getInfo();
      this.judgeDate();
      this.judgeShow();
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
					// this.businessArray = rep.data.data.businessArray;
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
					this.businessArray = rep.data.data.businessArray;
        		}
      		}, (rep) => {});
    	},
    	getNowFormDate () {
    		var date = new Date();
    		var seperator1 = "-";
    		var seperator2 = ":";
    		var month = date.getMonth() + 1;
    		var strDate = date.getDate();
    		if (month>=1&&month<=9) {
    			month = "0" + month;
    		}
    		if (strDate>=1&&strDate<=9) {
    			strDate = "0" + strDate;
    		}
    		var currentDate = date.getFullYear() + seperator1 + month +seperator1 + strDate
    				+ " " + date.getHours() + seperator2 + date.getMinutes()
    				+ seperator2 + date.getSeconds();
    		return currentDate;
    	},
    	handleDate (dateString) {
    		let ymd = dateString.slice(0,10);
    		let ymdArr = ymd.split("-");
    		let year = ymdArr[0];
    		let month = ymdArr[1];
    		let date = ymdArr[2];
    		let ymdObj = {
    			year: year,
    			month: month,
    			date: date
    		};
    		return ymdObj;
    	},
    	judgeDate() {
    		var now = this.getNowFormDate();
    		var nowObj = this.handleDate(now);
    		for (let i = 0; i < this.businessArray.length; i++) {
    			if(this.businessArray[i].delipotentState === "0") {
    				 var endObj =  this.handleDate(this.businessArray[i].endDate);
    				 if (endObj.year < nowObj.year) {
    				 	//过期
    				 	this.businessArray[i].over = '是';
    				 } else if (endObj.year === nowObj.year) {
    				 	if (endObj.month < nowObj.month) {
    				 		this.businessArray[i].over = '是';
    				 	} else {
    				 		if (endObj.date < nowObj.date) {
    				 			this.businessArray[i].over = '是';
    				 		}
    				 	}
    				 }
    			}
    		}
    	},
    	judgeShow() {
    		for (var i = 0; i < this.businessArray.length; i++) {
    			if (this.businessArray[i].biddingState === "1") { //已中标
    				this.businessArray[i].showBade = 1;
    			} else {
    				if(this.businessArray[i].reviewState === "0"||this.businessArray[i].reviewState === "1") { //已审批
    					this.businessArray[i].showCheck = 1;
    				} else {
    					if (this.businessArray[i].delipotentState === "1") { //已摘牌
    						this.businessArray[i].showBrand = 1;
    					} else {
    						if (this.businessArray[i].over === '是') { //已过期
    							this.businessArray[i].showOver = 1;
    						} else {
    							this.businessArray[i].showTime = 1;
    						}
    					}
    				}
    			}	
    		}
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
				width:50%;
			}
		}
	}
}
</style>
