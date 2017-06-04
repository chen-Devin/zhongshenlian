<template>
  <modal>
    <form class="clearfix"
          slot="body"
          @submit.prevent
          @keyup.enter.prevent>
      <div class="form-group">
        <label>报告名称</label>
        <input type="text" class="form-control" placeholder="请输入报告名称" v-model="report.reportName">
      </div>
      <div class="form-group">
        <label>业务报告</label>
        <el-upload class="col-sm-10"
                   :multiple="false"
                   :action="reportUpload.URL"
                   :on-progress="reportUploadProgress"
                   :on-success="reportUploadSuccess"
                   :show-file-list="false">
          <button class="my-btn submit-btn btn-sm"
                  type="button"
                  :disabled="reportUpload.progressShow">点击上传</button>
          <span slot="tip"
                class="text-info">&emsp;文件大小建议不超过3Mb</span>
        </el-upload>
      </div>
      <div class="alert alert-danger well-sm"
           v-show="alert.show">
        {{alert.cont}}
      </div>
    </form>
    <div slot="footer" class="ta-c">
      <button class="btn my-btn submit-btn modal-default-button"
              @click="save()"
              :disabled="subBtn.dis">
        {{subBtn.cont}}
      </button>
      <button class="btn my-btn draft-btn modal-default-button"
              @click="cancel()">
        取消
      </button>
      <button class="btn my-btn cancel-btn modal-default-button"
              @click="del()">
        删除
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from './modal.vue';

