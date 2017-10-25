<template>
  <div class="billing-detail">
    <card>
      <p class="btns f-r" v-if="user.department === '财务部'">
        <button 
          class="btn my-btn submit-btn" 
          v-if="(Number(bill.state) === 0 || Number(bill.state) === 1) && billBtn" 
          @click="showBillUpload('bill')">开票</button>
        <button 
          class="btn my-btn submit-btn" 
          v-if="Number(bill.state) === 0 || Number(bill.state) === 2 && receiveBtn" 
          @click="showBillUpload('receive')">上传收款截图</button>
        <button 
          class="btn my-btn cancel-btn" 
          v-if="Number(bill.revokeState) === 10"
          @click="reject(bill)">驳回</button>
      </p>
      <h4 class="main-title">开票内容</h4>
      <p>{{ bill.state }}</p>
      <div class="detail-wrapper">
        <el-row>
          <el-col :span="12">
            本次开票金额：{{ bill.amount }}
          </el-col>
          <el-col :span="12">
            单位电话：{{ bill.unit.tele }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            销售方单位名称：{{ bill.unit.name }}
          </el-col>
          <el-col :span="12">
            开户银行：{{ bill.unit.depositBank }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            申请开票种类：{{ bill.type }}
          </el-col>
          <el-col :span="12">
            开户账号：{{ bill.unit.account }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            单位名称：{{ bill.billingUnit }}
          </el-col>
          <el-col :span="12">
            送达方式：{{ bill.way }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            纳税人识别号：{{ bill.taxpayerID }}
          </el-col>
          <el-col :span="12">
            服务内容：{{ bill.content }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            发票图片：
            <a 
              target="_blank" 
              :href="item.url" 
              v-for="(item, index) in bill.billFiles"
              :key="index">{{ item.name }}</a>
          </el-col>
          <el-col :span="12">
            收款图片：
            <a 
              target="_blank" 
              :href="item.url" 
              v-for="(item, index) in bill.receiptFiles"
              :key="index">{{ item.name }}</a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            备注：{{ bill.remark }}
          </el-col>
        </el-row>
        <hr>
        <p class="d-f">
          <span style="width:70px;">撤销原因：</span>
          <span>。。。</span>
        </p>
      </div>
    </card>
    <modal v-if="billUploadShow">
      <div slot="body">
        <p class="d-f">
          <span style="width:50px;">备注：</span>
          <el-input type="textarea" v-model="remark"></el-input>
        </p>
        <p class="d-f">
          <span style="width:100px;">上传{{ uploadType }}：</span>
          <el-upload
            ref="upload"
            :action="uploadURL"
            :auto-upload="autoUpload"
            list-type="picture-card"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </p>
        <p class="d-f">
          <span style="width:100px;"></span>
          <span>文件大小建议不超过3MB</span>
        </p>
      </div>
      <div slot="footer">
        <p class="btns ta-c">
          <button class="btn my-btn submit-btn" :disabled="btnDis" @click="submitUpload">保存</button>
          <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
        </p>
      </div>
    </modal>
    <modal v-if="cancelModalShow">
      <div slot="body">
        撤销后不能更改，确定驳回吗？
      </div>
      <p slot="footer">
        <button class="btn my-btn cancel-btn" @click="revokedBilling">确定</button>
        <button class="btn my-btn submit-btn" @click="back">取消</button>
      </p>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import bus from '@/main/bus.js'
import card from '@/main/component/card.vue'
import modal from '@/main/component/modal.vue'

export default {
  name: 'billingDetail',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      autoUpload: false,
      remark: '',
      fileList: [
        
      ],
      billUploadShow: false,
      cancelModalShow: false,
      billBtn: true,
      receiveBtn: true,
      uploadType: '',
      billingType: '',
      user: {}
    }
  },
  computed: {
    btnDis () {
      if (this.remark) {
        return false
      } else {
        return true
      }
    },
    uploadURL () {
      let data = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.bill.id,
        type: this.billingType,
        annexId: '',
        remark: this.remark
      };
      return '/fileUpload?data=' + JSON.stringify(data); 
    }
  },
  props: ['bill'],
  methods: {
    reject (bill) {
      this.cancelModalShow = true
      console.log(bill)
    },
    back () {
      this.cancelModalShow = false
    },
    showBillUpload (type) {
      if (type === 'bill') {
        this.uploadType = '发票'
        this.billingType = 'billingOthers'
      } else if (type === 'receive') {
        this.uploadType = '收款截图'
        this.billingType = 'receivables'
      }
      this.billUploadShow = true
    },
    cancel () {
      this.billUploadShow = false
    },
    handleRemove(file, fileList) {
      
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.fileList = []
      this.fileList.push(file)
    },
    submitUpload() {
      this.formdata = new FormData()
      this.fileList.forEach((item, index, array) => {
        this.formdata.append('file', item.raw)
      })
      axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        url: this.uploadURL,
        data: this.formdata
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.cancel()
          this.fileList = []
          this.remark = ''
          this.$message.success('上传成功')
          if (this.billingType === 'billingOthers') {
            this.billBtn = false
            this.bill.billFiles.push(
              {
                name: rep.data.data.name,
                url: rep.data.data.path
              }
            )
          } else if (this.billingType === 'receivables') {
            this.receiveBtn = false
            this.bill.receiptFiles.push(
              {
                name: rep.data.data.name,
                url: rep.data.data.path
              }
            )
          }
          bus.$emit('reloadFinancialDetail')
        } else {
          this.$message.error(rep.data.msg)
        }
      }, (rep) => { })
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
                type: 'del'
              }
              return JSON.stringify(obj)
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            bus.$emit('reloadFinancialDetail')
            this.$message.success('操作成功')
            this.cancelModalShow = false
            // if (this.) {
            //   billBtn
            // }
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { })
      })
    }
  },
  components: {
    card,
    modal
  },
  created () {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { })
  }
}
</script>

<style lang="sass" scoped>
  .billing-detail {
    margin-bottom: 20px;
    .btns {
      button {
        margin-top: 10px;
        &:first-child {
          // margin-right: 10px;
        }
      }
    }
    .detail-wrapper {
      padding-left: 100px;
      padding-right: 100px;
      .el-row {
        height: 36px;
        line-height: 36px;
      }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #20a0ff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>