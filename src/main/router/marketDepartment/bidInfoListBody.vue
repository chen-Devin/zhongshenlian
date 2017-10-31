<template>
  <div>
    <h3 class="main-title">
      招投标审批
      <button class="btn my-btn submit-btn type-btn f-r mr-20" @click="input()" v-if="inputBtn">
        录入
      </button>
      <search-bar 
        class="f-r"
        :searchItems="searchItems"
        @search="search"></search-bar>
    </h3>
    <table class="table table-bordered table-hover table-list">
      <thead>
        <tr>
          <th>招投标名称</th>
          <th>分管公司</th>
          <th>发起时间</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(project, index) in biddingArray" 
          @click="checkMessage(project)" 
          :key="index">
          <td>{{ project.biddingName }}</td>
          <td>{{ project.companyName }}</td>
          <td>{{ project.createAt }}</td>
          <td>
            <span class="label label-warning"
                  v-if="project.biddingState==='未摘牌'">未摘牌</span>
            <span class="label label-info"
                  v-else-if="project.biddingState==='已摘牌'">已摘牌</span>
            <span class="label label-primary"
                  v-else-if="project.biddingState==='已入围'">已入围</span>
            <span class="label label-success"
                  v-else-if="project.biddingState==='已中标'">已中标</span>
          </td>
        </tr>
      </tbody>
    </table>
    <my-pagination 
      class="list-pagination" 
      :totalNum="totalNum"
      @currentChange="currentChange"
      v-if="reloadPagination"></my-pagination>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import myPagination from '../../component/pagination.vue';
import searchBar from '../../component/searchBar.vue';

export default {
  name: 'bidInfoListBody',
  data() {
    return {
      bidStartDate: '', //搜索栏：招投标起始时间
      bidEndDate: '',   //搜索栏：招投标截止时间
      filterState: [],  //搜索栏：项目状态复选框初始化数组
      officeList: [],   //搜索栏：所属类型复选框初始化数组
      inputBtn: false,  //市场部显示录入按钮
      higherSearch: false,  //高级搜索搜索板块显示
      searchDown: true,  //高级搜索icon
      searchUp: false,   //高级搜索icon
      simpleSearch: true,//简单搜索显示
      bidArray: [],      //是数组不是对象
      user: {},          //身份
      searchContent: '', //绑定简单搜索内容
      officeListTrans: '',  //传递：中间变量，传入后台的所属类型
      pageNum: 1,        //传递：查询的页数
      totalNum: 1,       //分页：总条数
      listType: 'get',   //区分get和search功能
      projectName: '',   //搜索栏：项目名称
      tenderPerson: '',  //搜索栏：招标人
      agency: '',        //搜索栏：招标代理机构
      reloadPagination: true,
      searchItems: [
        {
          label: '招投标名称',
          value: 'projectName'
        }
      ],
      searchObj: {}
    };
  },
  computed: {
    //计算项目状态，将数字表示的项目状态转换为可以显示的文字
    biddingArray() {
      //利用中间变量，避免更改原始数据
      this.bidArrayConnect = this.bidArray;
      for (var i = 0; i < this.bidArrayConnect.length; i++) {
        if (this.bidArrayConnect[i].biddingState === "0") {
          this.bidArrayConnect[i].biddingState = '未摘牌';
        }
        if (this.bidArrayConnect[i].biddingState === "1") {
          this.bidArrayConnect[i].biddingState = '已摘牌';
        }
        if (this.bidArrayConnect[i].biddingState === "2") {
          this.bidArrayConnect[i].biddingState = '已入围';
        }
        if (this.bidArrayConnect[i].biddingState === "3") {
          this.bidArrayConnect[i].biddingState = '已中标';
        }
        if (this.bidArrayConnect[i].biddingState === "4") {
          this.bidArrayConnect[i].biddingState = '已过期';
        }
        if (this.bidArrayConnect[i].reviewState === "1") {
          this.bidArrayConnect[i].reviewState = "通过";
        }
        if (this.bidArrayConnect[i].reviewState === "0") {
          this.bidArrayConnect[i].reviewState = "不通过";
        }
      }
      //用字符串map()方法处理创建时间，把T替换为空格
      this.bidArrayConnect = this.bidArrayConnect.map((item, index, array) => {
        // let openBidDateStr = item.openBidDate.replace('T','');
        // item.openBidDate = openBidDateStr;
        return item;
      });
      return this.bidArrayConnect;
    }
  },
  methods: {
    //用$router.push()方法转入录入页面
    input() {
      this.$router.push('/bid-info-input/');
    },
    //传入项目id和判断项目和草稿箱的标志，两个参数之间用&符号连接
    checkMessage(project) {
      this.$router.push('/bid-info-detail/' + project.id + "&notDraft");
    },
    // 搜索功能
    search(searchObj) {
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 200)
      this.pageNum = 1
      this.searchObj = searchObj
      this.getBiddingList()
    },
    // 获取列表
    getBiddingList () {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {}
            obj.command = 'searchBiddingList'
            obj.platform = 'web'
            obj.pageNum = this.pageNum
            Object.assign(obj, this.searchObj)
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.bidArray = [];
          this.bidArray = rep.data.data.businessArray
          this.totalNum = rep.data.data.totalNum;
        }
      }, (rep) => { });
    },
    // 市场部显示录入按钮
    showInputBtn() {
      if (this.user.department === "市场部") {
        this.inputBtn = true;
      }
    },
    // 分页功能
    currentChange(val) {
      this.pageNum = val
      this.getBiddingList()
    }
  },
  components: {
    axios,
    qs,
    myPagination,
    searchBar
  },
  created() {
    this.search(this.searchObj)
    //用vuex中的$store.dispatch()方法获取职员身份信息
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
      this.showInputBtn();
    }, () => { });
  }
}
</script>

