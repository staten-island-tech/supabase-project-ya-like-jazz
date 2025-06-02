<template>
  <div>
    <h1>Hello</h1>
    <div class="box green w-24 h-24 bg-green-500"></div>
  <div class="w-screen h-screen flex justify-center items-center perspective-800">
    <div class="box2 bg-green-500 text-white rounded-lg w-36 h-48 flex justify-center items-center">
      Box 2
    </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { onMounted } from 'vue'
onMounted(() => {
  gsap.to('.box', { x: 200, duration: 1, rotation: 360, duration: 2, repeat: -1, yoyo: true })
  gsap.set('.box2', {
   rotation: 100,
  transformOrigin: "center bottom -600px" 
})

  gsap.to('.box2', {
  duration: 2,
  rotation: 210,
  yoyo: true,
  ease: "power3.inOut",
  repeat: -1,
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
