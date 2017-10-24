<template>
  <div class="expense-table">
    <h5 class="vice-title" v-if="type==='差旅费报销'">差旅费报销</h5>
    <h5 class="main-title" v-if="type==='特殊报销'">特殊报销</h5>
    <!-- 差旅费table -->
    <div class="table-wrapper">
      <table border="1" v-if="type==='差旅费报销'">
        <tbody>
          <tr>
            <td class="table-label">出差起始日期：</td>
            <td>
              <el-date-picker
                v-model="reimbursementInfo.startTime"
                type="date"
                placeholder="选择出差起始日期"
                :disabled="!editAble">
              </el-date-picker>
            </td>
            <td class="table-label">出差结束日期：</td>
            <td>
              <el-date-picker
                v-model="reimbursementInfo.endTime"
                type="date"
                placeholder="选择出差结束日期"
                :disabled="!editAble">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td class="table-label">出差地：</td>
            <td>
              <el-input v-model="reimbursementInfo.place" placeholder="请填写出差地" :disabled="!editAble"></el-input>
            </td>
            <td class="table-label">出差事由</td>
            <td>
              <el-radio-group v-model="reimbursementInfo.reason" :disabled="!editAble">
                <el-radio label="审计"></el-radio>
                <el-radio label="培训"></el-radio>
                <el-radio label="会议"></el-radio>
                <el-radio label="投标"></el-radio>
                <el-radio label="其他"></el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td class="table-label">总计金额：</td>
            <td colspan="3">
              <el-input v-model="reimbursementInfo.totalAmount" placeholder="请填写总计金额" :disabled="!editAble"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table-label">摘要：</td>
            <td colspan="3">
              <el-input v-model="reimbursementInfo.summary" placeholder="请填写摘要" :disabled="!editAble"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 特殊费table -->
      <table border="1" v-if="type==='特殊报销'">
        <tbody>
          <tr>
            <td class="table-label">支出项目：</td>
            <td>
              <el-input v-model="input" placeholder="请填写支出项目" :disabled="!editAble"></el-input>
            </td>
            <td class="table-label">报销金额：</td>
            <td>
              <el-input v-model="reimbursementInfo.totalAmount" placeholder="请填写报销金额" :disabled="!editAble"></el-input>
            </td>
          </tr>
          <tr>
            <td class="table-label">摘要：</td>
            <td colspan="3">
              <el-input v-model="reimbursementInfo.summary" placeholder="请填写摘要" :disabled="!editAble"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'expenseTable',
  data() {
    return {
      reason: '',
      startDate: ''
    };
  },
  props: ['type', 'editAble', 'reimbursementInfo'],
  methods: {
  
  },
  components: {
    
  }
}
</script>

<style lang="sass" scoped>
  .expense-table {
    .table-wrapper {
      padding-left: 30px;
      padding-right: 30px;
    }
    table {
      width: 100%;
      border: 1px solid #b4b4b4;
      tr {
        td {
          padding-top: 8px;
          padding-right: 10px;
          padding-bottom: 8px;
          padding-left: 10px;
          &.table-label {
            width: 120px;
            background-color: #f9f9f9;
          }
          .el-date-editor.el-input {
              width: 100%;
          }
        }
      }
    }
  }
</style>