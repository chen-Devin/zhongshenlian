<template>
  <div class="main">
    <crumbs v-bind:paths="paths"></crumbs>
    <card>
      <h3>
        新建业务
        <div class="pull-right">
          <button class="btn btn-success">提交</button>
          <button class="btn btn-warning">暂存</button>
          <button class="btn btn-danger">撤销</button>
        </div>
      </h3>
      <business-editor v-bind:business="business"
                       v-bind:editable="editable"></business-editor>
    </card>
  </div>
</template>

<script>
import axios from 'axios';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import businessEditor from './component/businessEditor.vue'

export default {
  name: 'businessReviewAdd',
  data() {
    return {
      paths: [
        { name: '待审核业务', url: '/business-review-list-sales', present: false },
        { name: '创建新任务', url: '/business-review-add', present: true },
      ],
      business: {
        name: '',
        proposerId: this.user.id,
        proposerName: this.user.name,
        proposerTele: this.user.telephone,
        institution: '',
        institutionTele: '',
        purpose: '',
        startTime: '',
        endTime: '',
        peopleNum: '',
        institutionScale: '',
        amount: '',
        proposerOpinion: '',
        files: []
      },
      editable: true,
    };
  },
  props: ['user'],
  components: {
    crumbs,
    card,
    businessEditor
  }
}
</script>

<style lang="sass" scoped>

</style>
