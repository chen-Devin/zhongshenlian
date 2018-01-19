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
                :picker-options="pickerOptions0"
                v-if="editAble">
              </el-date-picker>
              <p v-else>{{reimbursementInfo.startTime.slice(0, 10)}}</p>
            </td>
            <td class="table-label">出差结束日期：</td>
            <td>
              <el-date-picker
                v-model="reimbursementInfo.endTime"
                type="date"
                placeholder="选择出差结束日期"
                :picker-options="pickerOptions1"
                v-if="editAble">
              </el-date-picker>
              <p v-else>{{reimbursementInfo.endTime.slice(0, 10)}}</p>
            </td>
          </tr>
          <tr>
            <td class="table-label">出差地：</td>
            <td>
              <el-input v-model="reimbursementInfo.place" placeholder="请填写出差地" v-if="editAble"></el-input>
              <p v-else>{{reimbursementInfo.place}}</p>
            </td>
            <td class="table-label">出差事由：</td>
            <td>
              <el-radio-group v-model="reimbursementInfo.reason" v-if="editAble">
                <el-radio label="审计"></el-radio>
                <el-radio label="培训"></el-radio>
                <el-radio label="会议"></el-radio>
                <el-radio label="投标"></el-radio>
                <el-radio label="其他"></el-radio>
              </el-radio-group>
              <p v-else>{{reimbursementInfo.reason}}</p>
            </td>
          </tr>
          <tr>
            <td class="table-label">合计金额：</td>
            <td colspan="3">
              <p>{{ totalAmount }}</p> 
            </td>
          </tr>
          <tr>
            <td class="table-label">摘要：</td>
            <td colspan="3">
              <el-input v-model="reimbursementInfo.summary" placeholder="请填写摘要" v-if="editAble"></el-input>
              <p v-else>{{reimbursementInfo.summary}}</p> 
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
              <el-select v-model="reimbursementInfo.expenditureProject" placeholder="请选择支出项目" v-if="editAble">
                <el-option
                  v-for="(item, index) in expenditureProjects"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <p v-else>{{ reimbursementInfo.expenditureProject }}</p>
            </td>
            <td class="table-label">报销金额：</td>
            <td>
              <!-- <el-input v-model="reimbursementInfo.totalAmount" placeholder="请填写报销金额" v-if="editAble"></el-input> -->
              <p>{{ totalAmount }}</p> 
            </td>
          </tr>
          <tr>
            <td class="table-label">摘要：</td>
            <td colspan="3">
              <el-input v-model="reimbursementInfo.summary" placeholder="请填写摘要" v-if="editAble"></el-input>
              <p v-else>{{reimbursementInfo.summary}}</p>
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
    let that = this
    return {
      reason: '',
      startDate: '',
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        disabledDate (time) {
          if (that.reimbursementInfo.startTime === '') {
            return false
          } else {
            return ((time.getTime() < that.reimbursementInfo.startTime) || (time.getTime() > Date.now() - 8.64e7))
          }
        }
      }
    }
  },
  computed: {
    expenditureProjects() {
      if (this.reimbursementInfo.submitType === 'projectR') {
        return  [
          '咨询服务费',
          '劳务费',
          '其他'
        ]
      } else if (this.reimbursementInfo.submitType === 'personalR' || this.reimbursementInfo.submitType === 'publicR') {
        return  [
          '办公费',
          '通讯费',
          '晒鼓纸',
          '硬盘U盘',
          '低值易耗品',
          '购置资产',
          '修理费',
          '房租',
          '水电费',
          '物业费',
          '财务费',
          '协会费用',
          '业务招待费',
          '过路费',
          '汽油费',
          '停车费',
          '其他'
        ]
      } else {
        return []
      }
    },
    _submitType() {
      return this.reimbursementInfo.submitType
    }
  },
  watch: {
    _submitType: function (val, oldVal) {
      if (val !== oldVal) {
        if (this.editAble) {
          this.reimbursementInfo.expenditureProject = ''
        }
      }
    }
  },
  props: ['type', 'editAble', 'reimbursementInfo', 'totalAmount']
}
</script>

<style lang="sass">
  .expense-table {
    p {
      min-height: 18px;
    }
    .table-wrapper {
      padding-left: 30px;
      padding-right: 30px;
    }
    table {
      width: 100%;
      border: 1px solid #b4b4b4;
      .el-input__inner {
        padding-left: 0;
        border: 1px solid #fff;
      }
      tr {
        td {
          padding-right: 10px;
          padding-left: 10px;
          padding-top: 2px;
          padding-bottom: 2px;
          &.table-label {
            width: 120px;
            background-color: #f9f9f9;
          }
          .el-date-editor.el-input {
              width: 100%;
          }
          .el-input.is-disabled .el-input__inner {
            background-color: #fafafa;
            border-color: #fff;
          }
          p{
           margin-top: 10px; 
          }
        }
      }
    }
  }
</style>