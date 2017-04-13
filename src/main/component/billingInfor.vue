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
form.form-horizontal {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
