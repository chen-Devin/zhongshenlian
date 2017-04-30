<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
			<bid-info-edit 
			:iniProject="project" 
			:office="office" 
			@submit="submit" 
			@saveDraft="saveDraft" 
			@delBasicFee="delBasicFee" 
			@addBasicFee="addBasicFee" 
			@delEfficiencyFee="delEfficiencyFee" 
			@addEfficiencyFee="addEfficiencyFee"
			@quedingDelete="quedingDelete"></bid-info-edit>
			<modal v-show="inputSussessShow">
				<p slot="body" class="ta-c cancel-word">
					<i class="fa fa-check-circle fa-3x icon" aria-hidden="true"></i>
					保存信息成功
				</p>
				<p slot="footer">
					<button class="btn btn-primary" @click="inputFinish()">完成</button>
				</p>
			</modal>
			<modal v-show="draftSussessShow">
				<p slot="body" class="ta-c cancel-word">
					<i class="fa fa-check-circle fa-3x icon" aria-hidden="true"></i>
					保存草稿成功
				</p>
				<p slot="footer">
					<button class="btn btn-primary" @click="draftFinish()">完成</button>
				</p>
			</modal>
		</card>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidInfoEdit from './component/bidInfoEdit.vue';
import modal from '../../component/modal.vue'

export default {
    name: 'bidInfoInputZJS',
    data() {
    	return {
			paths: [
	    		{name: '招投标信息看板', url: '/bid-info-list/zjs', present: false},
	    		{name: '造价所招投标信息录入', url: '/bid-info-input-zjs', present: true}
	  		],
	  		project: {
	  			bidStartTime: (() => {
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
	  			openBidDate: (() => {
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
	  			contractType: {
	  				mainBasicRate: 0,
	  				mainEfficiencyRate: 0,
	  				subBasicArray: [{"name":'',"rate": 0}],
	  				subEfficiencyArray: [{"name":'',"rate": 0}]
	  			},
	  			biddingContent: [],
	  			zjsOwnershipStructure: '',
	  			tenderValidityPeriod: '60'
	  		},
	  		office: "造价所",
	  		departmentType: 'zjs',
	  		draftSussessShow: false,
	  		inputSussessShow: false
    	}
    },
    methods: {
    	saveDraft(project) {
    		project.departmentType = this.departmentType;
		    axios({
		        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		        method: 'post',
		        url: '/service',
		        data: qs.stringify({
		          data: (() => {
		            var obj = {
		              command: 'addOrEditBiddingInfo',
		              platform: 'web',
		              departmentType: 'zjs',
		              type: 'temp',
		              data: project
		            };
		            return JSON.stringify(obj);
		          })()
		        })
		    }).then((rep)=>{
			  if (rep.data.statusCode === '10001') {
			    this.draftSussessShow = true;
			  }
			}, (rep)=>{});
    	},
    	
    	delBasicFee(index) {
    		this.project.contractType.subBasicArray.splice(index,1);
    	},
    	addBasicFee() {
    		this.project.contractType.subBasicArray.push({"name":'',"rate": 0});
    	},
    	delEfficiencyFee(index) {
    		this.project.contractType.subEfficiencyArray.splice(index,1);
    	},
    	addEfficiencyFee() {
    		this.project.contractType.subEfficiencyArray.push({"name":'',"rate": 0});
    	},
    	inputFinish() {
    		this.$router.push('/bid-info-list/zjs');
    	},
    	draftFinish() {
    		//close
    		this.$router.push('/bid-info-draft');
    	},
    	quedingDelete(id) {
    		this.$router.push('/bid-info-list/zjs');
    	},
    	submit(project) {
    	    project.departmentType = this.departmentType;
    	    axios({
    	        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    	        method: 'post',
    	        url: '/service',
    	        data: qs.stringify({
    	          data: (() => {
    	            var obj = {
    	              command: 'addOrEditBiddingInfo',
    	              platform: 'web',
    	              type: 'add',
    	              data: project
    	            };
    	            return JSON.stringify(obj);
    	          })()
    	        })
    	    }).then((rep)=>{
    	        console.log(rep.data);
    	      if (rep.data.statusCode === '10001') {
    	        this.inputSussessShow = true;
    	        //加一个弹出框，然后加一个跳转
    	      }
    	    }, (rep)=>{});
    	}
    },
    components: {
    	crumbs,
    	card,
    	bidInfoEdit,
    	modal
    }
}
</script>

<style lang="sass" scoped>
	.icon {
		vertical-align: middle;
		color: #EFA844;
		margin-right: 10px;
		margin-bottom: -10px;
	}
	.ta-c {
		text-align: center;
	}
	.cancel-word {
		margin: 0;
	}
	.text-danger {
		text-decoration: none;
		cursor: pointer;
	}
</style>