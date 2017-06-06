<template>
  <div>
    <div class="page-header">
      <h4>
        招投标信息详情
      </h4>
    </div>
    <form class="form-horizontal" @submit.prevent @keyup.enter.prevent>
      <button type="button" class="btn my-btn submit-btn f-r mt" @click="isEdit" v-if="editBtn">编辑</button>
      <button type="button" class="btn my-btn submit-btn f-r mt" @click="delisting" v-if="brandBtn">摘牌</button>
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
      <div class="form-group">
        <label class="col-sm-2 control-label">业务类型：</label>
        <div class="col-sm-10">
          <span v-for="item in departmentTypeMap">{{ item + " " }}</span>
        </div>
      </div>
      <!--会计所单独内容-->
      <div v-if="kjsContentShow">
        <div class="form-group">
          <label class="col-sm-2 control-label">会计所：</label>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">招标内容：</label>
          <div class="col-sm-10">
            <span v-for="item in project.kjsBiddingContent">{{ item + " " }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="ownershipStructure" class="col-sm-2 control-label">股权结构：</label>
          <div class="col-sm-10">
            {{ project.kjsOwnershipStructure }}
          </div>
        </div>
        <div class="form-group">
          <label for="totalAssets" class="col-sm-2 control-label">资产总额：</label>
          <div class="col-sm-10">
            <div class="input-group">
              {{ project.totalAssets + "元" }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="location" class="col-sm-2 control-label">坐落地点：</label>
          <div class="col-sm-10">
            {{ project.location }}
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
            <span v-for="item in project.pgsBiddingContent">{{ item + " " }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="ownershipStructure" class="col-sm-2 control-label">股权结构：</label>
          <div class="col-sm-10">
            {{ project.pgsOwnershipStructure }}
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
            <span v-for="item in project.swsBiddingContent">{{ item + " " }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="ownershipStructure" class="col-sm-2 control-label">股权结构：</label>
          <div class="col-sm-10">
            {{ project.swsOwnershipStructure }}
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
            <span v-for="item in project.zjsBiddingContent">{{ item + " " }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="zjsFundSource" class="col-sm-2 control-label">资金来源及比例：</label>
          <div class="col-sm-10">
            <span v-for="item in project.zjsFundSource">{{ item + " " }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="scale" class="col-sm-2 control-label">建设规模：</label>
          <div class="col-sm-10">
            <div class="row">
              <div class="col-sm-4">
                {{ project.zjsArea }}
              </div>
              <div class="col-sm-4">
                {{ project.zjsLength }}
              </div>
              <div class="col-sm-4">
                {{ project.totalAssets }}
              </div>
            </div>
          </div>
        </div>
        <!-- 建设地点坐落地点重复-->
        <div class="form-group">
          <label for="location" class="col-sm-2 control-label">建设地点：</label>
          <div class="col-sm-10">
            {{ project.zjsLocation }}
          </div>
        </div>
        <div class="form-group">
          <label for="serviceTerm" class="col-sm-2 control-label">服务期限：</label>
          <div class="col-sm-10">
            {{ project.serviceTerm }}
          </div>
        </div>
        <hr>
      </div>
      <div class="form-group">
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
              </div>
              <div class="col-sm-1"></div>
              <div class="col-sm-5">
                <div class="row">
                  <div class="col-sm-4">比例</div>
                  <div class="col-sm-8">{{ project.contractType.mainBasicRate + "%"}}</div>
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
                <div class="row">
                  <div class="col-sm-4">协办方</div>
                  <div class="col-sm-8">{{ item.name }}</div>
                </div>
              </div>
              <div class="col-sm-1"></div>
              <div class="col-sm-5">
                <div class="row">
                  <div class="col-sm-4">比例</div>
                  <div class="col-sm-8">{{ item.rate + "%" }}</div>
                </div>
              </div>
              <div class="col-sm-1">

              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">效益取费：</label>
          <div class="col-sm-10">
            <div class="row">
              <div class="col-sm-5">
                <div class="row">
                  <div class="col-sm-4">主办方</div>
                  <div class="col-sm-8">{{ project.contractType.mainEfficiencyName }}</div>
                </div>
              </div>
              <div class="col-sm-1"></div>
              <div class="col-sm-5">
                <div class="row">
                  <div class="col-sm-4">比例</div>
                  <div class="col-sm-8">{{ project.contractType.mainEfficiencyRate + "%" }}</div>
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
                <div class="row">
                  <div class="col-sm-4">协办方</div>
                  <div class="col-sm-8">{{ item.name }}</div>
                </div>
              </div>
              <div class="col-sm-1"></div>
              <div class="col-sm-5">
                <div class="row">
                  <div class="col-sm-4">比例</div>
                  <div class="col-sm-8">{{ item.rate + "%" }}</div>
                </div>
              </div>
              <div class="col-sm-1">

              </div>
            </div>
          </div>
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
          {{ project.controlPrice + "元"}}
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
          {{project.bidDocumentPrice + "元"}}
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
          {{ project.tenderValidityPeriod + "天"}}
        </div>
      </div>
      <div class="form-group">
        <label for="bidBond" class="col-sm-2 control-label">投标保证金：</label>
        <div class="col-sm-10">
          {{ project.bidBond + "元"}}
        </div>
      </div>
      <!--标书费-->
      <div class="form-group">
        <label for="tenderFee" class="col-sm-2 control-label">标书费：</label>
        <div class="col-sm-10">
          {{ project.tenderFee + "元"}}
        </div>
      </div>
      <!--中标服务费-->
      <div class="form-group">
        <label for="winningServiceFee" class="col-sm-2 control-label">中标服务费：</label>
        <div class="col-sm-10">
          {{ project.winningServiceFee + "元"}}
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
      <!--备注-->
      <div class="form-group">
        <label for="remark" class="col-sm-2 control-label">备注：</label>
        <div class="col-sm-10">
          {{ project.remark }}
        </div>
      </div>
      <hr>
      <!-- 摘牌信息 一会加上-->
      <div v-if="delipotentShow">
        <table class="table table-bordered table-handle">
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
                  <label class="col-sm-2 control-label">摘牌部门：</label>
                  <div class="col-sm-10">
                    {{ project.subDepartment }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="remark" class="col-sm-2 control-label">摘牌人员：</label>
                  <div class="col-sm-10">
                    {{ project.delipotentName }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="form-group">
          <label for="remark" class="col-sm-3 control-label">{{ project.delipotentTime }}</label>
        </div>
      </div>
      <!-- 所长通过不通过-->
      <div v-if="directorAgreeShow">
        <div class="form-group">
          <label for="remark" class="col-sm-1 control-label"></label>
          <div class="col-sm-11">
            <button type="button" class="btn my-btn submit-btn" @click="approve()">通过</button>
            <button type="button" class="btn my-btn draft-btn" @click="showAdvice()">不通过</button>
          </div>
        </div>
      </div>
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
      <!--调用组件的审核意见-->
      <div class="form-group">
        <approver-advice class="advice"  v-if="checkAdviceShow" :advices="biddingApproverArray">审核意见</approver-advice>
      </div>
      <!-- 入围或中标通知书-->
      <div v-if="noticePanel">
        <table class="table table-bordered table-handle table-contract">
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
                    <label class="col-sm-2 control-label">入围通知书：</label>
                    <div class="col-sm-8">
                      <a :href="ruweiDoc.url" download>{{ ruweiDoc.name }}</a>
                    </div>
                    <div class="col-sm-2">
                      <upload-report :type="shortlistedNotice" :id="projectId" @uploadList="recRuweiDoc" @deleteDoc="deleteRuweiDoc" v-if="noticeUpload"></upload-report>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">中标通知书：</label>
                    <div class="col-sm-8">
                      <a :href="zhongbiaoDoc.url" download>{{ zhongbiaoDoc.name }}</a>
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
    </form>
  </div>
</template>

<style lang="sass" scoped>
	.control-label {
		padding-top: 1px;
	}
	.f-r {
		float: right;
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
      adviceText: '',
      editBtn: false,
      brandBtn: false,
      checkBtn: false,
      user: {},
      delipotentShow: true,
      directorAgreeShow: false,
      commonwealthShow: false,
      finishBtn: false,
      noticePanel: false,
      noticeUpload: false,
      adviceShow: false,
      checkAdviceModal: false,
      checkAdviceShow: false,
      bidNotice: 'bidNotice',
      shortlistedNotice: 'shortlistedNotice',
      projectId: this.$route.params.id,
      ruweiDoc: {},
      zhongbiaoDoc: {},
      adviceContent: ''
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
    recRuweiDoc(fileList) {
      this.ruweiDoc = fileList[0];
    },
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
    recZhongbiaoDoc(fileList) {
      this.zhongbiaoDoc = fileList[0];
    },
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
    closeAdviceContent() {
      this.checkAdviceModal = false;
    },
    showCommonwealth() {
      if (this.project.contractType.type === "联合体") {
        this.commonwealthShow = true;
      }
    }
  },
  props: ['biddingState'],
  created() {
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
