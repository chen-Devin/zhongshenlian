<template>
  <div>
    <el-tabs class="tab-control" v-model="activeNameSales" @tab-click="sel">
      <el-tab-pane 
        :label="PART.name" 
        :name="PART.path"
        v-for="(PART, index) in parts"
        :key="index"></el-tab-pane>
    </el-tabs>
    <div class="tab-content">
      <router-view :initBusiness="business"
                   :user="user"
                   @pathsChan="pathsChan"></router-view>
    </div>
  </div>
</template>

<script>
import bus from '@/main/bus.js'
export default {
  name: 'tabControl',
  data() {
    return {
      business: this.initBusiness,
      parts: this.initParts,
      activeNameSales: 'business-profile'
    }
  },
  props: ['initBusiness', 'initParts', 'user'],
  methods: {
    pathsChan(paths) {
      this.$emit('pathsChan', paths);
    },
    sel(obj) {
      console.log(obj)
      bus.$emit('hideBillingDetail')
      this.$router.push(obj.name)
      // for (let i = 0; i < this.parts.length; i++) {
      //   this.parts[i].state = false;
      // }
      // this.parts[index].state = true;
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
  min-height: 150px;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #f9fbfe;
}
</style>
