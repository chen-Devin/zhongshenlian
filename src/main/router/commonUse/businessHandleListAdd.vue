<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h3 class="main-title">
        进行中项目
          <search-bar  class="f-r" :searchItems="searchItems" @search="search"></search-bar>
      </h3>
      <table class="table table-bordered table-hover table-list">
        <thead>
          <tr>
            <th class="text-center">项目名称</th>
            <th class="text-center">项目经理</th>
            <th class="text-center">立项时间</th>
            <th class="text-center">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(business, index) in businesses"
              :key="index"
              @click.prevent="mod(business)">
            <td class="text-center link-wrap">{{business.projectName}}</td>
            <td class="text-center">{{business.projectManager}}</td>
            <td class="text-center">{{business.startTime}}</td>
            <td class="text-center">
              <template v-if="checkShow">
                <span class="label label-warning"
                      v-if="business.projectStatus<130">未复审</span>
                <span class="label label-info"
                      v-else-if="business.projectStatus===130">待复审</span>
                <span class="label label-danger"
                      v-else-if="business.projectStatus===131">未通过</span>
                <span class="label label-success"
                      v-else-if="business.projectStatus===140">已通过</span>
                <span class="label label-primary"
                      v-else-if="business.projectStatus===150">已上传二维码</span>
                <span class="label label-default"
                      v-else-if="business.projectStatus===180">已完成</span>
              </template>
              <template v-if="billShow">
                <span class="label label-warning"
                      v-if="business.billState===0">未完成开票</span>
                <span class="label label-success"
                      v-else-if="business.billState===1">已完成开票</span>
              </template> 
            </td>
          </tr>
        </tbody>
      </table>
      <p class="empty-list-p" v-if="businesses.length === 0">暂无数据</p>
      <my-pagination 
        :iniTotalPage="totalPage" 
        :totalNum="totalNum" 
        @currentChange="currentChange"
        v-if="reloadPagination"></my-pagination>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import searchBar from '@/main/component/searchBar.vue';
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import myPagination from '@/main/component/pagination.vue';

export default {
  name: 'businessHandleListAdd',
  data() {
    return {
      paths: [
        { name: '进行中项目', url: '/business-handle-list-sales', present: true }
      ],
      businesses: [],
      totalNum: 1,
      searchItems: [
        {
          label: '项目名称',
          value: 'projectName'
        }
      ],
      pageNum: 1,
      searchObj: {},
      reloadPagination: true
    };
  },
  created() {
    this.getOnGogingProjectByPerson()
  },
  methods: {
    mod(BUSINESS) {
      this.$router.push('/business-handle-detail-' + this.$route.params.department + '-' +BUSINESS.id)
    },
  	getOnGogingProjectByPerson () {
  	  return new Promise((resolve, reject) => {
  	    axios({
  	      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  	      method: 'get',
  	      url: '/service',
  	      params: {
  	        data: (() => {
  	          let obj = {
  	            command: 'getOnGogingProjectByPerson',
  	            platform: 'web',
  	            pageNum: this.pageNum
  	          }
  	          Object.assign(obj, this.searchObj)
  	          return JSON.stringify(obj);
  	        })()
  	      }
  	    }).then((rep) => {
  	      if (rep.data.statusCode === '10001') {
  	        this.businesses = rep.data.data.businessArray
  	        this.totalNum = parseInt(rep.data.data.totalNum)
  	        resolve('done');
  	      }
  	    }, (rep) => { });
  	  })
  	},
    search (obj) {
      this.searchObj = {}
      this.searchObj = obj
      this.pageNum = 1
      this.reloadPagination = false
      setTimeout(() => {
        this.reloadPagination = true
      }, 500)
      this.getOnGogingProjectByPerson()
    },
    currentChange(val) {
      this.pageNum = val
      this.getOnGogingProjectByPerson()
    }
  },
  components: {
    crumbs,
    card,
    searchBar,
    myPagination
  }
};
</script>

<style lang="sass" scoped>
.text-center {
  text-align: left; 
}
.pull-right {
  margin-right: 30px;
}
.higher-search {
  margin-top: 30px;
}
.search-form {
  padding-left: 0;
  padding-right: 0;
}
</style>
