<template>
  <main class="container">
    <div class="row">
      <sidebar class="col-md-2"></sidebar>
      <router-view class="col-md-10"></router-view>
    </div>
  </main>
</template>

<script>
import sidebar from './sidebar.vue';

export default {
  name: 'index',
  components: {
    sidebar
  }
}
</script>

<style lang="sass" scoped>
main.container {
  margin-top: 51px;
}
</style>
