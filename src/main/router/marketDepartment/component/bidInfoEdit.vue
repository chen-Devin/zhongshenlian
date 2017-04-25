<template>
	<div>
		<div class="page-header">
			<h4>
				{{ office }}招投标信息录入
			</h4>
		</div>
		
		<form class="form-horizontal">
			<div class="form-group">
			  <label for="projectName" class="col-sm-2 control-label">项目名称：</label>
			  <div class="col-sm-10">
			    <input type="text" class="form-control" id="projectName" v-model="project.projectName" name="projectName" placeholder="请输入项目名称">
			  </div>
			</div>
			<div class="form-group">
				<label for="tenderPerson" class="col-sm-2 control-label">招标人：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="tenderPerson" v-model="project.tenderPerson" name="tenderPerson" placeholder="请输入招标人">
				</div>
			</div>
			<div class="form-group">
				<label for="agency" class="col-sm-2 control-label">招标代理机构：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="agency" v-model="project.agency" name="agency" placeholder="请输入招标代理机构">
				</div>
			</div>
			<div class="form-group" v-if="zjsBiddingContent">
				<label class="col-sm-2 control-label">招标内容：</label>
				<div class="col-sm-10">
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent1" value="概算"> 概算
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent2" value="预算"> 预算
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent3" value="结算"> 结算
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent4" value="全过程造价控制"> 全过程造价控制
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent5" value="入围"> 入围
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent6" value="一审"> 一审
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent7" value="二审"> 二审
					</label>
					<div class="checkbox">
					  <label for="other">
					    <input type="checkbox" name="biddingContent" v-model="project.biddingContent" value="其他">
					    其他：
					  </label>
					  <input type="text" v-model="project.biddingContent" id="other" class="form-control" placeholder="限15字">
					</div>
				</div>
			</div>
			<div class="form-group" v-if="kjsBiddingContent">
				<label class="col-sm-2 control-label">招标内容：</label>
				<div class="col-sm-10">
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent1" value="年审"> 年审
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent2" value="专项"> 专项
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent3" value="咨询"> 咨询
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent4" value="决算"> 决算
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent5" value="外汇年检"> 外汇年检
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent6" value="验资"> 验资
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent7" value="外资审计"> 外资审计
					</label>
				</div>
			</div>
			<div class="form-group" v-if="pgsBiddingContent">
				<label class="col-sm-2 control-label">招标内容：</label>
				<div class="col-sm-10">
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent1" value="股改"> 股改
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent2" value="专项"> 专项
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent3" value="咨询"> 咨询
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent4" value="清产核资"> 清产核资
					</label>
				</div>
			</div>
			<div class="form-group" v-if="swsBiddingContent"> 
				<label class="col-sm-2 control-label">招标内容：</label>
				<div class="col-sm-10">
					<label class="checkbox-inline">
						<input type="checkbox" name="biddingContent" v-model="project.biddingContent" id="biddingContent1" value="税鉴"> 税鉴
					</label>
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
					<label class="checkbox-inline">
						<input type="checkbox" name="zjsFundSource" v-model="project.zjsFundSource" id="zjsFundSource1" value="财政"> 财政
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="zjsFundSource" v-model="project.zjsFundSource" id="zjsFundSource2" value="自筹"> 自筹
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="zjsFundSource" v-model="project.zjsFundSource" id="zjsFundSource3" value="贷款"> 贷款
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="zjsFundSource" v-model="project.zjsFundSource" id="zjsFundSource4" value="BT等"> BT等
					</label>
				</div>
			</div>
			<div class="form-group" v-if="OwnershipStructure">
				<label for="zjsOwnershipStructure" class="col-sm-2 control-label">股权结构：</label>
				<div class="col-sm-10">
					<label class="radio-inline">
						<input type="radio" name="zjsOwnershipStructure" v-model="project.zjsOwnershipStructure" id="zjsOwnershipStructure1" value="国有"> 国有
					</label>
					<label class="radio-inline">
						<input type="radio" name="zjsOwnershipStructure" v-model="project.zjsOwnershipStructure" id="zjsOwnershipStructure2" value="民营"> 民营
					</label>
					<label class="radio-inline">
						<input type="radio" name="zjsOwnershipStructure" v-model="project.zjsOwnershipStructure" id="zjsOwnershipStructure3" value="外资"> 外资
					</label>
					<label class="radio-inline">
						<input type="radio" name="zjsOwnershipStructure" v-model="project.zjsOwnershipStructure" id="zjsOwnershipStructure4" value="混合"> 混合
					</label>
				</div>
			</div>
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
				  <input type="text" class="form-control" id="location" v-model="project.location" name="location" placeholder="请输入建设地点">
				</div>
			</div>
			<div class="form-group" v-if="scale">
				<label for="serviceTerm" class="col-sm-2 control-label">服务期限：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="serviceTerm" v-model="project.serviceTerm" name="serviceTerm" placeholder="请输入服务期限">
				</div>
			</div>
			<div class="form-group" v-if="scaleOther">
				<label for="totalAssets" class="col-sm-2 control-label">资产总额：</label>
				<div class="col-sm-10">
					<div class="input-group">
						<input type="text" class="form-control" id="totalAssets" v-model="project.totalAssets" name="totalAssets" placeholder="请输入资产总额">
						<div class="input-group-addon">万元</div>
					</div> 
				</div>
			</div>
			<div class="form-group" v-if="scaleOther">
				<label for="location" class="col-sm-2 control-label">坐落地点：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="location" v-model="project.location" name="location" placeholder="请输入坐落地点">
				</div>
			</div>
			<div class="form-group" v-if="scaleOther">
				<label for="serviceTerm" class="col-sm-2 control-label">审计期限：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="serviceTerm" v-model="project.serviceTerm" name="serviceTerm" placeholder="请输入审计期限">
				</div>
			</div>
			<div class="form-group">
				<label for="investmentConditions" class="col-sm-2 control-label">投资人资质条件、能力：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="investmentConditions" v-model="project.investmentConditions" name="investmentConditions" placeholder="请输入投资人资质条件及能力">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">合同体制：</label>
				<div class="col-sm-10">
					<label class="radio-inline" @click="isCommonwealth()">
						<input type="radio" name="commonwealth" v-model="project.contractType.type" value="联合体"> 联合体
					</label>
					<label class="radio-inline" @click="notCommonwealth()">
						<input type="radio" name="commonwealth" v-model="project.contractType.type" value="非联合体"> 非联合体
					</label>
				</div>
			</div>
			<div v-show="commonwealthShow">
				<div class="form-group">
					<label class="col-sm-2 control-label">基本取费：</label>
					<div class="col-sm-10">
						<div class="row">
							<div class="col-sm-5">
								<div class="input-group">
									<div class="input-group-addon">主办方</div>
									<input type="text" class="form-control" v-model="project.contractType.mainBasicName" placeholder="请输入主办方">
								</div>
							</div>
							<div class="col-sm-1"></div>
							<div class="col-sm-5">
								<div class="input-group">
									<div class="input-group-addon">比例</div>
									<input type="text" class="form-control" v-model="project.contractType.mainBasicRate">
									<div class="input-group-addon">%</div>
								</div>
							</div>
							<div class="col-sm-1">
								
							</div>
						</div>
					</div>
				</div>
				<div class="form-group" v-for="(item, index) in project.contractType.subBasicArray">
					<label class="col-sm-2 control-label"></label>
					<div class="col-sm-10">
						<div class="row">
							<div class="col-sm-5">
								<div class="input-group">
									<div class="input-group-addon">协办方</div>
									<input type="text" class="form-control" v-model="item.name" placeholder="请输入协办方">
								</div>
							</div>
							<div class="col-sm-1"></div>
							<div class="col-sm-5">
								<div class="input-group">
									<div class="input-group-addon">比例</div>
									<input type="text" class="form-control" v-model="item.rate">
									<div class="input-group-addon">%</div>
								</div>
							</div>
							<div class="col-sm-1">
								<h4>
									<a class="fa fa-times-circle text-danger" @click="delBasicFee(index)"></a>
								</h4>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label"></label>
					<div class="col-sm-10">
						<div class="row">
							<h4 class="col-sm-1 col-sm-offset-11">
								<a class="fa fa-plus-circle text-danger" @click="addBasicFee()"></a>
							</h4>
						</div>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-2 control-label">效益取费：</label>
					<div class="col-sm-10">
						<div class="row">
							<div class="col-sm-5">
								<div class="input-group">
									<div class="input-group-addon">主办方</div>
									<input type="text" class="form-control" v-model="project.contractType.mainEfficiencyName" placeholder="请输入主办方">
								</div>
							</div>
							<div class="col-sm-1"></div>
							<div class="col-sm-5">
								<div class="input-group">
									<div class="input-group-addon">比例</div>
									<input type="text" class="form-control" v-model="project.contractType.mainEfficiencyRate">
									<div class="input-group-addon">%</div>
								</div>
							</div>
							<div class="col-sm-1">
								
							</div>
						</div>
					</div>
				</div>
				<div class="form-group" v-for="(item, index) in project.contractType.subEfficiencyArray">
					<label class="col-sm-2 control-label"></label>
					<div class="col-sm-10">
						<div class="row">
							<div class="col-sm-5">
								<div class="input-group">
									<div class="input-group-addon">协办方</div>
									<input type="text" class="form-control" v-model="item.name" placeholder="请输入协办方">
								</div>
							</div>
							<div class="col-sm-1"></div>
							<div class="col-sm-5">
								<div class="input-group">
									<div class="input-group-addon">比例</div>
									<input type="text" class="form-control" v-model="item.rate">
									<div class="input-group-addon">%</div>
								</div>
							</div>
							<div class="col-sm-1">
								<h4>
									<a class="fa fa-times-circle text-danger" @click="delEfficiencyFee(index)"></a>
								</h4>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label"></label>
					<div class="col-sm-10">
						<div class="row">
							<h4 class="col-sm-1 col-sm-offset-11">
								<a class="fa fa-plus-circle text-danger" @click="addEfficiencyFee()"></a>
							</h4>
						</div>
					</div>
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
					<div class="input-group">
						<input type="text" class="form-control" id="controlPrice" v-model="project.controlPrice" name="controlPrice" placeholder="请输入招标控制价">
						<div class="input-group-addon">万元</div>
					</div>
				  
				</div>
			</div>
			<div class="form-group">
				<label for="bidStartTime" class="col-sm-2 control-label">招标报名时间：</label>
				<div class="col-sm-10">
				  <input type="date" class="form-control" id="bidStartTime" v-model="project.bidStartTime" name="bidStartTime">
				</div>
			</div>
			<div class="form-group">
				<label for="bidDocumentPrice" class="col-sm-2 control-label">招标文件价格：</label>
				<div class="col-sm-10">
					<div class="input-group">
						<input type="text" class="form-control" id="bidDocumentPrice" v-model="project.bidDocumentPrice" name="bidDocumentPrice" placeholder="请输入招标文件价格">
						<div class="input-group-addon">万元</div>
					</div>
				  
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
					<div class="input-group">
						<input type="text" class="form-control" id="bidBond" v-model="project.bidBond" name="bidBond" placeholder="请输入投标保证金">
						<div class="input-group-addon">万元</div>
					</div>
				</div>
			</div>
			<!--标书费-->
			<div class="form-group">
				<label for="tenderFee" class="col-sm-2 control-label">标书费：</label>
				<div class="col-sm-10">
					<div class="input-group">
						<input type="text" class="form-control" id="tenderFee" v-model="project.tenderFee" name="tenderFee" placeholder="请输入标书费">
						<div class="input-group-addon">万元</div>
					</div>	
				</div>
			</div>
			<!--中标服务费-->
			<div class="form-group">
				<label for="winningServiceFee" class="col-sm-2 control-label">中标服务费：</label>
				<div class="col-sm-10">
					<div class="input-group">
						<input type="text" class="form-control" id="winningServiceFee" v-model="project.winningServiceFee" name="winningServiceFee" placeholder="请输入中标服务费">
						<div class="input-group-addon">万元</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="openBidDate" class="col-sm-2 control-label">开标时间：</label>
				<div class="col-sm-10">
				  <input type="date" class="form-control" id="openBidDate" v-model="project.openBidDate" name="openBidDate" placeholder="请输入开标时间">
				</div>
			</div>
			<div class="form-group">
				<label for="openBidPlace" class="col-sm-2 control-label">开标地点：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="openBidPlace" v-model="project.openBidPlace" name="openBidPlace" placeholder="请输入开标地点">
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
		  <div class="form-group">
		    <div class="col-sm-offset-2 col-sm-10">
		      <button type="button" class="btn btn-primary" @click="submit(project)">提交</button>
		      <button type="button" class="btn btn-default" @click="saveDraft(project)">存为草稿</button>
		      <button type="button" class="btn btn-danger" @click="cancel()">撤销</button>
		    </div>
		  </div>
		</form>
		<modal v-show="cancelModal">
			<p slot="body" class="ta-c cancel-word">
				<i class="fa fa-exclamation-triangle fa-3x icon" aria-hidden="true"></i>
				撤销后项目将不存在，是否确定撤销？
			</p>
			<p slot="footer">
				<button class="btn btn-primary" @click="queding()">确定</button>
				<button class="btn btn-default" @click="quxiao()">取消</button>
			</p>
		</modal>
	</div>
	
