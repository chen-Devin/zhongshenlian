<template>
<div>
  <div class="company-department-detail-box">
    <h1 class="title">{{ iniCompanyEdit5.groupName }}</h1>
    <h5 class="vice-title">公司信息</h5>
    <div class="company-department-detail">
      <el-form :label-position="labelPosition" label-width = "90px" :model="iniCompanyEdit5" :rules="Rules" ref="iniCompanyEdit5">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="小组名称：" label-width="90px" required prop="groupName">
              <el-input type="text" v-model="iniCompanyEdit5.groupName" placeholder="请输入小组名称"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
     </el-form>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn draft-btn" @click="cancelShow = true">取消</button>
      <button type="button" class="btn my-btn submit-btn" @click="submit" :disabled="saveAble">保存</button>
    </p>
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
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';

export default {
  name: 'companyDepartmentDetail',
  data() {
    return {
      cancelShow: false,
      labelPosition: 'left',
      Rules: {
        groupName: [
          { required: true, message: '请输入小组名称', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    saveAble () {
      if (this.iniCompanyEdit5.groupName) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    cancel () {
      this.cancelShow = false
      this.$emit('cancel', 5)
    },
    submit () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editDepartmentGroup',
                platform: 'web',
                data: this.iniCompanyEdit5
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('editSuccess', 5, rep.data.data.id)
            this.$message('编辑小组信息成功')
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  props: ['iniCompanyEdit5'],
  created() {
    
  },
  components: {
    card,
    modal
  }
};
</script>

<style lang="sass" scoped>
// @import '../../../../../scss/_variables.scss';

.company-department-detail-box {
  > .title {
    font-size: 15px;
    margin: 0;
    text-align: center;
  }
  .company-department-detail {
    width: 100%;
    background-color: #f9fbfe;
    padding: 10px 30px;
  }
  .post-type {
    display: flex;
    .title {
      width: 235px;
    }
  }
  + button {
    margin-top: 10px;
  }
  .btns {
    margin-top: 10px;
    margin-bottom: 0;
    text-align: right;
  }
}
</style>