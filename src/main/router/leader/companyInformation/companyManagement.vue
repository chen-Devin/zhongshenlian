<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <h4>公司信息管理</h4>
    </card>
    <company-list v-if="reloadList" @noticeJump="noticeJump"></company-list>
    <div class="company-wrapper">
      <router-view @reloadComList="reloadComList"></router-view>
    </div>
  </div>
</template>

<script>
import crumbs from '@/main/component/crumbs.vue';
import card from '@/main/component/card.vue';
import companyList from '@/main/router/leader/companyInformation/component/companyList.vue';

export default {
  name: 'companyManagement',
  data() {
    return {
      paths: [
        { name: '信息管理', url: '/business-review-list-leader', present: true },
        { name: '公司信息管理', url: '/business-review-list-leader', present: true }
      ],
      reloadList: true,
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
      console.log('submitted')
    },
    noticeJump (comId) {
      this.comId = comId
      this.$router.push(`/company-management/${comId}`)
    }
  },
  created() {
    this.noticeJump(this.comId)
  },
  components: {
    crumbs,
    card,
    companyList
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../scss/_variables.scss';
  .company-wrapper {
    margin-left: 180px;
  }
</style>
