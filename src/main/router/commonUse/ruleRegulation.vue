<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        规章制度
          <button class="btn my-btn submit-btn pull-right f-r" @click="add" v-if="btnShow">
            新建制度
          </button>
          <search-bar  @search="search" class="f-r" :searchItems="searchItems"></search-bar>
      </h3>
      <table class="table table-bordered table-hover table-list">
        <thead>
          <tr>
            <th class="text-center">制度名称</th>
            <th class="text-center">创建时间</th>
            <th class="text-center">最新修订时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(RULE,index) in rules"
              :key="index"
              @click.prevent="mod(RULE)">
            <td class="text-center link-wrap">{{RULE.title}}</td>
            <td class="text-center">{{RULE.releaseTime}}</td>
            <td class="text-center">{{ RULE.updateAt }}</td>
          </tr>
        </tbody>
      </table>
      <p class="empty-list-p" v-if="rules.length === 0">暂无数据</p>
      <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
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
      totalNum: 1,
      searchItems: [
        {
          label: '制度名称',
          value: 'searchContent'
        }
      ],
      searchObj: {}
    };
  },
  computed: {
    btnShow() {
      return (this.user.department === '所长')? true:false;
    }
  },
  props: ['user'],
  created() {
    this.getRuleLists(1);
  },
  methods: {
    mod(RULE) {
      let routeData = this.$router.resolve({ path: '/rule-regulation-detail-'+RULE.id});
      window.open(routeData.href, '_blank');
    },
    add() {
      let routeData = this.$router.resolve({ path: '/rule-regulation-add'});
      window.open(routeData.href, '_blank');
    },
    newRegulation(time) {
      return moment().subtract(7, 'days').isSameOrBefore(time, 'day');
    },
    search(obj) {
      this.searchObj = {}
      this.searchObj = obj
      console.log( this.searchObj)
      if (!this.searchObj.searchContent == '') {
        this.searchRuleLists(1);
      } else {
        this.getRuleLists(1);
      }
    },
    currentChange(newPage) {
      this.pageNum = newPage;
        this.getRuleLists(newPage);
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
              releaseTime: rep.data.data.regulationsArray[i].releaseTime,
              updateAt: rep.data.data.regulationsArray[i].updateAt
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
              searchContent: this.searchObj.searchContent,
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
              releaseTime: rep.data.data.regulationsArray[i].releaseTime,
              updateAt: rep.data.data.regulationsArray[i].updateAt
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
  .pull-right {
    margin-right: 10px;
  }
  .text-center {
    text-align: left;
    padding-left:55px;
  }
  .com-list > .list-group-item {
      padding-left: 30px;
  }
  .adjust-mt {
    margin-top: 40px;
  }
  .title-mr {
    margin-right: 45px;
  }
  .content-mr {
    margin-right: 30px;
  }
</style>
