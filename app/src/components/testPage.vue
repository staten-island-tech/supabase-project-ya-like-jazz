<template>
  <div class="relative w-screen h-screen select-none overflow-hidden cursor-pointer" @click="toggleCover">
    <div
      v-for="(card, i) in cards"
      :key="i"
      :ref="el => cardRefs[i] = el"
       class="fixed rounded-lg text-white font-bold text-lg flex justify-center items-center
           shadow-md select-none transition-shadow duration-300 cursor-pointer origin-center hover:shadow-xl"
      :style="{ opacity: 0 }"
    >
      <img src="https://deckofcardsapi.com/static/img/back.png" class="w-full h-full object-cover rounded-lg"/>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const cardWidth = 96
const cardHeight = 144
const rotations = [-12, -8, -4, 0, 4, 8, 12, 16, 20, 24];


const cards = reactive(
  Array.from({ length: 10 }).map((_, i) => ({
    label: `Card ${i + 1}`,
    style: {
      top: `${20 + (i % 5) * (cardHeight + 20)}px`,
      left: `${20 + Math.floor(i / 5) * (cardWidth + 20)}px`,
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      rotate: `${rotations[i]}deg`,
    },
  }))
)

const cardRefs = []
const covered = ref(false)


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

const resetDelayMs = 500 
function animateToCover() {
  cardRefs.forEach((el, i) => {
    if (!el) return
    gsap.fromTo(el,
      { 
        y: -window.innerHeight - 200,
        rotation: cards[i].style.rotate,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        top: coverPositions[i].top,
        left: coverPositions[i].left,
        width: coverPositions[i].width,
        height: coverPositions[i].height,
        borderRadius: 0,
        rotation: cards[i].style.rotate,
        ease: 'bounce.out',
        duration: 1.2,
        delay: i * 0.1,
        zIndex: 100 + i,
        position: 'fixed',
        onComplete: i === cardRefs.length - 1 ? () => {
          setTimeout(() => {
            animateToOriginal()
          }, resetDelayMs)
        } : null,
      }
    )
  })
  covered.value = true
}


/* function animateToOriginal() {
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
          opacity: 1,
          position: 'fixed',
          zIndex: 10,
        })
      },
    })
  })
  covered.value = false 
} */

function toggleCover() {
  if (covered.value) {
/*     animateToOriginal() */
  } else {
    animateToCover()
  }
}

onMounted(() => {
  setTimeout(() => {
    animateToCover()
  }, 4000) 
})
</script>

<style scoped>
</style>
