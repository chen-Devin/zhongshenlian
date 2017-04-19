<template>
  <modal>
    <form class="form-horizontal clearfix"
          slot="body">
      <div class="form-group"
           :class="{'has-error': !staff.name.ver}">
        <label class="col-sm-3 control-label">姓名</label>
        <div class="col-sm-9">
          <input type="text"
                 class="form-control"
                 placeholder="请输入职员姓名"
                 v-model="staff.name.val">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-3 control-label">性别</label>
        <div class="col-sm-9">
          <label class="radio-inline">
            <input type="radio"
                   name="staff-sex"
                   value="男"
                   v-model="staff.gender.val"> 男
          </label>
          <label class="radio-inline">
            <input type="radio"
                   name="staff-sex"
                   value="女"
                   v-model="staff.gender.val"> 女
          </label>
        </div>
      </div>
      <div class="form-group"
           :class="{'has-error': !staff.telephone.ver}">
        <label class="col-sm-3 control-label">手机号</label>
        <div class="col-sm-9">
          <input type="tel"
                 class="form-control"
                 placeholder="请输入职员手机号码"
                 v-model="staff.telephone.val">
        </div>
      </div>
      <div class="form-group"
           :class="{'has-error': !staff.jobNumber.ver}">
        <label class="col-sm-3 control-label">工号</label>
        <div class="col-sm-9">
          <input type="text"
                 class="form-control"
                 placeholder="请输入工号"
                 v-model="staff.jobNumber.val">
        </div>
      </div>
      <div class="form-group"
           :class="{'has-error': !staff.duties.ver}">
        <label class="col-sm-3 control-label">职务</label>
        <div class="col-sm-9">
          <input type="text"
                 class="form-control"
                 placeholder="请输入职务"
                 v-model="staff.duties.val">
        </div>
      </div>
      <div class="form-group"
           :class="{'has-error': !staff.department.ver}">
        <label class="col-sm-3 control-label">所属部门</label>
        <div class="col-sm-9">
          <input type="text"
                 class="form-control"
                 placeholder="请输入所属部门"
                 readonly
                 v-model="staff.department.val">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-3 control-label">备注</label>
        <div class="col-sm-9">
          <input type="text"
                 class="form-control"
                 placeholder="请输入备注"
                 v-model="staff.remark.val">
        </div>
      </div>
      <div class="alert alert-danger well-sm"
           v-show="alert.show">
        {{alert.cont}}
      </div>
    </form>
    <div slot="footer">
      <button class="btn btn-primary modal-default-button"
              @click="save()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn btn-default modal-default-button"
              @click="cancel()">
        取消
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from '../../../component/modal.vue';

export default {
  name: 'staffModModal',
  data() {
    return {
      staff: (() => {
        return {
          id: {
            val: this.initalStaff.id
          },
          name: {
            val: this.initalStaff.name,
            ver: this.initalStaff.name === '' ? false : true
          },
          gender: {
            val: this.initalStaff.gender === '' ? '男' : this.initalStaff.gender
          },
          telephone: {
            val: this.initalStaff.telephone,
            ver: (() => {
              let reg = /^(1+\d{10})$/;
              if (this.initalStaff.telephone === '') {
                return false;
              } else if (!reg.test(this.initalStaff.telephone)) {
                return false;
              } else {
                return true;
              }
            })()
          },
          jobNumber: {
            val: this.initalStaff.jobNumber,
            ver: this.initalStaff.jobNumber === '' ? false : true
          },
          duties: {
            val: this.initalStaff.duties,
            ver: this.initalStaff.duties === '' ? false : true
          },
          department: {
            val: this.initalStaff.department,
            ver: this.initalStaff.department === '' ? false : true
          },
          remark: {
            val: this.initalStaff.remark
          },
        }
      })(),
      alert: {
        show: false,
        cont: ''
      },
      subBtn: {
        dis: false,
        cont: '保存'
      }
    };
  },
  props: ['initalStaff'],
  methods: {
    save() {
      let reg = /^(1+\d{10})$/;
      this.alert.show = false;
      this.alert.cont = '';
      if (this.staff.name.val === '') {
        this.staff.name.ver = false;
      } else {
        this.staff.name.ver = true;
      }
      if (this.staff.telephone.val === '') {
        this.staff.telephone.ver = false;
      } else if (!reg.test(this.staff.telephone.val)) {
        this.staff.telephone.ver = false;
      } else {
        this.staff.telephone.ver = true;
      }
      if (this.staff.jobNumber.val === '') {
        this.staff.jobNumber.ver = false;
      } else {
        this.staff.jobNumber.ver = true;
      }
      if (this.staff.duties.val === '') {
        this.staff.duties.ver = false;
      } else {
        this.staff.duties.ver = true;
      }
      if (this.staff.department.val === '') {
        this.staff.department.ver = false;
      } else {
        this.staff.department.ver = true;
      }
      if (!(this.staff.name.ver && this.staff.telephone.ver && this.staff.jobNumber.val && this.staff.duties.ver && this.staff.department.ver)) {
        this.alert.show = true;
        this.alert.cont = '您有信息尚未输入或信息格式有误，请检查';
      } else {
        this.subBtn.dis = true;
        this.subBtn.cont = '保存中...';
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              var obj = {
                command: 'editUser',
                platform: 'web',
                editUserId: this.staff.id.val,
                phone: this.staff.telephone.val,
                jobNumber: this.staff.jobNumber.val,
                userName: this.staff.name.val,
                gender: this.staff.gender.val,
                remark: this.staff.remark.val,
                department: this.staff.department.val,
                duity: this.staff.duties.val,
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.subBtn.cont = '已保存';
            this.$emit('saved', this.staff);
          }
        }, (rep) => { });
      }
    },
    cancel() {
      this.$emit('canceled');
    }
  },
  components: {
    modal
  }
};
</script>

<style>

</style>
