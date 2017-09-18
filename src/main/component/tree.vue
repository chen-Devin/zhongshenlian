<template>
  <ul class="rd-tree-node">
      <tree-node :tree-data="treeData"></tree-node>
  </ul>
</template>

<script>
import treeNode from '@/main/component/treeNode.vue';

export default {
  components: {
    treeNode
  }
}
</script>