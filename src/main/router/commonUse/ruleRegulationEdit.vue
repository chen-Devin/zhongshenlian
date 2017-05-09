<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3>
        编辑制度
        <div class="pull-right">
          <button type="button" class="btn btn-primary" @click="saveEdit()">保存</button>
          <button type="button" class="btn btn-default" @click="canceled()">取消</button>
        </div>
      </h3>
      <form class="form-horizontal normal-wrap">
        <div class="form-group">
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
            <textarea cols="50"
                      rows="30"
                      class="form-control"
                      placeholder="请输入正文"
                      v-model="editRule.content">
            </textarea>
          </div>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';

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
      }
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
          }
        }, (rep) => { });
      } else {
        this.$message({
          message: '请输入标题和正文',
          type: 'warning'
        });
      }
    },
    canceled() {
      this.$router.push('/rule-regulation-detail-' + this.editRule.id);
    }
  },
  components: {
    crumbs,
    card
  }
}
</script>

<style lang="sass" scoped>
.normal-wrap {
  textarea {
    resize: vertical;
  }
}
</style>
