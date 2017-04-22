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
      <label class="col-sm-2 control-label">签订合同编号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">签订合同金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票申请人</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请人电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位联系人</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系人电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请开票种类</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票单位</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同类型</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位名称</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">累计开票金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">纳税人识别号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位地址</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">单位电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开户银行</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开户账号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请日期</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开票日期</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">送达方式</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">快递收件人</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">服务内容</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目开始时间</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目结束时间</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{}}</p>
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
