<template>
  <card>
    <form class="search-form" @submit.prevent @keyup.enter.prevent>
      <div class="row">
        <div class="col-md-11">
          <!-- <search-bar placeholder="请输入项目名称、招标代理机构、或招标人进行搜索" @search="search" v-show="simpleSearch"></search-bar> -->
          <search-bar placeholder="输入关键字搜索员工" @search="tog" v-show="simpleSearch"></search-bar>
        </div>
        <div class="col-md-11 replace" v-show="!simpleSearch"></div>
        <div class="col-md-1 higher-search f-r">
          <button type="button" class="btn my-btn high-btn f-r " @click="showHigherSearch()">
            高级搜索
            &nbsp;
            <img v-if="searchDown" class="search-icon" src="../../../../img/market/search_down.svg">
            <img v-if="searchUp" class="search-icon" src="../../../../img/market/search_up.svg">
          </button>
        </div>
      </div>
    </form>
    <form class="form-inline higherForm" v-if="higherSearch">
      <div class="row">
        <div class="col-md-10">
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="projectName">员工姓名</label>
              <input type="text" class="form-control ta-c" id="projectName" placeholder="请填写员工姓名" v-model="staffName">
            </div>
          </div>
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="agency">员工工号</label>
              <input type="text" class="form-control ta-c" id="agency" placeholder="请填写员工工号" v-model="staffNumber">
            </div>
          </div>
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="tenderPerson">手机号</label>
              <input type="text" class="form-control ta-c" id="tenderPerson" placeholder="请填写手机号" v-model="staffPhone">
            </div>
          </div>
        </div>
      </div>
      <div class="search-btns ta-c">
        <button type="button" class="btn my-btn submit-btn" @click="higherSearchEvent()">查找</button>
        <button type="button" class="btn my-btn draft-btn" @click="reset()">重置</button>
      </div>
    </form>

    <h3 class="main-title" v-if="staffsShow">
      员工列表
      <button type="button" class="btn my-btn submit-btn f-r" @click.prevent="add()">录入</button>
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
          <th class="text-center">子部门</th>
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
          <td class="text-center">{{STAFF.subDepartment}}</td>
          <td class="text-center link-wrap">
            <a class="text-primary"
               @click.prevent="mod(STAFF)">修改</a>
          </td>
        </tr>
      </tbody>
    </table>
    <staff-add-modal v-if="showAddModal"
                     @added="added"
                     @canceled="addCanceled"></staff-add-modal>
    <staff-mod-modal v-if="showModModal"
                     :initalStaff="modStaff"
                     @saved="saved"
                     @canceled="modCanceled"
                     @del="del"></staff-mod-modal>
    <staff-del-modal v-if="showDelModal"
                     :initalStaff="delStaff"
                     @deleted="deleted"
                     @canceled="delCanceled"></staff-del-modal>
    <my-pagination   :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
  </card>
</template>

<script>
import axios from 'axios';

import card from '../../../component/card.vue';
import searchBar from '../../../component/searchBar.vue';
import staffModModal from './staffModModal.vue';
import staffDelModal from './staffDelModal.vue';
import staffAddModal from './staffAddModal.vue';
import myPagination from '../../../component/pagination.vue';

export default {
  name: 'staffInforList',
  data() {
    return {
      staffs: [],
      showModModal: false,
      showAddModal: false,
      modStaff: {},
      showDelModal: false,
      simpleSearch: true,
      higherSearch: false,
      searchDown: true,
      searchUp: false,
      delStaff: {},
      totalNum: 1,
      pageNum: 1,
      searchContent: '',
      staffName: '',
      staffNumber: '',
      staffPhone: '',
      listType: 'simple'
    }
  },
  computed: {
    staffsShow() {
      return this.staffs.length!==0;
    }
  },
  methods: {
    tog(searchCont) {
      this.searchContent = searchCont;
      this.searchStaffs(searchCont).then((rep) => {
        this.staffs = rep.data.data.userArray;
        this.totalNum = rep.data.data.totalNum;
      }, (rep) => {});
    },
    higherSearchEvent() {
      this.listType = 'higher';
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'staffSearch',
              platform: 'web',
              searchContent: '',
              staffName: this.staffName,
              staffNumber: this.staffNumber,
              staffPhone: this.staffPhone,
              pageNum: this.pageNum
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.staffs = rep.data.data.userArray;
          this.totalNum = rep.data.data.totalNum;
        }
      }, (rep) => { });
    },
    reset() {
      this.staffName = '';
      this.staffNumber = '';
      this.staffPhone = '';
      this.searchStaffs('').then((rep) => {
        this.staffs = rep.data.data.userArray;
        this.totalNum = rep.data.data.totalNum;
      }, (rep) => {});
    },
    searchStaffs(searchCont) {
      this.listType = 'simple';
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
                searchContent: searchCont,
                staffName: '',
                staffNumber: '',
                staffPhone: '',
                pageNum: this.pageNum
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.staffs = rep.data.data.userArray;
            this.totalNum = rep.data.data.totalNum;
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
    add() {
      this.showAddModal = true;
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
        department: addStaff.department.val,
      };
      this.staffs.push(newStaff);
      this.showAddModal = false;
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
    addCanceled() {
      this.showAddModal = false;
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
    },
    currentChange(val) {
      this.pageNum = val;
      if (this.listType === 'simple') {
        this.tog(this.searchContent);
      } else if(this.listType === 'higher') {
        this.higherSearchEvent();
      }
    },
    showHigherSearch() {
      if (this.higherSearch === false) {
        this.higherSearch = true;
        this.simpleSearch = false;
        this.searchUp = true;
        this.searchDown = false;
      } else {
        this.higherSearch = false;
        this.simpleSearch = true;
        this.searchUp = false;
        this.searchDown = true;
      }
    }
  },
  created() {
    this.searchStaffs('').then((rep) => {
      this.staffs = rep.data.data.userArray;
      this.totalNum = rep.data.data.totalNum;
    }, (rep) => {});
  },
  components: {
    card,
    staffModModal,
    staffDelModal,
    staffAddModal,
    searchBar,
    myPagination
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
.higher-search {
  margin-top: 30px;
  button {
    float: right;
  }
}
.higherForm {
  margin-top: -39px;
  .form-group {
    width: 100%;
    label {
      width: 25%;
    }
    input {
      width: 70%;
    }
  }
}
.search-btns {
  margin-top: 20px;
  button {
    &:first-child {
      margin-right: 30px;
    }
  }
}
form {
  margin-left: 0;
  margin-right: 0;
}
</style>
