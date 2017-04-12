<template>
  <form class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-12">
        <el-upload v-bind:multiple="false"
                   v-bind:action="uploadURL"
                   v-bind:on-success="uploadSuccess"
                   v-bind:show-file-list="false">
          <button class="btn btn-primary" type="button">上传已经收款到账截图</button>
        </el-upload>
        <button class="btn btn-primary" type="button">确认开票</button>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12">
        <ul class="contract-list list-group">
          <li class="list-group-item" v-for="FILE in business.contractAnnexArray">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title" v-bind:href="FILE.url" target="_blank">{{FILE.name}}</a>
            <a class="text-danger pull-right" v-on:click="delFile(FILE)" v-if="editable"><i class="fa fa-times"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票申请人</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入开票申请人"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">电话</label>
      <div class="col-sm-9">
        <input type="tel"
               class="form-control"
               placeholder="请输入联系电话"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位联系人</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入委托单位联系人"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系人电话</label>
      <div class="col-sm-9">
        <input type="tel"
               class="form-control"
               placeholder="请输入联系人电话"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请开票种类</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入申请开票种类"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目名称</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入项目名称"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票金额</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入开票金额"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位名称</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入单位名称"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">纳税人识别号</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入纳税人识别号"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位地址</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入单位地址"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位电话</label>
      <div class="col-sm-9">
        <input type="tel"
               class="form-control"
               placeholder="请输入单位电话"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开户银行</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入开户银行"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开户账号</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入开户账号"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请日期</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入申请日期"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">累计开票金额</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入累计开票金额"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票日期</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入开票日期"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">送达方式</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入送达方式"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">快递收件人</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入快递收件人"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">签订合同编号</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入签订合同编号"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">服务内容</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入服务内容"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">签订合同金额</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入签订合同金额"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目开始服务时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入项目开始服务时间"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目结束服务时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入项目结束服务时间"
               v-model="business.name">
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
  name: 'billingInfor',
};
</script>

<style lang="sass" scoped>
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
