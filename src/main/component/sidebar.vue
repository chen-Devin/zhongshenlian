<template>
  <div class="sidebar">
    <ul class="nav nav-sidebar">
      <li v-for="(ROU, index) in routes" v-bind:key="index">
        <div class="inside-div" v-on:click="showChange(ROU)">
          <span class="fa" v-bind:class="ROU.flag"></span>
            {{ROU.name}}
          <span class="fa direction-icon" v-bind:class="{'fa-caret-down': ROU.show, 'fa-caret-up': !ROU.show}"></span>
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
          flag: 'fa-user-o',
          show: false,
          sub: [
            {name: '权限管理', link: '/author-management', active: false},
            {name: '资料管理', link: '/infor-management', active: false},
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
      background: $origin-color;
      color: $gray-dark;
      font-size: 18px;
      line-height: 40px;
      &:hover{
        background: $gray-lighter;
        cursor: pointer;
      }
      span {
        display: inline-block;
        margin: 10px 10px;
        width: 20px;
        &.direction-icon {
          position: absolute;
          right: 0;
        }
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
