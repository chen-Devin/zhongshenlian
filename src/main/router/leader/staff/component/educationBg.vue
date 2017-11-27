<template>
  <div class="staff-wrapper">
    <div class="title">
      <div class="f-r o-h">
        <template v-if="!editAble">
          <button class="btn my-btn submit-btn" @click="edit" :disabled="!canEdit.canEditEducation">编辑</button>
          <button class="btn my-btn draft-btn" @click="add" :disabled="!canEdit.canEditEducation">新增</button>
        </template>
        <template v-else>
          <button class="btn my-btn submit-btn" @click="save">保存</button>
          <button class="btn my-btn draft-btn" @click="cancelShow = true">取消</button>
        </template>
      </div>
      <h5 class="main-title">教育背景</h5>
    </div>
    <div class="basic-contain">
      <div class="basic-form"> 
        <table class="table table-inner table-hover table-input">
          <thead>
            <tr>
              <td class="text-center">学校名称</td>
              <td class="text-center">学历</td>
              <td class="text-center">就读时间</td>
              <td class="text-center">毕业时间</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in educationArray"
                :key="index">
              <td class="text-center">
                <el-input type="text"
                       v-model="item.schoolName"
                       v-if="editAble"></el-input>
                <p v-else>{{item.schoolName}}</p>
              </td>
              <td class="text-center">
                <el-input type="text"
                       v-model="item.education"
                       v-if="editAble"></el-input>
                <p v-else>{{item.education}}</p>
              </td>
              <td class="text-center">
                <el-date-picker
                  style="width:100%"
                  v-model="item.startTime"
                  type="date"
                  placeholder="选择日期"
                  :value-format="valueFormat"
                  v-if="editAble">
                </el-date-picker>
                <p v-else>{{item.startTime}}</p>
              </td>
              <td class="text-center">
                <el-date-picker
                  style="width:100%"
                  v-model="item.endTime"
                  type="date"
                  placeholder="选择日期"
                  :value-format="valueFormat"
                  v-if="editAble">
                </el-date-picker>
                <p v-else>{{item.endTime}}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="empty-list-p" v-if="educationArray.length === 0">暂无数据</p>    
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
import modal from '@/main/component/modal.vue';
export default {
  name: 'staffDetail',
  data() {
    return {
      cancelShow: false,
      editAble: false,
      educationArray: [],
      educationArrayEmpty: {
       id: '',
       userId: '',
       certificateNumber: '',
       createAt: '',
       education: '',
       endTime: '',
       remark: '',
       removeStatus: '',
       schoolName: '',
       startTime: '',
       updateAt: ''
      },
      valueFormat: 'yyyy-mm-dd'
    };
  },
  watch: {
    editAble: function (val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.canEdit.canEditDetail = false
          this.canEdit.canEditAuthority = false
          this.canEdit.canEditSalary = false
          this.canEdit.canEditBonus = false
          this.canEdit.canEditEducation = true
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
  props: ['id', 'canEdit'],
  methods: {
    change (val) {
      console.log(val)
    },
    getUserEducationInfo () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getUserEducationInfo',
                platform: 'web',
                staffId: this.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.educationArray = rep.data.data.educationArray
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    edit () {
      this.editAble = true
    },
    add () {
      this.editAble = true
      this.educationArrayEmpty.userId = this.id
      this.educationArray.push(this.educationArrayEmpty)
    },
    cancel () {
      this.cancelShow = false
      this.editAble = false
      this.getUserEducationInfo()
    },
    save () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editEducationalExperience',
                platform: 'web',
                educationalExperience: this.educationArray
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('保存成功')
            resolve('done');
          } else {
            this.$message.error(rep.data.msg)
          }
          this.getUserEducationInfo()
          this.editAble = false
        }, (rep) => { });
      })
    }
  },
  created () {
    this.getUserEducationInfo()
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>
  .staff-wrapper {
    .title {
      padding-left: 40px;
      padding-right: 10px;
      .main-title {
        margin-left: 0;
      }
    }
    .basic-contain {
      padding-top: 10px;
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 20px;
      background-color: #f9fbfe;
      table {
        margin-top: 0;
      }
    }
  }
  .table {
    p {
      padding-top: 10px;
    }
  }
</style>