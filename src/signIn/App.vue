<template>
  <div id="app" :class="bgImg">
    <com-header></com-header>
    <index></index>
    <com-footer></com-footer>
  </div>
</template>

<script>
import comHeader from '../component/comHeader.vue';
import comFooter from '../component/comFooter.vue';
import index from './component/index.vue';

export default {
  name: 'App',
  data() {
    return {
      bgImg: 'bgImg-1'
    };
  },
  created () {
    this.bgChange();
  },
  methods: {
    bgChange() {
      var imgNum = 1;
      setInterval(()=>{
        if(imgNum === 10) {
          imgNum = 1;
        } else {
          ++imgNum;
        }
        this.bgImg = `bgImg-${imgNum}`;
      }, 10000);
    }
  },
  components: {
    comHeader,
    comFooter,
    index
  }
}
</script>

<style lang="sass" scoped>

</style>
