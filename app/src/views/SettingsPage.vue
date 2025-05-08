<template>
    <div>
        <div class="flex h-screen">
      <div class="flex-1 p-5 bg-gray-100">
        <h2 class="text-xl">Left Page</h2>
        <SettingsTab />
        <p class="mt-2"></p>
      </div>
      <div class="flex-1 p-5 bg-indigo-100">
        <h2 class="text-xl">Right Page</h2>
        <h1 v-if="tab === 1"> Hello </h1>
        <h1 v-if="tab === 2"> Hey </h1>
      </div>
    </div>
    </div>
</template>

<script setup>
import SettingsTab from '@/components/SettingsTab.vue'
import { useTab } from '@/stores/useTab'

const { tab } = useTab()

</script>

<style lang="scss" scoped>

</style>