<template>
  <card>
    <h3 class="main-title">
      {{thisDepart.department}}
      <button type="button"
              class="btn my-btn submit-btn pull-right"
              @click="add()">
              <!-- <img class="input-icon" src="../../../../img/market/input.svg">&nbsp -->
              录入
      </button>
    </h3>
    <table class="table table-bordered table-hover com-list">
      <thead>
        <tr>
          <th class="text-center">职员</th>
          <th class="text-center">性别</th>
          <th class="text-center">手机号</th>
          <th class="text-center">工号</th>
          <th class="text-center">职务</th>
          <th class="text-center">所属部门</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="STAFF in thisDepart.staffArray"
            :key="STAFF.id">
          <td class="text-center">{{STAFF.name}}</td>
          <td class="text-center">{{STAFF.gender}}</td>
          <td class="text-center">{{STAFF.telephone}}</td>
          <td class="text-center">{{STAFF.jobNumber}}</td>
          <td class="text-center">{{STAFF.duties}}</td>
          <td class="text-center">{{STAFF.department}}</td>
          <td class="text-center link-wrap">
            <a class="text-primary"
               @click.prevent="mod(STAFF)">修改</a>
          </td>
        </tr>
      </tbody>
    </table>
    <my-pagination :iniTotalPage="totalPage" :totalNum="page.total" @currentChange="pageChan"></my-pagination>
    <staff-mod-modal v-if="showModModal"
                     :initalStaff="modStaff"
                     @saved="saved"
                     @canceled="modCanceled"
                     @del="del"></staff-mod-modal>
    <staff-del-modal v-if="showDelModal"
                     :initalStaff="delStaff"
                     @deleted="deleted"
                     @canceled="delCanceled"></staff-del-modal>
    <staff-add-modal v-if="showAddModal"
                     :thisDepart="thisDepart"
                     @added="added"
                     @canceled="addCanceled"></staff-add-modal>
  </card>
</template>

<script>
import axios from 'axios';

import card from '../../../component/card.vue';
import myPagination from '../../../component/pagination.vue';
import staffModModal from './staffModModal.vue';
import staffDelModal from './staffDelModal.vue';
import staffAddModal from './staffAddModal.vue';

export default {
  name: 'departmentInfor',
  data() {
    return {
      thisDepart: this.department,
      showModModal: false,
      modStaff: {},
      showDelModal: false,
      delStaff: {},
      showAddModal: false,
      page: {
        total: this.department.totalNum,
        current: (this.department.pageNum === 0) ? 0 : 1
      },
      totalPage: 1
    };
  },
  props: ['department'],
  methods: {
    pageChan(newPage) {
      this.getStaffInfo(newPage);
    },
    getStaffInfo(newPage) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'getStaffArrayByDepartment',
                platform: 'web',
                department: this.thisDepart.department,
                pageNum: newPage
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.page.total = parseInt(rep.data.data.totalNum);
            this.page.current = newPage;
            this.thisDepart.staffArray = rep.data.data.staffArray;
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          } else {
            reject(rep);
          }
        }, (rep) => { });
      });
      return promise;
    },
    mod(STAFF) {
      this.modStaff = STAFF;
      this.showModModal = true;
    },
    del(STAFF) {
      this.delStaff = STAFF;
      this.showModModal = false;
      this.showDelModal = true;
    },
    add() {
      this.showAddModal = true;
    },
    saved(modedStaff) {
      for (let i = 0; i < this.thisDepart.staffArray.length; i++) {
        if (this.thisDepart.staffArray[i].id === modedStaff.id.val) {
          this.thisDepart.staffArray[i].telephone = modedStaff.telephone.val;
          this.thisDepart.staffArray[i].name = modedStaff.name.val;
          this.thisDepart.staffArray[i].jobNumber = modedStaff.jobNumber.val;
          this.thisDepart.staffArray[i].duties = modedStaff.duties.val;
          this.thisDepart.staffArray[i].gender = modedStaff.gender.val;
          this.thisDepart.staffArray[i].remark = modedStaff.remark.val;
          break;
        }
      }
      this.modStaff = {};
      this.showModModal = false;
    },
    modCanceled() {
      this.modStaff = {};
      this.showModModal = false;
    },
    deleted(deletedStaff) {
      for (let i = 0; i < this.thisDepart.staffArray.length; i++) {
        if (this.thisDepart.staffArray[i].id === deletedStaff.id) {
          this.thisDepart.staffArray.splice(i, 1);
          break;
        }
      }
      this.delStaff = {};
      this.showDelModal = false;
    },
    delCanceled() {
      this.delStaff = {};
      this.showDelModal = false;
      this.showModModal = true;
    },
    added(addStaff) {
      let newStaff = {
        id: addStaff.id.val,
        telephone: addStaff.telephone.val,
        name: addStaff.name.val,
        jobNumber: addStaff.jobNumber.val,
        duties: addStaff.duties.val,
        gender: addStaff.gender.val,
        remark: addStaff.remark.val,
        department: thisDepart.department
      };
      this.thisDepart.staffArray.push(newStaff);
      this.showAddModal = false;
    },
    addCanceled() {
      this.showAddModal = false;
    }
  },
  components: {
    card,
    myPagination,
    staffModModal,
    staffDelModal,
    staffAddModal
  }
}
</script>

<style lang="sass" scoped>
.com-list {
  thead {
    background-color: #E6E6E6;
  }
  th {
    width: 14.28%;
  }
  .link-wrap {d
    a:hover {
      cursor: pointer;
    }
  }
}
.input-icon {
  margin-top: -2px;
}
</style>
