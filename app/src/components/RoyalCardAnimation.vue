<template>
  <div class="relative w-screen h-screen overflow-hidden flex items-center justify-center">
    <div
      v-for="(circle, index) in 8"
      :key="index"
      class="circle bg-red-500 w-6 h-6 rounded-full absolute"
      :ref="(el) => (circleEls[index] = el)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const circleEls = ref<HTMLElement[]>(Array(8).fill(null))

onMounted(() => {
  const centerX = 0
  const centerY = 0
  const radius = 100

  const tl = gsap.timeline({
    defaults: {
      ease: 'power2.out',
      duration: 1.2,
    },
  })

  circleEls.value.forEach((el, index) => {
    const angle = (index / 8) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    gsap.set(el, { x: centerX, y: centerY, rotation: 0 })

    tl.to(
      el,
      {
        x,
        y,
        rotation: 360,
      },
      0,
    ) // Done by ChatGPT (I'll modify it as I see fit)
  })
})
</script>

<style scoped></style>