<style lang="sass" scoped>
  .ta-r {
  	text-align: right;
  }
  .ta-c {
    text-align: center;
  }
  .va-c {
    vertical-align: middle;
  }
  .higher-search {
    margin-top: 30px;
    button {
      float: right;
    }
  }
  .dateMr {
  	padding-right: 110px;
  }
  .form-inline {
  	.form-group {
  		margin: 10px 0;
  		label {
  			margin-right: 5px;
  		}
  		.bidMan {
  			margin-right: 18px;
  		}
  	}
  }
  .check-wrap {
  	margin: 0;
  	margin-top: 5px;
  	margin-bottom: 5px;
  	label {
  		margin-top: 7px;
  	}
  }
  table {
  	tbody {
  		tr {
  			cursor: pointer;
  		}
  	}
  }
  .bidMan-input {
  	width: 330px;
  }
  .angency-input {
  	width: 330px;
  }
  .name-input {
  	width: 95%;
    text-align: center;
  }
  .left-move {
  	margin-left: 10px;
  }
  input::-ms-input-placeholder {
    text-align: center;
  }
  input::-webkit-input-placeholder {
    text-align: center;
  }
  .selectBox {
  	width: 330px;
  }
  .timeWidth {
  	width: 50%;
  	padding-left: 20px;
  }
  .typeWidth {
  	width: 48%;
  	padding-left: 25px;
  }
  .input-icon {
    margin-top: -2px;
  }
  .search-icon {
    margin-top: -2px;
  }
  .higherForm {
    margin-top: -50px;
    .form-group {
      width: 100%;
      label {
        width: 25%;
      }
      input {
        width: 70%;
      }
    }
  }
  .search-btns {
    margin-top: -62px;
    margin-right: -52px;
    button {
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  .search-checkbox {
    display: inline-block;
    margin-left: 45px;
    margin-top: 10px;
    vertical-align: bottom;
  }
  .search-form {
    padding-left: 0;
    padding-right: 0;
  }
  .search-btn {
    right: 0;
  }
  .project-name {
    margin-left: 10px;
  }
  .com-list {
    a {
      cursor: pointer;
    }
  }
  .check-pl {
    padding-left: 3%;
  }
</style>
