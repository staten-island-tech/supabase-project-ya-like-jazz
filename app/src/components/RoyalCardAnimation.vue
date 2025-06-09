<template>
  <div class="relative w-screen h-screen overflow-hidden flex items-center justify-center">
    <div
      v-for="(_, index) in 8"
      :key="index"
      class="circle bg-red-500 w-6 h-6 rounded-full absolute"
      :ref="(el) => setCircleEl(el, index)"
    ></div>

    <div ref="trailContainer" class="absolute inset-0 pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const circleEls = ref<(HTMLElement | null)[]>([])
const trailContainer = ref<HTMLElement | null>(null)

function setCircleEl(el: Element | null, index: number) {
  if (el instanceof HTMLElement) {
    circleEls.value[index] = el
  } else {
    circleEls.value[index] = null
  }
}

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

    if (el) {
      gsap.set(el, { x: centerX, y: centerY, rotation: 0 })

      tl.to(
        el,
        {
          x,
          y,
          rotation: 360,
          onUpdate: () => {
            const trail = el.cloneNode(true) as HTMLElement
            trail.style.position = 'absolute'
            trail.style.pointerEvents = 'none'
            trail.style.opacity = '0.6'
            trail.style.zIndex = '-1'
            const computed = window.getComputedStyle(el)
            trail.style.transform = computed.transform
            trailContainer.value?.appendChild(trail)
            gsap.to(trail, {
              opacity: 0,
              duration: 0.8,
              onComplete: () => {
                trail.remove()
              },
            })
          },
        },
        0,
      )
    }
  })
})
</script>

<style scoped>
.circle {
  will-change: transform;
}
</style>
