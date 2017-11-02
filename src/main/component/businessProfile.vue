<template>
  <el-form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent :label-position="labelPosition" label-width = "80px" >
      <div class="basic-message">        
        <el-form-item label="项目编号" label-width = "80px" v-if="contractNumShow">
          <span>{{business.number}}</span>
        </el-form-item>              
        <el-form-item label="项目名称" label-width = "80px">
          <span class="form-control-static">{{business.name}}</span>
        </el-form-item>
        <el-form-item label="业务范围与审计目标" label-width = "160px">
          <span class="form-control-static">{{business.scope}}</span>
        </el-form-item>
      </div>
      <div class="basic-message" style="border: none">
        <el-row class="el-form-item">
          <el-col :span="8">
            <el-form-item label="提交申请人" label-width = "90px">
              <span class="form-control-static">{{business.proposer.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户联系人" label-width = "90px">
              <span class="form-control-static">{{business.institution.name}}</span>
            </el-form-item>            
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划工期" label-width = "80px">
              <span class="form-control-static">{{business.time.start}}</span>
              <span>至</span>
              <span class="form-control-static">{{business.time.end}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="8">
            <el-form-item label="委托单位（客户）" label-width = "120px">
              <span class="form-control-static">{{business.institution.customerName}}</span>
            </el-form-item>   
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型" label-width = "80px">
              <span class="form-control-static">{{business.type}}</span>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目取得方式" label-width = "100px">
              <span class="form-control-static">{{business.getWay}}</span>
            </el-form-item> 
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="8">
            <el-form-item label="项目经理">
              <span class="form-control-static">{{business.manager.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同预估金额" label-width = "100px">
              <span class="form-control-static">{{business.contractAmount===''?'':`${business.contractAmount}元`}}</span>
            </el-form-item>          
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目申请人电话" label-width = "110px">
              <span class="form-control-static">{{business.proposer.tele}}</span>
            </el-form-item>           
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-form-item label="被审计单位" label-width = "90px">
            <p class="form-control-static" v-for="auditedUnit in business.beingAuditedUnit">{{ auditedUnit.unit }}</p>
          </el-form-item>
        </el-row>
        <el-row class="el-form-item">
          <el-form-item label="报价依据">
            <span class="form-control-static">{{business.basisQuote}}</span>
          </el-form-item> 
        </el-row>
        <el-row class="el-form-item">
          <el-form-item label="出具报告类型" label-width = "100px">
            <div> <p
                 v-html="reportFormat"></p></div>
          </el-form-item>
        </el-row>
      </div>
      <div class="basic-message" v-if="showMore" style="border: none">
        <el-row class="el-form-item">
          <!-- <el-col :span="8" v-if="business.auditTime.exist"> -->
          <el-col :span="8">
            <el-form-item label="审计期间">
              <span class="form-control-static">{{business.auditTime.start}}</span>
              <span>至</span>
              <span class="form-control-static">{{business.auditTime.end}}</span>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="参审注师">
               <span class="form-control-static">{{ reviewCPAsName }}</span>
            </el-form-item>  
          </el-col>
          <el-col :span="8">
            <el-form-item label="报告用途">
              <span class="form-control-static">{{business.report.usage}}</span>
            </el-form-item>            
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="8">
            <el-form-item label="报告数量">
              <span class="form-control-static">{{business.report.amount===''?'':`${business.report.amount}份（类）`}}</span>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="参审助理">
              <span class="form-control-static">{{ reviewAssistantsName }}</span>
            </el-form-item>             
          </el-col>
          <!-- <el-col :span="8" v-if="business.auditTime.exist"> -->
          <el-col :span="8">
            <el-form-item label="上次报告事务所" label-width = "110px">
              <span class="form-control-static">{{business.lastOffice}}</span>
            </el-form-item> 
          </el-col>
        </el-row>
        <el-row class="el-form-item">
          <el-col :span="8">
            <el-form-item label="合同体制">
              <p>{{business.contractType.name}}</p>
              <div v-if="contractTypeChan">
                <p class="form-control-static">基本取费</p>
                <div>
                  <div class="row form-group">
                    <div class="col-sm-6">
                      <p class="form-control-static">
                        主办方：{{business.contractType.basicFee.main.name}}
                      </p>
                    </div>
                    <div class="col-sm-5">
                      <p class="form-control-static">
                        比例：{{business.contractType.basicFee.main.percentage}}%
                      </p>
                    </div>
                  </div>
                  <div class="row form-group"
                       v-for="(DEPEND, index) in business.contractType.basicFee.depend"
                       :key="index">
                    <div class="col-sm-6">
                      <p class="form-control-static">
                        协办方：{{DEPEND.name}}
                      </p>
                    </div>
                    <div class="col-sm-5">
                      <p class="form-control-static">
                        比例：{{DEPEND.percentage}}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="contractTypeChan">
                <label class="form-control-static">效益取费</label>
                <div>
                  <div class="row form-group">
                    <div class="col-sm-6">
                      <p class="form-control-static">
                        主办方：{{business.contractType.benefitFee.main.name}}
                      </p>
                    </div>
                    <div class="col-sm-5">
                      <p class="form-control-static">
                        比例：{{business.contractType.benefitFee.main.percentage}}%
                      </p>
                    </div>
                  </div>
                  <div class="row form-group"
                       v-for="(DEPEND, index) in business.contractType.benefitFee.depend"
                       :key="index">
                    <div class="col-sm-6">
                      <p class="form-control-static">
                        协办方：{{DEPEND.name}}
                      </p>
                    </div>
                    <div class="col-sm-5">
                      <p class="form-control-static">
                        比例：{{DEPEND.percentage}}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="business.feeBasisExist">
                <label class="form-control-static">取费依据:</label>
                <span class="form-control-static">{{business.feeBasis}}</span>
              </div>
              <div v-if="business.feeBasisExist">
                <label class="form-control-static">费率:</label>
                <span class="form-control-static">{{business.feeRate}}%</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门合作">
              <p>{{business.departmentCoop.name}}</p>
            </el-form-item>
            <div v-if="departmentCoopChan">
              <p class="form-control-static">合作部门</p>
              <div>
                <div class="row form-group">
                  <div class="col-sm-6">
                    <p class="form-control-static">
                      主要部门：{{business.departmentCoop.departments.main.name}}
                    </p>
                  </div>
                  <div class="col-sm-5">
                    <p class="form-control-static">
                      比例：{{business.departmentCoop.departments.main.percentage}}%
                    </p>
                  </div>
                </div>
                <div class="row form-group"
                     v-for="(COOP, index) in business.departmentCoop.departments.coop"
                     :key="index">
                  <div class="col-sm-6">
                    <p class="form-control-static">
                      合作部门：{{COOP.name}}
                    </p>
                  </div>
                  <div class="col-sm-5">
                    <p class="form-control-static">
                      比例：{{COOP.percentage}}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>   
        </el-row>
      </div>           
    <div class="showMore">
      <button type="button" @click="closeMore" v-if="showMore" class="el-icon-arrow-up">收起</button>
      <!-- <i class="el-icon-arrow-up"></i> -->
      <button type="button" @click="checkMore" class="el-icon-arrow-down" v-else>查看更多</button>
      <!-- <i class="el-icon-arrow-down"></i> -->
    </div>
    <div class="basic-message" style="border: none">
      <!-- <el-row  v-if="contractUploadShow">
        <el-col :span="2">
          <label class="control-label">正式合同</label>
        </el-col>
        <el-col :span="22">
          <el-upload 
             :multiple="false"
             :action="contractUpload.URL"
             :on-progress="contractUploadProgress"
             :on-success="contractUploadSuccess"
             :show-file-list="false">
          <button class="btn my-btn submit-btn"
                  type="button"
                  :disabled="contractUpload.progressShow">点击上传</button>
          <span slot="tip" class="text-info">&emsp;文件大小建议不超过3Mb</span>
          </el-upload>
          <label class="control-label"></label>
          <div>
            <div class="progress-wrap" v-show="contractUpload.progressShow">
              <div class="progress">
                <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: contractUpload.percentage}">
                  {{contractUpload.percentage}}
                </div>
              </div>
            </div>
          </div>
          <label class="control-label"></label>
          <div>
            <ul class="com-list attachment-list list-group">
              <li class="list-group-item"
                  v-for="(FILE,index) in business.contracts"
                  :key="index">
                <span class="fa fa-file-text-o"></span>
                <a class="text-primary title"
                   :href="FILE.url"
                   target="_blank">{{FILE.name}}</a>
                <a class="text-danger pull-right"
                   @click="contractDelFile(FILE)"><i class="fa fa-times"></i></a>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row> -->
      <!-- <el-row>
        <el-col :span="2" v-if="contractFileShow">
          <label class="control-label">正式合同</label>
        </el-col>
        <el-col :span="22">
          <ul class=" com-list attachment-list list-group">
            <li class="list-group-item"
                v-for="(FILE,index) in business.contracts"
                :key="index">
              <span class="fa fa-file-text-o"></span>
              <a class="text-primary title"
                 :href="FILE.url"
                 target="_blank">{{FILE.name}}</a>
            </li>
          </ul>
        </el-col>
      </el-row> -->
    </div>
  </el-form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import card from '@/main/component/card.vue'
import bus from '../bus.js';


export default {
  name: 'businessProfile',
  data() {
    return {
      paths: [],
      business: this.initBusiness,
      contractUpload: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      },
      showMore: false,
      labelPosition: 'left'
    };
  },
  computed: {
    reviewCPAsName () {
      let arr = []
      if (this.business.reviewCPA.name instanceof Array) {
        this.business.reviewCPA.name.forEach((item) => {
          arr.push(item.name)
        })
      }
      return arr.join(',')
    },
    reviewAssistantsName () {
      let arr = []
      if (this.business.reviewAssistant.name instanceof Array) {
        this.business.reviewAssistant.name.forEach((item) => {
          arr.push(item.name)
        })
      }
      return arr.join(',')
    },
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    },
    departmentCoopChan() {
      return (this.business.departmentCoop.name === '有部门合作') ? true : false;
    },
    reportFormat() {
      let out = '';
      let typeEx = false;
      let wordsFormat = '';
      for (let i = 0; i < this.business.report.type.length; i++) {
        typeEx = false;
        wordsFormat = '';
        for (let j = 0; j < this.business.report.type[i].words.length; j++) {
          if (this.business.report.type[i].words[j].state) {
            typeEx = true;
            wordsFormat += this.business.report.type[i].words[j].name + ' ';
          }
        }
        if (typeEx) {
          out += `<p>${this.business.report.type[i].name}</p>
                    <p class="form-control-static">${wordsFormat}</p>
                  <hr>`;
        }
      }
      return out;
    },
    // contractUploadShow() {
    //   return (this.user.department === '业务部' && this.business.projectStatus >= 60 && this.business.projectStatus < 80) ? true : false;
    // },
    contractFileShow() {
      if (this.user.department === '业务部') {
        if (this.business.projectStatus >= 80) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.business.projectStatus >= 70) {
          return true;
        } else {
          return false;
        }
      }
    },
    contractNumShow() {
      return (this.business.projectStatus >= 80) ? true : false;
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.business.id,
      type: 'electronicContract'
    };
    this.contractUpload.URL = '/fileUpload?data=' + JSON.stringify(data);

    // if (this.user.department === '业务部') {
    //   this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/business-profile`, present: false });
    //   this.paths.push({ name: '业务概况', url: `/business-handle-detail-sales-${this.$route.params.id}/business-profile`, present: true });
    // } else if (this.user.department === '风险评估部') {
    //   this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/business-profile`, present: false });
    //   this.paths.push({ name: '业务概况', url: `/business-handle-detail-risk-${this.$route.params.id}/business-profile`, present: true });
    // } else if (this.user.department === '所长') {
    //   this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/business-profile`, present: false });
    //   this.paths.push({ name: '业务概况', url: `/business-handle-detail-leader-${this.$route.params.id}/business-profile`, present: true });
    // } else if (this.user.department === '办公室') {
    //   this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/business-profile`, present: false });
    //   this.paths.push({ name: '业务概况', url: `/business-handle-detail-office-${this.$route.params.id}/business-profile`, present: true });
    // } else if (this.user.department === '财务部') {
    //   this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/business-profile`, present: false });
    //   this.paths.push({ name: '业务概况', url: `/business-handle-detail-financial-${this.$route.params.id}/business-profile`, present: true });
    // } else if (this.user.department === '档案部') {
    //   this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
    //   this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/business-profile`, present: false });
    //   this.paths.push({ name: '业务概况', url: `/business-handle-detail-archives-${this.$route.params.id}/business-profile`, present: true });
    // }
    // this.$emit('pathsChan', this.paths);
  },
  methods: {
    checkMore() {
      this.showMore = true
    },
    closeMore() {
      this.showMore = false
    },
    contractUploadProgress(event, file, fileList) {  // file对象都有哪些属性
      this.contractUpload.progressShow = true;       // 有空再看一下，写一个组件
      this.contractUpload.percentage = parseInt(file.percentage)+'%';
    },
    contractUploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.business.contracts.push(obj);
        this.$emit('uploaded', this.business);
        setTimeout(() => {
          this.contractUpload.percentage = '0%';
          this.contractUpload.progressShow = false;
        }, 500);
      }
    },
    contractDelFile(FILE) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: FILE.id,
              type: 'electronicContract'
            }
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.business.contracts.length; i++) {
            if (this.business.contracts[i].id === FILE.id) {
              this.business.contracts.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.business);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    }
  },
  components: {
    card
  }
};
</script>

<style lang="sass" scoped>
.showMore{
  text-align: center;
  margin: auto;
  button {
    width: 100px;
    height: 40px;
    background-color: #fff;
    font-size: 15px;
    line-height: 40px;
    color: #7FEBFA;
    border: none;
    cursor: pointer;
  } 
}
.control-label {
  width: 120px;
}
.el-col-8{
  text-overflow: ellipsis;
}
.el-row{
  text-overflow: ellipsis;
}
.basic-message{
  margin-left: 30px;
  margin-right: 30px;
  border-bottom: 1px solid #dedede;
  margin-top: 0;
  margin-bottom: 10px;
}
.check-code {
  margin-top: -6px;
  margin-left: 10px;
}
</style>
