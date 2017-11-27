<template>
  <div>
    <modal>
      <div slot="body">
        <el-form ref="staff" :model="staff" :rules="rules" label-width="100px">
          <el-form-item label="所属部门：" prop="company">
            <el-select v-model="companySelected" placeholder="请选择所属部门">
              <el-option 
                :label="company.name" 
                :value="company.id" 
                v-for="(company, index) in departmentList" 
                :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <button class="btn my-btn cancel-btn modal-default-button" @click="save" :disabled="subBtn.dis">
          {{subBtn.cont}}
        </button>
        <button class="btn my-btn submit-btn modal-default-button" @click="cancelShow = true">
          取消
        </button>
      </div>
    </modal>
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
  name: 'staffAddModal',
  data() {
    return {
      cancelShow: false,
      departmentList: [{
        name: '',
        id: ''
      }],
      subBtn: {
        dis: false,
        cont: '保存'
      },
      staff: {

      },
      rules: {
        company:  [
          { required: true, message: '请选择所属部门', trigger: 'blur' }
        ]
      },
      companySelected: ''
    };
  },
  methods: {
    getInfoDepartmentList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getInfoDepartmentList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.departmentList = rep.data.data.departmentList
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    save () {
      this.$emit('saveNewStaff', [0, this.companySelected])
    },
    cancel() {
      this.cancelShow = false;
      this.$emit('cancel');
    }
  },
  created () {
    this.getInfoDepartmentList()
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>

</style>