<template>
  <div class="side-bar">
    <ul class="nav nav-pills nav-stacked" v-if="user.department !== '所长'">
      <router-link :to="ROU.link"
                   v-for="(ROU, index) in routes"
                   :key="index"
                   tag="li"
                   active-class="active">
        <span :class="ROU.icon">{{ROU.name}}</span>
      </router-link>
    </ul>
    <ul class="nav nav-pills nav-stacked" v-if="user.department === '所长'">
      <router-link :to="ROU.link"
                   v-for="(ROU, index) in routesLeader1"
                   :key="index"
                   tag="li"
                   active-class="active">
        <span :class="ROU.icon">{{ROU.name}}</span>
      </router-link>
      <!--职员管理-->
      <li @click="openItem()">
        <span :class="staffManagement.icon">{{staffManagement.name}}</span>
      </li>
      <!--展开项-->
      <router-link :to="ROU.link"
                   v-for="(ROU, index) in staffManagementOpen"
                   v-if="isOpen"
                   :key="index"
                   tag="li"
                   class="open-item"
                   active-class="active">
        <span :class="ROU.icon">{{ROU.name}}</span>
      </router-link>
      <router-link :to="ROU.link"
                   v-for="(ROU, index) in routes"
                   :key="index"
                   tag="li"
                   active-class="active">
        <span :class="ROU.icon">{{ROU.name}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data() {
    return {
      routesLeader1: [
        {name: '立项批复', link: '/business-review-list-leader', icon: 'business-review-list-leader',openClass: 1, open:true},
        {name: '待处理业务', link: '/business-handle-list-leader', icon: 'business-handle-list-sales',openClass: 1, open:true},
        {name: '客户信息', link: '/customer-infor-list', icon: 'customer-infor-list',openClass: 1, open:true}
      ],
      staffManagement: {name: '职员管理', link: '/staff-management-author', icon: 'staff-management-author',openClass: 2, open:true},
      staffManagementOpen: [
        {name: '职员权限管理', link: '/staff-management-author', icon: 'no-pic',openClass: 2, open:false},
        {name: '职员资料管理', link: '/staff-management-infor', icon: 'no-pic',openClass: 2, open:false},
      ],
      isOpen: false
    };
  },
  computed: {
    routes() {
      let routes = [];
      if (this.user.department) {
        if (this.user.department === '所长') {
          routes = [
            // {name: '职员权限管理', link: '/staff-management-author', icon: 'staff-management-author',openClass: 2, open:false},
            // {name: '职员资料管理', link: '/staff-management-infor', icon: 'staff-management-author',openClass: 2, open:false},
            {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1, open:true}
          ];
        } else if (this.user.department === '办公室') {
          if (this.user.authority['发合同编号']) {
            routes.push({name: '待发合同编号', link: '/business-review-list-office', icon: 'bid-info',openClass: 1, open:true});
          }
          if (this.user.authority['装订业务报告']) {
            routes.push({name: '待装订业务', link: '/business-handle-list-office', icon: 'bid-info'});
          }
          routes.push({name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1, open:true});
        } else if (this.user.department === '业务部') {
          routes = [
            {name: '立项审批', link: '/business-review-list-sales', icon: 'business-review-list-leader',openClass: 1, open:true},
            {name: '待处理业务', link: '/business-handle-list-sales', icon: 'business-handle-list-sales',openClass: 1, open:true},
            {name: '客户信息', link: '/customer-infor-list', icon: 'customer-infor-list',openClass: 1},
            {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1}
          ];
        } else if (this.user.department === '风险评估部') {
          if (this.user.authority['业务初审']) {
            routes.push({name: '立项批复', link: '/business-review-list-risk', icon: 'business-review-list-leader',openClass: 1, open:true});
          }
          if (this.user.authority['业务复审']) {
            routes.push({name: '报告审核', link: '/business-handle-list-risk', icon: 'bid-info',openClass: 1 ,open:true});
          }
          routes.push({name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1 ,open:true});
        } else if (this.user.department === '档案部') {
          routes = [
            {name: '待处理业务', link: '/business-handle-list-archives', icon: 'business-handle-list-sales',openClass: 1 ,open:true},
            {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1 ,open:true}
          ];
        } else if (this.user.department === '财务部') {
          routes = [
            {name: '待开发票', link: '/business-handle-list-financial', icon: 'bid-info',openClass: 1 ,open:true},
            {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1 ,open:true}
          ];
        } else if (this.user.department === '市场部') {
          routes = [
            {name: '招投标信息', link: '/bid-info-list', icon: 'bid-info',openClass: 1 ,open:true},
            {name: '草稿箱', link: '/bid-info-draft', icon: 'bid-info-draft',openClass: 1 ,open:true}
          ];
        }
        this.$router.push(routes[0].link);
        if(this.user.department === '市场部') {
          return routes.concat([
            {name: '规章制度', link: '/rule-regulation', icon: 'rule-regulation',openClass: 1 ,open:true}
          ]);
        } else {
          return routes.concat([
            {name: '已完成业务', link: '/business-complete-list', icon: 'business-complete-list',openClass: 1, open:true},
            {name: '规章制度', link: '/rule-regulation', icon: 'rule-regulation',openClass: 1, open:true}
          ]);
        }
      } else {
        return routes;
      }
    }
  },
  props: ['user'],
  methods: {
    openItem() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$router.push('/staff-management-author');
      }
    }
  },
  created() {

  }
};
</script>

