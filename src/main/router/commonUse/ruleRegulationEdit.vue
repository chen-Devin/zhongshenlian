<template>
  <div class="main">
    <!-- <crumbs :paths="paths"></crumbs> -->
    <card class="detail-page">
      <card>
        <h3 class="main-title">
          编辑制度
          <div class="pull-right">
            <button type="button" class="btn my-btn submit-btn" @click="saveEdit()">保存</button>
            <button type="button" class="btn my-btn draft-btn mr-20" @click="cancel()">取消</button>
            <!-- <button type="button" class="btn my-btn cancel-btn mr-10" @click="del()">删除</button> -->
          </div>
        </h3>
      </card>
      <card>
        <div class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
          <div class="form-group">
            <el-form :label-position="labelPosition">
              <el-row class="el-form-item">
                <el-col class="d-f" :span="21" :offset="1">
                  <span class="rule-label">标题：</span> 
                  <el-input
                    type="text"
                    placeholder="请输入标题"
                    v-model="editRule.title"
                    style="flex:1;"></el-input>
                </el-col>
              </el-row> 
              <el-row class="el-form-item"> 
                <el-col class="d-f" :span="21" :offset="1">
                  <span class="rule-label">正文：</span> 
                  <vue-editor style="flex:1;" v-model="editRule.content" :editorToolbar="customToolbar"></vue-editor>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!-- <div class="form-group">
            <label class="col-sm-2 control-label">标题</label>
            <div class="col-sm-9">
              <input type="text"
                     class="form-control"
                     placeholder="请输入标题"
                     v-model="editRule.title">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">正文</label>
            <div class="col-sm-9">
              <vue-editor v-model="editRule.content" :editorToolbar="customToolbar"></vue-editor>
            </div>
          </div> -->
        </div>
        <rule-can-modal v-if="showCanModal"
                        @deleted="canDeleted"
                        @canceled="canCanceled"></rule-can-modal>
      </card>
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
  name: 'ruleRegulationEdit',
  data() {
    return {
      paths: [
        { name: '规章制度', url: '/rule-regulation', present: false },
        { name: '制度详情', url: `/rule-regulation-detail-${this.$route.params.id}`, present: false },
        { name: '编辑制度', url: `/rule-regulation-edit-${this.$route.params.id}`, present: true }
      ],
      editRule: {
        id: this.$route.params.id,
        title: '',
        content: ''
      },
      labelPosition: 'left',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // ['blockquote', 'code-block'],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        // [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }]
        // ['clean']
      ],
          // [{ 'script': 'sub'}, { 'script': 'super' }]
         // [{ 'indent': '-1'}, { 'indent': '+1' }],
         // [{ 'direction': 'rtl' }]            
         //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
           // [{ 'header': 1 }, { 'header': 2 }],        
         //           ['link', 'image', 'video']   
      showDelModal: false,
      showCanModal: false
    };
  },
  created() {
    this.getEditDetail();
  },
  methods: {
    getEditDetail() {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getRegulationsInfo',
              platform: 'web',
              regulationsId: this.editRule.id
            }
            return JSON.stringify(obj);
          })()
        },
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.editRule.title = rep.data.data.title;
          this.editRule.content = rep.data.data.content;
          this.editRule.releaseDepartment = rep.data.data.releaseDepartment;
          this.editRule.releaseTime = rep.data.data.releaseTime;
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    saveEdit() {
      if (this.editRule.title !== ''&& this.editRule.content !== '') {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              var obj = {
                command: 'addOrEditRegulations',
                platform: 'web',
                regulationsId: this.$route.params.id,
                title: this.editRule.title,
                content: this.editRule.content
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.$router.push('/rule-regulation-detail-' + this.editRule.id)
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
      this.$router.push('/rule-regulation-detail-' + this.editRule.id);
    },
    canCanceled() {
      this.showCanModal = false;
    },
    del() {
      this.showDelModal = true;
    },
    deleted() {
      this.showDelModal = false;
      this.$router.push({ path: '/rule-regulation' });
    },
    delCanceled() {
      this.showDelModal = false;
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
.rule-label {
  width: 60px;
  line-height: 36px;
}
.normal-wrap {
  overflow: hidden;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  textarea {
    resize: vertical;
  }
}
</style>
