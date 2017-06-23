<template>
  <div>
    <!--搜索栏-->
    <form class="search-form" @submit.prevent @keyup.enter.prevent>
      <div class="row">
        <div class="col-md-11">
          <search-bar placeholder="请输入项目名称、招标代理机构、或招标人进行搜索" @search="search" v-show="simpleSearch"></search-bar>
        </div>
        <div class="col-md-10 replace" v-show="!simpleSearch"></div>
        <div class="col-md-1 higher-search f-r">
          <button class="btn my-btn high-btn" type="button" @click="showHigherSearch()">
            高级搜索
            &nbsp;
            <img class="search-icon" v-if="searchDown" src="../../../img/market/search_down.svg">
            <img class="search-icon" v-if="searchUp" src="../../../img/market/search_up.svg">
          </button>
        </div>
      </div>
    </form>
    <!--高级搜索-->
    <form class="form-inline higherForm" v-if="higherSearch">
      <div class="row">
        <div class="col-md-11">
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="projectName">项目名称</label>
              <input type="text" class="form-control ta-c" id="projectName" placeholder="请填写项目名称" v-model="projectName">
            </div>
          </div>
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="agency">代理机构</label>
              <input type="text" class="form-control ta-c" id="agency" placeholder="请填写代理机构" v-model="agency">
            </div>
          </div>
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="tenderPerson">招标人</label>
              <input type="text" class="form-control ta-c" id="tenderPerson" placeholder="请填写招标人" v-model="tenderPerson">
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-11">
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="tenderPerson">招标起始</label>
              <input type="date" class="form-control" v-model="bidStartDate">
            </div>
          </div>
          <div class="col-md-4 ta-c">
            <div class="form-group">
              <label for="tenderPerson">招标结束</label>
              <input type="date" class="form-control" v-model="bidEndDate">
            </div>
          </div>
          <div class="col-md-4">

          </div>
        </div>
      </div>
      <div class="row check-pl">
        <label class="ta-l">项目状态</label>
        <div class="check-box search-checkbox">
          <input class="magic-checkbox" type="checkbox" name="filterState" value="3" v-model="filterState" id="1">
          <label for="1">
            已中标
          </label>
          <input class="magic-checkbox" type="checkbox" name="filterState" value="2" v-model="filterState" id="2">
          <label for="2">
            已入围
          </label>
          <input class="magic-checkbox" type="checkbox" name="filterState" value="1" v-model="filterState" id="3">
          <label for="3">
            已摘牌
          </label>
          <input class="magic-checkbox" type="checkbox" name="filterState" value="0" v-model="filterState" id="4">
          <label for="4">
            未摘牌
          </label>
        </div>
      </div>
      <div class="row check-pl">
        <label class="ta-l">所属类型</label>
        <div class="check-box search-checkbox">
          <input class="magic-checkbox" type="checkbox" name="officeList" value="kjs" v-model="officeList" id="5">
          <label for="5">
            会计所
          </label>
          <input class="magic-checkbox" type="checkbox" name="officeList" value="pgs" v-model="officeList" id="6">
          <label for="6">
            评估所
          </label>
          <input class="magic-checkbox" type="checkbox" name="officeList" value="sws" v-model="officeList" id="7">
          <label for="7">
            税务所
          </label>
          <input class="magic-checkbox" type="checkbox" name="officeList" value="zjs" v-model="officeList" id="8">
          <label for="8">
            造价所
          </label>
        </div>
      </div>
      <div class="search-btns ta-c f-r">
        <button type="button" class="btn my-btn submit-btn" @click="higherSearchEvent()">查找</button>
        <button type="button" class="btn my-btn draft-btn" @click="reset()">重置</button>
      </div>
    </form>
    <h3 class="main-title">
      信息列表
      <button class="btn my-btn submit-btn type-btn f-r" @click="input()" v-if="inputBtn">
        录入
      </button>
    </h3>
    <div class="com-list list-group list-adjust">
      <li class="list-group-item list-head">
        <span class="title">信息详情</span>
        <span class="date pull-right">创建时间</span>
      </li>
      <a class="list-group-item" @click="checkMessage(project)" v-for="project in biddingArray">
        <!--用v-if和v-else-if筛选单一的状态-->
        <span class="label label-warning"
              v-if="project.biddingState==='未摘牌'">未摘牌</span>
        <span class="label label-info"
              v-else-if="project.biddingState==='已摘牌'">已摘牌</span>
        <span class="label label-primary"
              v-else-if="project.biddingState==='已入围'">已入围</span>
        <span class="label label-success"
              v-else-if="project.biddingState==='已中标'">已中标</span>
        <span class="project-name">{{project.biddingName}}</span>
        <span class="date pull-right">{{project.openBidDate}}</span>
      </a>
    </div>
    <my-pagination :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Select } from 'element-ui';
