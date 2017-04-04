<template>
  <section>
    <h4>任务列表<button class="btn btn-primary pull-right">创建新任务</button></h4>
    <ul class="business-list-review">
      <li class="bg-warning">
        <h5 class="state">尚未完成</h5>
        <h5 class="title"><a href="">业务1</a></h5>
        <h5 class="date pull-right">2016/01/01-2016/01/01</h5>
      </li>
      <li class="bg-info">
        <h5 class="state">已提交待审核</h5>
        <h5 class="title"><a href="">业务2</a></h5>
        <h5 class="date pull-right">2016/01/01-2016/01/01</h5>
      </li>
      <li class="bg-danger">
        <h5 class="state">已审核未通过</h5>
        <h5 class="title"><a href="">业务3</a></h5>
        <h5 class="date pull-right">2016/01/01-2016/01/01</h5>
      </li>
      <li class="bg-success">
        <h5 class="state">待发合同编号</h5>
        <h5 class="title"><a href="">业务4</a></h5>
        <h5 class="date pull-right">2016/01/01-2016/01/01</h5>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
    name: 'reviewBusinessSales',
};
</script>

<style lang="sass" scoped>
@import '../../scss/variables.scss';

section {
  position: relative;
  margin: 30px 10px;
  padding: 10px 20px;
  background-color: $origin-color;
  border: 1px solid $section-border;
  box-shadow: 1px 2px 4px $section-border-shadow;
  .business-list-review {
    list-style: none;
    padding-left: 0;
    margin-top: 30px;
    > li {
      > h5 {
        display: inline-block;
        &.state{
          width: 120px;
          text-align: center;
        }
        &.title {
          > a {
            &.hover {
              cursor: pointer;
            }
          }
        }
        &.date{
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
