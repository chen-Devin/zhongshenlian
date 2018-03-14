<template>
  <header style="height: 50px !important;">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img alt="Brand" src="../img/LOGO.png">
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
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #1E79E3;
  }
}
</style>
