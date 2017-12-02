<template>
  <router-link :to="link.linkTo">
    <div class="link-wrapper" :class="{ quick0: quicks[0], quick1: quicks[1], quick2: quicks[2], quick3: quicks[3], quick4: quicks[4], quick5: quicks[5] }">
      <img height="30" :src="link.icon">
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
      quicks: [false, false, false, false, false, false]
    };
  },
  props: ['iniLink', 'iniItemIndex'],
  created() {
    this.quicks[this.iniItemIndex % 5] = true
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
    color: #fff;
    margin: 0 10px;
    img {
      margin-bottom: 20px;
    }
    &.quick0 {
      background-color: #B1E17E;
      &:hover {
        background-color: #BBEB89;
      }
      &:active {
        background-color: #A0D06D;
      }
    }
    &.quick1 {
      background-color: #95DCCC;
      &:hover {
        background-color: #A1EDDC;
      }
      &:active {
        background-color: #78CBB8;
      }
    }
    &.quick2 {
      background-color: #EAC55F;
      &:hover {
        background-color: #F1D382;
      }
      &:active {
        background-color: #D4B14F;
      }
    }
    &.quick3 {
      background-color: #E89EA8;
      &:hover {
        background-color: #EFB3BA;
      }
      &:active {
        background-color: #E28994;
      }
    }
    &.quick4 {
      background-color: #9CD0FE;
      &:hover {
        background-color: #ABD4F7;
      }
      &:active {
        background-color: #7EB7EA;
      }
    }
  }
  a {
    text-decoration: none;
  }
</style>
