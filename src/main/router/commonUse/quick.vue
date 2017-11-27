<template>
  <div class="quick">
    <crumbs :paths="paths"></crumbs>
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
            <table class="table table-bordered table-list">
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
            <p class="empty-list-p" v-if="tableData.length === 0">暂无数据</p>
          </div>
        </card>
      </el-col>
      <el-col :span="12">
        <p class="todo-title">规章制度</p>
        <card class="card rule-card">
          <div class="to-wrapper">
            <p class="title">{{ rule.title }}</p>
            <div class="content" v-html="rule.content">
              
            </div>
          </div>
        </card>
      </el-col>
    </el-row>
    <el-row class="project-abtract">
      <el-col :span="24">
        <p class="todo-title">项目概况</p>
        <card class="card">
          <div class="to-wrapper">
            <table class="table table-bordered table-list">
              <thead>
                <tr>
                  <th>项目动态</th>
                  <th>状态</th>
                  <th>发起人</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(project, index) in projectData" 
                  :key="index">
                  <td width="60%">
                    <p>
                      <span class="project-dynamic">{{ project.projectName }}</span>
                    </p>
                  </td>
                  <td>{{ statusMap(project.projectStatus) }}</td>
                  <td>{{ project.applicantName }}</td>
                  <td>{{ project.startTime }}</td>
                </tr>
              </tbody>
            </table>
            <p class="empty-list-p" v-if="projectData.length === 0">暂无数据</p>
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
        <button class="btn my-btn submit-btn" @click="submit">确定</button>
        <button class="btn my-btn draft-btn" @click="cancel">取消</button>
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
      projectData: [],
      shortcutArray: [],
      itemCounts: 3,
      addItem: false,
      quickArray: [],
      allQuickArray: [],
      rule: {
        title: '',
        content: ''
      },
      identity: ''
    };
  },
  computed: {
    linksArray() {
      var middle = [];
      this.shortcutArray.forEach((item, index) => {
        for (let i = 0; i <= this.allQuickArray.length - 1; i++) {
          if(this.allQuickArray[i].title === item) {
            middle.push(this.allQuickArray[i]);
          }
        }
      });
      return middle;
    }
  },
  methods: {
    statusMap (status) {
      switch(Number(status)) {
        case 10:
          return '草稿状态'
          break;
        case 20:
          return '立项'
          break;
        case 30:
          return '质控部初审驳回'
          break;
        case 40:
          return '质控部初审通过'
          break;
        case 50:
          return '所长审核驳回'
          break;
        case 60:
          return '所长审核通过'
          break;
        case 70:
          return '办公室合同审核'
          break;
        case 80:
          return '办公室合同盖章'
          break;
        case 90:
          return '办公室合同编号发放'
          break;
        case 110:
          return '开始上传报告'
          break;
        case 111:
          return '报告上传完成'
          break;
        case 112:
          return '二维码上传完成'
          break;
        case 113:
          return '打印装订盖章'
          break;
        case 114:
          return '返回报告'
          break;
        case 120:
          return '归档报告'
          break;
        case 130:
          return '业务完结'
          break;
        default:
          return '暂无'
      }
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
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    },
    getProjectDynamics() {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getProjectDynamics',
              platform: 'web',
              pageNum: 1
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.projectData = rep.data.data.businessArray;
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
              // shortcutArray: []
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
      if (project.type === '招投标') {
        this.$router.push('/bid-info-detail/' + project.id + '&notDraft')
      } else if (project.type === '项目') {
        this.$router.push('/business-handle-detail-' + this.identity + '-' + project.id + '/business-profile')
      }
    },
    getAllQuickArray (department) {
      let arr = [
        {
          icon: require('../../../img/quick/finish.png'),
          linkTo: '/business-complete-list',
          title: '已完成项目'
        }, 
        {
          icon: require('../../../img/quick/expense-apply.png'),
          linkTo: '/expenses-list',
          title: '报销申请'
        },
        {
          icon: require('../../../img/quick/customer-infor.png'),
          linkTo: '/customer-infor-list',
          title: '客户信息'
        }, 
        {
          icon: require('../../../img/quick/expense-review.png'),
          linkTo: '',
          title: '报销审批'
        }, 
        {
          icon: require('../../../img/quick/staff.png'),
          linkTo: '/staff-management-author',
          title: '职员管理'
        }, 
        {
          icon: require('../../../img/quick/set.png'),
          linkTo: '/business-review-list-sales',
          title: '立项项目'
        }, 
        {
          icon: require('../../../img/quick/company.png'),
          linkTo: '/company-management',
          title: '公司信息'
        }
      ]
      switch(department) {
        case '所长':
          let arr_leader = [
            {
              icon: require('../../../img/quick/bid.png'),
              linkTo: '/bid-info-list',
              title: '招投标审批'
            },  
            {
              icon: require('../../../img/quick/review-leader.png'),
              linkTo: '/business-review-list-leader',
              title: '立项审批'
            },
            {
              icon: require('../../../img/quick/ing.png'),
              linkTo: '/business-handle-list-leader',
              title: '进行中项目'
            } 
          ]
          arr_leader = arr.concat(arr_leader)
          return arr_leader
          break;
        case '质控部':
          let arr_risk = [
            {
              icon: require('../../../img/quick/review.png'),
              linkTo: '/business-handle-list-risk',
              title: '待处理项目'
            },
            {
              icon: require('../../../img/quick/bid.png'),
              linkTo: '/bid-info-list',
              title: '招投标信息'
            }
          ]
          arr_risk = arr.concat(arr_risk)
          return arr_risk
          break;
        case '业务部':
          let arr_sales = [
            {
              icon: require('../../../img/quick/bid.png'),
              linkTo: '/bid-info-list',
              title: '招投标信息'
            },
            {
              icon: 'el-icon-star-on',
              linkTo: '/business-handle-list-sales',
              title: '进行中项目'
            } 
          ]
          arr_sales = arr.concat(arr_sales)
          return arr_sales
          break;
        case '市场部':
          let arr_market = [
            {
              icon: require('../../../img/quick/bid.png'),
              linkTo: '/bid-info-list',
              title: '招投标信息'
            },
            {
              icon: require('../../../img/quick/draft.png'),
              linkTo: '/bid-info-draft',
              title: '草稿箱'
            }
          ]
          arr_market = arr.concat(arr_market)
          return arr_market
          break;
        case '财务部':
          let arr_finance = [
            {
              icon: require('../../../img/quick/bid.png'),
              linkTo: '/bid-info-list',
              title: '招投标信息'
            },
            {
              icon: require('../../../img/quick/review.png'),
              linkTo: '/business-handle-list-financial/0',
              title: '待开发票'
            },
            {
              icon: require('../../../img/quick/expense-review.png'),
              linkTo: '/expenses-review/0',
              title: '单据审核'
            }
          ]
          arr_finance = arr.concat(arr_finance)
          return arr_finance
          break;
        case '档案部':
          let arr_archives = [
            {
              icon: require('../../../img/quick/bid.png'),
              linkTo: '/bid-info-list',
              title: '招投标信息'
            },
            {
              icon: require('../../../img/quick/review.png'),
              linkTo: '/business-handle-list-archives',
              title: '待处理项目'
            }
          ]
          arr_archives = arr.concat(arr_archives)
          return arr_archives
          break;
        case '办公室':
          let arr_office = [
            {
              icon: require('../../../img/quick/bid.png'),
              linkTo: '/bid-info-list',
              title: '招投标信息'
            },
            {
              icon: require('../../../img/quick/review.png'),
              linkTo: '/business-handle-list-office',
              title: '待处理项目'
            }
          ]
          arr_office = arr.concat(arr_office)
          return arr_office
          break;
      }
    },
    getNewRegulation () {
      axios({
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            var obj = {
              command: 'getNewRegulation',
              platform: 'web'
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.rule = rep.data.data
        } else if (rep.data.statusCode === '10012') {
          window.location.href = 'signIn.html';
        }
      }, (rep) => { });
    }
  },
  created() {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
      this.shortcutArray = this.user.shortcutArray;
      this.allQuickArray = this.getAllQuickArray(this.user.department)
      switch(this.user.department) {
        case '所长':
          this.identity = 'leader'
          this.quickArray = [
              {
                title: '待办事项',
                detailArray: ['立项审批', '招投标审批', '报销审批']
              }, 
              {
                title: '信息管理',
                detailArray: ['客户信息', '公司信息']
              }, 
              {
                title: '职员管理',
                detailArray: ['职员管理']
              }, 
              {
                title: '项目管理',
                detailArray: ['立项项目', '进行中项目', '已完成项目']
              }
            ]
          break;
        case '质控部':
          this.identity = 'risk'
          this.quickArray = [
              {
                title: '待处理项目',
                detailArray: ['待处理项目']
              }, 
              {
                title: '招投标信息',
                detailArray: ['招投标信息']
              }, 
              {
                title: '报销申请',
                detailArray: ['报销申请']
              }, 
              {
                title: '项目管理',
                detailArray: ['已完成项目']
              }
            ]
          break;
        case '业务部':
          this.identity = 'sales'
          this.quickArray = [
              {
                title: '客户信息',
                detailArray: ['客户信息']
              }, 
              {
                title: '招投标信息',
                detailArray: ['招投标信息']
              }, 
              {
                title: '报销申请',
                detailArray: ['报销申请']
              }, 
              {
                title: '项目管理',
                detailArray: ['立项项目', '进行中项目', '已完成项目']
              }
            ]
          break;
        case '市场部':
          this.identity = 'market'
          this.quickArray = [
              {
                title: '招投标信息',
                detailArray: ['招投标信息']
              }, 
              {
                title: '草稿箱',
                detailArray: ['草稿箱']
              }, 
              {
                title: '报销申请',
                detailArray: ['报销申请']
              }
            ]
          break;
        case '财务部':
          this.identity = 'financial'
          this.quickArray = [
              {
                title: '招投标信息',
                detailArray: ['招投标信息']
              }, 
              {
                title: '报销申请',
                detailArray: ['报销申请']
              }, 
              {
                title: '项目管理',
                detailArray: ['已完成项目']
              },
              {
                title: '待处理项目',
                detailArray: ['待开发票', '单据审核']
              }
            ]
          break;
        case '档案部':
          this.identity = 'archives'
          this.quickArray = [
              {
                title: '待处理项目',
                detailArray: ['待处理项目']
              },
              {
                title: '招投标信息',
                detailArray: ['招投标信息']
              }, 
              {
                title: '报销申请',
                detailArray: ['报销申请']
              }, 
              {
                title: '项目管理',
                detailArray: ['已完成项目']
              }         
            ]
          break;
        case '办公室':
          this.identity = 'office'
          this.quickArray = [
              {
                title: '待处理项目',
                detailArray: ['待处理项目']
              },
              {
                title: '招投标信息',
                detailArray: ['招投标信息']
              }, 
              {
                title: '报销申请',
                detailArray: ['报销申请']
              }, 
              {
                title: '项目管理',
                detailArray: ['已完成项目']
              }         
            ]
          break;
        default: 
          alert('职员信息错误')
      }
    }, () => { })
    this.getToBeDoneList()
    this.getProjectDynamics()
    this.getNewRegulation()
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
    .project-dynamic {
      display: inline-block;
      width: 90%;
      height: 19px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > .quick-wrapper {
      display: flex;
      justify-content: flex-start;
      margin-top: 39px;
      margin-left: 30px;
      margin-bottom: 33px;
    }
    > .el-row {
      &.project-abtract {
        margin-top: 30px;
      }
      > .el-col {
        > .todo-title {
          margin-left: 30px;
        }
        > .card {
          margin-right: 0;
          &.rule-card {
            height: 354px;
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
                height: 270px;
                background-color: #f9fdfe;
                overflow: auto;
              }
            }
          }
        }
      }
    }
    .to-wrapper {
      .table {
        thead {
          background-color: #fff;
          border-bottom: 10px solid #F9FBFE;
        }
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
