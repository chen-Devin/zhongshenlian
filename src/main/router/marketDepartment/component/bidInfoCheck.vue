<template>
	<form class="form-horizontal">
		<button class="btn btn-primary f-r" @click="isEdit">编辑</button>
		<div class="form-group">
		  <label for="projectName" class="col-sm-2 control-label">项目名称：</label>
		  <div class="col-sm-6">
		  	  {{project.projectName}}
		  </div>
		</div>
		<div class="form-group">
			<label for="tenderPerson" class="col-sm-2 control-label">招标人：</label>
			<div class="col-sm-10">
			  {{ project.tenderPerson }}
			</div>
		</div>
		<div class="form-group">
			<label for="agency" class="col-sm-2 control-label">招标代理机构：</label>
			<div class="col-sm-10">
			  {{ project.agency }}
			</div>
		</div>
		<div class="form-group" v-if="zjsBiddingContent">
			<label class="col-sm-2 control-label">招标内容：</label>
			<div class="col-sm-10">
				{{ project.biddingContent }}
			</div>
		</div>
		<div class="form-group" v-if="kjsBiddingContent">
			<label class="col-sm-2 control-label">招标内容：</label>
			<div class="col-sm-10">
				{{ project.biddingContent }}
			</div>
		</div>
		<div class="form-group" v-if="pgsBiddingContent">
			<label class="col-sm-2 control-label">招标内容：</label>
			<div class="col-sm-10">
				{{ project.biddingContent }}
			</div>
		</div>
		<div class="form-group" v-if="swsBiddingContent"> 
			<label class="col-sm-2 control-label">招标内容：</label>
			<div class="col-sm-10">
				{{ project.biddingContent }}
			</div>
		</div>
	  <!-- <div class="form-group">
	    <label for="concret" class="col-sm-2 control-label">具体内容：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="concret" v-model="project.ConcretContent" name="ConcretContent" placeholder="请输入具体内容">
	    </div>
	  </div> -->
		<div class="form-group" v-if="zjsFundSourceShow">
			<label for="zjsFundSource" class="col-sm-2 control-label">资金来源及比例：</label>
			<div class="col-sm-10">
				{{ project.zjsFundSource }}
			</div>
		</div>
		<div class="form-group" v-if="OwnershipStructure">
			<label for="zjsOwnershipStructure" class="col-sm-2 control-label">股权结构：</label>
			<div class="col-sm-10">
				{{project.zjsOwnershipStructure}}
			</div>
		</div>
		<!--问豆腐-->
		<div class="form-group" v-if="scale">
			<label for="scale" class="col-sm-2 control-label">建设规模：</label>
			<div class="col-sm-10">
				<div class="row">
					<div class="col-sm-4">
						<input type="text" class="form-control" id="scale" v-model="project.zjsArea" name="zjsArea" placeholder="请输入建设面积">
					</div>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="scale" v-model="project.zjsLength" name="zjsLength" placeholder="请输入长度">
					</div>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="scale" v-model="project.totalAssets" name="totalAssets" placeholder="请输入总投资额">
					</div>
				</div>
			</div>
		</div>
		<div class="form-group" v-if="scale">
			<label for="location" class="col-sm-2 control-label">建设地点：</label>
			<div class="col-sm-10">
			    {{ project.location }}
			</div>
		</div>
		<div class="form-group" v-if="scale">
			<label for="serviceTerm" class="col-sm-2 control-label">服务期限：</label>
			<div class="col-sm-10">
			  {{ project.serviceTerm }}
			</div>
		</div>
		<div class="form-group" v-if="scaleOther">
			<label for="totalAssets" class="col-sm-2 control-label">资产总额：</label>
			<div class="col-sm-10">
			    {{ project.totalAssets }}
			</div>
		</div>
		<div class="form-group" v-if="scaleOther">
			<label for="location" class="col-sm-2 control-label">坐落地点：</label>
			<div class="col-sm-10">
			    {{ project.location }}
			</div>
		</div>
		<div class="form-group" v-if="scaleOther">
			<label for="serviceTerm" class="col-sm-2 control-label">审计期限：</label>
			<div class="col-sm-10">
			    {{ project.serviceTerm }}
			</div>
		</div>
		<div class="form-group">
			<label for="investmentConditions" class="col-sm-2 control-label">投资人资质条件、能力：</label>
			<div class="col-sm-10">
			    {{ project.investmentConditions }}
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-10 col-sm-offset-2">
				{{ project.commonwealth }}
			</div>
		</div>
		<div class="form-group">
			<label for="biddingNumber" class="col-sm-2 control-label">中标单位数量：</label>
			<div class="col-sm-10">
				{{ project.biddingNumber }}
			</div>
		</div>
		<div class="form-group">
			<label for="controlPrice" class="col-sm-2 control-label">招标控制价：</label>
			<div class="col-sm-10">
			    {{ project.controlPrice }}
			</div>
		</div>
		<div class="form-group">
			<label for="bidStartTime" class="col-sm-2 control-label">招标报名时间：</label>
			<div class="col-sm-10">
			    {{ project.bidStartTime }}
			</div>
		</div>
		<div class="form-group">
			<label for="bidDocumentPrice" class="col-sm-2 control-label">招标文件价格：</label>
			<div class="col-sm-10">
			    {{project.bidDocumentPrice}}
			</div>
		</div>
		<div class="form-group">
			<label for="quotations" class="col-sm-2 control-label">报价方式：</label>
			<div class="col-sm-10">
			    {{ project.quotations }}
			</div>
		</div>
		<div class="form-group">
			<label for="tenderValidityPeriod" class="col-sm-2 control-label">投标有效期：</label>
			<div class="col-sm-10">
			    {{ project.tenderValidityPeriod }}
			</div>
		</div>
		<div class="form-group">
			<label for="bidBond" class="col-sm-2 control-label">投标保证金：</label>
			<div class="col-sm-10">
			    {{ project.bidBond }}
			</div>
		</div>
		<!--标书费-->
		<div class="form-group">
			<label for="tenderFee" class="col-sm-2 control-label">标书费：</label>
			<div class="col-sm-10">
			    {{ project.tenderFee }}
			</div>
		</div>
		<!--中标服务费-->
		<div class="form-group">
			<label for="winningServiceFee" class="col-sm-2 control-label">中标服务费：</label>
			<div class="col-sm-10">
			    {{ project.winningServiceFee }}
			</div>
		</div>
		<div class="form-group">
			<label for="openBidDate" class="col-sm-2 control-label">开标时间：</label>
			<div class="col-sm-10">
			    {{ project.openBidDate }}
			</div>
		</div>
		<div class="form-group">
			<label for="openBidPlace" class="col-sm-2 control-label">开标地点：</label>
			<div class="col-sm-10">
			    {{ project.openBidPlace }}
			</div>
		</div>
		<hr>
		<!--备注-->
		<div class="form-group">
			<label for="remark" class="col-sm-2 control-label">备注：</label>
			<div class="col-sm-10">
			  <input type="text" class="form-control" id="remark" v-model="project.remark" name="remark" placeholder="请输入备注">
			</div>
		</div>
	  <!-- <div class="form-group">
	    <label for="biddingUrl" class="col-sm-2 control-label">原文链接：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="biddingUrl" v-model="project.biddingUrl" name="biddingUrl" placeholder="请输入原文链接">
	    </div>
	  </div> -->
	  <!-- <div class="form-group">
	    <label for="ruweitongzhishu" class="col-sm-2 control-label">入围通知书：</label>
	    <div class="col-sm-10">
	      <input type="file" name="ruweitongzhishu" value="上传">
	    </div>
	  </div> -->
	</form>
