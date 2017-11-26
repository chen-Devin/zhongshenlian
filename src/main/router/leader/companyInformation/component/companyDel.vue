<template>
  <div>
    <modal class="delete-company">
      <div slot="body">
        <h5 class="main-title">请选择要删除的公司</h5>
        <el-checkbox-group v-model="checked">
          <el-checkbox
            :label="item.id"
            v-for="(item, index) in companyList"
            :key="index">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer">
        <button class="btn my-btn cancel-btn" type="button" @click="showDeleteInfo">删除</button>
        <button class="btn my-btn draft-btn" type="button" @click="cancelOuter">取消</button>
      </div>
    </modal>
    <modal v-if="deleteInfo">
      <div class="delete-info" slot="body">
        <i class="el-icon-warning" aria-hidden="true"></i>
        <p>删除以后不可恢复，确认删除吗？</p>
      </div>
      <div slot="footer">
        <button class="btn my-btn cancel-btn" type="button" @click="deleteCompany">确认</button>
        <button class="btn my-btn submit-btn" type="button" @click="cancelInner">取消</button>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import modal from '@/main/component/modal.vue';

export default {
  name: 'companyDel',
  data() {
    return {
      companyList: [{
        name: '',
        id: ''
      }],
      checked: [],
      deleteInfo: false
    };
  },
  computed: {

  },
  methods: {
    getCompanyList () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getCompanyList',
                platform: 'web'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.companyList = rep.data.data.companyList
            console.log(this.companyList)
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    showDeleteInfo () {
      this.deleteInfo = true
    },
    deleteCompany () {
      let arr = []
      this.checked.forEach((item, index) => {
        arr.push({name: item})
      })
      this.checked = arr
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'delCompany',
                platform: 'web',
                companyId: this.checked
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message('删除公司成功')
            this.deleteInfo = false
            this.cancelOuter()
            this.$emit('reloadComList')
            resolve('done');
          }
        }, (rep) => { });
      })
    },
    cancelOuter () {
      this.$emit('cancel')
    },
    cancelInner () {
      this.deleteInfo = false
    }
  },
  created() {
    this.getCompanyList().then(() => {
      // this.$router.push(`/company-management/${this.companyList[0].id}`);
    }, () => { });
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../../scss/_variables.scss';

  .delete-company {
    .main-title {
      margin-bottom: 30px;
    }
  }
  .delete-info {
    text-align: center;
    i {
      font-size: 30px;
      color: #ffc952;
    }
    p {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      margin-left: 10px;
      margin-bottom: 0;
      vertical-align: top;
    }
  }
</style>
