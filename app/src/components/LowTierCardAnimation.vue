<template>
  <div class="relative h-screen flex justify-center items-center">
    <!--ChatGPT was used to create animations. To say the least, it was like herding cats-->
    <div ref="outerRing" class="absolute w-96 h-96 rounded-full">
      <div
        v-for="(suit, i) in suitSvgs"
        :key="'outer-' + suit.name + '-' + i"
        class="w-12 h-12 absolute select-none"
        :style="getPositionStyle(i, 160, suitSvgs.length)"
        v-html="suit.svg"
      ></div>
    </div>

    <div
      ref="innerRing"
      class="absolute w-72 h-72 rounded-full"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
    >
      <div
        v-for="(suit, i) in suitSvgs"
        :key="'inner-' + suit.name + '-' + i"
        class="w-12 h-12 absolute select-none"
        :style="getPositionStyle(i, 120, suitSvgs.length)"
        v-html="suit.svg"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const outerRing = ref<HTMLElement | null>(null)
const innerRing = ref<HTMLElement | null>(null)

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

function getPositionStyle(index: number, radius: number, total: number) {
  const angle = (index / total) * 2 * Math.PI
  const x = radius * Math.cos(angle)
  const y = radius * Math.sin(angle)
  return {
    left: `calc(50% + ${x}px - 1.5rem)`,
    top: `calc(50% + ${y}px - 1.5rem)`,
  }
}

const isAnimating = ref(false)

function animateSine() {
  if (isAnimating.value) return
  if (!outerRing.value || !innerRing.value) return

  isAnimating.value = true

  gsap.killTweensOf([outerRing.value, innerRing.value])

  gsap.to(outerRing.value, {
    rotation: 360,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
    modifiers: {
      x: (x: string) => `${parseFloat(x) + Math.sin(Date.now() / 800) * 60}px`,
      y: (y: string) => `${parseFloat(y) + Math.cos(Date.now() / 800) * 60}px`,
    },
  })

  gsap.to(innerRing.value, {
    rotation: -360,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
    modifiers: {
      x: (x: string) => `${parseFloat(x) + Math.sin(Date.now() / 600) * 45}px`,
      y: (y: string) => `${parseFloat(y) + Math.cos(Date.now() / 600) * 45}px`,
    },
  })
}

onMounted(() => {
  animateSine()
})

defineExpose({ animateSine })
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