export default {
  name: 'customerModModal',
  data() {
    return {
      report: (() => {
        return {
          id: {
            val: this.initalCustomer.id
          },
          customerName: {
            val: this.initalCustomer.customerName,
            ver: this.initalCustomer.customerName === '' ? false : true
          },
          name: {
            val: this.initalCustomer.name,
            ver: this.initalCustomer.name === '' ? false : true
          },
          telephone: {
            val: this.initalCustomer.telephone,
            ver: (() => {
              let reg = /^(1+\d{10})$/;
              if (this.initalCustomer.telephone === '') {
                return false;
              } else if (!reg.test(this.initalCustomer.telephone)) {
                return false;
              } else {
                return true;
              }
            })()
          },
          duty: {
            val: this.initalCustomer.duty,
            ver: this.initalCustomer.duty === '' ? false : true
          },
          department: {
            val: this.initalCustomer.department,
            ver: this.initalCustomer.department === '' ? false : true
          },
          registeredAddress: {
            val: this.initalCustomer.registeredAddress,
            ver: this.initalCustomer.registeredAddress === '' ? false : true
          },
          mailingAddress: {
            val: this.initalCustomer.mailingAddress,
            ver: this.initalCustomer.mailingAddress === '' ? false : true
          },
          businessLicenseNumber: {
            val: this.initalCustomer.businessLicenseNumber,
            ver: this.initalCustomer.businessLicenseNumber === '' ? false : true
          },
          registeredCapital: {
            val: this.initalCustomer.registeredCapital,
            ver: this.initalCustomer.registeredCapital === '' ? false : true
          },
          customerNature: this.initalCustomer.customerNature,
          assetSize: {
            val: this.initalCustomer.assetSize,
            ver: this.initalCustomer.assetSize === '' ? false : true
          },
          industry: {
            val: this.initalCustomer.industry,
            ver: this.initalCustomer.industry === '' ? false : true
          },
          setUpTime: {
            val: this.initalCustomer.setUpTime,
            ver: this.initalCustomer.setUpTime === '' ? false : true
          },
          founderId: {
            val: this.initalCustomer.founderId
          },
          founderName: {
            val: this.initalCustomer.founderName
          },
          founderDepartment: {
            val: this.initalCustomer.founderDepartment
          }
        };
      })(),
      alert: {
        show: false,
        cont: ''
      },
      subBtn: {
        dis: false,
        cont: '保存'
      }
    };
  },
  props: ['initalCustomer'],
  methods: {
    currencyMask,
    save() {
      let reg = /^(1+\d{10})$/;
      this.alert.show = false;
      this.alert.cont = '';
      if (this.customer.customerName.val === '') {
        this.customer.customerName.ver = false;
      } else {
        this.customer.customerName.ver = true;
      }
      if (this.customer.name.val === '') {
        this.customer.name.ver = false;
      } else {
        this.customer.name.ver = true;
      }
      if (this.customer.telephone.val === '') {
        this.customer.telephone.ver = false;
      } else if (!reg.test(this.customer.telephone.val)) {
        this.customer.telephone.ver = false;
      } else {
        this.customer.telephone.ver = true;
      }
      if (this.customer.duty.val === '') {
        this.customer.duty.ver = false;
      } else {
        this.customer.duty.ver = true;
      }
      if (this.customer.department.val === '') {
        this.customer.department.ver = false;
      } else {
        this.customer.department.ver = true;
      }
      if (this.customer.registeredAddress.val === '') {
        this.customer.registeredAddress.ver = false;
      } else {
        this.customer.registeredAddress.ver = true;
      }
      if (this.customer.mailingAddress.val === '') {
        this.customer.mailingAddress.ver = false;
      } else {
        this.customer.mailingAddress.ver = true;
      }
      if (this.customer.businessLicenseNumber.val === '') {
        this.customer.businessLicenseNumber.ver = false;
      } else {
        this.customer.businessLicenseNumber.ver = true;
      }
      if (this.customer.registeredCapital.val === '') {
        this.customer.registeredCapital.ver = false;
      } else {
        this.customer.registeredCapital.ver = true;
      }
      if (this.customer.assetSize.val === '') {
        this.customer.assetSize.ver = false;
      } else {
        this.customer.assetSize.ver = true;
      }
      if (this.customer.setUpTime.val === '') {
        this.customer.setUpTime.ver = false;
      } else {
        this.customer.setUpTime.ver = true;
      }
      if (this.customer.industry.val === '') {
        this.customer.industry.ver = false;
      } else {
        this.customer.industry.ver = true;
      }
      if (!(this.customer.customerName.ver && this.customer.name.ver && this.customer.telephone.ver && this.customer.duty.ver && this.customer.department.ver && this.customer.registeredAddress.ver && this.customer.mailingAddress.ver && this.customer.businessLicenseNumber.val && this.customer.registeredCapital.ver && this.customer.assetSize.ver && this.customer.setUpTime.ver && this.customer.industry.ver)) {
        this.alert.show = true;
        this.alert.cont = '您有信息尚未输入或信息格式有误，请检查';
      } else {
        this.subBtn.dis = true;
        this.subBtn.cont = '保存中...';
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              var obj = {
                command: 'editCustomerInfo',
                platform: 'web',
                data: {
                  id: this.customer.id.val,
                  customerName: this.customer.customerName.val,
                  name: this.customer.name.val,
                  telephone: this.customer.telephone.val,
                  duty: this.customer.duty.val,
                  department: this.customer.department.val,
                  registeredAddress: this.customer.registeredAddress.val,
                  mailingAddress: this.customer.mailingAddress.val,
                  businessLicenseNumber: this.customer.businessLicenseNumber.val,
                  registeredCapital: this.customer.registeredCapital.val,
                  customerNature: this.customer.customerNature,
                  assetSize: this.customer.assetSize.val,
                  industry: this.customer.industry.val,
                  setUpTime: this.customer.setUpTime.val,
                  founderId: this.customer.founderId.val,
                  founderName: this.customer.founderName.val,
                  founderDepartment: this.customer.founderDepartment.val
                }
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.subBtn.cont = '已保存';
            this.$emit('saved', this.customer);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => {});
      }
    },
    cancel() {
      this.$emit('canceled');
    },
    del() {
      this.$emit('del', this.initalCustomer);
    }
  },
  components: {
    modal,
    maskedInput
  }
};
</script>

<style lang="sass" scoped>
  .control-label {
    width: 100%;
  }
</style>
