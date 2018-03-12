<template>
  <div class="main">
    <!-- <crumbs :paths="paths"></crumbs> -->
    <card class="detail-page">
      <card>
        <h3 class="main-title">
          规章制度
          <button type="button" class="btn my-btn cancel-btn pull-right mr-20" @click="del()" v-if="btnShow">删除</button>
          <button class="btn my-btn submit-btn pull-right mr-10" type="button" :user="user" v-if="btnShow" @click="editRule()">编辑</button>       
        </h3>
      </card>
      <card>
        <div class="wrapper">
          <h4 v-html="detail.title"></h4>
          <div class="content">
            <p class="content-area" v-html="detail.content"></p>
          </div>
          <!-- <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
              <p>
                {{detail.releaseDepartment}}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
              <p>
                {{detail.releaseTime}}
              </p>
            </div>
          </div> -->
        </div>
      </card>
    </card>
    <rule-del-modal v-if="showDelModal"
                      :initalRule="editRule1"
                      @deleted="deleted"
                      @canceled="delCanceled"></rule-del-modal>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import ruleDelModal from './component/ruleDelModal.vue';
import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
export default {
  name: 'ruleRegulationDetail',
  data() {
    return {
      showDelModal: false,
      editRule1: {
        id: this.$route.params.id,
        title: '',
        content: ''
      },
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
    ruleDelModal
  }
}
</script>

<style lang="sass" scoped>
.wrapper{
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 30px;
  h4 {
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px solid #dedede;
  }
  .content{
    resize: vertical;
    margin-top: 20px;
    overflow: auto;
    height: 600px;
    p{
      // margin-top: 50px;
      white-space: -webkit-pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -o-pre-wrap;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}
</style>
