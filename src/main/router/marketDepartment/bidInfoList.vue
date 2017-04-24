<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
            <bid-classification :office="office"></bid-classification>
            <router-view :bidArray="biddingArray" @tellOffice="getOffice" @queryList="queryList" @checkMessage="checkMessage"></router-view>
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
    name: 'bidInfoList',
    data() {
    	return {
    		paths: [
        		{name: '招投标信息看板', url: '/bid-info-list', present: true}
      		],
      		checked: '',
      		searchContent: '',
      		bidStartDate1: '',
      		bidEndDate1: '',
      		bidArray: [],
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
      this.$watch('checkedAttr', function(newVal,oldVal){
      	if (newVal !== oldVal) {
      		this.filterList(newVal);
      	};
      });
    },
    methods: {
        getOffice(office) {
            this.office = office;
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
                        departmentType: 'kjs',
                        type: 'other'
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
                        departmentType: 'pgs',
                        type: 'other'
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
                        departmentType: 'sws',
                        type: 'other'
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
                        departmentType: 'zjs',
                        type: 'other'
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
