<template>
  <div class="menu-wrapper">
    <div class="message-box">
      <side-message :user="user"></side-message>
    </div>
    <el-menu :router="routerVal" :default-active="activeUrl" :unique-opened="uniqueOpened" @open="handleOpen">
      <el-submenu index="quick">
        <template slot="title">
          <span>我的快捷</span>
        </template>
      </el-submenu>
      <template v-if="leader">
        <el-submenu index="business-review-list-leader">
          <template slot="title">
            待办事项
            <span v-if="itemCounts" class="to-do-number">{{ itemCounts }}</span>
          </template>
          <el-menu-item index="/business-review-list-leader">立项审批</el-menu-item>
          <el-menu-item index="/bid-info-list">招投标审批</el-menu-item>
        </el-submenu>
        <el-submenu index="customer-infor-list">
          <template slot="title">信息管理</template>
          <el-menu-item index="/customer-infor-list">客户信息管理</el-menu-item>
          <el-menu-item index="/company-management">公司信息管理</el-menu-item>
          <!-- <el-menu-item index="{5}">外部协办方信息管理</el-menu-item> -->
        </el-submenu>
        <el-submenu index="business-handle-list-leader">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-handle-list-leader">进行中项目</el-menu-item>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-submenu index="staff-management-author">
          <template slot="title">
            <span>职员管理</span>
          </template>
        </el-submenu>
        <!-- <el-submenu index="expenses-list">
          <template slot="title">
            <span>报销申请</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-review-record">
          <template slot="title">
            <span>报销审批记录</span>
          </template>
        </el-submenu> -->
        <el-submenu index="expenses-review/10">
          <template slot="title">
            报销管理
          </template>
          <el-menu-item index="/expenses-review/10">报销审核</el-menu-item>
          <el-menu-item index="/expenses-list">我的报销</el-menu-item>
        </el-submenu>
      </template>
      <template v-if="sales">
        <el-submenu index="business-review-list-sales">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-review-list-sales">立项项目</el-menu-item>
          <el-menu-item index="/business-handle-list-sales">进行中项目</el-menu-item>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-submenu index="customer-infor-list">
          <template slot="title">
            <span>客户信息管理</span>
          </template>
        </el-submenu>
        <el-submenu index="bid-info-list">
          <template slot="title">
            <span>招投标信息</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-review-record">
          <template slot="title">
            <span>报销审批记录</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-list">
          <template slot="title">
            <span>报销申请</span>
          </template>
        </el-submenu>
      </template>
      <template v-if="market">
        <el-submenu index="bid-info-list">
          <template slot="title">
            <span>招投标信息</span>
          </template>
        </el-submenu>
        <el-submenu index="bid-info-draft">
          <template slot="title">
            <span>草稿箱</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-review-record">
          <template slot="title">
            <span>报销审批记录</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-list">
          <template slot="title">
            <span>报销申请</span>
          </template>
        </el-submenu>
      </template>
      <template v-if="archives">
        <el-submenu index="business-handle-list-archives">
          <template slot="title">
            <span>待处理项目</span>
          </template>
        </el-submenu>
        <el-submenu index="business-complete-list">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-handle-list/archives">进行中项目</el-menu-item>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-submenu index="bid-info-list">
          <template slot="title">
            <span>招投标信息</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-review-record">
          <template slot="title">
            <span>报销审批记录</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-list">
          <template slot="title">
            <span>报销申请</span>
          </template>
        </el-submenu>
      </template>
      <template v-if="risk">
        <el-submenu index="business-handle-list-risk">
          <template slot="title">
            <span>待处理项目</span>
          </template>
        </el-submenu>
        <el-submenu index="business-complete-list">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-handle-list/risk">进行中项目</el-menu-item>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-submenu index="bid-info-list">
          <template slot="title">
            <span>招投标信息</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-review-record">
          <template slot="title">
            <span>报销审批记录</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-list">
          <template slot="title">
            <span>报销申请</span>
          </template>
        </el-submenu>
      </template>
      <template v-if="financial">
        <el-submenu index="business-handle-list-financial/0" v-if="financial">
          <template slot="title">待处理项目</template>
            <el-menu-item index="/business-handle-list-financial/0">待开发票</el-menu-item>
            <el-menu-item index="/business-handle-list-financial/1">待上传截图</el-menu-item>
            <el-menu-item index="/business-handle-list-financial/2">开票撤销复核</el-menu-item>
            <el-menu-item index="/expenses-review/0">单据审核</el-menu-item>
            <el-menu-item index="/expenses-review/1">付款申请</el-menu-item>
            <el-menu-item index="/expenses-review/2">付款审批</el-menu-item>
        </el-submenu>
        <el-submenu index="business-complete-list">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-handle-list/financial">进行中项目</el-menu-item>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-submenu index="bid-info-list">
          <template slot="title">
            <span>招投标信息</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-review-record">
          <template slot="title">
            <span>报销审批记录</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-list">
          <template slot="title">
            <span>报销申请</span>
          </template>
        </el-submenu>
      </template>
      <template v-if="office">
        <el-submenu index="business-handle-list-office">
          <template slot="title">
            <span>待处理项目</span>
          </template>
        </el-submenu>
        <el-submenu index="business-complete-list">
          <template slot="title">项目管理</template>
          <el-menu-item index="/business-handle-list/office">进行中项目</el-menu-item>
          <el-menu-item index="/business-complete-list">已完成项目</el-menu-item>
        </el-submenu>
        <el-submenu index="bid-info-list">
          <template slot="title">
            <span>招投标信息</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-review-record">
          <template slot="title">
            <span>报销审批记录</span>
          </template>
        </el-submenu>
        <el-submenu index="expenses-list">
          <template slot="title">
            <span>报销申请</span>
          </template>
        </el-submenu>
      </template>
      <el-submenu index="expenses-review/3" v-if="canReviewBidNotLeader">
        <template slot="title">
          <span>报销审批</span>
        </template>
      </el-submenu>
      <el-submenu index="rule-regulation">
        <template slot="title">
          <span>规章制度</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import axios from 'axios'
