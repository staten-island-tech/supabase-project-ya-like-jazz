<template>
  <div>
    <div class="flex h-screen bg-1">
      <div class="w-64 flex justify-end p-5">
        <SettingsTab />
        <p class="mt-2"></p>
      </div>
      <div class="flex-1 p-5">
        <div v-if="tab === 1">
          <GeneralSettings />
        </div>
        <div v-if="tab === 2">
          <h1>Hey</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SettingsTab from '@/components/SettingsTab.vue'
import GeneralSettings from '@/components/GeneralSettings.vue'
import { useTab } from '@/stores/useTab'

const { tab } = useTab()
</script>

<style lang="scss" scoped></style>
