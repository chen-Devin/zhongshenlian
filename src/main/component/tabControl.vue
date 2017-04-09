<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-bind:class="{active: PART.disp}"
          v-for="(PART, index) in parts"
          v-bind:key="index">
        <a v-on:click="tabSel(PART)">{{PART.name}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div v-for="(PART, index) in parts"
           v-show="PART.disp"
           v-bind:is="PART.content"
           v-bind:initBusiness="business"
           v-bind:key="index">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  data() {
    return {
      business: this.initBusiness,
      parts: this.initParts
    }
  },
  props: ['initBusiness', 'initParts'],
  methods: {
    tabSel(PART) {
      for(let i=0; i < this.parts.length; i++) {
        this.parts[i].disp = false;
      }
      PART.disp = true;
    }
  }
};
</script>

<style lang="sass" scoped>
ul.nav {
  li {
    a {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
