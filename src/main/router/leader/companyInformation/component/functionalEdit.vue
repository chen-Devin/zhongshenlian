<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ functionInfoEdit.name }}</h1>
    <h5 class="main-title">部门信息</h5>
    <div class="company-detail">
      <el-row>
        <el-col :span="15" :offset="4">
          <p class="input-wrapper">
            部门编号：
            <input type="text" class="form-control" v-model="functionInfoEdit.number" placeholder="请输入部门编号">
          </p>
          <p class="input-wrapper">
            部门名称：
            <input type="text" class="form-control" v-model="functionInfoEdit.name" placeholder="请输入部门名称">
          </p>
          <p class="input-wrapper">
            是否有部门负责人：
            <input type="text" class="form-control" v-model="functionInfoEdit.principalTelephone" placeholder="请输入是否有部门负责人">
          </p>
          <p class="input-wrapper">
            人员数量：
            <span>{{functionInfoEdit.staffNum}}</span>
          </p>
          <p class="input-wrapper">
            <el-checkbox-group v-model="functionInfoEdit.checked">
              分管业务权限：
              <el-checkbox 
                :label="item.name" 
                v-for="(item, index) in functionInfoEdit.companyList"
                :key="index">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </p>
        </el-col>
      </el-row>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn draft-btn" @click="cancel">取消</button>
      <button type="button" class="btn my-btn submit-btn" @click="submit">保存</button>
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
      authority: []
    };
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
            name: item.name,
            removeStatus: '0'
          })
        } else {
          arr.push({
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
    text-align: center;
  }
  .company-detail {
    width: 100%;
    background-color: #fafafa;
    padding: 10px 30px;
    .input-wrapper {
      display: flex;
      height: 34px;
      line-height: 34px;
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
    margin-bottom: 0;
    text-align: right;
  }
}
</style>