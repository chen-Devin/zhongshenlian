<template>
	<div>
		<div class="page-header">
			<h4 class="main-title">
				招投标信息{{ inputType }}
        <button type="button" class="btn f-r my-btn cancel-btn btn-mb" @click="cancel()">撤销</button>
        <button type="button" class="btn f-r my-btn draft-btn btn-mr btn-mb" @click="saveDraft(project)">存为草稿</button>
        <button type="button" class="btn f-r my-btn submit-btn btn-mr btn-mb" @click="submit(project)">提交</button>
			</h4>
		</div>
		<form class="form-horizontal" @submit.prevent @keyup.enter.prevent>
			<div class="form-group">
			  <label for="projectName" class="col-sm-2 control-label">项目名称：</label>
			  <div class="col-sm-10">
			    <input type="text" class="form-control half-width" id="projectName" v-model="project.projectName" name="projectName" placeholder="请输入项目名称">
			  </div>
			</div>
			<div class="form-group">
				<label for="tenderPerson" class="col-sm-2 control-label">招标人：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control half-width" id="tenderPerson" v-model="project.tenderPerson" name="tenderPerson" placeholder="请输入招标人">
				</div>
			</div>
			<div class="form-group">
				<label for="agency" class="col-sm-2 control-label">招标代理机构：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control half-width" id="agency" v-model="project.agency" name="agency" placeholder="请输入招标代理机构">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">业务类型：</label>
				<div class="col-sm-10">
					<label class="checkbox-inline">
						<input type="checkbox" v-model="project.departmentType" value="kjs"> 会计所
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="project.departmentType" value="pgs"> 评估所
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="project.departmentType" value="sws"> 税务所
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="project.departmentType" value="zjs"> 造价所
					</label>
				</div>
			</div>
			<hr>
			<!--会计所单独内容-->
			<div v-if="kjsContentShow">
				<div class="form-group">
					<label class="col-sm-2 control-label">会计所：</label>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">招标内容：</label>
					<div class="col-sm-10">
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.kjsBiddingContent" value="年审"> 年审
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.kjsBiddingContent" value="专项"> 专项
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.kjsBiddingContent" value="咨询"> 咨询
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.kjsBiddingContent" value="决算"> 决算
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.kjsBiddingContent" value="外汇年检"> 外汇年检
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.kjsBiddingContent" value="验资"> 验资
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.kjsBiddingContent" value="外资审计"> 外资审计
						</label>
					</div>
				</div>
				<div class="form-group">
					<label for="ownershipStructure" class="col-sm-2 control-label">股权结构：</label>
					<div class="col-sm-10">
						<label class="radio-inline">
							<input type="radio" v-model="project.kjsOwnershipStructure" name="kjsOwnershipStructure" value="国有"> 国有
						</label>
						<label class="radio-inline">
							<input type="radio" v-model="project.kjsOwnershipStructure" name="kjsOwnershipStructure" value="民营"> 民营
						</label>
						<label class="radio-inline">
							<input type="radio" v-model="project.kjsOwnershipStructure" name="kjsOwnershipStructure" value="外资"> 外资
						</label>
						<label class="radio-inline">
							<input type="radio" v-model="project.kjsOwnershipStructure" name="kjsOwnershipStructure" value="混合"> 混合
						</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">资产总额：</label>
					<div class="col-sm-10">
<<<<<<< HEAD
						<div class="input-group half-width">
							<input type="text" class="form-control" id="totalAssets" v-model="project.totalAssets" name="totalAssets" placeholder="请输入资产总额">
=======
						<div class="input-group">
              <masked-input type="text" class="form-control" placeholder="请输入资产总额" v-model="project.totalAssets" :mask="currencyMask" :guide="false" placeholderChar="#">
              </masked-input>
