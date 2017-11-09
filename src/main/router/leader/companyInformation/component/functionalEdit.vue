<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ functionInfoEdit.name }}</h1>
    <h5 class="vice-title">部门信息</h5>
    <div class="company-detail">
      <el-form :label-position="labelPosition" label-width = "90px" :rules="Rules" ref="functionInfoEdit" :model="functionInfoEdit">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="部门编号：" required prop="number">
              <el-input type="number" v-model="functionInfoEdit.number" placeholder="请输入部门编号"></el-input>
            </el-form-item>
            <el-form-item label="部门名称：" required prop="name">
              <el-input type="text" v-model="functionInfoEdit.name" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item label="是否有部门负责人：" required label-width = "140px">
              <p>{{ company.principalTelephone===''?'否':'是' }}</p>
            </el-form-item>
            <el-form-item label="人员数量：" required>
              <p>{{functionInfoEdit.staffNum}}</p>
            </el-form-item> 
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="2">
            <el-form-item label="分管项目权限：" required label-width = "120px">
              <el-checkbox-group v-model="functionInfoEdit.checked">     
                <el-checkbox 
                  :label="item.name" 
                  v-for="(item, index) in functionInfoEdit.companyList"
                  :key="index">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn draft-btn" @click="cancel">取消</button>
      <button type="button" class="btn my-btn submit-btn" @click="submit" :disabled="saveAble">保存</button>
    </p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';

export default {
  name: 'companyDetail',
  data() {
    return {
      company: {},
      authority: [],
      labelPosition: 'left',
      Rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入部门编号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    saveAble () {
      if (this.functionInfoEdit.name && this.functionInfoEdit.number) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', 0)
    },
    submit () {
      let arr = []
      let checked_len = this.functionInfoEdit.checked.length
      this.functionInfoEdit.companyList.forEach((item, index) => {
        let i = 0
        let flag = 0
        while(i < checked_len) {
          if (item.name === this.functionInfoEdit.checked[i]) {
            flag = 1
            break
          }
          i++
        }
        if (flag === 1) {
          arr.push({
            companyId: item.id,
            name: item.name,
            removeStatus: '0'
          })
        } else {
          arr.push({
            companyId: item.id,
            name: item.name,
            removeStatus: '1'
          })
        }
      })
      this.functionInfoEdit.authority = arr
      console.log(arr)
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'editDepartment',
                platform: 'web',
                data: this.functionInfoEdit
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$emit('editSuccess', 0, rep.data.data.id)
            this.$message('编辑职能部门信息成功')
            resolve('done');
          }
        }, (rep) => { });
      })
    }
  },
  props: ['functionInfoEdit'],
  created() {

  },
  components: {
    card,
    modal
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

.company-detail-box {
  > .title {
    font-size: 15px;
    margin: 0;
    margin-top: 20px;
    text-align: center;
  }
  .company-detail {
    width: 100%;
    background-color: #f9fdfe;
    padding: 10px 30px;
    p {
      height: 36px;
      line-height: 36px;
    }
    .input-wrapper {
      display: flex;
      height: 36px;
      line-height: 36px;
      .form-control {
        display: inline-block;
        flex: 1;
      }
    }
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
    margin-bottom: 10px;
    margin-right: 15px;
    text-align: right;
  }
}
</style>