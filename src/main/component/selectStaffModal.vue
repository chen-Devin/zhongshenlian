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
      <div class="table-wrapper">
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
                <el-radio :label="staff" v-model="staffRadio">{{ emptyString }}</el-radio>
              </td>
              <td v-else>
                <!-- <el-checkbox v-model="staff.checked"></el-checkbox> -->
                <input type="checkbox" v-model="staff.checked">
              </td>
              <td>{{ staff.name }}</td>
              <td>{{ staff.duty }}</td>
              <td>{{ staff.department }}</td>
              <td>{{ staff.companyName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div slot="footer">
      <p class="btns">
        <button class="btn my-btn submit-btn" @click="submit">确定</button>
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
      staffArray: [],
      emptyString: '',
      staffRadio: '',
      searchItems: [],
      reload: true
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
    reloadSelect () {
      console.log(1)
      this.reload = false
      setTimeout(() => {
        this.reload = true
      }, 1000)
    },
    getUserList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUserList',
                platform: 'web',
                pageNum: 1
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            // this.$message.success(rep.data.msg)
            this.staffArray = rep.data.data.userArray
            this.staffArray.forEach((item) => {
              item.checked = false
            })
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    submit () {
      if (this.staffModalSelect === 'radio') {
        this.$emit('selected', this.staffModalIdentity, this.staffRadio)
      } else if (this.staffModalSelect === 'check') {
        let checkList = []
        this.staffArray.forEach((item) => {
          if (item.checked) {
            checkList.push(item)
          }
        })
        this.$emit('selected', this.staffModalIdentity, checkList)
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    search () {

    }
  },
  created () {
    this.getUserList()
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
      .table-wrapper {
        height: 200px;
        overflow: auto;
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