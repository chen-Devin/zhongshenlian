<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        规章制度
          <button class="btn my-btn submit-btn pull-right f-r" @click="add">
            新建制度
          </button>
          <search-bar  @search="tog" class="f-r"></search-bar>
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
      <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
    </card>
   <!--  <card>
      <search-bar placeholder="输入关键字搜索规章制度" @search="tog" class="f-r"></search-bar>
      <h3 class="main-title adjust-mt">
        制度列表
        <router-link class="btn my-btn submit-btn pull-right"
                     to="/rule-regulation-add"
                     tag="button"
                     v-if="btnShow">
          新建制度
        </router-link>
      </h3>
      <div class="com-list list-grou list-adjust">
        <li class="list-group-item list-head">
          <span class="title">信息列表</span>
          <span class="date pull-right">修改时间</span>
          <span class="date pull-right title-mr">创建时间</span>
        </li>
        <router-link class="list-group-item"
                     :to="'/rule-regulation-detail-'+RULE.id"
                     v-for="(RULE,index) in rules"
                     :key="index">
          <span class="label label-info" v-if="newRegulation(RULE.releaseTime)">新</span>
          <span class="title">{{RULE.title}}</span>
          <span class="date pull-right">{{ RULE.updateAt }}</span>
          <span class="date pull-right content-mr">{{RULE.releaseTime}}</span>
        </router-link>
      </div>
      <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
    </card> -->
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
      totalNum: 1
    };
  },
  computed: {
    btnShow() {
      return this.user.department === '所长';
    }
  },
  props: ['user'],
  created() {
    this.getRuleLists(1);
  },
  methods: {
    mod(RULE) {
      this.$router.push('/rule-regulation-detail-'+RULE.id)
    },
    add() {
      this.$router.push('/rule-regulation-add')
    },
    newRegulation(time) {
      return moment().subtract(7, 'days').isSameOrBefore(time, 'day');
    },
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
    margin-right: 30px;
  }
  .text-center {
    text-align: left;
    padding-left:55px;
  }
  .table-bordered {
    margin-top: 30px;
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
