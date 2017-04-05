<template>
  <modal>
    <form slot="body">
      <div class="form-group" v-bind:class="{'has-error': !staff.name.ver}">
        <label for="staff-name" class="control-label">姓名</label>
        <input type="text" class="form-control" placeholder="请输入职员姓名" v-model="staff.name.val">
      </div>
      <div class="form-group">
        <label for="staff-sex" class="control-label staff-sex">性别</label>
        <label class="radio-inline">
          <input type="radio" name="staff-sex" value="男" v-model="staff.gender.val"> 男
        </label>
        <label class="radio-inline">
          <input type="radio" name="staff-sex" value="女" v-model="staff.gender.val"> 女
        </label>
      </div>
      <div class="form-group" v-bind:class="{'has-error': !staff.telephone.ver}">
        <label for="staff-telephone" class="control-label">手机号</label>
        <input type="tel" class="form-control" placeholder="请输入职员手机号码" v-model="staff.telephone.val">
      </div>
      <div class="form-group" v-bind:class="{'has-error': !staff.jobNumber.ver}">
        <label for="staff-job-number" class="control-label">工号</label>
        <input type="text" class="form-control" placeholder="请输入工号" v-model="staff.jobNumber.val">
      </div>
      <div class="form-group" v-bind:class="{'has-error': !staff.duties.ver}">
        <label for="staff-duty" class="control-label">职务</label>
        <input type="text" class="form-control" placeholder="请输入职务" v-model="staff.duties.val">
      </div>
      <div class="form-group" v-bind:class="{'has-error': !staff.department.ver}">
        <label for="staff-duty" class="control-label">所属部门</label>
        <input type="text" class="form-control" placeholder="请输入所属部门" readonly v-model="staff.department.val">
      </div>
      <div class="form-group">
        <label for="staff-duty" class="control-label">备注</label>
        <input type="text" class="form-control" placeholder="请输入备注" v-model="staff.remark.val">
      </div>
      <div class="alert alert-danger well-sm"
           v-show="alert.show">
        {{alert.cont}}
      </div>
    </form>
    <div slot="footer">
      <button class="btn btn-primary modal-default-button" v-on:click="save()" v-bind:disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn btn-default modal-default-button" v-on:click="cancel()">
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
  name: 'staffAddModal',
  data() {
    return {
      staff: (()=>{
        return {
          id: {
            val: ''
          },
          name: {
            val: '',
            ver: true
          },
          gender: {
            val: '男'
          },
          telephone: {
            val: '',
            ver: true
          },
          jobNumber: {
            val: '',
            ver: true
          },
          duties: {
            val: '',
            ver: true
          },
          department: {
            val: this.thisDepart.department,
            ver: true
          },
          remark: {
            val: ''
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
  props: ['thisDepart'],
  methods: {
    save() {
      let reg = /^(1+\d{10})$/;
      this.alert.show = false;
      this.alert.cont = '';
      if (this.staff.name.val==='') {
        this.staff.name.ver = false;
      } else {
        this.staff.name.ver = true;
      }
      if (this.staff.telephone.val==='') {
        this.staff.telephone.ver = false;
      } else if (!reg.test(this.staff.telephone.val)) {
        this.staff.telephone.ver = false;
      } else {
        this.staff.telephone.ver = true;
      }
      if (this.staff.jobNumber.val==='') {
        this.staff.jobNumber.ver = false;
      } else {
        this.staff.jobNumber.ver = true;
      }
      if (this.staff.duties.val==='') {
        this.staff.duties.ver = false;
      } else {
        this.staff.duties.ver = true;
      }
      if (this.staff.department.val==='') {
        this.staff.department.ver = false;
      } else {
        this.staff.department.ver = true;
      }
      if (!(this.staff.name.ver&&this.staff.telephone.ver&&this.staff.jobNumber.val&&this.staff.duties.ver&&this.staff.department.ver)) {
        this.alert.show = true;
        this.alert.cont = '您有信息尚未输入或信息格式有误，请检查';
      } else {
        this.subBtn.dis = true;
        this.subBtn.cont = '保存中...';
        axios({
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              var obj = {
                command: 'editBiddingInfo',
                platform: 'web',
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
        }).then((rep)=>{
          if (rep.data.statusCode === '10001') {
            this.subBtn.cont = '已保存';
            this.staff.id.val = rep.data.data.id;
            this.$emit('added', this.staff);
          }
        }, (rep)=>{});
      }
    },
    cancel() {
      this.$emit('canceled');
    }
  },
  components: {
    modal
  }
}
</script>

<style>
.staff-sex {
  display: block;
}
</style>
