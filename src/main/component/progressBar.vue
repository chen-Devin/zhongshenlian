<template>
  <div>
    <div class="progressBar">
      <template v-for="(PRO, index) in progress"
                v-bind:key="index">
        <div class="circle"
             v-bind:class="{passed: PRO.passed, active: PRO.active}"
             v-bind:style="{order: index}"></div>
        <div class="line"
             v-bind:class="{passed: PRO.passed}"
             v-if="progress.length!==index"
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
        { name: 'ddd', passed: true, active: true },
        { name: 'eee', passed: false, active: false },
        { name: 'fff', passed: false, active: false },
        { name: 'ggg', passed: false, active: false }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
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
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background-color: gray;
      box-shadow: 0 0 1px 2px rgba(128, 128, 128, 0.6);
      &.passed {
        background-color: red;
        box-shadow: 0 0 1px 2px rgba(255, 0, 0, 0.6);
        &.active {
          width: 28px;
          height: 28px;
          border-radius: 143px;
          background-color: red;
          box-shadow: 0 0 1px 2px rgba(255, 0, 0, 0.6);
        }
      }
    }
    &.line {
      width: 100px;
      height: 0;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      &.passed {
        border-top: 1px solid rgba(255, 0, 0, 0.6);
        border-bottom: 1px solid rgba(255, 0, 0, 0.6);
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
    width: 130px;
    overflow-y: visible;
    &.active {
      width: 138px;
      color: red;
    }
  }
}
</style>
