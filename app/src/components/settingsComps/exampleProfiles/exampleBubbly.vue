<template>
  <div>
    <h1 class="text-textcolor2">Bubbly Profile</h1>
    <h1 class="text-textcolor2 text-center text-4xl font-bold">Your Cards</h1>
    <div ref="chart" class="w-full h-full -translate-y-12"></div>
  </div>
</template>

<script setup>
import * as d3 from 'd3'
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'

const chart = ref(null)
const router = useRouter()

async function exampleCard() {
  const data = [{ code: 'AS', quantity: 1 }]

  return data.map((item) => ({
    code: item.code,
    name: getCardName(item.code),
    value: item.quantity,
  }))
}

onMounted(async () => {
  const width = 1000
  const height = 1000

  const data = await exampleCard()
  if (!data.length) return

  const colorMap = {
    'Ace ♠️': '#111111',
    'Ace ♥️': '#FF0004',
    'Ace ♦️': '#FF0004',
    'Ace ♣️': '#111111',
  }

  const color = d3.scaleOrdinal(d3.schemeCategory10)

  const svg = d3
    .select(chart.value)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('width', '100%')
    .attr('height', '100%')
    .style('display', 'block')

  const radiusScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([180, 180])

  const nodes = svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', (d) => radiusScale(d.value))
    .attr('fill', (d) => colorMap[d.name] || color(d.name))

  const labelGroups = svg.selectAll('g').data(data).enter().append('g')

  labelGroups
    .append('text')
    .text((d) => d.name)
    .attr('text-anchor', 'middle')
    .attr('dy', '-0.4em')
    .style('fill', 'white')
    .style('pointer-events', 'none')
    .style('font-size', '40px')

  labelGroups
    .append('text')
    .text((d) => d.value)
    .attr('text-anchor', 'middle')
    .attr('dy', '1em')
    .style('fill', 'white')
    .style('pointer-events', 'none')
    .style('font-size', '40px')

  const simulation = d3
    .forceSimulation(data)
    .force('x', d3.forceX(width / 2).strength(0.05))
    .force('y', d3.forceY(height / 2).strength(0.05))
    .force(
      'collision',
      d3.forceCollide((d) => radiusScale(d.value) + 2),
    )
    .alphaDecay(0.01)
    .on('tick', () => {
      nodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
      labelGroups.attr('transform', (d) => `translate(${d.x}, ${d.y})`)

      const drag = d3
        .drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        })

      nodes.call(drag)
      labelGroups.call(drag)

      simulation.alpha(1).restart()
    })
})

function getCardName(code) {
  /*   console.log(code) */
  const number = code.slice(0, 1)
  const suit = code.slice(1, 2)
  /*   console.log(number) */
  /*   console.log(suit) */
  const suitCodes = {
    S: '♠️',
    H: '♥️',
    D: '♦️',
    C: '♣️',
  }

  const numberCodes = {
    A: 'Ace',
    J: 'Jack',
    Q: 'Queen',
    K: 'King',
    0: '10',
    9: '9',
    8: '8',
    7: '7',
    6: '6',
    5: '5',
    4: '4',
    3: '3',
    2: '2',
  }

  const numCode = numberCodes[number]
  const suitCode = suitCodes[suit]
  return `${numCode} ${suitCode}`
}
</script>

<style scoped></style>
