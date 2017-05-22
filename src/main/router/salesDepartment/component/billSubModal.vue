<template>
<modal>
  <div slot="body">
    <p>
      <span class="fa fa-exclamation-circle fa-5x text-success"></span>
      <span class="text-cont">提交后将不能修改！确定提交该开票申请吗？</span>
    </p>
  </div>
  <div slot="footer">
      <button class="btn my-btn submit-btn modal-default-button" @click="sub()" :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn draft-btn modal-default-button" @click="cancel()">
        取消
      </button>
    </div>
</modal>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from '../../../component/modal.vue';

export default {
  name: 'billSubModal',
  data() {
    return {
      bill: this.initBill,
      business: this.initBusiness,
      subBtn: {
        dis: false,
        cont: '提交'
      }
    };
  },
  props: ['initBill', 'initBusiness'],
  methods: {
    sub() {
      this.subBtn.cont = '提交中...';
      this.subBtn.dis = true;
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              let obj = {
                command: 'createBillingInfo',
                platform: 'web',
                id: this.business.id,
                data: {
                  projectId: this.business.id,
                  billingApplicantId: this.bill.proposer.id,
                  billingApplicantName: this.bill.proposer.name,
                  applicantPhone: this.bill.proposer.tele,
                  requesterId: this.business.institution.id,
                  requesterName: this.business.institution.name,
                  requesterPhone: this.business.institution.telephone,
                  billingType: this.bill.type,
                  billingUnit: this.bill.billingUnit,
                  billingAmount: this.bill.amount,
                  companyName: this.bill.unit.name,
                  taxpayerNumber: this.bill.taxpayerID,
                  companyAddress: this.bill.unit.address,
                  companyPhone: this.bill.unit.tele,
                  openCountBank: this.bill.unit.depositBank,
                  openBankNumber: this.bill.unit.account,
                  applicationDate: this.bill.filingDate,
                  totalBillingAmount: this.bill.addUpAmount,
                  deliveryMethod: this.bill.way,
                  recipientName: this.bill.receiver,
                  deliverAddress: this.bill.receiveAdd,
                  recipientId: '',
                  signContractNumber: this.business.number,
                  serviceContent: this.bill.content,
                  signContractAmount: this.business.contractAmount,
                  startServiceTime: this.business.time.start,
                  endServiceTime: this.business.time.end,
                  annexArray: [],
                  state: this.bill.state
                }
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.subBtn.cont = '已提交';
            this.$emit('submited', rep.data.data.id);
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      });
      return promise;
    },
    cancel() {
      this.$emit('canceled');
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
p {
  span {
    display: inline-block;
    &.fa {
      margin: 0 20px 0 40px;
    }
  }
}
</style>
