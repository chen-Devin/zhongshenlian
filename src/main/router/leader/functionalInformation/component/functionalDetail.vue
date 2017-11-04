<template>
<div>
  <div class="company-detail-box">
    <h1 class="title">{{ department.name }}</h1>
    <h5 class="main-title">部门信息</h5>
    <div class="company-detail">
      <el-row>
        <el-col :span="9" :offset="2">
          <p>部门编号：{{ department.number }}</p>
          <p>部门名称：{{ department.name }}</p>
          <p>是否有部门负责人：{{ department.principalTelephone }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <div class="post-type">
            <div class="title">
              分管公司项目权限：
            </div>
            <div class="selections">
              <template v-for="item in department.authority">
                <i class="fa fa-check-square-o" aria-hidden="true" v-if="item.selected"></i>
                <i class="fa fa-square-o" aria-hidden="true" v-else></i>
                <span>
                  {{ item.name }}
                </span>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <p class="btns">
      <button type="button" class="btn my-btn submit-btn" @click="edit">编辑</button>
    </p>
  </div>
</div>
</template>

<script>
import card from '@/main/component/card.vue';
import modal from '@/main/component/modal.vue';

export default {
  name: 'companyDetail',
  data() {
    return {
      typeShow: false,
      filterState: []
    };
  },
  computed: {
    department () {
      // this.iniDepartment.authority.forEach((item, index) => {
      //   this.iniDepartment.reportType.forEach((jtem, index) => {
      //     if (item.name == jtem.name) {
      //       item.selected = true
      //     } else {
      //       // item.selected = false
      //     }
      //   })
      // })
      return this.iniDepartment
    }
  },
  methods: {
    edit () {
      this.$emit('edit')
    },
    showType () {
      this.typeShow = true;
    },
    closeType () {
      this.typeShow = false;
    },
    addType () {

    }
  },
  props: ['iniDepartment'],
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
