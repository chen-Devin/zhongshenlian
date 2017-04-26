<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
			<bid-info-edit :iniProject="project" :office="office" @submit="submit" @saveDraft="saveDraft" @delBasicFee="delBasicFee" @addBasicFee="addBasicFee" @delEfficiencyFee="delEfficiencyFee" @addEfficiencyFee="addEfficiencyFee"></bid-info-edit>
		</card>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidInfoEdit from './component/bidInfoEdit.vue';

export default {
    name: 'bidInfoInputKJS',
    data() {
    	return {
			paths: [
	    		{name: '招投标信息看板', url: '/bid-info-list/accounting', present: false},
	    		{name: '会计所招投标信息录入', url: '/bid-info-input-kjs', present: true}
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
	  			}
	  		},
	  		office: "会计所",
	  		departmentType: 'kjs'
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
		              departmentType: 'kjs',
		              type: 'temp',
		              data: project
		            };
		            return JSON.stringify(obj);
		          })()
		        })
		    }).then((rep)=>{
			  if (rep.data.statusCode === '10001') {
			    alert('保存草稿成功');
			    //加一个弹出框，然后加一个跳转
			  }
			}, (rep)=>{});
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
			    alert('保存录入成功');
			    //加一个弹出框，然后加一个跳转
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
    	}
    },
    components: {
    	crumbs,
    	card,
    	bidInfoEdit
    }
}
</script>

<style lang="sass" scoped>

</style>