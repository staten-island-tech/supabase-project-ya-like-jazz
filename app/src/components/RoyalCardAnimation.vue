<template>
  <div class="relative h-screen flex justify-center items-center">
    <div class="absolute w-72 h-72 rounded-full">
      <div
        v-for="(suit, index) in expandedSuitSvgs"
        :key="index"
        class="absolute w-8 h-8"
        :style="getSuitPosition(index, 100)"
        v-html="suit.svg"
      ></div>
    </div>

    <div class="absolute w-96 h-96 rounded-full">
      <div
        v-for="(suit, index) in expandedSuitSvgs"
        :key="'extra-' + index"
        class="absolute w-8 h-8"
        :style="getSuitPosition(index, 130)"
        v-html="suit.svg"
      ></div>
    </div>

    <div class="absolute w-120 h-120 rounded-full">
      <div
        v-for="(suit, index) in expandedSuitSvgs"
        :key="'outer-' + index"
        class="absolute w-8 h-8"
        :style="getSuitPosition(index, 160)"
        v-html="suit.svg"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const isAnimating = ref(false)

const suitSvgs = [
  {
    name: 'spade',
    svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <path fill="black" stroke="white" stroke-width="2"
            d="M32 4c-8 12-20 22-20 34a12 12 0 0024 0c0 12-12 22-20 34h32c-8-12-20-22-20-34a12 12 0 0024 0c0-12-12-22-20-34z"/>
    </svg>`,
  },
  {
    name: 'heart',
    svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <path fill="red" stroke="black" stroke-width="2"
            d="M32 58s26-15.6 26-34A14 14 0 0032 10 14 14 0 006 24c0 18.4 26 34 26 34z"/>
    </svg>`,
  },
  {
    name: 'diamond',
    svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <path fill="red" stroke="black" stroke-width="2"
            d="M32 4l28 28-28 28-28-28 28-28z"/>
    </svg>`,
  },
  {
    name: 'club',
    svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <circle cx="32" cy="12" r="10" fill="black" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="36" r="10" fill="black" stroke="white" stroke-width="2"/>
      <circle cx="52" cy="36" r="10" fill="black" stroke="white" stroke-width="2"/>
      <path d="M32 26v18h0v14h0v2h0" fill="black" stroke="white" stroke-width="2"/>
    </svg>`,
  },
]

const expandedSuitSvgs = [...suitSvgs, ...suitSvgs, ...suitSvgs.slice(0, 2)]

const getSuitPosition = (index: number, radius: number) => {
  const angle = (index / expandedSuitSvgs.length) * 2 * Math.PI
  const x = radius * Math.cos(angle)
  const y = radius * Math.sin(angle)

  return {
    left: `calc(50% + ${x}px - 1rem)`,
    top: `calc(50% + ${y}px - 1rem)`,
  }
}

const animateSuits = () => {
  if (isAnimating.value) return

  isAnimating.value = true

  gsap.to('.absolute > div', {
    duration: 2,
    stagger: 0.1,
    x: () => Math.random() * 400 - 200,
    y: () => Math.random() * 400 - 200,
    rotation: () => Math.random() * 720,
    scale: 2,
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      gsap.to('.absolute > div', {
        duration: 3,
        stagger: 0.1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimating.value = false
        },
      })
    },
  })
}

onMounted(() => {
  animateSuits()
})

defineExpose({ animateSuits })
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
