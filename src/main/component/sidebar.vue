<template>
  <div class="menu-wrapper">
    <div class="message-box">
      <side-message :user="user"></side-message>
    </div>
    <el-menu class="el-menu-vertical-demo" :router="routerVal" :default-active="activeUrl" :unique-opened="uniqueOpened" @open="handleOpen">
      <el-menu-item index="/quick">我的快捷</el-menu-item>
      <template v-if="leader">
        <el-submenu index="to-do">
          <template slot="title">待办事项</template>
          <el-menu-item index="/business-review-list-leader">立项审批</el-menu-item>
          <el-menu-item index="/bid-info-list">招投标审批</el-menu-item>
          <el-menu-item index="/expenses-review/10">报销审批</el-menu-item>
        </el-submenu>
        <el-submenu index="information-manage">
          <template slot="title">信息管理</template>
          <el-menu-item index="/customer-infor-list">客户信息管理</el-menu-item>
          <el-menu-item index="/company-management">公司信息管理</el-menu-item>
          <!-- <el-menu-item index="{5}">外部协办方信息管理</el-menu-item> -->
        </el-submenu>
        <el-submenu index="project-manage">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-handle-list-leader">进行中项目</el-menu-item>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-menu-item index="/staff-management-author">职员管理</el-menu-item>
        <el-menu-item index="/expenses-list">报销申请</el-menu-item>
      </template>
      <template v-if="sales">
        <el-submenu index="project-manage">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-review-list-sales">立项项目</el-menu-item>
          <el-menu-item index="/business-handle-list-sales">进行中项目</el-menu-item>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-menu-item index="/customer-infor-list">客户信息管理</el-menu-item>
        <el-menu-item index="/bid-info-list">招投标信息</el-menu-item>
        <el-menu-item index="/expenses-list">报销申请</el-menu-item>
      </template>
      <template v-if="market">
        <el-menu-item index="/bid-info-list">招投标信息</el-menu-item>
        <el-menu-item index="/bid-info-draft">草稿箱</el-menu-item>
        <el-menu-item index="/expenses-list">报销申请</el-menu-item>
      </template>
      <template v-if="archives">
        <el-menu-item index="/business-handle-list-archives">待处理业务</el-menu-item>
        <el-submenu index="project-manage">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-menu-item index="/bid-info-list">招投标信息</el-menu-item>
        <el-menu-item index="/expenses-list">报销申请</el-menu-item>
      </template>
      <template v-if="riskHandle || riskReview">
        <el-menu-item index="/business-handle-list-risk" v-if="riskHandle">待处理业务</el-menu-item>
        <el-submenu index="project-manage">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-menu-item index="/bid-info-list">招投标信息</el-menu-item>
        <el-menu-item index="/expenses-list">报销申请</el-menu-item>
      </template>
      <template v-if="financial">
        <el-submenu index="to-review" v-if="financial">
          <template slot="title">待处理业务</template>
            <el-menu-item index="/business-handle-list-financial/0">待开发票</el-menu-item>
            <el-menu-item index="/business-handle-list-financial/1">待上传截图</el-menu-item>
            <el-menu-item index="/business-handle-list-financial/2">开票撤销复核</el-menu-item>
            <el-menu-item index="/expenses-review/0">单据审核</el-menu-item>
            <el-menu-item index="/expenses-review/1">付款申请</el-menu-item>
            <el-menu-item index="/expenses-review/2">付款审批</el-menu-item>
        </el-submenu>
        <el-submenu index="project-manage">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-menu-item index="/expenses-list">报销申请</el-menu-item>
        <el-menu-item index="/bid-info-list">招投标信息</el-menu-item>
      </template>
      <template v-if="office">
        <el-menu-item index="/business-handle-list-office">待处理业务</el-menu-item>
        <el-submenu index="project-manage">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-menu-item index="/bid-info-list">招投标信息</el-menu-item>
        <el-menu-item index="/expenses-list">报销申请</el-menu-item>
      </template>
      <el-menu-item index="/rule-regulation">规章制度</el-menu-item>
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
    office () {
      if (this.user.department === '办公室') {
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
