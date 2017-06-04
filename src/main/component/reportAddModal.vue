<template>
  <modal>
    <form class="clearfix"
          slot="body"
          @submit.prevent
          @keyup.enter.prevent>
      <div class="form-group">
        <label class="col-sm-2 control-label">报告名称</label>
        <div class="col-sm-10">
          <input type="text"
                 class="form-control"
                 placeholder="请输入报告名称"
                 v-model="report.reportName">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">业务报告</label>
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
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="progress-wrap" v-show="reportUpload.progressShow">
            <div class="progress">
              <div class="progress-bar progress-bar-info progress-bar-striped active" :style="{width: reportUpload.percentage}">
                {{reportUpload.percentage}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <ul class="com-list attachment-list list-group">
          <li class="list-group-item">
            <span class="fa fa-file-text-o"></span>
            <a class="text-primary title"
                :href="report.url"
                download>{{report.name}}</a>
          </li>
        </ul>
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
      report: {
        id: '',
        name: '',
        url: '',
        state: false,
        reportName: '',
        adviceState: 0,
      },
      alert: {
        show: false,
        cont: ''
      },
      subBtn: {
        dis: false,
        cont: '保存'
      },
      reportUpload: {
        URL: '',
        progressShow: false,
        percentage: '0%'
      }
    };
  },
  props: ['initBusiness'],
  mounted() {
    let data = {
      command: 'handlerBusiness',
      platform: 'web',
      id: this.business.id,
      type: 'projectReport'
    };
    this.reportUpload.URL = '/fileUpload?data=' + JSON.stringify(data);
  },
  methods: {
    reportUploadProgress(event, file, fileList) {
      this.reportUpload.progressShow = true;
      this.reportUpload.percentage = parseInt(file.percentage)+'%';
    },
    reportUploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path,
          state: false
        };
        this.business.reports.push(obj);
        this.$emit('uploaded', this.business);
        setTimeout(() => {
          this.reportUpload.percentage = '0%';
          this.reportUpload.progressShow = false;
        }, 500);
      }
    },
    reportDelFile(FILE) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'post',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'delFile',
              platform: 'web',
              delFileId: FILE.id,
              type: 'projectReport'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          for (let i = 0; i < this.business.reports.length; i++) {
            if (this.business.reports[i].id === FILE.id) {
              this.business.reports.splice(i, 1);
              break;
            }
          }
          this.$emit('deletedFile', this.business);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
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
