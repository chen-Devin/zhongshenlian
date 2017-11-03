<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        规章制度录入
        <button type="button" class="btn my-btn submit-btn mr-10 f-r" @click="saveEdit()">保存</button>
        <button type="button" class="btn my-btn draft-btn f-r mr-10" @click="cancel()">取消</button> 
      </h3>
    </card>
    <card>  
      <div class="form-horizontal present-wrap" @submit.prevent @keyup.enter.prevent>
        <div class="form-group">
          <el-form :label-position="labelPosition">
            <el-row class="el-form-item">
              <el-col :span="20" :offset="1">
                 <el-form-item label="标题：" label-width = "50px">
                    <el-input type="text"
                           placeholder="请输入标题"
                           v-model="ruleAdd.title"></el-input>
                 </el-form-item>
              </el-col>
            </el-row> 
            <el-row class="el-form-item"> 
              <el-col :span="20" :offset="1">
                 <el-form-item label="正文：" label-width = "50px">
                    <vue-editor v-model="ruleAdd.content" :editorToolbar="customToolbar"></vue-editor>
                 </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <rule-can-modal v-if="showCanModal"
                        @deleted="canDeleted"
                        @canceled="canCanceled"></rule-can-modal> 
      </div>   
    </card>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import {VueEditor} from 'vue2-editor';
import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import ruleCanModal from './component/ruleCanModal.vue';

Vue.prototype.$message = Message;

export default {
  name: 'ruleRegulationAdd',
  data() {
    return {
      paths: [
        { name: '规章制度', url: '/rule-regulation', present: false },
        { name: '新建制度', url: `/rule-regulation-add`, present: true }
      ],
      ruleAdd: {
        id: '',
        title: '',
        content: ''
      },
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // ['blockquote', 'code-block'],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        // [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }]
      ],
      showCanModal: false,
      labelPosition: 'left'
    }
  },
  methods: {
    saveEdit() {
      if (this.ruleAdd.title !== '' && this.ruleAdd.content !== '') {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              var obj = {
                command: 'addOrEditRegulations',
                platform: 'web',
                title: this.ruleAdd.title,
                content: this.ruleAdd.content
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.ruleAdd.id = rep.data.data.id;
            this.$router.push('/rule-regulation');
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      } else {
        this.$message({
          message: '请输入标题和正文',
          type: 'warning'
        });
      }
    },
    cancel() {
      this.showCanModal = true;
    },
    canDeleted() {
      this.showCanModal = false;
      this.$router.push('/rule-regulation');
    },
    canCanceled() {
      this.showCanModal = false;
    }
  },
  components: {
    crumbs,
    card,
    ruleCanModal,
    VueEditor
  }
}
</script>

<style lang="sass" scoped>
.form-group {
  margin-bottom: 22px;
}
 input{
 background-color: #F9FBFE;
 border: 1px solid #DADADA;
 border-radius: 2px;
 }
.self-label{
  width: 60px;
  padding-right: 0;
  padding-top: 7px;
}
.present-wrap {
  overflow: hidden;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
}
  textarea {
    resize: vertical;
    background-color: #F9FBFE;
    border: 1px solid #DADADA;
    border-radius: 2px;
  }
  .btn-group {
    float: right;
    margin-top: -10px;
  }
</style>
