<template>
  <div>
    <form class="form-inline" @submit.prevent @keyup.enter.prevent>
      <div class="row">
        <div class="form-group col-xs-12">
          <input type="text" class="form-control name-input" placeholder="请输入项目名称、招标代理机构、或招标人进行搜索" v-model.trim="searchContent">
          <button type="submit" class="btn btn-primary f-r" @click="search()">搜索</button>
        </div>
      </div>
      <div class="row">
        <div class="form-group timeWidth">
          <label>招标时间</label>
          <input type="date" class="form-control" v-model="bidStartDate">
          <span>-</span>
          <input type="date" class="form-control" v-model="bidEndDate">
        </div>
      </div>
    </form>
    <div class="row">
      <p class="col-xs-12 check-wrap">
        <label class="radio-inline">
          <input type="radio" name="filterState" value="已中标" v-model="filterState"> 已中标
        </label>
        <label class="radio-inline">
          <input type="radio" name="filterState" value="已入围" v-model="filterState"> 已入围
        </label>
        <label class="radio-inline">
          <input type="radio" name="filterState" value="已摘牌" v-model="filterState"> 已摘牌
        </label>
        <label class="radio-inline">
          <input type="radio" name="filterState" value="未摘牌" v-model="filterState"> 未摘牌
        </label>
        <!-- <button class="btn btn-primary type-btn f-r" @click="input()" v-if="inputBtn">录入</button> -->
      </p>
    </div>
    <div class="row">
      <p class="col-xs-12 check-wrap">
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
        <button class="btn btn-primary type-btn f-r" @click="input()" v-if="inputBtn">录入</button>
      </p>
    </div>
    <table class="table table-hover projectList">
      <thead>
        <tr>
          <td>项目名称</td>
          <td class="ta-r dateMr">开标时间</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in biddingArray" @click="checkMessage(project)">
          <td>
            <span class="state-wrap">{{project.biddingState}}</span>{{project.biddingName}}</td>
          <td class="ta-r">
            {{project.openBidDate}}
          </td>
        </tr>
      </tbody>
    </table>
    <my-pagination :iniTotalPage="totalPage" @currentChange="currentChange"></my-pagination>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Select } from 'element-ui';
import { Option } from 'element-ui';
import myPagination from '../../component/pagination.vue';

Vue.use(Select);
Vue.use(Option);

export default {
  name: 'bidInfoListBody',
  data() {
    return {
      bidStartDate: (() => {
        let dt = new Date();
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let date = dt.getDate();
        if (date < 10) {
          date = "0" + date;
        }
        let dateStr = year + "-" + month + "-" + date;
        return dateStr;
      })(),
      bidEndDate: (() => {
        let dt = new Date();
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let date = dt.getDate();
        if (date < 10) {
          date = "0" + date;
        }
        let dateStr = year + "-" + month + "-" + date;
        return dateStr;
      })(),
      filterState: '',
      inputBtn: false,
      bidArray: [], //是数组不是对象
      user: {},
      searchContent: '',
      officeList: [],
      totalPage: '',
      pageNum: 1,
      listType: 'get'
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
      if (this.filterState === "未摘牌") {
        this.bidArrayConnect = this.bidArrayConnect.filter((item, index, array) => {
          return item.biddingState === "未摘牌";
        })
      }
      if (this.filterState === "已摘牌") {
        this.bidArrayConnect = this.bidArrayConnect.filter((item, index, array) => {
          return item.biddingState === "已摘牌";
        })
      }
      if (this.filterState === "已中标") {
        this.bidArrayConnect = this.bidArrayConnect.filter((item, index, array) => {
          return item.biddingState === "已中标";
        })
      }
      if (this.filterState === "已入围") {
        this.bidArrayConnect = this.bidArrayConnect.filter((item, index, array) => {
          return item.biddingState === "已入围";
        })
      }
      for (var i = 0; i < this.officeList.length; i++) {
        this.bidArrayConnect = this.bidArrayConnect.filter((item, index, array) => {
          let isContain = item.departmentType.some((jtem, index, array) => {
            return jtem === this.officeList[i];
          })
          return isContain;
        });
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
    search() {
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
              searchContent: this.searchContent,
              bidStartDate: '',
              bidEndDate: '',
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
        }
      }, (rep) => { });
    },
    searchTime() {
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
              searchContent: this.searchContent,
              bidStartDate: this.bidStartDate,
              bidEndDate: this.bidEndDate,
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
        }
      }, (rep) => { });
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
      }

    }
  },
  components: {
    axios,
    qs,
    myPagination
  },
  watch: {
    bidStartDate(curVal, oldVal) {
      if (curVal !== oldVal) {
        this.searchTime();
      }
    },
    bidEndDate(curVal, oldVal) {
      if (curVal !== oldVal) {
        this.searchTime();
      }
    }
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
.dateMr {
	padding-right: 35px;
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
.state-wrap {
	display: inline-block;
	background-color: #fff;
	border: 1px solid #000;
	margin-right: 5px;
	padding: 1px 3px;
	font-size: 11px;
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
	width: 815px;
  text-align: center;
}
.left-move {
	margin-left: 10px;
}
input::-ms-input-placeholder{text-align: center;}
input::-webkit-input-placeholder{text-align: center;}
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
</style>