>>>>>>> 464fde7054f9e20227266d420192e30d2a5de568
							<div class="input-group-addon">元</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="location" class="col-sm-2 control-label">坐落地点：</label>
					<div class="col-sm-10">
					  <input type="text" class="form-control half-width" id="location" v-model="project.location" name="location" placeholder="请输入坐落地点">
					</div>
				</div>
				<hr>
			</div>
			<!--评估所单独内容-->
			<div v-if="pgsContentShow">
				<div class="form-group">
					<label class="col-sm-2 control-label">评估所：</label>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">招标内容：</label>
					<div class="col-sm-10">
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.pgsBiddingContent" id="biddingContent1" value="股改"> 股改
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.pgsBiddingContent" id="biddingContent2" value="专项"> 专项
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.pgsBiddingContent" id="biddingContent3" value="咨询"> 咨询
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" v-model="project.pgsBiddingContent" id="biddingContent4" value="清产核资"> 清产核资
						</label>
					</div>
				</div>
				<div class="form-group">
					<label for="ownershipStructure" class="col-sm-2 control-label">股权结构：</label>
					<div class="col-sm-10">
						<label class="radio-inline">
							<input type="radio" name="pgsOwnershipStructure" v-model="project.pgsOwnershipStructure" value="国有"> 国有
						</label>
						<label class="radio-inline">
							<input type="radio" name="pgsOwnershipStructure" v-model="project.pgsOwnershipStructure" value="民营"> 民营
						</label>
						<label class="radio-inline">
							<input type="radio" name="pgsOwnershipStructure" v-model="project.pgsOwnershipStructure" value="外资"> 外资
						</label>
						<label class="radio-inline">
							<input type="radio" name="pgsOwnershipStructure" v-model="project.pgsOwnershipStructure" value="混合"> 混合
						</label>
					</div>
				</div>
				<hr>
			</div>
			<!--税务所单独内容-->
			<div v-if="swsContentShow">
				<div class="form-group">
					<label class="col-sm-2 control-label">税务所：</label>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">招标内容：</label>
					<div class="col-sm-10">
						<label class="checkbox-inline">
							<input type="checkbox" name="biddingContent" v-model="project.swsBiddingContent" id="biddingContent1" value="税鉴"> 税鉴
						</label>
					</div>
				</div>
				<div class="form-group">
					<label for="ownershipStructure" class="col-sm-2 control-label">股权结构：</label>
					<div class="col-sm-10">
						<label class="radio-inline">
							<input type="radio" name="swsOwnershipStructure" v-model="project.swsOwnershipStructure" id="ownershipStructure1" value="国有"> 国有
						</label>
						<label class="radio-inline">
							<input type="radio" name="swsOwnershipStructure" v-model="project.swsOwnershipStructure" id="ownershipStructure2" value="民营"> 民营
						</label>
						<label class="radio-inline">
							<input type="radio" name="swsOwnershipStructure" v-model="project.swsOwnershipStructure" id="ownershipStructure3" value="外资"> 外资
						</label>
						<label class="radio-inline">
							<input type="radio" name="swsOwnershipStructure" v-model="project.swsOwnershipStructure" id="ownershipStructure4" value="混合"> 混合
						</label>
					</div>
				</div>
				<hr>
			</div>
			<!--造价所单独内容-->
			<div v-if="zjsContentShow">
				<div class="form-group">
					<label class="col-sm-2 control-label">造价所：</label>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">招标内容：</label>
					<div class="col-sm-10">
						<label class="checkbox-inline">
							<input type="checkbox" name="biddingContent" v-model="project.zjsBiddingContent" value="概算"> 概算
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="biddingContent" v-model="project.zjsBiddingContent" value="预算"> 预算
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="biddingContent" v-model="project.zjsBiddingContent" value="结算"> 结算
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="biddingContent" v-model="project.zjsBiddingContent" value="全过程造价控制"> 全过程造价控制
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="biddingContent" v-model="project.zjsBiddingContent" value="入围"> 入围
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="biddingContent" v-model="project.zjsBiddingContent" value="一审"> 一审
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="biddingContent" v-model="project.zjsBiddingContent" value="二审"> 二审
						</label>
            <!--其他 还不会做-->
						<!-- <div class="checkbox">
						  <label for="other">
						    <input type="checkbox" name="biddingContent" v-model="project.zjsBiddingContent" value="其他">
						    其他：
						  </label>
						  <input type="text" v-model="project.zjsBiddingContent" id="other" class="form-control" placeholder="限15字">
						</div> -->
					</div>
				</div>
				<div class="form-group">
					<label for="zjsFundSource" class="col-sm-2 control-label">资金来源及比例：</label>
					<div class="col-sm-10">
						<label class="checkbox-inline">
							<input type="checkbox" name="zjsFundSource" v-model="project.zjsFundSource" value="财政"> 财政
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="zjsFundSource" v-model="project.zjsFundSource" value="自筹"> 自筹
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="zjsFundSource" v-model="project.zjsFundSource" value="贷款"> 贷款
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" name="zjsFundSource" v-model="project.zjsFundSource" value="BT等"> BT等
						</label>
					</div>
				</div>
				<div class="form-group">
					<label for="scale" class="col-sm-2 control-label">建设规模：</label>
					<div class="col-sm-10">
						<div class="row adjust-half-width">
							<div class="col-sm-4">
								<input type="text" class="form-control" id="scale" v-model="project.zjsArea" name="zjsArea" placeholder="请输入建设面积">
							</div>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="scale" v-model="project.zjsLength" name="zjsLength" placeholder="请输入长度">
							</div>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="scale" v-model="project.zjsTotalInvestment" name="zjsTotalInvestment" placeholder="请输入总投资额">
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="zjsLocation" class="col-sm-2 control-label">建设地点：</label>
					<div class="col-sm-10">
					  <input type="text" class="form-control half-width" id="zjsLocation" v-model="project.zjsLocation" name="zjsLocation" placeholder="请输入建设地点">
					</div>
				</div>
				<div class="form-group">
					<label for="serviceTerm" class="col-sm-2 control-label">服务期限：</label>
					<div class="col-sm-10">
					  <input type="text" class="form-control half-width" id="serviceTerm" v-model="project.serviceTerm" name="serviceTerm" placeholder="请输入服务期限">
					</div>
				</div>
				<hr>
			</div>
			<!--共有内容-->
			<div class="form-group">
				<label for="serviceTerm" class="col-sm-2 control-label">审计期限：</label>
				<div class="col-sm-10">
					<input type="text" class="form-control half-width" id="serviceTerm" v-model="project.serviceTerm" name="serviceTerm" placeholder="请输入审计期限">
				</div>
			</div>
			<div class="form-group">
				<label for="investmentConditions" class="col-sm-2 control-label">投资人资质条件、能力：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control half-width" id="investmentConditions" v-model="project.investmentConditions" name="investmentConditions" placeholder="请输入投资人资质条件及能力">
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
						<div class="row half-width">
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
						<div class="row half-width">
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
						<div class="row half-width">
							<h4 class="col-sm-1 col-sm-offset-11">
								<a class="fa fa-plus-circle text-danger" @click="addBasicFee()"></a>
							</h4>
						</div>
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-2 control-label">效益取费：</label>
					<div class="col-sm-10">
						<div class="row half-width">
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
						<div class="row half-width">
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
						<div class="row half-width">
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
					<input type="text" class="form-control half-width" id="biddingNumber" v-model="project.biddingNumber" name="biddingNumber" placeholder="请输入中标单位数量">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">招标控制价：</label>
				<div class="col-sm-10">
