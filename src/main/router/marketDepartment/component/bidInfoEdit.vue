<template>
	<form class="form-horizontal">
	  <div class="form-group">
	    <label for="bidman" class="col-sm-2 control-label">招标人：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="bidman" v-model="project.tenderPersonName" name="tenderPersonName" placeholder="请输入招标人">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="angent" class="col-sm-2 control-label">招标代理机构：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="angent" v-model="project.agency" name="agency" placeholder="请输入招标代理机构">
	    </div>
	  </div>
	  <div class="form-group">
	    <label class="col-sm-2 control-label">招标内容：</label>
	    <div class="col-sm-10">
			<label class="radio-inline">
				<input type="radio" name="biddingContent" v-model="project.biddingContent" id="biddingContent1" value="estimate"> 概算
			</label>
			<label class="radio-inline">
				<input type="radio" name="biddingContent" v-model="project.biddingContent" id="biddingContent2" value="budget"> 预算
			</label>
			<label class="radio-inline">
				<input type="radio" name="biddingContent" v-model="project.biddingContent" id="biddingContent3" value="settlement"> 结算
			</label>
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="concret" class="col-sm-2 control-label">具体内容：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="concret" v-model="project.ConcretContent" name="ConcretContent" placeholder="请输入具体内容">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="fundSource" class="col-sm-2 control-label">资金来源及比例：</label>
	    <div class="col-sm-10">
	    	<label class="radio-inline">
	    		<input type="radio" name="fundSource" v-model="project.fundSource" id="fundSource1" value="finance"> 财政
	    	</label>
	    	<label class="radio-inline">
	    		<input type="radio" name="fundSource" v-model="project.fundSource" id="fundSource2" value="raise"> 自筹
	    	</label>
	    	<label class="radio-inline">
	    		<input type="radio" name="fundSource" v-model="project.fundSource" id="fundSource3" value="loan"> 贷款
	    	</label>
	    	<label class="radio-inline">
	    		<input type="radio" name="fundSource" v-model="project.fundSource" id="fundSource4" value="BT"> BT款等
	    	</label>
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="scale" class="col-sm-2 control-label">建设规模：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="scale" v-model="project.scale" name="scale" placeholder="请输入建设规模">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="location" class="col-sm-2 control-label">建设地点：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="location" v-model="project.location" name="location" placeholder="请输入地点">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="serviceTerm" class="col-sm-2 control-label">服务期限：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="serviceTerm" v-model="project.serviceTerm" name="serviceTerm" placeholder="请输入服务期限">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="investmentConditions" class="col-sm-2 control-label">投资人资质条件、能力：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="investmentConditions" v-model="project.investmentConditions" name="investmentConditions" placeholder="请输入投资人资质条件及能力">
	    </div>
	  </div>
	  <div class="form-group">
	    <div class="col-sm-10 col-sm-offset-2">
	    	<label class="radio-inline">
	    		<input type="radio" name="commonwealth" v-model="project.commonwealth" id="commonwealth1" value="commonwealth"> 联合体
	    	</label>
	    	<label class="radio-inline">
	    		<input type="radio" name="commonwealth" v-model="project.commonwealth" id="commonwealth2" value="noCommonwealth"> 非联合体
	    	</label>
	    </div>
	  </div>
	  <div class="form-group">
		<label for="biddingNumber" class="col-sm-2 control-label">中标单位数量：</label>
    	<div class="col-sm-10">
      		<input type="text" class="form-control" id="biddingNumber" v-model="project.biddingNumber" name="biddingNumber" placeholder="请输入中标单位数量">
    	</div>
	  </div>
	  <div class="form-group">
	    <label for="controlPrice" class="col-sm-2 control-label">招标控制价：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="controlPrice" v-model="project.controlPrice" name="controlPrice" placeholder="请输入招标控制价">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="bidStartTime" class="col-sm-2 control-label">招标报名时间：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="bidStartTime" v-model="project.bidStartTime" name="bidStartTime">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="bidDocumentPrice" class="col-sm-2 control-label">招标文件价格：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="bidDocumentPrice" v-model="project.bidDocumentPrice" name="bidDocumentPrice" placeholder="请输入招标文件价格">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="quotations" class="col-sm-2 control-label">报价方式：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="quotations" v-model="project.quotations" name="quotations" placeholder="请输入报价方式">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="tenderValidityPeriod" class="col-sm-2 control-label">投标有效期：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="tenderValidityPeriod" v-model="project.tenderValidityPeriod" name="tenderValidityPeriod" placeholder="请输入投标有限期">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="bidBond" class="col-sm-2 control-label">投标保证金：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="bidBond" v-model="project.bidBond" name="bidBond" placeholder="请输入投标保证金">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="openBidDate" class="col-sm-2 control-label">开标时间：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="openBidDate" v-model="project.openBidDate" name="openBidDate" placeholder="请输入开标时间">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="openBidPlace" class="col-sm-2 control-label">开标地点：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="openBidPlace" v-model="project.openBidPlace" name="openBidPlace" placeholder="请输入开标地点">
	    </div>
	  </div>
	  <hr>
	  <div class="form-group">
	    <label for="remark" class="col-sm-2 control-label">备注：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="remark" v-model="project.remark" name="remark" placeholder="请输入备注">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="biddingUrl" class="col-sm-2 control-label">原文链接：</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" id="biddingUrl" v-model="project.biddingUrl" name="biddingUrl" placeholder="请输入原文链接">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="ruweitongzhishu" class="col-sm-2 control-label">入围通知书：</label>
	    <!-- <div class="col-sm-10">
	      <input type="file" name="ruweitongzhishu" value="上传">
	    </div> -->
	  </div>
	  <div class="form-group">
	    <div class="col-sm-offset-2 col-sm-10">
	      <button type="submit" class="btn btn-primary">保存</button>
	    </div>
	  </div>
	</form>
</template>

<script>
export default {
	name: 'bidInfoEdit',
	data() {
		return {
			project: this.iniProject
		}
	},
	props: ['iniProject']
};
</script>