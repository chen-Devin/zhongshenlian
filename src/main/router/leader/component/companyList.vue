<template>
  <div class="company-list-wrapper">
    <ul>
      <li>造价部</li>
      <li>评估部</li>
      <li>税务部</li>
    </ul>
  </div>
</template>

<script>
import card from '../../../component/card.vue';

export default {
  name: 'companyList',
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  created() {
    
  },
  components: {
    card
  }
};
</script>

<style lang="sass" scoped>
@import '../../../../scss/_variables.scss';

.company-list-wrapper {
  position: relative;
  width: 150px;
  float: left;
  margin: 0 10px;
  background-color: $origin-color;
  border: 1px solid $section-border;
  box-shadow: 1px 2px 4px $section-border-shadow;
  ul {
    width: 100%;
    font-size: 0;
    margin: 0;
    padding: 0;
    li {
      width: 100%;
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      text-align: center;
      list-style: none;
      cursor: pointer;
      &:hover {
        background-color: #27b1e5;
        color: #fff;
      }
    }
  }
}
</style>