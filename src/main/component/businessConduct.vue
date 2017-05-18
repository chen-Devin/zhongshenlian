<template>
  <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent>
    <div class="form-group" v-for="(SCHDULE, index) in business.schdules" :key="index">
      <div class="checkbox col-sm-offset-2 col-sm-10">
        <label>
          <input type="checkbox"
                 v-model="SCHDULE.state"
                 @change="stateChan(SCHDULE)"
                 :disabled="!editable">
          {{SCHDULE.name}}
        </label>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'businessConduct',
  data() {
    return {
      paths: [],
      business: this.initBusiness
    };
  },
  computed: {
    editable() {
      return true;
    }
  },
  props: ['initBusiness', 'user'],
  mounted() {
    if (this.user.department === '业务部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-sales', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-sales-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-sales-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '风险评估部') {
      this.paths.push({ name: '待复审业务', url: '/business-handle-list-risk', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-risk-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-risk-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '所长') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-leader', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-leader-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-leader-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '办公室') {
      this.paths.push({ name: '待完结业务', url: '/business-handle-list-office', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-office-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-office-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '财务部') {
      this.paths.push({ name: '待开发票', url: '/business-handle-list-financial', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-financial-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-financial-${this.$route.params.id}/business-conduct`, present: true });
    } else if (this.user.department === '档案部') {
      this.paths.push({ name: '待处理业务', url: '/business-handle-list-archives', present: false });
      this.paths.push({ name: '业务详情', url: `/business-handle-detail-archives-${this.$route.params.id}/business-conduct`, present: false });
      this.paths.push({ name: '业务开展', url: `/business-handle-detail-archives-${this.$route.params.id}/business-conduct`, present: true });
    }
    this.$emit('pathsChan', this.paths);
  },
  methods: {
    stateChan(SCHDULE) {
      let promise = new Promise((resolve, reject) => {
        axios({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          method: 'post',
          url: '/service',
          data: qs.stringify({
            data: (() => {
              let obj = {
                command: 'addBusniessInfo',
                platform: 'web',
                data: {
                  id: this.business.id,
                  projectSchduleArray: (() => {
                    let arr = [];
                    for (let i = 0; i < this.business.schdules.length; i++) {
                      let obj = {
                        name: this.business.schdules[i].name,
                        state: this.business.schdules[i].state === true ? '0' : '1'
                      };
                      arr.push(obj);
                    }
                    return arr;
                  })()
                }
              };
              return JSON.stringify(obj);
            })()
          })
        }).then((rep) => {
          if (rep.data.statusCode === '10001') {
            resolve(rep);
          } else if (rep.data.statusCode === '10012') {
            window.location.href = 'signIn.html';
          }
        }, (rep) => { });
      });
      return promise;
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
