<template>
  <div>
    <div class="box gradient-green green"></div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

gsap.to('.box', {
  duration: 2,
  rotation: 360,
  transformOrigin: 'left top',
  repeat: 2,
})
</script>

<style scoped></style>
