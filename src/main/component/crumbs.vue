<template>
<ol class="breadcrumb">
  <li v-for="PATH in paths">
    <router-link v-bind:to="PATH.url" v-bind:class="{active: PATH.present}">{{PATH.name}}</router-link>
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
}
</style>
