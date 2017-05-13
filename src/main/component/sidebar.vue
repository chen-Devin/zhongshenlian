<template>
  <div class="side-bar">
    <ul class="nav nav-pills nav-stacked">
      <router-link :to="ROU.link"
                   v-for="(ROU, index) in routes"
                   :key="index"
                   tag="li"
                   active-class="active">
        <a>{{ROU.name}}</a>
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
            {name: '待审核业务', link: '/business-review-list-leader'},
            // {name: '待处理业务', link: '/business-handle-list-leader'},
            {name: '客户信息', link: '/customer-infor-list'},
            {name: '职员权限管理', link: '/staff-management-author'},
            {name: '职员资料管理', link: '/staff-management-infor'},
            {name: '业务分析', link: '/business-analysis'},
            {name: '招投标信息看板', link: '/bid-info-list'}
          ];
        } else if (this.user.department === '办公室') {
          if (this.user.authority['发合同编号']) {
            routes.push({name: '待发合同编号', link: '/business-review-list-office'});
            routes.push({name: '招投标信息看板', link: '/bid-info-list'});
          }
          if (this.user.authority['装订业务报告']) {
            routes.push({name: '待装订业务', link: '/business-handle-list-office'});
            routes.push({name: '招投标信息看板', link: '/bid-info-list'});
          }
        } else if (this.user.department === '业务部') {
          routes = [
            {name: '待审核业务', link: '/business-review-list-sales'},
            {name: '待处理业务', link: '/business-handle-list-sales'},
            {name: '客户信息', link: '/customer-infor-list'},
            {name: '招投标信息看板', link: '/bid-info-list'}
          ];
        } else if (this.user.department === '风险评估部') {
          if (this.user.authority['业务初审']) {
            routes.push({name: '待审核业务', link: '/business-review-list-risk'});
            routes.push({name: '招投标信息看板', link: '/bid-info-list'});
          }
          if (this.user.authority['业务复审']) {
            routes.push({name: '待复审业务', link: '/business-handle-list-risk'});
            routes.push({name: '招投标信息看板', link: '/bid-info-list'});
          }
        } else if (this.user.department === '档案部') {
          routes = [
            {name: '待处理业务', link: '/business-handle-list-archives'},
            {name: '招投标信息看板', link: '/bid-info-list'}
          ];
        } else if (this.user.department === '财务部') {
          routes = [
<<<<<<< HEAD
            {name: '待开发票', link: '/business-handle-list-financial'}
=======
            {name: '代开发票', link: '/business-handle-list-financial'},
            {name: '招投标信息看板', link: '/bid-info-list'}
>>>>>>> ac76e79386fea61612dd66057e697e6daf0c8be3
          ];
        } else if (this.user.department === '市场部') {
          routes = [
            {name: '招投标信息', link: '/bid-info-list'},
            {name: '草稿箱', link: '/bid-info-draft'}
          ];
        }
        this.$router.push(routes[0].link);
        return routes.concat([
          {name: '已完成业务', link: '/business-complete-list'},
          // {name: '招投标信息看板', link: '/bid-info-list'},
          {name: '规章制度', link: '/rule-regulation'}
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
  padding-top: 20px;
  .nav-pills {
    > li {
      > a {
        border-radius: 0;
      }
      &.active {
        > a {
          box-shadow: 1px 2px 4px rgba(84,173,217,1);
        }
      }
    }
  }
}
</style>
