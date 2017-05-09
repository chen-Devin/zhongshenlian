<template>
  <div class="sidebar">
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
  name: 'sidebar',
  data() {
    return {};
  },
  computed: {
    routes() {
      let routes = [
        {name: '已完成业务', link: '/business-complete-list'},
        {name: '招投标信息看板', link: '/bid-info-list'},
        {name: '规章制度', link: '/rule-regulation'}
      ];
      this.$router.push(routes[0].link);
      if (this.user.department === '所长') {
        return routes.concat([
          {name: '待审核业务', link: '/business-review-list-leader'},
          // {name: '待处理业务', link: '/business-handle-list-leader'},
          {name: '客户信息', link: '/customer-infor-list'},
          {name: '职员权限管理', link: '/staff-management-author'},
          {name: '职员资料管理', link: '/staff-management-infor'},
          {name: '业务分析', link: '/business-analysis'}
        ]);
      } else if (this.user.department === '办公室') {
        return routes.concat([
          {name: '待发合同编号', link: '/business-review-list-office'},
          {name: '待完结业务', link: '/business-handle-list-office'}
        ]);
      } else if (this.user.department === '业务部') {
        return routes.concat([
          {name: '待审核业务', link: '/business-review-list-sales'},
          {name: '待处理业务', link: '/business-handle-list-sales'},
          {name: '客户信息', link: '/customer-infor-list'}
        ]);
      } else if (this.user.department === '风险评估部') {
        return routes.concat([
          {name: '待审核业务', link: '/business-review-list-risk'},
          {name: '待复审业务', link: '/business-handle-list-risk'}
        ]);
      } else if (this.user.department === '档案部') {
        return routes.concat([
          {name: '待处理业务', link: '/business-handle-list-archives'}
        ]);
      } else if (this.user.department === '财务部') {
        return routes.concat([
          {name: '代开发票', link: '/business-handle-list-financial'}
        ]);
      } else if (this.user.department === '市场部') {
        return routes.concat([
          {name: '招投标信息', link: '/bid-info-list'},
          {name: '草稿箱', link: '/bid-info-draft'}
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

.sidebar {
  margin-top: 20px;
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
