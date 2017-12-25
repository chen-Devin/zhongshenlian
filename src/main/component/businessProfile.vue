<template>
  <el-form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent :label-position="labelPosition" label-width = "80px" >
      <div class="basic-message">        
        <p v-if="contractNumShow">项目编号：{{business.number}}</p>           
        <p>项目名称：{{business.name}}</p>
       <p>项目范围与审计目标：{{business.businessScope}}</p>
      </div>
      <hr>
      <div class="basic-message" style="border: none">
        <el-row>
          <el-col :span="8">
            <p>提交申请人：{{business.proposer.name}}</p>
          </el-col>
          <el-col :span="8">
            <p>客户联系人：{{business.institution.name}}</p>        
          </el-col>
          <el-col :span="8">
            <p>计划工期：{{business.time.start}} 至 {{business.time.end}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>委托单位（客户）：{{business.institution.customerName}}</p> 
          </el-col>
          <el-col :span="8">
            <p>项目类型：{{business.type}}</p>
          </el-col>
          <el-col :span="8">
            <p>项目取得方式：{{business.getWay}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>项目经理：{{business.manager.name}}</p>
          </el-col>
          <el-col :span="8">
            <p>合同预估金额：{{business.contractAmount===''?'':`${business.contractAmount}元`}}</p>
          </el-col>
          <el-col :span="8">
            <p>项目申请人电话：{{business.proposer.tele}}</p>       
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="被审计单位：" required label-width="110px">
              <template class="addition" v-for="(Unit, index) in business.beingAuditedUnit">
                <el-row>
                  <el-col :span="22">
                    <div v-if="editable">
                      <el-select v-model="Unit.unit" filterable placeholder="请选择">
                        <el-option
                          v-for="item in customerList"
                          :key="item.id"
                          :label="item.customerName"
                          :value="item.customerName">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="input-group" v-if="!editable">
                      <div>{{ Unit.unit }}</div>
                    </div>
                  </el-col>
                </el-row>
              </template>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <p>报价依据：{{business.basisQuote}}</p>
        </el-row>
        <hr>
        <el-row>
          <div class="d-f">
            <p style="width:100px;">出具报告类型：</p>
            <div class="check-wrap">
              <p class="d-ib">{{ reportType }}</p>
              <div class="type-wrapper">
                <template v-for="(TYPE, indexOuter) in business.report.type" v-if="TYPE.state">
                  <p class="bold-title">{{TYPE.name}}</p>
                  <p class="d-ib">{{ wordsMap(TYPE.words) }}</p>
                </template>
              </div>
            </div>
          </div>
        </el-row>
      </div>
      <div class="basic-message" v-if="showMore" style="border: none">
        <el-row>
          <el-col :span="8">
            <p>参审注师：{{ reviewCPAsName }}</p> 
          </el-col>
          <el-col :span="8">
            <p>参审助理：{{ reviewAssistantsName }}</p>           
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>报告数量：{{business.report.amount===''?'':`${business.report.amount}份（类）`}}</p>
          </el-col>
          <el-col :span="8">
            <p>报告用途：{{business.report.usage}}</p>    
          </el-col>
        </el-row>
        <hr>
        <el-row>
          <el-col :span="8">
            <p>合同体制：{{business.contractType.name}}</p>
            <div v-if="contractTypeChan">
              <p>基本取费</p>
              <div>
                <div class="row form-group">
                  <div class="col-sm-6">
                    <p>
                      主办方：{{business.contractType.basicFee.main.name}}
                    </p>
                  </div>
                  <div class="col-sm-5">
                    <p>
                      比例：{{business.contractType.basicFee.main.percentage}}%
                    </p>
                  </div>
                </div>
                <div class="row form-group"
                     v-for="(DEPEND, index) in business.contractType.basicFee.depend"
                     :key="index">
                  <div class="col-sm-6">
                    <p>
                      协办方：{{DEPEND.name}}
                    </p>
                  </div>
                  <div class="col-sm-5">
                    <p>
                      比例：{{DEPEND.percentage}}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="contractTypeChan">
              <p>效益取费</p>
              <div>
                <div class="row form-group">
                  <div class="col-sm-6">
                    <p>
                      主办方：{{business.contractType.benefitFee.main.name}}
                    </p>
                  </div>
                  <div class="col-sm-5">
                    <p>
                      比例：{{business.contractType.benefitFee.main.percentage}}%
                    </p>
                  </div>
                </div>
                <div class="row form-group"
                     v-for="(DEPEND, index) in business.contractType.benefitFee.depend"
                     :key="index">
                  <div class="col-sm-6">
                    <p>
                      协办方：{{DEPEND.name}}
                    </p>
                  </div>
                  <div class="col-sm-5">
                    <p>
                      比例：{{DEPEND.percentage}}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="business.feeBasisExist">
              <p>取费依据：{{business.feeBasis}}</p>
            </div>
            <div v-if="business.feeBasisExist">
              <p>费率：{{business.feeRate}}%</p>
            </div>
          </el-col>
          <el-col :span="8">
            <p>部门合作：{{business.departmentCoop.name}}</p>
            <div v-if="departmentCoopChan">
              <p>合作部门</p>
              <div>
                <div class="row form-group">
                  <div class="col-sm-6">
                    <p>
                      主要部门：{{business.departmentCoop.departments.main.name}}
                    </p>
                  </div>
                  <div class="col-sm-5">
                    <p>
                      比例：{{business.departmentCoop.departments.main.percentage}}%
                    </p>
                  </div>
                </div>
                <div class="row form-group"
                     v-for="(COOP, index) in business.departmentCoop.departments.coop"
                     :key="index">
                  <div class="col-sm-6">
                    <p>
                      合作部门：{{COOP.name}}
                    </p>
                  </div>
                  <div class="col-sm-5">
                    <p>
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
      <div @click="closeMore" v-if="showMore">
        收起
        <img src="../../img/arrow-up.png">
      </div>
      <div @click="checkMore" v-else>
        查看更多
        <img src="../../img/arrow-down.png">
      </div>
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
    reportType () {
      let arr = []
      this.business.report.type.forEach((item) => {
        if (item.state) {
          arr.push(item.name)
        }
      })
      return arr.join('、')
    },
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
                    <p>${wordsFormat}</p>
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
  },
  methods: {
    wordsMap(words) {
      let arr = []
      words.forEach((item) => {
        if (item.state) {
          arr.push(item.name)
        }
      })
      return arr.join('、')
    },
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
  background-color: #fff;
  text-align: center;
  margin: auto;
  div {
    display: inline-block;
    width: 140px;
    height: 34px;
    background-color: #f9fbfe;
    font-size: 13px;
    color: #4A90E2;
    line-height: 20px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    img {
      display: block;
      margin: 0 auto;
    }
  } 
}
.basic-message{
  margin-left: 30px;
  margin-right: 30px;
  border-top: 1px solid #dedede;
  margin-top: 10px;
  margin-bottom: 10px;
  &:last-child {
    border: none;
  }
  &:first-child {
    margin-top: 0;
    border: none;
  }
}
</style>
