<template>
  <div class="billing-list list-group">
    <router-link to="">billing 1</router-link>
    <router-link to="">billing 2</router-link>
    <router-link to="">billing 3</router-link>
    <router-link to="">billing 4</router-link>
    <router-link to="">billing 5</router-link>
    <router-link to="">billing 6</router-link>
  </div>

</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'billingInfor',

};
</script>

<style lang="sass" scoped>
div.billing-list {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  > a.list-group-item {
    border-right: 0;
    border-left: 0;
    // height: 50px;
    // line-height: 30px;
    > span.title {
      margin-left: 7px;
    }
  }
  > a.list-group-item:first-child {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  > a.list-group-item:last-child {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
