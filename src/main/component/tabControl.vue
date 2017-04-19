<template>
  <div>
    <ul class="nav nav-tabs">
      <router-link tag="li"
                   active-class="active"
                   :to="PART.path"
                   v-for="(PART, index) in parts"
                   :key="index">
        <a>{{PART.name}}</a>
      </router-link>
    </ul>
    <div class="tab-content">
      <router-view :initBusiness="business"
                   :user="user"
                   @pathsChan="pathsChan"></router-view>
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
  props: ['initBusiness', 'initParts', 'user'],
  methods: {
    pathsChan(paths) {
      this.$emit('pathsChan', paths);
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
