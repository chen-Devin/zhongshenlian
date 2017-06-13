<template>
  <modal>
    <form class="form-horizontal clearfix"
          slot="body"
          @submit.prevent
          @keyup.enter.prevent>
      <div class="form-group"
           :class="{'has-error': !staff.name.ver}">
        <label class="control-label">姓名</label>
        <div>
          <input type="text"
                 class="form-control"
                 placeholder="请输入职员姓名"
                 v-model="staff.name.val">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">性别</label>
        <div>
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
        <label class="control-label">手机号</label>
        <div>
          <input type="tel"
                 class="form-control"
                 placeholder="请输入职员手机号码"
                 v-model="staff.telephone.val">
        </div>
      </div>
      <div class="form-group"
           :class="{'has-error': !staff.jobNumber.ver}">
        <label class="control-label">工号</label>
        <div>
          <input type="text"
                 class="form-control"
                 placeholder="请输入工号"
                 v-model="staff.jobNumber.val">
        </div>
      </div>
      <div class="form-group"
           :class="{'has-error': !staff.duties.ver}">
        <label class="control-label">职务</label>
        <div>
          <input type="text"
                 class="form-control"
                 placeholder="请输入职务"
                 v-model="staff.duties.val">
        </div>
      </div>
      <div class="form-group"
           :class="{'has-error': !staff.department.ver}">
        <label class="control-label">所属部门</label>
        <div>
          <select v-model="staff.department.val" class="form-control">
              <option v-for="(DEP,index) in departments" :value="DEP" :key="index">
                {{ DEP }}
              </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">备注</label>
        <div>
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
    <div slot="footer" class="ta-c">
      <button class="btn my-btn submit-btn"
              @click="save()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn draft-btn"
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
  name: 'staffAddModal',
  data() {
    return {
      staff: (() => {
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
            val: '',
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
      },
      departments: []
    };
  },
  created() {
    this.getDepartmentList().then((rep) => {
      this.departments = [];
      for (let i = 0; i < rep.data.data.departmentArray.length; i++) {
        this.departments.push(rep.data.data.departmentArray[i].departmentName);
      }
      this.staff.department.val = this.departments[1];
    }, (rep) => {});
  },
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
                command: 'addUser',
                platform: 'web',
                phone: this.staff.telephone.val,
                jobNumber: this.staff.jobNumber.val,
                userName: this.staff.name.val,
                gender: this.staff.gender.val,
                remark: this.staff.remark.val,
                department: this.staff.department.val,
                duity: this.staff.duties.val
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.subBtn.cont = '已保存';
            this.staff.id.val = rep.data.data.id;
            this.$emit('added', this.staff);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      }
    },
    cancel() {
      this.$emit('canceled');
    },
    getDepartmentList() {
      let promise = new Promise((resolve,reject)=>{
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getDepartmentList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            reject(rep);
          }
        }, (rep) => { });
      });
      return promise;
    }
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>
.form-group {
  margin-bottom: 20px;
}
label {
  margin-bottom: 15px;
}
.form-horizontal .control-label {
    margin-bottom: 10px;
}
</style>
