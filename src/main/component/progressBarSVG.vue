<template>
  <div class="svg-wrap">
    <svg width="800" height="150">
      <circle cx="100" cy="60" :r="active(progress[0].active).radius" :fill="passed(progress[0].passed, progress[0].active).cirCol"></circle>
      <text x="65" y="90" :fill="active(progress[0].active).texCol">{{progress[0].name}}</text>
      <line x1="100" y1="60" x2="200" y2="60" style="stroke-width:1" :style="{stroke: passed(progress[0].passed).linCol}"></line>

      <circle cx="200" cy="60" :r="active(progress[1].active).radius" :fill="passed(progress[1].passed, progress[1].active).cirCol"></circle>
      <text x="165" y="90" :fill="active(progress[1].active).texCol">{{progress[1].name}}</text>
      <line x1="200" y1="60" x2="300" y2="60" style="stroke-width:1" :style="{stroke: passed(progress[1].passed).linCol}"></line>

      <circle cx="300" cy="60" :r="active(progress[2].active).radius" :fill="passed(progress[2].passed, progress[2].active).cirCol"></circle>
      <text x="265" y="90" :fill="active(progress[2].active).texCol">{{progress[2].name}}</text>
      <line x1="300" y1="60" x2="400" y2="60" style="stroke-width:1" :style="{stroke: passed(progress[2].passed).linCol}"></line>

      <circle cx="400" cy="60" :r="active(progress[3].active).radius" :fill="passed(progress[3].passed, progress[3].active).cirCol"></circle>
      <text x="365" y="90" :fill="active(progress[3].active).texCol">{{progress[3].name}}</text>
      <line x1="400" y1="60" x2="500" y2="60" style="stroke-width:1" :style="{stroke: passed(progress[3].passed).linCol}"></line>

      <circle cx="500" cy="60" :r="active(progress[4].active).radius" :fill="passed(progress[4].passed, progress[4].active).cirCol"></circle>
      <text x="465" y="90" :fill="active(progress[4].active).texCol">{{progress[4].name}}</text>
      <line x1="500" y1="60" x2="600" y2="90" style="stroke-width:1" :style="{stroke: passed(progress[4].passed).linCol}"></line>
      <line x1="500" y1="60" x2="600" y2="30" style="stroke-width:1" :style="{stroke: passed(progress[4].passed).linCol}"></line>

      <circle cx="600" cy="90" :r="active(progress[5].qrCode.active).radius" :fill="passed(progress[5].qrCode.passed, progress[5].qrCode.active).cirCol"></circle>
      <text x="565" y="120" :fill="active(progress[5].qrCode.active).texCol">{{progress[5].qrCode.name}}</text>
      <line x1="600" y1="90" x2="700" y2="60" style="stroke-width:1" :style="{stroke: passed(progress[5].qrCode.passed).linCol}"></line>

      <circle cx="600" cy="30" :r="active(progress[5].bill.active).radius" :fill="passed(progress[5].bill.passed, progress[5].bill.active).cirCol"></circle>
      <text x="565" y="60" :fill="active(progress[5].bill.active).texCol">{{progress[5].bill.name}}</text>
      <line x1="600" y1="30" x2="700" y2="60" style="stroke-width:1" :style="{stroke: passed(progress[5].bill.passed).linCol}"></line>

      <circle cx="700" cy="60" :r="active(progress[6].active).radius" :fill="passed(progress[6].passed, progress[6].active).cirCol"></circle>
      <text x="665" y="90" :fill="active(progress[6].active).texCol">{{progress[6].name}}</text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  props: ['progress'],
  methods: {
    active(ACT) {
      if (ACT) {
        return {radius: 5, texCol: '#337ab7'};
      } else {
        return {radius: 3, texCol: '#666'};
      }
    },
    passed(PAS, ACT) {
      if (ACT) {
        return {cirCol: '#337ab7', linCol: '#777'};
      } else if (PAS) {
        return {cirCol: '#337ab7', linCol: 'rgba(51,122,183,0.6)'};
      } else {
        return {cirCol: '#777', linCol: '#777'};
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.svg-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>
