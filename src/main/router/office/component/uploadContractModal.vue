<template>
  <modal class="contract-upload" setPadding="1px" modalWidth="500px">
    <div slot="body">
      <div class="upload-header">
        <!-- <span>格式：</span>
        <span>页数：</span> -->
        <button class="btn my-btn draft-btn f-r"
                @click="cancel">
          取消
        </button>
        <button class="btn my-btn submit-btn f-r mr-10"
                @click="submitUpload">
          确认上传
        </button>
      </div>
      <div class="contract-contain">
        <el-upload
          ref="upload"
          :action="actionUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change='handleChange'
          :file-list='fileList'
          :auto-upload="autoUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
    <div slot="footer">
      
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import modal from '../../../component/modal.vue';

export default {
  name: 'sealContractModal',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      autoUpload: false,
      actionUrl: '',
      fileList: [],
      formdata: new FormData()
    };
  },
  props: ['initBusiness'],
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange (file, fileList) {
      this.fileList = fileList
    },
    submitUpload () {
      this.fileList.forEach((item, index, array) => {
        this.formdata.append('file', item.raw)
      })
      let data = (() => {
        let obj = {
          command: 'handlerBusiness',
          platform: 'web',
          id: this.initBusiness.id,
          type: 'electronicContract'
        }
        return JSON.stringify(obj)
      })()
      let urlString = '/fileUpload?data=' + data
      axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        url: urlString,
        data: this.formdata
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.$message.success('合同上传成功')
          this.$emit('changeSuccess')
        } else {
          this.$message.error(rep.data.msg)
        }
      }, (rep) => { })
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  components: {
    modal
  }
};
</script>

<style lang="sass" scoped>
  .contract-upload {
    .upload-header {
      overflow: hidden;
      margin-bottom: 10px;
    }
    p {
      height: 36px;
      line-height: 36px;
    }
    .contract-contain {
      background-color: #f9fbfe;
      padding-top: 20px;
      padding-left: 18px;
      padding-bottom: 10px;
    }
  }
</style>