<style lang="sass" scoped>
@import '../../scss/_variables.scss';

.side-bar {
  position: fixed;
  color: #797a7a;
  background-color: #283037;
  height: 100%;
  .nav-pills {
    > li {
      &:hover {
        color: #797a7a;
        background-color: #789ebd;
      }
      &.open-item {
        padding-left: 20%;
      }
      > span {
        display: block;
        width: 100px;
        margin: 0 auto;
        &:before {
          content: '';
          position: relative;
          top: 17px;
          left: -30px;
          display: block;
          height: 14px;
          width: 14px;
        }
        &.bid-info:before {
          background: url('../../img/sidebar/bidInfo.png');
          background-repeat: no-repeat;
        }
        &.customer-infor-list:before {
          background: url('../../img/sidebar/customer-infor-list.png');
          background-repeat: no-repeat;
        }
        &.staff-management-author:before {
          background: url('../../img/sidebar/staff-management-author.png');
          background-repeat: no-repeat;
        }
        &.business-review-list-leader:before {
          background: url('../../img/sidebar/business-review-list-leader.png');
          background-repeat: no-repeat;
        }
        &.business-complete-list:before {
          background: url('../../img/sidebar/business-complete-list.png');
          background-repeat: no-repeat;
        }
        &.rule-regulation:before {
          background: url('../../img/sidebar/rule-regulation.png');
          background-repeat: no-repeat;
        }
        &.bid-info-draft:before {
          background: url('../../img/sidebar/bid-info-draft.png');
          background-repeat: no-repeat;
        }
        &.business-handle-list-sales:before {
          background: url('../../img/sidebar/business-handle-list-sales.png');
          background-repeat: no-repeat;
        }
      }
      &.active {
          > span {
            &.bid-info:before {
              background: url('../../img/sidebar/bidInfoSelected.svg');
              background-repeat: no-repeat;
            }
            &.customer-infor-list:before {
              background: url('../../img/sidebar/customer-infor-listSelected.svg');
              background-repeat: no-repeat;
            }
            &.staff-management-author:before {
              background: url('../../img/sidebar/staff-management-authorSelected.svg');
              background-repeat: no-repeat;
            }
            &.business-review-list-leader:before {
              background: url('../../img/sidebar/business-review-list-leaderSelected.svg');
              background-repeat: no-repeat;
            }
            &.business-complete-list:before {
              background: url('../../img/sidebar/business-complete-listSelected.svg');
              background-repeat: no-repeat;
            }
            &.rule-regulation:before {
              background: url('../../img/sidebar/rule-regulationSelected.svg');
              background-repeat: no-repeat;
            }
            &.bid-info-draft:before {
              background: url('../../img/sidebar/bid-info-draftSelected.svg');
              background-repeat: no-repeat;
            }
            &.business-handle-list-sales:before {
              background: url('../../img/sidebar/business-handle-list-salesSelected.svg');
              background-repeat: no-repeat;
            }
          }
          background-color: #288ada;
          color: #ffffff;
      }
        padding: 1px 15px;
        padding-bottom: 15px;
        color: #999999;
        cursor: pointer;
    }
  }
}
</style>
