<template>
  <header>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img alt="Brand" src="../img/brand.svg">
          </a>
        </div>
        <h4 class="navbar-text brand-name">
          天津中审联办公管理系统
        </h4>
      </div><!-- /.container-fluid -->
    </nav>
  </header>
</template>

<script>
export default {
  name: 'comHeader'
}
</script>

<style lang="sass" scoped>
.navbar {
  background-color: rgba(255,255,255,0);
  border-color: rgba(255,255,255,0);
  .navbar-brand {
    padding: 8px 15px;
    img {
      height: 100%
    }
  }
  h4.brand-name {
    margin-left: 0;
    color: rgba(240,240,240,0.9);
  }
}
</style>
