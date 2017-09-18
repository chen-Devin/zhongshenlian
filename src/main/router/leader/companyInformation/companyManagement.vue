<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <button class="btn my-btn" @click="switchDepart">职能部门</button>
      <button class="btn my-btn" @click="switchDepart">业务部门</button>
    </card>
    <div v-if="functionShow">
      <company-list v-if="reloadList" @noticeJump="noticeJump"></company-list>
      <div class="company-wrapper">
        <router-view @reloadComList="reloadComList"></router-view>
      </div>
    </div>
    <div v-else>
      <multi-level></multi-level>
    </div>
  </div>
</template>

<script>
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import companyList from '@/main/router/leader/companyInformation/component/companyList.vue';
import multiLevel from '@/main/component/multiLevel.vue';

export default {
  name: 'companyManagement',
  data() {
    return {
      paths: [
        { name: '信息管理', url: '/business-review-list-leader', present: true },
        { name: '公司信息管理', url: '/business-review-list-leader', present: true }
      ],
      reloadList: true,
      functionShow: true,
      comId: ''
    };
  },
  computed: {
    path1 () {
      return this.$route.path
    }
  },
  watch: {
    path1: function(val, oldVal) {
      if (val !== oldVal) {
        if (val === '/company-management') {
          this.$router.push(`/company-management/${this.comId}`)
        }
      }
    }
  },
  methods: {
    delSuccess () {
      this.reloadList = false
      this.reloadList = true
    },
    reloadComList () {
      this.reloadList = false
      setTimeout(() => {
        this.reloadList = true
      }, 100)
    },
    noticeJump (comId) {
      this.comId = comId
      this.$router.push(`/company-management/${comId}`)
    },
    switchDepart () {
      this.functionShow = !this.functionShow
    }
  },
  created() {
    this.noticeJump(this.comId)
  },
  components: {
    crumbs,
    card,
    companyList,
    multiLevel
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../scss/_variables.scss';
  .company-wrapper {
    margin-left: 180px;
  }
</style>
