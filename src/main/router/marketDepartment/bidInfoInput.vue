<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <bid-info-edit :iniProject="project"
                     inputType="录入"
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
  name: 'bidInfoInput',
  data() {
    return {
      paths: [
        { name: '招投标信息看板', url: '/bid-info-list', present: false },
        { name: '招投标信息录入', url: '/bid-info-input', present: true }
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
          this.draftSussessShow = true;
        }
      }, (rep) => { });
    },

    delBasicFee(index) {
      this.project.contractType.subBasicArray.splice(index, 1);
    },
    addBasicFee() {
      this.project.contractType.subBasicArray.push({ "name": '', "rate": 0 });
    },
    delEfficiencyFee(index) {
      this.project.contractType.subEfficiencyArray.splice(index, 1);
    },
    addEfficiencyFee() {
      this.project.contractType.subEfficiencyArray.push({ "name": '', "rate": 0 });
    },
    inputFinish() {
      this.$router.push('/bid-info-list');
    },
    draftFinish() {
      this.$router.push('/bid-info-draft');
    },
    quedingDelete(id) {
      this.$router.push('/bid-info-list');
    },
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
              type: 'add', //增加或编辑操作
              data: project
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        console.log(rep.data);
        if (rep.data.statusCode === '10001') {
          this.inputSussessShow = true;
        }
      }, (rep) => { });
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
