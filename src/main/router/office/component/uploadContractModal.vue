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
                @click="sealContract">
          确认上传
        </button>
      </div>
      <div class="contract-contain">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
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
      dialogVisible: false
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
    cancel () {
      this.$emit('cancel')
    },
    sealContract () {
      return new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'sealContract',
                platform: 'web',
                projectId: this.initBusiness.id
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$message.success(rep.data.msg)
            this.$emit('changeSuccess')
            resolve('done')
          } else {
            this.$message.error(rep.data.msg)
          }
        }, (rep) => { });
      })
    },
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