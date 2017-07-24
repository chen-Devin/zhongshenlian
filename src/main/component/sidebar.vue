<template>
  <div class="menu-wrapper">
    <el-menu class="el-menu-vertical-demo" :router="routerVal" :default-active="activeUrl" :unique-opened="uniqueOpened" @open="handleOpen">
      <el-menu-item index="/quick"><i class="el-icon-star-on"></i>我的快捷</el-menu-item>
      <el-submenu index="to-do">
        <template slot="title"><i class="el-icon-document"></i>待办事项</template>
        <el-menu-item-group>
          <el-menu-item index="/business-review-list-leader"><i class="el-icon-circle-check"></i>立项审批</el-menu-item>
          <el-menu-item index="/bid-info-list"><i class="el-icon-picture"></i>招投标审批</el-menu-item>
          <el-menu-item index="{1}"><i class="el-icon-edit"></i>报销审批</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="information-manage">
        <template slot="title"><i class="el-icon-document"></i>信息管理</template>
        <el-menu-item-group>
          <el-menu-item index="{2}"><i class="el-icon-circle-check"></i>业务信息管理</el-menu-item>
          <el-menu-item index="/customer-infor-list"><i class="el-icon-message"></i>客户信息管理</el-menu-item>
          <el-menu-item index="{4}"><i class="el-icon-edit"></i>公司信息管理</el-menu-item>
          <el-menu-item index="{5}"><i class="el-icon-edit"></i>外部协办方信息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="project-manage">
        <template slot="title"><i class="el-icon-document"></i>项目管理</template>
        <el-menu-item-group>
          <el-menu-item index="/business-review-add"><i class="el-icon-edit"></i>立项业务</el-menu-item>
          <el-menu-item index="/business-handle-list-leader"><i class="el-icon-information"></i>进行中业务</el-menu-item>
          <el-menu-item index="/business-complete-list"><i class="el-icon-circle-check"></i>已完成业务</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="staff-manage">
        <template slot="title"><i class="el-icon-setting"></i>职员管理</template>
        <el-menu-item-group>
          <el-menu-item index="/staff-management-author">职员权限管理</el-menu-item>
          <el-menu-item index="/staff-management-infor">职员资料管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/rule-regulation"><i class="el-icon-menu"></i>规章制度</el-menu-item>
      <el-submenu index="reimbursement-application">
        <template slot="title"><i class="el-icon-document"></i>报销申请</template>
        <el-menu-item-group>
          <el-menu-item index="{6}"><i class="el-icon-circle-check"></i>报销申请</el-menu-item>
          <el-menu-item index="{7}"><i class="el-icon-information"></i>报销记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data() {
    return {
      routerVal: true,
      uniqueOpened: true
    };
  },
  computed: {
    activeUrl() {
      return this.$route.path;
    }
  },
  props: ['user'],
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      if (key === 'business-manage') {
        this.$router.push('/business-complete-list')
      }
      if (key === 'staff-manage') {
        this.$router.push('/staff-management-author')
      }
    },
  },
  created() {
    
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
    padding-left: 25% !important;
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
