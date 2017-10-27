<template>
  <div class="svg-wrap">
    <!-- <p>{{ status }}</p> -->
    <svg width="860" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle :cx="radiusX[0]" cy="40" :r="radiusActive(state[0].active)" :fill="colorActive(state[0].active)"/>
      <line x1="50" y1="40" x2="190" y2="40" style="stroke:rgb(186,186,186);stroke-width:.5"/>
      <text x="22" y="68" fill="rgb(0,0,1)" font-size="13">{{ state[0].name }}</text>
      <!-- <text x="22" y="85" fill="rgb(186,186,186)" font-size="13">{{ state[0].time }}</text> -->

      <circle :cx="radiusX[1]" cy="40" :r="radiusActive(state[1].active)" :fill="colorActive(state[1].active)"/>
      <line x1="190" y1="40" x2="330" y2="40" style="stroke:rgb(186,186,186);stroke-width:.5"/>
      <text x="162" y="68" fill="rgb(0,0,1)" font-size="13">{{ state[1].name }}</text>
      <!-- <text x="162" y="85" fill="rgb(186,186,186)" font-size="13">{{ state[1].time }}</text> -->

      <circle :cx="radiusX[2]" cy="40" :r="radiusActive(state[2].active)" :fill="colorActive(state[2].active)"/>
      <line x1="330" y1="40" x2="470" y2="40" style="stroke:rgb(186,186,186);stroke-width:.5"/>
      <text x="302" y="68" fill="rgb(0,0,1)" font-size="13">{{ state[2].name }}</text>
      <!-- <text x="302" y="85" fill="rgb(186,186,186)" font-size="13">{{ state[2].time }}</text> -->

      <circle :cx="radiusX[3]" cy="40" :r="radiusActive(state[3].active)" :fill="colorActive(state[3].active)"/>
      <line x1="470" y1="40" x2="610" y2="40" style="stroke:rgb(186,186,186);stroke-width:.5"/>
      <text x="442" y="68" fill="rgb(0,0,1)" font-size="13">{{ state[3].name }}</text>
      <!-- <text x="442" y="85" fill="rgb(186,186,186)" font-size="13">{{ state[3].time }}</text> -->

      <circle :cx="radiusX[4]" cy="40" :r="radiusActive(state[4].active)" :fill="colorActive(state[4].active)"/>
      <line x1="610" y1="40" x2="750" y2="40" style="stroke:rgb(186,186,186);stroke-width:.5"/>
      <text x="582" y="68" fill="rgb(0,0,1)" font-size="13">{{ state[4].name }}</text>
      <!-- <text x="582" y="85" fill="rgb(186,186,186)" font-size="13">{{ state[4].time }}</text> -->

      <circle :cx="radiusX[5]" cy="40" :r="radiusActive(state[5].active)" :fill="colorActive(state[5].active)"/>
      <text x="722" y="68" fill="rgb(0,0,1)" font-size="13">{{ state[5].name }}</text>
      <!-- <text x="722" y="85" fill="rgb(186,186,186)" font-size="13">{{ state[5].time }}</text> -->
    </svg>
  </div>
</template>

<script>
export default {
  name: 'stateSvg',
  data() {
    return {
      radius: 6,
      activeRadius: 10,
      state: [{
        name: '发出申请',
        time: '2017-09-16 11:21',
        active: this.status[0]
      }, {
        name: '部门通过',
        time: '2017-09-16 11:21',
        active: this.status[1]
      }, {
        name: '所长通过',
        time: '2017-09-16 11:21',
        active: this.status[2]
      }, {
        name: '财务核单',
        time: '2017-09-16 11:21',
        active: this.status[3]
      }, {
        name: '付款申请',
        time: '2017-09-16 11:21',
        active: this.status[4]
      }, {
        name: '付款审核',
        time: '2017-09-16 11:21',
        active: this.status[5]
      }]
    }
  },
  props: ['status'],
  computed: {
    radiusX () {
      let baseX = 50
      let arr = new Array(6).fill(0)
      let i = 0
      while (i < arr.length) {
        arr[i] = baseX + i * 140
        i++
      }
      return arr
    }
  },
  // props: ['state'],
  methods: {
    radiusActive (active) {
      if (active) {
        return this.activeRadius
      } else {
        return this.radius
      }
    },
    colorActive (active) {
      if (active) {
        return '#85e2ff'
      } else {
        return '#bababa'
      }
    }
  },
  created () {

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
  margin-top: 30px;
}
</style>