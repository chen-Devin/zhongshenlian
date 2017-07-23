<template>
  <div class="menu-wrapper">
    <el-menu class="el-menu-vertical-demo" :router="routerVal" :unique-opened="uniqueOpened" :default-active="activeUrl" :default-openeds="activeOpeneds">
      <el-submenu index="/quick" class="first-level">
        <el-menu-item slot="title" index="/quick"><i class="el-icon-star-on"></i>我的快捷</el-menu-item>
      </el-submenu>
      <el-submenu index="/to-do" class="first-level">
        <el-menu-item slot="title" index="/to-do"><i class="el-icon-date"></i>待办事项</el-menu-item>
      </el-submenu>
      <el-submenu index="/business-manage">
        <el-menu-item slot="title" index="/business-manage"><i class="el-icon-document"></i>业务管理</el-menu-item>
        <el-menu-item-group>
          <el-menu-item index="/business-manage"><i class="el-icon-information"></i>待处理业务</el-menu-item>
          <el-menu-item index="/business-complete-list"><i class="el-icon-circle-check"></i>已完成业务</el-menu-item>
          <el-menu-item index="/business-review-add"><i class="el-icon-edit"></i>新建业务</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/customer-infor-list" class="first-level">
        <el-menu-item slot="title" index="/customer-infor-list">
          <i class="el-icon-message"></i>客户信息
        </el-menu-item>
      </el-submenu>
      <el-submenu index="0"">
        <el-menu-item slot="title" index="0-1"><i class="el-icon-setting"></i>职员管理</el-menu-item>
        <el-menu-item-group>
          <el-menu-item index="/staff-management-author">职员权限管理</el-menu-item>
          <el-menu-item index="/staff-management-infor">职员资料管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/bid-info-list" class="first-level">
        <el-menu-item slot="title" index="/bid-info-list"><i class="el-icon-picture"></i>招投标信息</el-menu-item>
      </el-submenu>
      <el-submenu index="/rule-regulation" class="first-level">
        <el-menu-item slot="title" index="/rule-regulation"><i class="el-icon-menu"></i>规章制度</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data() {
    return {
      // activeUrl: 'quick',
      routerVal: true,
      uniqueOpened: true
    };
  },
  computed: {
    activeUrl() {
      console.log(this.$route.path)
      return this.$route.path;
    },
    activeOpeneds() {
      let arr = [];
      arr = [this.$route.path];
      return arr;
    }
    // routes() {
    //   let routes = [];
    //   routes = routes.unshift({name: '我的快捷', link: '/quick', icon: 'quick',openClass: 1, open:true});
    //   if (this.user.department) {
    //     if (this.user.department === '所长') {
    //       routes = [
    //         {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1, open:true}
    //       ];
    //     } else if (this.user.department === '办公室') {
    //       if (this.user.authority['发合同编号']) {
    //         routes.push({name: '待发合同编号', link: '/business-review-list-office', icon: 'bid-info',openClass: 1, open:true});
    //       }
    //       if (this.user.authority['装订业务报告']) {
    //         routes.push({name: '待装订业务', link: '/business-handle-list-office', icon: 'bid-info'});
    //       }
    //       routes.push({name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1, open:true});
    //     } else if (this.user.department === '业务部') {
    //       routes = [
    //         {name: '立项审批', link: '/business-review-list-sales', icon: 'business-review-list-leader',openClass: 1, open:true},
    //         {name: '待处理业务', link: '/business-handle-list-sales', icon: 'business-handle-list-sales',openClass: 1, open:true},
    //         {name: '客户信息', link: '/customer-infor-list', icon: 'customer-infor-list',openClass: 1},
    //         {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1}
    //       ];
    //     } else if (this.user.department === '风险评估部') {
    //       if (this.user.authority['业务初审']) {
    //         routes.push({name: '立项批复', link: '/business-review-list-risk', icon: 'business-review-list-leader',openClass: 1, open:true});
    //       }
    //       if (this.user.authority['业务复审']) {
    //         routes.push({name: '报告审核', link: '/business-handle-list-risk', icon: 'bid-info',openClass: 1 ,open:true});
    //       }
    //       routes.push({name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1 ,open:true});
    //     } else if (this.user.department === '档案部') {
    //       routes = [
    //         {name: '待处理业务', link: '/business-handle-list-archives', icon: 'business-handle-list-sales',openClass: 1 ,open:true},
    //         {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1 ,open:true}
    //       ];
    //     } else if (this.user.department === '财务部') {
    //       routes = [
    //         {name: '待开发票', link: '/business-handle-list-financial', icon: 'bid-info',openClass: 1 ,open:true},
    //         {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1 ,open:true}
    //       ];
    //     } else if (this.user.department === '市场部') {
    //       routes = [
    //         {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1 ,open:true},
    //         {name: '草稿箱', link: '/bid-info-draft', icon: 'bid-info-draft',openClass: 1 ,open:true}
    //       ];
    //     }
    //     this.$router.push(routes[0].link);
    //     if(this.user.department === '市场部') {
    //       return routes.concat([
    //         {name: '规章制度', link: '/rule-regulation', icon: 'rule-regulation',openClass: 1 ,open:true}
    //       ]);
    //     } else {
    //       return routes.concat([
    //         {name: '已完成业务', link: '/business-complete-list', icon: 'business-complete-list',openClass: 1, open:true},
    //         {name: '规章制度', link: '/rule-regulation', icon: 'rule-regulation',openClass: 1, open:true}
    //       ]);
    //     }
    //   } else {
    //     return routes;
    //   }
    // }
  },
  props: ['user'],
  methods: {
    
  },
  created() {
    setTimeout(()=>{
      console.log(this.$route.path);
    }, 2000);
  }
};
</script>

<style lang="sass">
@import '../../scss/_variables.scss';

.menu-wrapper {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  background-color: #283037;
}

.el-menu {
  position: relative;
  background-color: #283037;
  .el-submenu {
    &.is-active {
      background-color: #288ada;
    }
  }
  .el-menu-item, .el-submenu__title {
      height: 56px;
      line-height: 56px;
      font-size: 14px;
      background-color: #283037;
      color: #797a7a;
      cursor: pointer;
      &:hover {
        color: #797a7a;
        background-color: #789ebd;
      }
      &.is-active {
        background-color: #288ada;
        color: #fff;
      }
  }
  .el-menu-item {
    padding-left: 25% !important;
    padding-right: 0 !important;
  }
  .el-submenu__title {
    padding: 0 !important;
  }
  .el-menu-item-group {
    .el-menu-item-group__title {
      padding-top: 0;
    }
    .el-menu-item {
      padding-left: 35% !important;
    }
  }
  .first-level {
    .el-submenu__icon-arrow {
      display: none !important;
    }
  }
  .router-link-active {
    color: #fff;
  }
}
</style>
