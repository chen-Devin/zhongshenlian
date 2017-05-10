<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <bid-info-check @isEdit="isEdit" v-if="checkShow"></bid-info-check>
      <bid-info-edit :iniProject="project"
                     :isTempDetail="isTempDetail"
                     inputType="编辑"
                     @submit="submit"
                     @saveDraft="saveDraft"
                     @delBasicFee="delBasicFee"
                     @addBasicFee="addBasicFee"
                     @delEfficiencyFee="delEfficiencyFee"
                     @addEfficiencyFee="addEfficiencyFee"
                     @quedingDelete="quedingDelete"
                     v-if="editShow"></bid-info-edit>
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
      <modal v-show="deleteSussessShow">
        <p slot="body" class="ta-c cancel-word">
          <i class="fa fa-check-circle fa-3x icon" aria-hidden="true"></i>
          撤销成功，已删除项目
        </p>
        <p slot="footer">
          <button class="btn btn-primary" @click="deleteFinish()">完成</button>
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
import bidInfoCheck from './component/bidInfoCheck.vue';
import bidInfoEdit from './component/bidInfoEdit.vue';
import modal from '../../component/modal.vue'

export default {
  name: 'bidInfoDetail',
  data() {
    return {
      paths: [
        // {name: '招投标信息看板', url: '/bid-info-list', present: false},
        // {name: '招投标详情', url: '/bid-info-detail', present: true}
      ],
      project: {},
      iniProject: {},
      editShow: false,
      checkShow: true,
      id: '',
      isDraft: '',
      draftSussessShow: false,
      inputSussessShow: false,
      deleteSussessShow: false
    }
  },
  // computed() {

    // },
    methods: {
    	getInfo() {
    		axios({
    		  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    		  method: 'get',
    		  url: '/service',
    		  params: {
    		    data: (() => {
    		      let obj = {
    		        command: 'getBiddingInfo',
    		        platform: 'web',
    		        id: this.$route.params.id
    		      }
    		      return JSON.stringify(obj);
    		    })()
    		  }
    		}).then((rep) => {
        		if (rep.data.statusCode === '10001') {
					this.project = rep.data.data;
					this.iniProject = this.project;
        		}
      		}, (rep) => {});
    	},
    	isEdit() {
    		this.editShow = true;
    		this.checkShow = false;
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
                      type: 'edit',
                      data: project
                    };
                    return JSON.stringify(obj);
                  })()
                })
            }).then((rep)=>{
              if (rep.data.statusCode === '10001') {
                this.inputSussessShow = true;
                //加一个弹出框，然后加一个跳转
              }
            }, (rep)=>{});
        },
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
        quedingDelete(id) {
            axios({
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                method: 'post',
                url: '/service',
                data: qs.stringify({
                  data: (() => {
                    var obj = {
                      command: 'delBiddingInfo',
                      platform: 'web',
                      id: this.id
                    };
                    return JSON.stringify(obj);
                  })()
                })
            }).then((rep)=>{
              if (rep.data.statusCode === '10001') {
                this.deleteSussessShow = true;
              }
            }, (rep)=>{});
        },
        deleteFinish() {
            this.$router.push('/bid-info-list');
        },
        inputFinish() {
            this.$router.push('/bid-info-list');
        },
        draftFinish() {
            //close
            this.$router.push('/bid-info-draft');
        },
        definePath() {
            if (this.isDraft === "isDraft") {
                this.paths = [
                    {name: '草稿箱', url: '/bid-info-draft', present: false},
                    {name: '招投标详情', url: '/bid-info-detail', present: true}
                ]
            }
            if (this.isDraft === "notDraft") {
                this.paths = [
                    {name: '招投标信息看板', url: '/bid-info-list', present: false},
                    {name: '招投标详情', url: '/bid-info-detail', present: true}
                ]
  // },
  methods: {
    getInfo() {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        method: 'get',
        url: '/service',
        params: {
          data: (() => {
            let obj = {
              command: 'getBiddingInfo',
              platform: 'web',
              id: this.$route.params.id
            }
            return JSON.stringify(obj);
          })()
        }
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.project = rep.data.data;
          this.iniProject = this.project;
        }
      }, (rep) => { });
    },
    isEdit() {
      this.editShow = true;
      this.checkShow = false;
    },
    submit(project) {
      project.departmentType = this.departmentType;
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'addOrEditBiddingInfo',
              platform: 'web',
              type: 'edit',
              data: project
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        console.log(rep.data);
        if (rep.data.statusCode === '10001') {
          this.inputSussessShow = true;
          //加一个弹出框，然后加一个跳转
        }
      }, (rep) => { });
    },
    saveDraft(project) {
      project.departmentType = this.departmentType;
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
    quedingDelete(id) {
      axios({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'post',
        url: '/service',
        data: qs.stringify({
          data: (() => {
            var obj = {
              command: 'delBiddingInfo',
              platform: 'web',
              id: this.id
            };
            return JSON.stringify(obj);
          })()
        })
      }).then((rep) => {
        if (rep.data.statusCode === '10001') {
          this.deleteSussessShow = true;
        }
      }, (rep) => { });
    },
    deleteFinish() {
      this.$router.push('/bid-info-list');
    },
    inputFinish() {
      this.$router.push('/bid-info-list');
    },
    draftFinish() {
      //close
      this.$router.push('/bid-info-draft');
    },
    definePath() {
      if (this.isDraft === "isDraft") {
        this.paths = [
          { name: '草稿箱', url: '/bid-info-draft', present: false },
          { name: '招投标详情', url: '/bid-info-detail', present: true }
        ]
      }
      if (this.isDraft === "notDraft") {
        this.paths = [
          { name: '招投标信息看板', url: '/bid-info-list', present: false },
          { name: '招投标详情', url: '/bid-info-detail', present: true }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.isDraft = this.$route.params.isDraft;
    this.getInfo();
    this.editShow = false;
    this.checkShow = true;
    this.definePath();
  },
  components: {
    crumbs,
    card,
    bidInfoCheck,
    bidInfoEdit,
    modal
  }
}
</script>

<style lang="sass" scoped>
    .icon {
        vertical-align: middle;
        color: #EFA844;
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
