<template>
  <div>
    <div class="box"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

gsap.to('box', { x: 40 })
</script>

<style scoped></style>
