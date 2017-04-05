<template>
  <section>
    <slot>
      <h3 class="text-warning text-center">此处尚无内容</h3>
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
  margin: 30px 10px;
  padding: 10px 20px;
  background-color: $origin-color;
  border: 1px solid $section-border;
  box-shadow: 1px 2px 4px $section-border-shadow;
}
</style>
