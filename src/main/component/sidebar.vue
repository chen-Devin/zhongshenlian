<template>
  <div class="side-bar">
    <ul class="nav nav-pills nav-stacked">
      <router-link :to="ROU.link"
                   v-for="(ROU, index) in routes"
                   :key="index"
                   tag="li"
                   active-class="active">
        <a :class="ROU.icon">{{ROU.name}}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data() {
    return {};
  },
  computed: {
    routes() {
      let routes = [];
      if (this.user.department) {
        if (this.user.department === '所长') {
          routes = [
            {name: '待审核业务', link: '/business-review-list-leader', icon: 'bid-info'},
            // {name: '待处理业务', link: '/business-handle-list-leader'},
            {name: '客户信息', link: '/customer-infor-list', icon: 'bid-info'},
            {name: '职员权限管理', link: '/staff-management-author', icon: 'bid-info'},
            {name: '职员资料管理', link: '/staff-management-infor', icon: 'bid-info'},
            {name: '业务分析', link: '/business-analysis', icon: 'bid-info'},
            {name: '招投标信息看板', link: '/bid-info-list', icon: 'bid-info'}
          ];
        } else if (this.user.department === '办公室') {
          if (this.user.authority['发合同编号']) {
            routes.push({name: '待发合同编号', link: '/business-review-list-office', icon: 'bid-info'});
            routes.push({name: '招投标信息看板', link: '/bid-info-list', icon: 'bid-info'});
          }
          if (this.user.authority['装订业务报告']) {
            routes.push({name: '待装订业务', link: '/business-handle-list-office', icon: 'bid-info'});
            routes.push({name: '招投标信息看板', link: '/bid-info-list', icon: 'bid-info'});
          }
        } else if (this.user.department === '业务部') {
          routes = [
            {name: '待审核业务', link: '/business-review-list-sales', icon: 'bid-info'},
            {name: '待处理业务', link: '/business-handle-list-sales', icon: 'bid-info'},
            {name: '客户信息', link: '/customer-infor-list', icon: 'bid-info'},
            {name: '招投标信息看板', link: '/bid-info-list', icon: 'bid-info'}
          ];
        } else if (this.user.department === '风险评估部') {
          if (this.user.authority['业务初审']) {
            routes.push({name: '待审核业务', link: '/business-review-list-risk', icon: 'bid-info'});
            routes.push({name: '招投标信息看板', link: '/bid-info-list', icon: 'bid-info'});
          }
          if (this.user.authority['业务复审']) {
            routes.push({name: '待复审业务', link: '/business-handle-list-risk', icon: 'bid-info'});
            routes.push({name: '招投标信息看板', link: '/bid-info-list', icon: 'bid-info'});
          }
        } else if (this.user.department === '档案部') {
          routes = [
            {name: '待处理业务', link: '/business-handle-list-archives', icon: 'bid-info'},
            {name: '招投标信息看板', link: '/bid-info-list', icon: 'bid-info'}
          ];
        } else if (this.user.department === '财务部') {
          routes = [
            {name: '待开发票', link: '/business-handle-list-financial', icon: 'bid-info'},
            {name: '招投标信息看板', link: '/bid-info-list', icon: 'bid-info'}
          ];
        } else if (this.user.department === '市场部') {
          routes = [
            {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info'},
            {name: '草稿箱', link: '/bid-info-draft', icon: 'bid-info'}
          ];
        }
        this.$router.push(routes[0].link);
        return routes.concat([
          {name: '已完成业务', link: '/business-complete-list', icon: 'bid-info'},
          // {name: '招投标信息看板', link: '/bid-info-list'},
          {name: '规章制度', link: '/rule-regulation', icon: 'bid-info'}
        ]);
      } else {
        return routes;
      }
    }
  },
  props: ['user'],
  methods: {}
}
</script>

<style lang="sass" scoped>
@import '../../scss/_variables.scss';

.side-bar {
  position: fixed;
  background-color: #000;
  height: 100%;
  .nav-pills {
    > li {
      // height: 50px;
      > a {
        border-radius: 0;
        padding: 15px 15px;
        padding-left: 100px;
        &.bid-info:before {
          content: '';
          background: url('../../img/sidebar/bidInfo.png');
          position: relative;
          top: 17px;
          left: -30px;
          display: block;
          height: 14px;
          width: 14px;
        }
      }
      &.active {
        > a {
          // box-shadow: 1px 2px 4px rgba(84,173,217,1);
          background-color: #288ADA;
        }
      }
    }
  }
}
</style>
