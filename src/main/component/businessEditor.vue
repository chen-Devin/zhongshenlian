<template>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="col-sm-4 control-label">项目名称</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">提交申请人</label>
      <div class="col-sm-8">
        <p class="form-control-static"></p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">联系电话</label>
      <div class="col-sm-8">
        <p class="form-control-static"></p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">委托单位</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">联系人电话</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">报告使用目的</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">开始时间</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">结束时间</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">现场人数</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">企业规模</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">合同金额</label>
      <div class="col-sm-8">
        <input type="text">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-12 control-label">申请人意见</label>
      <div class="col-sm-12">
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-12 control-label">审批人意见</label>
      <div class="col-sm-12">
        <p class="form-control-static">
          <ul class="leader-list">
            <li></li>
          </ul>
        </p>
      </div>
    </div>
    <hr>
    <div class="form-group">
      <label class="col-sm-12 control-label">
        相关附件
        <button class="btn btn-primary pull-right">上传文件</button>
      </label>
      <div class="col-sm-12">
        <p class="form-control-static">
          <ul class="attachment-list">
            <li>
              <a href=""></a>
            </li>
          </ul>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'businessEditor'
};
</script>

<style lang="sass" scoped>

</style>
