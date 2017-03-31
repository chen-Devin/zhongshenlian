<template>
  <div id="app">
    <com-header v-bind:user="user"></com-header>
    <index></index>
    <!--<com-footer></com-footer>-->
  </div>
</template>

<script>
import comFooter from './component/comFooter.vue';
import comHeader from './component/comHeader.vue';
import index from './component/index.vue';

export default {
  name: 'app',
  props: ['user'],
  components: {
    comFooter,
    comHeader,
    index
  }
}
</script>

<style lang="sass" scoped>

</style>
