<template>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="col-sm-2 control-label">
        发票照片
      </label>
      <el-upload class="col-sm-10"
                 :multiple="false"
                 :action="uploadURL"
                 :on-success="uploadSuccess"
                 :show-file-list="false">
        <button class="btn btn-primary btn-sm" type="button">上传发票照片</button>
        <span slot="tip"
              class="text-info"
              v-if="editable">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <div class="col-sm-offset-2 col-sm-9">
        <ul class="attachment-list list-group">
          <li class="list-group-item" v-for="FILE in business.contracts">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right" @click="delFile(FILE)" v-if="editable"><i class="fa fa-times"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">
        发票照片
      </label>
      <el-upload class="col-sm-10"
                 :multiple="false"
                 :action="uploadURL"
                 :on-success="uploadSuccess"
                 :show-file-list="false">
        <button class="btn btn-primary btn-sm" type="button">上传已收款截图</button>
        <span slot="tip"
              class="text-info"
              v-if="editable">&emsp;文件大小建议不超过3Mb</span>
      </el-upload>
      <div class="col-sm-offset-2 col-sm-9">
        <ul class="attachment-list list-group">
          <li class="list-group-item" v-for="FILE in business.contracts">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right" @click="delFile(FILE)" v-if="editable"><i class="fa fa-times"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">
        发票照片
      </label>
      <ul class="col-sm-9 attachment-list list-group">
        <li class="list-group-item" v-for="FILE in business.contracts">
          <span class="fa fa-file-text-o"></span>
          <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
        </li>
      </ul>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">
        已收款截图
      </label>
      <ul class="col-sm-9 attachment-list list-group">
        <li class="list-group-item" v-for="FILE in business.contracts">
          <span class="fa fa-file-text-o"></span>
          <a class="text-primary title" :href="FILE.url" target="_blank">{{FILE.name}}</a>
        </li>
      </ul>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">签订合同编号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.number}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目名称</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">签订合同金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.contractAmount===''?'':`${business.contractAmount}万元`}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票申请人</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposer.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请人电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposer.tele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位联系人</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institution.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系人电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institution.telephone}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目计划时间</label>
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-6">
            <p class="form-control-static">开始时间：{{business.time.start}}</p>
          </div>
          <div class="col-sm-6">
            <p class="form-control-static">结束时间：{{business.time.end}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同体制</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.contractType.name}}</p>
      </div>
    </div>
    <div class="form-group"
         v-if="contractTypeChan">
      <label class="col-sm-2 control-label">基本取费</label>
      <div class="col-sm-9">
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
    <div class="form-group"
         v-if="contractTypeChan">
      <label class="col-sm-2 control-label">效益取费</label>
      <div class="col-sm-9">
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
    <div class="form-group">
      <label class="col-sm-2 control-label">累计开票金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.addUpAmount}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">本次开票金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.amount}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票单位</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.billingUnit}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请开票种类</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.type}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位名称</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.unit.name}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">纳税人识别号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.taxpayerID}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位地址</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.unit.address}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.unit.tele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开户银行</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.unit.depositBank}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开户账号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.unit.account}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请日期</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.filingDate}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票日期</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.billingDate}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">送达方式</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.way}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">快递收件人</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.receiver}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">服务内容</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{bill.content}}</p>
      </div>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Upload } from 'element-ui';

Vue.use(Upload);

export default {
  name: 'billingInforDetail',
  data() {
    return {
      paths: [
        { name: '待处理业务', url: '/business-handle-list-sales', present: false },
        { name: '业务详情', url: `/business-handle-detail-sales/${this.$route.params.id}`, present: false },
        { name: '开票信息', url: `/business-handle-detail-sales/${this.$route.params.id}/billing-infor`, present: true },
        { name: '开票详情', url: `/business-handle-detail-sales/${this.$route.params.id}/billing-infor/billing-infor-detail/${this.$route.params.billId}`, present: true }
      ],
      business: this.initBusiness
    };
  },
  computed: {
    contractTypeChan() {
      return (this.business.contractType.name === '联合体') ? true : false;
    }
  },
  props: ['initBusiness', 'user'],
  create() {
    this.$emit('pathsChan', this.paths);
  }
};
</script>

<style lang="sass" scoped>
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  .attachment-list {
    margin-top: 10px;
    > li.list-group-item {
      border-right: 0;
      border-left: 0;
      > a.title {
        margin-left: 7px;
      }
      > a.text-danger {
        cursor: pointer;
      }
    }
    > li.list-group-item:first-child {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
    > li.list-group-item:last-child {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
