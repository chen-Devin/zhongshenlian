<template>
	<div>
		<form class="form-inline">
			<div class="row">
				<div class="form-group col-xs-6">
					<label for="bidMan" class="bidMan">招标人</label>
	    			<input type="text" class="form-control" placeholder="请输入招标人" v-model.trim="bidMan" id="bidMan">
	  			</div>
				<div class="form-group col-xs-6">
					<label for="bidAgency">招标代理机构</label>
	    			<input type="text" class="form-control" placeholder="请输入招标代理机构" v-model.trim="bidAgency" id="bidAgency">
	  			</div>
			</div>
  			<div class="row">
				<div class="form-group col-xs-12">
					<label for="projectName">项目名称</label>
	    			<input type="text" class="form-control" placeholder="请输入项目名称" v-model.trim="projectName" id="projectName">
	  			</div>
  			</div>
  			<div class="row">
				<div class="form-group col-xs-12">
					<label>招标时间</label>
					<input type="date" class="form-control" v-model="bidStartDate">
					<input type="date" class="form-control" v-model="bidEndDate">
					<button class="btn btn-default f-r" @click="clear()">清除搜索条件</button>
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
export default {
	name: 'bidInfoListBody',
	data() {
		return {
			state: '',
			bidMan: '',
			bidAgency: '',
			projectName: '',
			bidStartDate: new Date(),
			bidEndDate: new Date(),
			weiZhaiPai: [],
			yiZhaiPai: [],
			yiZhongBiao: [],
			yiRuWei: [],
			filterState: ''
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
		getOffice() {
			
		},
		input() {
			this.$emit('input');
		},
		checkMessage(project) {
			this.$emit('checkMessage',project);
		},
		clear() {
			this.bidMan = '';
			this.bidAgency = '';
			this.projectName = '';
			this.bidStartDate = new Date();
			this.bidEndDate = new Date();
		}
	},
	created() {
		this.getOffice();
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
	padding-right: 45px;
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
</style>