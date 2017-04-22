<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
            <bid-classification :office="office"></bid-classification>
            <router-view :bidArray="biddingArray" @tellOffice="getOffice" @queryList="queryList" @checkMessage="checkMessage"></router-view>
            <!-- <bid-info-list-body></bid-info-list-body> -->
		</card>
	</div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';
import bus from '../../bus.js';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidClassification from './component/bidClassification.vue';
import bidInfoListBody from './bidInfoListBody.vue';

export default {
    name: 'bidInforListMarket',
    data() {
    	return {
    		paths: [
        		{name: '招投标信息看板', url: '/bid-info-list', present: true}
      		],
      		checked: '',
      		searchContent: '',
      		bidStartDate1: '',
      		bidEndDate1: '',
      		checkedAttr: [],
      		bidArray: [],
      		checkedAttrArr: [],
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
    	checkMessage(project,office) {
            console.log("是：" + office);
            if (office === "会计所") {
                office = "kjs"
            }
            if (office === "评估所") {
                office = "pgs"
            }
            if (office === "税务所") {
                office = "sws"
            }
            if (office === "造价所") {
                office = "zjs"
            }
    		this.$router.push('/bid-info-detail/'+project.id+"&"+office);
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
