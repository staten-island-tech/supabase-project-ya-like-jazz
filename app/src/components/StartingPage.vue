<template>
  <div class="h-[110vh]">
<h1 class="title text-8xl font-extrabold text-center p-6 bg-gradient-to-r from-3 to-[#290f5d] bg-clip-text text-transparent">
  Card Game
</h1>

    <div class="absolute left-1/2 -translate-x-1/2 translate-y-[21.5rem] w-1/2 h-1/2"
>
      <div
        v-for="(position, i) in positions"
        :key="i"
        class="card absolute top-0 left-1/2 -translate-x-1/2 w-24 h-36"
        :ref="(element) => (cards[i] = element)"
      >
        <img
          :src="`https://deckofcardsapi.com/static/img/${codes[i]}${suitValue}.png`"
          class="w-full h-full object-cover rounded shadow-md"
          draggable="false"
        />
      </div>
      <div
        v-for="(shuffle, i) in shuffled"
        :key="i"
        class="card absolute top-0 left-1/2 -translate-x-1/2 w-24 h-36"
        :ref="(element) => (cardRefs[i] = element)"
      >
        <img
          src="https://deckofcardsapi.com/static/img/back.png"
          class="w-full h-full object-cover rounded shadow-md"
          draggable="false"
        />
      </div>
    </div>
<div class="absolute w-screen top-[860px] flex flex-col items-center space-y-4">
  <div class="flex justify-center space-x-6">
    <h1 class="text-8xl font-bold">Spin for a Card, win</h1>
    <h1 class="flash text-8xl font-bold">REAL</h1>
    <h1 class="text-8xl font-bold">Cards* </h1>
  </div>

  <h1 class="text-xs"> **Cards will be delivered in 10 years</h1>
</div>

  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { onMounted, ref, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText)

const codes = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K']
const suits = ['D', 'C', 'H', 'S']
const suitValue = ref('H')
const positions = [
  { x: '0rem', y: '-7.5rem', rotation: 0 },
  { x: '-15rem', y: '-15rem', rotation: 0 },
  { x: '-10.5rem', y: '-12rem', rotation: -90 },
  { x: '-15rem', y: 0, rotation: 0 },
  { x: '-3rem', y: '2rem', rotation: -90 },
  { x: 0, y: '6rem', rotation: 0 },
  { x: '3rem', y: '2rem', rotation: 90 },
  { x: '15rem', y: 0, rotation: 0 },
  { x: '10.5rem', y: '-12rem', rotation: 90 },
  { x: '15rem', y: '-15rem', rotation: 0 },
  { x: 0, y: '-22.5rem', rotation: 0 },
  { x: '-3rem', y: '-27rem', rotation: -90 },
  { x: '3rem', y: '-27rem', rotation: 90 },
]
const cards = ref(new Array(positions.length))
const shuffled = Array.from({ length: positions.length })
const cardRefs = ref(new Array(positions.length))
function changeSuit() {
  suitValue.value = suits[Math.floor(Math.random() * 4)]
}

// 6 rem * 9 rem
onMounted(async () => {
  await nextTick()

  cardRefs.value.forEach((cardBack) => {
    if (!cardBack) return
    gsap.set(cardBack, {
      opacity: 0,
      scale: 0.5,
      y: -1000,
      transformOrigin: 'center center',
    })
  })

  cards.value.forEach((card, i) => {
    if (!card) return
    gsap.set(card, {
      opacity: 0,
      scale: 0.5,
      transformOrigin: 'bottom center',
    })

    gsap.to(card, {
      x: positions[i].x,
      y: positions[i].y,
      rotation: positions[i].rotation,
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: i * 0.01,
      ease: 'power2.out',
      onComplete: () => {
        const timeline = gsap.timeline({
          delay: 1,
          repeat: -1,
          yoyo: true,
          repeatDelay: 1.5,
        })

        timeline
          .to(card, {
            y: '-8rem',
            duration: 0.6,
            ease: 'power2.out',
          })
          .to(card, {
            x: Math.random() * 80 - 40,
            y: `-${Math.random() * 8}rem`,
            rotation: gsap.utils.random(-20, 20),
            opacity: 1,
            duration: 0.4,
            ease: 'power1.inOut',
          })
          .to(card, {
            x: 0,
            y: '-8rem',
            opacity: 0,
            rotation: 0,
            duration: 1.2,
            ease: 'power1.inOut',
            onComplete: () => {
              changeSuit()
              const cardBack = cardRefs.value[i]
              if (!cardBack) {
                return
              }
              gsap
                .timeline({ repeat: 0 })
                .set(cardBack, {
                  opacity: 0,
                  scale: 0.5,
                  transformOrigin: 'center center',
                })
                .to(cardBack, {
                  opacity: 0,
                  y: '-8rem',
                  scale: 1,
                  duration: 0.4,
                  ease: 'power2.out',
                })
                .to(cardBack, {
                  x: Math.random() * 80 - 40,
                  y: `-${Math.random() * 8}rem`,
                  rotation: gsap.utils.random(-20, 20),
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power1.inOut',
                })
                .to(cardBack, {
                  x: 0,
                  y: '-8rem',
                  opacity: 0,
                  rotation: 0,
                  duration: 0.6,
                  ease: 'power1.inOut',
                })
            },
          })
      },
    })
  })
})

onMounted(() => {
  gsap.to(".title", {
    "--tw-gradient-from": "#ff00ff",
    "--tw-gradient-to": "#00ffff",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  })
  
  const flashTimeline = gsap.timeline({ repeat: -1, yoyo: true })

flashTimeline
  .to('.flash', { color: '#f87171', duration: 0.1 }) // red
  .to('.flash', { color: '#60a5fa', duration: 0.1 }) // blue
  .to('.flash', { color: '#34d399', duration: 0.1 }) // green
  .to('.flash', { color: '#facc15', duration: 0.1 }) // yellow

})
</script>

<style scoped>
.perspective-800 {
  perspective: 800px;
}
.box2 {
  transform-style: preserve-3d;
}
</style>
