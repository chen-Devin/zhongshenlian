<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <div class="quick-wrapper">
        <quick-link v-for="(link, index) in linksArray" :iniLink="link" :key="index"></quick-link>
        <div class="operate" @click="showAddItem">
          添加/删除
        </div>
      </div>
      <div class="to-wrapper">
        <p>待办事项（{{ itemCounts }}）</p>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            style="width: 50%">
          </el-table-column>
          <el-table-column
            prop="type"
            label="事项类别"
            style="width: 50%">
          </el-table-column>
        </el-table>
        <p class="more" style="width: 100%">
          <router-link to="/business-review-list-leader">
            查看更多
          </router-link>
        </p>
      </div>
      <modal modal-width="700px" v-if="addItem">
        <div class="items-wrap" slot="body">
          <div class="item-column" v-for="item in quickArray">
            <p class="title">{{ item.title }}</p>
            <el-checkbox-group v-model="checkList">
              <el-checkbox :label="innerItem" v-for="innerItem in item.detailArray"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </modal>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import QuickLink from './component/quickLink.vue';
import Modal from '../../component/modal.vue';

export default {
  name: 'quick',
  data() {
    return {
      paths: [
        { name: '我的快捷', url: '/quick', present: true }
      ],
      user: {},
      checkList: [],
      linksArray: [],
      tableData: [],
      itemCounts: 3,
      addItem: false,
      quickArray: [{
        title: '待办事项',
        detailArray: ['立项审批', '报销审批', '招投标审批']
      }, {
        title: '信息管理',
        detailArray: ['业务信息管', '客户信息管理', '公司信息管理', '外部协办方信息管理']
      }, {
        title: '职员管理',
        detailArray: ['职员录入', '权限分配']
      }, {
        title: '项目管理',
        detailArray: ['立项业务', '进行中业务', '已完成业务']
      }, {
        title: '财务申请',
        detailArray: ['报销申请', '报销记录']
      }]
    };
  },
  computed: {
    // linksArr() {
    //   if (this.user.department === '所长') {
    //     return [{
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '/business-review-list-leader',
    //       title: '立项审批'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '/bid-info-list',
    //       title: '招投标审批'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '',
    //       title: '报销审批'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '',
    //       title: '业务信息管理'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '/customer-infor-list',
    //       title: '客户信息管理'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '',
    //       title: '公司信息管理'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '',
    //       title: '外部协办方信息管理'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '/business-review-add',
    //       title: '立项业务'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '/business-handle-list-leader',
    //       title: '进行中业务'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '/business-complete-list',
    //       title: '已完成业务'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '/staff-management-author',
    //       title: '权限分配'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '/staff-management-infor',
    //       title: '职员录入'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '',
    //       title: '报销申请'
    //     }, {
    //       icon: 'el-icon-star-on',
    //       bgc: '#daeb98',
    //       linkTo: '',
    //       title: '报销记录'
    //     }]
    //   }
    // }
  },
  props: [''],
  created() {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
    }, () => { });
    this.getShortcutList();
    this.getToBeDoneList();
  },
  methods: {
    getShortcutList() {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getShortcutList',
              platform: 'web'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          console.log(rep.data.data);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
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
          this.tableData = rep.data.data.dataArray;
          this.itemCounts = rep.data.data.totalNum;
          console.log(rep.data.data);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    showAddItem() {
      this.addItem = true;
    },
    cancel() {
      this.addItem = false;
    },
    submit() {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'editShortcut',
              platform: 'web',
              shortcutArray: this.checkList
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          console.log(rep.data.data);
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
      console.log(this.checkList);
    }
  },
  components: {
    crumbs,
    card,
    QuickLink,
    Modal
  }
}
</script>

<style lang="sass" scoped>
  .quick-wrapper {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 50px;
  }
  .to-wrapper {
    .more {
      padding: 10px 0;
      border: 1px solid #eee;
      text-align: center;
    }
  }
  .operate {
    display: inline-block;
    box-sizing: border-box;
    width: 80px;
    height: 90px;
    padding-top: 13px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    margin: 0 10px;
    background-color: #9E9E9E;
    cursor: pointer;
  }
  .items-wrap {
    display: flex;
    justify-content: space-between;
    .item-column {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-right: 20px;
    }
  }
  .el-checkbox {
    display: block;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
  .el-checkbox__label {
    font-weight: normal;
  }
</style>
