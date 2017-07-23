<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <div>
        <quick-link v-for="(link, index) in linksArr" :iniLink="link" :key="index"></quick-link>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import QuickLink from './component/quickLink.vue';

export default {
  name: 'quick',
  data() {
    return {
      paths: [
        { name: '我的快捷', url: '/quick', present: true }
      ],
      user: {}
    };
  },
  computed: {
    linksArr() {
      if (this.user.department === '所长') {
        return [{
          icon: 'el-icon-star-on',
          bgc: '#daeb98',
          linkTo: '/customer-infor-list',
          title: '客户信息'
        }]
      }
    }
  },
  props: [''],
  created() {
    this.$store.dispatch('fetchUserInfo').then(() => {
      this.user = this.$store.getters.getUser;
    }, () => { });
  },
  methods: {

  },
  components: {
    crumbs,
    card,
    QuickLink
  }
}
</script>

<style lang="sass" scoped>

</style>
