<template>
  <div class="staff-wrapper">
    <div class="basic-contain">
      <div class="basic-form"> 
        <auth-form :id="id" :type="type" :canEdit="canEdit"></auth-form>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';
import authForm from './authForm.vue';

export default {
  name: 'staffDetail',
  data() {
    return { 
    editAble: false,
    resultArray: [{
      companyName: '',
      companyId: '',
      authorityArray: [{
        name: '',
        authority: ''
      }]
    }],
    arr: [{
      name: '',
      authority: ''
    }],
    arr1: [],
    loadTable: false
    };
  },
  methods: {
    
  },
  props: ['id', 'type', 'canEdit'],
  components: {
    authForm
  }
}
</script>

<style lang="sass" scoped>
  .staff-wrapper {
    // background-color: #F9FBFE;
    .basic-contain {
      .basic-form {
        margin-top: 30px;
      }
    }
  }
</style>