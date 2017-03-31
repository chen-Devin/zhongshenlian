<template>
  <modal>
    <form slot="body">
      <div class="form-group">
        <label for="staff-name" class="control-label">姓名</label>
        <input type="text" class="form-control" placeholder="请输入职员姓名" v-model="staff.name">
      </div>
      <div class="form-group">
        <label for="staff-sex" class="control-label">性别</label>
        <label class="radio-inline">
          <input type="radio" name="staff-sex" value="man" v-model="staff.gender"> 男
        </label>
        <label class="radio-inline">
          <input type="radio" name="staff-sex" value="woman" v-model="staff.gender"> 女
        </label>
      </div>
      <div class="form-group">
        <label for="staff-telephone" class="control-label">手机号</label>
        <input type="tele" class="form-control" placeholder="请输入职员手机号码" v-model="staff.telephone">
      </div>
      <div class="form-group">
        <label for="staff-job-number" class="control-label">工号</label>
        <input type="text" class="form-control" placeholder="请输入工号" v-model="staff.jobNumber">
      </div>
      <div class="form-group">
        <label for="staff-duty" class="control-label">职务</label>
        <input type="text" class="form-control" placeholder="请输入职务" v-model="staff.duties">
      </div>
      <div class="form-group">
        <label for="staff-duty" class="control-label">所属部门</label>
        <input type="text" class="form-control" placeholder="请输入所属部门" v-model="staff.department">
      </div>
      <div class="form-group">
        <label for="staff-duty" class="control-label">备注</label>
        <input type="text" class="form-control" placeholder="请输入备注" v-model="staff.remark">
      </div>
    </form>
    <div slot="footer">
      <button class="btn btn-primary modal-default-button" v-on:click="save()">
        保存
      </button>
      <button class="btn btn-default modal-default-button" v-on:click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import _ from 'lodash';
import modal from './modal.vue';

export default {
  name: 'modModal',
  data() {
    return {
      staff: _.cloneDeep(this.initalStaff)
    };
  },
  props: ['initalStaff'],
  mothods: {
    save() {
      axios().then((rep)=>{
        $emit('saved', this.staff);
      }, (rep)=>{});
    },
    cancel() {
      $emit('canceled');
    }
  }
}
</script>

<style>

</style>
