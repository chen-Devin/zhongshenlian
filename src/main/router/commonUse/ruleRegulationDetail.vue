<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3>
        {{detail.title}}
        <button class="btn btn-primary pull-right" type="button" :user="user" v-if="btnShow" @click="editRule()">编辑</button>
      </h3>
      <p class="content-area">{{detail.content}}</p>
      <p class="text-right">{{detail.releaseDepartment}}</p>
      <p class="text-right">{{detail.releaseTime}}</p>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
export default {
  name: 'ruleRegulationDetail',
  data() {
    return {
      paths: [
        { name: '规章制度', url: '/rule-regulation', present: false },
        { name: '制度详情', url: `/rule-regulation-detail-${this.$route.params.id}`, present: true }
      ],
      detail: {
        id: this.$route.params.id,
        title: '',
        content: '',
        releaseDepartment: '',
        releaseTime: ''
      }
    }
  },
  computed: {
    btnShow() {
      return this.user.department === '所长';
    }
  },
  props: ['user'],
  created() {
    this.getRuleDetail();
  },
  methods: {
    getRuleDetail() {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getRegulationsInfo',
              platform: 'web',
              regulationsId: this.$route.params.id
            }
            return JSON.stringify(obj);
          })()
        },
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.detail.title = rep.data.data.title;
          this.detail.content = rep.data.data.content;
          this.detail.releaseDepartment = rep.data.data.releaseDepartment;
          this.detail.releaseTime = rep.data.data.releaseTime;
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    editRule() {
      this.$router.push("/rule-regulation-edit-" + this.detail.id);
    }
  },
  components: {
    crumbs,
    card
  }
}
</script>

<style lang="sass" scoped>
p {
  margin-left: 25px;
  margin-right: 25px;
  &.content-area {
    margin-top: 50px;
    white-space: -webkit-pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>
