<template>
  <div class="menu-wrapper">
    <div class="message-box">
      <side-message :user="user"></side-message>
    </div>
    <el-menu class="el-menu-vertical-demo" :router="routerVal" :default-active="activeUrl" :unique-opened="uniqueOpened" @open="handleOpen">
      <el-menu-item index="/quick" v-if="leader">我的快捷</el-menu-item>
      <el-menu-item index="/business-handle-list-financial" v-if="financial">待开发票</el-menu-item>
      <el-menu-item index="/business-handle-list-office" v-if="officeContract">进行中业务</el-menu-item>
      <!-- <el-menu-item index="/business-handle-list-office" v-if="officeBinding">待装订业务</el-menu-item> -->
      <el-menu-item index="/customer-infor-list" v-if="officeCustomer">客户信息管理</el-menu-item>
      <el-submenu index="to-review">
        <template slot="title">待处理业务</template>
          <el-menu-item index="/business-handle-list-financial/0">待开发票</el-menu-item>
          <el-menu-item index="/business-handle-list-financial/1">待上传截图</el-menu-item>
          <el-menu-item index="/business-handle-list-financial/2">开票撤销复核</el-menu-item>
      </el-submenu>
      <el-submenu index="to-do" v-if="leader">
        <template slot="title">待办事项</template>
        <!-- <el-menu-item-group> -->
          <el-menu-item index="/business-review-list-leader">立项审批</el-menu-item>
          <el-menu-item index="/bid-info-list">招投标审批</el-menu-item>
          <!-- <el-menu-item index="{1}">报销审批</el-menu-item> -->
        <!-- </el-menu-item-group> -->
      </el-submenu>
      <el-submenu index="information-manage" v-if="leader">
        <template slot="title">信息管理</template>
        <!-- <el-menu-item-group> -->
          <el-menu-item index="/customer-infor-list">客户信息管理</el-menu-item>
          <!-- <el-menu-item index="{2}">业务信息管理</el-menu-item> -->
          <!-- <el-menu-item index="/functional-management">职能部门信息管理</el-menu-item> -->
          <el-menu-item index="/company-management">公司信息管理</el-menu-item>
          <!-- <el-menu-item index="{5}">外部协办方信息管理</el-menu-item> -->
        <!-- </el-menu-item-group> -->
      </el-submenu>
      <el-menu-item index="/customer-infor-list" v-if="sales">客户信息管理</el-menu-item>
      <el-submenu index="project-manage" v-if="projectManage">
        <template slot="title">项目管理</template>
        <!-- <el-menu-item-group> -->
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
          <el-menu-item index="/business-review-list-sales" v-if="establish">立项项目</el-menu-item>
          <el-menu-item index="/business-handle-list-leader" v-if="leader">进行中项目</el-menu-item>
          <el-menu-item index="/business-handle-list-sales" v-if="sales">进行中项目</el-menu-item>
          <el-menu-item index="/business-handle-list-archives" v-if="archives">进行中项目</el-menu-item>
          <el-menu-item index="/business-handle-list-risk" v-if="riskHandle">报告审核</el-menu-item>
          <!-- <el-menu-item index="/business-complete-list">已完成业务</el-menu-item> -->
        <!-- </el-menu-item-group> -->
      </el-submenu>
      <!-- <el-submenu index="staff-manage" v-if="leader">
        <template slot="title">职员管理</template>
        <el-menu-item-group>
          <el-menu-item index="/staff-management-author">职员管理</el-menu-item>
          <el-menu-item index="/staff-management-infor">职员资料管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <el-menu-item index="/staff-management-author" v-if="leader">职员管理</el-menu-item>
      <el-menu-item index="/bid-info-list" v-if="!leader">招投标信息</el-menu-item>
      <el-menu-item index="/bid-info-draft" v-if="market">草稿箱</el-menu-item>
      <el-menu-item index="/rule-regulation">规章制度</el-menu-item>
      <el-menu-item index="/expenses-list">报销申请</el-menu-item>
      <el-menu-item index="/bill-apply">开票申请</el-menu-item>
      <el-menu-item index="/contract-change">合同变更</el-menu-item>
      <!-- <el-submenu index="reimbursement-application">
        <template slot="title">报销申请</template>
        <el-menu-item-group>
          <el-menu-item index="{6}">报销申请</el-menu-item>
          <el-menu-item index="{7}">报销记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import sideMessage from "./sideMessage.vue";

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
    establish () {
      if (this.user.department === '业务部') {
        if (this.user.authority['业务立项']) {
          return true;
        } else {
          return false;
        }
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
          return true;
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
    officeCustomer() {
      if (this.user.department === '办公室') {
        return true
      } else {
        return false
      }
    },
    riskReview() {
      if (this.user.department === '质控部') {
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
        if (this.user.department === '质控部') {
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
  components: {
    sideMessage
  }
};
</script>

<style lang="sass">
@import '../../scss/_variables.scss';

.menu-wrapper {
  position: fixed;
  width: 200px;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #364A62;
  overflow: auto;
  .message-box {
    padding-top: 80px;
    padding-bottom: 25px;
    border-bottom: 1px solid #5C7B9F;
  }
  .el-menu {
    position: relative;
    background-color: #364A62;
    .el-submenu {
      &.is-active {
        background-color: #50BAF0;
      }
      > .el-menu {
        background-color: #1D334D;
        > .el-menu-item {
          &.is-active {
            background-color: #1D334D;
            color: #4AB2E6;
          }
        }
      }
      > .el-submenu__title {
        height: 56px;
        line-height: 56px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        text-align: center;
        .el-submenu__icon-arrow {
          display: none;
        }
        &:hover {
          color: #fff;
          background-color: #789ebd;
        }
        &.is-active {
          background-color: #50BAF0;
          color: #fff;
        }
      }
    }
    > .el-menu-item {
      height: 56px;
      line-height: 56px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      &:hover {
        color: #fff;
        background-color: #789ebd;
      }
      &.is-active {
        background-color: #50BAF0;
        color: #fff;
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
}
</style>
