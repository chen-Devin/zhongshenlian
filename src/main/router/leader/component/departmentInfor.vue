<template>
  <card>
    <h3 class="main-title">
      {{thisDepart.department}}
      <button type="button"
              class="btn btn-default pull-right"
              @click="add()">录入</button>
    </h3>
    <table class="table table-striped table-hover com-list">
      <tbody>
        <tr>
          <th class="text-center">职员</th>
          <th class="text-center">性别</th>
          <th class="text-center">手机号</th>
          <th class="text-center">工号</th>
          <th class="text-center">职务</th>
          <th class="text-center">所属部门</th>
          <th class="text-center">&nbsp;</th>
        </tr>
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
import card from '../../../component/card.vue';
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
      showAddModal: false
    };
  },
  props: ['department'],
  methods: {
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
    },
  },
  components: {
    card,
    staffModModal,
    staffDelModal,
    staffAddModal
  }
}
</script>

<style lang="sass" scoped>
.com-list {
  .link-wrap {
    width: 45px;
    a:hover {
      cursor: pointer;
    }
  }
}
</style>
