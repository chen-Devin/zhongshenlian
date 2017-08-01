<template>
  <div class="menu-wrapper">
    <el-menu class="el-menu-vertical-demo" :router="routerVal" :default-active="activeUrl" :unique-opened="uniqueOpened" @open="handleOpen">
      <el-menu-item index="/quick" v-if="leader"><i class="el-icon-star-on"></i>我的快捷</el-menu-item>
      <el-menu-item index="/business-handle-list-financial" v-if="financial"><i class="el-icon-message"></i>待开发票</el-menu-item>
      <el-menu-item index="/business-review-list-office" v-if="officeContract"><i class="el-icon-message"></i>待发合同编号</el-menu-item>
      <el-menu-item index="/business-handle-list-office" v-if="officeBinding"><i class="el-icon-message"></i>待装订业务</el-menu-item>
      <el-menu-item index="/business-review-list-sales" v-if="sales"><i class="el-icon-circle-check"></i>立项审批</el-menu-item>
      <el-menu-item index="/business-review-list-risk" v-if="riskReview"><i class="el-icon-circle-check"></i>立项审批</el-menu-item>
      <el-submenu index="to-do" v-if="leader">
        <template slot="title"><i class="el-icon-document"></i>待办事项</template>
        <el-menu-item-group>
          <el-menu-item index="/business-review-list-leader"><i class="el-icon-circle-check"></i>立项审批</el-menu-item>
          <el-menu-item index="/bid-info-list"><i class="el-icon-picture"></i>招投标审批</el-menu-item>
          <!-- <el-menu-item index="{1}"><i class="el-icon-edit"></i>报销审批</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="information-manage" v-if="leader">
        <template slot="title"><i class="el-icon-document"></i>信息管理</template>
        <el-menu-item-group>
          <el-menu-item index="/customer-infor-list"><i class="el-icon-message"></i>客户信息管理</el-menu-item>
          <!-- <el-menu-item index="{2}"><i class="el-icon-circle-check"></i>业务信息管理</el-menu-item> -->
          <el-menu-item index="/company-management"><i class="el-icon-edit"></i>公司信息管理</el-menu-item>
          <!-- <el-menu-item index="{5}"><i class="el-icon-edit"></i>外部协办方信息管理</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/customer-infor-list" v-if="sales"><i class="el-icon-message"></i>客户信息管理</el-menu-item>
      <el-submenu index="project-manage" v-if="projectManage">
        <template slot="title"><i class="el-icon-document"></i>项目管理</template>
        <el-menu-item-group>
          <el-menu-item index="/business-review-add" v-if="sales"><i class="el-icon-edit"></i>立项业务</el-menu-item>
          <el-menu-item index="/business-handle-list-leader" v-if="leader"><i class="el-icon-information"></i>进行中业务</el-menu-item>
          <el-menu-item index="/business-handle-list-sales" v-if="sales"><i class="el-icon-information"></i>进行中业务</el-menu-item>
          <el-menu-item index="/business-handle-list-archives" v-if="archives"><i class="el-icon-information"></i>进行中业务</el-menu-item>
          <el-menu-item index="/business-handle-list-risk" v-if="riskHandle"><i class="el-icon-circle-check"></i>报告审核</el-menu-item>
          <el-menu-item index="/business-complete-list"><i class="el-icon-circle-check"></i>已完成业务</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="staff-manage" v-if="leader">
        <template slot="title"><i class="el-icon-setting"></i>职员管理</template>
        <el-menu-item-group>
          <el-menu-item index="/staff-management-author"><i class="el-icon-setting"></i>职员权限管理</el-menu-item>
          <el-menu-item index="/staff-management-infor"><i class="el-icon-setting"></i>职员资料管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/bid-info-list" v-if="!leader"><i class="el-icon-picture"></i>招投标信息</el-menu-item>
      <el-menu-item index="/bid-info-draft" v-if="market"><i class="el-icon-picture"></i>草稿箱</el-menu-item>
      <el-menu-item index="/rule-regulation"><i class="el-icon-menu"></i>规章制度</el-menu-item>
      <!-- <el-submenu index="reimbursement-application">
        <template slot="title"><i class="el-icon-document"></i>报销申请</template>
        <el-menu-item-group>
          <el-menu-item index="{6}"><i class="el-icon-circle-check"></i>报销申请</el-menu-item>
          <el-menu-item index="{7}"><i class="el-icon-information"></i>报销记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
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
    },
    leader() {
      if (this.user.department === '所长') {
        return true;
      } else {
        return false;
      }
    },
    sales() {
      if (this.user.department === '业务部') {
        return true;
      } else {
        return false;
      }
    },
    archives() {
      if (this.user.department === '档案部') {
        return true;
      } else {
        return false;
      }
    },
    financial() {
      if (this.user.department === '财务部') {
        return true;
      } else {
        return false;
      }
    },
    market() {
      if (this.user.department === '市场部') {
        return true;
      } else {
        return false;
      }
    },
    projectManage() {
      if (this.user.department === '市场部') {
        return false;
      } else {
        return true;
      }
    },
    officeContract() {
      if (this.user.department === '办公室') {
        if (this.user.authority['发合同编号']) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    officeBinding() {
      if (this.user.department === '办公室') {
        if (this.user.authority['装订业务报告']) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    riskReview() {
      if (this.user.department === '风险评估部') {
        if (this.user.authority['业务初审']) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    riskHandle() {
        if (this.user.department === '风险评估部') {
          if (this.user.authority['业务复审']) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
    }
  },
  props: ['user'],
  methods: {
    handleOpen(key, keyPath) {
      if (key === 'to-do') {
        if (this.user.department === '所长') {
          this.$router.push('/business-review-list-leader');
        } else if (this.user.department === '业务部') {
          this.$router.push('/business-review-list-sales');
        }
      }
      if (key === 'information-manage') {
        this.$router.push('/customer-infor-list');
      }
      if (key === 'project-manage') {
        this.$router.push('/business-complete-list');
      }
      if (key === 'staff-manage') {
        this.$router.push('/staff-management-author');
      }
    }
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
