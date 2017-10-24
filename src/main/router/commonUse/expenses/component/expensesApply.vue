<template>
  <div class="type-wrapper">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h5 class="main-title">申请报销</h5>
      <div class="type-box">
        <h4>选择报销类型</h4>
        <el-radio-group v-model="type">
          <el-radio label="差旅费报销"></el-radio>
          <el-radio label="特殊报销"></el-radio>
        </el-radio-group>
      </div>
      <div class="btn-contain">
        <button 
          class="btn my-btn submit-btn" 
          :disabled="confirm"
          @click="apply">确定</button>
      </div>
    </card>
  </div>
</template>

<script>
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';

export default {
  name: 'expenseApply',
  data() {
    return {
      paths: [
        { name: '报销申请', url: '/expenses-list', present: false },
        { name: '申请报销', url: '/expenses-list', present: true }
      ],
      type: ''
    };
  },
  computed: {
    confirm () {
      if (this.type) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    apply () {
      if (this.type === '差旅费报销') {
        this.$router.push('/expenses-trip/new')
      } else if (this.type === '特殊报销') {
        this.$router.push('/expenses-special/new')
      }
    }
  },
  components: {
    crumbs,
    card
  }
}
</script>

<style lang="sass" scoped>
  .type-wrapper {
    .type-box {
      padding-top: 20px;
      padding-bottom: 20px;
      background-color: #f9fbfe;
      text-align: center;
      h4 {
        margin-bottom: 20px;
      }
      .el-radio-group {
        margin-top: 10px;
        .el-radio {
          margin-right: 20px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .btn-contain {
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
</style>