<template>
  <div class="auth-form">
    <h5 class="main-title">
      权限设置
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn"  @click="edit" :disabled="!canEdit.canEditAuthority">编辑</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save">保存</button>
          <button class="btn my-btn draft-btn" @click="cancelShow = true">取消</button>
        </template>
      </div>
    </h5>
    <div class="basic-content" :style="{ backgroundColor: bgc }">
      <table class="table table-hover table-inner" v-if="type === 'function'">
        <thead>
          <tr>
            <td class="text-center staff-max">公司名称</td>
            <td class="text-center"
                v-for="(AUTH, index) in authorityArray"
                :key="index">{{AUTH.name}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in authorityData"
              :key="index">
            <td class="text-center staff-max">{{ item.companyName }}</td>
            <td class="text-center"
                v-for="(jtem, index) in item.authorityArray"
                :key="index">
              <input type="checkbox"
                     v-model="jtem.stat"
                     :disabled="!editAble">
            </td>
          </tr>
        </tbody>
      </table>
      <p class="empty-list-p" v-if="authorityData.length === 0">暂无数据</p>
      <div class="function-auth" v-if="type !== 'function'">
        <p>
          <el-checkbox-group v-model="selectedAuthority">
            <el-checkbox 
              :label="option.name" 
              v-for="(option, index) in authorityData" 
              :key="index" 
              :disabled="!editAble">{{ option.name }}</el-checkbox>
          </el-checkbox-group>
        </p>
      </div>
    </div>
  <modal v-if="cancelShow">
    <div slot="body">
      <p class="ta-c">取消后编辑内容将丢弃，确认取消吗？</p>
    </div>
    <div slot="footer">
      <button class="btn my-btn submit-btn" @click="cancelShow = false">
        取消
      </button>
      <button class="btn my-btn cancel-btn" @click="cancel">
        确定
      </button>     
    </div>
  </modal>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import modal from '@/main/component/modal.vue';

export default {
  name: 'departmentAuthor',
  data() {
    return {
      cancelShow: false,
      thisDepart: this.department,
      editAble: false,
      authorityArray: [],
      authorityData: [],
      selectedAuthority: [],
      transData: ''
    };
  },
  computed: {
    bgc () {
      if (this.type === 'function') {
        return '#fff'
      } else {
        return '#F9FBFE'
      }
    }
  },
  props: ['id', 'type', 'canEdit'],
  watch: {
    editAble: function (val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.canEdit.canEditDetail = false
          this.canEdit.canEditAuthority = true
          this.canEdit.canEditSalary = false
          this.canEdit.canEditBonus = false
          this.canEdit.canEditEducation = false
        } else {
          this.canEdit.canEditDetail = true
          this.canEdit.canEditAuthority = true
          this.canEdit.canEditSalary = true
          this.canEdit.canEditBonus = true
          this.canEdit.canEditEducation = true
        }
      }
    }
  },
  methods: {
    edit () {
      this.editAble = true
    },
    cancel () {
      this.cancelShow = false
      this.editAble = false
    },
    getStaffAuthority () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getStaffAuthority',
                platform: 'web',
                staffId: this.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.resultArray = rep.data.data.resultArray
            this.authorityData = this.resultArray
            if (this.type === 'function') {
              let arr = this.resultArray[0].authorityArray
              this.authorityArray = []
              arr.forEach((item, index) => {
                let stat = item.authority === '0' ? false : true
                this.authorityArray.push({
                  name: item.name,
                  stat: stat
                })
              })
              this.authorityData = []
              this.authorityData = this.resultArray
              this.authorityData.forEach((item) => {
                item.authorityArray.forEach((jtem) => {
                  jtem.stat = jtem.authority === '0' ? false : true
                })
              })
              this.loadTable = true
            } else if (this.type === 'department') {
              let arr = []
              this.authorityData.forEach((item) => {
                if (item.authority === '1') {
                  arr.push(item.name)
                }
              })
              this.selectedAuthority = arr
            }
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    save () {
      if (this.type === 'function') {
        this.authorityData.forEach((item) => {
          item.authorityArray.forEach((jtem) => {
            jtem.authority = Number(jtem.stat)
            delete jtem.stat
          })
        })
      } else if (this.type === 'department') {
        this.authorityData.forEach((item) => {
          item.authority = '0'
        })
        this.selectedAuthority.forEach((item) => {
          this.authorityData.forEach((jtem) => {
            if (jtem.name === item) {
              console.log(item)
              jtem.authority = '1'
            }
          })
        })
      }
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editStaffAuthority',
                platform: 'web',
                staffId: this.id
              }
              if (this.type === 'function') {
                Object.assign(obj, {
                  deAuthorityArray: this.authorityData
                })
              } else if (this.type === 'department') {
                Object.assign(obj, {
                  comAuthority: this.authorityData
                })
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('保存成功')
            this.getStaffAuthority()
            this.editAble = false
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  created () {
    this.getStaffAuthority()
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
  .auth-form {
    .main-title {
      padding-left: 40px;
      padding-right: 10px;
      // padding-bottom: 20px;
      margin-left: 0;
      margin-bottom: 10px;
      // background-color: #fff;
    }
    .basic-content {
      padding-top: 10px;
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 20px;
      // background-color: #F9FBFE;
      overflow: hidden;
    }
    // .function-auth {
    //   background-color: #F9FBFE;
    // }
  }
  
</style>
