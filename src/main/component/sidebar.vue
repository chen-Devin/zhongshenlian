<template>
  <div class="sidebar">
    <ul class="nav nav-sidebar">
      <li v-for="(ROU, index) in routes" v-bind:key="index">
        <div class="inside-div" v-bind:class="{active: ROU.show}" v-on:click="showChange(ROU)">
          <span class="fa module-icon" v-bind:class="ROU.flag"></span>
            {{ROU.name}}
          <span class="" v-bind:class="{selected: ROU.show}"></span>
        </div>
        <ul class="inside-ul" v-show="ROU.show">
          <li v-for="(SUB, index) in ROU.sub" v-bind:class="{active: SUB.active}" v-bind:key="index" v-on:click="actived(SUB)">
            <router-link v-bind:to="SUB.link">{{SUB.name}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      routes: [
        {
          name: '职员管理',
          flag: '',
          show: false,
          sub: [
            {name: '权限管理', link: '/author-management', active: false},
            {name: '资料管理', link: '/infor-management', active: false}
          ]
        },
        {
          name: '通用模块',
          flag: '',
          show: false,
          sub: [
            {name: '已完成业务', link: '/compl-business', active: false},
            {name: '招投标信息看板', link: '/infor-board', active: false},
            {name: '规章制度', link: '/rule-regulation', active: false}
          ]
        },
        {
          name: '业务部',
          flag: '',
          show: false,
          sub: [
            {name: '待审核业务', link: '/review-business-sales', active: false},
            {name: '待处理业务', link: '/handle-business', active: false},
            {name: '客户信息', link: '/customer-infor-sales', active: false}
          ]
        },
        {
          name: '风险评估部',
          flag: '',
          show: false,
          sub: [
            {name: '待审核业务', link: '/review-business-risk', active: false}
          ]
        },
        {
          name: '所长',
          flag: '',
          show: false,
          sub: [
            {name: '待审核业务', link: '/review-business-lead', active: false},
            {name: '客户信息', link: '/customer-infor-lead', active: false},
            {name: '职员权限管理', link: '/author-management', active: false},
            {name: '职员资料管理', link: '/infor-management', active: false},
            {name: '业务分析', link: '/business-analysis', active: false}
          ]
        },
        {
          name: '办公室',
          flag: '',
          show: false,
          sub: [
            {name: '待发合同编号', link: '/to-contract-num', active: false}
          ]
        },
        {
          name: '财务部',
          flag: '',
          show: false,
          sub: [
            {name: '代开发票', link: '/acting-invoice', active: false}
          ]
        },
        {
          name: '风险评估部（项目符合）',
          flag: '',
          show: false,
          sub: [
            {name: '待审核业务', link: '/review-business-risk-pass', active: false}
          ]
        },
        {
          name: '市场部',
          flag: '',
          show: false,
          sub: [
            {name: '招投标信息', link: '/bidding-infor', active: false}
          ]
        },
        {
          name: '档案部',
          flag: '',
          show: false,
          sub: [
            {name: '待处理业务', link: '/handle-business-doc', active: false}
          ]
        }
      ]
    };
  },
  computed: {

  },
  methods: {
    showChange(rou) {
      return rou.show = !rou.show;
    },
    actived(sub) {
      for (let i = 0; i < this.routes.length; i++) {
        for(let j = 0; j < this.routes[i].sub.length; j++) {
          this.routes[i].sub[j].active = false;
        }
      }
      sub.active = true;
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../scss/_variables.scss';

.sidebar {
  margin-top: 20px;
  background-color: #f5f5f5;
  .nav-sidebar{
    position: fixed;
    width: 190px;
    margin-left: -15px;
    .inside-div {
      width: 100%;
      height: 40px;
      background-color: $origin-color;
      color: $gray-dark;
      font-size: 18px;
      line-height: 40px;
      transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
      &:hover{
        background-color: $gray-lighter;
        cursor: pointer;
      }
      &.active {
        background-color: $link-color;
        color: $origin-color;
        &:hover {
          background-color: $link-hover-color;
        }
      }
      span.module-icon {
        display: inline-block;
        margin: 10px 10px;
        width: 20px;
      }
      span.selected {
        display: inline-block;
        margin: 10px 0;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid $background-color;
        position: absolute;
        right: 0;
      }
    }
    ul.inside-ul {
      list-style: none;
      padding-left: 0;
      >li {
        padding-left: 40px;
        height: 32px;
        background: $origin-color;
        font-size: 14px;
        line-height: 32px;
        transition: background-color 0.2s ease 0s;
        &:hover {
          background: $gray-lighter;
          cursor: pointer;
        }
        &.active {
          background: $background-color;
          &:hover {
            background: $gray-lighter;
          }
        }
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          color: $gray-dark;
        }
      }
    }
  }
}
</style>
