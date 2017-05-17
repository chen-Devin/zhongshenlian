<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <search-bar placeholder="输入关键字搜索规章制度" @search="tog"></search-bar>
      <h3 class="main-title">
        制度列表
        <router-link class="btn my-btn submit-btn pull-right"
                     to="/rule-regulation-add"
                     tag="button">
          新建制度
        </router-link>
      </h3>
      <div class="com-list list-group">
        <li class="list-group-item list-head">
          <span class="title">信息列表</span>
          <span class="date pull-right">创建时间</span>
        </li>
        <router-link class="list-group-item"
                     :to="'/rule-regulation-detail-'+RULE.id"
                     v-for="(RULE,index) in rules"
                     :key="index">
          <span class="title">{{RULE.title}}</span>
          <span class="date pull-right">{{RULE.releaseTime}}</span>
        </router-link>
      </div>
      <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import searchBar from '../../component/searchBar.vue';
import myPagination from '../../component/pagination.vue';

export default {
  name: 'ruleRegulation',
  data() {
    return {
      paths: [
        { name: '规章制度', url: '/rule-regulation', present: true }
      ],
      rules: [],
      searchKeyRule: '',
      pageNum: 1,
      totalPage: 1,
      totalNum: 1
    };
  },
  props: ['user'],
  created() {
    this.getRuleLists(1);
  },
  methods: {
    tog(searchCont) {
      this.searchKeyRule = searchCont;
      if (this.searchKeyRule === '') {
        this.getRuleLists(1);
      } else {
        this.searchRuleLists(1);
      }
    },
    currentChange(newPage) {
      this.pageNum = newPage;
      if (this.searchKeyRule === '') {
        this.getRuleLists(newPage);
      } else {
        this.searchRuleLists(newPage);
      }
    },
    getRuleLists(newPage) {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getRegulationsList',
              platform: 'web',
              pageNum: newPage
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.totalPage = parseInt(rep.data.data.pageNum);
          this.totalNum = parseInt(rep.data.data.totalNum);
          this.rules.length = 0;
          for (let i = 0; i < rep.data.data.regulationsArray.length; i++) {
            let obj = {
              id: rep.data.data.regulationsArray[i].id,
              title: rep.data.data.regulationsArray[i].title,
              releaseTime: rep.data.data.regulationsArray[i].releaseTime
            };
            this.rules.push(obj);
          }
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    searchRuleLists(newPage) {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'searchRegulationsList',
              platform: 'web',
              searchContent: this.searchKeyRule,
              pageNum: newPage
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.totalPage = parseInt(rep.data.data.pageNum);
          this.totalNum = parseInt(rep.data.data.totalNum);
          this.rules.length = 0;
          for (let i = 0; i < rep.data.data.regulationsArray.length; i++) {
            let obj = {
              id: rep.data.data.regulationsArray[i].id,
              title: rep.data.data.regulationsArray[i].title,
              releaseTime: rep.data.data.regulationsArray[i].releaseTime
            };
            this.rules.push(obj);
          }
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    }
  },
  components: {
    crumbs,
    card,
    myPagination,
    searchBar
  }
}
</script>

<style lang="sass" scoped>
</style>
