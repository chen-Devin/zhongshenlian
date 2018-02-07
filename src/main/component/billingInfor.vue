<template>
  <div class="billing-infor">
    <div class="normal-wrap">
      <h4 class="main-title">
        开票列表 （合同预估金额：{{business.contractAmount}}元&emsp;当前申请发票总计：{{business.sumBillingAmount}}元）
        <template v-if="addBillShow && !initBusiness.financeCreateBillingState">
          <button class="btn my-btn cancel-btn pull-right mr-10" @click="sub()">完成开票</button>
          <router-link class="btn my-btn submit-btn pull-right mr-10"
                       :to="billingInforEditorLink">
            开票申请
          </router-link>
        </template>
      </h4>
      <table class="table table-bordered table-list">
        <thead>
          <tr>
            <th class="ta-c"></th>
            <th class="ta-c">开票金额</th>
            <th class="ta-c">申请时间</th>
            <th class="ta-c">开票时间</th>
            <th class="ta-c">到账时间</th>
            <th class="ta-c">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(BILL, index) in business.bills" 
            :key="index">
            <td class="ta-c">
              <span class="state reject" v-if="Number(BILL.revokeState) === 60">驳回</span>
              <span class="state back" v-else-if="Number(BILL.revokeState) === 30">退回</span>
              <span class="state ruin" v-else-if="Number(BILL.revokeState) === 40">作废</span>
              <span class="state rush" v-else-if="Number(BILL.revokeState) === 50">冲回</span>
            </td>
            <td class="ta-c">{{ BILL.amount }}</td>
            <td class="ta-c">{{ BILL.applicationTime }}</td>
            <td class="ta-c">{{ BILL.billingTime === '' ? empty : BILL.billingTime }}</td>
            <td class="ta-c">{{ BILL.paymentTime === '' ? empty : BILL.paymentTime }}</td>
            <td class="ta-c">
              <button class="btn my-btn submit-btn" @click="check(BILL, index)">查看</button>
              <button 
                class="btn my-btn cancel-btn" 
                @click="cancel(BILL)" 
                :disabled="BILL.revokeState !== '0010'"
                v-if="user.department === '业务部'">撤销</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="empty-list-p" v-if="business.bills.length === 0">暂无数据</p>
    </div>
    <modal v-if="cancelModalShow">
      <div slot="body">
        撤销后不能更改，确定撤销吗？
      </div>
      <p slot="footer">
        <button class="btn my-btn cancel-btn" @click="revokedBilling">确定</button>
        <button class="btn my-btn submit-btn" @click="back">取消</button>
      </p>
    </modal>
    <complete-bill-modal v-if="showModal"
                         :initBusiness="business"
                         @submited="submited"
                         @canceled="canceled"></complete-bill-modal>
  </div>
</template>

<script>
import axios from 'axios'
import bus from '@/main/bus.js'
import modal from '@/main/component/modal.vue'
import completeBillModal from '@/main/router/financialDepartment/component/completeBillModal.vue';

export default {
  name: 'billingInfor',
  data() {
    return {
      paths: [],
      business: this.initBusiness,
      empty: '',
      cancelModalShow: false,
      bill: {},
      showModal: false
    };
  },
  computed: {
    total() {
      let sum = 0;
      for (let i = 0; i < this.business.bills.length; i++) {
        sum += this.currencyToNum(this.business.bills[i].amount);
      }
      let sumStr = sum.toString().split('.');
      let sumInt = sumStr[0];
      let sumArr = [];
      for (let i = sumInt.length; i > 0; i -= 3) {
        let part = sumInt.substring(i-3, i);
        sumArr.unshift(part);
      }
      return sumArr.join(',') + ((sumStr.length > 1) ? ('.'+sumStr[1]) : '');
    },
    addBillShow() {
      return this.user.department === '业务部' ? true : false;
    },
    billingInforEditorLink () {
      return '/bill-apply-add/' + this.business.id
    }
  },
  props: ['initBusiness', 'user'],
  methods: {
    sub() {
      this.showModal = true;
    },
    submited() {
      this.business.financeCreateBillingState = 1;
      this.showModal = false;
      bus.$emit('bill-completed')
    },
    canceled() {
      this.showModal = false;
    },
    currencyToNum(amo) {
      let amoArr = amo.split(',').reverse();
      let amoNum = 0;
      for (let i = 0; i < amoArr.length; i++) {
        amoNum += parseFloat(amoArr[i])*Math.pow(1000, i);
      }
      return amoNum;
    },
    check (bill, i) {
      bill.DetailIndex = i
      bus.$emit('bill-selected', bill)
    },
    cancel (bill) {
      this.bill = bill
      this.cancelModalShow = true
    },
    revokedBilling () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'revokedBilling',
                platform: 'web',
                id: this.bill.id,
                type: 'revoke'
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success('撤销成功')
            this.bill.revokeState = ''
            this.back()
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
    back () {
      this.cancelModalShow = false
    }
  },
  created () {
    bus.$on('reloadState', (bill) => {
      this.business.bills[bill.DetailIndex].revokeState = bill.revokeState
    })
  },
  components: {
    modal,
    completeBillModal
  }
};
</script>

<style lang="sass" scoped>

  .billing-infor {
    .main-title {
      margin-top: 0;
    }
    .total-amount {
      margin-top: 30px;
    }
    .state {
      display: inline-block;
      width: 50px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #000;
      border-radius: 5px;
      font-size: 13px;
      &.reject {
        color: #f00;
        border-color: #f00;
      }
      &.back {
        color: #5cc1e0;
        border-color: #5cc1e0;
      }
      &.ruin {
        color: #666;
        border-color: #666;
      }
      &.rush {
        color: #E51C23;
        border-color: #E51C23;
      }
    }
  }
</style>
