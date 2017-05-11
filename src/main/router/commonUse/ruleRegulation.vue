<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <search-bar placeholder="输入关键字搜索规章制度" @search="tog"></search-bar>
      <h3 class="main-title">
        制度列表
        <router-link class="btn btn-primary pull-right"
                     to="/rule-regulation-add">
          新建制度
        </router-link>
      </h3>
      <div class="com-list list-group">
        <router-link class="list-group-item"
                     :to="'/rule-regulation-detail-'+RULE.id"
                     v-for="(RULE,index) in rules"
                     :key="index">
          <span class="title">{{RULE.title}}</span>
          <span class="date pull-right">{{RULE.releaseTime}}</span>
        </router-link>
      </div>
      <pager :pageCount="page.total"
             :currentPage="page.current"
             @change="pageChan"></pager>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import pager from '../../component/pager.vue';
import searchBar from '../../component/searchBar.vue';

export default {
  name: 'ruleRegulation',
  data() {
    return {
      paths: [
        { name: '规章制度', url: '/rule-regulation', present: true }
      ],
      rules: [],
      searchKeyRule: '',
      page: {
        total: 0,
        current: 0
      }
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
    pageChan(newPage) {
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
          this.page.total = parseInt(rep.data.data.pageNum);
          this.page.current = newPage;
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
          this.page.total = parseInt(rep.data.data.pageNum);
          this.page.current = newPage;
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
    pager,
    searchBar
  }
}
</script>

<style lang="sass" scoped>
</style>
