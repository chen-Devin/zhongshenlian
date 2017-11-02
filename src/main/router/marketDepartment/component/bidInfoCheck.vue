<template>
  <div class="bid-info-check">   
    <h4 class="main-title">
      招投标信息
      <button 
        class="btn my-btn submit-btn pull-right f-r" 
        v-if="editBtn&&!editable" 
        @click="edit">编辑</button>
      <button 
        class="btn my-btn submit-btn pull-right f-r" 
        @click="delisting" 
        v-if="brandBtn">摘牌</button>
      <template v-else>
        <button 
          v-if="editable"
          type="button" 
          class="btn f-r my-btn cancel-btn btn-mr" 
          @click="cancel()">撤销</button>
        <button 
          v-if="editable"
          type="button" 
          class="btn f-r my-btn draft-btn btn-mr" 
          @click="saveDraft(project)">存为草稿</button>
        <button 
          v-if="editable"
          type="button" 
          class="btn f-r my-btn submit-btn btn-mr" 
          @click="submit(project)">提交</button> 
      </template>
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
            <el-form-item label="招投标公告来源" label-width="120px" required>
              <el-input v-model="project.biddingSource" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名截止日期" label-width = "110px" required>
              <el-input v-model="project.endTime" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招投标公告发布人"  label-width = "130px" required>
              <span>{{project.publishName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名相关费用" label-width="110px" required>
              <el-input v-model="project.relateFee" :disabled="!editable">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招投标公告发布日期" label-width = "150px" required>
              <span>{{project.publishTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名开标日期" label-width="100px">
              <el-input v-model="project.bidStartTime" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中审联招投标公告编号"  label-width = "160px" required>
              <span>{{project.biddingSerial}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告开标日期">
              <el-input v-model="project.openBidDate" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招投项目名称" label-width = "110px" required>
              <el-input v-model="project.projectName" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告开标地点">
              <el-input v-model="project.openBidPlace" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标段划分" label-width = "80px" required>
              <el-input v-model="project.biddingDivision" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审计限制" label-width="80px">
              <el-input v-model="project.serviceTerm" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标人" label-width="70px" required>
              <el-input v-model="project.tenderPerson" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投资人资质条件/能力" label-width="140px">
              <el-input type="textarea" v-model="project.investmentConditions" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标代理机构" >
              <el-input v-model="project.agency" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标控制价格" label-width="110px" required>
              <el-input v-model="project.controlPrice" :disabled="!editable">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中标/入围" required>
              <el-input v-model="project.wtf" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中标单位数量" label-width="100px">
              <el-input v-model="project.biddingNumber" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注" label-width="50px">
              <el-input type="textarea" v-model="project.remark" :disabled="!editable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="type-system">
          <el-col :span="12" v-if="!editable">
            <div class="business-type">
              <h5 style="width:70px;">业务类型</h5>
              <div>
                <p>{{ departmentTypeMap.join('、') }}</p>
              </div>
            </div>
            <!--会计所单独内容-->
            <div v-if="kjsContentShow">
              <div class="form-group">
                <h5>会计所</h5>
              </div>
              <div class="form-group">
                <h5>招标内容
                  <span class="ml-10 mr-10" v-for="item in project.kjsBiddingContent">{{ item + " " }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                  股权结构
                  <span class="ml-10">
                    {{ project.kjsOwnershipStructure }}
                  </span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                  资产总额
                  <span class="ml-10">{{ project.totalAssets + "元" }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                  坐落地点
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
                  招标内容
                  <span class="ml-10" v-for="item in project.pgsBiddingContent">{{item + " " }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>
                股权结构
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
                  招标内容
                  <span class="ml-10" v-for="item in project.swsBiddingContent">{{ item + " " }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>股权结构
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
                  招标内容
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
                <h5>建设规模
                  <span class="ml-10">{{ project.zjsArea }}</span>
                  <span class="ml-10">{{ project.zjsLength }}</span>
                  <span class="ml-10">{{ project.totalAssets }}</span>
                </h5>
              </div>
              <div class="form-group">
                <h5>建设地点 
                    <span class="ml-10">
                      {{ project.zjsLocation }}
                    </span>
                </h5>
              </div>
            </div>
          </el-col>
          <el-col :span="12" v-else>
            <div class="business-type">
              <h5 style="width:80px;">业务类型</h5>
              <div class="el-form-item">
                <el-checkbox-group v-model="project.departmentType">
                  <el-checkbox label="kjs">会计所</el-checkbox>
                  <el-checkbox label="pgs">评估所</el-checkbox>
                  <el-checkbox label="sws">税务所</el-checkbox>
                  <el-checkbox label="zjs">造价所</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <!--会计所单独内容-->
            <div v-if="kjsContentShow">
              <h5 class="el-form-item">会计所</h5>
              <el-form-item label="招标内容" label-width="70px">
                <el-checkbox-group v-model="project.kjsBiddingContent">
                  <el-checkbox label="年审"></el-checkbox>
                  <el-checkbox label="专项"></el-checkbox>
                  <el-checkbox label="咨询"></el-checkbox>
                  <el-checkbox label="决算"></el-checkbox>
                  <el-checkbox label="外汇年检"></el-checkbox>
                  <el-checkbox label="验资"></el-checkbox>
                  <el-checkbox label="外资审计"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="股权结构" label-width="70px">
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
                <label for="pgs混合">
                   混合
                </label>
              </el-form-item>
              <el-form-item label="资产总额" label-width="70px">
                <el-input type="number" placeholder="请输入资产总额" v-model="project.totalAssets">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="坐落地点" label-width="70px">
                <el-input type="text" placeholder="请输入坐落地点" v-model="project.location"></el-input>
              </el-form-item>
              <hr>
            </div>
            <!--评估所单独内容-->
            <div v-if="pgsContentShow">  
              <h5 class="el-form-item">评估所</h5>
              <el-form-item label="招标内容" label-width="70px">
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
              </el-form-item>
              <el-form-item label="股权结构" label-width="70px">
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
              </el-form-item>
              <hr>
            </div>
            <!--税务所单独内容-->
            <div v-if="swsContentShow">
              <h5 class="el-form-item">评估所</h5>
              <el-form-item label="招标内容" label-width="70px">
                <input class="magic-checkbox" type="checkbox" value="税鉴" v-model="project.swsBiddingContent" id="税鉴">
                <label for="税鉴">
                  税鉴
                </label>
              </el-form-item>
              <el-form-item label="股权结构" label-width="70px">
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
              </el-form-item>
              <hr>
            </div>
            <!--造价所单独内容-->
            <div v-if="zjsContentShow">
              <h5 class="el-form-item">造价所</h5>        
              <el-form-item label="招标内容" label-width="70px">
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
              </el-form-item> 
              <el-form-item label="资金来源及比例" label-width="110px">      
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
              </el-form-item>
              <el-form-item label="建设规模" label-width="70px">
                <el-input style="width:155px" type="number" id="scale" v-model="project.zjsArea" name="zjsArea" placeholder="请输入建设面积"></el-input>             
                <el-input style="width:155px" type="number" id="scale" v-model="project.zjsLength" name="zjsLength" placeholder="请输入长度"></el-input>             
                <el-input style="width:155px" type="number" id="scale" v-model="project.zjsTotalInvestment" name="zjsTotalInvestment" placeholder="请输入总投资额"></el-input>
              </el-form-item> 
              <el-form-item label="建设地点" label-width="70px">
                <el-input type="text" id="zjsLocation" v-model="project.zjsLocation" name="zjsLocation" placeholder="请输入建设地点"></el-input>
              </el-form-item>
              <el-form-item label="服务期限" label-width="70px">   
                  <input type="text" class="form-control" id="serviceTerm" v-model="project.serviceTerm" name="serviceTerm" placeholder="请输入服务期限">
              </el-form-item>
              <hr>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="business-type">
              <h5 style="width:95px;">合同体制信息</h5>
              <div class="el-form-item">
                  <input class="magic-radio plus" type="radio" name="contractSystem" value="联合体" v-model="project.contractType.type" :disabled="!editable" id="common">
                  <label class="radio-inline"  for="common">
                    联合体
                  </label>
                  <input class="magic-radio plus" type="radio" name="contractSystem" value="非联合体" v-model="project.contractType.type" :disabled="!editable" id="nocommon">
                  <label class="radio-inline" for="nocommon">
                    非联合体
                  </label>
              </div>
            </div>
              <div class="bgc-fff business-type" v-show="contractTypeChan">
                <p class="el-form-item" style="margin-bottom：23px">基本取费</p>
                <el-row class="el-form-item">
                  <el-col :span="9">
                    <el-input type="text" placeholder="请输入主办方" v-model="project.contractType.mainBasicName" :disabled="!editable">
                      <template slot="prepend">主办方</template>
                    </el-input>
                  </el-col>
                  <el-col :span="9">
                    <el-input type="number" placeholder="请输入比例" v-model="project.contractType.mainBasicRate" :disabled="!editable">
                      <template slot="prepend">比例</template>
                      <template slot="append">%</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row class="el-form-item" v-for="(item, index) in project.contractType.subBasicArray" :key="index">
                  <el-col :span="9">
                    <el-input type="text" placeholder="请输入协办方" v-model="item.name" :disabled="!editable">
                      <template slot="prepend">协办方</template>
                    </el-input>
                  </el-col>
                  <el-col :span="9">
                    <el-input type="text" placeholder="请输入比例" v-model="item.rate" :disabled="!editable">
                      <template slot="prepend">比例</template>
                      <template slot="append">%</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2">
                    <h4 v-if="editable">
                      <a class="text-danger" @click="delBasicFee(index)">
                        <img src="../../../../img/delete_icon.svg">
                      </a>
                    </h4>
                  </el-col>
                  <el-col :span="2">
                    <h4 v-if="editable">
                      <a class="text-danger" @click="addBasicFee()">
                        <img src="../../../../img/add_icon.svg">
                      </a>
                    </h4>
                  </el-col>
                </el-row>
              </div>
              <div class="bgc-fff business-type" v-show="contractTypeChan">
                <p>效益取费</p>
                <el-row class="el-form-item">
                  <el-col :span="9">
                    <el-input type="text" placeholder="请输入主办方" v-model="project.contractType.mainEfficiencyName" :disabled="!editable">
                      <template slot="prepend">主办方</template>
                    </el-input>
                  </el-col>
                  <el-col :span="9">
                    <el-input type="number" placeholder="请输入比例" v-model="project.contractType.mainEfficiencyRate" :disabled="!editable">
                      <template slot="prepend">比例</template>
                      <template slot="append">%</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row class="el-form-item" v-for="(item, index) in project.contractType.subEfficiencyArray" :key="index">
                  <el-col :span="9">
                    <el-input type="text" placeholder="请输入协办方" v-model="item.name" :disabled="!editable">
                      <template slot="prepend">协办方</template>
                    </el-input>
                  </el-col>
                  <el-col :span="9">
                    <el-input type="text" placeholder="请输入比例" v-model="item.rate" :disabled="!editable">
                      <template slot="prepend">比例</template>
                      <template slot="append">%</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2">
                    <h4 v-if="editable">
                      <a class="text-danger" @click="delEfficiencyFee(index)">
                        <img src="../../../../img/delete_icon.svg">
                      </a>
                    </h4>
                  </el-col>
                  <el-col :span="2">
                    <h4 v-if="editable">
                      <a class="text-danger" @click="addEfficiencyFee()">
                        <img src="../../../../img/add_icon.svg">
                      </a>
                    </h4>
                  </el-col>
                </el-row>
              </div>
             
          </el-col>
        </el-row> 
      </div>
      <!-- 摘牌信息 一会加上 -->
      <div v-if="delipotentShow" class="contract-pad">
        <table class="table table-bordered table-hover table-list">
          <thead>
            <tr>
              <td>
                摘牌情况
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="form-group">
                  <h5>摘牌部门
                    <span>
                    {{ project.subDepartment }}
                    </span>
                  </h5>  
                </div>
                <div class="form-group">
                  <h5>摘牌人员
                    <span>
                    {{ project.delipotentName }}
                    </span>
                  </h5> 
                </div>
              </td>
            </tr>
          </tbody>
        </table>
         <div class="form-group">
          <label for="remark" class="col-sm-3 control-label">{{ project.delipotentTime }}</label>
        </div> 
      </div>
      <el-row>
        <el-col :span="12">
          <div>
            <approver-advice class="advice" v-if="checkAdviceShow" :advices="biddingApproverArray">审核意见</approver-advice>
          </div>
           <!-- 所长通过不通过 -->
          <div v-if="directorAgreeShow">
            <div class="form-group">
              <label for="remark" class="col-sm-1 control-label"></label>
              <div class="col-sm-11 form-group">
                <button type="button" class="btn my-btn submit-btn" @click="approve()">通过</button>
                <button type="button" class="btn my-btn draft-btn" @click="showAdvice()">不通过</button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <!--调用组件的审核意见-->
          <div class="form-group">
            <approver-advice class="advice" v-if="checkAdviceShow" :advices="biddingApproverArray">审核意见</approver-advice>
          </div>
        </el-col>
      </el-row>
      <modal v-if="adviceShow">
        <div slot="body">
          <h4 class="adviceTitle">
            请填写修改意见
          </h4>
          <textarea class="form-control" rows="8" placeholder="请填写修改意见，不超过500个字" v-model="adviceText"></textarea>
        </div>
        <div slot="footer">
          <button type="button" class="btn my-btn submit-btn" @click="adviceUpload">提交</button>
          <button type="button" class="btn my-btn draft-btn" @click="adviceCancel">取消</button>
        </div>
      </modal>
      <!-- 入围或中标通知书-->
      <div v-if="noticePanel" class="contract-pad" >
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <td>电子合同附件</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="row">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">入围通知书</label>
                    <div class="col-sm-8">
                      <a :href="ruweiDoc.url" target="_blank">{{ ruweiDoc.name }}</a>
                    </div>
                    <div class="col-sm-2">
                      <upload-report :type="shortlistedNotice" :id="projectId" @uploadList="recRuweiDoc" @deleteDoc="deleteRuweiDoc" v-if="noticeUpload"></upload-report>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">中标通知书</label>
                    <div class="col-sm-8">
                      <a :href="zhongbiaoDoc.url" target="_blank">{{ zhongbiaoDoc.name }}</a>
                    </div>
                    <div class="col-sm-2">
                      <upload-report :type="bidNotice" :id="projectId" @uploadList="recZhongbiaoDoc" @deleteDoc="deleteZhongbiaoDoc" v-if="noticeUpload"></upload-report>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="finishBtn">
                  <div class="form-group">
                    <label class="col-sm-1 control-label"></label>
                    <div class="col-sm-11">
                      <button type="button" class="btn my-btn submit-btn" @click="uploadFinish()">上传完成</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-form>
    <modal v-show="cancelModal">
      <p slot="body" class="ta-c cancel-word">
        <i class="fa fa-exclamation-triangle fa-3x icon" aria-hidden="true"></i>
        撤销后项目将不存在，是否确定撤销？
      </p>
      <p slot="footer">
        <button class="btn my-btn submit-btn" @click="queding()">确定</button>
        <button class="btn my-btn draft-btn" @click="quxiao()">取消</button>
      </p>
    </modal>
  </div>
</template>

<style lang="sass" scoped>
  .contract-pad{
    padding-right:15px;
    padding-bottom: 15px;
  }
  .addi {
     padding: 6px 12px;
     width: 70px;
     font-size: 14px;
     font-weight: normal;
     color: #555555;
     text-align: center;
     background-color: #eeeeee;
     border: 1px solid #ccc;
     border-radius: 4px;
  }
  .basic-message {
    margin-top: 30px;
  }
  .pull-right {
    margin-right: 30px;
  }
  .bid-info-check {
    padding-left: 10px;
    > .main-title {
      margin-left: 20px;
    }
    > .project-editor {
      padding-left: 20px;
    }
    .business-type {
      h5 {
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 100px;
        + div {
          display: inline-block;
          span {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      }
    }
    .el-col {
      padding-right: 20px;
    }
  }
	.control-label {
		padding-top: 1px;
    margin-left: 10px;
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
  .type-system {
    .form-group {
      height: 36px;
      line-height: 36px;
      margin-bottom: 0;
      h5 {
        height: 36px;
        line-height: 36px;
      }
    }
  }
  p {
    height: 36px;
    line-height: 36px;
    margin-bottom: 0;
  }
  h5 {
    height: 36px;
    line-height: 36px;
  }
  .magic-checkbox + label:after {
    top: 10px;
  }
  .magic-radio + label:before, .magic-checkbox + label:before {
    top: 10px;
  }
  .magic-radio + label, .magic-checkbox + label {
      position: relative;
      display: inline-block;
      padding-left: 30px;
      margin-right: 12px;
      cursor: pointer;
      vertical-align: middle;
      font-size: 13px;
      font-weight: normal;
  }
  .plus + label:before {
      position: absolute;
      top: 1px;
      left: 2px;
      display: inline-block;
      width: 16px;
      height: 16px;
      content: '';
      border: 1px solid #c0c0c0;
  }

  .plus + label:after {
      top: 5px;
      left: 6px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #3e97eb;
  }
</style>

<script>
import axios from 'axios';
import uploadReport from './uploadReport.vue';
import modal from '../../../component/modal.vue';
import approverAdvice from '../../../component/approverAdvice.vue';
import currencyMask from '../../../currencyMask.js';

export default {
  name: 'bidInfoCheck',
  data() {
    return {
      project: this.iniProject,
      // project: {
      //   biddingStatus: '',
      //   contractType: {
      //     mainBasicRate: 0,
      //     mainEfficiencyRate: 0,
      //     subBasicArray: [{ "name": '', "rate": 0 }],
      //     subEfficiencyArray: [{ "name": '', "rate": 0 }]
      //   },
      //   departmentType: []
      // },
      cancelModal: false,
      labelPosition: 'left',
      rules: {
        source: [
          //
        ]
      },
      adviceText: '',  //审核不通过信息
      editBtn: false,  //编辑按钮
      brandBtn: false, //摘牌按钮
      checkBtn: false, //审核通过与不通过按钮
      user: {},        //身份信息
      delipotentShow: false,  //摘牌情况
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
    contractTypeChan() {
      return (this.project.contractType.type === '联合体') ? true : false;
    },
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
    },
    biddingApproverArray() {
      for (var i = 0; i < this.project.biddingApproverArray.length; i++) {
        if (this.project.biddingApproverArray[i].approverResult === '不通过') {
          this.project.biddingApproverArray[i].showTaga = true;
        }
        else {
          this.project.biddingApproverArray[i].showTaga = false;
        }
      }
      return this.project.biddingApproverArray;
    }
  },
  methods: {
    currencyMask,
    isCommonwealth() {
      this.commonwealthShow = true;
    },
    notCommonwealth() {
      this.commonwealthShow = false;
    },
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
      this.$emit('quedingDelete',this.project.id);
    },
    delBasicFee(index) {
      this.project.contractType.subBasicArray.splice(index,1);
    },
    addBasicFee() {
      this.project.contractType.subBasicArray.push({"name":'',"rate": 0});
    },
    delEfficiencyFee(index) {
      this.project.contractType.subEfficiencyArray.splice(index,1);
    },
    addEfficiencyFee() {
      this.project.contractType.subEfficiencyArray.push({"name":'',"rate": 0});
    },
    edit() {
      this.editable = true
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
      } else if (this.project.biddingStatus === "1"||this.project.biddingStatus === "2"||this.project.biddingStatus === "3"||this.project.biddingStatus === "4") {
        this.delipotentShow = true;
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
          console.log(123);
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
  props: ['biddingState','iniProject','inputType', 'editable'],
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
