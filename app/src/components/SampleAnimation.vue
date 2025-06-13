<template>
  <div ref="chart" class="chart-container">
    <svg width="600" height="400">
      <path ref="line" fill="none" stroke="blue" stroke-width="2" />
      <path ref="curve" fill="none" stroke="red" stroke-width="2" />
    </svg>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'
import gsap from 'gsap'

export default {
  setup() {
    const chart = ref(null)
    const line = ref(null)
    const curve = ref(null)

    onMounted(() => {
      const lineData = [
        { x: 50, y: 100 },
        { x: 200, y: 150 },
        { x: 400, y: 50 },
        { x: 550, y: 200 },
      ]

      const curveData = [
        { x: 50, y: 300 },
        { x: 150, y: 250 },
        { x: 450, y: 350 },
        { x: 550, y: 200 },
      ]

      const linePath = d3
        .select(line.value)
        .data([lineData])
        .attr(
          'd',
          d3
            .line()
            .x((d) => d.x)
            .y((d) => d.y),
        )

      const curvePath = d3
        .select(curve.value)
        .data([curveData])
        .attr(
          'd',
          d3
            .line()
            .curve(d3.curveCatmullRom)
            .x((d) => d.x)
            .y((d) => d.y),
        )

      gsap.fromTo(
        linePath.node(),
        {
          strokeDasharray: linePath.node().getTotalLength(),
          strokeDashoffset: linePath.node().getTotalLength(),
        },
        {
          duration: 3,
          strokeDashoffset: 0,
          ease: 'power2.inOut',
        },
      )

      gsap.fromTo(
        curvePath.node(),
        {
          strokeDasharray: curvePath.node().getTotalLength(),
          strokeDashoffset: curvePath.node().getTotalLength(),
        },
        {
          duration: 3,
          strokeDashoffset: 0,
          ease: 'power2.inOut',
          delay: 1,
        },
      )
    })

    return {
      chart,
      line,
      curve,
    }
  },
}
</script>

<style scoped>
.chart-container {
  width: 600px;
  height: 400px;
}
</style>
