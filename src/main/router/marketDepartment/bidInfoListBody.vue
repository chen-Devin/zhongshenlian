<template>
	<div>
		<form class="form-inline">
			<div class="row">
				<div class="form-group col-xs-6">	
					<label for="bidMan" class="bidMan">招标人</label>
					<input type="text" class="form-control bidMan-input" placeholder="请输入招标人" v-model.trim="tenderPerson" id="bidMan">	
	  			</div>
				<div class="form-group col-xs-6">
					<label for="bidAgency">招标代理机构</label>
	    			<input type="text" class="form-control angency-input" placeholder="请输入招标代理机构" v-model.trim="agency" id="bidAgency">
	  			</div>
			</div>
  			<div class="row">
				<div class="form-group col-xs-12">
					<label for="projectName">项目名称</label>
	    			<input type="text" class="form-control name-input" placeholder="请输入项目名称" v-model.trim="projectName" id="projectName">
	  			</div>
  			</div>
  			<div class="row">
				<div class="form-group col-xs-12">
					<label>招标时间</label>
					<input type="date" class="form-control" v-model="bidStartDate">
					<input type="date" class="form-control" v-model="bidEndDate">
					<button class="btn btn-default f-r left-move" @click="clear()">清除搜索条件</button>
					<button type="submit" class="btn btn-primary f-r" @click="search()">搜索</button>
	  			</div>
  			</div>
		</form>
		<div class="row">
			<p class="col-xs-12 check-wrap">
				<label class="radio-inline">
				  <input type="radio" name="filterState" id="inlineradio1" value="已中标" v-model="filterState"> 已中标
				</label>
				<label class="radio-inline">
				  <input type="radio" name="filterState" id="inlineradio2" value="已入围" v-model="filterState"> 已入围
				</label>
				<label class="radio-inline">
				  <input type="radio" name="filterState" id="inlineradio3" value="已摘牌" v-model="filterState"> 已摘牌
				</label>
				<label class="radio-inline">
				  <input type="radio" name="filterState" id="inlineradio3" value="未摘牌" v-model="filterState"> 未摘牌
				</label>
				<button class="btn btn-primary type-btn f-r" @click="input()">录入</button>
			</p>
		</div>
		<table class="table table-hover projectList">
			<thead>
				<tr>
					<td>项目名称</td>
					<td class="ta-r dateMr">开标时间</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="project in biddingArray" @click="checkMessage(project)">
					<td><span class="state-wrap">{{project.biddingState}}</span>{{project.biddingName}}</td>
					<td class="ta-r">
						{{project.openBidDate}}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
	name: 'bidInfoListBody',
	data() {
		return {
			bidStartDate: (() => {
				let dt = new Date();
				let year = dt.getFullYear();
				let month = dt.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				let date = dt.getDate();
				if (date < 10) {
					date = "0" + date;
				}
				let dateStr = year + "-" + month + "-" + date;
			  return dateStr;
			})(),
			bidEndDate: (() => {
				let dt = new Date();
				let year = dt.getFullYear();
				let month = dt.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				let date = dt.getDate();
				if (date < 10) {
					date = "0" + date;
				}
				let dateStr = year + "-" + month + "-" + date;
			  return dateStr;
			})(),
			weiZhaiPai: [],
			yiZhaiPai: [],
			yiZhongBiao: [],
			yiRuWei: [],
			filterState: '',
			departmentType: '',
			tenderPerson: '',
			agency: '',
			projectName: '',
			bidStartTime: '',
			bidEndTime: ''
		};
	},
	computed: {
		biddingArray() {
			this.bidArrayConnect = this.bidArray;
			for (var i = 0; i < this.bidArrayConnect.length; i++) {
				if(this.bidArrayConnect[i].biddingState === "0") {
					this.bidArrayConnect[i].biddingState = '未摘牌';
					this.weiZhaiPai.push(this.bidArrayConnect[i]);
				}
				if(this.bidArrayConnect[i].biddingState === "1") {
					this.bidArrayConnect[i].biddingState = '已摘牌';
					this.yiZhaiPai.push(this.bidArrayConnect[i]);
				}
				if(this.bidArrayConnect[i].biddingState === "2") {
					this.bidArrayConnect[i].biddingState = '已入围';
					this.yiRuWei.push(this.bidArrayConnect[i]);
				}
				if(this.bidArrayConnect[i].biddingState === "3") {
					this.bidArrayConnect[i].biddingState = '已中标';
					this.yiZhongBiao.push(this.bidArrayConnect[i]);
				}
				if(this.bidArrayConnect[i].biddingState === "4") {
					this.bidArrayConnect[i].biddingState = '已过期';
				}
				if (this.bidArrayConnect[i].reviewState === "1") {
					this.bidArrayConnect[i].reviewState = "通过";
				}
				if (this.bidArrayConnect[i].reviewState === "0") {
					this.bidArrayConnect[i].reviewState = "不通过";
				}
			}
			if (this.filterState === "未摘牌") {
				this.bidArrayConnect = this.weiZhaiPai;
			}
			if (this.filterState === "已摘牌") {
				this.bidArrayConnect = this.yiZhaiPai;
			}
			if (this.filterState === "已中标") {
				this.bidArrayConnect = this.yiZhongBiao;
			}
			if (this.filterState === "已入围") {
				this.bidArrayConnect = this.yiRuWei;
			}
			return this.bidArrayConnect;
		},
		departmentType() {

		}
	},
	props: {
		office: {
			default: ""
		},
		bidArray: {
			default: []
		}
	},
	methods: {
		input() {
			this.$emit('input');
		},
		checkMessage(project) {
			this.$emit('checkMessage',project);
		},
    	search() { //搜索
    		this.officeTransformation();
    		this.bidStartTime = this.bidStartDate + " 00:00:00";
    		this.bidEndTime = this.bidEndDate + " 00:00:00";
    		axios({
    		  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    		  method: 'get',
    		  url: '/service',
    		  params: {
    		    data: (() => {
    		      let obj = {
    		        command: 'searchBiddingList',
    		        platform: 'web',
    		        bidStartDate: this.bidStartTime,
    		        bidEndDate: this.bidEndTime,
    		        tenderPerson: this.tenderPerson,
    		        agency: this.agency,
    		        projectName: this.projectName,
    		        type: this.departmentType
    		      }
    		      return JSON.stringify(obj);
    		    })()
    		  }
    		}).then((rep) => {
        		if (rep.data.statusCode === '10001') {
					this.businessArray = rep.data.data.businessArray;
					this.bidArray = this.businessArray;
					console.log(this.bidArray);
        		}
      		}, (rep) => {});
    	},
		clear() {
			this.bidMan = '';
			this.bidAgency = '';
			this.projectName = '';
			this.bidStartDate = (() => {
				let dt = new Date();
				let year = dt.getFullYear();
				let month = dt.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				let date = dt.getDate();
				if (date < 10) {
					date = "0" + date;
				}
				let dateStr = year + "-" + month + "-" + date;
			  return dateStr;
			})();
			this.bidEndDate = (() => {
				let dt = new Date();
				let year = dt.getFullYear();
				let month = dt.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				let date = dt.getDate();
				if (date < 10) {
					date = "0" + date;
				}
				let dateStr = year + "-" + month + "-" + date;
			  return dateStr;
			})();
		},
		officeTransformation() {
			if (this.office === "会计所") {
				this.departmentType = 'kjs';
			}
			if (this.office === "评估所") {
				this.departmentType = 'pgs';
			}
			if (this.office === "税务所") {
				this.departmentType = 'sws';
			}
			if (this.office === "造价所") {
				this.departmentType = 'zjs';
			}
		}
	},
	components: {
		axios,
		qs
	},
	created() {
		this.$store.dispatch('fetchUserInfo')
		console.log(this.$store)
	}
}
</script>

<style lang="sass" scoped>
.f-r {
	float: right;
}
.ta-r {
	text-align: right;
}
.dateMr {
	padding-right: 18px;
}
.form-inline {
	.form-group {
		margin: 10px 0;
		label {
			margin-right: 5px;
		}
		.bidMan {
			margin-right: 18px;
		}
	}
}
.check-wrap {
	margin: 0;
	margin-top: 5px;
	margin-bottom: 5px;
	label {
		margin-top: 7px;
	}
}
.state-wrap {
	display: inline-block;
	background-color: #fff;
	border: 1px solid #000;
	margin-right: 5px;
	padding: 1px 3px;
	font-size: 11px;
}
table {
	tbody {
		tr {
			cursor: pointer;
		}
	}
}
.bidMan-input {
	width: 330px;
}
.angency-input {
	width: 330px;
}
.name-input {
	width: 815px;
}
.left-move {
	margin-left: 10px;
}
</style>