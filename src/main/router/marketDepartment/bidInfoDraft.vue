<template>
	<div class="main">
    <!--面包屑导航-->
		<crumbs :paths="paths"></crumbs>
		<card>
			<h3 class="main-title">
			  草稿箱
			    <button class="btn my-btn submit-btn pull-right f-r" v-if="!delShow" @click="del">
			      删除草稿箱
			    </button>
			    <template v-else>
			    	<button class="btn my-btn draft-btn pull-right f-r" @click="cancel">
			    	  取消
			    	</button>
			    	<button class="btn my-btn cancel-btn pull-right f-r" @click="delConfirm">
			    	  删除
			    	</button>
			    </template> 
			</h3>
			<table class="table table-inner table-hover table-list">
			  <thead>
			    <tr>
			      <th class="text-center">招投标名称</th>
			      <th class="text-center">分管公司</th>
			      <th class="text-center">最新修改时间</th>
			      <th class="text-center" v-if="delShow">
			      	<input type="checkbox" name="all" value="all" v-model="checkAll">
			      	<label for="all">全选</label>
			      </th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr v-for="(project,index) in unfinishedList"
			        :key="index" @click.prevent="mod(project)">
			      <td class="text-center link-wrap">{{project.biddingName}}</td>
			      <td class="text-center">分管公司？？</td>
			      <td class="text-center">{{ project.updateAt }}</td>
			      <td class="text-center" v-if="delShow" @click.stop>
			      	<input type="checkbox" :value="project.id" v-model="checkedProjects">
			      </td>
			    </tr>
			  </tbody>
			</table>
			<modal v-if="delModal">
				<p slot="body">您确定要删除选择的招投标信息吗</p>
				<div slot="footer">
					<button class="btn my-btn cancel-btn" @click="delBiddingInfo">确定</button>
					<button class="btn my-btn draft-btn" @click="cancelDel">取消</button>
				</div>
			</modal>
      <!-- <div class="com-list list-group">
        <li class="list-group-item list-head">
          <span class="title">信息详情</span>
          <span class="date pull-right">最后保存时间</span>
        </li>
        <a class="list-group-item" @click="checkMessage(project)" v-for="project in unfinishedList">
          <span class="project-name">{{project.biddingName}}</span>
          <span class="date pull-right">{{ project.updateAt }}</span>
        </a>
      </div> -->
			<my-pagination :totalNum="totalNum" @currentChange="currentChange"></my-pagination>
		</card>
	</div>
</template>

<script>
import modal from '@/main/component/modal.vue';
import axios from 'axios';
import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import myPagination from '../../component/pagination.vue';

export default {
	name: 'bidInfoDraft',
	data() {
		return {
			paths: [
	    	{ name: '草稿箱', url: '/bid-info-draft', present: true }
	  	],
  		unfinishedList: [],
  		pageNum: 1,
      totalNum: 1,
      checkedProjects: [],
      allProjects: [],
      checkAll: false,
      delShow: false,
      delModal: false
		}
	},
	watch: {
		checkAll: function (val, oldVal) {
			if (val !== oldVal) {
				if (val) {
					this.checkedProjects = this.allProjects
				} else if (this.checkedProjects.length === this.allProjects.length) {
					this.checkedProjects = []
				}
			}
		},
		checkedProjects: function (val, oldVal) {
			if (val !== oldVal) {
				if (val.length !== this.allProjects.length) {
					this.checkAll = false
				}
			}
		}
	},
	methods: {
		delConfirm () {
      this.delModal = true;
		},
		cancelDel () {
			this.delModal = false;
		},
		cancel () {
			this.delShow = false;
		},
    del () {
      this.delShow = true;
    },
    mod(project) {
      this.$router.push('/bid-info-detail/'+project.id+"&isDraft")
    },
    //获取列表
		getList() {
			axios({
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			  method: 'get',
			  url: '/service',
			  params: {
			    data: (() => {
			      let obj = {
			        command: 'getBiddingList',
			        platform: 'web',
			        type: 'temp',
			        pageNum: this.pageNum
			      }
			      return JSON.stringify(obj);
			    })()
			  }
			}).then((rep) => {
	    		if (rep.data.statusCode === '10001') {
					this.unfinishedList = rep.data.data.businessArray;
					this.allProjects = []
					this.unfinishedList.forEach((item) => {
						this.allProjects.push(item.id)
					})
          this.totalPage = rep.data.data.pageNum;
          this.totalNum = rep.data.data.totalNum;
	    		}
	  		}, (rep) => {});
		},
		//删除草稿箱
		delBiddingInfo() {
			axios({
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			  method: 'get',
			  url: '/service',
			  params: {
			    data: (() => {
			      let obj = {
			        command: 'delBiddingInfo',
			        platform: 'web',
			        id: this.checkedProjects
			      }
			      return JSON.stringify(obj);
			    })()
			  }
			}).then((rep) => {
	    		if (rep.data.statusCode === '10001') {
		    		this.delModal = false;
						this.delShow = false;
						getList();
	    		}
	  		}, (rep) => {});
		},
    //分页功能
		currentChange(val) {
			this.pageNum = val;
			this.getList();
		}
  //   //获取信息细节
		// checkMessage(project) {
		// 	this.$router.push('/bid-info-detail/'+project.id+"&isDraft");
		// }
	},
	created() {
		this.getList();
		this.delBiddingInfo()
	},
	components: {
		crumbs,
		card,
		myPagination,
		modal
	}
}
</script>

<style lang="sass" scoped>
	table {
		thead {
			tr {
				th{
					label {
						margin-bottom: 0;
					}
					input {
						margin-top: 0;
					}
				}
			}
		}
	}   
  .pull-right {
  	margin-right: 30px;
  }
  .text-center {
  	text-align: left;
  }
  .dateMr {
  	padding-right: 32px;
  }
  table {
  	tbody {
  		tr {
  			cursor: pointer;
  		}
  	}
  }
  .com-list {
    a {
      cursor: pointer;
    }
  }
</style>
