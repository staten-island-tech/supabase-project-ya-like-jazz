<template>
  <div>
    <div class="mt-8 absolute top-1/8 left-1/2 w-1/2 h-1/2 -translate-x-1/2 z-20">
      <div
        class="flex justify-center p-4 border bg-3 border-3 hover:bg-hover3 rounded-lg w-fit mx-auto"
      >
        <RouterLink to="/play" class="flex justify-center items-center text-textcolor text-4xl">
          Launch Game
        </RouterLink>
      </div>
      <div class="absolute -top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-16 z-10">
        <div
          v-for="(angle, i, number) in angles"
          :key="i"
          class="card absolute top-0 left-1/2 w-24 h-36"
          :ref="(element) => (cards[i] = element)"
        >
          <img
            :src="`https://deckofcardsapi.com/static/img/${numbers[i]}.png`"
            class="w-full h-full object-cover rounded shadow-md"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'

const angles = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260]
const numbers = [
  'back',
  'back',
  '2S',
  '3S',
  '4S',
  '5S',
  '6S',
  '7S',
  '8S',
  '9S',
  '0S',
  'JS',
  'QS',
  'KS',
  'AS',
  'back',
  'back',
]
const cards = ref([])

onMounted(() => {
  cards.value.forEach((card, i) => {
    gsap.set(card, {
      rotation: 0,
      opacity: 0,
      x: '0px',
      y: '800px',
      transformOrigin: '0px 400px',
    })

    gsap.to(card, {
      y: i * 5,
      rotation: angles[i],
      opacity: 1,
      duration: 3.2,
      delay: i * 0.1,
      yoyo: true,
      repeat: -1,
      translateY: '-1000px',
      ease: 'expo.inOut',
    })
  })
})
</script>

<style></style>
