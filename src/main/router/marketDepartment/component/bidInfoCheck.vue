<template>
  <div class="bid-info-check">   
    <h4 class="main-title">
      招投标信息
    </h4>
    <el-form
      :model="project" 
      :label-position="labelPosition" 
      :rules="rules" 
      ref="project" 
      label-width="100px" 
      class="project-editor" 
      :disabled="!editable"
      required>
      <div class="basic-message">
        <el-row>
          <el-col :span="12">
            <el-form-item label="招投标公告来源"  label-width = "140px" prop="source">
              <el-input v-model="project.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名截止日期：" label-width = "130px" required>
              <el-input v-model="project.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招投标公告发布人："  label-width = "150px" required>
              <el-input v-model="project.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名相关费用：" label-width = "120px">
              <el-input v-model="project.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招投标公告发布日期："  label-width = "170px" required>
              <el-input v-model="project.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名开标日期：" label-width = "120px">
              <el-input v-model="project.bidStartTime" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中审联招投标公告编号："  label-width = "180px" required>
              <el-input v-model="project.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告开标日期：" label-width = "120px">
              <el-input v-model="project.openBidDate" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招投项目名称：" label-width = "130px" required>
              <el-input v-model="project.projectName" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告开标地点：" label-width = "120px">
              <el-input v-model="project.openBidPlace" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标段划分：" required>
              <el-input v-model="project.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审计限制：">
              <el-input v-model="project.serviceTerm" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标人：" required>
              <el-input v-model="project.tenderPerson" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投资人资质条件/能力：">
              <el-input type="textarea" v-model="project.investmentConditions" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="招标代理机构："  label-width = "120px">
              <el-input v-model="project.agency" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中标/入围：" required>
              <el-input v-model="project.name" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中标单位数量：" label-width="120px">
              <el-input v-model="project.biddingNumber" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="!editable">
            <div class="business-type">
              <h5>业务类型：</h5>
              <div>
                <span v-for="item in departmentTypeMap">{{ item + " " }}</span>
              </div>
            </div>
            <!--会计所单独内容-->
            <div v-if="kjsContentShow">
              <div class="form-group">
                <h5>会计所</h5>
              </div>
              <div class="form-group">
                <h5>招标内容：
                  <span class="ml-10 mr-10" v-for="item in project.kjsBiddingContent">{{ item + " " }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                  股权结构：
                  <span class="ml-10">
                    {{ project.kjsOwnershipStructure }}
                  </span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                  资产总额：
                  <span class="ml-10">{{ project.totalAssets + "元" }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                  坐落地点：
                  <span class="ml-10">{{ project.location }}</span>
                </h5>
              </div>   
            </div>
            <!--评估所单独内容-->
            <div v-if="pgsContentShow">
              <div class="form-group">
                <h5>评估所</h5>
              </div>
              <div class="form-group">
                <h5>
                  招标内容：
                  <span class="ml-10" v-for="item in project.pgsBiddingContent">{{item + " " }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                股权结构：
                <span class="ml-10">{{ project.pgsOwnershipStructure }}</span>
                </h5>
              </div>             
            </div>
            <!--税务所单独内容-->
            <div v-if="swsContentShow">
              <div class="form-group">
                <h5>税务所</h5>
              </div>
              <div class="form-group">
                <h5>
                  招标内容：
                  <span class="ml-10" v-for="item in project.swsBiddingContent">{{ item + " " }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>股权结构：
                  <span class="ml-10">
                    {{ project.swsOwnershipStructure }}
                  </span>
                </h5>
              </div>       
            </div>
            <!--造价所单独内容-->
            <div v-if="zjsContentShow">
              <div class="form-group">
                <h5>造价所</h5>
              </div>
              <div class="form-group">
                <h5>
                  招标内容：
                    <span v-for="item in project.zjsBiddingContent">{{ item + " " }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                  资金来源及比例:
                  <span class="ml-10" v-for="item in project.zjsFundSource">{{ item + " " }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>建设规模：
                  <span class="ml-10">{{ project.zjsArea }}</span>
                  <span class="ml-10">{{ project.zjsLength }}</span>
                  <span class="ml-10">{{ project.totalAssets }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>建设地点： 
                    <span class="ml-10">
                      {{ project.zjsLocation }}
                    </span>
                </h5>
              </div>
            </div>
          </el-col>
          <el-col :span="12" v-else>
            <div class="business-type">
              <h4>业务类型：</h4>
              <div class="col-sm-10 check-wrap">
                <input class="magic-checkbox" type="checkbox" value="kjs" v-model="project.departmentType" id="5">
                <label for="5">
                  会计所
                </label>
                <input class="magic-checkbox" type="checkbox" value="pgs" v-model="project.departmentType" id="6">
                <label for="6">
                  评估所
                </label>
                <input class="magic-checkbox" type="checkbox" value="sws" v-model="project.departmentType" id="7">
                <label for="7">
                  税务所
                </label>
                <input class="magic-checkbox" type="checkbox" value="zjs" v-model="project.departmentType" id="8">
                <label for="8">
                  造价所
                </label>
              </div>
            </div>
            
            <!--会计所单独内容-->
            <div v-if="kjsContentShow">
              <div class="form-group">
                <label>会计所：</label>
              </div>
              <div class="form-group">
                <label>招标内容：</label>
                <div class="col-sm-10 check-wrap">
                  <input class="magic-checkbox" type="checkbox" value="年审" v-model="project.kjsBiddingContent" id="年审">
                  <label for="年审">
                    年审
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="专项" v-model="project.kjsBiddingContent" id="专项">
                  <label for="专项">
                    专项
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="咨询" v-model="project.kjsBiddingContent" id="咨询">
                  <label for="咨询">
                    咨询
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="决算" v-model="project.kjsBiddingContent" id="决算">
                  <label for="决算">
                    决算
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="外汇年检" v-model="project.kjsBiddingContent" id="外汇年检">
                  <label for="外汇年检">
                    外汇年检
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="验资" v-model="project.kjsBiddingContent" id="验资">
                  <label for="验资">
                    验资
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="外资审计" v-model="project.kjsBiddingContent" id="外资审计">
                  <label for="外资审计">
                    外资审计
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="ownershipStructure">股权结构：</label>
                <div class="col-sm-10 check-wrap">
                  <input class="magic-radio" type="radio" name="kjsOwnerStructure" v-model="project.kjsOwnershipStructure" value="国有" id="kjs国有">
                  <label for="kjs国有">
                     国有
                  </label>
                  <input class="magic-radio" type="radio" name="kjsOwnerStructure" v-model="project.kjsOwnershipStructure" value="民营" id="kjs民营">
                  <label for="kjs民营">
                     民营
                  </label>
                  <input class="magic-radio" type="radio" name="kjsOwnerStructure" v-model="project.kjsOwnershipStructure" value="外资" id="kjs外资">
                  <label for="kjs外资">
                     外资
                  </label>
                  <input class="magic-radio" type="radio" name="kjsOwnerStructure" v-model="project.kjsOwnershipStructure" value="混合" id="kjs混合">
                  <label for="kjs混合">
                     混合
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label>资产总额：</label>
                <div class="col-sm-10">
                  <div class="input-group half-width">
                    <masked-input type="text" class="form-control" placeholder="请输入资产总额" v-model="project.totalAssets" :mask="currencyMask" :guide="false" placeholderChar="#">
                    </masked-input>
                    <div class="input-group-addon">元</div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="location">坐落地点：</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control half-width" id="location" v-model="project.location" name="location" placeholder="请输入坐落地点">
                </div>
              </div>
              
            </div>
            <!--评估所单独内容-->
            <div v-if="pgsContentShow">
              <div class="form-group">
                <label>评估所：</label>
              </div>
              <div class="form-group">
                <label>招标内容：</label>
                <div class="col-sm-10 check-wrap">
                  <input class="magic-checkbox" type="checkbox" value="股改" v-model="project.pgsBiddingContent" id="股改">
                  <label for="股改">
                    股改
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="专项" v-model="project.pgsBiddingContent" id="专项2">
                  <label for="专项2">
                    专项
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="咨询" v-model="project.pgsBiddingContent" id="咨询2">
                  <label for="咨询2">
                    咨询
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="清产核资" v-model="project.pgsBiddingContent" id="清产核资">
                  <label for="清产核资">
                    清产核资
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="ownershipStructure">股权结构：</label>
                <div class="col-sm-10 check-wrap">
                  <input class="magic-radio" type="radio" name="pgsOwnerStructure" v-model="project.pgsOwnershipStructure" value="国有" id="pgs国有">
                  <label for="pgs国有">
                     国有
                  </label>
                  <input class="magic-radio" type="radio" name="pgsOwnerStructure" v-model="project.pgsOwnershipStructure" value="民营" id="pgs民营">
                  <label for="pgs民营">
                     民营
                  </label>
                  <input class="magic-radio" type="radio" name="pgsOwnerStructure" v-model="project.pgsOwnershipStructure" value="外资" id="pgs外资">
                  <label for="pgs外资">
                     外资
                  </label>
                  <input class="magic-radio" type="radio" name="pgsOwnerStructure" v-model="project.pgsOwnershipStructure" value="混合" id="pgs混合">
                  <label for="pgs混合">
                     混合
                  </label>
                </div>
              </div>
              
            </div>
            <!--税务所单独内容-->
            <div v-if="swsContentShow">
              <div class="form-group">
                <label>税务所：</label>
              </div>
              <div class="form-group">
                <label>招标内容：</label>
                <div class="col-sm-10 check-wrap">
                  <input class="magic-checkbox" type="checkbox" value="税鉴" v-model="project.swsBiddingContent" id="税鉴">
                  <label for="税鉴">
                    税鉴
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="ownershipStructure">股权结构：</label>
                <div class="col-sm-10 check-wrap">
                  <input class="magic-radio" type="radio" name="swsOwnershipStructure" v-model="project.swsOwnershipStructure" value="国有" id="sws国有">
                  <label for="sws国有">
                     国有
                  </label>
                  <input class="magic-radio" type="radio" name="swsOwnershipStructure" v-model="project.swsOwnershipStructure" value="民营" id="sws民营">
                  <label for="sws民营">
                     民营
                  </label>
                  <input class="magic-radio" type="radio" name="swsOwnershipStructure" v-model="project.swsOwnershipStructure" value="外资" id="sws外资">
                  <label for="sws外资">
                     外资
                  </label>
                  <input class="magic-radio" type="radio" name="swsOwnershipStructure" v-model="project.swsOwnershipStructure" value="混合" id="sws混合">
                  <label for="sws混合">
                     混合
                  </label>
                </div>
              </div>
              
            </div>
            <!--造价所单独内容-->
            <div v-if="zjsContentShow">
              <div class="form-group">
                <label>造价所：</label>
              </div>
              <div class="form-group">
                <label>招标内容：</label>
                <div class="col-sm-10 check-wrap">
                  <input class="magic-checkbox" type="checkbox" value="概算" v-model="project.zjsBiddingContent" id="概算">
                  <label for="概算">
                    概算
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="预算" v-model="project.zjsBiddingContent" id="预算">
                  <label for="预算">
                    预算
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="结算" v-model="project.zjsBiddingContent" id="结算">
                  <label for="结算">
                    结算
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="全过程造价控制" v-model="project.zjsBiddingContent" id="全过程造价控制">
                  <label for="全过程造价控制">
                    全过程造价控制
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="入围" v-model="project.zjsBiddingContent" id="入围4">
                  <label for="入围4">
                    入围
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="一审" v-model="project.zjsBiddingContent" id="一审">
                  <label for="一审">
                    一审
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="二审" v-model="project.zjsBiddingContent" id="二审">
                  <label for="二审">
                    二审
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="zjsFundSource">资金来源及比例：</label>
                <div class="col-sm-10 check-wrap">
                  <input class="magic-checkbox" type="checkbox" value="财政" v-model="project.zjsFundSource" id="财政">
                  <label for="财政">
                    财政
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="自筹" v-model="project.zjsFundSource" id="自筹">
                  <label for="自筹">
                    自筹
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="贷款" v-model="project.zjsFundSource" id="贷款">
                  <label for="贷款">
                    贷款
                  </label>
                  <input class="magic-checkbox" type="checkbox" value="BT等" v-model="project.zjsFundSource" id="BT等">
                  <label for="BT等">
                    BT等
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="scale">建设规模：</label>
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
                <label for="zjsLocation">建设地点：</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control half-width" id="zjsLocation" v-model="project.zjsLocation" name="zjsLocation" placeholder="请输入建设地点">
                </div>
              </div>
              <div class="form-group">
                <label for="serviceTerm">服务期限：</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control half-width" id="serviceTerm" v-model="project.serviceTerm" name="serviceTerm" placeholder="请输入服务期限">
                </div>
              </div>
              
            </div>
          </el-col>
          <!-- <el-col :span="12">
            <div class="form-group">
              <label for="investmentConditions" class="col-sm-2 control-label">合同体制：</label>
              <div class="col-sm-10">
                {{ project.contractType.type }}
              </div>
            </div>
            <div v-show="commonwealthShow">
              <div class="form-group">
                <label class="col-sm-2 control-label">基本取费：</label>
                <div class="col-sm-10">
                  <div class="row">
                    <div class="col-sm-5">
                      <div class="row">
                        <div class="col-sm-4">主办方</div>
                        <div class="col-sm-8">{{ project.contractType.mainBasicName }}</div>
                      </div>
                      <div class="col-sm-1"></div>
                      <div class="col-sm-5">
                        <div class="row">
                          <div class="col-sm-4">比例</div>
                          <div class="col-sm-8">{{ project.contractType.mainBasicRate + "%"}}</div>
                        </div>
                        <div class="col-sm-1"></div>
                      </div>
                      <div class="form-group" v-for="(item, index) in project.contractType.subBasicArray">
                          <label class="col-sm-2 control-label"></label>
                            <div class="col-sm-10">
                              <div class="row">
                                <div class="col-sm-5">
                                  <div class="row">
                                    <div class="col-sm-4">协办方</div>
                                    <div class="col-sm-8">{{ item.name }}</div>
                                  </div>
                                  <div class="col-sm-1"></div>
                                  <div class="col-sm-5">
                                    <div class="row">
                                      <div class="col-sm-4">比例</div>
                                      <div class="col-sm-8">{{ item.rate + "%" }}</div>
                                    </div>
                                    <div class="col-sm-1"></div>
                                  </div>
                                      <div class="form-group">
                                        <label class="col-sm-2 control-label">效益取费：</label>
                                        <div class="col-sm-10">
                                          <div class="row">
                                            <div class="col-sm-5">
                                              <div class="row">
                                                <div class="col-sm-4">主办方</div>
                                                <div class="col-sm-8">{{ project.contractType.mainEfficiencyName }}</div>


          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item label="招标控制价格：" label-width="120px">
              <el-input v-model="project.controlPrice" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标公告附件：" label-width="130px" required>
              <el-input v-model="project.biddingNumber" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="project.remark" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<style lang="sass" scoped>
  .bid-info-check {
    > .project-editor {
      padding-left: 20px;
    }
    .business-type {
      h5 {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin-bottom: 22px;
        + div {
          display: inline-block;
          margin-bottom: 10px;
          span {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      }
    }
    .el-col {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
	.control-label {
		padding-top: 1px;
	}
	.el-upload-list {
        margin-left: 20px;
    }
  .adviceTitle {
      margin-top: 0;
      margin-bottom: 20px;
  }
  .table-contract {
    tbody {
      tr {
        td {
          padding-left: 30px;
        }
      }
    }
  }
  .mt {
    margin-top: -10px;
  }
  .ml-10 {
    margin-left: 10px;
  }
  .mr-10 {
    margin-right: 10px;
  }
</style>

<script>
import axios from 'axios';
import uploadReport from './uploadReport.vue';
import modal from '../../../component/modal.vue';
import approverAdvice from '../../../component/approverAdvice.vue';

export default {
  name: 'bidInfoCheck',
  data() {
    return {
      project: {
        biddingStatus: '',
        contractType: {
          mainBasicRate: 0,
          mainEfficiencyRate: 0,
          subBasicArray: [{ "name": '', "rate": 0 }],
          subEfficiencyArray: [{ "name": '', "rate": 0 }]
        },
        departmentType: []
      },
      editable: false,
      labelPosition: 'left',
      rules: {
        source: [
          { required: true, message: '请输入公告来源',trigger: 'blur'}
        ]
        // name: [
        //   { required: true, message: '请输入项目名称', trigger: 'blur' }
        // ],
        // scope:[
        //   { required: true, message: '请输入业务范围与审计目标', trigger: 'blur' }
        // ]
      },
      adviceText: '',  //审核不通过信息
      editBtn: false,  //编辑按钮
      brandBtn: false, //摘牌按钮
      checkBtn: false, //审核通过与不通过按钮
      user: {},        //身份信息
      delipotentShow: true,  //摘牌情况
      directorAgreeShow: false,  //所长审核模块显示
      commonwealthShow: false,  //联合体显示
      finishBtn: false,  //提交完成按钮
      noticePanel: false,  //文件面板
      noticeUpload: false,  //文件上传
      adviceShow: false,  //意见显示
      checkAdviceModal: false,  //查看意见弹出框
      checkAdviceShow: false,  //查看意见功能显示
      bidNotice: 'bidNotice',  //上传文件类型
      shortlistedNotice: 'shortlistedNotice',  //上传文件类型
      projectId: this.$route.params.id,  //项目id
      ruweiDoc: {},  //通知书
      zhongbiaoDoc: {}  //通知书
    }
  },
  computed: {
    kjsContentShow() {
      let kjs = this.project.departmentType.some((item, index, array) => {
        return item === 'kjs';
      })
      if (kjs) {
        return true;
      }
    },
    pgsContentShow() {
      let pgs = this.project.departmentType.some((item, index, array) => {
        return item === 'pgs';
      })
      if (pgs) {
        return true;
      }
    },
    swsContentShow() {
      let sws = this.project.departmentType.some((item, index, array) => {
        return item === 'sws';
      })
      if (sws) {
        return true;
      }
    },
    zjsContentShow() {
      let zjs = this.project.departmentType.some((item, index, array) => {
        return item === 'zjs';
      })
      if (zjs) {
        return true;
      }
    },
    biddingStatus() {
      return this.project.biddingStatus;
    },
    departmentTypeMap() {
      let departmentTypeMap = this.project.departmentType.map((item, index, array) => {
        if (item === 'kjs') {
          return '会计所';
        }
        if (item === 'pgs') {
          return '评估所';
        }
        if (item === 'sws') {
          return '税务所';
        }
        if (item === 'zjs') {
          return '造价所';
        }
      });
      return departmentTypeMap;
    }
    // biddingApproverArray() {
    //   for (var i = 0; i < this.project.biddingApproverArray.length; i++) {
    //     if (this.project.biddingApproverArray[i].approverResult === '不通过') {
    //       this.project.biddingApproverArray[i].showTaga = true;
    //     }
    //     else {
    //       this.project.biddingApproverArray[i].showTaga = false;
    //     }
    //   }
    //   return this.project.biddingApproverArray;
    // }
  },
  methods: {
    isEdit() {
      this.$emit('isEdit');
    },
    getInfo() {
      let pro = new Promise((resolve, reject) => {
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
            this.project.openBidDate = this.project.openBidDate.replace("T"," ");
            resolve('done');
          } else {

          }
        }, (rep) => {

        });
      });
      return pro;
    },
    showEditBtn() {
      if (this.user.department === "市场部" && (this.project.biddingStatus === "0" || this.project.biddingStatus === "5" || this.project.directorHandleStatus === "0")) {
        this.editBtn = true;
      }
    },
    showBrandBtn() {
      if (this.user.department === "业务部" && this.project.biddingStatus === "0") {
        this.brandBtn = true;
      }
    },
    showCheckBtn() {
      if (this.user.department === "所长") {
        this.checkBtn = true;
      }
    },
    showDelipotent() {
      if (this.project.biddingStatus === "0" || this.project.biddingStatus === "5") {
        this.delipotentShow = false;
      }
    },
    showDirectorAgree() {
      if (this.project.biddingStatus === "1" && this.user.department === "所长" && this.project.directorHandleStatus === "3") {
        this.directorAgreeShow = true;
      }
    },
    showNoticePanel() {
      if (this.user.department === "市场部" && this.project.directorHandleStatus === "1") {
        this.noticePanel = true;
      }
      if (this.project.biddingStatus === "3") {
        this.noticePanel = true;
      }
    },
    showCheckAdvice() {
      if (this.project.biddingApproverArray[0].approveResult === "通过" || this.project.biddingApproverArray[0].approveResult === "不通过") {
        this.checkAdviceShow = true;
      }
    },
    showNoticeUpload() {
      if (this.user.department === "市场部" && this.project.confirmAnnex === "0" && this.project.directorHandleStatus === "1") {
        this.noticeUpload = true;
        this.finishBtn = true;
      }
    },
    adviceCancel() {
      this.adviceShow = false;
    },
    adviceUpload() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'reviewBiddingInfo',
              platform: 'web',
              id: this.project.id,
              result: "不通过",
              reason: this.adviceText
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.getInfo();
          this.checkAdviceShow = true;
          this.adviceShow = false;
          this.directorAgreeShow = false;
        } else {

        }
      }, (rep) => {

      });
    },
    showAdvice() {
      this.adviceShow = true;
    },
    //摘牌
    delisting() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'delisting',
              platform: 'web',
              biddingId: this.project.id
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.brandBtn = false;
          this.getInfo();
          this.delipotentShow = true;
        } else {

        }
      }, (rep) => { });
    },
    //通过
    approve() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'reviewBiddingInfo',
              platform: 'web',
              id: this.project.id,
              result: "通过",
              reason: ""
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.getInfo();
          this.checkAdviceShow = true;
          this.directorAgreeShow = false;
        } else {

        }
      }, (rep) => {

      });
    },
    //入围通知书
    recRuweiDoc(fileList) {
      this.ruweiDoc = fileList[0];
    },
    //删除入围通知书
    deleteRuweiDoc() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: this.ruweiDoc.id,
              type: 'shortlistedNotice'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.ruweiDoc = {};
        } else {

        }
      }, (rep) => {

      });
    },
    //中标通知书
    recZhongbiaoDoc(fileList) {
      this.zhongbiaoDoc = fileList[0];
    },
    //删除中标通知书
    deleteZhongbiaoDoc(fileList) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: this.zhongbiaoDoc.id,
              type: 'bidNotice'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.zhongbiaoDoc = {};
        } else {

        }
      }, (rep) => {

      });
    },
    //将原始数据分配到通知书对象里
    distributeDoc() {
      for (var i = 0; i < this.project.biddingAnnexArray.length; i++) {
        if (this.project.biddingAnnexArray[i].annexType === "bidNotice") {
          this.zhongbiaoDoc.name = this.project.biddingAnnexArray[i].annexName;
          this.zhongbiaoDoc.url = this.project.biddingAnnexArray[i].annexUrl;
          this.zhongbiaoDoc.id = this.project.biddingAnnexArray[i].id;
        } else if (this.project.biddingAnnexArray[i].annexType === "shortlistedNotice") {
          this.ruweiDoc.name = this.project.biddingAnnexArray[i].annexName;
          this.ruweiDoc.url = this.project.biddingAnnexArray[i].annexUrl;
          this.ruweiDoc.id = this.project.biddingAnnexArray[i].id;
        }
      }
    },
    //通知书上传完成
    uploadFinish() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'confirmBiddingAnnex',
              platform: 'web',
              id: this.project.id
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.finishBtn = false;
        } else {

        }
      }, (rep) => {

      });
    },
    //关闭意见显示
    closeAdviceContent() {
      this.checkAdviceModal = false;
    },
    //查看联合体
    showCommonwealth() {
      if (this.project.contractType.type === "联合体") {
        this.commonwealthShow = true;
      }
    }
  },
  props: ['biddingState'],
  created() {
    //Promise 异步调用各个显示函数，使页面分身份信息显示
    this.getInfo().then(() => {
      this.showEditBtn();
      this.showDelipotent();
      this.showDirectorAgree();
      this.showBrandBtn();
      this.distributeDoc();
      this.showCheckAdvice();
      this.showNoticePanel();
      this.showNoticeUpload();
      this.showCommonwealth();
    }, () => { });
    this.id = this.$route.params.id;
    this.office = this.$route.params.office;
    this.$store.dispatch('fetchUserInfo');
    this.user = this.$store.getters.getUser;
  },
  components: {
    axios,
    uploadReport,
    modal,
    approverAdvice
  }
}
</script>
