<template>
  <div class="customer-info-add">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h1 class="title">合同变更金额申请</h1>
      <div class="message-box">
        <el-row>
          <el-col :span="12" :offset="6">
            <p>
              <span>项目名称</span>
              <el-select v-model="projectId" placeholder="请选择项目" style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.projectId">
                </el-option>
              </el-select>
            </p>
          </el-col>
        </el-row>
      </div>
      <p>
        <button class="btn my-btn submit-btn" type="button" :disabled="disSubmit" @click="jump">确定</button>
      </p>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import card from '@/main/component/card.vue';
import crumbs from '@/main/component/crumbs.vue';

export default {
  name: 'contractChange',
  data() {
    return {
      paths: [
        { name: '合同金额变更申请', url: '/customer-infor-list', present: true }
      ],
      projectId: '',
      options: [{
        label: '同部门之间可见',
        projectId: '1096'
      }, {
        label: '同部门之间不可见',
        projectId: '1096'
      }]
    }
  },
  computed: {
    disSubmit () {
      if (this.projectId === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    jump () {
      this.$router.push('/business-handle-detail-sales-' + this.projectId + '/business-profile')
    }
  },
  components: {
    card,
    crumbs
  }
};
</script>

<style lang="sass" scoped>
  .customer-info-add {
    .title {
      font-size: 18px;
      text-align: center;
      margin-top: 40px;
      + p {
        font-size: 13px;
        text-align: center;
      }
    }
    .message-box {
      background-color: #f9fbfe;
      padding: 20px 50px;
      p {
        display: flex;
        line-height: 34px;
        padding: 0 20px;
        span {
          width: 88px;
        }
      }
      + p {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
</style>