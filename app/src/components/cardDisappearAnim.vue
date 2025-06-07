<template>
  <div
    v-if="animationStore.animation"
    class="relative w-screen h-screen select-none overflow-hidden"
  >
    <div
      v-for="(card, i) in cards"
      :key="i"
      :ref="(el) => (cardRefs[i] = el)"
      class="fixed rounded-lg text-white font-bold text-lg flex justify-center items-center shadow-md select-none origin-center hover:shadow-xl"
      :style="getCoverStyle(i, true)"
    >
      <img
        src="https://deckofcardsapi.com/static/img/back.png"
        class="w-full h-full object-cover rounded-lg"
        draggable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useAnimationStore } from '@/stores/animation'

const animationStore = useAnimationStore()

const cardWidth = 96
const cardHeight = 144
const rotations = [-12, -8, -4, 0, 4, 8, 12, 16, 20, 24]

const cards = reactive(
  Array.from({ length: 10 }).map((_, i) => ({
    label: `Card ${i + 1}`,
    style: {
      rotate: `${rotations[i]}deg`,
      top: `${20 + (i % 5) * (cardHeight + 20)}px`,
      left: `${20 + Math.floor(i / 5) * (cardWidth + 20)}px`,
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      borderRadius: '16px',
    },
  })),
)

const cardRefs = []

const coverPositions = [
  { top: '0', left: '0', width: '20vw', height: '50vh' },
  { top: '0', left: '20vw', width: '20vw', height: '50vh' },
  { top: '0', left: '40vw', width: '20vw', height: '50vh' },
  { top: '0', left: '60vw', width: '20vw', height: '50vh' },
  { top: '0', left: '80vw', width: '20vw', height: '50vh' },
  { top: '50vh', left: '0', width: '20vw', height: '50vh' },
  { top: '50vh', left: '20vw', width: '20vw', height: '50vh' },
  { top: '50vh', left: '40vw', width: '20vw', height: '50vh' },
  { top: '50vh', left: '60vw', width: '20vw', height: '50vh' },
  { top: '50vh', left: '80vw', width: '20vw', height: '50vh' },
]

function getCoverStyle(i, initial = false) {
  if (initial) {
    return {
      top: coverPositions[i].top,
      left: coverPositions[i].left,
      width: coverPositions[i].width,
      height: coverPositions[i].height,
      position: 'fixed',
      borderRadius: '0px',
      opacity: 1,
      zIndex: 100 + i,
      transform: `rotate(${cards[i].style.rotate})`,
    }
  } else {
    const card = cards[i].style
    return {
      top: card.top,
      left: card.left,
      width: card.width,
      height: card.height,
      position: 'fixed',
      borderRadius: card.borderRadius,
      opacity: 1,
      zIndex: 10 + i,
      transform: `rotate(${card.rotate})`,
    }
  }
}

function animateToOriginal() {
  cardRefs.forEach((el, i) => {
    if (!el) return
    gsap.to(el, {
      y: -window.innerHeight - 200,
      rotation: cards[i].style.rotate,
      opacity: 0,
      duration: 1,
      delay: i * 0.07,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(el, {
          top: cards[i].style.top,
          left: cards[i].style.left,
          width: cards[i].style.width,
          height: cards[i].style.height,
          borderRadius: '16px',
          rotation: cards[i].style.rotate,
          y: 0,
          opacity: 0,
          position: 'fixed',
          zIndex: 10 + i,
        })
      },
    })
  })
}

onMounted(() => {
  animateToOriginal()
})
</script>

<style scoped></style>
