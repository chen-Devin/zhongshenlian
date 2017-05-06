<template>
<div class="navigation">
  <a class="fa fa-angle-double-left back-up" @click="backUp"></a>
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
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="sass" scoped>
.navigation{
  margin: 0 10px;
  a.back-up {
    display: inline-block;
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
