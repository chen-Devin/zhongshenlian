<template>
    <el-upload
      class="upload-demo ta-c"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :type="type">
      <slot>
          <a>
            <el-button size="small" type="primary">上传</el-button>
          </a>
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
      fileList: []
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
  created() {
    console.log(this.type);
      let data = {
        command: 'handlerBusiness',
        platform: 'web',
        id: this.business.id,
        type: 'shortlistedNotice' //入围通知书 中标通知书bidNotice
      };
      this.uploadURL = '/fileUpload?data=' + JSON.stringify(data);
  },
  props: ['type']
}
</script>