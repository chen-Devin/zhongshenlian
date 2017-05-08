<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <div class="search-wrap">
        <form class="form-horizontal">
          <div class="form-group">
            <div class="col-sm-12">
              <div class="input-group">
                <input type="text"
                       class="text-center form-control"
                       placeholder="请输入关键词、制度编号"
                       v-model.trim="searchKeyRule">
                <span class="input-group-btn">
                  <button class="btn btn-primary"
                          type="button"
                          @click="tog">搜索</button>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <h3>
        制度列表
        <router-link class="btn btn-primary pull-right"
                     to="/rule-regulation-add">
          新建制度
        </router-link>
      </h3>
      <div class="rule-list list-group">
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
  created() {
    this.getRuleLists(1);
  },
  props: ['user'],
  methods: {
    tog() {
      this.searchRuleLists(1);
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
          this.page.total = rep.data.data.pageNum;
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
          this.page.total = rep.data.data.pageNum;
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
        }
      }, (rep) => { });
    }
  },
  components: {
    crumbs,
    card,
    pager
  }
}
</script>

<style lang="sass" scoped>
.search-wrap {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}
.rule-list {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  > a.list-group-item {
    border-right: 0;
    border-left: 0;
    > span.title {
      margin-left: 7px;
    }
  }
  > a.list-group-item:first-child {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  > a.list-group-item:last-child {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
