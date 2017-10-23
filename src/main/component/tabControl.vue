<template>
  <div>
    <ul class="nav nav-tabs nav-justified">
      <li :class="{active: PART.state}"
          @click="sel(index)"
          v-for="(PART, index) in parts"
          :key="index">
        <router-link :to="PART.path">
          {{PART.name}}
        </router-link>
      </li>
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
    },
    sel(index) {
      for (let i = 0; i < this.parts.length; i++) {
        this.parts[i].state = false;
      }
      this.parts[index].state = true;
    }
  }
}
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
div.tab-content {
  min-height: 500px;
  border: 1px solid #E8E8E8;
}
</style>
