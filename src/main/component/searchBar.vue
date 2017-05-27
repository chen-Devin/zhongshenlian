<template>
  <form class="form-horizontal normal-wrap" @submit.prevent @keyup.enter.prevent="tog">
    <div class="form-group">
      <div class="col-sm-12">
        <div class="input-group">
          <input type="text"
                 class="text-center form-control"
                 :placeholder="placeholder"
                 v-model.trim="searchCont">
          <span class="input-group-btn">
            <button class="btn submit-btn my-btn search-btn"
                    type="button"
                    @click="tog">搜索</button>
          </span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'searchBar',
  data() {
    return {
      searchCont: ''
    }
  },
  props: ['placeholder'],
  methods: {
    tog() {
      this.$emit('search', this.searchCont);
    }
  }
}
</script>

<style lang="sass" scoped>
input {
  height: 40px;
}
</style>
