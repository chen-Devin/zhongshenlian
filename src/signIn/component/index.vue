<template>
  <main>
    <section class="section">
      <div id="wechatLogin"></div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'index',
}
</script>

<style lang="sass" scoped>
.section {
  order: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0.9);
  #wechatLogin {
    color: rgba(240,240,240,1);
  }
}
</style>
