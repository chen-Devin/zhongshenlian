<template>
  <main class="container-fluid">
    <div class="row">
      <side-bar class="col-md-2" :user="user"></side-bar>
      <router-view class="col-md-10" :user="user"></router-view>
    </div>
  </main>
</template>

<script>
import sideBar from './sideBar.vue';

export default {
  name: 'index',
  props: ['user'],
  components: {
    sideBar
  }
}
</script>

<style lang="sass" scoped>
main.container-fluid {
  margin-top: 51px;
}
</style>
