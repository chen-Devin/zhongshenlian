<template>
  <router-link :to="link.linkTo">
    <div class="link-wrapper" :style="{ backgroundColor: backgroundColor }">
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
      link: this.iniLink,
      itemIndex: this.iniItemIndex + 1,
      bgcArray: ['#6ebbe6', '#aede90', '#45d2e6', '#f2b963', '#fc8065']
    };
  },
  computed: {
    backgroundColor() {
      return this.bgcArray[this.itemIndex % 5];
    }
  },
  props: ['iniLink', 'iniItemIndex'],
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 80px;
    height: 90px;
    padding-top: 13px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    margin: 0 10px;
  }
  a {
    text-decoration: none;
  }
</style>
