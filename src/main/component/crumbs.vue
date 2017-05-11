<template>
<div class="navigation">
  <a class="fa fa-angle-double-left back-up" @click="backUp" v-if="paths.length!==1"></a>
  <span class="fa fa-angle-double-left back-up" v-if="paths.length===1"></span>
  <ol class="breadcrumb">
    <li :class="{active: PATH.present}" v-for="PATH in paths">
      <router-link :to="PATH.url" v-if="!PATH.present">{{PATH.name}}</router-link>
      <template v-else-if="PATH.present">{{PATH.name}}</template>
    </li>
  </ol>
</div>
</template>

<script>
export default {
  name: 'crumbs',
  props: ['paths'],
  methods: {
    backUp() {
      this.$router.push(this.paths[paths.length-2].url);
    }
  }
}
</script>

<style lang="sass" scoped>
.navigation{
  margin: 0 10px;
  .back-up {
    display: inline-block;
  }
  a.back-up {
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }
  ol.breadcrumb {
    display: inline-block;
    margin-top: 15px;
    margin-bottom: 0;
    background-color: transparent;
  }
}
</style>
