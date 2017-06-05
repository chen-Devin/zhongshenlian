<template>
  <div>
    <form class="search-form" @submit.prevent @keyup.enter.prevent>
      <div class="row">
        <div class="col-md-11">
          <search-bar placeholder="请输入项目名称、招标代理机构、或招标人进行搜索" @search="search" v-show="simpleSearch"></search-bar>
        </div>
        <div class="col-md-10 replace" v-show="!simpleSearch"></div>
        <div class="col-md-1 higher-search f-r">
          <button class="btn my-btn draft-btn" type="button" @click="showHigherSearch()">
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
          <label class="checkbox-inline">
            <input type="checkbox" name="filterState" value="3" v-model="filterState"> 已中标
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" name="filterState" value="2" v-model="filterState"> 已入围
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" name="filterState" value="1" v-model="filterState"> 已摘牌
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" name="filterState" value="0" v-model="filterState"> 未摘牌
          </label>
        </div>
      </div>
      <div class="row check-pl">
        <label class="ta-l">所属类型</label>
        <div class="check-box search-checkbox">
          <label class="checkbox-inline">
            <input type="checkbox" name="officeList" value="kjs" v-model="officeList"> 会计所
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" name="officeList" value="pgs" v-model="officeList"> 评估所
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" name="officeList" value="sws" v-model="officeList"> 税务所
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" name="officeList" value="zjs" v-model="officeList"> 造价所
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
    <div class="com-list list-group">
      <li class="list-group-item list-head">
        <span class="title">信息详情</span>
        <span class="date pull-right">创建时间</span>
      </li>
      <a class="list-group-item" @click="checkMessage(project)" v-for="project in biddingArray">
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
    <my-pagination :iniTotalPage="totalPage" :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
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
      bidStartDate: '',
      bidEndDate: '',
      filterState: [],
      inputBtn: false,
      higherSearch: false,
      searchDown: true,
      searchUp: false,
      simpleSearch: true,
      bidArray: [], //是数组不是对象
      user: {},
      searchContent: '',
      officeList: [],
      officeListTrans: '',
      totalPage: '',
      pageNum: 1,
      totalNum: 1,
      listType: 'get',
      projectName: '',
      tenderPerson: '',
      agency: '',
    };
  },
  computed: {
    biddingArray() {
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
      this.bidArrayConnect = this.bidArrayConnect.map((item, index, array) => {
        let openBidDateStr = item.openBidDate.replace("T"," ");
        item.openBidDate = openBidDateStr;
        return item;
      });
      return this.bidArrayConnect;
    }
  },
  methods: {
    input() {
      this.$router.push('/bid-info-input/');
    },
    checkMessage(project) {
      this.$router.push('/bid-info-detail/' + project.id + "&notDraft");
    },
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
          this.bidArray = rep.data.data.businessArray;
          this.totalPage = rep.data.data.pageNum;
          this.totalNum = rep.data.data.totalNum;
        }
      }, (rep) => { });
    },
    higherSearchEvent() {
      this.listType = 'higherSearch';
      var departmentSort = [];
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
              projectStatus: this.filterState.toString()
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.bidArray = [];
          this.bidArray = rep.data.data.businessArray;
          this.totalPage = rep.data.data.pageNum;
          this.totalNum = rep.data.data.totalNum;
        }
      }, (rep) => { });
    },
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
    showInputBtn() {
      if (this.user.department === "市场部") {
        this.inputBtn = true;
      }
    },
    getAllList() {
      this.listType = 'get';
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
            this.totalPage = rep.data.data.pageNum;
            this.totalNum = rep.data.data.totalNum;
            resolve('done');
          }
        }, (rep) => { });
      });
      return pro;
    },
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
