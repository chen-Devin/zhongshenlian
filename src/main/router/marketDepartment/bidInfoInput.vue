<template>
  <div class="main">
    <!--面包屑导航-->
    <crumbs :paths="paths"></crumbs>
    <card>
      <!--招投标信息编辑子组件-->
      <bid-info-edit :iniProject="project"
                     inputType="录入"
                     @submit="submit"
                     @saveDraft="saveDraft"
                     @delBasicFee="delBasicFee"
                     @addBasicFee="addBasicFee"
                     @delEfficiencyFee="delEfficiencyFee"
                     @addEfficiencyFee="addEfficiencyFee"
                     @quedingDelete="quedingDelete"></bid-info-edit>
    </card>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidInfoEdit from './component/bidInfoEdit.vue';

Vue.prototype.$message = Message;

export default {
  name: 'bidInfoInput',
  data() {
    return {
      paths: [
        { name: '招投标信息看板', url: '/bid-info-list', present: false },
        { name: '招投标信息录入', url: '/bid-info-input', present: true }
      ],
      project: {  //招投标项目详细信息
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
          let dateStr = year + "-" + month + "-" + date + "T08:30";
          return dateStr;
        })(),
        contractType: {
          mainBasicRate: 0,
          mainEfficiencyRate: 0,
          subBasicArray: [{ "name": '', "rate": 0 }],
          subEfficiencyArray: [{ "name": '', "rate": 0 }]
        },
        kjsBiddingContent: [],
        pgsBiddingContent: [],
        swsBiddingContent: [],
        zjsBiddingContent: [],
        zjsFundSource: [],
        tenderValidityPeriod: '60',
        departmentType: []
      },
      draftSussessShow: false,
      inputSussessShow: false
    }
  },
  methods: {
    //保存为草稿
    saveDraft(project) {
      var departmentSort = [];
      for (var i = 0; i < project.departmentType.length; i++) {
        if(project.departmentType[i] === 'kjs') {
            departmentSort.push('kjs');
        }
      }
      for (var i = 0; i < project.departmentType.length; i++) {
        if(project.departmentType[i] === 'pgs') {
            departmentSort.push('pgs');
        }
      }
      for (var i = 0; i < project.departmentType.length; i++) {
        if(project.departmentType[i] === 'sws') {
            departmentSort.push('sws');
        }
      }
      for (var i = 0; i < project.departmentType.length; i++) {
        if(project.departmentType[i] === 'zjs') {
            departmentSort.push('zjs');
        }
      }
      project.departmentType = departmentSort;
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'addOrEditBiddingInfo',
              platform: 'web',
              type: 'temp',
              data: project
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.$message.success('保存草稿成功');
          this.$router.push('/bid-info-draft');
        }
      }, (rep) => { });
    },
    //用splice()方法删除数组中相应的元素
    delBasicFee(index) {
      this.project.contractType.subBasicArray.splice(index, 1);
    },
    //增加一条基本取费，用push()方法
    addBasicFee() {
      this.project.contractType.subBasicArray.push({ "name": '', "rate": 0 });
    },
    //删除一条效益取费
    delEfficiencyFee(index) {
      this.project.contractType.subEfficiencyArray.splice(index, 1);
    },
    //增加一条基本取费
    addEfficiencyFee() {
      this.project.contractType.subEfficiencyArray.push({ "name": '', "rate": 0 });
    },
    //撤销保存
    quedingDelete(id) {
      this.$router.push('/bid-info-list');
    },
    //提交
    submit(project) {
      var departmentSort = [];
      for (var i = 0; i < project.departmentType.length; i++) {
        if(project.departmentType[i] === 'kjs') {
            departmentSort.push('kjs');
        }
      }
      for (var i = 0; i < project.departmentType.length; i++) {
        if(project.departmentType[i] === 'pgs') {
            departmentSort.push('pgs');
        }
      }
      for (var i = 0; i < project.departmentType.length; i++) {
        if(project.departmentType[i] === 'sws') {
            departmentSort.push('sws');
        }
      }
      for (var i = 0; i < project.departmentType.length; i++) {
        if(project.departmentType[i] === 'zjs') {
            departmentSort.push('zjs');
        }
      }
      project.departmentType = departmentSort;
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
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
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.$message.success('保存信息成功');
          this.$router.push('/bid-info-list');
        }
      }, (rep) => { });
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
	.icon {
		vertical-align: middle;
		color: #efa844;
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
