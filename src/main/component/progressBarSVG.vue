<template>
<div class="center-block">
  <svg width="800" height="150">
    <circle cx="100" cy="60" :r="active" :fill="pass"></circle>
    <text x="65" y="90" fill="#337ab7">立项申请</text>
    <line x1="100" y1="60" x2="200" y2="60" style="stroke-width:1" :style="{stroke: rgba(51,122,183,0.6)}"></line>
    <circle cx="200" cy="60" r="3" fill="#337ab7"></circle>
    <text x="165" y="90" fill="#337ab7">风控初审</text>
    <line x1="200" y1="60" x2="300" y2="60" style="stroke-width:1" :style="{stroke: rgba(51,122,183,0.6)}"></line>
    <circle cx="300" cy="60" r="3" fill="#337ab7"></circle>
    <text x="265" y="90" fill="#337ab7">所长终审</text>
    <line x1="300" y1="60" x2="400" y2="60" style="stroke-width:1" :style="{stroke: rgba(51,122,183,0.6)}"></line>
    <circle cx="400" cy="60" r="5" fill="#337ab7"></circle>
    <text x="365" y="90" fill="#337ab7">发放编号</text>
    <line x1="400" y1="60" x2="500" y2="60" style="stroke-width:1" :style="{stroke: rgba(51,122,183,0.6)}"></line>
    <circle cx="500" cy="60" r="3" fill="#337ab7"></circle>
    <text x="465" y="90" fill="#337ab7">风控复审</text>
    <line x1="500" y1="60" x2="600" y2="90" style="stroke-width:1" :style="{stroke: rgba(51,122,183,0.6)}"></line>
    <line x1="500" y1="60" x2="600" y2="30" style="stroke-width:1" :style="{stroke: rgba(51,122,183,0.6)}"></line>
    <circle cx="600" cy="90" r="3" fill="#337ab7"></circle>
    <text x="565" y="120" fill="#337ab7">二维码完成</text>
    <circle cx="600" cy="30" r="3" fill="#337ab7"></circle>
    <text x="565" y="60" fill="#337ab7">开票完成</text>
    <line x1="600" y1="90" x2="700" y2="60" style="stroke-width:1" :style="{stroke: rgba(51,122,183,0.6)}"></line>
    <line x1="600" y1="30" x2="700" y2="60" style="stroke-width:1" :style="{stroke: rgba(51,122,183,0.6)}"></line>
    <circle cx="700" cy="60" r="3" fill="#337ab7"></circle>
    <text x="665" y="90" fill="#337ab7">业务完结</text>
  </svg>
</div>
</template>

<script>
export default {

};
</script>

<style lang="sass" scoped>

</style>