</template>

<style lang="sass" scoped>
	.control-label {
		padding-top: 1px;
	}
	.f-r {
		float: right;
	}
</style>

<script>
import axios from 'axios';

export default {
    name: 'bidInfoCheck',
    data() {
    	return {
			project: this.iniProject,
			office: ''
    	}
    },
    props: ['id'],
    computed: {
    	zjsBiddingContent() {
    		if (this.office === "zjs") {
    			return true;
    		} else {
    			return false;
    		}
    	},
    	zjsFundSourceShow() {
    		if (this.office === "zjs") {
    			return true;
    		} else {
    			return false;
    		}
    	},
    	kjsBiddingContent() {
    		if (this.office === "kjs") {
    			return true;
    		} else {
    			return false;
    		}
    	},
    	pgsBiddingContent() {
    		if (this.office === "pgs") {
    			return true;
    		} else {
    			return false;
    		}
    	},
    	swsBiddingContent() {
    		if (this.office === "sws") {
    			return true;
    		} else {
    			return false;
    		}
    	},
    	OwnershipStructure() {
    		if (this.office === "zjs") {
    			return false;
    		} 
    		if (this.office === "kjs") {
    			return true;
    		} 
    		if (this.office === "pgs") {
    			return true;
    		} 
    		if (this.office === "sws") {
    			return true;
    		} 
    	},
    	scale() {
    		if (this.office === "zjs") {
    			return true;
    		}
    	},
    	scaleOther() {
    		if (this.office !== "zjs") {
    			return true;
    		}
    	}
    	
    },
    methods: {
    	isEdit() {
    		this.$emit('isEdit');
    	},
    	getInfo() {
    		axios({
    		  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    		  method: 'get',
    		  url: '/service',
    		  params: {
    		    data: (() => {
    		      let obj = {
    		        command: 'getBiddingInfo',
    		        platform: 'web',
    		        id: this.$route.params.id,
    		        type: this.$route.params.office,
    		      }
    		      return JSON.stringify(obj);
    		    })()
    		  }
    		}).then((rep) => {
        		if (rep.data.statusCode === '10001') {
					this.project = rep.data.data;
					this.iniProject = this.project;
        		}
      		}, (rep) => {});
    	},
    	isEdit() {
    		this.editShow = true;
    		this.checkShow = false;
    	}
    },
    
    created() {
    	this.id = this.$route.params.id;
    	this.office = this.$route.params.office;
    	this.getInfo();
    },
    components: {

    }
}
</script>