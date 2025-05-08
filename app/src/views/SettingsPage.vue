<template>
    <div>
        <div class="flex h-screen">
      <div class="w-64 flex justify-end p-5 bg-gray-100">
        <SettingsTab />
        <p class="mt-2"></p>
      </div>
      <div class="flex-1 p-5 bg-indigo-100">
        <div v-if="tab === 1">
          <h2 class="text-xl">Right Page</h2>
          <h1> Hello </h1>
        </div>
        <div v-if="tab === 2">
          <h1> Hey </h1>
        </div>
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