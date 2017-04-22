<template>
  <form class="form-horizontal">
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
        <input type="text"
               class="form-control"
               placeholder="请输入签订合同编号"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">签订合同金额</label>
      <div class="col-sm-9">
        <input type="tel"
               class="form-control"
               placeholder="请输入签订合同金额"
               v-model="business.name">
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
      <label class="col-sm-2 control-label">申请人电话</label>
      <div class="col-sm-9">
        <input type="tel"
               class="form-control"
               placeholder="请输入申请人电话"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入委托单位"
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
        <input type="number"
               class="form-control"
               placeholder="请输入联系人电话"
               v-model.number="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请开票种类</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入单位名称"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票单位</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入纳税人识别号"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同类型</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入单位地址"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位名称</label>
      <div class="col-sm-9">
        <input type="tel"
               class="form-control"
               placeholder="请输入单位名称"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">累计开票金额</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入累计开票金额"
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
        <input type="date"
               class="form-control"
               placeholder="请输入单位地址"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位电话</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入单位电话"
               v-model.number="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开户银行</label>
      <div class="col-sm-9">
        <input type="date"
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
        <input type="text"
               class="form-control"
               placeholder="请输入申请日期"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票日期</label>
      <div class="col-sm-9">
        <input type="text"
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
               placeholder="请输入服务内容"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">快递收件人</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入签订合同金额"
               v-model.number="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">服务内容</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入服务内容"
               v-model.number="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目开始时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入项目开始服务时间"
               v-model="business.name">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目结束时间</label>
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
  name: 'billingInforDetail',
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
