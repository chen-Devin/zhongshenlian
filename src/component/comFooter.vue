<template>
  <footer>
    <span>&copy;2016-2017</span>
    <span>天津中审联有限责任会计师事务所版权所有</span>
    <span>津ICP备12000891号-1</span>
  </footer>
</template>

<script>
export default {
  name: 'comFooter'
}
</script>

<style lang="sass" scoped>
footer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  font-size: 12px;
}
span {
  display: inline-block;
  padding: 0 15px;
  color: rgba(240,240,240,1);
  line-height: 0.8em;
}
footer {
  span {
    &:first-child {
      border-right: 1px solid rgba(240,240,240,1);
    }
  }
}
footer {
  span {
    &:last-child {
      border-left: 1px solid rgba(240,240,240,1);
    }
  }
}
</style>
