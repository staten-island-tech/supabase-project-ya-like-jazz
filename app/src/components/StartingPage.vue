<template>
  <div>
    <h1>Hello</h1>
<div class="absolute top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 translate-y-24">
      
      <div
        v-for="(position, i) in positions"
        :key="i"
        class="card absolute top-0 left-1/2 -translate-x-1/2 w-24 h-36"
        :ref="element => cards[i] = element"
      >
        <img
          :src="`https://deckofcardsapi.com/static/img/${codes[i]}${suitValue}.png`"
          class="w-full h-full object-cover rounded shadow-md"
        />
      </div>
       <div
        v-for="(shuffle, i) in shuffled"
        :key="i"
        class="card absolute top-0 left-1/2 -translate-x-1/2 w-24 h-36"
        :ref="element => cardRefs[i] = element"
      >
        <img
          src="https://deckofcardsapi.com/static/img/back.png"
          class="w-full h-full object-cover rounded shadow-md"
        />
      </div>
      </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'



const codes = ['A','2','3','4','5','6','7','8','9','0','J','Q','K']
const suits = ['D','C','H','S']
const suitValue = ref('H')
const positions = [
    {x: '0rem', y: '-7.5rem', rotation: 0},
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
function changeSuit(){
suitValue.value = suits[Math.floor(Math.random() * 4)]
}

  // 6 rem * 9 rem
onMounted(() => {
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
      y: -1000,
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
              gsap.timeline({ repeat: 0 })
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
            }
          })
      },
    })
  })
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
