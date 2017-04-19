<template>
  <ol class="breadcrumb">
    <li :class="{active: PATH.present}" v-for="PATH in paths">
      <router-link :to="PATH.url" v-if="!PATH.present">{{PATH.name}}</router-link>
      <template v-else-if="PATH.present">{{PATH.name}}</template>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'crumbs',
  props: ['paths']
}
</script>

<style lang="sass" scoped>
ol.breadcrumb {
  margin-top: 20px;
  background-color: transparent;
}
</style>
