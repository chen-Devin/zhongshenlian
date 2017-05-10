<template>
  <card>
    <search-bar placeholder="输入关键字搜索员工" @search="tog"></search-bar>
    <h3 v-if="staffsShow">
      员工列表
    </h3>
    <table class="table table-striped table-hover com-list" v-if="staffsShow">
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
import card from '../../../component/card.vue';
import searchBar from '../../../component/searchBar.vue';
import staffModModal from './staffModModal.vue';
import staffDelModal from './staffDelModal.vue';

export default {
  name: 'staffInforList',
  data() {
    return {
      staffs: []
    }
  },
  computed: {
    staffsShow() {
      return this.staffs.length!==0;
    }
  },
  mothods: {
    tog(searchCont) {

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
</style>
