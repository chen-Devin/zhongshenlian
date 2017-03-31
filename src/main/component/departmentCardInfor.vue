<template>
  <section>
    <h3>{{thisDepart.department}}</h3>
    <form class="form-inline clearfix">
      <search-bar v-model="searchVal"
                  v-on:search="search"></search-bar>
      <button type="button"
              class="btn btn-default btn-sm pull-right"
              v-on:click="add()">&nbsp;录入&nbsp;</button>
    </form>
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th class="text-center">职员</th>
          <th class="text-center">性别</th>
          <th class="text-center">手机号</th>
          <th class="text-center">工号</th>
          <th class="text-center">职务</th>
          <th class="text-center">所属部门</th>
          <th class="text-center">&nbsp;</th>
          <th class="text-center">&nbsp;</th>
        </tr>
        <tr v-for="STAFF in thisDepart.staffArray"
            v-bind:key="STAFF.id">
          <td class="text-center">{{STAFF.name}}</td>
          <td class="text-center">{{STAFF.gender}}</td>
          <td class="text-center">{{STAFF.telephone}}</td>
          <td class="text-center">{{STAFF.jobNumber}}</td>
          <td class="text-center">{{STAFF.duties}}</td>
          <td class="text-center">{{STAFF.department}}</td>
          <td class="text-center link-wrap">
            <a class="text-paimary"
               v-on:click.prevent="mod(STAFF)">修改</a>
          </td>
          <td class="link-wrap">
            <a class="text-danger"
               v-on:click.prevent="del(STAFF)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <mod-modal v-if="showModModal"
               v-bind:initalStaff="modStaff"
               v-on:saved="saved"
               v-on:modCanceled="canceled"></mod-modal>
    <del-modal v-if="showDelModal"
               v-bind:initalStaff="delStaff"
               v-on:deleted="deleted"
               v-on:delCanceled="canceled"></del-modal>
    <add-modal v-if="showAddModal"
               v-bind:thisDepart="thisDepart"
               v-on:added="added"
               v-on:addCanceled="canceled"></add-modal>
  </section>
</template>

<script>
import _ from 'lodash';
import searchBar from './searchBar.vue';
import modModal from './modModal.vue';
import delModal from './delModal.vue';
import addModal from './addModal.vue';

export default {
  name: 'departmentCardInfor',
  data() {
    return {
      thisDepart: _.cloneDeep(this.department),
      searchVal: '',
      showModModal: false,
      modStaff: {},
      showDelModal: false,
      delStaff: {},
      showAddModal: false
    };
  },
  props: ['department'],
  methods: {
    search(val) {
      this.searchVal = val;
      axios({
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        method: 'get',
        url: '/service',
        params: {
            data: (()=>{
            var obj = {
                command: 'staffSearch',
                platform: 'web',
                searchContent: val,
                department: this.thisDepart.department
            }
            return JSON.stringify(obj);
            })()
        }
      }).then((rep)=>{
          if(rep.data.statusCode = '10001') {
            this.thisDepart.staffArray = rep.data.data.userArray;
            for(let j=0; j < this.thisDepart.staffArray.length; j++) {
              let arr = [];
              for(let k=0; k < this.thisDepart.authorityArray.length; k++) {
                for(let m=0; m < this.thisDepart.staffArray[j].authority.length; m++) {
                  if (this.thisDepart.authorityArray[k].name === this.thisDepart.staffArray[j].authority[m].name) {
                    let obj = {
                      authName: this.thisDepart.staffArray[j].authority[m].name,
                      stat: this.thisDepart.staffArray[j].authority[m].authority === '0' ? false : true,
                    };
                    arr.push(obj);
                    break;
                  }
                }
              }
              this.thisDepart.staffArray[j].authority = arr;
            }
          }
        },(rep)=>{});
    },
    mod(STAFF) {
      this.modStaff = STAFF;
      this.showModModal = true;
    },
    del(STAFF) {
      this.delStaff = STAFF;
      this.showDelModal = true;
    },
    add() {
      this.showAddModal = true;
    },
    saved(modedStaff) {
      for (let i=0; i < this.thisDepart.staffArray.length; i++) {
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
      for (let i=0; i < this.thisDepart.staffArray.length; i++) {
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
    },
  },
  components: {
    searchBar,
    modModal,
    delModal,
    addModal
  }
}
</script>

<style lang="sass" scoped>
@import '../../scss/variables.scss';

section {
  position: relative;
  margin: 30px 10px;
  padding: 10px 20px;
  background-color: #ffffff;
  border: 1px solid rgba(0,0,0,0.15);
  box-shadow: 1px 2px 4px rgba(0,0,0,0.175);
  h3 {
    padding-left: 15px;
    border-left: 3px solid $brand-primary;
    margin-bottom: 20px;
  }
  form.form-inline {
    margin: 20px auto;
  }
  table {
    margin: 20px auto;
    .link-wrap {
      width: 45px;
      a:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
