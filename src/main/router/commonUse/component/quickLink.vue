<template>
  <router-link :to="link.linkTo">
    <div class="link-wrapper" :class="{ quick0: quicks[0], quick1: quicks[1], quick2: quicks[2], quick3: quicks[3], quick4: quicks[4], quick5: quicks[5] }">
      <img :src="link.icon">
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
      background-color: #8ad637;
      &:hover {
        background-color: #a0f247;
      }
      &:active {
        background-color: #6eb620;
      }
    }
    &.quick1 {
      background-color: #4ddabb;
      &:hover {
        background-color: #59f8d5;
      }
      &:active {
        background-color: #37b095;
      }
    }
    &.quick2 {
      background-color: #f5bd23;
      &:hover {
        background-color: #fbce50;
      }
      &:active {
        background-color: #d7a61e;
      }
    }
    &.quick3 {
      background-color: #f67988;
      &:hover {
        background-color: #f89da8;
      }
      &:active {
        background-color: #e05043;
      }
    }
    &.quick4 {
      background-color: #62b6ff;
      &:hover {
        background-color: #8ac5f8;
      }
      &:active {
        background-color: #168fcd;
      }
    }
    &.quick5 {
      background-color: #8c8c8c;
      &:hover {
        background-color: #a6a6a6;
      }
      &:active {
        background-color: #555454;
      }
    }
  }
  a {
    text-decoration: none;
  }
</style>