import { Option } from 'element-ui';
import myPagination from '../../component/pagination.vue';
import searchBar from '../../component/searchBar.vue';

Vue.use(Select);
Vue.use(Option);

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
        let openBidDateStr = item.openBidDate.replace("T"," ");
        item.openBidDate = openBidDateStr;
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
    //简单搜索功能
    search(searchContent) {
      this.listType = 'search';
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'searchBiddingList',
              platform: 'web',
              searchContent: searchContent,
              bidStartDate: '',
              bidEndDate: '',
              tenderPerson: '',
              agency: '',
              projectName: '',
              pageNum: this.pageNum
            }
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
    //高级搜索功能
    higherSearchEvent() {
      this.listType = 'higherSearch';
      var departmentSort = [];
      //对选中的所属类型进行排序
      for (var i = 0; i < this.officeList.length; i++) {
        if(this.officeList[i] === 'kjs') {
            departmentSort.push('kjs');
        }
      }
      for (var i = 0; i < this.officeList.length; i++) {
        if(this.officeList[i] === 'pgs') {
            departmentSort.push('pgs');
        }
      }
      for (var i = 0; i < this.officeList.length; i++) {
        if(this.officeList[i] === 'sws') {
            departmentSort.push('sws');
        }
      }
      for (var i = 0; i < this.officeList.length; i++) {
        if(this.officeList[i] === 'zjs') {
            departmentSort.push('zjs');
        }
      }
      this.officeList = departmentSort;
      if (this.officeList.length === 0) {
        this.officeListTrans = '';
      } else {
        this.officeListTrans = this.officeList;
      }
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'searchBiddingList',
              platform: 'web',
              searchContent: '',
              bidStartDate: this.bidStartDate,
              bidEndDate: this.bidEndDate,
              tenderPerson: this.tenderPerson,
              agency: this.agency,
              projectName: this.projectName,
              pageNum: this.pageNum,
              projectType: this.officeListTrans,
              projectStatus: this.filterState.toString()  //调用数组的toString()方法将数组转换成逗号隔开的字符串
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.bidArray = [];
          this.bidArray = rep.data.data.businessArray;
          this.totalNum = rep.data.data.totalNum;
        }
      }, (rep) => { });
    },
    //高级搜索重置功能
    reset() {
      this.projectName = '';
      this.tenderPerson = '';
      this.agency = '';
      this.bidStartDate = '';
      this.bidEndDate = '';
      this.filterState = [];
      this.officeList = [];
      this.getAllList();
    },
    //市场部显示录入按钮
    showInputBtn() {
      if (this.user.department === "市场部") {
        this.inputBtn = true;
      }
    },
    //获取列表
    getAllList() {
      this.listType = 'get';
      //实例化Promise对象，用于异步计算
      let pro = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          method: 'get',
          url: '/service',
          params: {
            data: (() => {
              let obj = {
                command: 'getBiddingList',
                platform: 'web',
                type: 'other',
                pageNum: this.pageNum
              }
              return JSON.stringify(obj);
            })()
          }
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            this.bidArray = [];
            this.bidArray = rep.data.data.businessArray;
            this.totalNum = rep.data.data.totalNum;
            resolve('done');
          }
        }, (rep) => { });
      });
      return pro;
    },
    //分页功能
    currentChange(val) {
      this.pageNum = val;
      if (this.listType === 'get') {
        this.getAllList();
      } else if (this.listType === 'search') {
        this.search();
      } else if (this.listType = 'higherSearch') {
        this.higherSearchEvent();
      }
    },
    //高级搜索与简单搜索切换
    showHigherSearch() {
      if (this.higherSearch === false) {
        this.higherSearch = true;
        this.simpleSearch = false;
        this.searchUp = true;
        this.searchDown = false;
      } else {
        this.higherSearch = false;
        this.simpleSearch = true;
        this.searchUp = false;
        this.searchDown = true;
      }
    }
  },
  components: {
    axios,
    qs,
    myPagination,
    searchBar
  },
  created() {
    this.getAllList().then(() => {
    }, () => { });
    //用vuex中的$store.dispatch()方法获取职员身份信息
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
      this.showInputBtn();
    }, () => { });
  }
}
</script>

<style lang="sass" scoped>
  .f-r {
  	float: right;
  }
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
