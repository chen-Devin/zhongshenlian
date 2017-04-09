<template>
  <div>
    <div class="progressBar">
      <template v-for="(PRO, index) in progress">
        <div class="circle"
             v-bind:class="{passed: PRO.passed, active: PRO.active}"
             v-bind:style="{order: index}"></div>
        <div class="line"
             v-bind:class="{passed: PRO.passed}"
             v-if="index!==(progress.length-1)"
             v-bind:style="{order: index}"></div>
      </template>
    </div>
    <div class="progressContent">
      <div class="content"
           v-bind:class="{active: PRO.active}"
           v-for="(PRO, index) in progress"
           v-bind:key="index">{{PRO.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  data() {
    return {
      progress: [
        { name: 'aaa', passed: true, active: false },
        { name: 'bbb', passed: true, active: false },
        { name: 'ccc', passed: true, active: false },
        { name: 'ccc', passed: true, active: false },
        { name: 'ddd', passed: false, active: true },
        { name: 'eee', passed: false, active: false },
        { name: 'fff', passed: false, active: false }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
@import '../../scss/_variables.scss';

.progressBar {
  display: flex;
  height: 28px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  div {
    margin: 0 5px;
    &.circle {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: $gray-light;
      box-shadow: 0 0 1px 2px rgba($gray-light, 0.6);
      &.passed {
        background-color: $brand-primary;
        box-shadow: 0 0 1px 2px rgba($brand-primary, 0.6);
      }
      &.active {
        width: 14px;
        height: 14px;
        border-radius: 7px;
        background-color: $brand-primary;
        box-shadow: 0 0 1px 2px rgba($brand-primary, 0.6);
      }
    }
    &.line {
      width: 90px;
      height: 0;
      border-top: 1px solid $gray-light;
      // border-bottom: 1px solid $gray-light;
      &.passed {
        border-top: 1px solid rgba($brand-primary, 0.6);
        // border-bottom: 1px solid rgba($brand-primary, 0.6);
      }
    }
  }
}
.progressContent {
  display: flex;
  height: 60px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  margin-top: 20px;
  .content {
    margin: 0 5px;
    width: 110px;
    overflow-y: visible;
    &.active {
      width: 118px;
      color: $brand-primary;
    }
  }
}
</style>
