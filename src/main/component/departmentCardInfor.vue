<template>
  <section>
    <h3>{{department.department}}</h3>
    <form class="form-inline clearfix">
      <search-bar v-model="searchVal"
                  v-on:search="search(searchVal)"
                  v-on:clear="search('')"></search-bar>
      <button type="button"
              class="btn btn-default btn-sm pull-right">&emsp;录入&emsp;</button>
    </form>
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th>职员</th>
          <th>性别</th>
          <th>手机号</th>
          <th>工号</th>
          <th>职务</th>
          <th>所属部门</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
        <tr v-for="STAFF in department.staffArray"
            v-bind:key="STAFF.id">
          <td>{{STAFF.name}}</td>
          <td>{{STAFF.gender}}</td>
          <td>{{STAFF.telephone}}</td>
          <td>{{STAFF.jobNumber}}</td>
          <td>{{STAFF.duties}}</td>
          <td>{{STAFF.department}}</td>
          <td class="link-wrap">
            <a class="text-paimary"
               v-on:click.prevent="modify(STAFF)">修改</a>
          </td>
          <td class="link-wrap">
            <a class="text-danger"
               v-on:click.prevent="delete(STAFF)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <mod-modal v-if="showModModal"
             v-bind:initalStaff="modStaff"
             v-on:saved="saved"
             v-on:canceled="canceled"></mod-modal>
</template>

<script>
import searchBar from './searchBar.vue';
import modModal from './modModal.vue';

export default {
  name: 'departmentCardInfor',
  data() {
    return {
      showModModal: false,
      modStaff: {},
      showDelModal: false,
      delStaff: {}
    };
  },
  props: ['department'],
  methods: {
    search(val) {
      if(val === '') {
        this.searchVal = '';
      }
      axios({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'get',
        url: '/service',
        params: {
            data: (()=>{
            var obj = {
                command: 'staffSearch',
                platform: 'web',
                searchContent: this.searchVal,
                department: department.department
            }
            return JSON.stringify(obj);
            })()
        }
      }).then(
          (rep)=>{
            if(rep.data.statusCode = '10001') {
              this.department.staffArray = rep.data.data.userArray;
            }
          },(rep)=>{

          }
      );
    },
    modify(STAFF) {
      this.modStaff = STAFF;
      this.showModModal = true;
    },
    delete(STAFF) {
      this.delStaff = STAFF;
      this.showDelModal = true;
    },
    saved() {
      //find and place
      this.modStaff = {};
      this.showModModal = false;
    },
    canceled() {
      this.modStaff = {};
      this.showModModal = false;
    }
  },
  components: {
    searchBar,
    modModal
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
    border-left: 3px solid $primary-color;
    margin-bottom: 20px;
  }
  form.form-inline {
    margin: 20px auto;
  }
  table {
    margin: 20px auto;
    .link-wrap {
      width: 45px;
    }
  }
}
</style>
