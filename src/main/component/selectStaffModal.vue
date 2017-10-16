<template>
  <modal class="select-staff-modal" modalWidth="600px" :setPadding="paddingValue">
    <div slot="body">
      <div class="list-header">
        <span>
          选择{{ staffModalIdentity }}
        </span>
        <search-bar 
          class="f-r" 
          :searchItems="searchItems"
          @search="search"></search-bar>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th v-if="radio">单选</th>
            <th v-else>多选</th>
            <th>姓名</th>
            <th>职务</th>
            <th>所属部门</th>
            <th>公司简称</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(staff, index) in staffArray"
            :key="index">
            <td v-if="radio">
              <el-radio :label="staff.name" v-model="staffRadio">{{ emptyString }}</el-radio>
            </td>
            <td v-else>
              <el-checkbox v-model="staff.checked"></el-checkbox>
            </td>
            <td>{{ staff.name }}</td>
            <td>{{ staff.duty }}</td>
            <td>{{ staff.department }}</td>
            <td>{{ staff.companyName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <p class="btns">
        <button class="btn my-btn submit-btn">确定</button>
        <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
      </p>
    </div>
  </modal>
</template>

<script>
import axios from 'axios'
import modal from './modal.vue'
import searchBar from './searchBar.vue'

export default {
  name: 'selectStaffModal',
  data() {
    return {
      paddingValue: 0,
      staffArray: [
        {
          name: '哈哈1',
          duty: '所长',
          department: '造价所',
          companyName: '造价所',
          checked: false
        },
        {
          name: '哈哈2',
          duty: '所长',
          department: '造价所',
          companyName: '造价所',
          checked: false
        },
        {
          name: '哈哈3',
          duty: '所长',
          department: '造价所',
          companyName: '造价所',
          checked: false
        }
      ],
      emptyString: '',
      staffRadio: ''
    };
  },
  props: ['staffModalIdentity', 'staffModalSelect'],
  computed: {
    radio () {
      if (this.staffModalSelect === 'radio') {
        return true
      } else if (this.staffModalSelect === 'check') {
        return false
      }
    }
  },
  methods: {
    changeCheck (event) {
      console.log(event)
    },
    cancel() {
      this.$emit('cancel')
    }
  },
  components: {
    modal,
    searchBar
  }
}
</script>

<style lang="sass" scoped>
  .select-staff-modal {
    .modal-body {
      .list-header {
        width: 100%;
        height: 50px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        background-color: #50bef7;
        color: #fff;
        font-size: 15px;
        > span {
          line-height: 30px;
        }
      }
      table {
        border: none;
        tr {
          border-bottom: 1px solid #f5f5f5;
        }
        td, th {
          border: none;
        }
        > thead {
          background-color: #fff;
        }
      }
    }
    
  }
</style>