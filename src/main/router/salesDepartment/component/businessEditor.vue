<template>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="col-sm-2 control-label">项目名称</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入项目名称"
               v-model="business.name"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">提交申请人</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposerName}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.proposerTele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">委托单位</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入委托单位"
               v-model="business.institution"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系人电话</label>
      <div class="col-sm-9">
        <input type="tel"
               class="form-control"
               placeholder="请输入联系人电话"
               v-model="business.institutionTele"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告使用目的</label>
      <div class="col-sm-9">
        <input type="text"
               class="form-control"
               placeholder="请输入报告使用目的"
               v-model="business.purpose"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开始时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入开始时间"
               v-model="business.startTime"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">结束时间</label>
      <div class="col-sm-9">
        <input type="date"
               class="form-control"
               placeholder="请输入结束时间"
               v-model="business.endTime"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">现场人数</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入现场人数"
               v-model="business.peopleNum"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">企业资产规模</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入企业资产规模"
               v-model="business.institutionScale"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同金额</label>
      <div class="col-sm-9">
        <input type="number"
               class="form-control"
               placeholder="请输入合同金额"
               v-model="business.amount"
               v-bind:readonly="!editable">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请人意见</label>
      <div class="col-sm-9">
        <textarea cols="30"
                  rows="10"
                  class="form-control"
                  placeholder="请输入申请人意见"
                  v-model="business.proposerOpinion"
                  v-bind:readonly="!editable"></textarea>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">
        相关附件
      </label>
      <div class="col-sm-9 text-right">
        <button class="btn btn-primary pull-right">上传文件</button>
      </div>
      <div class="col-sm-12">
        <p class="form-control-static">
          <ul class="attachment-list">
            <li v-for="File in business.files">
              <a v-bind:href="File.addr" target="_blank"></a>
            </li>
          </ul>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import bus from '../../../bus.js';

export default {
  name: 'businessEditor',
  data() {
    return {
      business: this.initBusiness
    };
  },
  props: ['initBusiness', 'editable'],
  created() {
    bus.$on('submit', ()=>console.log('it works!'));
  },
};
</script>

<style lang="sass" scoped>
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  textarea {
    resize: vertical;
  }
}
</style>