</template>

<style lang="sass" scoped>
	.icon {
		vertical-align: middle;
		color: #EFA844;
	}
	.ta-c {
		text-align: center;
	}
	.cancel-word {
		margin: 0;
	}
	.text-danger {
		text-decoration: none;
		cursor: pointer;
	}
</style>

<script>
import axios from 'axios';
import qs from 'qs';
import modal from '../../../component/modal.vue'

export default {
	name: 'bidInfoEdit',
	data() {
		return {
			project: this.iniProject,
			cancelModal: false,
			commonwealthShow: false
		}
	},
	computed: {
		zjsBiddingContent() {
			if (this.office === "造价所") {
				return true;
			} else {
				return false;
			}
		},
		zjsFundSourceShow() {
			if (this.office === "造价所") {
				return true;
			} else {
				return false;
			}
		},
		kjsBiddingContent() {
			if (this.office === "会计所") {
				return true;
			} else {
				return false;
			}
		},
		pgsBiddingContent() {
			if (this.office === "评估所") {
				return true;
			} else {
				return false;
			}
		},
		swsBiddingContent() {
			if (this.office === "税务所") {
				return true;
			} else {
				return false;
			}
		},
		OwnershipStructure() {
			if (this.office === "造价所") {
				return false;
			} 
			if (this.office === "会计所") {
				return true;
			} 
			if (this.office === "评估所") {
				return true;
			} 
			if (this.office === "税务所") {
				return true;
			} 
		},
		scale() {
			if (this.office === "造价所") {
				return true;
			}
		},
		scaleOther() {
			if (this.office !== "造价所") {
				return true;
			}
		}
	},
	props: ['iniProject','office'],
	methods: {
		submit(project) {
			this.$emit('submit',project);
		},
		saveDraft(project) {
			this.$emit('saveDraft',project);
		},
		cancel() {
			this.cancelModal = true;
		},
		quxiao() {
			this.cancelModal = false;
		},
		queding() {
			//祥哥给
			this.$router.push('/bid-info-list');
		},
		delBasicFee(index) {
			this.$emit('delBasicFee',index);
		},
		addBasicFee() {
			this.$emit('addBasicFee');
		},
		delEfficiencyFee(index) {
			this.$emit('delEfficiencyFee',index);
		},
		addEfficiencyFee() {
			this.$emit('addEfficiencyFee');
		},
		isCommonwealth() {
			this.commonwealthShow = true;
		},
		notCommonwealth() {
			this.commonwealthShow = false;
		}
	},
	created() {

	},
	components: {
		modal
	}
};
</script>