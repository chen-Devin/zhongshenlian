<template>
  <form class="form-horizontal">
    <div class="form-group"
         v-if="business.contractNo!==''">
      <label class="col-sm-2 control-label">合同编号</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.contractNo}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">项目名称</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.name}}</p>
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
        <p class="form-control-static">{{business.institution}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">联系人电话</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institutionTele}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">报告使用目的</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.purpose}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">开始时间</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.startTime}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">结束时间</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.endTime}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">现场人数</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.peopleNum}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">企业规模</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.institutionScale}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">合同金额</label>
      <div class="col-sm-9">
        <p class="form-control-static">{{business.amount}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">申请人意见</label>
      <div class="col-sm-2">
        <p class="form-control-static">{{business.proposerOpinion}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">相关附件</label>
      <ul class="col-sm-9 attachment-list list-group">
        <li class="list-group-item"
            v-for="FILE in business.files">
          <span class="fa fa-file-text-o"></span>
          <a class="text-primary title"
             v-bind:href="FILE.url"
             target="_blank">{{FILE.name}}</a>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
export default {
  name: 'businessProfile',
  data() {
    return {
      business: this.initBusiness
    };
  },
  props: ['initBusiness']
};
</script>

<style lang="sass" scoped>
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  .attachment-list {
    > li.list-group-item {
      border-right: 0;
      border-left: 0;
      // height: 50px;
      // line-height: 30px;
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
