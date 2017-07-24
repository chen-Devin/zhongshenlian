<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <div>
        <quick-link v-for="(link, index) in linksArr" :iniLink="link" :key="index"></quick-link>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import QuickLink from './component/quickLink.vue';

export default {
  name: 'quick',
  data() {
    return {
      paths: [
        { name: '我的快捷', url: '/quick', present: true }
      ],
      user: {}
    };
  },
  computed: {
    linksArr() {
      if (this.user.department === '所长') {
        return [{
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/business-review-list-leader',
          title: '立项审批'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/bid-info-list',
          title: '招投标审批'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '',
          title: '报销审批'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '',
          title: '业务信息管理'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/customer-infor-list',
          title: '客户信息管理'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '',
          title: '公司信息管理'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '',
          title: '外部协办方信息管理'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/business-review-add',
          title: '立项业务'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/business-handle-list-leader',
          title: '进行中业务'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/business-complete-list',
          title: '已完成业务'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/staff-management-author',
          title: '职员权限管理'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/staff-management-infor',
          title: '职员资料管理'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/rule-regulation',
          title: '规章制度'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '',
          title: '报销申请'
        }, {
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '',
          title: '报销记录'
        }]
      }
    }
  },
  props: [''],
  created() {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
    }, () => { });
  },
  methods: {

  },
  components: {
    crumbs,
    card,
    QuickLink
  }
}
</script>

<style lang="sass" scoped>

</style>
