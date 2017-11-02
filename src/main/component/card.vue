<template>
  <section>
    <slot>
      <p class="text-center">暂无</p>
    </slot>
  </section>
</template>

<script>
export default {
  name: 'card'
};
</script>

<style lang="sass" scoped>
@import '../../scss/variables.scss';

section {
  position: relative;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 10px;
  // padding: 10px 20px;
  background-color: $origin-color;
  // border: 1px solid $section-border;
  box-shadow: 1px 2px 4px $section-border-shadow;
  overflow: hidden;
}
</style>