<<<<<<< HEAD
					<div class="input-group half-width">
						<input type="text" class="form-control" id="controlPrice" v-model="project.controlPrice" name="controlPrice" placeholder="请输入招标控制价">
=======
					<div class="input-group">
            <masked-input type="text" class="form-control" placeholder="请输入招标控制价" v-model="project.controlPrice" :mask="currencyMask" :guide="false" placeholderChar="#">
            </masked-input>
>>>>>>> 464fde7054f9e20227266d420192e30d2a5de568
						<div class="input-group-addon">元</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="bidStartTime" class="col-sm-2 control-label">招标报名时间：</label>
				<div class="col-sm-10">
				  <input type="date" class="form-control half-width" id="bidStartTime" v-model="project.bidStartTime" name="bidStartTime">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">招标文件价格：</label>
				<div class="col-sm-10">
<<<<<<< HEAD
					<div class="input-group half-width">
						<input type="text" class="form-control" id="bidDocumentPrice" v-model="project.bidDocumentPrice" name="bidDocumentPrice" placeholder="请输入招标文件价格">
=======
					<div class="input-group">
            <masked-input type="text" class="form-control" placeholder="请输入招标文件价格" v-model="project.bidDocumentPrice" :mask="currencyMask" :guide="false" placeholderChar="#">
            </masked-input>
>>>>>>> 464fde7054f9e20227266d420192e30d2a5de568
						<div class="input-group-addon">元</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="quotations" class="col-sm-2 control-label">报价方式：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control half-width" id="quotations" v-model="project.quotations" name="quotations" placeholder="请输入报价方式">
				</div>
			</div>
			<div class="form-group">
				<label for="tenderValidityPeriod" class="col-sm-2 control-label">投标有效期：</label>
				<div class="col-sm-10">
					<div class="input-group half-width">
						<input type="text" class="form-control" id="tenderValidityPeriod" v-model="project.tenderValidityPeriod" name="tenderValidityPeriod" placeholder="请输入投标有限期">
						<div class="input-group-addon">天</div>
					</div>

				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">投标保证金：</label>
				<div class="col-sm-10">
