<template>
  <div>
    <div>
      <h1>Hello</h1>
      <div ref="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as d3 from 'd3'
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

async function fetchCardsFromSupabase() {
  const { data, error } = await supabase.from('user_cards').select()
  console.log(data)
  console.log(data.length)
  storeCards(data)
}

function storeCards(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].card_code)
  }
}

fetchCardsFromSupabase()

const chart = ref(null)

onMounted(() => {
  const width = 800
  const height = 600

  const data = [
    { name: 'A', value: 40 },
    { name: 'B', value: 80 },
    { name: 'C', value: 150 },
    { name: 'D', value: 60 },
    { name: 'E', value: 30 },
  ]

  const color = d3.scaleOrdinal(d3.schemeCategory10)

  const svg = d3.select(chart.value).append('svg').attr('width', width).attr('height', height)

  const radiusScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([10, 50])

  const nodes = svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', (d) => radiusScale(d.value))
    .attr('fill', (d) => color(d.name))

  const labels = svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => d.name)
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .style('fill', 'white')
    .style('pointer-events', 'none')

  const simulation = d3
    .forceSimulation(data)
    .force('x', d3.forceX(width / 2).strength(0.05))
    .force('y', d3.forceY(height / 2).strength(0.05))
    .force(
      'collision',
      d3.forceCollide((d) => radiusScale(d.value) + 2),
    )
    .on('tick', ticked)

  function ticked() {
    nodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

    labels.attr('x', (d) => d.x).attr('y', (d) => d.y)
  }
})
</script>

<style lang="scss" scoped></style>
