<template>
  <div class="sidebar">
    <ul class="nav nav-sidebar">
      <li v-for="(ROU, index) in routes" :key="index">
        <div class="inside-div" :class="{active: ROU.show}" @click="showChange(ROU)">
          <span class="fa module-icon" :class="ROU.flag"></span>
            {{ROU.name}}
          <span class="" :class="{selected: ROU.show}"></span>
        </div>
        <ul class="inside-ul" v-show="ROU.show">
          <li v-for="(SUB, index) in ROU.sub" :class="{active: SUB.active}" :key="index" @click="actived(SUB)">
            <router-link :to="SUB.link">{{SUB.name}}</router-link>
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
          name: '通用模块',
          flag: '',
          show: false,
          sub: [
            {name: '已完成业务', link: '/business-complete-list', active: false},
            {name: '招投标信息看板', link: '/bid-info-list', active: false},
            {name: '规章制度', link: '/rule-regulation', active: false}
          ]
        },
        {
          name: '所长',
          flag: '',
          show: false,
          sub: [
            {name: '待审核业务', link: '/business-review-list-leader', active: false},
            {name: '客户信息', link: '/customer-infor-list', active: false},
            {name: '职员权限管理', link: '/staff-management-author', active: false},
            {name: '职员资料管理', link: '/staff-management-infor', active: false},
            {name: '业务分析', link: '/business-analysis', active: false}
          ]
        },
        {
          name: '办公室',
          flag: '',
          show: false,
          sub: [
            {name: '待发合同编号', link: '/business-handle-list-office', active: false}
          ]
        },
        {
          name: '业务部',
          flag: '',
          show: false,
          sub: [
            {name: '待审核业务', link: '/business-review-list-sales', active: false},
            {name: '待处理业务', link: '/business-handle-list-sales', active: false},
            {name: '客户信息', link: '/customer-infor-list', active: false}
          ]
        },
        {
          name: '风险评估部',
          flag: '',
          show: false,
          sub: [
            {name: '待审核业务', link: '/business-review-list-risk', active: false}
          ]
        },
        {
          name: '档案部',
          flag: '',
          show: false,
          sub: [
            {name: '待处理业务', link: '/business-handle-list-archives', active: false}
          ]
        },
        {
          name: '财务部',
          flag: '',
          show: false,
          sub: [
            {name: '代开发票', link: '/business-handle-list-financial', active: false}
          ]
        },
        {
          name: '市场部',
          flag: '',
          show: false,
          sub: [
            {name: '招投标信息', link: '/bid-info-list', active: false},
            {name: '草稿箱', link: '/bid-info-draft', active: false}
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
        border-right: 10px solid $body-bg;
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
          background: $body-bg;
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
