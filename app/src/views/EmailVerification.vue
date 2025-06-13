<template>
  <div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 flex justify-center"
    >
      <div
        class="bg-3 w-96 h-96 flex items-center justify-center rounded-full relative"
      >
        <h1 class="text-textcolor2 text-center text-4xl font-bold p-4 z-10">
          We have sent you an email
        </h1>

        <!-- Squares container, positioned relative so squares can be absolute -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <img
            v-for="(square, index) in squares"
            :key="index"
            class="square absolute rounded-md"
            :src="square.image"
            />
        </div>
      </div>
    </div>
    <cardDisappearAnim />
  </div>
</template>

<script setup lang="ts">
import cardDisappearAnim from '@/components/cardDisappearAnim.vue'
import { useAnimationStore } from '@/stores/animation'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const animationStore = useAnimationStore()

setTimeout(() => {
  animationStore.animation = false
}, 2000)


const squares = [
  { image: 'https://deckofcardsapi.com/static/img/AS.png' },
  { image: 'https://deckofcardsapi.com/static/img/AH.png' },
  { image: 'https://deckofcardsapi.com/static/img/AC.png' },
  { image: 'https://deckofcardsapi.com/static/img/AH.png' },
  { image: 'https://deckofcardsapi.com/static/img/AS.png' },
  { image: 'https://deckofcardsapi.com/static/img/AD.png' },
  { image: 'https://deckofcardsapi.com/static/img/AC.png' },
  { image: 'https://deckofcardsapi.com/static/img/AD.png' },
]

onMounted(() => {
  const squareElements = document.querySelectorAll('.square')

  gsap.set(squareElements, {
    width: 24,
    height: 36,
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
    scale: 0,
  })

  const positions = [
    { x: 0, y: -300, rotation: 180, alternateY: -330, alternateX: 0},
    { x: 150, y: -150, rotation: 225, alternateY: -180, alternateX: 180 },
    { x: -300, y: 0, rotation: 90, alternateY: 0, alternateX: -330 },
    { x: -150, y: -150, rotation: 135, alternateY: -180, alternateX: -180 },
    { x: 0, y: 300, rotation: 0, alternateY: 330, alternateX: 0 },
    { x: -150, y: 150, rotation: 225, alternateY: 180, alternateX: -180 },
    { x: 300, y: 0, rotation: 270, alternateY: 0, alternateX: 330 },
    { x: 150, y: 150, rotation: 315, alternateY: 180, alternateX: 180 },

  ]

  squareElements.forEach((el, i) => {
    const tl = gsap.timeline({  delay: 2.5  }) 
    tl.to(el, {
      duration: 1,
      scale: 1,
      x: positions[i].x,
      y: positions[i].y,
      width: 96,
      height: 144,
      rotation: positions[i].rotation,
      ease: 'power2.out',
    })

    tl.to(el, {
      x: positions[i].alternateX,
      y: positions[i].alternateY,
      scale: 1.05,
      duration: 0.3,
      ease: 'bounce.inOut',
      yoyo: true,
      repeat: -1,
  })  
  })
})
</script>

<style scoped>
.square {
  /* will be sized and positioned by GSAP */
}
</style>
