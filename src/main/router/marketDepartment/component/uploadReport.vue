<template>
  <div class="row">
    <div class="col-sm-7">
      <el-upload
        class="upload-demo ta-r"
        :action="uploadURL"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :type="type">
        <slot>
            <a>上传</a>
        </slot>
        <span></span>
      </el-upload>
    </div>
    <div class="col-sm-5">
      <a class="delete" @click="deleteDoc">删除</a>
    </div>
  </div>
</template>

<style lang="sass" scoped>
    .ta-r {
      text-align: right;
    }
    .delete {
      &:hover {
        cursor: pointer;
      }
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
        this.fileList = [];
        this.fileList.push(obj);
        this.$emit('uploadList',this.fileList);
      }
    },
    deleteDoc() {
      console.log('点击删除');
      console.log(this.fileList);
      this.$emit('deleteDoc');
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
