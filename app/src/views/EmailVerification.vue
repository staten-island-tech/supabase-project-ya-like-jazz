<template>
  <h1>We have sent you an email</h1>
</template>

<script lang="ts">
import { ref } from 'vue'
export function isVerified() {
  const Verified = ref(false)
  return { Verified }
}
</script>
