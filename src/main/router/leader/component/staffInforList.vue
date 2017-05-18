<template>
  <card>
    <search-bar placeholder="输入关键字搜索员工" @search="tog"></search-bar>
    <h3 v-if="staffsShow">
      员工列表
    </h3>
    <table class="table table-bordered table-hover com-list" v-if="staffsShow">
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
        <tr v-for="STAFF in staffs"
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
    <staff-mod-modal v-if="showModModal"
                     :initalStaff="modStaff"
                     @saved="saved"
                     @canceled="modCanceled"
                     @del="del"></staff-mod-modal>
    <staff-del-modal v-if="showDelModal"
                     :initalStaff="delStaff"
                     @deleted="deleted"
                     @canceled="delCanceled"></staff-del-modal>
  </card>
</template>

<script>
import axios from 'axios';

import card from '../../../component/card.vue';
import searchBar from '../../../component/searchBar.vue';
import staffModModal from './staffModModal.vue';
import staffDelModal from './staffDelModal.vue';

export default {
  name: 'staffInforList',
  data() {
    return {
      staffs: [],
      showModModal: false,
      modStaff: {},
      showDelModal: false,
      delStaff: {},
    }
  },
  computed: {
    staffsShow() {
      return this.staffs.length!==0;
    }
  },
  methods: {
    tog(searchCont) {
      this.searchStaffs(searchCont).then((rep) => {
        this.staffs = rep.data.data.userArray;
      }, (rep) => {});
    },
    searchStaffs(searchCont) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              var obj = {
                command: 'staffSearch',
                platform: 'web',
                searchContent: searchCont
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
    saved(modedStaff) {
      for (let i = 0; i < this.staffs.length; i++) {
        if (this.staffs[i].id === modedStaff.id.val) {
          this.staffs[i].telephone = modedStaff.telephone.val;
          this.staffs[i].name = modedStaff.name.val;
          this.staffs[i].jobNumber = modedStaff.jobNumber.val;
          this.staffs[i].duties = modedStaff.duties.val;
          this.staffs[i].gender = modedStaff.gender.val;
          this.staffs[i].remark = modedStaff.remark.val;
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
      for (let i = 0; i < this.staffs.length; i++) {
        if (this.staffs[i].id === deletedStaff.id) {
          this.staffs.splice(i, 1);
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
    }
  },
  components: {
    card,
    staffModModal,
    staffDelModal,
    searchBar
  }
};
</script>

<style lang="sass" scoped>
.com-list {
  thead {
    background-color: #E6E6E6;
  }
  .link-wrap {
    width: 45px;
    a:hover {
      cursor: pointer;
    }
  }
}
</style>
