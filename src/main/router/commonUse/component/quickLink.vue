<template>
  <router-link :to="link.linkTo">
    <div class="link-wrapper" :style="{ backgroundColor: link.bgc }">
      <i :class="link.icon"></i>
      <p>{{ link.title }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'quickLink',
  data() {
    return {
      link: this.iniLink
    };
  },
  computed: {

  },
  props: ['iniLink'],
  created() {

  },
  methods: {

  },
  components: {
    
  }
}
</script>

<style lang="sass" scoped>
  .link-wrapper {
    display: inline-block;
    box-sizing: border-box;
    width: 80px;
    height: 90px;
    padding-top: 13px;
    text-align: center;
    border-radius: 5px;
    color: #5C5C5C;
    margin: 0 10px;
  }
</style>