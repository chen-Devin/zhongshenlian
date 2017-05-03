<template>
    <el-upload
      class="upload-demo ta-c"
      :action="uploadURL"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :type="type">
      <slot>
          <a>上传</a>
            <!-- <el-button size="small" type="primary">上传</el-button> -->
      </slot>
      <span></span>
    </el-upload>
</template>

<style lang="sass" scoped>
    .ta-c {
      text-align: center;
    }
</style>
  
<script>
import Vue from 'vue';
import axios from 'axios';
import { Upload } from 'element-ui';

Vue.use(Upload);

export default {
  name: 'uploadReport',
  data() {
    return {
      fileList: [],
      uploadURL: ''
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadSuccess(responseData, file, fileList) {
      if (responseData.statusCode === '10001') {
        let obj = {
          id: responseData.data.id,
          name: file.name,
          url: responseData.data.path
        };
        this.business.reports.push(obj);
      }
    }
  },
  mounted() {
      let data = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.id,
        type: this.type
      };
      this.uploadURL = '/fileUpload?data=' + JSON.stringify(data);
      console.log(this.uploadURL);
  },
  props: ['type','id']
}
</script>