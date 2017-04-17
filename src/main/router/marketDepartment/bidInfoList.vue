<template>
	<div class="main">
		<crumbs v-bind:paths="paths"></crumbs>
		<card>
            <bid-classification :office="office"></bid-classification>
            <router-view :bidArray="biddingArray" @tellOffice="getOffice" @queryList="queryList"></router-view>
            <!-- <bid-info-list-body></bid-info-list-body> -->
		</card>
	</div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidClassification from './component/bidClassification.vue';
import bidInfoListBody from './bidInfoListBody.vue';

export default {
    name: 'bidInforListMarket',
    data() {
    	return {
    		paths: [
        		{name: '招投标信息看板', url: '/bid-infor-list-market', present: true}
      		],
      		checked: '',
      		searchContent: '',
      		bidStartDate1: '',
      		bidEndDate1: '',
      		checkedAttr: [],
      		bidArray: [],
      		checkedAttrArr: [],
      		businessArray: [{
				      			id:"0",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-15 23:31:19",
				      			biddingState:"中标状态，1表示中标，0表示未中",
				      			shortlistedState:"0", //已入围
				      			delipotentState:"0", //摘牌 
				      			reviewState:"3"
	      					},{
				      			id:"1",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-09 23:31:19",
				      			biddingState:"1",
				      			shortlistedState:"1",
				      			delipotentState:"1",
				      			reviewState:"1"
	      					},{
				      			id:"2",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-09 23:31:19",
				      			biddingState:"1",
				      			shortlistedState:"1",
				      			delipotentState:"1",
				      			reviewState:"1"
	      					},{
				      			id:"3",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-09 23:31:19",
				      			biddingState:"0",
				      			shortlistedState:"0",
				      			delipotentState:"0",
				      			reviewState:"3"
	      					},{
				      			id:"4",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-15 23:31:19",
				      			biddingState:"中标状态，1表示中标，0表示未中",
				      			shortlistedState:"0",
				      			delipotentState:"1",
				      			reviewState:"3"
	      					},{
				      			id:"5",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-15 23:31:19",
				      			biddingState:"中标状态，1表示中标，0表示未中",
				      			shortlistedState:"0",
				      			delipotentState:"1",
				      			reviewState:"0"
	      					},{
				      			id:"6",
				      			biddingName:"标名",
				      			uploadDate:"2017-04-03 23:31:19",
				      			endDate:"2017-04-15 23:31:19",
				      			biddingState:"0",
				      			shortlistedState:"1",
				      			delipotentState:"1",
				      			reviewState:"1"
	      					}],
            office: '',
            biddingArray: []
    	};
    },
    computed: {
    	bidStartDate() {
    		let str = this.bidStartDate1 + " 00:00:00";
    		return str;
    	},
    	bidEndDate() {
    		let str = this.bidEndDate1 + " 00:00:00";
    		return str;
    	}
    },
    created() {
      this.judgeDate();
      this.judgeShow();
      this.filterList();
      this.$watch('checkedAttr', function(newVal,oldVal){
      	if (newVal !== oldVal) {
      		this.filterList(newVal);
      	};
      });
    },
    methods: {
        getOffice(office) {
            console.log('office is' + office);
            this.office = office;
        },
    	search() {
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
    		        bidEndDate: this.bidEndDate
    		      }
    		      return JSON.stringify(obj);
    		    })()
    		  }
    		}).then((rep) => {
        		if (rep.data.statusCode === '10001') {
					this.businessArray = rep.data.data.businessArray;
					this.bidArray = this.businessArray;
        		}
      		}, (rep) => {});
    	},
    	getNowFormDate () {
    		var date = new Date();
    		var seperator1 = "-";
    		var seperator2 = ":";
    		var month = date.getMonth() + 1;
    		var strDate = date.getDate();
    		if (month>=1&&month<=9) {
    			month = "0" + month;
    		}
    		if (strDate>=1&&strDate<=9) {
    			strDate = "0" + strDate;
    		}
    		var currentDate = date.getFullYear() + seperator1 + month +seperator1 + strDate
    				+ " " + date.getHours() + seperator2 + date.getMinutes()
    				+ seperator2 + date.getSeconds();
    		return currentDate;
    	},
    	handleDate (dateString) {
    		let ymd = dateString.slice(0,10);
    		let ymdArr = ymd.split("-");
    		let year = ymdArr[0];
    		let month = ymdArr[1];
    		let date = ymdArr[2];
    		let ymdObj = {
    			year: year,
    			month: month,
    			date: date
    		};
    		return ymdObj;
    	},
    	judgeDate() {
    		var now = this.getNowFormDate();
    		var nowObj = this.handleDate(now);
    		for (let i = 0; i < this.businessArray.length; i++) {
    			if(this.businessArray[i].delipotentState === "0") {
    				 var endObj =  this.handleDate(this.businessArray[i].endDate);
    				 if (endObj.year < nowObj.year) {
    				 	//过期
    				 	this.businessArray[i].over = '是';
    				 } else if (endObj.year === nowObj.year) {
    				 	if (endObj.month < nowObj.month) {
    				 		this.businessArray[i].over = '是';
    				 	} else {
    				 		if (endObj.date < nowObj.date) {
    				 			this.businessArray[i].over = '是';
    				 		}
    				 	}
    				 }
    			}
    		}
    	},
    	judgeShow() {
    		for (var i = 0; i < this.businessArray.length; i++) {
    			if (this.businessArray[i].biddingState === "1") { //已中标
    				this.businessArray[i].showBade = 1;
    				this.businessArray[i].isZhongbiao = true;
    				this.businessArray[i].isRuwei = true;
    				this.businessArray[i].isShenPi = true;
    				this.businessArray[i].isZhaiPai = true;
    			} else {
    				if (this.businessArray[i].shortlistedState === "1") {
    					this.businessArray[i].showRuWei = 1; //已入围
    					this.businessArray[i].isRuwei = true;
	    				this.businessArray[i].isShenPi = true;
	    				this.businessArray[i].isZhaiPai = true;
    				} else {
    					if(this.businessArray[i].reviewState === "0"||this.businessArray[i].reviewState === "1") { //已审批
    						this.businessArray[i].showCheck = 1;
    						this.businessArray[i].isShenPi = true;
    						this.businessArray[i].isZhaiPai = true;
    					} else {
    						if (this.businessArray[i].delipotentState === "1") { //已摘牌
    							this.businessArray[i].showBrand = 1;
    							this.businessArray[i].isZhaiPai = true;
    						} else {
    							if (this.businessArray[i].over === '是') { //已过期
    								this.businessArray[i].showOver = 1;
    							} else {
    								this.businessArray[i].showTime = 1;
    							}
    						}
    					}
    				}		
    			}	
    		}
    	},
    	filterList(newVal) {
    		this.checkedAttrArr = [];
    		this.showBadeItem = false;
    		this.showRuWeiItem = false;
    		this.showBrandItem = false;
    		this.showNoBrandItem = false;
    		this.bidArray = this.businessArray;
    		if(newVal) {
    			this.checkedAttrArr = newVal;
    		}
    		this.bidArray = this.businessArray;
    		for (let i = 0; i < this.checkedAttrArr.length; i++) {
    			if(this.checkedAttrArr[i] == "ZhongBiao") {
    				this.showBadeItem = true;
    			} else {
    				if(this.checkedAttrArr[i] == "RuWei") {
    					this.showRuWeiItem = true;
    				}
    				else {
    					if(this.checkedAttrArr[i] == "ZhaiPai") {
    						this.showBrandItem = true;
    					}
    					else {
    						this.showNoBrandItem = true;
    					}
    				}
    			}
    		}
    		if (this.showBadeItem) {
    			this.bidArray = [];
    			for (let i = 0; i < this.businessArray.length; i++) {
    				if(this.businessArray[i].isZhongbiao) {
    					this.bidArray.push(this.businessArray[i]);
    				}
    			}
    		} else if (this.showRuWeiItem) {
				this.bidArray = [];
				for (let i = 0; i < this.businessArray.length; i++) {
					if(this.businessArray[i].isRuwei) {
						this.bidArray.push(this.businessArray[i]);
					}
				}
    		} else if (this.showBrandItem) {
    			this.bidArray = [];
    			for (let i = 0; i < this.businessArray.length; i++) {
    				if(this.businessArray[i].isZhaiPai) {
    					this.bidArray.push(this.businessArray[i]);
    				}
    			}
    		}
    		if(this.showNoBrandItem&&this.checkedAttr.length>1) {
    			this.bidArray = [];
    		}
    		if (this.showNoBrandItem&&this.checkedAttr.length===1) {
    			this.bidArray = [];
    			for (var i = 0; i < this.businessArray.length; i++) {
    				if(this.businessArray[i].delipotentState === "0") {
    					this.bidArray.push(this.businessArray[i]);
    				}
    			}
    		}
    	},
    	checkMessage(project) {
    		console.log(project);
    		this.$router.push('/bid-infor-detail');
    	},
        queryList(office) {
            if(office === "会计所") {
                this.biddingArray = [];
                axios({
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                  method: 'get',
                  url: '/service',
                  params: {
                    data: (() => {
                      let obj = {
                        command: 'getBiddingList',
                        platform: 'web',
                        type: 'kjs'
                      }
                      return JSON.stringify(obj);
                    })()
                  }
                }).then((rep) => {
                    if (rep.data.statusCode === '10001') {
                        this.biddingArray = rep.data.data.businessArray;
                    }
                    }, (rep) => {});
            }
            if(office === "评估所") {
                this.biddingArray = [];
                axios({
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                  method: 'get',
                  url: '/service',
                  params: {
                    data: (() => {
                      let obj = {
                        command: 'getBiddingList',
                        platform: 'web',
                        type: 'pgs'
                      }
                      return JSON.stringify(obj);
                    })()
                  }
                }).then((rep) => {
                    if (rep.data.statusCode === '10001') {
                        this.biddingArray = rep.data.data.businessArray;
                    }
                    }, (rep) => {});
            }
            if(office === "税务所") {
                this.biddingArray = [];
                axios({
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                  method: 'get',
                  url: '/service',
                  params: {
                    data: (() => {
                      let obj = {
                        command: 'getBiddingList',
                        platform: 'web',
                        type: 'sws'
                      }
                      return JSON.stringify(obj);
                    })()
                  }
                }).then((rep) => {
                    if (rep.data.statusCode === '10001') {
                        this.biddingArray = rep.data.data.businessArray;
                    }
                    }, (rep) => {});
            }
            if(office === "造价所") {
                this.biddingArray = [];
                axios({
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                  method: 'get',
                  url: '/service',
                  params: {
                    data: (() => {
                      let obj = {
                        command: 'getBiddingList',
                        platform: 'web',
                        type: 'zjs'
                      }
                      return JSON.stringify(obj);
                    })()
                  }
                }).then((rep) => {
                    if (rep.data.statusCode === '10001') {
                        this.biddingArray = rep.data.data.businessArray;
                    }
                    }, (rep) => {});
            }
        }
    },
    components: {
    	crumbs,
    	card,
        bidClassification,
        bidInfoListBody
    }
}
</script>

<style lang="sass">

/*.main {
	position: relative;
	.bid-time {
		padding: 8px 10px 8px 10px;
		margin: 10px 0 10px 0;
		background-color: #E4E4E4;
		display: inline-block;

	}
	.keyword-btn {
		input {
			width: 100%;
		}
		input::-ms-input-placeholder{text-align: center;}
		input::-webkit-input-placeholder{text-align: center;}
	}
	.type-btn {
		position: absolute;
		top: 90px;
		right: 30px;
	}
	.projectList {
		background-color: #eee;
		width: 95%;
		tr {
			td {
				text-align: center;
			}
			.blank {
				width:50%;
			}
		}
		tbody {
			tr {
				cursor: pointer;
			}
		}
	}
}*/
</style>
