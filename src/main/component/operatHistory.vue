<template>
  <div class="row timeline">
    <div class="col-sm-offset-4 col-sm-8">
      <ul class="list-group">
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
        <li class="list-group-item">
          <span class="time">2016-12-21 13:20:21</span>
          <span class="content">创建业务</span>
          <span class="operator">王野</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'operatHistory',
  data() {

  }
}
</script>

<style lang="sass" scoped>
@import '../../scss/variables.scss';

.timeline {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  li.list-group-item {
    border-right: 0;
    border-top: 0;
    border-bottom: 0;
    border-left: 1px solid $gray-light;
    padding-left: 15px;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-left: 5px;
    &:first-child {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
    &:last-child {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    &::before {
      content: ' ';
      position: absolute;
      left: -4px;
      top: 17px;
      width: 7px;
      height: 7px;
      background: $gray-light;
      border: 1px solid $body-bg;
      border-radius: 50%;
    }
    > span {
      display: inline-block;
      position: relative;
      left: -170px;
      &.content {
        margin-left: 30px;
      }
    }
  }
}
</style>
