<template>
  <div>
    <div class="business-progress-bar">
      <template v-for="(PRO, index) in progress">
        <div class="circle"
             :class="{passed: PRO.passed, active: PRO.active}"
             :style="{order: index}"></div>
        <div class="line"
             :class="{passed: PRO.passed}"
             v-if="index!==(progress.length-1)"
             :style="{order: index}"></div>
      </template>
    </div>
    <div class="business-progress-content">
      <div class="content"
           :class="{active: PRO.active}"
           v-for="(PRO, index) in progress"
           :key="index">{{PRO.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  props: ['progress']
};
</script>

<style lang="sass" scoped>
@import '../../scss/_variables.scss';

.business-progress-bar {
  display: flex;
  height: 28px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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
      &.passed {
        border-top: 1px solid rgba($brand-primary, 0.6);
      }
    }
  }
}
.business-progress-content {
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
