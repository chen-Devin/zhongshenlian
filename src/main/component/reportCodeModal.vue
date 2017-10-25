<template>
  <div>
    <modal>
      <div slot="body">
        <!-- <p class="d-f">
          <span style="width:50px;">备注：</span>
          <el-input type="textarea" v-model="remark"></el-input>
        </p> -->
        <p class="d-f">
          <span style="width:100px;">上传二维码：</span>
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
          <button class="btn my-btn submit-btn" @click="submitUpload">保存</button>
          <button class="btn my-btn cancel-btn" @click="cancel">取消</button>
        </p>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import modal from './modal.vue';

export default {
  name: 'reportNumberModal',
  data() {
    return {
      autoUpload: false,
      fileList: [],
      formdata: ''
    }
  },
  computed: {
    uploadURL () {
      let obj = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.projectId,
        type: 'projectQRcode',
        reportId: this.id
      }
      return '/fileUpload?data=' + JSON.stringify(obj)
    }
  },
  props: ['id', 'projectId'],
  methods: {
    handleRemove(file, fileList) {
      
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange(file, fileList) {
      this.fileList = []
      this.fileList.push(file)
    },
    confirmQRcode () {
      
    },
    cancel() {
      this.$emit('canceled');
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
          this.$message.success('上传成功')
        } else {
          this.$message.error(rep.data.msg)
        }
      }, (rep) => { })
    }
  },
  components: {
    modal
  }
}
</script>

<style lang="sass" scoped>
  
</style>