import sideMessage from "./sideMessage.vue"

export default {
  name: 'sideBar',
  data() {
    return {
      routerVal: true,
      uniqueOpened: true,
      itemCounts: 0,
      user: {}
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
        if (this.user.authority['项目立项']) {
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
        if (this.user.authority['装订项目报告']) {
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
    risk() {
      if (this.user.department === '质控部') {
        return true
      } else {
        return false
      }
    },
    canReviewBidNotLeader() {
      if (Boolean(Number(this.user.isPrincipal)) && (Number(this.user.type) === 0 || Number(this.user.type) === 2) && this.user.department !== '所长') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push('/' + key)
    },
    getToBeDoneList() {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getToBeDoneList',
              platform: 'web',
              pageNum: 1
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.itemCounts = rep.data.data.totalNum;
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    }
  },
  created () {
    this.getToBeDoneList()
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser
    }, () => { });
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
  bottom: 0;
  top: 0;
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
    .to-do-number {
      position: absolute;
      top: 12px;
      right: 48px;
      display: inline-block;
      height: 16px;
      line-height: 16px;
      padding: 0 5px;
      font-size: 12px;
      background-color: #e51c23;
      border-radius: 50%;
      vertical-align: middle;
    }
    .el-submenu {
      &.is-opened {
        > .el-submenu__title {
          background-color: #6ec3ee;
        }
      }
      &.is-active {
        background-color: #6ec3ee;
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
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        text-align: center;
        .el-submenu__icon-arrow {
          display: none;
        }
        &:hover {
          color: #50baf0;
          background-color: #dbeafe;
        }
        &.is-active {
          background-color: #6ec3ee;
          color: #fff;
        }
      }
    }
    > .el-menu-item {
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      &:hover {
        color: #50baf0;
        background-color: #dbeafe;
      }
      &.is-active {
        background-color: #6ec3ee;
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