<<<<<<< HEAD
					<div class="input-group half-width">
						<input type="text" class="form-control" id="bidBond" v-model="project.bidBond" name="bidBond" placeholder="请输入投标保证金">
=======
					<div class="input-group">
            <masked-input type="text" class="form-control" placeholder="请输入投标保证金" v-model="project.bidBond" :mask="currencyMask" :guide="false" placeholderChar="#">
            </masked-input>
>>>>>>> 464fde7054f9e20227266d420192e30d2a5de568
						<div class="input-group-addon">元</div>
					</div>
				</div>
			</div>
			<!--标书费-->
			<div class="form-group">
				<label for="tenderFee" class="col-sm-2 control-label">标书费：</label>
				<div class="col-sm-10">
<<<<<<< HEAD
					<div class="input-group half-width">
						<input type="text" class="form-control" id="tenderFee" v-model="project.tenderFee" name="tenderFee" placeholder="请输入标书费">
=======
					<div class="input-group">
            <masked-input type="text" class="form-control" placeholder="请输入标书费" v-model="project.tenderFee" :mask="currencyMask" :guide="false" placeholderChar="#">
            </masked-input>
>>>>>>> 464fde7054f9e20227266d420192e30d2a5de568
						<div class="input-group-addon">元</div>
					</div>
				</div>
			</div>
			<!--中标服务费-->
			<div class="form-group">
				<label for="winningServiceFee" class="col-sm-2 control-label">中标服务费：</label>
				<div class="col-sm-10">
<<<<<<< HEAD
					<div class="input-group half-width">
						<input type="text" class="form-control" id="winningServiceFee" v-model="project.winningServiceFee" name="winningServiceFee" placeholder="请输入中标服务费">
=======
					<div class="input-group">
            <masked-input type="text" class="form-control" placeholder="请输入中标服务费" v-model="project.winningServiceFee" :mask="currencyMask" :guide="false" placeholderChar="#">
            </masked-input>
>>>>>>> 464fde7054f9e20227266d420192e30d2a5de568
						<div class="input-group-addon">元</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="openBidDate" class="col-sm-2 control-label">开标时间：</label>
				<div class="col-sm-10">
				  <input type="datetime-local" class="form-control half-width" id="openBidDate" v-model="project.openBidDate"  name="openBidDate" placeholder="请输入开标时间">
				</div>
			</div>
			<div class="form-group">
				<label for="openBidPlace" class="col-sm-2 control-label">开标地点：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control half-width" id="openBidPlace" v-model="project.openBidPlace" name="openBidPlace" placeholder="请输入开标地点">
				</div>
			</div>
			<hr>
			<!--备注-->
			<div class="form-group">
				<label for="remark" class="col-sm-2 control-label">备注：</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control half-width" id="remark" v-model="project.remark" name="remark" placeholder="请输入备注">
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
  .adjust-half-width {
    width: 52.4%;
  }
</style>

<script>
import axios from 'axios';
import qs from 'qs';
import maskedInput from 'vue-text-mask';

import modal from '../../../component/modal.vue';
import currencyMask from '../../../currencyMask.js';

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
		kjsContentShow() {
			let kjs = this.project.departmentType.some((item,index,array)=> {
				return item === 'kjs';
			})
			if (kjs) {
				return true;
			}
		},
		pgsContentShow() {
			let pgs = this.project.departmentType.some((item,index,array)=> {
				return item === 'pgs';
			})
			if (pgs) {
				return true;
			}
		},
		swsContentShow() {
			let sws = this.project.departmentType.some((item,index,array)=> {
				return item === 'sws';
			})
			if (sws) {
				return true;
			}
		},
		zjsContentShow() {
			let zjs = this.project.departmentType.some((item,index,array)=> {
				return item === 'zjs';
			})
			if (zjs) {
				return true;
			}
		}
	},
	props: ['iniProject','inputType'],
	methods: {
    currencyMask,
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
			this.$emit('quedingDelete',this.project.id);
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
		modal,
    maskedInput
	}
};
</script>
