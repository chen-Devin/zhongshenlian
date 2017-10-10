<template>
  <div class="quick">
    <crumbs :paths="paths"></crumbs>
    <!-- <p>{{ linksArray }}</p> -->
    <div class="quick-wrapper">
      <quick-link v-for="(link, index) in linksArray" :iniLink="link" :iniItemIndex="index" :key="index"></quick-link>
      <div class="operate" @click="showAddItem">
        添加/删除
      </div>
    </div>
    <el-row>
      <el-col :span="12">
        <p class="todo-title">待办事项（{{ itemCounts }}）</p>
        <card class="card">
          <div class="to-wrapper">
            <table class="table table-bordered table-hover table-list">
              <thead>
                <tr>
                  <th>标题</th>
                  <th>事项类别</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(project, index) in tableData" 
                  @click="checkMessage(project)" 
                  :key="index">
                  <td>{{ project.title }}</td>
                  <td>{{ project.type }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </card>
      </el-col>
      <el-col :span="12">
        <p class="todo-title">规章制度</p>
        <card class="card rule-card">
          <div class="to-wrapper">
            <p class="title">规章制度</p>
            <div class="content">
              123
            </div>
          </div>
        </card>
      </el-col>
    </el-row>
    <modal modal-width="700px" v-if="addItem">
      <div class="items-wrap" slot="body">
        <div class="item-column" v-for="(item, index) in quickArray" :key="index">
          <p class="title">{{ item.title }}</p>
          <el-checkbox-group v-model="shortcutArray">
            <el-checkbox :label="innerItem" v-for="(innerItem, index) in item.detailArray" :key="index"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </modal>
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
      tableData: [],
      shortcutArray: [],
      itemCounts: 3,
      addItem: false,
      quickArray: [{
        title: '待办事项',
        detailArray: ['立项审批', '招投标审批']
      }, {
        title: '信息管理',
        detailArray: ['客户信息管理']
      }, {
        title: '职员管理',
        detailArray: ['职员录入', '权限分配']
      }, {
        title: '项目管理',
        detailArray: ['立项业务', '进行中业务', '已完成业务']
      }],
      allQuickArray: [{
          icon: 'el-icon-star-on',
          linkTo: '/business-review-list-leader',
          department: '所长',
          title: '立项审批'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '/business-handle-list-leader',
          department: '所长',
          title: '进行中业务'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '/bid-info-list',
          title: '招投标审批'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '',
          title: '报销审批'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '',
          title: '业务信息管理'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '/customer-infor-list',
          title: '客户信息'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '/company-management',
          title: '公司信息'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '',
          title: '外部协办方信息管理'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '/business-review-add',
          title: '立项业务'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '/business-complete-list',
          title: '已完成业务'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '/staff-management-author',
          title: '权限分配'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '/staff-management-infor',
          title: '职员录入'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '',
          title: '报销申请'
        }, {
          icon: 'el-icon-star-on',
          linkTo: '',
          title: '报销记录'
        }]
    };
  },
  computed: {
    linksArray() {
      var middle = [];
      this.shortcutArray.forEach((item, index) => {
        for (let i = 0; i <= this.allQuickArray.length - 1; i++) {
          if(this.allQuickArray[i].title === item) {
            if (this.allQuickArray[i].title === '立项审批' || this.allQuickArray[i].title === '进行中业务') {
              if (this.allQuickArray[i].department === this.user.department) {
                middle.push(this.allQuickArray[i]);
              }
            } else {
              middle.push(this.allQuickArray[i]);
            }
          }
        }
      });
      return middle;
    }
  },
  methods: {
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
              shortcutArray: this.shortcutArray
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.addItem = false;
          this.$message('保存快捷选项成功');
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    checkMessage (project) {
      console.log(project)
    }
  },
  props: [''],
  created() {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
      this.shortcutArray = this.user.shortcutArray;
    }, () => { });
    this.getToBeDoneList();
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
  .quick {
    padding-right: 20px;
    > .quick-wrapper {
      display: flex;
      justify-content: flex-start;
      margin-top: 39px;
      margin-left: 30px;
      margin-bottom: 33px;
    }
    > .el-row {
      > .el-col {
        > .todo-title {
          margin-left: 30px;
        }
        > .card {
          margin-right: 0;
          &.rule-card {
            height: 260px;
            padding-top: 14px;
            padding-bottom: 28px;
            padding-left: 20px;
            padding-right: 20px;
            > .to-wrapper {
              > .title {
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-size: 14px;
              }
              > .content {
                height: 188px;
                background-color: #f9fdfe;
                overflow: auto;
              }
            }
          }
        }
      }
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
      padding-top: 35px;
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
  }
</style>
