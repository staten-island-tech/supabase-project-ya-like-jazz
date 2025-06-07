<template>
  <div>
    <h1>We have sent you an email</h1>
    <cardDisappearAnim />
  </div>
</template>

<script setup lang="ts">
import cardDisappearAnim from '@/components/cardDisappearAnim.vue'
import { useAnimationStore } from '@/stores/animation'

const animationStore = useAnimationStore()

setTimeout(() => {
  animationStore.animation = false
}, 2000)
</script>
