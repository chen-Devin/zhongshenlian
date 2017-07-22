<template>
  <div class="main">
    <crumbs :paths="paths"></crumbs>
    <card>
      <div>快捷</div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';

export default {
  name: 'quick',
  data() {
    return {
      paths: [
        { name: '我的快捷', url: '/quick', present: true }
      ]
    };
  },
  computed: {

  },
  props: [''],
  created() {

  },
  methods: {

  },
  components: {
    crumbs,
    card
  }
}
</script>

<style lang="sass" scoped>

</style>
